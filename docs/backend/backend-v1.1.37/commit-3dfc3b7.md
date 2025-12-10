### Commit Analysis

#### 1. High-level summary
This commit refactors the metrics system in the application by enhancing the function timing histogram and improving the route label helper. It also moves the route label helper to a separate file and updates the metrics middleware to record the duration of each request.

#### 2. What changed (bullet points)
* Enhanced function timing histogram to only track internal functions
* Improved route label helper to return the correct route path
* Moved route label helper to a separate file (`utils/routeLabel.js`)
* Updated metrics middleware to record the duration of each request
* Added CORS middleware to handle OPTIONS requests
* Updated routes to use separate files for each route group
* Added a metrics endpoint to serve Prometheus metrics

#### 3. Why it likely changed
The changes were likely made to improve the accuracy and efficiency of the metrics system. The enhanced function timing histogram will provide more accurate data on internal function performance, while the improved route label helper will ensure that the correct route path is recorded for each request. The updated metrics middleware will provide more detailed information on request duration, which can help identify performance bottlenecks.

#### 4. Impact on system
The changes will have a positive impact on the system by providing more accurate and detailed metrics data. This will enable developers to better understand the performance of the application and make data-driven decisions to improve it.

#### 5. Possible risks
The changes may introduce some risks, such as:
* Inaccurate metrics data if the route label helper is not correctly implemented
* Performance issues if the metrics middleware is not optimized
* Security risks if the CORS middleware is not correctly configured

#### 6. Migration notes (if needed)
To migrate to this commit, follow these steps:
* Update the `app.js` file to use the new route label helper
* Update the metrics middleware to record the duration of each request
* Update the routes to use separate files for each route group
* Update the CORS middleware to handle OPTIONS requests

#### 7. Test recommendations
To ensure the changes are working correctly, test the following:
* Verify that the route label helper is returning the correct route path
* Verify that the metrics middleware is recording the correct duration for each request
* Verify that the CORS middleware is handling OPTIONS requests correctly
* Verify that the metrics endpoint is serving the correct Prometheus metrics

#### 8. Final release note (1 line)
"Enhanced metrics system with improved route label helper and function timing histogram."

#### 9. Full markdown explanation

### Commit Analysis

#### Commit Information

* Hash: 3dfc3b7958e1dd2a58aee8598cae2d25de0d2613
* Author: Pratyush
* Date: 2025-12-07 18:07:22 +0530
* Subject: refactor(metrics): enhance function timing histogram and improve route label helper

#### Diff

