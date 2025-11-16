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
const crypto = require('crypto');

const userSchema = require('../models/Login'); // updated user schema
const LoginLog = require('../models/LoginLog');
const RefreshToken = require('../models/RefreshToken');

const router = express.Router();

// basic env checks
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET missing from environment');
}

// Security middlewares (router-level — still apply app-level too)
router.use(helmet());
router.use(express.json({ limit: '10kb' }));
router.use(cookieParser());
const FRONTEND = process.env.FRONTEND_ORIGIN || '*';
router.use(cors({ origin: FRONTEND, credentials: true }));

// simple rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { Status: false, Error: true, Msg: 'Too many requests' }
});
router.use(limiter);

// Models
const User = require('../models/Login');

// ---------- helpers ----------
function getIp(req) {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
}
async function saveLog({ username, ip, success, message, userAgent }) {
  try {
    await LoginLog.create({ username, ip, status: success, message, userAgent });
  } catch (err) {
    console.error('Failed to save login log', err);
  }
}
function signAccessToken(user) {
  return jwt.sign({ id: user._id, username: user.username, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m' });
}
function signRefreshToken(tokenId, user) {
  return jwt.sign({ id: user._id, username: user.username, jti: tokenId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES || '30d' });
}
function parseDuration(d) {
  if (!d) return 0;
  if (typeof d === 'number') return d;
  if (d.endsWith('ms')) return parseInt(d.slice(0, -2));
  if (d.endsWith('s')) return parseInt(d.slice(0, -1)) * 1000;
  if (d.endsWith('m')) return parseInt(d.slice(0, -1)) * 60 * 1000;
  if (d.endsWith('h')) return parseInt(d.slice(0, -1)) * 60 * 60 * 1000;
  if (d.endsWith('d')) return parseInt(d.slice(0, -1)) * 24 * 60 * 60 * 1000;
  return parseInt(d);
}
function parseDurationMillis(d){ return parseDuration(d); }

// ---------- validation ----------
const loginSchema = Joi.object({ username: Joi.string().min(3).max(50).required(), password: Joi.string().min(6).max(1024).required() });
const forgotSchema = Joi.object({ username: Joi.string().min(3).max(50).required(), dob: Joi.date().required() });
const resetSchema = Joi.object({ username: Joi.string().min(3).max(50).required(), otp: Joi.string().length(6).required(), newPassword: Joi.string().min(6).required() });

// lockout settings
const MAX_FAILED = 5;
const LOCK_TIME_MS = 15 * 60 * 1000;

async function recordFailedLogin(user) {
  try {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
    if (user.failedLoginAttempts >= MAX_FAILED) {
      user.lockUntil = Date.now() + LOCK_TIME_MS;
    }
    await user.save();
  } catch (err) { console.error('Failed update failed attempts', err); }
}
async function resetFailedLogin(user) {
  try {
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();
  } catch (err) { console.error('Failed reset failed attempts', err); }
}

// ---------- role middleware ----------
function requireRole(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ Status: false, Error: true, Msg: 'Unauthorized' });
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      if (!payload.roles || !payload.roles.includes(requiredRole)) {
        return res.status(403).json({ Status: false, Error: true, Msg: 'Forbidden' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ Status: false, Error: true, Msg: 'Invalid token' });
    }
  };
}

// ---------- routes ----------

