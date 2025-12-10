# Sprint 35 Report
**Sun Nov 23 2025 → Sun Dec 07 2025**

## Completed Work
- a/package-lock.json


## Technical Changes

---
### Commit Detail
### High-level summary

This commit refactors the codebase to improve code readability and remove unused imports. The changes are primarily focused on the `KolbRanker` component, where the author has replaced a function with a more concise and maintainable implementation using TypeScript type annotations and the `useMemo` hook.

### What changed (bullet points)

* Removed unused imports
* Improved code readability in the `KolbRanker` component
* Replaced a function with a more concise and maintainable implementation using TypeScript type annotations and the `useMemo` hook
* Introduced new types (`KolbRankAnswer` and `AnswersState`) to improve code clarity
* Updated the `KolbLayout` component to use the new `AnswersState` type
* Updated the `TestPage` component to use the new `AnswersState` type and removed unused code

### Why it likely changed

The author likely changed the code to improve maintainability, readability, and performance. The use of TypeScript type annotations and the `useMemo` hook allows for more concise and efficient code, which can lead to better performance and easier debugging.

### Impact on system

The changes in this commit should have a positive impact on the system, as they improve code readability, maintainability, and performance. However, there may be some minor issues with backwards compatibility, as the new types and implementation may not be compatible with existing code.

### Possible risks

* Backwards compatibility issues with existing code
* Potential issues with code that relies on the old implementation of the `KolbRanker` component
* Possible performance issues if the new implementation is not optimized properly

### Migration notes (if needed)

If you are upgrading from a previous version of the codebase, you may need to update your code to use the new types and implementation. This may involve updating your code to use the `KolbRankAnswer` and `AnswersState` types, as well as updating any code that relies on the old implementation of the `KolbRanker` component.

### Test recommendations

To ensure that the changes in this commit do not introduce any regressions, you should run a thorough set of tests to verify that the code is working as expected. This may involve updating your test suite to use the new types and implementation, as well as running a series of tests to verify that the code is working correctly.

### Final release note (1 line)

Improved code readability and maintainability in the `KolbRanker` component.

### Full markdown explanation

**Deep Commit Analysis**

**Commit Hash:** aca35cb43df5254b103ba7a106720b207c419b2e
**Date:** 2025-11-23 22:37:24 +0530
**Author:** dauntless-arcane
**Subject:** refactor: clean up unused imports and improve code readability

**High-level summary**

This commit refactors the codebase to improve code readability and remove unused imports. The changes are primarily focused on the `KolbRanker` component, where the author has replaced a function with a more concise and maintainable implementation using TypeScript type annotations and the `useMemo` hook.

**What changed (bullet points)**

* Removed unused imports
* Improved code readability in the `KolbRanker` component
* Replaced a function with a more concise and maintainable implementation using TypeScript type annotations and the `useMemo` hook
* Introduced new types (`KolbRankAnswer` and `AnswersState`) to improve code clarity
* Updated the `KolbLayout` component to use the new `AnswersState` type
* Updated the `TestPage` component to use the new `AnswersState` type and removed unused code

**Why it likely changed**

The author likely changed the code to improve maintainability, readability, and performance. The use of TypeScript type annotations and the `useMemo` hook allows for more concise and efficient code, which can lead to better performance and easier debugging.

**Impact on system**

The changes in this commit should have a positive impact on the system, as they improve code readability, maintainability, and performance. However, there may be some minor issues with backwards compatibility, as the new types and implementation may not be compatible with existing code.

**Possible risks**

* Backwards compatibility issues with existing code
* Potential issues with code that relies on the old implementation of the `KolbRanker` component
* Possible performance issues if the new implementation is not optimized properly

**Migration notes (if needed)**

If you are upgrading from a previous version of the codebase, you may need to update your code to use the new types and implementation. This may involve updating your code to use the `KolbRankAnswer` and `AnswersState` types, as well as updating any code that relies on the old implementation of the `KolbRanker` component.

**Test recommendations**

