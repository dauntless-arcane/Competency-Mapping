import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  let res = http.post("http://localhost:3010/auth/login", JSON.stringify({
    username: "hello",
    password: "abcdef@123"
  }), {
    headers: { "Content-Type": "application/json" }
  });

  console.log("STATUS:", res.status);
  console.log("BODY:", res.body);
}
