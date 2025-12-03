const { Queue } = require("bullmq");
const { redis } = require("../database/redis");

module.exports = new Queue("indexQueue", {
  connection: redis,
});