To ensure that the changes in this commit do not introduce any regressions, you should run a thorough set of tests to verify that the code is working as expected. This may involve updating your test suite to use the new types and implementation, as well as running a series of tests to verify that the code is working correctly.

**Final release note (1 line)**

Improved code readability and maintainability in the `KolbRanker` component.

---
### Commit Detail
### Commit Analysis

#### High-level summary
This commit removes unused type declarations for the recharts module in the package-lock.json file.

#### What changed
* Removed the unused type declaration for `@types/react` version 19.2.3
* No other changes were made to the package-lock.json file

#### Why it likely changed
The commit author likely removed the unused type declaration to clean up the package-lock.json file and remove unnecessary dependencies. This could be part of a larger effort to optimize the project's dependencies and improve performance.

#### Impact on system
The removal of the unused type declaration should not have any significant impact on the system, as it was not being used. However, it may affect the project's build process if the removed type declaration was being referenced elsewhere in the code.

#### Possible risks
* If the removed type declaration was being referenced elsewhere in the code, it may cause build errors or other issues.
* The removal of the type declaration may affect the project's compatibility with certain libraries or frameworks that relied on it.

#### Migration notes (if needed)
* If the removed type declaration was being used in the code, it will need to be replaced with the correct type declaration or removed altogether.
* The project's build process may need to be updated to reflect the removal of the type declaration.

#### Test recommendations
* Run the project's tests to ensure that the removal of the type declaration did not cause any issues.
* Verify that the project builds successfully and that there are no errors or warnings.

#### Final release note
"Removed unused type declaration for recharts module in package-lock.json."

#### Full markdown explanation

### Commit Analysis

#### High-level summary
This commit removes unused type declarations for the recharts module in the package-lock.json file.

#### What changed
* Removed the unused type declaration for `@types/react` version 19.2.3
* No other changes were made to the package-lock.json file

#### Why it likely changed
The commit author likely removed the unused type declaration to clean up the package-lock.json file and remove unnecessary dependencies. This could be part of a larger effort to optimize the project's dependencies and improve performance.

#### Impact on system
The removal of the unused type declaration should not have any significant impact on the system, as it was not being used. However, it may affect the project's build process if the removed type declaration was being referenced elsewhere in the code.

#### Possible risks
* If the removed type declaration was being referenced elsewhere in the code, it may cause build errors or other issues.
* The removal of the type declaration may affect the project's compatibility with certain libraries or frameworks that relied on it.

#### Migration notes (if needed)
* If the removed type declaration was being used in the code, it will need to be replaced with the correct type declaration or removed altogether.
* The project's build process may need to be updated to reflect the removal of the type declaration.

#### Test recommendations
* Run the project's tests to ensure that the removal of the type declaration did not cause any issues.
* Verify that the project builds successfully and that there are no errors or warnings.

#### Final release note
"Removed unused type declaration for recharts module in package-lock.json."

### Commit Details

* Hash: 5338b0fc51a4f2dc4810a583cb168f2c16f01125
* Author: dauntless-arcane
* Date: 2025-12-02 09:02:14 +0530
* Subject: feat: Remove unused type declarations for recharts module in package-lock.json

### Diff

```diff
commit 5338b0fc51a4f2dc4810a583cb168f2c16f01125
Author: dauntless-arcane <tharunjthegreat@gmail.com>
Date:   Tue Dec 2 09:02:14 2025 +0530

    feat: Remove unused type declarations for recharts module in package-lock.json

diff --git a/package-lock.json b/package-lock.json
index 39575a6..67d1037 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -13997,17 +13997,6 @@
         }
       }
     },
-    "node_modules/recharts/node_modules/@types/react": {
-      "version": "19.2.3",
-      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.3.tgz",
-      "integrity": "sha512-k5dJVszUiNr1DSe8Cs+knKR6IrqhqdhpUwzqhkS8ecQTSf3THNtbfIp/umqHMpX2bv+9dkx3fwDv/86LcSfvSg==",
-      "license": "MIT",
-      "optional": true,
-      "peer": true,
-      "dependencies": {
-        "csstype": "^3.0.2"
-      }
-    },
     "node_modules/recharts/node_modules/react-redux": {
       "version": "9.2.0",
       "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-9.2.0.tgz",
```

