### Deep Commit Analysis

#### 1. High-level summary
This commit adds the `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the frontend release workflow.

#### 2. What changed
* Added `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation

#### 3. Why it likely changed
This change was made to address a potential issue where `@semantic-release/release-notes-generator` was not installing correctly due to peer dependency conflicts. The `--legacy-peer-deps` flag is used to allow the installation of packages with incompatible peer dependencies.

#### 4. Impact on system
This change should resolve any issues related to the installation of `@semantic-release/release-notes-generator` and ensure that the frontend release workflow can complete successfully.

#### 5. Possible risks
* If the `--legacy-peer-deps` flag is not suitable for the specific use case, it may lead to unexpected behavior or errors.
* This change may introduce new dependencies or conflicts that need to be addressed.

#### 6. Migration notes (if needed)
No migration notes are required for this commit.

#### 7. Test recommendations
* Verify that the frontend release workflow completes successfully after this change.
* Test the behavior of `@semantic-release/release-notes-generator` with and without the `--legacy-peer-deps` flag to ensure it works as expected.

#### 8. Final release note
Added `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation to resolve installation issues.

#### 9. Full markdown explanation
### Deep Commit Analysis

#### Commit Details
* Commit Hash: 5e68f56320f59b9217fa3cd81587e93e1de14606
* Date: 2025-10-30 21:05:53 +0530
* Author: Pratyush
* Subject: fix: add --legacy-peer-deps flag to @semantic-release/release-notes-generator installation

#### Code Changes
```diff
commit 5e68f56320f59b9217fa3cd81587e93e1de14606
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Thu Oct 30 21:05:53 2025 +0530

    fix: add --legacy-peer-deps flag to @semantic-release/release-notes-generator installation

diff --git a/.github/workflows/frontend-release.yml b/.github/workflows/frontend-release.yml
index 50e180a..55f5582 100644
--- a/.github/workflows/frontend-release.yml
+++ b/.github/workflows/frontend-release.yml
@@ -31,7 +31,7 @@ jobs:
           @semantic-release/github \
           @semantic-release/changelog \
           @semantic-release/commit-analyzer \
-          @semantic-release/release-notes-generator
+          @semantic-release/release-notes-generator --legacy-peer-deps
 
       - name: Frontend Release
         env:
```

### Conclusion
This commit adds the `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the frontend release workflow. This should resolve any issues related to the installation of this package and ensure that the frontend release workflow can complete successfully.