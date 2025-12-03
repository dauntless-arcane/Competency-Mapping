require("dotenv").config();
console.log("🚀 Worker started...");

const { startSurveyResponseWatcher } = require("./watchers/surveyResponseWatcher");
const { startTestIndexWatcher } = require("./watchers/testIndexWatcher");

(async () => {
  try {
    console.log("📡 Starting workers/watchers...");
        
    startSurveyResponseWatcher();
    startTestIndexWatcher();

    console.log("✅ Worker initialized successfully");
  } catch (err) {
    console.error("❌ Worker error:", err);
  }
})();