---
### Commit Detail
### Commit Analysis

#### 1. High-level summary

This commit updates the frontend release workflow for Next.js deployment with auto versioning. The changes include updating the GitHub Actions workflow to generate a new frontend version tag, configure Git identity, and deploy the updated code to a server.

#### 2. What changed (bullet points)

* Renamed the workflow to "Next.js Deploy with Auto Versioning (CAPS)"
* Updated the workflow to generate a new frontend version tag with auto versioning
* Configured Git identity using `github-actions[bot]`
* Updated the workflow to deploy the updated code to a server using SSH
* Added steps to install dependencies, build Next.js, and restart PM2 (Production)
* Removed the step to create a GitHub Release

#### 3. Why it likely changed

The changes were likely made to update the frontend release workflow to use auto versioning and to deploy the updated code to a server using SSH. This allows for more automated and efficient deployment of the frontend code.

#### 4. Impact on system

The changes will impact the system by automating the deployment of the frontend code to a server using SSH. This will reduce the manual effort required to deploy the code and make the process more efficient.

#### 5. Possible risks

* The use of SSH to deploy the code may introduce security risks if not properly configured.
* The auto versioning feature may cause issues if not properly tested.

#### 6. Migration notes (if needed)

* Make sure to update the `DEPLOY_KEY` and `SERVER_IP` secrets in the GitHub Actions workflow.
* Test the auto versioning feature to ensure it works as expected.
* Verify that the deployment to the server is successful.

#### 7. Test recommendations

* Test the auto versioning feature to ensure it works as expected.
* Verify that the deployment to the server is successful.
* Test the deployment process with different versions of the code.

#### 8. Final release note (1 line)

"Updated frontend release workflow to use auto versioning and deploy to server using SSH."

#### 9. Full markdown explanation

### Commit Analysis

#### 1. High-level summary

This commit updates the frontend release workflow for Next.js deployment with auto versioning. The changes include updating the GitHub Actions workflow to generate a new frontend version tag, configure Git identity, and deploy the updated code to a server.

#### 2. What changed (bullet points)

* Renamed the workflow to "Next.js Deploy with Auto Versioning (CAPS)"
* Updated the workflow to generate a new frontend version tag with auto versioning
* Configured Git identity using `github-actions[bot]`
* Updated the workflow to deploy the updated code to a server using SSH
* Added steps to install dependencies, build Next.js, and restart PM2 (Production)
* Removed the step to create a GitHub Release

#### 3. Why it likely changed

The changes were likely made to update the frontend release workflow to use auto versioning and to deploy the updated code to a server using SSH. This allows for more automated and efficient deployment of the frontend code.

#### 4. Impact on system

The changes will impact the system by automating the deployment of the frontend code to a server using SSH. This will reduce the manual effort required to deploy the code and make the process more efficient.

#### 5. Possible risks

* The use of SSH to deploy the code may introduce security risks if not properly configured.
* The auto versioning feature may cause issues if not properly tested.

#### 6. Migration notes (if needed)

* Make sure to update the `DEPLOY_KEY` and `SERVER_IP` secrets in the GitHub Actions workflow.
* Test the auto versioning feature to ensure it works as expected.
* Verify that the deployment to the server is successful.

#### 7. Test recommendations

* Test the auto versioning feature to ensure it works as expected.
* Verify that the deployment to the server is successful.
* Test the deployment process with different versions of the code.

#### 8. Final release note (1 line)

"Updated frontend release workflow to use auto versioning and deploy to server using SSH."

### Full Code Explanation

