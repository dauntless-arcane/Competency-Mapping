// worker.js
require("dotenv").config();
const mongoose = require("mongoose");

const { startSurveyResponseWatcher } = require("./watchers/resultWatcher");
const { startTestIndexWatcher, buildSingleTestIndex } = require("./watchers/testIndexWatcher");

// BullMQ queues
const resultQueue = require("./queues/resultQueue");
const indexQueue = require("./queues/indexQueue");

// Models / utils for workers
const SurveyResponse = require("./models/suvey-response");
const { generateResultFromSurvey } = require("./utils/resultGenerator");

// BullMQ Worker
const { Worker } = require("bullmq");
const { redis } = require("./database/redis");

// ✔ SINGLE redisConnection definition (DO NOT DUPLICATE)
const redisConnection = {
  ...redis,
  maxRetriesPerRequest: null,
  enableReadyCheck: false
};

// =============== RESULT WORKER ===============
new Worker(
  "resultQueue",
  async (job) => {
    const attemptId = job.data.attemptId;
    console.log(`⚙️ Processing result job: ${attemptId}`);

    const doc = await SurveyResponse.findById(attemptId).lean();
    if (!doc) {
      console.log(`❌ No SurveyResponse found: ${attemptId}`);
      return;
    }

    await generateResultFromSurvey(doc);
    console.log(`✅ Result generated for: ${attemptId}`);
  },
  { connection: redisConnection }
);

// =============== INDEX WORKER ===============
new Worker(
  "indexQueue",
  async (job) => {
    const surveyId = job.data.surveyId;
    console.log(`⚙️ Processing index job: ${surveyId}`);
    await buildSingleTestIndex(surveyId);
  },
  { connection: redisConnection }
);

// =============== WATCHERS ===============
(async () => {
  try {
    console.log("🚀 Worker starting…");

    await startSurveyResponseWatcher();
    await startTestIndexWatcher();

    console.log("✅ Worker initialized");
  } catch (err) {
    console.error("❌ Worker startup error:", err.message);
  }
})();
