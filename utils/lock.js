// utils/lock.js
const mongoose = require("mongoose");

const LockCollection = () => mongoose.connection.collection("distributed_locks");

/**
 * Attempts to acquire a distributed lock.
 * Returns true if lock acquired, false if lock already exists.
 */
async function acquireLock(key, ttlMs = 30000) {
  const now = new Date();

  const result = await LockCollection().findOneAndUpdate(
    {
      key,
      $or: [
        { expiresAt: { $lte: now } }, // expired lock → replace
        { expiresAt: { $exists: false } }
      ]
    },
    {
      $set: { key, expiresAt: new Date(now.getTime() + ttlMs) },
      $setOnInsert: { createdAt: now }
    },
    { upsert: true, returnDocument: "before" }
  );

  // If previous value was null → you created the lock → success
  return result.value === null;
}

module.exports = { acquireLock };