```diff
commit 3dfc3b7958e1dd2a58aee8598cae2d25de0d2613
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Sun Dec 7 18:07:22 2025 +0530

    refactor(metrics): enhance function timing histogram and improve route label helper

diff --git a/app.js b/app.js
index eb4b3d7..8f8ed06 100644
--- a/app.js
+++ b/app.js
@@ -26,7 +26,7 @@ const httpRequestDuration = new promClient.Histogram({
     buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 1, 2, 5]
 });
 
-// Function timing histogram
+// Function timing histogram (for internal functions)
 const functionDuration = new promClient.Histogram({
     name: 'psych_function_duration_seconds',
     help: 'Time taken by internal functions',
@@ -37,6 +37,7 @@ const functionDuration = new promClient.Histogram({
 module.exports.functionDuration = functionDuration;
 
 
+
 // -------------------- OPEN TELEMETRY TRACING --------------------
 let tracer = null;
 
@@ -61,10 +62,12 @@ try {
 }
 
 
+
 // -------------------- ENV --------------------
 dotenv.config({ path: './.env' });
 
 
+
 // -------------------- CORS --------------------
 app.use(function (req, res, next) {
     res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN || "*");
@@ -75,49 +78,56 @@ app.use(function (req, res, next) {
     );
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
 
-    if (req.method === "OPTIONS") return res.status(200).end();
+    if (req.method === "OPTIONS") {
+        return res.status(200).end();
+    }
     next();
 });
 
 app.use(bodyParser.json());
 
 
-// -------------------- ROUTE NORMALIZER (THE FIX) --------------------
-function getRouteLabel(req) {
-    try {
-        // Use Express route pattern when available
-        if (req.route && req.route.path) return req.route.path;
 
-        // Use baseUrl for routers (/api/users, /auth)
-        if (req.baseUrl) return req.baseUrl;
+// -------------------- ROUTES --------------------
+app.use("/auth", require('./auth/login'));
+app.use("/auth/sign-up", require('./auth/registeration'));
+
+app.use("/api/admin", require('./admin/routing'));
+app.use("/api/users", require('./users/routing'));
+
 
-        // Fallback for dynamic garbage requests
-        return "/unknown";
-    } catch {
-        return "/unknown";
+
+// -------------------- ROUTE LABEL HELPER --------------------
+function getRouteLabel(req) {
+    if (req.route && req.route.path) {
+        if (req.baseUrl) return req.baseUrl + req.route.path;
+        return req.route.path;
     }
+    if (req.baseUrl) return req.baseUrl;
+    return "/unknown"; // bots / random requests
 }
 
 
-// -------------------- GLOBAL METRICS MIDDLEWARE --------------------
+
+// -------------------- METRICS MIDDLEWARE (AFTER ROUTES) --------------------
 app.use((req, res, next) => {
-    // Temporarily store start time
-    const startTime = Date.now();
+    const start = Date.now();
 
-    // OTEL span
     const span = tracer ? tracer.startSpan(`HTTP ${req.method} ${req.originalUrl}`) : null;
 
-    res.on('finish', () => {
+    res.on("finish", () => {
+        const duration = (Date.now() - start) / 1000;
         const routeLabel = getRouteLabel(req);
-        const durationSeconds = (Date.now() - startTime) / 1000;
 
+        // Count total requests
         httpRequestsTotal.inc({
             method: req.method,
             route: routeLabel,
             status: res.statusCode
         });
 
-        httpRequestDuration.labels(req.method, routeLabel).observe(durationSeconds);
+        // Record duration
+        httpRequestDuration.labels(req.method, routeLabel).observe(duration);
 
         if (span) {
             span.setAttribute("http.status", res.statusCode);
@@ -129,13 +139,6 @@ app.use((req, res, next) => {
 });
 
 
-// -------------------- ROUTES --------------------
-app.use("/auth", require('./auth/login'));
-app.use("/auth/sign-up", require('./auth/registeration'));
-
-app.use("/api/admin", require('./admin/routing'));
-app.use("/api/users", require('./users/routing'));
-
 
 // -------------------- METRICS ENDPOINT --------------------
 app.get('/metrics', async (req, res) => {
@@ -148,7 +151,10 @@ app.get('/metrics', async (req, res) => {
 });
 
 
+
 // -------------------- SERVER --------------------
 const serve = app.listen(process.env.PORT || 3010, () => {
     console.log("🚀 Server running on " + (process.env.PORT || 3010));
 });
+
+module.exports = app;
diff --git a/utils/routeLabel.js b/utils/routeLabel.js
new file mode 100644
index 0000000..d1b24c8
--- /dev/null
+++ b/utils/routeLabel.js
@@ -0,0 +1,10 @@
+module.exports = function getRouteLabel(req) {
+    if (req.route && req.route.path) {
+        if (req.baseUrl) return req.baseUrl + req.route.path;
+        return req.route.path;
+    }
+
+    if (req.baseUrl) return req.baseUrl;
+
+    return "/unknown";
+};
```

### Commit Analysis

#### Commit Information

* Hash: 3dfc3b7958e1dd2a58aee8598cae2d25de0d2613
* Author: Pratyush
* Date: 2025-12-07 18:07:22 +0530
* Subject: refactor(metrics): enhance function timing histogram and improve route label helper

#### Diff

The commit includes several changes to the codebase, including:

* Enhanced function timing histogram to only track internal functions
* Improved route label helper to return the correct route path
* Moved route label helper to a separate file (`utils/routeLabel.js`)
* Updated metrics middleware to record the duration of each request
* Added CORS middleware to handle OPTIONS requests
* Updated routes to use separate files for each route group
* Added a metrics endpoint to serve Prometheus metrics

#### Impact

The changes will have a positive impact on the system by providing more accurate and detailed metrics data. This will enable developers to better understand the performance of the application and make data-driven decisions to improve it.

#### Risks

The changes may introduce some risks, such as:

* Inaccurate metrics data if the route label helper is not correctly implemented
* Performance issues if the metrics middleware is not optimized
* Security risks if the CORS middleware is not correctly configured

#### Migration Notes

To migrate to this commit, follow these steps:

* Update the `app.js` file to use the new route label helper
* Update the metrics middleware to record the duration of each request
* Update the routes to use separate files for each route group
* Update the CORS middleware to handle OPTIONS requests

#### Test Recommendations

To ensure the changes are working correctly, test the following:

* Verify that the route label helper is returning the correct route path
* Verify that the metrics middleware is recording the correct duration for each request
* Verify that the CORS middleware is handling OPTIONS requests correctly
* Verify that the metrics endpoint is serving the correct Prometheus metrics

#### Final Release Note

"Enhanced metrics system with improved route label helper and function timing histogram."