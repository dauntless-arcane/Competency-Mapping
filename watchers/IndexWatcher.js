// watchers/testIndexWatcher.js
const mongoose = require('mongoose');
const Test = require('../models/TestsSchema');
const Question = require('../models/questionsSchema');
const { acquireLock } = require('../utils/lock');

const INDEX_COLLECTION = 'test_index';

/**
 * Builds or updates a single test index document based on its surveyId.
 */
async function buildSingleTestIndex(surveyIdOrObjectId) {
  try {
    const test =
      (await Test.findOne({ surveyId: surveyIdOrObjectId })) ||
      (await Test.findById(surveyIdOrObjectId));

    if (!test) {
      console.warn(`⚠️ Test not found for ID: ${surveyIdOrObjectId}`);
      return;
    }

    if (!test.surveyId) {
      console.error(`❌ Test ${test._id} missing surveyId — aborting index build`);
      return;
    }

    // -------------------------
    // ⭐ Acquire distributed lock
    // -------------------------
    const lockKey = `test_index_${test.surveyId}`;
    const gotLock = await acquireLock(lockKey);

    if (!gotLock) {
      console.log(`⛔ Skipping index update for ${test.surveyId} — locked elsewhere`);
      return;
    }

    // proceed with indexing
    const questions = await Question.find({ surveyId: test.surveyId })
      .sort({ testIndex: 1 })
      .lean();

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

    // -------------------------
    // ⭐ Upsert (safe, idempotent)
    // -------------------------
    await collection.updateOne(
      { surveyId: test.surveyId },
      { $set: testIndexDoc },
      { upsert: true }
    );

    console.log(`✅ Indexed test: ${test.name} (${test.surveyId}) — ${questions.length} Qs`);
  } catch (err) {
    console.error(`❌ Error building index for ${surveyIdOrObjectId}:`, err.message);
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

    console.log(`🧰 Rebuilding index for ${tests.length} tests...`);

    await collection.deleteMany({});

    for (const t of tests) {
      if (!t.surveyId) {
        console.warn(`⚠️ Skipping test ${t._id} (missing surveyId)`);
        continue;
      }
      await buildSingleTestIndex(t.surveyId);
    }

    console.log('✅ Rebuild complete.');
  } catch (err) {
    console.error('❌ Error rebuilding indexes:', err.message);
  }
}

/**
 * Starts the change streams to automatically keep the index updated.
 */
async function startTestIndexWatcher() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Connected to MongoDB (TestIndex watcher)');
    }

    // Build indexes at startup
    await buildAllTestIndexes();

    console.log('👀 Watching Tests & Questions...');

    const testStream = Test.watch([
      { $match: { operationType: { $in: ['insert', 'update', 'replace'] } } }
    ]);

    const questionStream = Question.watch([
      { $match: { operationType: { $in: ['insert', 'update', 'replace', 'delete'] } } }
    ]);

    testStream.on('change', async (change) => {
      const surveyId = change.fullDocument?.surveyId;
      if (!surveyId) {
        console.warn('⚠️ Test update without surveyId — skipping.');
        return;
      }
      console.log(`🧩 Test changed → rebuilding index for ${surveyId}`);
      await buildSingleTestIndex(surveyId);
    });

    questionStream.on('change', async (change) => {
      const surveyId = change.fullDocument?.surveyId;
      if (!surveyId) {
        console.warn('⚠️ Question update without surveyId — skipping.');
        return;
      }
      console.log(`📘 Questions changed → rebuilding index for ${surveyId}`);
      await buildSingleTestIndex(surveyId);
    });

    const restart = () => {
      console.warn('⚠️ Stream closed — restarting watcher in 3s...');
      setTimeout(startTestIndexWatcher, 3000);
    };

    testStream.on('error', restart);
    questionStream.on('error', restart);
    testStream.on('close', restart);
    questionStream.on('close', restart);

  } catch (err) {
    console.error('❌ Failed to start TestIndexWatcher:', err.message);
  }
}

module.exports = {
  startTestIndexWatcher,
  buildAllTestIndexes,
  buildSingleTestIndex
};
