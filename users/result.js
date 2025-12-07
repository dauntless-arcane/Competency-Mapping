// routes/result.js
const express = require('express');
const router = express.Router();
const Result = require('../models/ResultSchema');
const Test = require('../models/TestsSchema');

// 🔥 Function Timer
const startTimer = require('../utils/timer');


// ===========================================================
// =============== FETCH RESULT BY USER + ATTEMPT ============
// ===========================================================
router.post('/:userId/:attemptId', async (req, res) => {
  const t_total = startTimer("result_get_single_total");

  try {
    const t_extract = startTimer("result_get_single_extract_params");
    const { userId, attemptId } = req.params;
    t_extract();

    // 1️⃣ Fetch result
    const t_fetchResult = startTimer("result_get_single_db_fetch_result");
    const result = await Result.findOne({ userId, attemptId })
      .select('surveyId overallSummary traitBreakdown generatedAt createdAt attemptId')
      .lean();
    t_fetchResult();

    if (!result) {
      t_total();
      return res.status(404).json({
        Status: false,
        Error: true,
        Msg: 'Result not found for this user/attempt.'
      });
    }

    // 2️⃣ Fetch test info
    const t_fetchTest = startTimer("result_get_single_db_fetch_test");
    const test = await Test.findOne({ surveyId: result.surveyId })
      .select('name level description')
      .lean();
    t_fetchTest();

    // 3️⃣ Construct output
    const t_format = startTimer("result_get_single_format_response");
    const responseObj = {
      Status: true,
      Error: false,
      Msg: 'Result fetched successfully',
      Result: {
        name: test?.name || 'Unknown Test',
        level: test?.level || 'N/A',
        surveyId: result.surveyId,
        attemptId: result.attemptId?.toString(),
        overallSummary: result.overallSummary,
        traitBreakdown: result.traitBreakdown,
        dateAttempted: result.generatedAt || result.createdAt,
        TestStatus: 'Completed'
      }
    };
    t_format();

    t_total();
    return res.status(200).json(responseObj);

  } catch (err) {
    console.error('❌ Error fetching result:', err);

    t_total();

    return res.status(500).json({
      Status: false,
      Error: true,
      Msg: 'Internal server error',
      ErrMsg: err.message
    });
  }
});


// ===========================================================
// =============== FETCH ALL RESULTS FOR USER ================
// ===========================================================
router.post('/:userId', async (req, res) => {
  const t_total = startTimer("result_get_all_total");

  try {
    const t_extract = startTimer("result_get_all_extract_params");
    const { userId } = req.params;
    t_extract();

    // 1️⃣ Fetch all results
    const t_fetchResults = startTimer("result_get_all_db_fetch_results");
    const results = await Result.find({ userId })
      .sort({ generatedAt: -1 })
      .lean();
    t_fetchResults();

    if (!results || results.length === 0) {
      t_total();
      return res.status(404).json({
        Status: false,
        Error: true,
        Msg: 'No results found for this user.'
      });
    }

    // 2️⃣ Extract surveyIds
    const t_extractIds = startTimer("result_get_all_extract_surveyIds");
    const surveyIds = results.map(r => r.surveyId);
    t_extractIds();

    // 3️⃣ Fetch test info for all surveyIds
    const t_fetchTests = startTimer("result_get_all_db_fetch_tests");
    const tests = await Test.find({ surveyId: { $in: surveyIds } })
      .select('surveyId name level')
      .lean();
    t_fetchTests();

    // 4️⃣ Map tests by surveyId
    const t_map = startTimer("result_get_all_map_tests");
    const testMap = {};
    tests.forEach(t => { testMap[t.surveyId] = t; });
    t_map();

    // 5️⃣ Format output list
    const t_format = startTimer("result_get_all_format_results");
    const formattedResults = results.map(r => ({
      name: testMap[r.surveyId]?.name || 'Unknown',
      level: testMap[r.surveyId]?.level || 'Unknown',
      resultId: r.attemptId?.toString() || r.attemptId || 'N/A',
      dateAttempted: r.generatedAt || r.createdAt || 'N/A'
    }));
    t_format();

    t_total();

    return res.status(200).json({
      Status: true,
      Error: false,
      Count: formattedResults.length,
      Data: formattedResults
    });

  } catch (err) {
    console.error('❌ Error fetching results:', err);

    t_total();

    return res.status(500).json({
      Status: false,
      Error: true,
      Msg: 'Failed to fetch results',
      ErrMsg: err.message
    });
  }
});


module.exports = router;
