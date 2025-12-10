### High-level summary

The commit updates the backend release workflow to watch all files and specify the repository URL for semantic release.

### What changed

* The `paths` section in the `on` block of the `.github/workflows/backend-release.yml` file has been modified to watch all files (`**`) instead of specific files in the `backend` directory.
* The `working-directory` has been removed from the `release` job.
* The `run` step in the `release` job has been modified to include the `--repository-url` option for semantic release, specifying the GitHub repository URL.

### Why it likely changed

The change was made to improve the flexibility and robustness of the release workflow. By watching all files (`**`), the workflow can now detect changes in any file, not just those in the `backend` directory. Additionally, specifying the repository URL for semantic release ensures that the release process is correctly linked to the GitHub repository.

### Impact on system

The change should have a positive impact on the system, allowing for more efficient and flexible release workflows. However, it may also introduce new risks, such as unexpected behavior or errors, if the workflow is not properly tested and validated.

### Possible risks

* Unintended changes: With the workflow watching all files, there is a risk of unintended changes or errors being triggered during the release process.
* Security vulnerabilities: If the `--repository-url` option is not properly validated, there may be security vulnerabilities introduced.

### Migration notes (if needed)

* Ensure that the `--repository-url` option is properly validated and secure.
* Test the release workflow thoroughly to ensure that it is working as expected.
* Update any documentation or scripts that may be referencing the old release workflow.

### Test recommendations

* Test the release workflow with a variety of scenarios, including changes to different files and directories.
* Verify that the `--repository-url` option is correctly specified and validated.
* Test the release workflow with different types of changes, such as new files, deleted files, and modified files.

### Final release note

"Release workflow updated to watch all files and specify repository URL for semantic release."

### Full markdown explanation

#### Deep Commit Analysis

#### Commit Hash
706a53ba1d9fc14dfcc99b3dc6dc4f37fae147b0
#### Date
2025-10-30 21:36:03 +0530
#### Author
Pratyush
#### Subject
chore: update backend release workflow to watch all files and specify repository URL for semantic release

#### Diff

```diff
commit 706a53ba1d9fc14dfcc99b3dc6dc4f37fae147b0
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Thu Oct 30 21:36:03 2025 +0530

    chore: update backend release workflow to watch all files and specify repository URL for semantic release

diff --git a/.github/workflows/backend-release.yml b/.github/workflows/backend-release.yml
index 52c778b..40f2153 100644
--- a/.github/workflows/backend-release.yml
+++ b/.github/workflows/backend-release.yml
@@ -5,15 +5,12 @@ on:
     branches:
       - backend
     paths:
-      - 'backend/**'
+      - '**' # watch all files (since everything is in root)
       - '.github/workflows/backend-release.yml'
 
 jobs:
   release:
     runs-on: ubuntu-latest
-    defaults:
-      run:
-        working-directory: backend
 
     steps:
       - name: Checkout repository
@@ -30,4 +27,4 @@ jobs:
       - name: Run Semantic Release
         env:
           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
-        run: npx semantic-release
+        run: npx semantic-release --repository-url "https://github.com/${{ github.repository }}"
```

#### High-level summary

The commit updates the backend release workflow to watch all files and specify the repository URL for semantic release.

#### What changed

* The `paths` section in the `on` block of the `.github/workflows/backend-release.yml` file has been modified to watch all files (`**`) instead of specific files in the `backend` directory.
* The `working-directory` has been removed from the `release` job.
* The `run` step in the `release` job has been modified to include the `--repository-url` option for semantic release, specifying the GitHub repository URL.

#### Why it likely changed

The change was made to improve the flexibility and robustness of the release workflow. By watching all files (`**`), the workflow can now detect changes in any file, not just those in the `backend` directory. Additionally, specifying the repository URL for semantic release ensures that the release process is correctly linked to the GitHub repository.

#### Impact on system

The change should have a positive impact on the system, allowing for more efficient and flexible release workflows. However, it may also introduce new risks, such as unexpected behavior or errors, if the workflow is not properly tested and validated.

#### Possible risks

* Unintended changes: With the workflow watching all files, there is a risk of unintended changes or errors being triggered during the release process.
* Security vulnerabilities: If the `--repository-url` option is not properly validated, there may be security vulnerabilities introduced.

#### Migration notes (if needed)

* Ensure that the `--repository-url` option is properly validated and secure.
* Test the release workflow thoroughly to ensure that it is working as expected.
* Update any documentation or scripts that may be referencing the old release workflow.

#### Test recommendations

* Test the release workflow with a variety of scenarios, including changes to different files and directories.
* Verify that the `--repository-url` option is correctly specified and validated.
* Test the release workflow with different types of changes, such as new files, deleted files, and modified files.

#### Final release note

"Release workflow updated to watch all files and specify repository URL for semantic release."