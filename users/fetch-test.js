// routes/fetch-test.js
const express = require('express');
const router = express.Router();
const TestIndex = require("../models/TestIndex");

// 🔥 Prometheus Function Timer
const startTimer = require('../utils/timer');

// 🔥 Redis Cache
const cache = require('../utils/cache');
const readCache = require("../utils/readCache");
const writeCache = require("../utils/writeCache");

// =================================================================
// ===================== INTERNAL HANDLER: GET ALL TESTS ============
// =================================================================
async function handleGetAllTests(req, res) {
  const t_total = startTimer("tests_get_all_total");

  const cacheKey = "tests:all:v1";
  const cached = await readCache(cacheKey);
  if (cached) {
    t_total();
    return res.json(cached);
  }
  const data = await TestIndex.find(
    {},
    {
      projection: {
        _id: 0,
        surveyId: 1,
        description: 1,
        name: 1,
        duration: 1,
        level: 1,
        recommended: 1
      }
    }
  ).toArray();

  const responseObj = { status: true, error: false, data };

  await writeCache(cacheKey, 86400, responseObj);
  t_total();
  return res.json(responseObj);
}



// =================================================================
// ================= INTERNAL HANDLER: GET ONE TEST BY ID ===========
// =================================================================

async function handleGetOneTest(req, res) {
  const t_total = startTimer("tests_get_one_total");

  try {
    // -------------------- PARAM EXTRACTION --------------------
    const t_extract = startTimer("tests_get_one_extract_params");
    const id = (req.params.id || req.body.id || "").trim();
    t_extract();

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Missing surveyId"
      });
    }

    // -------------------- CACHE READ --------------------
    const cacheKey = `tests:single:${id}:v1`;

    const cached = await readCache(cacheKey);
    if (cached) {
      t_total();
      return res.json(cached);
    }


    // -------------------- DB QUERY --------------------
    const t_query = startTimer("tests_get_one_db_query");
    const data = await TestIndex.find(
      { surveyId: id },
      {
        projection: {
          _id: 0,
          surveyId: 1,
          name: 1,
          description: 1,
          categories: 1,
          totalQuestions: 1,
          scoringMethod: 1,
          questions: 1,
          updatedAt: 1
        }
      }
    ).toArray();
    t_query();

    if (!data.length) {
      t_total();
      return res.status(404).json({
        status: false,
        error: true,
        message: `No test found with surveyId ${id}`
      });
    }

    // -------------------- RESPONSE FORMAT --------------------
    const t_response = startTimer("tests_get_one_format_response");
    const responseObj = {
      status: true,
      error: false,
      count: data.length,
      data
    };
    t_response();

    // -------------------- CACHE WRITE --------------------
    await writeCache(cacheKey, 86400, responseObj);

    t_total();
    return res.status(200).json(responseObj);

  } catch (err) {
    t_total();
    return res.status(500).json({
      status: false,
      error: true,
      message: err.message
    });
  }
}




// =================================================================
// ===================== ROUTING LAYER (GET + POST + CACHE) =========
// =================================================================

// GET ALL TESTS — cached for 300s
router.post('/',  handleGetAllTests);  

router.post('/:id', handleGetOneTest); 


module.exports = router;
