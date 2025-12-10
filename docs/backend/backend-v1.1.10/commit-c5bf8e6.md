### Commit Analysis

#### High-level summary

The commit implements CORS middleware for secure API access and enhances token verification and user authentication in routes.

#### What changed

* Implemented CORS middleware in `app.js` to enable secure API access
* Enhanced token verification in `users/routing.js` to authenticate users
* Updated `auth/login.js` to verify user existence before issuing new access tokens
* Removed redundant CORS middleware in `app.js`

#### Why it likely changed

The changes were made to improve the security of the API by implementing CORS middleware to prevent cross-site request forgery (CSRF) attacks and enhancing token verification to ensure that only authenticated users can access protected routes.

#### Impact on system

The changes will improve the security of the API by preventing unauthorized access and ensuring that only authenticated users can access protected routes.

#### Possible risks

* If the CORS middleware is not configured correctly, it may allow unauthorized access to the API.
* If the token verification mechanism is not implemented correctly, it may allow unauthorized users to access protected routes.

#### Migration notes

* Make sure to test the CORS middleware and token verification mechanism thoroughly to ensure that they are working correctly.
* Update the `.env` file to include the `JWT_SECRET` environment variable.

#### Test recommendations

* Test the CORS middleware by making requests from a different origin and verifying that the API returns the correct headers.
* Test the token verification mechanism by making requests with a valid and invalid token and verifying that the API returns the correct response.

#### Final release note

"Improved API security with CORS middleware and enhanced token verification."

### Full markdown explanation

### Commit Analysis

#### High-level summary

The commit implements CORS middleware for secure API access and enhances token verification and user authentication in routes.

#### What changed

* Implemented CORS middleware in `app.js` to enable secure API access
* Enhanced token verification in `users/routing.js` to authenticate users
* Updated `auth/login.js` to verify user existence before issuing new access tokens
* Removed redundant CORS middleware in `app.js`

#### Why it likely changed

The changes were made to improve the security of the API by implementing CORS middleware to prevent cross-site request forgery (CSRF) attacks and enhancing token verification to ensure that only authenticated users can access protected routes.

#### Impact on system

The changes will improve the security of the API by preventing unauthorized access and ensuring that only authenticated users can access protected routes.

#### Possible risks

* If the CORS middleware is not configured correctly, it may allow unauthorized access to the API.
* If the token verification mechanism is not implemented correctly, it may allow unauthorized users to access protected routes.

#### Migration notes

* Make sure to test the CORS middleware and token verification mechanism thoroughly to ensure that they are working correctly.
* Update the `.env` file to include the `JWT_SECRET` environment variable.

#### Test recommendations

* Test the CORS middleware by making requests from a different origin and verifying that the API returns the correct headers.
* Test the token verification mechanism by making requests with a valid and invalid token and verifying that the API returns the correct response.

#### Final release note

"Improved API security with CORS middleware and enhanced token verification."

### Commit Details

* Hash: c5bf8e6c77ff836af7135c1fb9d3f34f1fd015b7
* Author: Pratyush
* Date: 2025-12-01 20:00:27 +0530
* Subject: feat(cors): implement CORS middleware for secure API access feat(auth): enhance token verification and user authentication in routes

### Diff

```diff
commit c5bf8e6c77ff836af7135c1fb9d3f34f1fd015b7
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Mon Dec 1 20:00:27 2025 +0530

    feat(cors): implement CORS middleware for secure API access
    feat(auth): enhance token verification and user authentication in routes

diff --git a/app.js b/app.js
index 0bd630b..98cc795 100644
--- a/app.js
+++ b/app.js
@@ -48,6 +48,33 @@ try {
 dotenv.config({ path: './.env' });
 
 // express config
+// Cors config
+app.use(function (req, res, next) {
+    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
+    res.header("Access-Control-Allow-Credentials", "true");
+    res.header(
+        "Access-Control-Allow-Headers",
+        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-username, x-email, x-token"
+    );
+    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
+
+if (req.method === "OPTIONS") {
+    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
+    res.header("Access-Control-Allow-Credentials", "true");
+    res.header(
+        "Access-Control-Allow-Headers",
+        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-username, x-email, x-token"
+    );
+    res.header(
+        "Access-Control-Allow-Methods",
+        "GET, POST, PUT, DELETE, OPTIONS"
+    );
+    return res.status(200).end(); // MUST send headers + end response
+}
+
+
+    next();
+});
 app.use(bodyParser.json());
 
 // --------------- Metrics Middleware (Before all routes) ---------------
@@ -71,16 +98,7 @@ app.use((req, res, next) => {
 });
 
 // ------------------------- CORS -------------------------
-app.use(function (req, res, next) {
-    console.log(req.headers.origin);
-    console.log(req.url);
-    console.log(req.headers.referer);
 
-    res.setHeader('Access-Control-Allow-Origin', '*');
-    res.setHeader('Access-Control-Allow-Headers', 'Origin , X-Requested-With, Content-Type, Accept,x-username, x-email, x-token');
-    res.setHeader('Access-Control-Allow-Credentials', 'true');
-    next();
-});
 
 // ------------------ Your Routes --------------------------
 app.use("/auth", require('./auth/login'));
diff --git a/auth/login.js b/auth/login.js
index 1a6961e..33ffb4d 100644
--- a/auth/login.js
+++ b/auth/login.js
@@ -276,7 +276,13 @@ router.post("/refresh", async (req, res) => {
     // rotate token
     const newTokenId = uuidv4();
     const newRefreshJwt = signRefreshToken(newTokenId, payload);
-    const newAccessToken = signAccessToken(payload);
+    const user = await User.findById(payload.id).lean();
+
+    if (!user) {
+      return res.status(401).json({ Status: false, Msg: "User not found" });
+    }
+
+    const newAccessToken = signAccessToken(user);
 
     dbToken.revoked = true;
     dbToken.replacedByTokenId = newTokenId;
@@ -390,8 +396,8 @@ router.post("/forgot", async (req, res) => {
     const user = await User.findOne({ username });
     if (!user) return res.status(404).json({ Status: false, Msg: "User not found" });
 
-    const inputDob = new Date(dob).toISOString().slice(0,10);
-    const storedDob = new Date(user.dob).toISOString().slice(0,10);
+    const inputDob = new Date(dob).toISOString().slice(0, 10);
+    const storedDob = new Date(user.dob).toISOString().slice(0, 10);
 
     if (inputDob !== storedDob)
       return res.status(403).json({ Status: false, Msg: "DOB mismatch" });
diff --git a/users/routing.js b/users/routing.js
index e9245f1..0080f6e 100644
--- a/users/routing.js
+++ b/users/routing.js
@@ -5,8 +5,28 @@ const jwt = require('jsonwebtoken');
 
 
 // Middleware
-// TBT when we get authentication scheme
 
+app.use('/',(req,res,next)=>{
+    // console.log(req.headers);
+    
+ const auth = req.headers.authorization || "";
+  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
+  console.log("🔐 Authenticating request with token:", token);
+  if (!token) return res.status(401).json({ Status: false, Msg: "Unauthorized" });
+
+  try {
+    const payload = jwt.verify(token, process.env.JWT_SECRET);
+    console.log("✅ Authenticated user:", payload.us);
+    req.user = payload;
+    console.log("✅ Authenticated user:");
+    return next();
+  } catch {
+    return res.status(401).json({ Status: false, Msg: "Invalid token" });
+  }
+
+}) 
+
+// api access here
 
 app.use('/entry', require('./user-survey'))
 app.use('/result', require('./result'))
```