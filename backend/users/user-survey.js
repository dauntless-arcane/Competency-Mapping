// declarations
const express = require('express')
const app = express.Router()
const SurveyResponse = require("./../models/suvey-response");

// api access here
app.post('/',async(req,res)=>{
    const surveyId = req.body.surveyId;
    const ans = req.body.ans;
    const username = req.headers['x-username']
    try{
        console.log({
        surveyId,
        ans,
        username,

    });
        
    // Storing the response in the mongo
    await new SurveyResponse({
        surveyId,
        ans,
        username,

    }).save()
    res.status(201).json({
        Status:true,
        Error:false,
        Msg:"The Data has been saved Successfully"
    })
} catch(err){
    console.error('❌ issue in users/entry',err)
    res.status(500).json({
        Status:true,
        Error:true,
        ErrMsg:err
    })
}
})

// exporting the module
module.exports = app