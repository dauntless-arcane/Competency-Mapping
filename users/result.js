// routes/result.js
const express = require('express');
const router = express.Router();
const Result = require('../models/ResultSchema');
const Test = require('../models/TestsSchema');
// 🔥 Prometheus Function Timer
const startTimer = require('../utils/timer');
// 🔥 Redis Cache
const readCache = require('../utils/readCache');
const writeCache = require('../utils/writeCache');



// ============================================================
// Helper: Resolve values from GET or POST
// ============================================================
function resolveParams(req) {
  return {
    userId: req.params.userId || req.body.userId,
    attemptId: req.params.attemptId || req.body.attemptId
  };
}



// ============================================================
// INTERNAL HANDLER: SINGLE RESULT
// ============================================================
async function handleGetSingleResult(req, res) {
  const t_total = startTimer("result_single_total");

  try {
    const t_extract = startTimer("result_single_extract_params");
    const { userId, attemptId } = resolveParams(req);
    t_extract();

    if (!userId || !attemptId) {
      return res.status(400).json({
        Status: false,
        Msg: "Missing userId / attemptId"
      });
    }

    // ---------------- CACHE READ ----------------
    const cacheKey = `result:single:${userId}:${attemptId}:v1`;
    const cached = await readCache(cacheKey);
    if (cached) {
      t_total();
      return res.json(cached);
    }

    // ---------------- DB: RESULT ----------------
    const t_fetchResult = startTimer("result_single_fetch_result");
    const result = await Result.findOne({ userId, attemptId })
      .select("surveyId overallSummary traitBreakdown generatedAt createdAt attemptId")
      .lean();
    t_fetchResult();

    if (!result) {
      t_total();
      return res.status(404).json({ Status: false, Msg: "Result not found" });
    }

    // ---------------- DB: TEST ----------------
    const t_fetchTest = startTimer("result_single_fetch_test");
    const test = await Test.findOne({ surveyId: result.surveyId })
      .select("name level description")
      .lean();
    t_fetchTest();

    // ---------------- RESPONSE ----------------
    const t_format = startTimer("result_single_format");
    const responseObj = {
      Status: true,
      Error: false,
      Msg: "Result fetched successfully",
      Result: {
        name: test?.name || "Unknown Test",
        level: test?.level || "N/A",
        surveyId: result.surveyId,
        attemptId: String(result.attemptId),
        overallSummary: result.overallSummary,
        traitBreakdown: result.traitBreakdown,
        dateAttempted: result.generatedAt || result.createdAt,
        TestStatus: "Completed"
      }
    };
    t_format();

    // ---------------- CACHE WRITE ----------------
    await writeCache(cacheKey, 1800, responseObj);

    t_total();
    return res.status(200).json(responseObj);

  } catch (err) {
    t_total();
    return res.status(500).json({ Status: false, Msg: err.message });
  }
}


// ============================================================
// INTERNAL HANDLER: ALL RESULTS FOR USER
// ============================================================
async function handleGetAllResults(req, res) {
  const t_total = startTimer("result_all_total");

  try {
    const userId = req.params.userId || req.body.userId;
    if (!userId) {
      return res.status(400).json({
        Status: false,
        Msg: "Missing userId"
      });
    }

    // ---------------- CACHE READ ----------------
    const cacheKey = `result:all:${userId}:v1`;
    const cached = await readCache(cacheKey);
    if (cached) {
      t_total();
      return res.json(cached);
    }

    // ---------------- DB: RESULTS ----------------
    const t_fetchResults = startTimer("result_all_fetch_results");
    const results = await Result.find({ userId })
      .sort({ generatedAt: -1 })
      .lean();
    t_fetchResults();

    if (!results.length) {
      t_total();
      return res.status(404).json({
        Status: false,
        Msg: "No results found"
      });
    }

    const surveyIds = results.map(r => r.surveyId);

    // ---------------- DB: TESTS ----------------
    const t_fetchTests = startTimer("result_all_fetch_tests");
    const tests = await Test.find({ surveyId: { $in: surveyIds } })
      .select("surveyId name level")
      .lean();
    t_fetchTests();

    // ---------------- MAP ----------------
    const t_map = startTimer("result_all_map_tests");
    const testMap = {};
    tests.forEach(t => (testMap[t.surveyId] = t));
    t_map();

    // ---------------- RESPONSE ----------------
    const t_format = startTimer("result_all_format_response");
    const responseObj = {
      Status: true,
      Error: false,
      Count: results.length,
      Data: results.map(r => ({
        name: testMap[r.surveyId]?.name || "Unknown",
        level: testMap[r.surveyId]?.level || "Unknown",
        resultId: String(r.attemptId),
        dateAttempted: r.generatedAt || r.createdAt
      }))
    };
    t_format();

    // ---------------- CACHE WRITE ----------------
    await writeCache(cacheKey, 1800, responseObj);

    t_total();
    return res.status(200).json(responseObj);

  } catch (err) {
    t_total();
    return res.status(500).json({ Status: false, Msg: err.message });
  }
}



// ============================================================
// ROUTES (with caching + backward compatibility)
// ============================================================

// SINGLE RESULT — cache 60s
router.post('/:userId/:attemptId', handleGetSingleResult); // old clients

// ALL RESULTS — cache 60s
router.post('/:userId', handleGetAllResults); // old clients


module.exports = router;
