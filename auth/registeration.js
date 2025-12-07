require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const User = require('../models/Login');

// 🔥 Function Timer
const startTimer = require('../utils/timer');

const app = express();

// Security middlewares
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// Rate limit (optional)
// app.use(rateLimit({
//     windowMs: 60 * 1000,
//     max: 10,
//     message: { Status: false, Error: true, Msg: "Too many requests. Try again later." }
// }));

// ---------- Username suggestion generator ----------
function generateSuggestions(username) {
    const t = startTimer("signup_generateSuggestions");

    const rand = () => Math.floor(Math.random() * 10000);
    const out = [
        username + rand(),
        username + "_" + rand(),
        rand() + "_" + username
    ];

    t();
    return out;
}

// ---------- SIGNUP ----------
app.post('/', async (req, res) => {
    const t_total = startTimer("signup_total");

    try {
        const t_extract = startTimer("signup_extractFields");
        const {
            username,
            email,
            password,
            name,
            class: className,
            section,
            rollNo,
            dob
        } = req.body;
        t_extract();

        // Validate required fields
        const t_validate = startTimer("signup_validateFields");
        if (!username || !email || !password || !name || !className || !section || !rollNo || !dob) {
            t_validate();
            t_total();
            return res.status(400).json({
                Status: false,
                Error: true,
                Msg: "Missing fields: username, email, password, name, class, section, rollNo, dob"
            });
        }

        if (password.length < 6) {
            t_validate();
            t_total();
            return res.status(400).json({
                Status: false,
                Error: true,
                Msg: "Password must be at least 6 characters"
            });
        }
        t_validate();

        // Check if username exists
        const t_findUser = startTimer("signup_findUserByUsername");
        const existingUser = await User.findOne({ username });
        t_findUser();

        if (existingUser) {
            t_total();
            return res.status(409).json({
                Status: false,
                Error: true,
                Msg: "Username already exists",
                Suggestions: generateSuggestions(username)
            });
        }

        // Check if email exists
        const t_findEmail = startTimer("signup_findUserByEmail");
        const existingEmail = await User.findOne({ email });
        t_findEmail();

        if (existingEmail) {
            t_total();
            return res.status(409).json({
                Status: false,
                Error: true,
                Msg: "Email already registered. Try login or reset password."
            });
        }

        // Hash password
        const t_bcrypt = startTimer("signup_hashPassword");
        const saltRounds = parseInt(process.env.SALT_ROUNDS || '12', 10);
        const passwordHash = await bcrypt.hash(password, saltRounds);
        t_bcrypt();

        // Create user
        const t_create = startTimer("signup_createUser");
        const newUser = new User({
            username,
            email,
            passwordHash,
            name,
            class: className,
            section,
            rollNo,
            dob,
            roles: ["student"] // default role
        });
        t_create();

        const t_save = startTimer("signup_saveUser");
        await newUser.save();
        t_save();

        t_total();

        return res.status(201).json({
            Status: true,
            Error: false,
            Msg: "User registered successfully"
        });

    } catch (err) {
        console.error("Signup error:", err);

        t_total();

        return res.status(500).json({
            Status: false,
            Error: true,
            Msg: "Server error"
        });
    }
});

module.exports = app;
