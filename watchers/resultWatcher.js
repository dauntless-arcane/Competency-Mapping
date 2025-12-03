// watchers/surveyResponseWatcher.js

const mongoose = require('mongoose');
const { generateResultFromSurvey } = require('../utils/resultGenerator');
const Result = require('../models/ResultSchema');
const { acquireLock } = require('../utils/lock');

async function processPendingSurveyResponses() {
  try {
    const collection = mongoose.connection.collection('surveyresponses');
    const allResponses = await collection.find({}).toArray();

    console.log(`📦 Found ${allResponses.length} total SurveyResponses`);

    let processedCount = 0;

    for (const doc of allResponses) {
      // skip if result already exists
      const exists = await Result.findOne({ attemptId: doc._id });
      if (exists) continue;

      const lockKey = `result_${doc._id}`;
      const gotLock = await acquireLock(lockKey);

      if (!gotLock) {
        console.log(`⛔ Skipping pending ${doc._id} — locked by another worker`);
        continue;
      }

      console.log(`⚙️ [pending] Processing ${doc._id}`);

      try {
        await generateResultFromSurvey(doc);
        processedCount++;
      } catch (err) {
        console.error(`❌ [pending] Failed for ${doc._id}:`, err.message);
      }
    }

    console.log(`✅ [pending] Completed. Generated ${processedCount} new results.`);
  } catch (err) {
    console.error('❌ [pending] Error:', err.message);
  }
}

async function startSurveyResponseWatcher() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Connected to MongoDB (SurveyResponse watcher)");
    }

    // Run pending repair step at startup
    await processPendingSurveyResponses();

    // Start watching new inserts
    const collection = mongoose.connection.collection('surveyresponses');
    const changeStream = collection.watch([{ $match: { operationType: 'insert' } }]);

    changeStream.on('change', async (change) => {
      const doc = change.fullDocument;
      const lockKey = `result_${doc._id}`;

      const gotLock = await acquireLock(lockKey);
      if (!gotLock) {
        console.log(`⛔ [watcher] Skipping ${doc._id} — another node is processing`);
        return;
      }

      console.log(`📥 [watcher] Processing new SurveyResponse ${doc._id}`);

      try {
        await generateResultFromSurvey(doc);
      } catch (err) {
        console.error(`❌ [watcher] Failed for ${doc._id}:`, err.message);
      }
    });

    changeStream.on('error', (err) => {
      console.error("⚠️ Change stream error:", err);
      setTimeout(startSurveyResponseWatcher, 5000);
    });

    console.log("👀 [watcher] Listening for SurveyResponse inserts...");
  } catch (err) {
    console.error("❌ [watcher] Failed:", err.message);
  }
}

// Run directly
if (require.main === module) startSurveyResponseWatcher();

module.exports = { startSurveyResponseWatcher };
