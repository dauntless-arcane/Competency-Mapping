import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 100,          // increase to 100 later
  duration: "1s",
};

const BASE = "https://api-caps.pratyushes.dev";

// Generate unique usernames & emails
function randomString(len = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function () {

  // -------------------------------------------------
  // 0️⃣ SIGNUP NEW USER
  // -------------------------------------------------
  const rand = randomString(8);

  const signupPayload = JSON.stringify({
    username: `user155_${rand}`,
    email: `user155_${rand}@test.com`,
    password: "Test@123",
    name: "Load User",
    class: "1BTCHE",
    section: "A",
    rollNo: Math.floor(100000 + Math.random() * 900000),
    dob: "2005-01-01"
  });

  let signupRes = http.post(`${BASE}/auth/sign-up`, signupPayload, {
    headers: { "Content-Type": "application/json" }
  });

  // console.log("SIGNUP:", signupRes.status, signupRes.body);

  check(signupRes, {
    "signup_success_201": (r) => r.status === 201
  });

  // If signup fails → stop flow
  if (signupRes.status !== 201) return;

  const newUser = `user155_${rand}`;

  // -------------------------------------------------
  // 1️⃣ LOGIN USING NEW ACCOUNT
  // -------------------------------------------------
  const loginPayload = JSON.stringify({
    username: newUser,
    password: "Test@123"
  });

  let loginRes = http.post(`${BASE}/auth/login`, loginPayload, {
    headers: { "Content-Type": "application/json" }
  });

  // console.log("LOGIN:", loginRes.status, loginRes.body);

  check(loginRes, {
    "login_success_200": (r) => r.status === 200
  });

  if (loginRes.status !== 200) return;

  const token = loginRes.json("Token");
  const username = loginRes.json("User").username;

  const authHeaders = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  // -------------------------------------------------
  // 2️⃣ FETCH TEST LIST
  // -------------------------------------------------
  let fetchTests = http.post(`${BASE}/api/users/fetch-tests`, null, {
    headers: authHeaders
  });

  // console.log("FETCH TESTS:", fetchTests.status);

  check(fetchTests, {
    "fetch_tests_200": (r) => r.status === 200
  });

  // -------------------------------------------------
  // 3️⃣ FETCH TEST DETAILS
  // -------------------------------------------------
  const testId = "E9B927B";

  let fetchDetail = http.post(`${BASE}/api/users/fetch-tests/${testId}`, null, {
    headers: authHeaders
  });

  // console.log("TEST DETAIL:", fetchDetail.status);

  check(fetchDetail, {
    "test_detail_200": (r) => r.status === 200
  });

  // -------------------------------------------------
  // 4️⃣ SUBMIT ANSWERS
  // -------------------------------------------------
  const answerPayload = JSON.stringify({
    surveyId: "E9B927B",
    ans: [
      { questionId: "3146876", value: 2 },
      { questionId: "3536349", value: 4 },
      { questionId: "6548132", value: 2 },
      { questionId: "8695269", value: 4 },
      { questionId: "9215880", value: 4 },
      { questionId: "6F8FD05", value: 4 },
      { questionId: "EE9DF96", value: 4 },
      { questionId: "F2886A5", value: 2 },
      { questionId: "ECC3E9E", value: 4 },
      { questionId: "DABE178", value: 2 },
      { questionId: "1D5F505", value: 4 },
      { questionId: "D6E72A2", value: 2 },
      { questionId: "F3689F4", value: 2 },
      { questionId: "B089958", value: 4 },
      { questionId: "270870C", value: 2 },
      { questionId: "3D614F5", value: 4 },
      { questionId: "45B988B", value: 2 },
      { questionId: "5A4F2C5", value: 2 },
      { questionId: "08F5F4C", value: 4 },
      { questionId: "8F134DB", value: 2 },
      { questionId: "7AA41DF", value: 4 },
      { questionId: "4F7210A", value: 4 },
      { questionId: "BD919F2", value: 2 },
      { questionId: "6CC0A93", value: 4 },
      { questionId: "25F0B5E", value: 2 },
      { questionId: "EB858B4", value: 4 },
      { questionId: "04D05B9", value: 2 },
      { questionId: "0F2BC3C", value: 4 },
      { questionId: "D57AA9B", value: 2 },
      { questionId: "A322DAF", value: 2 },
      { questionId: "5FE0E85", value: 2 },
      { questionId: "3E1A598", value: 4 },
      { questionId: "4E0FB65", value: 2 },
      { questionId: "86B1B3E", value: 4 },
      { questionId: "3D7BB7E", value: 2 },
      { questionId: "A1E2263", value: 4 },
      { questionId: "B4501C5", value: 2 },
      { questionId: "B8B56B5", value: 4 },
      { questionId: "E356D1D", value: 2 },
      { questionId: "CF05A52", value: 2 },
      { questionId: "E52F7F9", value: 4 },
      { questionId: "764C6AB", value: 4 },
      { questionId: "A562FC8", value: 4 },
      { questionId: "629D8CA", value: 2 },
      { questionId: "FF6A9E7", value: 4 },
      { questionId: "A7EDE67", value: 2 },
      { questionId: "0B0B44A", value: 4 },
      { questionId: "B4131E3", value: 4 },
      { questionId: "14DDD15", value: 2 },
      { questionId: "CD2B1AD", value: 4 }
    ]
  });

  let submitRes = http.post(`${BASE}/api/users/entry`, answerPayload, {
    headers: { ...authHeaders, "x-username": username }
  });

  // console.log("ENTRY:", submitRes.status, submitRes.body);

  check(submitRes, {
    "submit_answers_success": (r) => r.status === 200 || r.status === 201 && r.json("Status") === true
  });

  // -------------------------------------------------
  // 5️⃣ FETCH RESULT
  // -------------------------------------------------
  let resultRes = http.post(`${BASE}/api/users/result/${username}`, null, {
    headers: authHeaders
  });

  // console.log("RESULT:", resultRes.status);

  check(resultRes, {
    "fetch_result_200": (r) => r.status === 200
  });

  // sleep(1);
}
