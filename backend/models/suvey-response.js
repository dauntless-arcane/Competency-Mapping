const mongoose = require('mongoose');
const { generateResultFromSurvey } = require('../utils/resultGenerator');

const answerSchema = new mongoose.Schema({
  questionId: { type: String, ref: 'Question', required: true },
  value: { type: Number, required: true }
});

const SurveyResponseSchema = new mongoose.Schema({
  username: { type: String, ref: 'User', required: true },
  surveyId: { type: String, ref: 'Test', required: true },
  answers: [answerSchema],
  scores: {
    type: Map,
    of: Number
  },
  completedAt: { type: Date, default: Date.now }
});

// ✅ Automatically generate a result after saving
SurveyResponseSchema.post('save', async function (doc) {
  try {
    console.log(`📩 [local] SurveyResponse saved: ${doc.surveyId}`);
    await generateResultFromSurvey(doc);
  } catch (err) {
    console.error('❌ [local] Error auto-generating result:', err.message);
  }
});

module.exports = mongoose.models.SurveyResponse ||
  mongoose.model('SurveyResponse', SurveyResponseSchema);
