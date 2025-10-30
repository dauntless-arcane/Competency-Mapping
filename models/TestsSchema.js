const mongoose = require('mongoose');

const TestsSchema = new mongoose.Schema({
  surveyId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: Object, required: true }],
  totalQuestions: { type: Number, required: true },
  scoringMethod: { type: String, required: true },

  // ⏱ Optional metadata
  duration: { type: String },
  level: { type: String },
  recommended: { type: Boolean },

  // 🧮 Fixed constants per category (Big Five etc.)
  categoryConstants: {
    type: Map,
    of: Number,     // Example: { E: 20, A: 14, C: 14, N: 38, O: 8 }
    default: {}
  },

  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Tests || mongoose.model("Tests", TestsSchema);
