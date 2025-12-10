# API Endpoints (auto-discovered)

Scanned files for patterns like `app.get('/path', ...)` and `router.post('/path', ...)`.

| Method | Path | File |
|---|---|---|
| POST | `/` | `admin\test-entry.js` |
| GET | `/metrics` | `app.js` |
| POST | `/login` | `auth\login.js` |
| POST | `/refresh` | `auth\login.js` |
| POST | `/forgot` | `auth\login.js` |
| POST | `/reset` | `auth\login.js` |
| POST | `/` | `auth\registeration.js` |
| GET | `/path` | `generate-full-docs.js` |
| POST | `/path` | `generate-full-docs.js` |
| GET | `/` | `users\fetch-test.js` |
| POST | `/` | `users\fetch-test.js` |
| GET | `/:id` | `users\fetch-test.js` |
| POST | `/:id` | `users\fetch-test.js` |
| GET | `/:userId/:attemptId` | `users\result.js` |
| POST | `/:userId/:attemptId` | `users\result.js` |
| GET | `/:userId` | `users\result.js` |
| POST | `/:userId` | `users\result.js` |
| POST | `/` | `users\user-survey.js` |
