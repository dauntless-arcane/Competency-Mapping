// routes/result.js
const express = require('express');
const router = express.Router();
const Result = require('../models/ResultSchema');
const Test = require('../models/TestsSchema');


router.post('/:userId/:attemptId', async (req, res) => {
  try {
    const { userId, attemptId } = req.params;

    // 1️⃣ Find the result using userId and attemptId
    const result = await Result.findOne({ userId, attemptId }).lean();
    
    if (!result) {
      return res.status(404).json({
        Status: false,
        Error: true,
        Msg: 'Result not found for this user/attempt.'
      });
    }

    // 2️⃣ Fetch the related test using surveyId from the result
    const test = await Test.findOne({ surveyId: result.surveyId })
      .select('name level description')
      .lean();

    // 3️⃣ Format response
    const formattedResult = {
      name: test?.name || 'Unknown Test',
      level: test?.level || 'N/A',
      surveyId: result.surveyId || 'N/A',
      attemptId: result.attemptId?.toString() || 'N/A',
      overallSummary: result.overallSummary || '',
      traitBreakdown: result.traitBreakdown || [],
      dateAttempted: result.generatedAt || result.createdAt || 'N/A',
      TestStatus: 'Completed'
    };

    // 4️⃣ Send final response
    return res.status(200).json({
      Status: true,
      Error: false,
      Msg: 'Result fetched successfully',
      Result: formattedResult
    });
  } catch (err) {
    console.error('❌ Error fetching result:', err);
    res.status(500).json({
      Status: false,
      Error: true,
      Msg: 'Internal server error',
      ErrMsg: err.message
    });
  }
});




router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Fetch all results for the user
    const results = await Result.find({ userId })
      .sort({ generatedAt: -1 })
      .lean();

    if (!results || results.length === 0) {
      return res.status(404).json({
        Status: false,
        Error: true,
        Msg: 'No results found for this user.'
      });
    }

    // 2️⃣ Extract all surveyIds from results
    const surveyIds = results.map(r => r.surveyId);

    // 3️⃣ Fetch corresponding test details
    const tests = await Test.find({ surveyId: { $in: surveyIds } })
      .select('surveyId name level')
      .lean();

    // 4️⃣ Map test info by surveyId for fast lookup
    const testMap = {};
    tests.forEach(t => {
      testMap[t.surveyId] = t;
    });

    // 5️⃣ Combine data
    const formattedResults = results.map(r => ({
      name: testMap[r.surveyId]?.name || 'Unknown',
      level: testMap[r.surveyId]?.level || 'Unknown',
      resultId: r.attemptId?.toString() || r.attemptId || 'N/A',
      dateAttempted: r.generatedAt || r.createdAt || 'N/A',
    }));

    // 6️⃣ Return response
    return res.status(200).json({
      Status: true,
      Error: false,
      Count: formattedResults.length,
      Data: formattedResults
    });

  } catch (err) {
    console.error('❌ Error fetching results:', err);
    res.status(500).json({
      Status: false,
      Error: true,
      Msg: 'Failed to fetch results',
      ErrMsg: err.message
    });
  }
});


module.exports = router;
