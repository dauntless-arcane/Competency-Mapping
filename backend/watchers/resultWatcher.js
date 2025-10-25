const mongoose = require('mongoose');
const { generateResultFromSurvey } = require('../utils/resultGenerator');

async function startSurveyResponseWatcher() {
  try {
    // Connect to Mongo if not already
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('✅ Connected to MongoDB (result watcher)');
    }

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

    console.log('👀 [watcher] Listening for SurveyResponse inserts...');
  } catch (err) {
    console.error('❌ [watcher] Failed to start watcher:', err);
  }
}

// Run standalone if executed directly
if (require.main === module) {
  startSurveyResponseWatcher();
}

module.exports = { startSurveyResponseWatcher };
