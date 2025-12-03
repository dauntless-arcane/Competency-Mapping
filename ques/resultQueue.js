const { Queue } = require("bullmq");
const dotenv = require('dotenv');

const { redis } = require("../database/redis");

module.exports = new Queue("resultQueue", {
  connection: redis,
});
