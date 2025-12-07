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

// 🔥 Function Timer
const startTimer = require('../utils/timer');

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

// ------------------ HELPERS ------------------
function getIp(req) {
  const t = startTimer("helper_getIp");
  const fwd = req.headers["x-forwarded-for"];
  t();
  if (fwd) return String(fwd).split(",")[0].trim();
  return req.socket.remoteAddress;
}

async function saveLog(data) {
  const t = startTimer("helper_savelog");
  try { await LoginLog.create(data); } catch { }
  t();
}

function signAccessToken(user) {
  const t = startTimer("helper_signAccessToken");
  const token = jwt.sign(
    { id: user._id, username: user.username, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" }
  );
  t();
  return token;
}

function signRefreshToken(tokenId, user) {
  const t = startTimer("helper_signRefreshToken");
  const token = jwt.sign(
    { id: user._id, username: user.username, jti: tokenId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES || "30d" }
  );
  t();
  return token;
}

function parseDuration(d) {
  const t = startTimer("helper_parseDuration");
  let v;

  if (!d) v = 0;
  else if (typeof d === "number") v = d;
  else if (d.endsWith("ms")) v = parseInt(d);
  else if (d.endsWith("s")) v = parseInt(d) * 1000;
  else if (d.endsWith("m")) v = parseInt(d) * 60000;
  else if (d.endsWith("h")) v = parseInt(d) * 3600000;
  else if (d.endsWith("d")) v = parseInt(d) * 86400000;
  else v = parseInt(d);

  t();
  return v;
}
const parseDurationMillis = parseDuration;

// Device Parsing
function parseDeviceFromReq(req) {
  const t = startTimer("helper_parseDevice");
  const ua = req.get("User-Agent") || "";
  const parser = new UAParser(ua);
  const r = parser.getResult();

  const out = {
    deviceName: r.device.vendor || "Unknown",
    deviceType: r.device.type || "desktop",
    os: r.os.name || "Unknown",
    browser: r.browser.name || "Unknown",
    userAgent: ua
  };

  t();
  return out;
}

// Suspicious Detection Logic
function isSuspicious(dbToken, ip, ua) {
  const t = startTimer("helper_isSuspicious");
  const mode = (process.env.SUSPICIOUS_MODE || "strict").toLowerCase();
  const sameIp = dbToken.ip === ip;
  const sameUA = dbToken.userAgent === ua;

  let out;
  if (mode === "off") out = false;
  else if (mode === "loose") out = !sameIp && !sameUA;
  else out = !sameIp || !sameUA;

  t();
  return out;
}

// Validation Schemas
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

// Account Lock
async function recordFailedLogin(user) {
  const t = startTimer("login_recordFailedLogin");
  try {
    user.failedLoginAttempts++;
    if (user.failedLoginAttempts >= 5) {
      user.lockUntil = Date.now() + 15 * 60 * 1000;
    }
    await user.save();
  } catch { }
  t();
}

async function resetFailedLogin(user) {
  const t = startTimer("login_resetFailedLogin");
  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();
  t();
}

// Middleware Auth
function authenticate(req, res, next) {
  const t = startTimer("auth_middleware");
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    t();
    return res.status(401).json({ Status: false, Msg: "Unauthorized" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    t();
    return next();
  } catch {
    t();
    return res.status(401).json({ Status: false, Msg: "Invalid token" });
  }
}

// =========================================================
// ======================= LOGIN ===========================
// =========================================================

router.post("/login", async (req, res) => {
  const t_total = startTimer("login_total");

  const t_ip = startTimer("login_getIp");
  const ip = getIp(req);
  t_ip();

  const ua = req.get("User-Agent") || "";

  try {
    const t_validate = startTimer("login_validate");
    const { error, value } = loginSchema.validate(req.body);
    t_validate();

    if (error) {
      t_total();
      return res.status(400).json({ Status: false, Msg: "Invalid input" });
    }

    const { username, password } = value;

    const t_findUser = startTimer("login_findUser");
    const user = await User.findOne({ username });
    t_findUser();

    if (!user) {
      t_total();
      return res.status(401).json({ Status: false, Msg: "Invalid credentials" });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      t_total();
      return res.status(423).json({ Status: false, Msg: "Account locked. Try later." });
    }

    const t_bcrypt = startTimer("login_comparePassword");
    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    t_bcrypt();

    if (!passwordOk) {
      await recordFailedLogin(user);
      t_total();
      return res.status(401).json({ Status: false, Msg: "Invalid credentials" });
    }

    await resetFailedLogin(user);

    const t_parseDev = startTimer("login_parseDevice");
    const d = parseDeviceFromReq(req);
    t_parseDev();

    const t_tokenGen = startTimer("login_generateTokens");
    const tokenId = uuidv4();
    const deviceId = uuidv4();
    const accessToken = signAccessToken(user);
    const refreshTokenJwt = signRefreshToken(tokenId, user);
    t_tokenGen();

    const t_insert = startTimer("login_insertRefreshToken");
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
    t_insert();

    const t_cookie = startTimer("login_setCookie");
    res.cookie("refreshToken", refreshTokenJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: parseDurationMillis(process.env.JWT_REFRESH_EXPIRES || "30d")
    });
    t_cookie();

    t_total();

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
    t_total();
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// ======================= REFRESH ==========================
// =========================================================

router.post("/refresh", async (req, res) => {
  const t_total = startTimer("refresh_total");

  const ip = getIp(req);
  const ua = req.get("User-Agent") || "";

  try {
    const t_tokenExtract = startTimer("refresh_extractToken");
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    t_tokenExtract();

    if (!token) {
      t_total();
      return res.status(401).json({ Status: false, Msg: "No refresh token" });
    }

    let payload;
    const t_verify = startTimer("refresh_verifyToken");
    try { payload = jwt.verify(token, process.env.JWT_SECRET); }
    catch {
      t_verify();
      t_total();
      return res.status(401).json({ Status: false, Msg: "Invalid refresh token" });
    }
    t_verify();

    const t_findDb = startTimer("refresh_findDBToken");
    const dbToken = await RefreshToken.findOne({ tokenId: payload.jti });
    t_findDb();

    if (!dbToken || dbToken.revoked) {
      t_total();
      return res.status(401).json({ Status: false, Msg: "Refresh token invalid" });
    }

    const t_suspicious = startTimer("refresh_suspiciousCheck");
    const suspicious = isSuspicious(dbToken, ip, ua);
    t_suspicious();

    if (suspicious) {
      await RefreshToken.updateMany({ userId: dbToken.userId }, { revoked: true });
      res.clearCookie("refreshToken");
      t_total();
      return res.status(401).json({
        Status: false,
        Msg: `Suspicious activity detected (${process.env.SUSPICIOUS_MODE}). Please login again.`
      });
    }

    const t_loadUser = startTimer("refresh_loadUser");
    const user = await User.findById(payload.id).lean();
    t_loadUser();

    if (!user) {
      t_total();
      return res.status(401).json({ Status: false, Msg: "User not found" });
    }

    const t_rotate = startTimer("refresh_rotateToken");
    const newTokenId = uuidv4();
    const newRefreshJwt = signRefreshToken(newTokenId, payload);
    const newAccessToken = signAccessToken(user);
    t_rotate();

    const t_revoke = startTimer("refresh_revokeOldToken");
    dbToken.revoked = true;
    dbToken.replacedByTokenId = newTokenId;
    await dbToken.save();
    t_revoke();

    const t_insert = startTimer("refresh_insertNewToken");
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
    t_insert();

    const t_set = startTimer("refresh_setCookie");
    res.cookie("refreshToken", newRefreshJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: parseDurationMillis(process.env.JWT_REFRESH_EXPIRES || "30d")
    });
    t_set();

    t_total();

    return res.json({
      Status: true,
      Msg: "Token refreshed",
      Token: newAccessToken,
      refreshTokenId: newTokenId
    });

  } catch {
    t_total();
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// =================== FORGOT PASSWORD ======================
// =========================================================

router.post("/forgot", async (req, res) => {
  const t_total = startTimer("forgot_total");

  try {
    const t_validate = startTimer("forgot_validateInput");
    const { error, value } = forgotSchema.validate(req.body);
    t_validate();

    if (error) {
      t_total();
      return res.status(400).json({ Status: false, Msg: "Invalid input" });
    }

    const { username, dob } = value;

    const t_findUser = startTimer("forgot_findUser");
    const user = await User.findOne({ username });
    t_findUser();

    if (!user) {
      t_total();
      return res.status(404).json({ Status: false, Msg: "User not found" });
    }

    const t_compareDob = startTimer("forgot_compareDOB");
    const inputDob = new Date(dob).toISOString().slice(0, 10);
    const storedDob = new Date(user.dob).toISOString().slice(0, 10);
    t_compareDob();

    if (inputDob !== storedDob) {
      t_total();
      return res.status(403).json({ Status: false, Msg: "DOB mismatch" });
    }

    const t_otp = startTimer("forgot_generateOTP");
    const otp = ("000000" + Math.floor(Math.random() * 1000000)).slice(-6);
    user.resetOtp = otp;
    user.resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    t_otp();

    t_total();

    return res.json({
      Status: true,
      Msg: "OTP generated",
      OTP: otp,
      expiresIn: 600
    });

  } catch {
    t_total();
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

// =========================================================
// =================== RESET PASSWORD ========================
// =========================================================

router.post("/reset", async (req, res) => {
  const t_total = startTimer("reset_total");

  try {
    const t_validate = startTimer("reset_validateInput");
    const { error, value } = resetSchema.validate(req.body);
    t_validate();

    if (error) {
      t_total();
      return res.status(400).json({ Status: false, Msg: "Invalid input" });
    }

    const { username, otp, newPassword } = value;

    const t_findUser = startTimer("reset_findUser");
    const user = await User.findOne({ username });
    t_findUser();

    if (!user) {
      t_total();
      return res.status(404).json({ Status: false, Msg: "User not found" });
    }

    const t_otpCheck = startTimer("reset_checkOtp");
    const otpExpired = !user.resetOtp || new Date() > new Date(user.resetOtpExpiresAt);
    t_otpCheck();

    if (otpExpired) {
      t_total();
      return res.status(400).json({ Status: false, Msg: "OTP expired" });
    }

    if (otp !== user.resetOtp) {
      t_total();
      return res.status(403).json({ Status: false, Msg: "Invalid OTP" });
    }

    const t_hash = startTimer("reset_hashPassword");
    const hash = await bcrypt.hash(newPassword, 12);
    t_hash();

    const t_save = startTimer("reset_updatePassword");
    user.passwordHash = hash;
    user.resetOtp = null;
    user.resetOtpExpiresAt = null;
    await user.save();
    t_save();

    t_total();

    return res.json({ Status: true, Msg: "Password reset successful" });

  } catch {
    t_total();
    return res.status(500).json({ Status: false, Msg: "Server error" });
  }
});

module.exports = router;
