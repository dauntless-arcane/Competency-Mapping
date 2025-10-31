// declarations
const express = require('express')
const app = express.Router()
const SurveyResponse = require("./../models/suvey-response");
const Joi = require('joi');

// ===================
// Validation schema
// ===================
const responseSchema = Joi.object({
  surveyId: Joi.string().trim().required(),
  ans: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string().required(),
        value: Joi.number().min(0).max(5).required()
      })
    )
    .min(1)
    .required()
});

// api access here

app.post('/', async (req, res) => {
  const surveyId = req.body.surveyId;
  const ans = req.body.ans;
  const username = req.headers['x-username']; // expected to be a Mongo ObjectId

  console.log('📩 Incoming response:', { surveyId, ans, username });

  // 1️⃣ Validate header
  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    return res.status(400).json({
      Status: false,
      Error: true,
      Msg: 'Missing or invalid x-username header (expected userId)'
    });
  }

  // 2️⃣ Validate body
  const { error } = responseSchema.validate({ surveyId, ans }, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      Status: false,
      Error: true,
      Msg: 'Validation failed',
      Details: error.details.map((d) => ({
        path: d.path.join('.'),
        message: d.message
      }))
    });
  }

  try {
    // 3️⃣ Create the document
    const newResponse = new SurveyResponse({
      username, // userId ref
      surveyId: surveyId, // rename surveyId -> testId for your schema
      answers: ans,
      scores: {}, // optional: fill later with scoring logic
    });

    await newResponse.save();

    console.log('✅ Saved SurveyResponse:', newResponse._id);

    res.status(201).json({
      Status: true,
      Error: false,
      Msg: 'The Data has been saved Successfully',
      Id: newResponse._id
    });
  } catch (err) {
    console.error('❌ issue in users/entry', err);
    res.status(500).json({
      Status: false,
      Error: true,
      ErrMsg: err.message || String(err)
    });
  }
});

// exporting the module
module.exports = app;
