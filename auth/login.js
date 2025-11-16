// routes/auth.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const UAParser = require('ua-parser-js');

const User = require('../models/Login');
const LoginLog = require('../models/LoginLog');
const RefreshToken = require('../models/RefreshToken');

const router = express.Router();

// ------------------ SANITY CHECK ------------------
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing from .env");

// ------------------ SECURITY ------------------
router.use(helmet());
router.use(express.json({ limit: '10kb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*", credentials: true }));

router.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { Status: false, Error: true, Msg: "Too many requests" }
}));

// ------------------ HELPERS ------------------
function getIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (fwd) return String(fwd).split(",")[0].trim();
  return req.socket.remoteAddress;
}

async function saveLog({ username, ip, success, message, userAgent }) {
  try {
    await LoginLog.create({ username, ip, status: success, message, userAgent });
  } catch { }
}

function signAccessToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
  );
}

function signRefreshToken(tokenId, user) {
  return jwt.sign(
    { id: user._id, username: user.username, jti: tokenId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES || "30d" }
  );
}

function parseDuration(d) {
  if (!d) return 0;
  if (typeof d === "number") return d;
  if (d.endsWith("ms")) return parseInt(d);
  if (d.endsWith("s")) return parseInt(d) * 1000;
  if (d.endsWith("m")) return parseInt(d) * 60 * 1000;
  if (d.endsWith("h")) return parseInt(d) * 60 * 60 * 1000;
  if (d.endsWith("d")) return parseInt(d) * 24 * 60 * 60 * 1000;
  return parseInt(d);
}
const parseDurationMillis = parseDuration;

// ----------------- Device Parsing -----------------
function parseDeviceFromReq(req) {
  const ua = req.get("User-Agent") || "";
  const parser = new UAParser(ua);
  const r = parser.getResult();

  return {
    deviceName: r.device.vendor || "Unknown",
    deviceType: r.device.type || "desktop",
    os: r.os.name || "Unknown",
    browser: r.browser.name || "Unknown",
    userAgent: ua
  };
}

// ----------------- Suspicious-Detection Logic -----------------
function isSuspicious(dbToken, ip, ua) {
  const mode = (process.env.SUSPICIOUS_MODE || "strict").toLowerCase();

  const sameIp = dbToken.ip === ip;
  const sameUA = dbToken.userAgent === ua;

  if (mode === "off") return false;

  if (mode === "loose") {
    return !sameIp && !sameUA; // both differ
  }

  // strict = block if ANY mismatch
  return !sameIp || !sameUA;
}

// ---------------- Validation ----------------
const loginSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(6).max(1024).required()
});

const forgotSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  dob: Joi.date().required()
});

const resetSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  otp: Joi.string().length(6).required(),
  newPassword: Joi.string().min(6).required()
});

// ---------------- Account Lock Settings ----------------
const MAX_FAILED = 5;
const LOCK_TIME_MS = 15 * 60 * 1000;

async function recordFailedLogin(user) {
  try {
    user.failedLoginAttempts++;
    if (user.failedLoginAttempts >= MAX_FAILED) {
      user.lockUntil = Date.now() + LOCK_TIME_MS;
    }
    await user.save();
  } catch { }
}

async function resetFailedLogin(user) {
  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();
}

// ---------------- Auth Middleware ----------------
function authenticate(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ Status: false, Msg: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ Status: false, Msg: "Invalid token" });
  }
}

// =========================================================
// ======================= LOGIN ===========================
// =========================================================