```diff
commit 53e380e5c628d15057c45dae7136b7b03a1aafb4
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Tue Dec 2 09:32:46 2025 +0530

    feat: update frontend release workflow for Next.js deployment with auto versioning

diff --git a/.github/workflows/frontend-release.yml b/.github/workflows/frontend-release.yml
index e8c9567..b4efdae 100644
--- a/.github/workflows/frontend-release.yml
+++ b/.github/workflows/frontend-release.yml
@@ -1,4 +1,4 @@
-name: Frontend Auto Release
+name: 🚀 Next.js Deploy with Auto Versioning (CAPS)
 
 on:
   push:
@@ -9,47 +9,81 @@ permissions:
   contents: write
 
 jobs:
-  release:
+  build-release-deploy:
     runs-on: ubuntu-latest
 
     steps:
-      - name: Checkout repository
+      # 1️⃣ Checkout Code
+      - name: 🧩 Checkout repository
         uses: actions/checkout@v4
         with:
           fetch-depth: 0
           token: ${{ secrets.GITHUB_TOKEN }}
 
-      - name: Configure Git
+      # 2️⃣ Configure Git Identity
+      - name: 🛠️ Configure Git
         run: |
           git config user.name "github-actions[bot]"
           git config user.email "github-actions[bot]@users.noreply.github.com"
 
-      - name: Generate new frontend version tag
+      # 3️⃣ Auto Version Tag (frontend-v0.0.X)
+      - name: 🏷️ Generate frontend tag
         id: tag
         run: |
-          echo "🏷️ Generating new frontend version tag"
           git fetch --tags
-          latest_tag=$(git describe --tags --abbrev=0 --match "frontend-v*" 2>/dev/null || echo "frontend-v0.0.0")
 
-          # Parse version numbers
+          latest_tag=$(git describe --tags --abbrev=0 --match "frontend-v*" 2>/dev/null || echo "frontend-v0.0.0")
           version=${latest_tag#frontend-v}
+
           major=$(echo $version | cut -d. -f1)
           minor=$(echo $version | cut -d. -f2)
           patch=$(echo $version | cut -d. -f3)
+
           new_patch=$((patch + 1))
           new_tag="frontend-v${major}.${minor}.${new_patch}"
 
-          echo "➡️ New tag: $new_tag"
-          git tag -a "$new_tag" -m "🔖 Auto frontend release: $new_tag"
+          echo "New tag: $new_tag"
+          git tag -a "$new_tag" -m "Auto frontend release: $new_tag"
           git push origin "$new_tag"
+
           echo "tag=$new_tag" >> $GITHUB_OUTPUT
 
-      - name: Create GitHub Release
-        uses: actions/create-release@v1
-        env:
-          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
+      # 4️⃣ Setup Node.js
+      - name: ⚙️ Setup Node.js
+        uses: actions/setup-node@v4
         with:
-          tag_name: ${{ steps.tag.outputs.tag }}
-          release_name: "🚀 Frontend Release ${{ steps.tag.outputs.tag }}"
-          body: |
-            Automated frontend release created from frontend branch push.
+          node-version: 20
+
+      # 5️⃣ Install Dependencies
+      - name: 📦 Install dependencies
+        run: npm ci
+
+      # 6️⃣ Build Next.js
+      - name: 🏗️ Build Next.js
+        run: npm run build
+
+      # 7️⃣ Configure SSH for Deployment
+      - name: 🔐 Configure SSH
+        run: |
+          mkdir -p ~/.ssh
+          echo "${{ secrets.DEPLOY_KEY }}" > ~/.ssh/id_ed25519
+          chmod 600 ~/.ssh/id_ed25519
+          ssh-keyscan -H ${{ secrets.SERVER_IP }} >> ~/.ssh/known_hosts
+
+      # 8️⃣ Deploy to caps.pratyushh.online
+      - name: 🚚 Deploy to Server
+        run: |
+          rsync -avz --delete \
+            .next/ \
+            public/ \
+            package.json \
+            next.config.js \
+            github@${{ secrets.SERVER_IP }}:/var/www/caps.pratyushh.online/
+
+      # 9️⃣ Restart PM2 (Production)
+      - name: 🔄 Restart PM2
+        run: |
+          ssh github@${{ secrets.SERVER_IP }} "
+            cd /var/www/caps.pratyushh.online/ &&
+            pm2 restart caps-app || pm2 start npm --name caps-app -- run start
+          "
```

