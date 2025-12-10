**Commit Analysis**
====================

### High-level Summary

This commit adds a new feature to the backend, allowing users to submit survey responses. It includes the creation of a new model for survey responses, a new API endpoint for submitting responses, and modifications to the existing API setup.

### What Changed
----------------

* Added a new model for survey responses (`models/suvey-response.js`)
* Created a new API endpoint for submitting survey responses (`users/user-survey.js`)
* Modified the existing API setup to include the new endpoint (`backend/app.js`)
* Added a new script to the `package.json` file to start the server (`"start": "node app.js"`)

### Why it Likely Changed

The changes were likely made to implement a new feature that allows users to submit survey responses. This feature is likely part of a larger system that collects user feedback or opinions.

### Impact on System

The changes will allow users to submit survey responses, which will be stored in the database. This will provide valuable feedback to the system administrators, which can be used to improve the system.

### Possible Risks

* The new API endpoint may introduce security vulnerabilities if not properly secured.
* The new model for survey responses may not be properly validated, leading to data inconsistencies.
* The changes may break existing functionality or cause unexpected behavior.

### Migration Notes

* Make sure to update the database schema to include the new survey response model.
* Test the new API endpoint thoroughly to ensure it works as expected.
* Review the existing API setup to ensure it is properly configured.

### Test Recommendations

* Test the new API endpoint with different input scenarios to ensure it works correctly.
* Test the existing API setup to ensure it is not broken by the new changes.
* Test the system as a whole to ensure it behaves as expected.

### Final Release Note

"Added new feature to submit survey responses, improving user feedback collection."

### Full Markdown Explanation

This commit analysis provides a detailed explanation of the changes made to the system. It includes a high-level summary, a list of what changed, why it likely changed, the impact on the system, possible risks, migration notes, test recommendations, and a final release note.

**Commit Details**
-----------------

* Hash: 907bb15b5920e72b2821a610ba8b2d09e6083117
* Author: Pratyush
* Date: 2025-10-24 19:06:42 +0530
* Subject: feat: added Login>js and fixed api for the user-survey

**Diff**
--------

```diff
commit 907bb15b5920e72b2821a610ba8b2d09e6083117
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Fri Oct 24 19:06:42 2025 +0530

    feat: added Login>js and fixed api for the user-survey

diff --git a/.gitignore b/.gitignore
index 9b1913e..45e1db0 100644
--- a/.gitignore
+++ b/.gitignore
@@ -34,3 +34,5 @@ yarn-error.log*
 # typescript
 *.tsbuildinfo
 next-env.d.ts
+#node_modules
+/backend/node_modules
\ No newline at end of file
diff --git a/backend/app.js b/backend/app.js
index e35b662..07984f5 100644
--- a/backend/app.js
+++ b/backend/app.js
@@ -2,6 +2,7 @@
 const express = require('express');
 const app = express();
 const dotenv = require('dotenv');
+var bodyParser = require('body-parser');
 
 
 // dot env config
@@ -13,6 +14,7 @@ app.use(bodyParser.json());
 // Cors Setup
 app.use(function(req, res, next) {
     console.log(req.headers.origin);
+    console.log(req.url);
     console.log(req.headers.referer);
     // if (req.headers.origin == 'http://localhost:4200' || req.headers.referer == 'http://localhost:4200/') {
     res.setHeader('Access-Control-Allow-Origin', '*');
@@ -24,4 +26,11 @@ app.use(function(req, res, next) {
     //     return res.sendStatus(401)
     // }
 })
-// api setup
\ No newline at end of file
+// api setup
+app.use("/api/users", require('./users/routing'))
+
+
+// Running the exress Server
+const serve = app.listen(3010,()=>{
+
+})
\ No newline at end of file
diff --git a/backend/models/Login.js b/backend/models/Login.js
new file mode 100644
index 0000000..8fe8892
--- /dev/null
+++ b/backend/models/Login.js
@@ -0,0 +1 @@
+const mongoose = require('mongoose');
\ No newline at end of file
diff --git a/backend/models/suvey-response.js b/backend/models/suvey-response.js
new file mode 100644
index 0000000..a4d60d8
--- /dev/null
+++ b/backend/models/suvey-response.js
@@ -0,0 +1,16 @@
+const mongoose = require('mongoose');
+
+const SurveyResponseSchema = new mongoose.Schema({
+
+username: { type: String, required: true },
+surveyId: { type: String, required: true },
+ans: {
+    type:Object,
+    required:true
+},
+time:{
+    type:Date,
+    default:Date.now()
+}
+})
+module.exports = mongoose.models.SurveyResponse || mongoose.model("SurveyResponse",SurveyResponseSchema)
\ No newline at end of file
diff --git a/backend/package.json b/backend/package.json
index 13744a7..2c8689b 100644
--- a/backend/package.json
+++ b/backend/package.json
@@ -3,7 +3,9 @@
   "version": "1.0.0",
   "main": "app.js",
   "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "test": "echo \"Error: no test specified\" && exit 1",
+    "start": "node app.js"
+
   },
   "repository": {
     "type": "git",
diff --git a/backend/users/routing.js b/backend/users/routing.js
index e69de29..d2238c6 100644
--- a/backend/users/routing.js
+++ b/backend/users/routing.js
@@ -0,0 +1,21 @@
+// declarations
+const express = require('express')
+const app = express.Router()
+
+
+// Middleware
+// TBT when we get authentication scheme
+app.use('/',(req,res,next)=>{
+    // const jwt_token = req.headers.x-token
+    // const email = req.headers.x-email
+    // const username = req.headers.x-username
+    console.log("iwassssssssss");
+    
+    next()
+
+}) 
+
+app.use('/entry', require('./user-survey'))
+
+// exporting the module
+module.exports = app
\ No newline at end of file
diff --git a/backend/users/user-survey.js b/backend/users/user-survey.js
new file mode 100644
index 0000000..57d5b17
--- /dev/null
+++ b/backend/users/user-survey.js
@@ -0,0 +1,35 @@
+// declarations
+const express = require('express')
+const app = express.Router()
+const SurveyResponse = require("./../models/suvey-response");
+
+// api access here
+app.post('/',async(req,res)=>{
+    const surveyId = req.body.surveyId;
+    const ans = req.body.ans;
+    const username = req.headers['x-username']
+    try{
+    // Storing the response in the mongo
+    await new SurveyResponse({
+        surveyId,
+        ans,
+        username,
+
+    }).save()
+    res.status(500).json({
+        Status:true,
+        Error:false,
+        Msg:"The Data has been saved Successfully"
+    })
+} catch(err){
+    console.error('❌ issue in users/entry',err)
+    res.status(500).json({
+        Status:true,
+        Error:true,
+        ErrMsg:err
+    })
+}
+})
+
+// exporting the module
+module.exports = app
\ No newline at end of file
```