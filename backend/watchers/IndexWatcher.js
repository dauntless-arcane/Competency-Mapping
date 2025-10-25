// watchers/testIndexWatcher.js
const mongoose = require('mongoose');
const Test = require('../models/TestsSchema');
const Question = require('../models/questionsSchema');

const INDEX_COLLECTION = 'test_index';

async function buildSingleTestIndex(surveyIdOrObjectId) {
  try {
    // Find test by surveyId first; ONLY fall back to _id to locate the test doc,
    // but we will REQUIRE test.surveyId to exist before proceeding.
    const test =
      (await Test.findOne({ surveyId: surveyIdOrObjectId })) ||
      (await Test.findById(surveyIdOrObjectId));

    if (!test) {
      console.warn(`⚠️ Test not found for ID: ${surveyIdOrObjectId}`);
      return;
    }
    if (!test.surveyId) {
      console.error(`❌ Test ${test._id} is missing surveyId — aborting index build to avoid mixing.`);
      return;
    }

    // 🚫 IMPORTANT: strict match by surveyId only (no $or, no fallbacks)
    const questions = await Question.find({ surveyId: test.surveyId }).lean();

    const testIndexDoc = {
      surveyId: test.surveyId,
      name: test.name,
      description: test.description,
      categories: test.categories,
      totalQuestions: test.totalQuestions,
      scoringMethod: test.scoringMethod,
      questions,
      updatedAt: new Date(),
    };

    const collection = mongoose.connection.collection(INDEX_COLLECTION);

    // Upsert by surveyId only
    await collection.updateOne(
      { surveyId: test.surveyId },
      { $set: testIndexDoc },
      { upsert: true }
    );

    console.log(`✅ Indexed test: ${test.name} (${test.surveyId}) with ${questions.length} questions`);
  } catch (err) {
    console.error(`❌ Error building test index for ${surveyIdOrObjectId}:`, err.message);
  }
}

async function buildAllTestIndexes() {
  try {
    const collection = mongoose.connection.collection(INDEX_COLLECTION);
    const tests = await Test.find({});
    if (!tests.length) {
      console.log('⚠️ No tests found to index.');
      return;
    }

    console.log(`🧰 Rebuilding index for ${tests.length} tests (strict surveyId match)...`);

    // Optional: clear the index to avoid leftovers
    await collection.deleteMany({});

    for (const t of tests) {
      if (!t.surveyId) {
        console.warn(`⚠️ Skipping test ${t._id} (missing surveyId).`);
        continue;
      }
      await buildSingleTestIndex(t.surveyId);
    }

    console.log('✅ Rebuild complete.');
  } catch (err) {
    console.error('❌ Error rebuilding all indexes:', err.message);
  }
}

async function startTestIndexWatcher() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Connected to MongoDB (watcher)');
    }

    // Build existing
    await buildAllTestIndexes();

    // Watch for future changes
    console.log('👀 Watching Tests & Questions for strict surveyId updates...');

    const testStream = Test.watch([
      { $match: { operationType: { $in: ['insert', 'update', 'replace'] } } },
    ]);

    const questionStream = Question.watch([
      { $match: { operationType: { $in: ['insert', 'update', 'replace', 'delete'] } } },
    ]);

    testStream.on('change', async (change) => {
      const surveyId = change.fullDocument?.surveyId; // only react if surveyId is present
      if (surveyId) {
        console.log(`🧩 Test changed for surveyId ${surveyId}`);
        await buildSingleTestIndex(surveyId);
      } else {
        console.warn('⚠️ Test change without surveyId — skipping to avoid cross-mapping.');
      }
    });

    questionStream.on('change', async (change) => {
      const surveyId = change.fullDocument?.surveyId;
      if (surveyId) {
        console.log(`📘 Question changed for surveyId ${surveyId}`);
        await buildSingleTestIndex(surveyId);
      } else {
        console.warn('⚠️ Question change without surveyId — skipping.');
      }
    });

    const restart = () => {
      console.warn('⚠️ Stream closed/errored — restarting...');
      setTimeout(startTestIndexWatcher, 3000);
    };
    testStream.on('error', restart);
    questionStream.on('error', restart);
    testStream.on('close', restart);
    questionStream.on('close', restart);
  } catch (err) {
    console.error('❌ Failed to start watcher:', err.message);
  }
}

module.exports = { startTestIndexWatcher, buildAllTestIndexes, buildSingleTestIndex };
