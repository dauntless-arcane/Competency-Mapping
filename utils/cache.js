// utils/cache.js
const { redisClient } = require('../database/redis');
const startTimer = require('./timer');

function cacheMiddleware(ttlSeconds = 60) {
  return async (req, res, next) => {
    const t_total = startTimer("cache_total");

    try {
      const key = "cache:" + req.originalUrl;

      const t_read = startTimer("cache_read");
      const cached = await redisClient.get(key);
      t_read();

      if (cached) {
        const t_hit = startTimer("cache_hit");
        t_hit();
        t_total();
        return res.status(200).json(JSON.parse(cached));
      }

      // Cache MISS
      const t_miss = startTimer("cache_miss");
      t_miss();

      // Monkey patch res.json
      const oldJson = res.json.bind(res);
      res.json = async (body) => {
        try {
          const t_write = startTimer("cache_write");
          await redisClient.setex(key, ttlSeconds, JSON.stringify(body));
          t_write();
        } catch (e) {
          console.error("❌ Cache Write Error:", e.message);
        }

        t_total();
        return oldJson(body);
      };

      next();

    } catch (err) {
      console.log("⚠️ Cache Error (skipped):", err.message);
      t_total();
      next();
    }
  };
}

module.exports = cacheMiddleware;
