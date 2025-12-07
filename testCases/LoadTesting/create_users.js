// create_users_fast.js
const fs = require('fs');
const axios = require('axios');

const BASE = process.env.BASE || "https://api-caps.pratyushes.dev";
const NUM = parseInt(process.argv[2], 10) || 1000;

// HOW MANY USERS TO CREATE IN PARALLEL
const BATCH_SIZE = parseInt(process.argv[3], 10) || 25;  // ← increase to 50 if server is strong

// Optimized roll generator
function numericRoll(i) {
  return Date.now() % 1000000000 * 1000 + i;
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const out = [];
const failed = [];

async function createOne(i) {
  const u = numericRoll(i);

  const payload = {
    username: u,
    email: `${u}@test.com`,
    password: "Test@123",
    name: "Load User",
    class: "1BTCHE",
    section: "A",
    rollNo: u,
    dob: "2005-01-01"
  };

  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await axios.post(`${BASE}/auth/sign-up`, payload, {
        timeout: 20000
      });

      if (res.status === 201 || res.status === 200) {
        process.stdout.write('+');
        out.push({ username: u, password: payload.password });
        return;
      }

      if (res.status < 500) {
        failed.push({ username: u, status: res.status, body: res.data });
        return;
      }

    } catch (err) {
      const status = err.response?.status;
      if (!status || status >= 500) {
        await sleep(150 * attempt);
        continue;
      }
      failed.push({ username: u, status, body: err.response.data });
      return;
    }
  }
  failed.push({ username: u, status: "max_attempts" });
}

// ---------------------------------------------------
// 🚀 Run in FAST batches
// ---------------------------------------------------
async function runBatches() {
  console.log(`Starting creation of ${NUM} users in batches of ${BATCH_SIZE}...`);

  for (let start = 0; start < NUM; start += BATCH_SIZE) {
    const batch = [];

    for (let i = start; i < Math.min(start + BATCH_SIZE, NUM); i++) {
      batch.push(createOne(i));
    }

    await Promise.all(batch);

    console.log(
      `\nBatch ${start + BATCH_SIZE > NUM ? NUM : start + BATCH_SIZE}/${NUM} → success: ${out.length}, failed: ${failed.length}`
    );

    fs.writeFileSync("users_partial.json", JSON.stringify(out, null, 2));
    fs.writeFileSync("users_failed.json", JSON.stringify(failed, null, 2));

    // small rest to avoid spikes
    await sleep(200);
  }

  fs.writeFileSync("users.json", JSON.stringify(out, null, 2));
  fs.writeFileSync("users_failed.json", JSON.stringify(failed, null, 2));

  console.log(`\n🎉 DONE — Created ${out.length} users | Failed: ${failed.length}`);
}

runBatches();
