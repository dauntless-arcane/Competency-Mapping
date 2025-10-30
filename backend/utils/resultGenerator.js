const Question = require('../models/questionsSchema');
const Result = require('../models/ResultSchema');
const Test = require('../models/TestsSchema');

/**
 * Simple psychometric result generator:
 * Final Score = SUM(all question values per category) + categoryConstants[category]
 */
async function generateResultFromSurvey(surveyResponse) {
  if (!surveyResponse || !surveyResponse.answers)
    throw new Error('Invalid SurveyResponse');

  const { surveyId, username, _id: attemptId, answers } = surveyResponse;
  if (!surveyId || !username) throw new Error('Missing surveyId or username');

  // ✅ Prevent duplicate result for same attempt
  const existing = await Result.findOne({ attemptId });
  if (existing) {
    console.log(`♻️ Result already exists for attempt ${attemptId}`);
    return existing;
  }

  // 🔍 Load test and questions
  const test = await Test.findOne({ surveyId }).lean();
  if (!test) throw new Error(`No test found for surveyId: ${surveyId}`);

  const questions = await Question.find({ surveyId }).lean();
  if (!questions.length) throw new Error(`No questions found for surveyId: ${surveyId}`);

  // ✅ Convert categoryConstants safely
  let constants = {};
  if (test.categoryConstants instanceof Map) {
    constants = Object.fromEntries(test.categoryConstants);
  } else if (typeof test.categoryConstants?.toObject === 'function') {
    constants = test.categoryConstants.toObject();
  } else if (typeof test.categoryConstants === 'object' && test.categoryConstants !== null) {
    constants = { ...test.categoryConstants };
  }

  // ✅ Prepare category totals
  const totals = {};
  const categories = Array.isArray(test.categories)
    ? test.categories.map(c => c.name)
    : [];

  for (const cat of categories) {
    totals[cat] = 0; // initialize all categories to 0
    if (typeof constants[cat] !== 'number') constants[cat] = 0;
  }

  // 🧮 Calculate sums per trait/category
  for (const ans of answers) {
    const q = questions.find(q => String(q.questionId) === String(ans.questionId));
    if (!q || !q.trait) continue;

    const trait = q.trait.trim();
    const reversed = q.reversedScore === true || q.reversedScore === 'true';
    const value = Number(ans.value);
    if (Number.isNaN(value)) continue;

    const adjusted = reversed ? 6 - value : value;
    totals[trait] = (totals[trait] || 0) + adjusted;
  }

  // 🧾 Add constants → final scores
  const scores = {};
  for (const trait of Object.keys(totals)) {
    const total = totals[trait] || 0;
    const constant = constants[trait] || 0;
    scores[trait] = total + constant;
  }

  // 🧠 Build summary + breakdown
  const summary = Object.entries(scores)
    .map(([trait, score]) => `${trait}: ${score}`)
    .join(', ');

  const traitBreakdown = Object.entries(scores).map(([trait, score]) => ({
    trait,
    description: `Final score for ${trait}: ${score} (sum + constant ${constants[trait] || 0})`
  }));

  // 💾 Save result
  const result = await Result.create({
    surveyId,
    userId: username,
    attemptId,
    overallSummary: summary,
    traitBreakdown
  });
  await SurveyResponse.updateOne(
  { _id: new mongoose.Types.ObjectId(attemptId) },
  { $set: { scores } } // directly store calculated scores
);


  console.log(`✅ [local] Result generated for ${username} (${surveyId})`);
  return result;
}

module.exports = { generateResultFromSurvey };
