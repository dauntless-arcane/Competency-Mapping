const mongoose = require('mongoose');
const { generateResultFromSurvey } = require('../utils/resultGenerator');
const Result = require('../models/ResultSchema');

async function processPendingSurveyResponses() {
  try {
    const collection = mongoose.connection.collection('surveyresponses');

    // Fetch all SurveyResponses
    const allResponses = await collection.find({}).toArray();
    console.log(`📦 Found ${allResponses.length} total SurveyResponses`);

    let processedCount = 0;

    for (const doc of allResponses) {
      const exists = await Result.findOne({ attemptId: doc._id });
      if (!exists) {
        console.log(`⚙️ [pending] Generating result for: ${doc._id}`);
        try {
          await generateResultFromSurvey(doc);
          processedCount++;
        } catch (err) {
          console.error(`❌ [pending] Failed for ${doc._id}:`, err.message);
        }
      }
    }

    console.log(`✅ [pending] Completed. Generated ${processedCount} new results.`);
  } catch (err) {
    console.error('❌ [pending] Error processing existing SurveyResponses:', err.message);
  }
}

async function startSurveyResponseWatcher() {
  try {
    // ✅ Connect to MongoDB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('✅ Connected to MongoDB (SurveyResponse watcher)');
    }

    // 🔄 Process pending SurveyResponses before starting watch
    await processPendingSurveyResponses();

    // 👀 Start watching for new inserts
    const collection = mongoose.connection.collection('surveyresponses');
    const changeStream = collection.watch([{ $match: { operationType: 'insert' } }]);

    changeStream.on('change', async (change) => {
      try {
        const doc = change.fullDocument;
        console.log(`📥 [watcher] New SurveyResponse detected: ${doc._id}`);
        await generateResultFromSurvey(doc);
      } catch (err) {
        console.error('❌ [watcher] Error generating result:', err.message);
      }
    });

    changeStream.on('error', (err) => {
      console.error('⚠️ [watcher] Change stream error:', err);
      setTimeout(startSurveyResponseWatcher, 5000); // reconnect after crash
    });

    console.log('👀 [watcher] Listening for new SurveyResponse inserts...');
  } catch (err) {
    console.error('❌ [watcher] Failed to start watcher:', err.message);
  }
}

// Run directly (node watchers/surveyResponseWatcher.js)
if (require.main === module) {
  startSurveyResponseWatcher();
}

module.exports = { startSurveyResponseWatcher };
