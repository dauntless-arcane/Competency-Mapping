require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const User = require('../models/Login');   

const app = express();

// Security middlewares
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// Rate limit
app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { Status: false, Error: true, Msg: "Too many requests. Try again later." }
}));

// ---------- Username suggestion generator ----------
function generateSuggestions(username) {
    const rand = () => Math.floor(Math.random() * 10000);
    return [
        username + rand(),
        username + "_" + rand(),
        rand() + "_" + username
    ];
}

// ---------- SIGNUP ----------
app.post('/', async (req, res) => {
    try {
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

        // Validate required fields
        if (!username || !email || !password || !name || !className || !section || !rollNo || !dob) {
            return res.status(400).json({
                Status: false,
                Error: true,
                Msg: "Missing fields: username, email, password, name, class, section, rollNo, dob"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                Status: false,
                Error: true,
                Msg: "Password must be at least 6 characters"
            });
        }

        // Check if username exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({
                Status: false,
                Error: true,
                Msg: "Username already exists",
                Suggestions: generateSuggestions(username)
            });
        }

        // Check if email exists
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(409).json({
                Status: false,
                Error: true,
                Msg: "Email already registered. Try login or reset password."
            });
        }

        // Hash password
        const saltRounds = parseInt(process.env.SALT_ROUNDS || '12', 10);
        const passwordHash = await bcrypt.hash(password, saltRounds);

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

        await newUser.save();

        return res.status(201).json({
            Status: true,
            Error: false,
            Msg: "User registered successfully"
        });

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({
            Status: false,
            Error: true,
            Msg: "Server error"
        });
    }
});

module.exports = app;
