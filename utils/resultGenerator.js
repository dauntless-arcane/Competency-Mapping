// generateResultFromSurvey.js
const Question = require('../models/questionsSchema');
const Result = require('../models/ResultSchema');
const Test = require('../models/TestsSchema');
const SurveyResponse = require('../models/suvey-response');
const mongoose = require('mongoose');
const scoringActions = require('./scoringActions');

// convert action-name string to camelCase-friendly form
function toCamel(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/([-_][a-z])/g, group =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

async function generateResultFromSurvey(surveyResponse) {
  if (!surveyResponse) throw new Error('Missing surveyResponse');

  // COERCE answers: accept array OR object-keyed map
  let answers = surveyResponse.answers;
  if (!answers) answers = [];
  else if (!Array.isArray(answers) && typeof answers === 'object') {
    // convert keyed object to array
    answers = Object.values(answers);
  }

  const { surveyId, username, _id: attemptId } = surveyResponse;
  if (!surveyId || !username) throw new Error('Missing surveyId or username');

  // Prevent duplicate
  const existing = await Result.findOne({ attemptId });
  if (existing) {
    console.log(`♻️ Result already exists for attempt ${attemptId}`);
    return existing;
  }

  // Load test & questions
  const test = await Test.findOne({ surveyId }).lean();
  if (!test) throw new Error(`No test found for surveyId: ${surveyId}`);

  const questions = await Question.find({ surveyId }).lean();
  if (!questions || !questions.length) throw new Error(`No questions for survey ${surveyId}`);

  // Convert categoryConstants safely (handles Map etc.)
  let constants = {};
  if (test.categoryConstants instanceof Map) constants = Object.fromEntries(test.categoryConstants);
  else if (typeof test.categoryConstants?.toObject === 'function') constants = test.categoryConstants.toObject();
  else if (typeof test.categoryConstants === 'object' && test.categoryConstants !== null) constants = { ...test.categoryConstants };

  // default pipeline steps if test.steps missing
  const defaultSteps = [
    { action: "compute_raw_scores" },
    // If scoringMethod === 'sum' prefer sum, else avg
    { action: (String(test.scoringMethod || '').toLowerCase() === 'sum') ? 'sum_traits' : 'avg_traits' },
    { action: "add_constants", constants }
  ];

  const steps = Array.isArray(test.steps) && test.steps.length ? test.steps : defaultSteps;

  // Prepare base ctx
  let ctx = {};

  // Execute pipeline: each fn gets (ctx, step, test, answers, questions)
  for (const step of steps) {
    if (!step || !step.action) throw new Error('Invalid step in pipeline');
    const actionName = step.action;
    // find function: try as-is, then camel, then direct key
    const fn = scoringActions[actionName]
      || scoringActions[toCamel(actionName)]
      || scoringActions[actionName.toLowerCase()];

    if (typeof fn !== 'function') {
      throw new Error(`Unknown scoring step: ${actionName}`);
    }

    // call function (sync or promise)
    ctx = await fn(ctx, step, test, answers, questions) || ctx;
  }

  // Determine final scores (fall back order)
  const finalScores = ctx.final || ctx.summed || ctx.averaged || ctx.formulaResults || {};

  // Build traitBreakdown & summary
  const traitBreakdown = Object.entries(finalScores).map(([trait, score]) => ({
    trait,
    score
  }));

  const summary = Object.entries(finalScores).map(([t, s]) => `${t}: ${s}`).join(', ');

  // Save result
  const result = await Result.create({
    surveyId,
    userId: username,
    attemptId,
    overallSummary: summary,
    traitBreakdown,
    finalScores,
    advanced: ctx
  });

  // Persist scores into surveyResponse
  await SurveyResponse.updateOne(
    { _id: new mongoose.Types.ObjectId(attemptId) },
    { $set: { scores: finalScores, advanced: ctx } }
  );

  console.log(`✅ Result generated for ${username} (${surveyId})`);
  return result;
}

module.exports = { generateResultFromSurvey };
