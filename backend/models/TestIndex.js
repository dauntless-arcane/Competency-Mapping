const mongoose = require('mongoose');

const TestIndexSchema = new mongoose.Schema({
  surveyId: { type: String, required: true, unique: true },
  name: String,
  description: String,
  categories: Array,
  totalQuestions: Number,
  scoringMethod: String,
  questions: [
    {
      text: String,
      trait: String,
      reversedScore: Boolean,
      options: [
        { value: Number, label: String }
      ]
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.TestIndex || mongoose.model('TestIndex', TestIndexSchema);
