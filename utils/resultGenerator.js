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
// ---- UNIVERSAL AUTO-COLLECTOR ----

// Start empty
let finalScores = {};

// Score containers that may be objects or simple values
const containers = [
  "final",
  "summed",
  "averaged",
  "formulaResults",
  "percentile",
  "z",
  "total"
];

// Merge everything into finalScores
for (const key of containers) {
  if (ctx[key] !== undefined) {
    if (typeof ctx[key] === "object" && !Array.isArray(ctx[key])) {
      finalScores = { ...finalScores, ...ctx[key] };
    } else {
      finalScores[key] = ctx[key]; // simple value (example: total)
    }
  }
}

  // Build traitBreakdown & summary
// const traitBreakdown = Object.entries(finalScores).map(([trait, finalScore]) => {
//   const raw = ctx.rawScores?.[trait] ?? null;
//   const constant = constants?.[trait] ?? 0;

//   // Build description with raw + constant + final
//   let description = `Final score for ${trait}: ${finalScore}`;

//   // Breakdown explanation
//   let parts = [];
//   if (raw !== null) parts.push(`raw ${raw}`);
//   if (constant !== 0) parts.push(`constant ${constant}`);

//   if (parts.length > 0) {
//     description += ` (${parts.join(" + ")} = ${finalScore})`;
//   }

//   return {
//     trait,
//     score: finalScore,   // final score stored
//     description
//   };
// });
// Remove technical KOLB keys or object values
const filteredFinalScores = {};

for (const [trait, value] of Object.entries(finalScores)) {
  // Skip internal Kolb objects
  if (["modes", "quadrants", "dominant"].includes(trait)) continue;

  // Skip values that are objects (quadrants, maps, areas, etc.)
  if (typeof value === "object" && value !== null) continue;

  // Keep normal numeric/string scores
  filteredFinalScores[trait] = value;
}

const traitBreakdown = Object.entries(finalScores).map(([trait, finalScore]) => {
  const raw = ctx.rawScores?.[trait] ?? null;
  const constant = constants?.[trait] ?? 0;

  // Build description with raw + constant + final
  let description = `Final score for ${trait}: ${finalScore}`;

  let parts = [];
  if (raw !== null) parts.push(`raw ${raw}`);
  if (constant !== 0) parts.push(`constant ${constant}`);

  if (parts.length > 0) {
    description += ` (${parts.join(" + ")} = ${finalScore})`;
  }

  return {
    trait,
    score: (typeof finalScore === "object" && finalScore !== null)
      ? JSON.stringify(finalScore)    // fix: stringify objects
      : String(finalScore),           // fix: ensure string for numbers
    description
  };
});


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
