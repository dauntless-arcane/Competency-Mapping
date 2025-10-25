// routes/createTest.js
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express.Router();
const Questions = require('./../models/questionsSchema');
const Tests = require('./../models/TestsSchema');

// ---------- Joi Schemas ----------
const optionSchema = Joi.object({
  value: Joi.number().required(),
  // allow number or string in payload; we will store as string
  label: Joi.alternatives(Joi.string(), Joi.number()).required()
});

const questionSchema = Joi.object({
  text: Joi.string().trim().min(1).required(),
  options: Joi.array().items(optionSchema).min(2).required(),
  trait: Joi.string().trim().min(1).required(),
  // accept boolean or "true"/"false"; we will store string
  reversedScore: Joi.alternatives().try(
    Joi.boolean(),
    Joi.string().valid('true', 'false', 'True', 'False', 'TRUE', 'FALSE', '0', '1')
  ).required()
});

const payloadSchema = Joi.object({
  name: Joi.string().trim().min(3).max(120).required(),
  description: Joi.string().trim().min(3).required(),
  categories: Joi.array().items(Joi.object()).min(1).required(),
  scoringMethod: Joi.string().valid('sum', 'average', 'weighted').required(),
  questions: Joi.array().items(questionSchema).min(1).required(),
  totalQuestions: Joi.number().integer().min(1).required() // ✅ now required
}).custom((value, helpers) => {
  // ensure totalQuestions equals questions.length
  if (value.totalQuestions !== value.questions.length) {
    return helpers.error('any.custom', { message: 'totalQuestions must equal questions.length' });
  }
  return value;
}, 'totalQuestions matches');


// ---------- Helpers ----------
function generateHex7() {
  return Math.floor(Math.random() * 0x10000000).toString(16).toUpperCase().padStart(7, '0');
}
const toBoolString = v => {
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  const s = String(v).toLowerCase();
  return (s === '1' || s === 'true') ? 'true' : 'false';
};

// ---------- Route ----------
app.post('/', async (req, res) => {
  // 1) Validate payload
  const { value, error } = payloadSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      Status: false,
      Error: true,
      Msg: 'Validation failed',
      Details: error.details.map(d => ({ path: d.path.join('.'), message: d.message }))
    });
  }

  // 2) Normalize for DB (types consistent with your Mongoose schemas)
  const surveyId = generateHex7();
  const questionsNorm = value.questions.map(q => ({
    surveyId,
    questionId: generateHex7(),
    text: q.text.trim(),
    trait: q.trait.trim(),
    reversedScore: toBoolString(q.reversedScore), // your schema expects String
    options: q.options.map(o => ({
      value: Number(o.value),
      label: String(o.label) // your schema should use String for label
    }))
  }));

  const testDoc = {
    surveyId,
    name: value.name.trim(),
    description: value.description.trim(), // matches your existing key
    categories: value.categories,
    totalQuestions: value.totalQuestions ?? questionsNorm.length,
    scoringMethod: value.scoringMethod
  };

  // 3) Transaction: insert Test + Questions atomically
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await Tests.create([testDoc], { session });
      await Questions.insertMany(questionsNorm, { session });
    });

    return res.status(201).json({
      Status: true,
      Error: false,
      Msg: 'Test and questions created successfully',
      surveyId,
      totalQuestions: questionsNorm.length
    });
  } catch (err) {
    console.error('❌ Transaction failed:', err);
    return res.status(500).json({
      Status: false,
      Error: true,
      Msg: 'Failed to create test/questions',
      ErrMsg: err.message || String(err)
    });
  } finally {
    await session.endSession();
  }
});

module.exports = app;
