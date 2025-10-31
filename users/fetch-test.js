// routes/result.js
const express = require('express');
const router = express.Router();
const Result = require('../models/ResultSchema');
const mongoose = require('mongoose');


router.post('/', async (req, res) => {
try{
    const data = await mongoose.connection.collection('test_index').find({},
   { projection:    {
        _id:0,surveyId:1,description:1,name:1,duration:1,level:1,recommended:1
    }}
).toArray()
    res.status(200).json({status:true, error:false,data:data})
} catch(err){
        res.status(500).json({ status:true,error: true, message: err.message });

}
});
router.post('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // ensure we match correctly regardless of type
    const collection = mongoose.connection.collection('test_index');

    const data = await collection
      .find(
        {
          $or: [
            { surveyId: id },                // if stored as string
          ]
        },
        {
          projection: {
            _id: 0,          // hide _id
            surveyId: 1,
            name: 1,
            description: 1,
            categories: 1,
            totalQuestions: 1,
            scoringMethod: 1,
            questions: 1,   // include full questions array
            updatedAt: 1
          }
        }
      )
      .toArray();

    if (!data.length) {
      return res.status(404).json({
        status: false,
        error: true,
        message: `No test found with surveyId ${id}`
      });
    }

    res.status(200).json({
      status: true,
      error: false,
      count: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: true,
      message: err.message
    });
  }
});

module.exports = router;