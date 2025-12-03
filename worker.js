require("dotenv").config();
console.log("🚀 Worker started...");

require("./workers/resultWorker");   // Queue processor for results
const { startTestIndexWatcher } = require("./watchers/IndexWatcher");

(async () => {
    try {
        console.log("📡 Starting workers/watchers...");

        startTestIndexWatcher();

        console.log("✅ Worker initialized successfully");
    } catch (err) {
        console.error("❌ Worker error:", err);
    }
})();
