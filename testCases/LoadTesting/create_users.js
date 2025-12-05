// create_users_safe.js
const fs = require('fs');
const axios = require('axios');

const BASE = process.env.BASE || "https://api-caps.pratyushes.dev"; 
const NUM = parseInt(process.argv[2], 10) || 1000;
const DELAY_MS = parseInt(process.argv[3], 10) || 50; // safer default

function numericRoll(i) {
  // A numeric rollNo that is nearly-unique and within JS Number safe range
  // Use timestamp + index so collisions are unlikely
  return Number(String(Date.now()).slice(-8)) * 10000 + i;
}

async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

const out = [];
const failed = [];

async function createOne(i){
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
  let attempt = 0;
  const maxAttempts = 4;
  while(attempt < maxAttempts){
    attempt++;
    try {
      const res = await axios.post(`${BASE}/auth/sign-up`, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 60000
      });
      if (res.status === 201 || res.status === 200) {
        out.push({ username: u, password: payload.password });
        process.stdout.write('+'); // success marker
        return;
      } else {
        console.error(`\n[${u}] Unexpected status ${res.status}`, res.data);
        // don't retry on 4xx - break
        if (res.status >= 400 && res.status < 500) {
          failed.push({ username: u, status: res.status, body: res.data });
          return;
        }
      }
    } catch (err) {
      // detailed error logging
      const status = err.response && err.response.status;
      const data = err.response && err.response.data;
      console.error(`\n[${u}] Attempt ${attempt} failed:`, status || err.code || err.message);
      if (data) console.error('Response body:', typeof data === 'object' ? JSON.stringify(data) : data);
      // if server error (5xx) -> retry with backoff
      if (!status || (status >= 500 && status < 600)) {
        const backoff = 200 * Math.pow(2, attempt);
        await sleep(backoff);
        continue;
      } else {
        // client error, don't retry
        failed.push({ username: u, status, body: data });
        return;
      }
    }
  }
  // if we exhausted attempts
  failed.push({ username: u, status: 'max_attempts', note: 'exhausted retries' });
}

(async () => {
  for (let i = 0; i < NUM; i++) {
    await createOne(i);
    await sleep(DELAY_MS);
    if ((i+1) % 50 === 0) {
      // checkpoint files every 50
      fs.writeFileSync('users_partial.json', JSON.stringify(out, null, 2));
      fs.writeFileSync('users_failed.json', JSON.stringify(failed, null, 2));
      console.log(`\nProgress: ${i+1}/${NUM} (success: ${out.length}, failed: ${failed.length})`);
    }
  }
  fs.writeFileSync('users.json', JSON.stringify(out, null, 2));
  fs.writeFileSync('users_failed.json', JSON.stringify(failed, null, 2));
  console.log(`\nDone. Created ${out.length} users. Failed: ${failed.length}.`);
})();
