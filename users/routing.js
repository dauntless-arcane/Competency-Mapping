// declarations
const express = require('express')
const app = express.Router()
const jwt = require('jsonwebtoken');


// Middleware

app.use('/',(req,res,next)=>{
    // console.log(req.headers);
    next();
//  const auth = req.headers.authorization || "";
//   const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
//   console.log("🔐 Authenticating request with token:", token);
//   if (!token) return res.status(401).json({ Status: false, Msg: "Unauthorized" });

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("✅ Authenticated user:", payload.us);
//     req.user = payload;
//     console.log("✅ Authenticated user:");
//     return next();
//   } catch {
//     return res.status(401).json({ Status: false, Msg: "Invalid token" });
//   }

}) 

// api access here

app.use('/entry', require('./user-survey'))
app.use('/result', require('./result'))
app.use('/fetch-tests', require('./fetch-test'))

// exporting the module
module.exports = app