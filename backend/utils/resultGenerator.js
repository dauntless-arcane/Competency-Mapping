const Question = require('../models/questionsSchema');
const Result = require('../models/ResultSchema');

async function generateResultFromSurvey(surveyResponse) {
  if (!surveyResponse || !surveyResponse.answers)
    throw new Error('Invalid SurveyResponse');

  // Destructure fields from SurveyResponse document
  const { testId, username, _id: attemptId, answers } = surveyResponse;

  // ✅ Check if a result already exists for THIS SurveyResponse ObjectId
  const existing = await Result.findOne({ attemptId });
  if (existing) {
    console.log(`♻️ Updating existing Result for attempt ${attemptId}`);
    return await updateExistingResult(existing, answers);
  }

  // 🔍 Fetch all relevant question documents
  const questionIds = answers.map((a) => a.questionId);
  const questions = await Question.find({ questionId: { $in: questionIds } }).lean();

  // 🧮 Calculate scores per trait
  const traitScores = {};
  for (const ans of answers) {
    const q = questions.find((q) => String(q.questionId) === String(ans.questionId));
    if (!q) continue;

    const trait = q.trait;
    const reversed = q.reversedScore === true || q.reversedScore === 'true';
    const value = reversed ? 6 - ans.value : ans.value;

    traitScores[trait] = (traitScores[trait] || 0) + value;
  }

  // 🗒️ Build result summary and breakdown
  const summary = Object.entries(traitScores)
    .map(([trait, score]) => `${trait}: ${score}`)
    .join(', ');

  const traitBreakdown = Object.entries(traitScores).map(([trait, score]) => ({
    trait,
    description: `Your score for ${trait} is ${score}`
  }));

  // 💾 Save new Result — linked directly to the SurveyResponse’s ObjectId
  const result = await Result.create({
    testId,
    userId: surveyResponse.username,
    attemptId, // direct ObjectId reference
    overallSummary: summary,
    traitBreakdown
  });

  console.log(`✅ Result generated for ${username} [${attemptId}]`);
  return result;
}

// Optional helper if you want updates later
async function updateExistingResult(existingResult, answers) {
  // Implement logic to recompute and update result here if needed
  return existingResult;
}

module.exports = { generateResultFromSurvey };
