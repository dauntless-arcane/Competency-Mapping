// routes/result.js
const express = require('express');
const router = express.Router();
const Result = require('../models/ResultSchema');


router.post('/:userId/:surveyId', async (req, res) => {
  try {
    const { userId, surveyId } = req.params;    
    const result = await Result.findOne({ userId, surveyId })
    
    if (!result) {
      return res.status(404).json({
        Status: false,
        Error: true,
        Msg: 'Result not found for this user/test.'
      });
    }

    return res.status(200).json({
      Status: true,
      Error: false,
      Msg: 'Result fetched successfully',
      Result: {
        
        testId: result.testId,
        userId: result.userId,
        overallSummary: result.overallSummary,
        traitBreakdown: result.traitBreakdown,
        generatedAt: result.generatedAt
      }
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
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

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

    return res.status(200).json({
      Status: true,
      Error: false,
      Count: results.length,
      Results: results.map((r) => ({
        testId: r.testId,
        overallSummary: r.overallSummary,
        generatedAt: r.generatedAt,
        traits: r.traitBreakdown
      }))
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
