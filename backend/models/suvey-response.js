const mongoose = require('mongoose');

const SurveyResponseSchema = new mongoose.Schema({

username: { type: String, required: true },
surveyId: { type: String, required: true },
ans: {
    type:Object,
    required:true
},
time:{
    type:Date,
    default:Date.now()
}
})
module.exports = mongoose.models.SurveyResponse || mongoose.model("SurveyResponse",SurveyResponseSchema)