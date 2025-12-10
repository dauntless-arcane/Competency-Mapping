### High-level Summary

This commit adds a new step to the frontend sync workflow, which involves bumping the version and creating a new tag after merging the frontend into the main branch. The new version is incremented based on the latest tag, and a new tag is created with the updated version number.

### What Changed

* A new step was added to the frontend sync workflow in `.github/workflows/frontend-release.yml` to bump the version and create a new tag.
* The `tsconfig.json` file was updated to change the `jsx` option from `preserve` to `react-jsx`.

### Why it Likely Changed

This change likely occurred to automate the process of version bumping and tagging after each frontend sync. This allows for easier tracking of changes and releases, and enables the team to keep their versioning system up-to-date.

### Impact on System

The addition of this step will have the following impacts on the system:

* The version number will be automatically incremented after each frontend sync.
* A new tag will be created with the updated version number.
* The team will be able to easily track changes and releases.

### Possible Risks

Possible risks associated with this change include:

* Unintended version number increments: If the version number increment logic is not properly implemented, it may lead to incorrect version numbers.
* Tag creation issues: If the tag creation process is not properly configured, it may lead to issues with tag creation.

### Migration Notes

No migration notes are required for this change, as it is a new feature addition.

### Test Recommendations

To ensure the correctness of this change, the following tests should be run:

* Test the version number increment logic to ensure it is working correctly.
* Test the tag creation process to ensure it is working correctly.
* Test the frontend sync workflow to ensure the new step is working correctly.

### Final Release Note

"Automated version bumping and tagging added to frontend sync workflow."

### Full Markdown Explanation

## Deep Commit Analysis

### Commit Hash

a853e9083ce374ecee9ec51abbc34283f97f8ac8

### Date

2025-11-05 16:52:43 +0530

### Author

Pratyush

### Subject

feat(workflow): add version bumping and tagging to frontend sync workflow

### Diff

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

### High-level Summary

This commit adds a new step to the frontend sync workflow, which involves bumping the version and creating a new tag after merging the frontend into the main branch. The new version is incremented based on the latest tag, and a new tag is created with the updated version number.

### What Changed

* A new step was added to the frontend sync workflow in `.github/workflows/frontend-release.yml` to bump the version and create a new tag.
* The `tsconfig.json` file was updated to change the `jsx` option from `preserve` to `react-jsx`.

### Why it Likely Changed

This change likely occurred to automate the process of version bumping and tagging after each frontend sync. This allows for easier tracking of changes and releases, and enables the team to keep their versioning system up-to-date.

### Impact on System

The addition of this step will have the following impacts on the system:

* The version number will be automatically incremented after each frontend sync.
* A new tag will be created with the updated version number.
* The team will be able to easily track changes and releases.

### Possible Risks

Possible risks associated with this change include:

* Unintended version number increments: If the version number increment logic is not properly implemented, it may lead to incorrect version numbers.
* Tag creation issues: If the tag creation process is not properly configured, it may lead to issues with tag creation.

### Migration Notes

No migration notes are required for this change, as it is a new feature addition.

### Test Recommendations

To ensure the correctness of this change, the following tests should be run:

* Test the version number increment logic to ensure it is working correctly.
* Test the tag creation process to ensure it is working correctly.
* Test the frontend sync workflow to ensure the new step is working correctly.

### Final Release Note

"Automated version bumping and tagging added to frontend sync workflow."