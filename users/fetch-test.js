// routes/result.js
const express = require('express');
const router = express.Router();
const Result = require('../models/ResultSchema');
const mongoose = require('mongoose');

// 🔥 Prometheus Function Timer
const startTimer = require('../utils/timer');


// =================================================================
// ============== GET ALL TESTS FROM test_index =====================
// =================================================================
router.post('/', async (req, res) => {
  const t_total = startTimer("tests_get_all_total");

  try {
    const t_collection = startTimer("tests_get_all_select_collection");
    const collection = mongoose.connection.collection('test_index');
    t_collection();

    const t_query = startTimer("tests_get_all_db_query");
    const data = await collection.find(
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
    t_query();

    const t_response = startTimer("tests_get_all_serialize_response");
    const responseObj = { status: true, error: false, data };
    t_response();

    t_total();
    return res.status(200).json(responseObj);

  } catch (err) {

    t_total();

    return res.status(500).json({
      status: true,
      error: true,
      message: err.message
    });
  }
});


// =================================================================
// ===================== GET SPECIFIC TEST BY ID ====================
// =================================================================
router.post('/:id', async (req, res) => {
  const t_total = startTimer("tests_get_one_total");

  try {
    const t_extract = startTimer("tests_get_one_extract_params");
    const id = req.params.id;
    t_extract();

    const t_collection = startTimer("tests_get_one_select_collection");
    const collection = mongoose.connection.collection('test_index');
    t_collection();

    const t_query = startTimer("tests_get_one_db_query");
    const data = await collection.find(
      {
        $or: [
          { surveyId: id } // match string
        ]
      },
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

    const t_response = startTimer("tests_get_one_format_response");
    const responseObj = {
      status: true,
      error: false,
      count: data.length,
      data
    };
    t_response();

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
});


module.exports = router;
