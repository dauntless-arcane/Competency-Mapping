### High-level summary
The commit `a853e9083ce374ecee9ec51abbc34283f97f8ac8` introduces a new feature to the frontend sync workflow by adding version bumping and tagging. This change enables automatic versioning and tagging of the frontend codebase, making it easier to track and manage different versions.

### What changed
* Added a new job to the `frontend-release.yml` workflow to bump the version and create a new tag.
* Updated the `tsconfig.json` file to use `jsx: "react-jsx"` instead of `jsx: "preserve"`.

### Why it likely changed
The change was made to improve the workflow and automation of the frontend sync process. By adding version bumping and tagging, the team can now easily track and manage different versions of the frontend codebase, making it easier to collaborate and deploy changes.

### Impact on system
The change will likely have a positive impact on the system by:
* Improving version control and tracking.
* Simplifying the deployment process.
* Enhancing collaboration and communication among team members.

### Possible risks
* The new versioning system may introduce conflicts or issues if not properly managed.
* The automated tagging process may create unnecessary tags or overwrite existing ones if not configured correctly.

### Migration notes
* Review the updated `frontend-release.yml` workflow to ensure it meets the team's requirements and is properly configured.
* Verify that the `tsconfig.json` file is updated correctly to use `jsx: "react-jsx"`.
* Test the new versioning system thoroughly to ensure it works as expected.

### Test recommendations
* Test the new versioning system by creating a new tag and verifying that it is properly created and pushed to the repository.
* Test the automated tagging process to ensure it works correctly and does not create unnecessary tags or overwrite existing ones.
* Test the deployment process to ensure it works correctly with the new versioning system.

### Final release note
"Added automatic version bumping and tagging to the frontend sync workflow, improving version control and simplifying deployment."

### Full markdown explanation

**Deep Commit Analysis**

**Commit Hash:** a853e9083ce374ecee9ec51abbc34283f97f8ac8
**Date:** 2025-11-05 16:52:43 +0530
**Author:** Pratyush
**Subject:** feat(workflow): add version bumping and tagging to frontend sync workflow

**Diff**
```diff
commit a853e9083ce374ecee9ec51abbc34283f97f8ac8
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Wed Nov 5 16:52:43 2025 +0530

    feat(workflow): add version bumping and tagging to frontend sync workflow

diff --git a/.github/workflows/frontend-release.yml b/.github/workflows/frontend-release.yml
index 6816820..3ccdec1 100644
--- a/.github/workflows/frontend-release.yml
+++ b/.github/workflows/frontend-release.yml
@@ -27,10 +27,30 @@ jobs:
       - name: Merge frontend into main
         run: |
           echo "🔁 Syncing frontend → main"
-
           git fetch origin main frontend
           git checkout main || git checkout -b main origin/main
           git merge --no-edit origin/frontend || echo "⚠️ Merge conflicts ignored"
-          
           git commit --allow-empty -m "🔁 Sync from frontend → main (auto-merge)"
           git push origin main
+
+      - name: Bump version and create tag
+        run: |
+          echo "🏷️ Creating new version tag"
+          # Fetch existing tags
+          git fetch --tags
+          # Get the latest tag or default to v0.0.0
+          latest_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
+          echo "Latest tag: $latest_tag"
+
+          # Parse version numbers
+          major=$(echo $latest_tag | cut -d. -f1 | sed 's/v//')
+          minor=$(echo $latest_tag | cut -d. -f2)
+          patch=$(echo $latest_tag | cut -d. -f3)
+
+          # Increment patch version
+          new_patch=$((patch + 1))
+          new_tag="v${major}.${minor}.${new_patch}"
+
+          echo "➡️ New version: $new_tag"
+          git tag -a "$new_tag" -m "🔖 Auto version bump: $new_tag"
+          git push origin "$new_tag"
diff --git a/tsconfig.json b/tsconfig.json
index 26f53c1..8486078 100644
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -15,7 +15,7 @@
     "moduleResolution": "bundler",
     "resolveJsonModule": true,
     "isolatedModules": true,
-    "jsx": "preserve",
+    "jsx": "react-jsx",
     "incremental": true,
     "plugins": [
       {
```

**High-level summary**
The commit `a853e9083ce374ecee9ec51abbc34283f97f8ac8` introduces a new feature to the frontend sync workflow by adding version bumping and tagging. This change enables automatic versioning and tagging of the frontend codebase, making it easier to track and manage different versions.

**What changed**
* Added a new job to the `frontend-release.yml` workflow to bump the version and create a new tag.
* Updated the `tsconfig.json` file to use `jsx: "react-jsx"` instead of `jsx: "preserve"`.

**Why it likely changed**
The change was made to improve the workflow and automation of the frontend sync process. By adding version bumping and tagging, the team can now easily track and manage different versions of the frontend codebase, making it easier to collaborate and deploy changes.

**Impact on system**
The change will likely have a positive impact on the system by:
* Improving version control and tracking.
* Simplifying the deployment process.
* Enhancing collaboration and communication among team members.

**Possible risks**
* The new versioning system may introduce conflicts or issues if not properly managed.
* The automated tagging process may create unnecessary tags or overwrite existing ones if not configured correctly.

**Migration notes**
* Review the updated `frontend-release.yml` workflow to ensure it meets the team's requirements and is properly configured.
* Verify that the `tsconfig.json` file is updated correctly to use `jsx: "react-jsx"`.
* Test the new versioning system thoroughly to ensure it works as expected.

**Test recommendations**
* Test the new versioning system by creating a new tag and verifying that it is properly created and pushed to the repository.
* Test the automated tagging process to ensure it works correctly and does not create unnecessary tags or overwrite existing ones.
* Test the deployment process to ensure it works correctly with the new versioning system.

**Final release note**
"Added automatic version bumping and tagging to the frontend sync workflow, improving version control and simplifying deployment."