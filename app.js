// Imports
const express = require('express');
const app = express();
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
var DB = require('./database/mongo.cjs')
// const { startSurveyResponseWatcher } = require('./utils/resultWatcher');

// dot env config
dotenv.config({ path: './.env' })
// express config
app.use(bodyParser.json());


// Cors Setup
app.use(function(req, res, next) {
    console.log(req.headers.origin);
    console.log(req.url);
    console.log(req.headers.referer);
    // if (req.headers.origin == 'http://localhost:4200' || req.headers.referer == 'http://localhost:4200/') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin , X-Requested-With, Content-Type, Accept,x-username, x-email, x-token');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // ✅ allow cookies/auth

    next();
    // } else {
    //     return res.sendStatus(401)
    // }
})
// api setup
app.use("/api/admin", require('./admin/routing'))


app.use("/api/users", require('./users/routing'))


// Running the exress Server
const serve = app.listen(3010,()=>{

})
// DB.connectDB();
// startSurveyResponseWatcher(); // 👀 Start watching globall