router.post("/login", async (req, res) => {
  const ip = getIp(req);
  const ua = req.get("User-Agent") || "";

  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ Status: false, Msg: "Invalid input" });

    const { username, password } = value;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ Status: false, Msg: "Invalid credentials" });

    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(423).json({ Status: false, Msg: "Account locked. Try later." });
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      await recordFailedLogin(user);
      return res.status(401).json({ Status: false, Msg: "Invalid credentials" });
    }

    await resetFailedLogin(user);

    // Device info + session creation
    const tokenId = uuidv4();
    const deviceId = uuidv4();
    const accessToken = signAccessToken(user);
    const refreshTokenJwt = signRefreshToken(tokenId, user);

    const d = parseDeviceFromReq(req);

    await RefreshToken.create({
      tokenId,
      userId: user._id,
      username: user.username,
      deviceId,
      deviceName: d.deviceName,
      deviceType: d.deviceType,
      os: d.os,
      browser: d.browser,
      ip,
      userAgent: d.userAgent,
      expiresAt: new Date(Date.now() + parseDuration(process.env.JWT_REFRESH_EXPIRES || "30d"))
    });

    // set cookie
    res.cookie("refreshToken", refreshTokenJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: parseDurationMillis(process.env.JWT_REFRESH_EXPIRES || "30d")
    });

    return res.json({
      Status: true,
      Msg: "Login successful",
      Token: accessToken,
      refreshTokenId: tokenId,
      deviceId,
      User: {
        username: user.username,
        name: user.name,
        class: user.class,
        section: user.section,
        rollNo: user.rollNo,
        roles: user.roles
      }
    });

  } catch (err) {
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// ======================= REFRESH ==========================
// =========================================================

router.post("/refresh", async (req, res) => {
  const ip = getIp(req);
  const ua = req.get("User-Agent") || "";

  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!token) return res.status(401).json({ Status: false, Msg: "No refresh token" });

    let payload;
    try { payload = jwt.verify(token, process.env.JWT_SECRET); }
    catch { return res.status(401).json({ Status: false, Msg: "Invalid refresh token" }); }

    const dbToken = await RefreshToken.findOne({ tokenId: payload.jti });

    if (!dbToken || dbToken.revoked) {
      if (dbToken?.userId) await RefreshToken.updateMany({ userId: dbToken.userId }, { revoked: true });
      return res.status(401).json({ Status: false, Msg: "Refresh token invalid" });
    }

    // ===================== Suspicious detection =====================
    if (isSuspicious(dbToken, ip, ua)) {
      await RefreshToken.updateMany({ userId: dbToken.userId }, { revoked: true });
      res.clearCookie("refreshToken");
      return res.status(401).json({
        Status: false,
        Msg: `Suspicious activity detected (${process.env.SUSPICIOUS_MODE}). Please login again.`
      });
    }

    // rotate token
    const newTokenId = uuidv4();
    const newRefreshJwt = signRefreshToken(newTokenId, payload);
    const newAccessToken = signAccessToken(payload);

    dbToken.revoked = true;
    dbToken.replacedByTokenId = newTokenId;
    await dbToken.save();

    await RefreshToken.create({
      tokenId: newTokenId,
      userId: dbToken.userId,
      username: dbToken.username,
      deviceId: dbToken.deviceId,
      deviceName: dbToken.deviceName,
      deviceType: dbToken.deviceType,
      os: dbToken.os,
      browser: dbToken.browser,
      ip,
      userAgent: ua,
      expiresAt: new Date(Date.now() + parseDuration(process.env.JWT_REFRESH_EXPIRES || "30d"))
    });

    res.cookie("refreshToken", newRefreshJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: parseDurationMillis(process.env.JWT_REFRESH_EXPIRES || "30d")
    });

    return res.json({
      Status: true,
      Msg: "Token refreshed",
      Token: newAccessToken,
      refreshTokenId: newTokenId
    });

  } catch {
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// ================= ACTIVE SESSIONS ========================
// =========================================================

router.get("/sessions", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await RefreshToken.find({ userId, revoked: false })
      .select("-_id deviceId deviceName deviceType os browser ip createdAt expiresAt tokenId");

    return res.json({ Status: true, Sessions: sessions });
  } catch {
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// =================== LOGOUT DEVICE ========================
// =========================================================

router.post("/logout-device", authenticate, async (req, res) => {
  try {
    const { deviceId } = req.body;
    if (!deviceId) return res.status(400).json({ Status: false, Msg: "deviceId required" });

    const result = await RefreshToken.updateMany(
      { userId: req.user.id, deviceId, revoked: false },
      { revoked: true }
    );

    return res.json({ Status: true, Msg: "Device logged out", revokedCount: result.modifiedCount });
  } catch {
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// =================== LOGOUT ALL ===========================
// =========================================================

router.post("/logout-all", authenticate, async (req, res) => {
  try {
    const result = await RefreshToken.updateMany(
      { userId: req.user.id, revoked: false },
      { revoked: true }
    );

    res.clearCookie("refreshToken");

    return res.json({
      Status: true,
      Msg: "Logged out from all devices",
      revokedCount: result.modifiedCount
    });
  } catch {
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// =================== FORGOT PASSWORD ======================
// =========================================================

router.post("/forgot", async (req, res) => {
  const ip = getIp(req);
  const ua = req.get("User-Agent") || "";

  try {
    const { error, value } = forgotSchema.validate(req.body);
    if (error) return res.status(400).json({ Status: false, Msg: "Invalid input" });

    const { username, dob } = value;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ Status: false, Msg: "User not found" });

    const inputDob = new Date(dob).toISOString().slice(0,10);
    const storedDob = new Date(user.dob).toISOString().slice(0,10);

    if (inputDob !== storedDob)
      return res.status(403).json({ Status: false, Msg: "DOB mismatch" });

    const otp = ("000000" + Math.floor(Math.random() * 1000000)).slice(-6);
    user.resetOtp = otp;
    user.resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    return res.json({
      Status: true,
      Msg: "OTP generated",
      OTP: otp,
      expiresIn: 600
    });

  } catch {
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// =================== RESET PASSWORD ========================
// =========================================================

router.post("/reset", async (req, res) => {
  try {
    const { error, value } = resetSchema.validate(req.body);
    if (error) return res.status(400).json({ Status: false, Msg: "Invalid input" });

    const { username, otp, newPassword } = value;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ Status: false, Msg: "User not found" });

    if (!user.resetOtp || new Date() > new Date(user.resetOtpExpiresAt))
      return res.status(400).json({ Status: false, Msg: "OTP expired" });

    if (otp !== user.resetOtp)
      return res.status(403).json({ Status: false, Msg: "Invalid OTP" });

    const hash = await bcrypt.hash(newPassword, 12);
    user.passwordHash = hash;
    user.resetOtp = null;
    user.resetOtpExpiresAt = null;
    await user.save();

    return res.json({ Status: true, Msg: "Password reset successful" });

  } catch {
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

module.exports = router;
