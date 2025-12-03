const { Redis } = require("ioredis");
dotenv.config({ path: path.join(__dirname, '../.env') });

const redis = new Redis({
  host: process.env.REDIS_HOST, // your Redis server domain or IP
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

module.exports = { redis };
