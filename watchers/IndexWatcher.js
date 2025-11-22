// watchers/testIndexWatcher.js
const mongoose = require('mongoose');
const Test = require('../models/TestsSchema');
const Question = require('../models/questionsSchema');

const INDEX_COLLECTION = 'test_index';

/**
 * Builds or updates a single test index document based on its surveyId.
 */
async function buildSingleTestIndex(surveyIdOrObjectId) {
  try {
    // 🧩 Fetch the test either by surveyId or fallback _id (for backward support)
    const test =
      (await Test.findOne({ surveyId: surveyIdOrObjectId })) ||
      (await Test.findById(surveyIdOrObjectId));

    if (!test) {
      console.warn(`⚠️ Test not found for ID: ${surveyIdOrObjectId}`);
      return;
    }
    if (!test.surveyId) {
      console.error(
        `❌ Test ${test._id} is missing surveyId — aborting index build to avoid mixing.`
      );
      return;
    }

    // 🎯 Strictly match all related questions by surveyId
    const questions = await Question.find({ surveyId: test.surveyId }).sort({ testIndex: 1 }).lean();

    // 🧠 Prepare the index document (aligned with latest schema)
    const testIndexDoc = {
      surveyId: test.surveyId,
      name: test.name,
      description: test.description,
      categories: test.categories,
      totalQuestions: test.totalQuestions,
      scoringMethod: test.scoringMethod,
      duration: test.duration || '8 min',
      level: test.level || 'Intermediate',
      recommended: typeof test.recommended === 'boolean' ? test.recommended : true,
      questions,
      updatedAt: new Date()
    };

    const collection = mongoose.connection.collection(INDEX_COLLECTION);

    // 🔁 Upsert by surveyId
    await collection.updateOne(
      { surveyId: test.surveyId },
      { $set: testIndexDoc },
      { upsert: true }
    );

    console.log(
      `✅ Indexed test: ${test.name} (${test.surveyId}) — ${questions.length} questions`
    );
  } catch (err) {
    console.error(`❌ Error building test index for ${surveyIdOrObjectId}:`, err.message);
  }
}

/**
 * Rebuilds all test indexes from scratch.
 */
async function buildAllTestIndexes() {
  try {
    const collection = mongoose.connection.collection(INDEX_COLLECTION);
    const tests = await Test.find({});
    if (!tests.length) {
      console.log('⚠️ No tests found to index.');
      return;
    }

    console.log(`🧰 Rebuilding index for ${tests.length} tests (strict surveyId match)...`);

    // Optional cleanup
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

/**
 * Starts the change streams to automatically keep the test index up to date.
 */
async function startTestIndexWatcher() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Connected to MongoDB (watcher)');
    }

    // 🏗 Build current indexes on startup
    await buildAllTestIndexes();

    // 👀 Start watching both collections
    console.log('👀 Watching Tests & Questions for surveyId updates...');

    const testStream = Test.watch([
      { $match: { operationType: { $in: ['insert', 'update', 'replace'] } } }
    ]);

    const questionStream = Question.watch([
      { $match: { operationType: { $in: ['insert', 'update', 'replace', 'delete'] } } }
    ]);

    testStream.on('change', async (change) => {
      const surveyId = change.fullDocument?.surveyId;
      if (surveyId) {
        console.log(`🧩 Test changed for surveyId ${surveyId}`);
        await buildSingleTestIndex(surveyId);
      } else {
        console.warn('⚠️ Test change without surveyId — skipping.');
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

    // 🧯 Auto-restart if streams break
    const restart = () => {
      console.warn('⚠️ Change stream closed — restarting watcher in 3s...');
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

module.exports = {
  startTestIndexWatcher,
  buildAllTestIndexes,
  buildSingleTestIndex
};
