// declarations
const express = require('express')
const app = express.Router()
const jwt = require('jsonwebtoken');


// Middleware
// TBT when we get authentication scheme


app.use('/entry', require('./user-survey'))
app.use('/result', require('./result'))
app.use('/fetch-tests', require('./fetch-test'))

// exporting the module
module.exports = app