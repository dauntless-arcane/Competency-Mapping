### High-level Summary

This commit updates the frontend release workflow in a GitHub Actions workflow file to sync changes from the `frontend` branch to the `main` branch. The updated workflow uses the `semantic-release` tool to automate the release process and ensures that changes from the `frontend` branch are merged into `main` branch.

### What Changed

* The workflow name has been changed from `Frontend Release` to `Sync frontend → main`.
* The `on.push` event now triggers on the `frontend` branch.
* The `permissions` section has been added to request write access to the repository's contents.
* The `jobs` section has been renamed from `release` to `sync`.
* The `steps` section has been updated to merge the `frontend` branch into the `main` branch using `git merge`.
* The `semantic-release` tool is no longer used to run the release process.
* The `git config` step has been added to configure the Git user name and email.

### Why it Likely Changed

The workflow was updated to sync changes from the `frontend` branch to the `main` branch, likely as a result of a change in the development process or a need to ensure that the `main` branch is always up-to-date with the latest changes from the `frontend` branch.

### Impact on System

The updated workflow will ensure that changes from the `frontend` branch are automatically merged into the `main` branch, which may impact the following:

* The `main` branch will always be up-to-date with the latest changes from the `frontend` branch.
* The release process will be automated, ensuring that changes are consistently released to production.
* Developers will no longer need to manually merge changes from the `frontend` branch into the `main` branch.

### Possible Risks

* Merge conflicts may occur when merging changes from the `frontend` branch into the `main` branch.
* The `semantic-release` tool is no longer used, which may impact the release process if issues arise.
* The updated workflow may introduce new dependencies or configuration changes that require testing.

### Migration Notes

* Review the updated workflow file to ensure that it meets the requirements of the project.
* Test the updated workflow to ensure that it works as expected.
* Verify that the `main` branch is correctly updated with changes from the `frontend` branch.

### Test Recommendations

* Test the updated workflow by pushing changes to the `frontend` branch and verifying that they are automatically merged into the `main` branch.
* Test the release process to ensure that it works as expected.
* Verify that the `semantic-release` tool is no longer used and that the release process is successfully automated.

### Final Release Note

"Updated frontend release workflow to sync changes from frontend branch to main branch, ensuring that the main branch is always up-to-date with the latest changes."

### Full Markdown Explanation

### Deep Commit Analysis

#### Commit Hash
2a54572d79f6eee0924fb6aa7f93120d3c8c093e

#### Date
2025-10-31 11:26:21 +0530

#### Author
Pratyush

#### Subject
feat(workflow): update frontend release workflow to sync changes with main branch

### Diff
```diff
commit 2a54572d79f6eee0924fb6aa7f93120d3c8c093e
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Fri Oct 31 11:26:21 2025 +0530

    feat(workflow): update frontend release workflow to sync changes with main branch

diff --git a/.github/workflows/frontend-release.yml b/.github/workflows/frontend-release.yml
index 5ca9c9d..6816820 100644
--- a/.github/workflows/frontend-release.yml
+++ b/.github/workflows/frontend-release.yml
@@ -1,30 +1,36 @@
-name: Frontend Release
+name: Sync frontend → main
 
 on:
   push:
     branches:
       - frontend
-    paths:
-      - '**'
-      - '.github/workflows/frontend-release.yml'
+
+permissions:
+  contents: write
 
 jobs:
-  release:
+  sync:
     runs-on: ubuntu-latest
 
     steps:
       - name: Checkout repository
         uses: actions/checkout@v4
-
-      - name: Setup Node.js
-        uses: actions/setup-node@v4
         with:
-          node-version: 20
+          fetch-depth: 0
+          token: ${{ secrets.GITHUB_TOKEN }}
+
+      - name: Configure Git
+        run: |
+          git config user.name "github-actions[bot]"
+          git config user.email "github-actions[bot]@users.noreply.github.com"
 
-      - name: Install dependencies
-        run: npm ci --legacy-peer-deps
+      - name: Merge frontend into main
+        run: |
+          echo "🔁 Syncing frontend → main"
 
-      - name: Run Semantic Release
-        env:
-          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
-        run: npx semantic-release --repository-url "https://github.com/${{ github.repository }}"
+          git fetch origin main frontend
+          git checkout main || git checkout -b main origin/main
+          git merge --no-edit origin/frontend || echo "⚠️ Merge conflicts ignored"
+          
+          git commit --allow-empty -m "🔁 Sync from frontend → main (auto-merge)"
+          git push origin main
```