// Protected test
router.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ Status: false, Error: true, Msg: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ Status: true, Error: false, Msg: 'Access OK', user: payload });
  } catch (err) {
    return res.status(401).json({ Status: false, Error: true, Msg: 'Invalid token' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const ip = getIp(req);
  const userAgent = req.get('User-Agent') || '';
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      await saveLog({ username: req.body.username, ip, success: false, message: 'Validation error', userAgent });
      return res.status(400).json({ Status: false, Error: true, Msg: 'Invalid input' });
    }
    const { username, password } = value;
    const user = await User.findOne({ username });
    if (!user) {
      await saveLog({ username, ip, success: false, message: 'User not found', userAgent });
      return res.status(401).json({ Status: false, Error: true, Msg: 'Invalid credentials' });
    }
    if (user.lockUntil && user.lockUntil > Date.now()) {
      await saveLog({ username, ip, success: false, message: 'Account locked', userAgent });
      return res.status(423).json({ Status: false, Error: true, Msg: 'Account temporarily locked. Try later.' });
    }
    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      await recordFailedLogin(user);
      await saveLog({ username, ip, success: false, message: 'Incorrect password', userAgent });
      return res.status(401).json({ Status: false, Error: true, Msg: 'Invalid credentials' });
    }
    await resetFailedLogin(user);

    // issue tokens and store refresh token
    const tokenId = uuidv4();
    const accessToken = signAccessToken(user);
    const refreshTokenJwt = signRefreshToken(tokenId, user);
    const refreshDoc = await RefreshToken.create({
      tokenId, userId: user._id, username: user.username,
      expiresAt: new Date(Date.now() + parseDuration(process.env.JWT_REFRESH_EXPIRES || '30d')),
      ip, userAgent
    });

    await saveLog({ username: user.username, ip, success: true, message: 'Login success', userAgent });

    res.cookie('refreshToken', refreshTokenJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: parseDurationMillis(process.env.JWT_REFRESH_EXPIRES || '30d')
    });

    return res.json({
      Status: true, Error: false, Msg: 'Login successful',
      Token: accessToken, refreshTokenId: tokenId,
      User: { username: user.username, name: user.name, class: user.class, section: user.section, rollNo: user.rollNo, roles: user.roles }
    });

  } catch (err) {
    console.error('Login error', err);
    await saveLog({ username: req.body?.username, ip: getIp(req), success: false, message: 'Server error', userAgent: req.get('User-Agent') || '' });
    return res.status(500).json({ Status: false, Error: true, Msg: 'Server error' });
  }
});

// REFRESH (rotate)
router.post('/refresh', async (req, res) => {
  const ip = getIp(req);
  const userAgent = req.get('User-Agent') || '';
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!token) return res.status(401).json({ Status: false, Error: true, Msg: 'No refresh token' });
    let payload;
    try { payload = jwt.verify(token, process.env.JWT_SECRET); } catch (err) {
      return res.status(401).json({ Status: false, Error: true, Msg: 'Invalid refresh token' });
    }
    const tokenId = payload.jti;
    const dbToken = await RefreshToken.findOne({ tokenId });
    if (!dbToken || dbToken.revoked) {
      if (dbToken && dbToken.userId) await RefreshToken.updateMany({ userId: dbToken.userId }, { revoked: true });
      await saveLog({ username: payload.username, ip, success: false, message: 'Refresh token invalid/reuse', userAgent });
      return res.status(401).json({ Status: false, Error: true, Msg: 'Refresh token invalid' });
    }

    const newTokenId = uuidv4();
    const newRefreshJwt = signRefreshToken(newTokenId, { _id: payload.id, username: payload.username });
    const newAccessToken = signAccessToken({ _id: payload.id, username: payload.username });

    dbToken.revoked = true;
    dbToken.replacedByTokenId = newTokenId;
    await dbToken.save();

    const expiresAt = new Date(Date.now() + parseDuration(process.env.JWT_REFRESH_EXPIRES || '30d'));
    await RefreshToken.create({ tokenId: newTokenId, userId: dbToken.userId, username: dbToken.username, expiresAt, ip, userAgent });

    res.cookie('refreshToken', newRefreshJwt, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax',
      maxAge: parseDurationMillis(process.env.JWT_REFRESH_EXPIRES || '30d')
    });

    await saveLog({ username: payload.username, ip, success: true, message: 'Refresh success', userAgent });
    return res.json({ Status: true, Error: false, Msg: 'Token refreshed', Token: newAccessToken, refreshTokenId: newTokenId });
  } catch (err) {
    console.error('Refresh error', err);
    return res.status(500).json({ Status: false, Error: true, Msg: 'Server error' });
  }
});

// LOGOUT
router.post('/logout', async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  const ip = getIp(req);
  const userAgent = req.get('User-Agent') || '';
  if (!token) return res.json({ Status: true, Error: false, Msg: 'Logged out (no token)' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const tokenId = payload.jti;
    const dbToken = await RefreshToken.findOne({ tokenId });
    if (dbToken) { dbToken.revoked = true; await dbToken.save(); }
    res.clearCookie('refreshToken');
    await saveLog({ username: payload.username, ip, success: true, message: 'Logout', userAgent });
    return res.json({ Status: true, Error: false, Msg: 'Logged out' });
  } catch (err) {
    res.clearCookie('refreshToken');
    return res.json({ Status: true, Error: false, Msg: 'Logged out' });
  }
});

