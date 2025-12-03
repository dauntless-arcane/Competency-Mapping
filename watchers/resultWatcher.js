const { Worker } = require("bullmq");
const { redis } = require("../database/redis");
const SurveyResponse = require("../models/suvey-response");
const { generateResultFromSurvey } = require("../utils/resultGenerator");

new Worker(
  "resultQueue",
  async job => {
    const attemptId = job.data.attemptId;
    console.log("⚙️ Processing SurveyResponse job:", attemptId);

    const doc = await SurveyResponse.findById(attemptId).lean();
    if (!doc) {
      console.log("❌ SurveyResponse missing for:", attemptId);
      return;
    }

    await generateResultFromSurvey(doc);

    console.log("✅ Result generated successfully for:", attemptId);
  },
  { connection: redis }
);
