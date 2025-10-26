const mongoose = require('mongoose');

const TestsSchema = new mongoose.Schema({

surveyId: { type: String, required: true },
name:{type:String,required:true},
description:{type:String,required:true},
categories:[{type:Object,required:true}],
totalQuestions:{type:Number,required:true},
scoringMethod:{type:String,required:true},
  duration: { type: String },      // ⏱ added, no default
  level: { type: String },         // 🎚 added, no default
  recommended: { type: Boolean },  // ⭐ added, no default
time:{
    type:Date,
    default:Date.now()
}
})
module.exports = mongoose.models.Tests || mongoose.model("Tests",TestsSchema)