import http from "k6/http";
import { check, sleep } from "k6";

// Load test for POST /login using a seeded valid user (see README.md "Existent Data")
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

const VALID_LOGIN_PAYLOAD = JSON.stringify({
  email: "alice@example.com",
  password: "password123",
});

const params = {
  headers: { "Content-Type": "application/json" },
};

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 30 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const res = http.post(`${BASE_URL}/login`, VALID_LOGIN_PAYLOAD, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response has token": (r) => JSON.parse(r.body).token !== undefined,
  });

  sleep(1);
}