// ---------- FORGOT (verify username + DOB -> create OTP) ----------
router.post('/forgot', async (req, res) => {
  const ip = getIp(req);
  const userAgent = req.get('User-Agent') || '';
  try {
    const { error, value } = forgotSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ Status: false, Error: true, Msg: 'Invalid input' });
    }
    const { username, dob } = value;
    const user = await User.findOne({ username });
    if (!user) {
      await saveLog({ username, ip, success: false, message: 'Forgot: user not found', userAgent });
      return res.status(404).json({ Status: false, Error: true, Msg: 'User not found' });
    }
    // compare dob (allow only date match)
    const providedDob = new Date(dob).toISOString().slice(0,10);
    const storedDob = new Date(user.dob).toISOString().slice(0,10);
    if (providedDob !== storedDob) {
      await saveLog({ username, ip, success: false, message: 'Forgot: dob mismatch', userAgent });
      return res.status(403).json({ Status: false, Error: true, Msg: 'DOB does not match' });
    }

    // generate OTP (6 digits)
    const otp = ('000000' + Math.floor(Math.random() * 1000000)).slice(-6);
    const ttlMs = 10 * 60 * 1000; // 10 minutes
    user.resetOtp = otp; // HASH in prod
    user.resetOtpExpiresAt = new Date(Date.now() + ttlMs);
    await user.save();

    await saveLog({ username, ip, success: true, message: 'Forgot OTP generated', userAgent });

    // In prod: send OTP via SMS/email. Here we return it for testing only.
    return res.json({ Status: true, Error: false, Msg: 'OTP generated', OTP: otp, expiresInSeconds: ttlMs / 1000 });
  } catch (err) {
    console.error('Forgot error', err);
    return res.status(500).json({ Status: false, Error: true, Msg: 'Server error' });
  }
});

// RESET password using OTP
router.post('/reset', async (req, res) => {
  const ip = getIp(req);
  const userAgent = req.get('User-Agent') || '';
  try {
    const { error, value } = resetSchema.validate(req.body);
    if (error) return res.status(400).json({ Status: false, Error: true, Msg: 'Invalid input' });

    const { username, otp, newPassword } = value;
    const user = await User.findOne({ username });
    if (!user) {
      await saveLog({ username, ip, success: false, message: 'Reset: user not found', userAgent });
      return res.status(404).json({ Status: false, Error: true, Msg: 'User not found' });
    }

    if (!user.resetOtp || !user.resetOtpExpiresAt || new Date() > new Date(user.resetOtpExpiresAt)) {
      await saveLog({ username, ip, success: false, message: 'Reset: otp expired/missing', userAgent });
      return res.status(400).json({ Status: false, Error: true, Msg: 'OTP expired or not requested' });
    }

    // compare OTP (in prod compare hashed)
    if (user.resetOtp !== otp) {
      await saveLog({ username, ip, success: false, message: 'Reset: otp mismatch', userAgent });
      return res.status(403).json({ Status: false, Error: true, Msg: 'Invalid OTP' });
    }

    // set new password
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '12', 10);
    const newHash = await bcrypt.hash(newPassword, saltRounds);
    user.passwordHash = newHash;
    user.resetOtp = null;
    user.resetOtpExpiresAt = null;
    await user.save();

    await saveLog({ username, ip, success: true, message: 'Reset: password changed', userAgent });
    return res.json({ Status: true, Error: false, Msg: 'Password reset successful' });

  } catch (err) {
    console.error('Reset error', err);
    return res.status(500).json({ Status: false, Error: true, Msg: 'Server error' });
  }
});

// An example admin-only endpoint demonstrating role middleware
// router.get('/admin-only', requireRole('admin'), (req, res) => {
//   res.json({ Status: true, Error: false, Msg: 'Welcome admin', user: req.user });
// });

module.exports = router;
