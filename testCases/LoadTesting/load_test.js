import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

// Load users.json once (SharedArray shares across VUs)
const users = new SharedArray("users", function () {
  return JSON.parse(open('users.json')); // users.json must be in the same folder you run k6 from
});

export let options = {
  vus: 100,           // change to 50/100 depending on test
  duration: "5m",
  // recommended: replace with stages for ramping if you want
  // stages: [{ duration: '30s', target: 10 }, { duration: '2m', target: 50 }, { duration: '2m', target: 100 }]
};

const BASE = "https://api-caps.pratyushes.dev";

function randomUser() {
  return users[Math.floor(Math.random() * users.length)];
}

export default function () {
  const user = randomUser();

  // 1) login
  const loginPayload = JSON.stringify({ username: `${user.username}`, password: user.password });
  const loginRes = http.post(`${BASE}/auth/login`, loginPayload, { headers: { "Content-Type": "application/json" } });

  check(loginRes, { "login_success_200": (r) => r.status === 200 });

  if (loginRes.status !== 200) {
    console.error("LOGIN FAIL:", user.username, loginRes);
    return;
  }

  const token = loginRes.json("Token");
  const username = loginRes.json("User").username;
  const authHeaders = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  // 2) fetch tests
  let res = http.post(`${BASE}/api/users/fetch-tests`, null, { headers: authHeaders });
  check(res, { "fetch_tests_200": (r) => r.status === 200 });

  // 3) fetch details
  const testId = "E9B927B";
  res = http.post(`${BASE}/api/users/fetch-tests/${testId}`, null, { headers: authHeaders });
  check(res, { "test_detail_200": (r) => r.status === 200 });

  // 4) submit answers (use your standard payload)
  const answerPayload = JSON.stringify({
    surveyId: testId,
    ans: [
      // keep same structure as your app — shortened here for brevity
      { questionId: "3146876", value: 2 },
      { questionId: "3536349", value: 4 }
      // ... add the rest if needed
    ]
  });

  res = http.post(`${BASE}/api/users/entry`, answerPayload, {
    headers: { ...authHeaders, "x-username": username }
  });
  check(res, { "submit_answers_success": (r) => (r.status === 200 || r.status === 201) });

  // 5) fetch result
  res = http.post(`${BASE}/api/users/result/${username}`, null, { headers: authHeaders });
  check(res, { "fetch_result_200": (r) => r.status === 200 });

  sleep(1);
}
