# Sprint 20 Report
**Thu Oct 30 2025 → Thu Nov 13 2025**

## Completed Work
- a/.github/workflows/backend-release.yml
- a/backend/CHANGELOG.md


## Technical Changes

---
### Commit Detail
### Deep Commit Analysis

**Commit Hash:** a198843699790e456f6871da02c91c60964c70e4
**Date:** 2025-10-30 21:04:39 +0530
**Author:** Pratyush
**Subject:** chore(release): update frontend release workflow for improved clarity and consistency

### 1. High-level summary

This commit updates the frontend release workflow in the `.github/workflows` directory to improve clarity and consistency. Specifically, it adds a new step to ensure that Semantic Release and its plugins are installed before the frontend release process begins.

### 2. What changed (bullet points)

* Added a new step to the frontend release job to install Semantic Release and its plugins
* The new step uses `npm install` to save the dependencies as dev dependencies
* The updated workflow now ensures that the necessary tools are installed before proceeding with the frontend release

### 3. Why it likely changed

The change was likely made to improve the reliability and consistency of the frontend release process. By ensuring that Semantic Release and its plugins are installed, the workflow can now handle any issues related to missing dependencies, making it more robust and efficient.

### 4. Impact on system

The update should have a positive impact on the system, as it improves the reliability and consistency of the frontend release process. This can lead to fewer errors and a smoother release experience.

### 5. Possible risks

One possible risk is that the updated workflow may introduce new dependencies or conflicts that were not present before. However, this risk is mitigated by the fact that the new step uses `npm install` to save the dependencies as dev dependencies, which should help to avoid any conflicts.

### 6. Migration notes (if needed)

No migration notes are required for this update, as it is a simple addition to the existing workflow. However, it is recommended to review the updated workflow to ensure that it meets the requirements of the project.

### 7. Test recommendations

To ensure that the updated workflow is working correctly, it is recommended to run a series of tests, including:

* A manual test to verify that the frontend release process completes successfully
* An automated test to verify that the workflow is triggering correctly and producing the expected output
* A review of the workflow logs to ensure that there are no errors or issues

### 8. Final release note (1 line)

"Updated frontend release workflow to improve clarity and consistency by ensuring Semantic Release and plugins are installed."

### 9. Full markdown explanation

**Updated Frontend Release Workflow**

This commit updates the frontend release workflow in the `.github/workflows` directory to improve clarity and consistency. Specifically, it adds a new step to ensure that Semantic Release and its plugins are installed before the frontend release process begins.

**Changes**

* Added a new step to the frontend release job to install Semantic Release and its plugins
* The new step uses `npm install` to save the dependencies as dev dependencies
* The updated workflow now ensures that the necessary tools are installed before proceeding with the frontend release

**Why**

The change was made to improve the reliability and consistency of the frontend release process. By ensuring that Semantic Release and its plugins are installed, the workflow can now handle any issues related to missing dependencies, making it more robust and efficient.

**Impact**

The update should have a positive impact on the system, as it improves the reliability and consistency of the frontend release process. This can lead to fewer errors and a smoother release experience.

**Risks**

One possible risk is that the updated workflow may introduce new dependencies or conflicts that were not present before. However, this risk is mitigated by the fact that the new step uses `npm install` to save the dependencies as dev dependencies, which should help to avoid any conflicts.

**Migration Notes**

No migration notes are required for this update, as it is a simple addition to the existing workflow. However, it is recommended to review the updated workflow to ensure that it meets the requirements of the project.

**Test Recommendations**

To ensure that the updated workflow is working correctly, it is recommended to run a series of tests, including:

* A manual test to verify that the frontend release process completes successfully
* An automated test to verify that the workflow is triggering correctly and producing the expected output
* A review of the workflow logs to ensure that there are no errors or issues

**Final Release Note**

"Updated frontend release workflow to improve clarity and consistency by ensuring Semantic Release and plugins are installed."

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary
This commit is a merge of the 'main' branch from the Competency-Mapping repository on GitHub, performed by Pratyush.

#### 2. What changed
* Merged changes from the 'main' branch of the Competency-Mapping repository

#### 3. Why it likely changed
The merge was likely performed to incorporate changes from the Competency-Mapping repository into the current project, possibly to update the competency mapping feature or to fix bugs.

#### 4. Impact on system
The merge may have introduced new changes, fixed bugs, or updated the competency mapping feature, potentially affecting the system's functionality, performance, or user experience.

#### 5. Possible risks
* Merge conflicts may have occurred, requiring manual resolution.
* Introduced changes may have introduced new bugs or compatibility issues.
* The merge may have introduced dependencies or libraries that are not compatible with the current project.

#### 6. Migration notes (if needed)
No specific migration notes are required for this commit, as it is a simple merge of changes from another repository. However, it is essential to review the changes and ensure that they are compatible with the current project.

#### 7. Test recommendations
* Run a thorough set of tests to ensure that the merge did not introduce any bugs or compatibility issues.
* Test the competency mapping feature to ensure that it is working as expected.

#### 8. Final release note (1 line)
"Merge of changes from Competency-Mapping repository to update competency mapping feature and fix bugs."

#### 9. Full markdown explanation

### Deep Commit Analysis

#### Commit Details

* **Commit Hash:** ac2b3dcc10cf8795c98633715b6a030731633dd7
* **Date:** 2025-10-30 21:04:57 +0530
* **Author:** Pratyush
* **Subject:** Merge branch 'main' of https://github.com/dauntless-arcane/Competency-Mapping

#### What Changed

* Merged changes from the 'main' branch of the Competency-Mapping repository

#### Why it Likely Changed

The merge was likely performed to incorporate changes from the Competency-Mapping repository into the current project, possibly to update the competency mapping feature or to fix bugs.

#### Impact on System

The merge may have introduced new changes, fixed bugs, or updated the competency mapping feature, potentially affecting the system's functionality, performance, or user experience.

#### Possible Risks

* Merge conflicts may have occurred, requiring manual resolution.
* Introduced changes may have introduced new bugs or compatibility issues.
* The merge may have introduced dependencies or libraries that are not compatible with the current project.

#### Migration Notes

No specific migration notes are required for this commit, as it is a simple merge of changes from another repository. However, it is essential to review the changes and ensure that they are compatible with the current project.

#### Test Recommendations

* Run a thorough set of tests to ensure that the merge did not introduce any bugs or compatibility issues.
* Test the competency mapping feature to ensure that it is working as expected.

#### Final Release Note

"Merge of changes from Competency-Mapping repository to update competency mapping feature and fix bugs."

---
### Commit Detail
### High-level summary
This commit is a merge of the 'main' branch from the Competency Mapping repository on GitHub. The merge is likely a result of updating the local repository with the latest changes from the remote repository.

### What changed (bullet points)

* Merged branch 'main' of https://github.com/dauntless-arcane/Competency-Mapping

### Why it likely changed
The commit was made to update the local repository with the latest changes from the remote repository. This is a common practice in Git to ensure that the local repository is up-to-date with the latest code changes.

### Impact on system
The merge is likely to introduce new features, fix bugs, or update dependencies in the system. However, without further information, it's difficult to determine the exact impact.

### Possible risks
* Merge conflicts: If there were conflicts during the merge, they may need to be resolved manually.
* Breakage of existing functionality: New changes may break existing functionality if not properly tested.

### Migration notes (if needed)
No specific migration notes are required for this commit as it's a simple merge of the 'main' branch.

### Test recommendations
* Run automated tests to ensure that the new changes do not break existing functionality.
* Manually test new features and functionality to ensure they are working as expected.

### Final release note (1 line)
"Updated local repository with the latest changes from the Competency Mapping repository."

### Full markdown explanation

#### Commit Details
Commit Hash: ac2b3dcc10cf8795c98633715b6a030731633dd7
Date: 2025-10-30 21:04:57 +0530
Author: Pratyush
Subject: Merge branch 'main' of https://github.com/dauntless-arcane/Competency-Mapping

#### What Changed
The commit merged the 'main' branch from the Competency Mapping repository on GitHub. This is a common practice in Git to ensure that the local repository is up-to-date with the latest code changes.

#### Why it Changed
The commit was made to update the local repository with the latest changes from the remote repository. This is a necessary step to ensure that the local repository is current with the latest code changes.

#### Impact on System
The merge is likely to introduce new features, fix bugs, or update dependencies in the system. However, without further information, it's difficult to determine the exact impact.

#### Possible Risks
There are a few possible risks associated with this commit:
* Merge conflicts: If there were conflicts during the merge, they may need to be resolved manually.
* Breakage of existing functionality: New changes may break existing functionality if not properly tested.

#### Migration Notes
No specific migration notes are required for this commit as it's a simple merge of the 'main' branch.

#### Test Recommendations
To ensure that the new changes do not break existing functionality, we recommend running automated tests and manually testing new features and functionality.

#### Final Release Note
"Updated local repository with the latest changes from the Competency Mapping repository."

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary

This commit fixes an issue by adding the `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the `.github/workflows/frontend-release.yml` file.

#### 2. What changed

* Added the `--legacy-peer-deps` flag to the `@semantic-release/release-notes-generator` installation in the `.github/workflows/frontend-release.yml` file.

#### 3. Why it likely changed

The `--legacy-peer-deps` flag is likely added to resolve a peer dependency issue. In modern Node.js, the `--legacy-peer-deps` flag is used to allow the installation of packages with legacy peer dependencies, which can be a common issue when upgrading dependencies.

#### 4. Impact on system

This change will likely resolve issues related to peer dependency conflicts during the installation of `@semantic-release/release-notes-generator`. It may also prevent errors or crashes that occur due to these conflicts.

#### 5. Possible risks

* If the `--legacy-peer-deps` flag is not properly configured, it may lead to other issues or security vulnerabilities.
* The use of this flag may also indicate that the package dependencies are not up-to-date or are not properly maintained.

#### 6. Migration notes (if needed)

* This change is likely a temporary fix and may need to be revisited in the future to resolve the underlying peer dependency issues.
* Consider updating the package dependencies to the latest versions to avoid using the `--legacy-peer-deps` flag.

#### 7. Test recommendations

* Test the `@semantic-release/release-notes-generator` installation with and without the `--legacy-peer-deps` flag to ensure that it resolves the peer dependency issues.
* Verify that the change does not introduce any new issues or security vulnerabilities.

#### 8. Final release note (1 line)

"Added `--legacy-peer-deps` flag to resolve peer dependency issues with `@semantic-release/release-notes-generator`."

#### 9. Full markdown explanation

### Commit Analysis

#### Commit Details

* Commit Hash: 5e68f56320f59b9217fa3cd81587e93e1de14606
* Date: 2025-10-30 21:05:53 +0530
* Author: Pratyush
* Subject: fix: add `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation

#### Changes

* Added the `--legacy-peer-deps` flag to the `@semantic-release/release-notes-generator` installation in the `.github/workflows/frontend-release.yml` file.

#### Why it changed

The `--legacy-peer-deps` flag is likely added to resolve a peer dependency issue. In modern Node.js, the `--legacy-peer-deps` flag is used to allow the installation of packages with legacy peer dependencies, which can be a common issue when upgrading dependencies.

#### Impact on system

This change will likely resolve issues related to peer dependency conflicts during the installation of `@semantic-release/release-notes-generator`. It may also prevent errors or crashes that occur due to these conflicts.

#### Possible risks

* If the `--legacy-peer-deps` flag is not properly configured, it may lead to other issues or security vulnerabilities.
* The use of this flag may also indicate that the package dependencies are not up-to-date or are not properly maintained.

#### Migration notes (if needed)

* This change is likely a temporary fix and may need to be revisited in the future to resolve the underlying peer dependency issues.
* Consider updating the package dependencies to the latest versions to avoid using the `--legacy-peer-deps` flag.

#### Test recommendations

* Test the `@semantic-release/release-notes-generator` installation with and without the `--legacy-peer-deps` flag to ensure that it resolves the peer dependency issues.
* Verify that the change does not introduce any new issues or security vulnerabilities.

#### Final release note

"Added `--legacy-peer-deps` flag to resolve peer dependency issues with `@semantic-release/release-notes-generator`."

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary

This commit fixes an issue by adding the `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the frontend release workflow.

#### 2. What changed

* Added `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the frontend release workflow.

#### 3. Why it likely changed

This change likely occurred to resolve a peer dependency issue with `@semantic-release/release-notes-generator`. The `--legacy-peer-deps` flag is used to allow installation of packages with peer dependencies that are not installed.

#### 4. Impact on system

This change will allow the frontend release workflow to successfully install `@semantic-release/release-notes-generator` and potentially fix any issues related to peer dependencies.

#### 5. Possible risks

* If the `--legacy-peer-deps` flag is not properly configured, it could lead to unexpected behavior or errors in the release workflow.
* This change may introduce dependencies that are not properly maintained or updated, potentially leading to security vulnerabilities.

#### 6. Migration notes (if needed)

No migration notes are required for this change, as it is a simple addition of a flag to the existing workflow.

#### 7. Test recommendations

* Verify that the frontend release workflow successfully completes with the updated configuration.
* Test the release workflow with different scenarios to ensure that the `--legacy-peer-deps` flag is properly configured.

#### 8. Final release note (1 line)

"Added `--legacy-peer-deps` flag to frontend release workflow to resolve peer dependency issue with `@semantic-release/release-notes-generator`."

#### 9. Full markdown explanation

### Deep Commit Analysis

### Commit Details

* Commit Hash: 5e68f56320f59b9217fa3cd81587e93e1de14606
* Date: 2025-10-30 21:05:53 +0530
* Author: Pratyush
* Subject: fix: add --legacy-peer-deps flag to @semantic-release/release-notes-generator installation

### Change Details

* Changed file: `.github/workflows/frontend-release.yml`
* Changed lines: 31-32

### What Changed

* Added `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the frontend release workflow.

### Why it Changed

This change likely occurred to resolve a peer dependency issue with `@semantic-release/release-notes-generator`. The `--legacy-peer-deps` flag is used to allow installation of packages with peer dependencies that are not installed.

### Impact on System

This change will allow the frontend release workflow to successfully install `@semantic-release/release-notes-generator` and potentially fix any issues related to peer dependencies.

### Possible Risks

* If the `--legacy-peer-deps` flag is not properly configured, it could lead to unexpected behavior or errors in the release workflow.
* This change may introduce dependencies that are not properly maintained or updated, potentially leading to security vulnerabilities.

### Migration Notes

No migration notes are required for this change, as it is a simple addition of a flag to the existing workflow.

### Test Recommendations

* Verify that the frontend release workflow successfully completes with the updated configuration.
* Test the release workflow with different scenarios to ensure that the `--legacy-peer-deps` flag is properly configured.

### Final Release Note

"Added `--legacy-peer-deps` flag to frontend release workflow to resolve peer dependency issue with `@semantic-release/release-notes-generator`."

---
### Commit Detail
### High-level summary

This commit appears to be a refactoring effort aimed at simplifying the project's directory structure by removing unnecessary nesting and updating the `.gitignore` file to stop tracking the `node_modules` directory.

### What changed (bullet points)

* Renamed several files and directories within the `backend` directory to a more flat structure
* Updated the `.gitignore` file to stop tracking the `node_modules` directory and its subdirectories
* Added `node_modules` and its subdirectories to the `.gitignore` file to exclude them from version control

### Why it likely changed

The author of the commit, Pratyush, likely made these changes to simplify the project's directory structure and improve maintainability. By removing unnecessary nesting and updating the `.gitignore` file, they made it easier to navigate and manage the project's codebase.

### Impact on system

The changes in this commit should have a positive impact on the system, making it easier to manage and maintain. However, there may be some minor disruptions to the build process or testing workflows due to the changes in the directory structure.

### Possible risks

* If the project relies on specific file paths or directory structures, the changes in this commit may cause issues with automated testing or build processes.
* If the project uses a version control system that relies on specific file or directory structures, the changes in this commit may cause issues with version control.

### Migration notes (if needed)

* If you're using a build process or testing framework that relies on specific file paths or directory structures, you may need to update your configuration to accommodate the changes in this commit.
* If you're using a version control system that relies on specific file or directory structures, you may need to update your configuration to accommodate the changes in this commit.

### Test recommendations

* Run a thorough set of tests to ensure that the changes in this commit haven't introduced any regressions or broken any existing functionality.
* Verify that the build process and testing workflows are working correctly after the changes.

### Final release note (1 line)

"Refactored project directory structure to simplify maintainability and updated `.gitignore` file to stop tracking `node_modules` directory."

### Full markdown explanation

```markdown
### Deep Commit Analysis

Commit Hash: 8cb5255276493ec1c9cf9ccf6b446bee6e7c3737
Date: 2025-10-30 21:29:31 +0530
Author: Pratyush
Subject: chore: stop tracking node_modules and update .gitignore

### High-level summary

This commit appears to be a refactoring effort aimed at simplifying the project's directory structure by removing unnecessary nesting and updating the `.gitignore` file to stop tracking the `node_modules` directory.

### What changed (bullet points)

* Renamed several files and directories within the `backend` directory to a more flat structure
* Updated the `.gitignore` file to stop tracking the `node_modules` directory and its subdirectories
* Added `node_modules` and its subdirectories to the `.gitignore` file to exclude them from version control

### Why it likely changed

The author of the commit, Pratyush, likely made these changes to simplify the project's directory structure and improve maintainability. By removing unnecessary nesting and updating the `.gitignore` file, they made it easier to navigate and manage the project's codebase.

### Impact on system

The changes in this commit should have a positive impact on the system, making it easier to manage and maintain. However, there may be some minor disruptions to the build process or testing workflows due to the changes in the directory structure.

### Possible risks

* If the project relies on specific file paths or directory structures, the changes in this commit may cause issues with automated testing or build processes.
* If the project uses a version control system that relies on specific file or directory structures, the changes in this commit may cause issues with version control.

### Migration notes (if needed)

* If you're using a build process or testing framework that relies on specific file paths or directory structures, you may need to update your configuration to accommodate the changes in this commit.
* If you're using a version control system that relies on specific file or directory structures, you may need to update your configuration to accommodate the changes in this commit.

### Test recommendations

* Run a thorough set of tests to ensure that the changes in this commit haven't introduced any regressions or broken any existing functionality.
* Verify that the build process and testing workflows are working correctly after the changes.

### Final release note (1 line)

"Refactored project directory structure to simplify maintainability and updated `.gitignore` file to stop tracking `node_modules` directory."
```

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary

This commit adds a backend release workflow for automated deployments. The workflow is triggered on push events to the `backend` branch and runs on an `ubuntu-latest` environment. It installs dependencies, sets up Node.js, and uses Semantic Release to automate the deployment process.

#### 2. What changed (bullet points)

* Added a new `.github/workflows/backend-release.yml` file to define the backend release workflow.
* Configured the workflow to run on push events to the `backend` branch.
* Set up the workflow to run on an `ubuntu-latest` environment.
* Installed dependencies using `npm ci --legacy-peer-deps`.
* Configured Semantic Release to automate the deployment process.
* Set the working directory to `backend`.

#### 3. Why it likely changed

This change likely occurred to automate the deployment process for the backend codebase. With the increasing complexity of software development, automated deployments have become a standard practice to ensure faster and more reliable releases.

#### 4. Impact on system

The addition of this workflow will automate the deployment process for the backend codebase, reducing the manual effort required for releases. This will lead to faster and more reliable releases, which can improve the overall quality of the system.

#### 5. Possible risks

* The use of `npm ci --legacy-peer-deps` may lead to issues with dependency conflicts.
* The configuration of Semantic Release may require adjustments to accommodate specific deployment requirements.
* The workflow may not be compatible with all environments or dependencies.

#### 6. Migration notes (if needed)

* Ensure that the `backend` branch is updated to include the new workflow file.
* Review and adjust the configuration of Semantic Release to accommodate specific deployment requirements.
* Test the workflow thoroughly to ensure compatibility with all environments and dependencies.

#### 7. Test recommendations

* Test the workflow on a staging environment to ensure compatibility with all dependencies and environments.
* Verify that the workflow correctly installs dependencies and runs Semantic Release.
* Test the deployment process to ensure that it is successful and reliable.

#### 8. Final release note (1 line)

Added backend release workflow for automated deployments, enabling faster and more reliable releases.

#### 9. Full markdown explanation

### Deep Commit Analysis

### Commit Details

* Commit Hash: ff88cb5b234caae842066cd3f35961c2efd07b0e
* Date: 2025-10-30 21:31:53 +0530
* Author: Pratyush
* Subject: chore: add backend release workflow for automated deployments

### Changes

* Added a new `.github/workflows/backend-release.yml` file to define the backend release workflow.
* Configured the workflow to run on push events to the `backend` branch.
* Set up the workflow to run on an `ubuntu-latest` environment.
* Installed dependencies using `npm ci --legacy-peer-deps`.
* Configured Semantic Release to automate the deployment process.
* Set the working directory to `backend`.

### Why

This change likely occurred to automate the deployment process for the backend codebase. With the increasing complexity of software development, automated deployments have become a standard practice to ensure faster and more reliable releases.

### Impact

The addition of this workflow will automate the deployment process for the backend codebase, reducing the manual effort required for releases. This will lead to faster and more reliable releases, which can improve the overall quality of the system.

### Risks

* The use of `npm ci --legacy-peer-deps` may lead to issues with dependency conflicts.
* The configuration of Semantic Release may require adjustments to accommodate specific deployment requirements.
* The workflow may not be compatible with all environments or dependencies.

### Migration Notes

* Ensure that the `backend` branch is updated to include the new workflow file.
* Review and adjust the configuration of Semantic Release to accommodate specific deployment requirements.
* Test the workflow thoroughly to ensure compatibility with all environments and dependencies.

### Test Recommendations

* Test the workflow on a staging environment to ensure compatibility with all dependencies and environments.
* Verify that the workflow correctly installs dependencies and runs Semantic Release.
* Test the deployment process to ensure that it is successful and reliable.

### Final Release Note

Added backend release workflow for automated deployments, enabling faster and more reliable releases.

---
### Commit Detail
### High-level summary

The commit updates the backend release workflow in the GitHub Actions configuration file to watch all files and specify the repository URL for semantic release.

### What changed

* The `paths` section in the `on` block of the workflow file now watches all files (`**`) instead of only the `backend` directory.
* The `working-directory` in the `release` job has been removed.
* The `run` step in the `release` job now specifies the repository URL for semantic release using the `--repository-url` flag.

### Why it likely changed

This change likely occurred to make the release workflow more flexible and adaptable to changes in the project structure. By watching all files, the workflow can now handle changes in any directory, not just the `backend` directory. Additionally, specifying the repository URL ensures that semantic release knows which repository to release to, even if the workflow is triggered from a different branch or directory.

### Impact on system

This change should not have any significant impact on the system, as it only updates the configuration file for the release workflow. However, it may cause issues if the project structure changes significantly, such as if the `backend` directory is removed or renamed.

### Possible risks

* If the project structure changes significantly, the workflow may not work as expected.
* If the `--repository-url` flag is not properly configured, semantic release may not release to the correct repository.

### Migration notes (if needed)

* If the project structure changes significantly, update the `paths` section in the workflow file to reflect the new structure.
* If the repository URL changes, update the `--repository-url` flag in the `release` job to reflect the new URL.

### Test recommendations

* Test the release workflow by triggering it manually and verifying that it works as expected.
* Test the workflow with different project structures to ensure it works correctly in different scenarios.

### Final release note

"Updated backend release workflow to watch all files and specify repository URL for semantic release."

### Full markdown explanation

### Deep Commit Analysis

#### Commit Hash

* `706a53ba1d9fc14dfcc99b3dc6dc4f37fae147b0`

#### Date

* `2025-10-30 21:36:03 +0530`

#### Author

* `Pratyush`

#### Subject

* `chore: update backend release workflow to watch all files and specify repository URL for semantic release`

### Diff

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

### Analysis

This commit updates the backend release workflow in the GitHub Actions configuration file to watch all files and specify the repository URL for semantic release. The changes include:

* Watching all files (`**`) instead of only the `backend` directory
* Removing the `working-directory` in the `release` job
* Specifying the repository URL for semantic release using the `--repository-url` flag

The commit likely occurred to make the release workflow more flexible and adaptable to changes in the project structure. However, it may cause issues if the project structure changes significantly or if the `--repository-url` flag is not properly configured.

### Recommendations

* Test the release workflow by triggering it manually and verifying that it works as expected.
* Test the workflow with different project structures to ensure it works correctly in different scenarios.
* Update the `paths` section in the workflow file to reflect any changes in the project structure.
* Update the `--repository-url` flag in the `release` job to reflect any changes in the repository URL.

---
### Commit Detail
### Deep Commit Analysis

**Commit Hash:** 87fa159a0d55ed57aee2e0d6196ce4ace90a8da9
**Date:** 2025-10-30 21:36:27 +0530
**Author:** dauntless-arcane
**Subject:** Merge branch 'main' of https://github.com/dauntless-arcane/Competency-Mapping

### 1. High-level summary

This commit is a merge of the 'main' branch from a remote repository (`https://github.com/dauntless-arcane/Competency-Mapping`). The merge likely involves updating the local repository with changes from the remote repository.

### 2. What changed (bullet points)

- The 'main' branch from the remote repository (`https://github.com/dauntless-arcane/Competency-Mapping`) was merged into the local repository.
- The commit includes two parent commits (`ec3edee` and `de3cc57`), indicating that the merge resolved conflicts between these two commits.

### 3. Why it likely changed

This commit likely changed due to the need to synchronize the local repository with the remote repository. This can be necessary for various reasons, such as:

- To integrate changes made by other developers.
- To update dependencies or libraries.
- To fix bugs or issues in the remote repository.

### 4. Impact on system

The impact of this commit on the system is likely to be:

- The local repository is now up-to-date with the latest changes from the remote repository.
- Any conflicts or issues that were present in the remote repository should be resolved.
- The system may now include new features, bug fixes, or dependencies that were introduced in the remote repository.

### 5. Possible risks

Possible risks associated with this commit include:

- **Integration risks**: The merge may have introduced new conflicts or issues that need to be addressed.
- **Dependency risks**: The updated dependencies or libraries may introduce new bugs or compatibility issues.
- **Data loss risks**: The merge may have overwritten or deleted important data in the local repository.

### 6. Migration notes (if needed)

Migration notes are not applicable for this commit, as it is a simple merge operation.

### 7. Test recommendations

To ensure that the system is working as expected after this commit:

- **Run unit tests**: Verify that all unit tests pass to ensure that the new code does not introduce any regressions.
- **Run integration tests**: Test the system's integration with other components to ensure that the changes did not break any existing functionality.
- **Perform manual testing**: Verify that the system behaves as expected in different scenarios and edge cases.

### 8. Final release note (1 line)

"Updated local repository with latest changes from remote repository."

### 9. Full markdown explanation

```markdown
### Deep Commit Analysis

**Commit Hash:** 87fa159a0d55ed57aee2e0d6196ce4ace90a8da9
**Date:** 2025-10-30 21:36:27 +0530
**Author:** dauntless-arcane
**Subject:** Merge branch 'main' of https://github.com/dauntless-arcane/Competency-Mapping

### 1. High-level summary

This commit is a merge of the 'main' branch from a remote repository (`https://github.com/dauntless-arcane/Competency-Mapping`). The merge likely involves updating the local repository with changes from the remote repository.

### 2. What changed (bullet points)

- The 'main' branch from the remote repository (`https://github.com/dauntless-arcane/Competency-Mapping`) was merged into the local repository.
- The commit includes two parent commits (`ec3edee` and `de3cc57`), indicating that the merge resolved conflicts between these two commits.

### 3. Why it likely changed

This commit likely changed due to the need to synchronize the local repository with the remote repository. This can be necessary for various reasons, such as:

- To integrate changes made by other developers.
- To update dependencies or libraries.
- To fix bugs or issues in the remote repository.

### 4. Impact on system

The impact of this commit on the system is likely to be:

- The local repository is now up-to-date with the latest changes from the remote repository.
- Any conflicts or issues that were present in the remote repository should be resolved.
- The system may now include new features, bug fixes, or dependencies that were introduced in the remote repository.

### 5. Possible risks

Possible risks associated with this commit include:

- **Integration risks**: The merge may have introduced new conflicts or issues that need to be addressed.
- **Dependency risks**: The updated dependencies or libraries may introduce new bugs or compatibility issues.
- **Data loss risks**: The merge may have overwritten or deleted important data in the local repository.

### 6. Migration notes (if needed)

Migration notes are not applicable for this commit, as it is a simple merge operation.

### 7. Test recommendations

To ensure that the system is working as expected after this commit:

- **Run unit tests**: Verify that all unit tests pass to ensure that the new code does not introduce any regressions.
- **Run integration tests**: Test the system's integration with other components to ensure that the changes did not break any existing functionality.
- **Perform manual testing**: Verify that the system behaves as expected in different scenarios and edge cases.

### 8. Final release note (1 line)

"Updated local repository with latest changes from remote repository."

### 9. Full markdown explanation
```

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary

This commit is a merge of the 'main' branch from a remote repository (`https://github.com/dauntless-arcane/Competency-Mapping`) into the current branch.

#### 2. What changed (bullet points)

* Merged changes from the 'main' branch of the remote repository
* No specific file or code changes are mentioned in the provided diff

#### 3. Why it likely changed

The commit likely changed to update the local repository to match the latest changes from the remote repository's 'main' branch. This could be due to various reasons such as:

* Resolving conflicts between local and remote branches
* Incorporating new features or bug fixes from the remote repository
* Realigning the local repository with the remote repository's development progress

#### 4. Impact on system

The impact of this commit on the system is likely minimal, as it only involves merging changes from a remote repository. However, it's essential to review the changes to ensure that they don't introduce any regressions or conflicts.

#### 5. Possible risks

Possible risks associated with this commit include:

* Merge conflicts: If the local and remote branches had conflicting changes, this merge might have introduced conflicts that need to be resolved.
* Regression: The merged changes might introduce new bugs or regressions that need to be tested and fixed.

#### 6. Migration notes (if needed)

No specific migration notes are required for this commit, as it's a simple merge operation. However, it's essential to review the changes and test the system to ensure that everything works as expected.

#### 7. Test recommendations

To ensure that the merged changes work as expected, the following tests should be performed:

* Unit tests: Run the unit tests to ensure that individual components work correctly.
* Integration tests: Perform integration tests to verify that different components work together seamlessly.
* System tests: Run system tests to ensure that the entire system works as expected.

#### 8. Final release note (1 line)

"Updated the local repository to match the latest changes from the remote repository's 'main' branch."

#### 9. Full markdown explanation

### Deep Commit Analysis

#### Commit Information

* **Commit Hash:** 87fa159a0d55ed57aee2e0d6196ce4ace90a8da9
* **Date:** 2025-10-30 21:36:27 +0530
* **Author:** dauntless-arcane
* **Subject:** Merge branch 'main' of https://github.com/dauntless-arcane/Competency-Mapping

#### High-level Summary

This commit is a merge of the 'main' branch from a remote repository (`https://github.com/dauntless-arcane/Competency-Mapping`) into the current branch.

#### What Changed

* Merged changes from the 'main' branch of the remote repository
* No specific file or code changes are mentioned in the provided diff

#### Why It Likely Changed

The commit likely changed to update the local repository to match the latest changes from the remote repository's 'main' branch. This could be due to various reasons such as resolving conflicts between local and remote branches, incorporating new features or bug fixes from the remote repository, or realigning the local repository with the remote repository's development progress.

#### Impact on System

The impact of this commit on the system is likely minimal, as it only involves merging changes from a remote repository. However, it's essential to review the changes to ensure that they don't introduce any regressions or conflicts.

#### Possible Risks

Possible risks associated with this commit include merge conflicts and regression.

#### Migration Notes

No specific migration notes are required for this commit, as it's a simple merge operation. However, it's essential to review the changes and test the system to ensure that everything works as expected.

#### Test Recommendations

To ensure that the merged changes work as expected, the following tests should be performed:

* Unit tests: Run the unit tests to ensure that individual components work correctly.
* Integration tests: Perform integration tests to verify that different components work together seamlessly.
* System tests: Run system tests to ensure that the entire system works as expected.

#### Final Release Note

Updated the local repository to match the latest changes from the remote repository's 'main' branch.

---
### Commit Detail
### Deep Commit Analysis

#### Commit Hash: 3a57c93eca90ace04131b2ff9163e6fa366402cb
#### Date: 2025-10-30 21:46:59 +0530
#### Author: dauntless-arcane
#### Subject: Merge branch 'frontend' of https://github.com/dauntless-arcane/Competency-Mapping

### 1. High-level summary

This commit is a merge of the 'frontend' branch from the Competency-Mapping repository on GitHub. It likely incorporates changes made to the frontend of the application.

### 2. What changed (bullet points)

* The 'frontend' branch from the Competency-Mapping repository was merged into the main branch.
* The changes made to the frontend of the application are now part of the main branch.

### 3. Why it likely changed

The frontend branch was likely updated with new features, bug fixes, or improvements to the user interface. This merge brings those changes into the main branch, ensuring that the latest and greatest frontend code is used.

### 4. Impact on system

The impact of this commit on the system is that the frontend of the application has been updated with new changes. This may affect the user experience, performance, or functionality of the application.

### 5. Possible risks

Possible risks associated with this commit include:

* Breaking changes to the frontend code that may affect the application's behavior or performance.
* Introduction of new bugs or issues that were not caught during testing.
* Incompatibility with existing backend or infrastructure components.

### 6. Migration notes (if needed)

No specific migration notes are required for this commit, as it is a merge of a branch and does not involve any significant changes to the underlying infrastructure.

### 7. Test recommendations

To ensure the stability and quality of the application, it is recommended to:

* Run thorough tests on the frontend code to catch any breaking changes or new issues.
* Verify that the application still functions as expected and meets the required standards.
* Conduct user acceptance testing (UAT) to ensure that the updated frontend meets the user's expectations.

### 8. Final release note (1 line)

"Updated frontend code with latest changes from 'frontend' branch."

### 9. Full markdown explanation

Here is a more detailed explanation of the commit in markdown format:

**Commit Analysis**
==================

**Commit Hash:** 3a57c93eca90ace04131b2ff9163e6fa366402cb
**Date:** 2025-10-30 21:46:59 +0530
**Author:** dauntless-arcane
**Subject:** Merge branch 'frontend' of https://github.com/dauntless-arcane/Competency-Mapping

**High-Level Summary**
--------------------

This commit is a merge of the 'frontend' branch from the Competency-Mapping repository on GitHub. It likely incorporates changes made to the frontend of the application.

**Changes**
----------

* The 'frontend' branch from the Competency-Mapping repository was merged into the main branch.
* The changes made to the frontend of the application are now part of the main branch.

**Why it Changed**
-----------------

The frontend branch was likely updated with new features, bug fixes, or improvements to the user interface. This merge brings those changes into the main branch, ensuring that the latest and greatest frontend code is used.

**Impact on System**
-------------------

The impact of this commit on the system is that the frontend of the application has been updated with new changes. This may affect the user experience, performance, or functionality of the application.

**Possible Risks**
------------------

Possible risks associated with this commit include:

* Breaking changes to the frontend code that may affect the application's behavior or performance.
* Introduction of new bugs or issues that were not caught during testing.
* Incompatibility with existing backend or infrastructure components.

**Migration Notes**
------------------

No specific migration notes are required for this commit, as it is a merge of a branch and does not involve any significant changes to the underlying infrastructure.

**Test Recommendations**
-----------------------

To ensure the stability and quality of the application, it is recommended to:

* Run thorough tests on the frontend code to catch any breaking changes or new issues.
* Verify that the application still functions as expected and meets the required standards.
* Conduct user acceptance testing (UAT) to ensure that the updated frontend meets the user's expectations.

**Final Release Note**
--------------------

Updated frontend code with latest changes from 'frontend' branch.

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary
This commit is a merge of the 'frontend' branch from a remote repository (https://github.com/dauntless-arcane/Competency-Mapping) into the current branch.

#### 2. What changed
- Merged changes from the 'frontend' branch of the Competency-Mapping repository.
- The exact changes are not shown in the diff, but it includes changes from two parent commits (87fa159 and 45d1566).

#### 3. Why it likely changed
The changes were likely merged to integrate new frontend features or bug fixes from the remote repository into the current branch.

#### 4. Impact on system
The merge may introduce new frontend features or bug fixes, but it may also introduce potential conflicts or bugs if the merged code is not properly tested or reviewed.

#### 5. Possible risks
- Merge conflicts: If there were changes to the same files in the current branch, a merge conflict may have occurred, requiring manual resolution.
- Integration issues: The merged code may not be properly integrated with the existing codebase, leading to unexpected behavior or bugs.

#### 6. Migration notes (if needed)
No specific migration notes are provided, but it's essential to review the changes carefully and ensure that the merged code is properly tested and integrated.

#### 7. Test recommendations
- Run a thorough test suite to ensure that the merged code does not introduce any regressions or bugs.
- Test the new frontend features or bug fixes to ensure they are working as expected.

#### 8. Final release note (1 line)
"Frontend branch merged from Competency-Mapping repository, including new features and bug fixes."

#### 9. Full markdown explanation

### Deep Commit Analysis

#### Commit Hash and Details
Commit Hash: 3a57c93eca90ace04131b2ff9163e6fa366402cb
Date: 2025-10-30 21:46:59 +0530
Author: dauntless-arcane
Subject: Merge branch 'frontend' of https://github.com/dauntless-arcane/Competency-Mapping

#### What Changed
The commit merged changes from the 'frontend' branch of the Competency-Mapping repository.

#### Why it Likely Changed
The changes were likely merged to integrate new frontend features or bug fixes from the remote repository into the current branch.

#### Impact on System
The merge may introduce new frontend features or bug fixes, but it may also introduce potential conflicts or bugs if the merged code is not properly tested or reviewed.

#### Possible Risks
- Merge conflicts: If there were changes to the same files in the current branch, a merge conflict may have occurred, requiring manual resolution.
- Integration issues: The merged code may not be properly integrated with the existing codebase, leading to unexpected behavior or bugs.

#### Migration Notes (if needed)
No specific migration notes are provided, but it's essential to review the changes carefully and ensure that the merged code is properly tested and integrated.

#### Test Recommendations
- Run a thorough test suite to ensure that the merged code does not introduce any regressions or bugs.
- Test the new frontend features or bug fixes to ensure they are working as expected.

#### Final Release Note
"Frontend branch merged from Competency-Mapping repository, including new features and bug fixes."

---
### Commit Detail
### Commit Analysis
#### Hash: 9379354760c88d9533e126aeb8b5a13dbc4fb9b9
#### Author: Pratyush
#### Date: 2025-10-30 22:09:58 +0530
#### Subject: Merge branch 'frontend' of https://github.com/dauntless-arcane/Competency-Mapping into frontend

### High-level Summary
This commit is a merge of the 'frontend' branch from the Competency-Mapping repository into the local 'frontend' branch.

### What Changed
* Merged changes from the 'frontend' branch of the Competency-Mapping repository
* No specific file changes are mentioned in the diff

### Why it Likely Changed
The merge was likely performed to incorporate recent frontend updates or bug fixes from the Competency-Mapping repository into the local project.

### Impact on System
The merge may introduce new features, bug fixes, or changes to the frontend code, potentially affecting the overall system behavior.

### Possible Risks
* Merge conflicts may have occurred, requiring manual resolution
* New changes may introduce unforeseen issues or break existing functionality
* The merge may have introduced new dependencies or libraries, affecting system performance

### Migration Notes
No specific migration notes are required, as this is a merge operation. However, it's essential to review the changes and test the system thoroughly to ensure a smooth transition.

### Test Recommendations
* Perform a thorough review of the merged changes
* Run automated tests to ensure the system behaves as expected
* Conduct manual testing to verify the functionality of new features or changes

### Final Release Note
"Frontend branch updated with recent changes from Competency-Mapping repository."

### Full Markdown Explanation
```markdown
### Commit Analysis
#### Hash: 9379354760c88d9533e126aeb8b5a13dbc4fb9b9
#### Author: Pratyush
#### Date: 2025-10-30 22:09:58 +0530
#### Subject: Merge branch 'frontend' of https://github.com/dauntless-arcane/Competency-Mapping into frontend

### High-level Summary
This commit is a merge of the 'frontend' branch from the Competency-Mapping repository into the local 'frontend' branch.

### What Changed
* Merged changes from the 'frontend' branch of the Competency-Mapping repository
* No specific file changes are mentioned in the diff

### Why it Likely Changed
The merge was likely performed to incorporate recent frontend updates or bug fixes from the Competency-Mapping repository into the local project.

### Impact on System
The merge may introduce new features, bug fixes, or changes to the frontend code, potentially affecting the overall system behavior.

### Possible Risks
* Merge conflicts may have occurred, requiring manual resolution
* New changes may introduce unforeseen issues or break existing functionality
* The merge may have introduced new dependencies or libraries, affecting system performance

### Migration Notes
No specific migration notes are required, as this is a merge operation. However, it's essential to review the changes and test the system thoroughly to ensure a smooth transition.

### Test Recommendations
* Perform a thorough review of the merged changes
* Run automated tests to ensure the system behaves as expected
* Conduct manual testing to verify the functionality of new features or changes

### Final Release Note
"Frontend branch updated with recent changes from Competency-Mapping repository."
```

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level Summary

This commit merges changes from the 'main' branch of the Competency-Mapping repository from dauntless-arcane's GitHub account. The merge likely updates the local repository with the latest changes from the remote repository.

#### 2. What Changed

* Merged changes from 'main' branch of Competency-Mapping repository
* Updated local repository with changes from remote repository
* The commit does not include any specific file changes, indicating that the merge was performed without conflicts or changes.

#### 3. Why it Likely Changed

This commit likely changed to update the local repository with the latest changes from the remote repository. This is a common practice in Git to ensure that the local repository is up-to-date with the latest changes from the remote repository.

#### 4. Impact on System

The impact of this commit on the system is likely to be minimal, as it only updates the local repository with the latest changes from the remote repository. However, if there are any conflicts or changes in the merged changes, it may affect the system's functionality.

#### 5. Possible Risks

Possible risks associated with this commit include:

* Conflicts with local changes: If there are any local changes that conflict with the changes from the remote repository, it may cause issues with the system's functionality.
* Changes in dependencies: If the merged changes affect any dependencies, it may cause issues with the system's functionality.

#### 6. Migration Notes (if needed)

No migration notes are required for this commit, as it only updates the local repository with the latest changes from the remote repository.

#### 7. Test Recommendations

It is recommended to run tests to ensure that the system's functionality is not affected by the merged changes.

#### 8. Final Release Note (1 line)

"Updated local repository with changes from remote repository."

#### 9. Full Markdown Explanation

### Deep Commit Analysis

#### Commit Details

* Commit Hash: b8c5071de43069c64da6614bc556bd9a311aad80
* Date: 2025-10-31 09:12:46 +0530
* Author: dauntless-arcane
* Subject: Merge branch 'main' of https://github.com/dauntless-arcane/Competency-Mapping

#### High-Level Summary

This commit merges changes from the 'main' branch of the Competency-Mapping repository from dauntless-arcane's GitHub account. The merge likely updates the local repository with the latest changes from the remote repository.

#### What Changed

* Merged changes from 'main' branch of Competency-Mapping repository
* Updated local repository with changes from remote repository
* The commit does not include any specific file changes, indicating that the merge was performed without conflicts or changes.

#### Why it Likely Changed

This commit likely changed to update the local repository with the latest changes from the remote repository. This is a common practice in Git to ensure that the local repository is up-to-date with the latest changes from the remote repository.

#### Impact on System

The impact of this commit on the system is likely to be minimal, as it only updates the local repository with the latest changes from the remote repository. However, if there are any conflicts or changes in the merged changes, it may affect the system's functionality.

#### Possible Risks

Possible risks associated with this commit include:

* Conflicts with local changes: If there are any local changes that conflict with the changes from the remote repository, it may cause issues with the system's functionality.
* Changes in dependencies: If the merged changes affect any dependencies, it may cause issues with the system's functionality.

#### Migration Notes (if needed)

No migration notes are required for this commit, as it only updates the local repository with the latest changes from the remote repository.

#### Test Recommendations

It is recommended to run tests to ensure that the system's functionality is not affected by the merged changes.

#### Final Release Note

Updated local repository with changes from remote repository.

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary

This commit adds an empty file named `w.txt` for future development purposes.

#### 2. What changed

* Added an empty file named `w.txt` in the project directory.
* The file is created with mode 100644, indicating a regular file.
* The file is initially empty, with an index of `e69de29`, which is the hash for an empty file in Git.

#### 3. Why it likely changed

The commit message suggests that the file is added for future development purposes. This implies that the author, Pratyush, may have anticipated using the file in future commits or features, but did not immediately need to populate it.

#### 4. Impact on system

The addition of an empty file is unlikely to have a significant impact on the system, as it does not introduce any new functionality or dependencies. However, the file's presence may affect the project's directory structure or version control history.

#### 5. Possible risks

* The empty file may be mistaken for a completed feature or a file with meaningful content, leading to confusion or errors in the future.
* The file's presence may cause version control issues, such as conflicts or unnecessary changes, if it is not properly managed.

#### 6. Migration notes (if needed)

* If the file is not used in future commits, it may be safe to remove it to simplify the project's directory structure.
* If the file is used in future commits, ensure that it is properly populated with meaningful content and that its presence is clearly documented in the project's documentation.

#### 7. Test recommendations

* No specific tests are recommended for this commit, as the file is empty and does not introduce any new functionality.
* However, consider adding tests to ensure that the file is properly created and managed in the project's version control system.

#### 8. Final release note

Added empty file `w.txt` for future development purposes.

#### 9. Full markdown explanation

### Deep Commit Analysis

#### Commit Details

* Commit Hash: 4c184eda9bdfafaf449ec1d1c49397470938f42c
* Date: 2025-10-31 11:12:28 +0530
* Author: Pratyush

#### Commit Message

```markdown
chore: add empty file w.txt for future development
```

#### Diff

```diff
commit 4c184eda9bdfafaf449ec1d1c49397470938f42c
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Fri Oct 31 11:12:28 2025 +0530

    chore: add empty file w.txt for future development

diff --git a/w/.txt b/w/.txt
new file mode 100644
index 0000000..e69de29
```

### Analysis

This commit adds an empty file named `w.txt` for future development purposes. The file is created with mode 100644, indicating a regular file, and is initially empty with an index of `e69de29`, which is the hash for an empty file in Git.

The commit message suggests that the file is added for future development purposes, implying that the author may have anticipated using the file in future commits or features, but did not immediately need to populate it.

The addition of an empty file is unlikely to have a significant impact on the system, but may affect the project's directory structure or version control history. Possible risks include mistaking the file for a completed feature or causing version control issues if not properly managed.

### Recommendations

* If the file is not used in future commits, consider removing it to simplify the project's directory structure.
* If the file is used in future commits, ensure that it is properly populated with meaningful content and that its presence is clearly documented in the project's documentation.
* Consider adding tests to ensure that the file is properly created and managed in the project's version control system.

### Final Release Note

Added empty file `w.txt` for future development purposes.

---
### Commit Detail
### High-level Summary

A high-level summary of the commit is that an empty file named `w.txt` has been added to the project for future development purposes.

### What Changed

* An empty file named `w.txt` has been added to the project.
* The file is located in the root directory of the project.

### Why it Likely Changed

This change likely occurred to reserve a file name for future use in the project. The author, Pratyush, has explicitly mentioned that the file is for future development purposes, indicating that they may need to use this file in the future and wanted to create it early to avoid potential naming conflicts.

### Impact on System

The addition of this empty file is unlikely to have any significant impact on the system, as it does not introduce any new functionality or dependencies. However, it may affect the project's directory structure or file organization, depending on how the project is structured.

### Possible Risks

There are no immediate risks associated with this change. However, if the file is not properly managed or deleted when no longer needed, it may lead to clutter and confusion in the project directory.

### Migration Notes (if needed)

No migration notes are required for this change, as it does not introduce any new functionality or dependencies.

### Test Recommendations

No specific test recommendations are required for this change, as it is a simple file addition. However, it is always a good practice to test the project's functionality after making any changes to ensure that everything is working as expected.

### Final Release Note

Added empty file `w.txt` for future development purposes.

### Full Markdown Explanation

**Deep Commit Analysis**

**Commit Hash:** 4c184eda9bdfafaf449ec1d1c49397470938f42c
**Date:** 2025-10-31 11:12:28 +0530
**Author:** Pratyush
**Subject:** chore: add empty file w.txt for future development

**High-level Summary**
A high-level summary of the commit is that an empty file named `w.txt` has been added to the project for future development purposes.

**What Changed**
* An empty file named `w.txt` has been added to the project.
* The file is located in the root directory of the project.

**Why it Likely Changed**
This change likely occurred to reserve a file name for future use in the project. The author, Pratyush, has explicitly mentioned that the file is for future development purposes, indicating that they may need to use this file in the future and wanted to create it early to avoid potential naming conflicts.

**Impact on System**
The addition of this empty file is unlikely to have any significant impact on the system, as it does not introduce any new functionality or dependencies. However, it may affect the project's directory structure or file organization, depending on how the project is structured.

**Possible Risks**
There are no immediate risks associated with this change. However, if the file is not properly managed or deleted when no longer needed, it may lead to clutter and confusion in the project directory.

**Migration Notes (if needed)**
No migration notes are required for this change, as it does not introduce any new functionality or dependencies.

**Test Recommendations**
No specific test recommendations are required for this change, as it is a simple file addition. However, it is always a good practice to test the project's functionality after making any changes to ensure that everything is working as expected.

**Final Release Note**
Added empty file `w.txt` for future development purposes.

---
### Commit Detail
### Commit Analysis

#### High-level Summary
This commit adds an initial README.md file with a test message to the repository.

#### What Changed
* Added a new file `README.md` to the repository.
* The file contains a test message "hello test 123".

#### Why it Likely Changed
The commit is likely a part of the initial setup or onboarding process for the repository. The author, Pratyush, added the README file to provide a basic introduction or instructions for users.

#### Impact on System
The addition of the README file does not have a significant impact on the system's functionality. However, it provides a starting point for users to understand the project's purpose and usage.

#### Possible Risks
There are no apparent risks associated with this commit. However, it's essential to ensure that the README file is regularly updated to reflect changes in the project.

#### Migration Notes
No migration notes are required for this commit.

#### Test Recommendations
No specific tests are recommended for this commit. However, it's essential to verify that the README file is correctly rendered and accessible.

#### Final Release Note
Initial README file added with a test message.

#### Full Markdown Explanation

### Commit Analysis

#### High-level Summary
This commit adds an initial README.md file with a test message to the repository.

#### What Changed
* Added a new file `README.md` to the repository.
* The file contains a test message "hello test 123".

#### Why it Likely Changed
The commit is likely a part of the initial setup or onboarding process for the repository. The author, Pratyush, added the README file to provide a basic introduction or instructions for users.

#### Impact on System
The addition of the README file does not have a significant impact on the system's functionality. However, it provides a starting point for users to understand the project's purpose and usage.

#### Possible Risks
There are no apparent risks associated with this commit. However, it's essential to ensure that the README file is regularly updated to reflect changes in the project.

#### Migration Notes
No migration notes are required for this commit.

#### Test Recommendations
No specific tests are recommended for this commit. However, it's essential to verify that the README file is correctly rendered and accessible.

#### Final Release Note
Initial README file added with a test message.

### Commit Details

* Hash: a1feb3fa5be30bd6bb4e2e77cf5bc2ed27119221
* Author: Pratyush
* Date: 2025-10-31 11:18:25 +0530
* Subject: chore: add initial README.md with test message

---
### Commit Detail
### Deep Commit Analysis

#### Commit Hash: 0b5b7301dd16f2b31d4c2ac5ed70c3121a05560d
#### Date: 2025-10-31 11:22:37 +0530
#### Author: Pratyush Mishra
#### Subject: Update sync-main.yml

### High-level Summary

This commit updates the `sync-main.yml` file in the `.github/workflows` directory, which is a GitHub Actions workflow file. The changes primarily focus on updating the `sync` job to merge changes from a specific branch into the `main` branch.

### What Changed

* Removed the `runs-on` directive from the `sync` job.
* Renamed the `Configure git` step to `Configure Git` and updated the command to set the Git user name and email.
* Renamed the `Sync branch` step to `Merge into main` and updated the command to:
	+ Fetch the `main` branch and the branch being synced.
	+ Checkout the `main` branch or create a new branch if it doesn't exist.
	+ Merge the changes from the synced branch into the `main` branch.
	+ Commit a message showing where the changes came from.
	+ Push the changes back to the `origin` repository.

### Why it Likely Changed

The changes likely occurred to improve the synchronization process between the `main` branch and other branches. The updated workflow now fetches everything safely, checks out the `main` branch, and merges the changes from the synced branch. This should help ensure that the `main` branch is up-to-date and accurate.

### Impact on System

The changes should have a positive impact on the system, as they improve the synchronization process and reduce the likelihood of conflicts. However, it's essential to note that the updated workflow may introduce new merge conflicts or issues if not properly tested.

### Possible Risks

* Merge conflicts may arise if the synced branch and the `main` branch have conflicting changes.
* The updated workflow may push changes to the `main` branch without proper review or testing, potentially introducing issues.

### Migration Notes (if needed)

If you're upgrading from an older version of the workflow, you may need to update the `sync-main.yml` file to match the changes made in this commit. Be sure to test the updated workflow thoroughly to ensure it functions as expected.

### Test Recommendations

* Test the updated workflow with different branches and scenarios to ensure it functions correctly.
* Verify that the `main` branch is updated accurately and without conflicts.
* Test the workflow with and without merge conflicts to ensure it handles them properly.

### Final Release Note

"Updated the `sync-main.yml` file to improve synchronization between branches and reduce merge conflicts."

### Full Markdown Explanation

This commit updates the `sync-main.yml` file to improve the synchronization process between branches. The changes include:

* Removing the `runs-on` directive from the `sync` job.
* Renaming the `Configure git` step to `Configure Git` and updating the command to set the Git user name and email.
* Renaming the `Sync branch` step to `Merge into main` and updating the command to:
	+ Fetch the `main` branch and the branch being synced.
	+ Checkout the `main` branch or create a new branch if it doesn't exist.
	+ Merge the changes from the synced branch into the `main` branch.
	+ Commit a message showing where the changes came from.
	+ Push the changes back to the `origin` repository.

These changes should improve the synchronization process and reduce the likelihood of conflicts. However, it's essential to note that the updated workflow may introduce new merge conflicts or issues if not properly tested. Be sure to test the updated workflow thoroughly to ensure it functions as expected.

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary

A manual merge was performed to resolve conflicts between the `frontend` branch and the `main` branch. This commit resolves the merge and brings the `frontend` branch up to date with the latest changes in `main`.

#### 2. What changed (bullet points)

* Resolved conflicts between `frontend` and `main` branches
* Merged changes from `main` into `frontend` branch

#### 3. Why it likely changed

The commit author, Pratyush, likely performed a manual merge to resolve conflicts that arose between the `frontend` branch and the `main` branch. This is a common occurrence when multiple developers are working on different branches and need to integrate their changes.

#### 4. Impact on system

This commit has resolved the conflicts between the `frontend` and `main` branches, allowing the `frontend` branch to be updated with the latest changes from `main`. This should not have a significant impact on the system, but it may have introduced some new changes or fixed some issues that were present in the `frontend` branch.

#### 5. Possible risks

* Introducing new bugs or issues due to the merge
* Overwriting changes made by other developers in the `frontend` branch
* Creating conflicts with other branches that may have been merged into `main` since the last sync

#### 6. Migration notes (if needed)

* Make sure to test the `frontend` branch thoroughly after this merge to ensure that all changes are working as expected.
* If any issues arise, investigate the root cause and make necessary changes to resolve the issue.

#### 7. Test recommendations

* Run a comprehensive set of tests on the `frontend` branch to ensure that all changes are working as expected.
* Perform manual testing to verify that the merge has not introduced any new issues.

#### 8. Final release note (1 line)

"Resolved conflicts between frontend and main branches, bringing frontend up to date with the latest changes."

#### 9. Full markdown explanation

**Commit Analysis: Manual Merge Frontend → Main (Resolved)**

### Summary

A manual merge was performed to resolve conflicts between the `frontend` branch and the `main` branch. This commit resolves the merge and brings the `frontend` branch up to date with the latest changes in `main`.

### Details

* **Commit Hash:** 51ef5b17b6c78bfd16c6315820ca1d12d1ade558
* **Date:** 2025-10-31 11:32:32 +0530
* **Author:** Pratyush
* **Subject:** 🔁 Manual merge frontend → main (resolved)

### What Changed

* Resolved conflicts between `frontend` and `main` branches
* Merged changes from `main` into `frontend` branch

### Why It Changed

The commit author, Pratyush, likely performed a manual merge to resolve conflicts that arose between the `frontend` branch and the `main` branch.

### Impact on System

This commit has resolved the conflicts between the `frontend` and `main` branches, allowing the `frontend` branch to be updated with the latest changes from `main`. This should not have a significant impact on the system, but it may have introduced some new changes or fixed some issues that were present in the `frontend` branch.

### Possible Risks

* Introducing new bugs or issues due to the merge
* Overwriting changes made by other developers in the `frontend` branch
* Creating conflicts with other branches that may have been merged into `main` since the last sync

### Migration Notes

* Make sure to test the `frontend` branch thoroughly after this merge to ensure that all changes are working as expected.
* If any issues arise, investigate the root cause and make necessary changes to resolve the issue.

### Test Recommendations

* Run a comprehensive set of tests on the `frontend` branch to ensure that all changes are working as expected.
* Perform manual testing to verify that the merge has not introduced any new issues.

### Final Release Note

Resolved conflicts between frontend and main branches, bringing frontend up to date with the latest changes.

---
### Commit Detail
### High-level Summary

This commit is a manual merge of the frontend branch into the main branch, resolving any conflicts that may have arisen during the merge process.

### What Changed

* Merged the frontend branch into the main branch
* Resolved any conflicts that occurred during the merge process

### Why it Likely Changed

This commit likely changed to update the main branch with the latest changes from the frontend branch. The manual merge was necessary to resolve any conflicts that may have occurred, ensuring that the main branch remains up-to-date and stable.

### Impact on System

The merge of the frontend branch into the main branch will likely have the following impacts on the system:

* The main branch will now reflect the latest changes from the frontend branch
* Any conflicts that were resolved during the merge process will have been addressed
* The system will be updated with the latest features and bug fixes from the frontend branch

### Possible Risks

* The manual merge may have introduced new bugs or conflicts that were not caught during the merge process
* The merge may have overwritten or modified existing code, potentially causing issues downstream

### Migration Notes (if needed)

* None

### Test Recommendations

* Perform a thorough round of testing to ensure that the merge did not introduce any new bugs or conflicts
* Test the system to ensure that it is functioning as expected and that all features are working correctly

### Final Release Note

"Frontend branch merged into main branch, resolving conflicts and updating the system with the latest features and bug fixes."

### Full Markdown Explanation

### Deep Commit Analysis

#### Commit Hash and Details

* Commit Hash: 51ef5b17b6c78bfd16c6315820ca1d12d1ade558
* Date: 2025-10-31 11:32:32 +0530
* Author: Pratyush
* Subject: 🔁 Manual merge frontend → main (resolved)

#### Diff

```diff
commit 51ef5b17b6c78bfd16c6315820ca1d12d1ade558
Merge: 0b5b730 2a54572
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Fri Oct 31 11:32:32 2025 +0530

    🔁 Manual merge frontend → main (resolved)
```

#### High-Level Summary

This commit is a manual merge of the frontend branch into the main branch, resolving any conflicts that may have arisen during the merge process.

#### What Changed

* Merged the frontend branch into the main branch
* Resolved any conflicts that occurred during the merge process

#### Why it Likely Changed

This commit likely changed to update the main branch with the latest changes from the frontend branch. The manual merge was necessary to resolve any conflicts that may have occurred, ensuring that the main branch remains up-to-date and stable.

#### Impact on System

The merge of the frontend branch into the main branch will likely have the following impacts on the system:

* The main branch will now reflect the latest changes from the frontend branch
* Any conflicts that were resolved during the merge process will have been addressed
* The system will be updated with the latest features and bug fixes from the frontend branch

#### Possible Risks

* The manual merge may have introduced new bugs or conflicts that were not caught during the merge process
* The merge may have overwritten or modified existing code, potentially causing issues downstream

#### Migration Notes (if needed)

* None

#### Test Recommendations

* Perform a thorough round of testing to ensure that the merge did not introduce any new bugs or conflicts
* Test the system to ensure that it is functioning as expected and that all features are working correctly

#### Final Release Note

"Frontend branch merged into main branch, resolving conflicts and updating the system with the latest features and bug fixes."

---
### Commit Detail
### High-level summary

This commit is an auto-sync of the backend to the main branch, resolving merge conflicts. The commit includes changes to the `backend/CHANGELOG.md` file, which lists the changes made in the previous commit, and updates the `package-lock.json` file to reflect the changes.

### What changed

* Added new features to the backend:
	+ Added the saving API for saving data of users to DB
	+ Implemented automatic result generation on submission
	+ Integrated framer-motion for smooth question transitions and updated validation schema
	+ Processed pending survey responses and auto-generated results
* Fixed bugs in the backend:
	+ Fixed the result fetch giving null for all responses
	+ Fixed the wrong status code sent
	+ Fixed the name not coming in /api/users/fetch-tests/
	+ Fixed the mongodb_atlas_db_uri_with_credentials in file
	+ Fixed the regenerate package-lock.json with legacy peer deps
	+ Fixed the **result-generator:** add missing mongoose import and update survey response with scores
* Updated the package-lock.json file to reflect the changes

### Why it likely changed

The changes were likely made to update the backend to reflect the changes made in the previous commit. The auto-sync feature likely triggered this commit to resolve any merge conflicts and update the files accordingly.

### Impact on system

The changes will likely have a positive impact on the system, as they add new features and fix bugs. However, there may be some minor issues with the system due to the changes made.

### Possible risks

* There may be some minor issues with the system due to the changes made.
* The changes may break some existing functionality or features.
* There may be some performance issues due to the changes made.

### Migration notes

* Make sure to test the system thoroughly after the changes are made.
* Check for any minor issues or bugs that may have been introduced.
* Make sure to update any dependencies or packages that may have been affected by the changes.

### Test recommendations

* Run a thorough test of the system to ensure that all features and functionality are working as expected.
* Test the new features and functionality to ensure that they are working correctly.
* Test the system for any minor issues or bugs that may have been introduced.

### Final release note

"This release includes bug fixes, new features, and updates to the package-lock.json file."

### Full markdown explanation

#### Deep Commit Analysis

Commit Hash: 276014529e6cb611b3a07492803375cc6548c556
Date: 2025-10-31 06:42:08 +0000
Author: github-actions[bot]
Subject: 🔁 Auto-sync backend → main (resolved merge conflicts)

### Diff

```diff
commit 276014529e6cb611b3a07492803375cc6548c556
Merge: da41290 7fc223c
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Fri Oct 31 06:42:08 2025 +0000

    🔁 Auto-sync backend → main (resolved merge conflicts)

diff --cc backend/CHANGELOG.md
index 0000000,6c8f52f..15a23be
mode 000000,100644..100644
--- a/backend/CHANGELOG.md
+++ b/backend/CHANGELOG.md
@@@ -1,0 -1,33 +1,35 @@@
 -# [1.1.0](https://github.com/dauntless-arcane/Competency-Mapping/compare/backend-v1.0.0...backend-v1.1.0) (2025-10-30)
++# [1.1.0](https://github.com/dauntless-arcane/Competency-Mapping/compare/frontend-v1.0.0...frontend-v1.1.0) (2025-10-30)
+ 
+ 
+ ### Bug Fixes
+ 
+ * /api/users/fetch-tests to added  level,duration,recommended ([e96d9f2](https://github.com/dauntless-arcane/Competency-Mapping/commit/e96d9f29787bea87b7fa4eee2a6d987282c8240b))
++* add --legacy-peer-deps flag to @semantic-release/release-notes-generator installation ([5e68f56](https://github.com/dauntless-arcane/Competency-Mapping/commit/5e68f56320f59b9217fa3cd81587e93e1de14606))
+ * mongodb_atlas_db_uri_with_credentials in file fixed ([87225b6](https://github.com/dauntless-arcane/Competency-Mapping/commit/87225b6b6518d36672ebc0564b67db0767991380))
+ * name not coming in /api/users/fetch-tests/ ([de68eb0](https://github.com/dauntless-arcane/Competency-Mapping/commit/de68eb0f3ce59991e048a7e7ab476abd9429bb31))
+ * regenerate package-lock.json with legacy peer deps ([0cee040](https://github.com/dauntless-arcane/Competency-Mapping/commit/0cee0408d03db76a38d59768c4a6de36195ce533))
+ * **result-generator:** add missing mongoose import and update survey response with scores ([b834907](https://github.com/dauntless-arcane/Competency-Mapping/commit/b83490712d63b9f81d6baec612d995cd602abb93))
+ * **result-generator:** add missing mongoose import and update survey response with scores ([0ce93c0](https://github.com/dauntless-arcane/Competency-Mapping/commit/0ce93c0d8e562a1e387d60e3efdf97c71c1d32db))
+ * standardize quotes in frontend release workflow ([6bedced](https://github.com/dauntless-arcane/Competency-Mapping/commit/6bedcedb04a3333f9aaa93533f7720058b7c9799))
+ * the result fetch giving null for all rrsponses ([674c0f7](https://github.com/dauntless-arcane/Competency-Mapping/commit/674c0f75467f8d2218280de6d0ff9cf1eb1890ae))
+ * wrong status code sent ([f8ad45f](https://github.com/dauntless-arcane/Competency-Mapping/commit/f8ad45ff70f6b0f0e5dc87f7725024287ab7476f))
+ 
+ 
+ ### Features
+ 
+ * add @semantic-release/changelog dependency to package.json and package-lock.json ([8791a32](https://github.com/dauntless-arcane/Competency-Mapping/commit/8791a3256b987f97a56f2700e1bdccc58a2f46b4))
+ * add @semantic-release/exec dependency to package.json and package-lock.json ([13fb67a](https://github.com/dauntless-arcane/Competency-Mapping/commit/13fb67ae10110ff0fce62482ffed5ba13a772852))
+ * added Login>js and fixed api for the user-survey ([907bb15](https://github.com/dauntless-arcane/Competency-Mapping/commit/907bb15b5920e72b2821a610ba8b2d09e6083117))
++* added the saving api for saving data of users to DB ([76076c7](https://github.com/dauntless-arcane/Competency-Mapping/commit/76076c7888702349d105dc7aafed1166571bbf8d))
+ * **api:** add categoryConstants support in test creation route ([67356d6](https://github.com/dauntless-arcane/Competency-Mapping/commit/67356d6f21c7d78adf33272b0baaa75afdc51c61))
+ * backend release automation file added ([08434f9](https://github.com/dauntless-arcane/Competency-Mapping/commit/08434f972dac95d69608f18bf9ed0a901639253f))
+ * **release:** add frontend release workflow configuration ([b0fdc65](https://github.com/dauntless-arcane/Competency-Mapping/commit/b0fdc6574c846a293d28ec901666477f538c0282))
+ * **release:** add frontend release workflow with semantic-release configuration ([41f1061](https://github.com/dauntless-arcane/Competency-Mapping/commit/41f1061b169dc12e7a43736ceddb779014b9ebb7))
+ * **survey:** Implement automatic result generation on submission ([5a455c3](https://github.com/dauntless-arcane/Competency-Mapping/commit/5a455c3ba4f0f7da60c2d444649992d76ba7ac55))
+ * **survey:** integrate framer-motion for smooth question transitions and update validation schema ([0f46ddd](https://github.com/dauntless-arcane/Competency-Mapping/commit/0f46ddd236580dc7542b48b414d0062efc029b2a))
+ * **watcher:** process pending survey responses and auto-generate results ([79f02ab](https://github.com/dauntless-arcane/Competency-Mapping/commit/79f02abf78ceb37c1b74db50a7a2235288e06d09))
+ 
+ 
+ ### BREAKING CHANGES
+ 
+ * **survey:** The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).
diff --cc package-lock.json
index 39d4a2e,0a5f964..f358fed
--- a/package-lock.json
+++ b/package-lock.json
@@@ -8761,97 -2346,35 +2347,46 @@@
          "url": "https://github.com/sponsors/sindresorhus"
        }
      },
-     "node_modules/flat-cache": {
-       "version": "3.2.0",
-       "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-3.2.0.tgz",
-       "integrity": "sha512-CYcENa+FtcUKLmhhqyctpclsq7QF38pKjZHsGNiSQF5r4FtoKDWabFDl3hzaEQMvT1LHEysw5twgLvpYYb4vbw==",
-       "dependencies": {
-         "flatted": "^3.2.9",
-         "keyv": "^4.5.3",
-         "rimraf": "^3.0.2"
-       },
-       "engines": {
-         "node": "^10.12.0 || >=12.0.0"
-       }
-     },
-     "node_modules/flatted": {
-       "version": "3.3.1",
-       "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.3.1.tgz",
-       "integrity": "sha512-X8cqMLLie7KsNUDSdzeN8FYK9rEt4Dt67OsG/DNGnYTSDBG4uFAJFBnUeiV+zCVAvwFy56IjM9sH51jVaEhNxw=="
-     },
-     "node_modules/for-each": {
-       "version": "0.3.3",
-       "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.3.tgz",
-       "integrity": "sha512-jqYfLp7mo9vIyQf8ykW2v7A+2N4QjeCeI5+Dz9XraiO1ign81wjiH7Fb9vSOWvQfNtmSa4H2RoQTrrXivdUZmw==",
-       "dependencies": {
-         "is-callable": "^1.1.3"
-       }
-     },
-     "node_modules/foreground-child": {
-       "version": "3.3.0",
-       "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.0.tgz",
-       "integrity": "sha512-Ld2g8rrAyMYFXBhEqMz8ZAHBi4J4uS1i/CxGMDnjyFWddMXLVcDp051DZfu+t7+ab7Wv6SMqpWmyFIj5UbfFvg==",
-       "dependencies": {
-         "cross-spawn": "^7.0.0",
-         "signal-exit": "^4.0.1"
-       },
+     "node_modules/forwarded": {
+       "version": "0.2.0",
+       "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
+       "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
+       "license": "MIT",
        "engines": {
-         "node": ">=14"
-       },
-       "funding": {
-         "url": "https://github.com/sponsors/isaacs"
+         "node": ">= 0.6"
        }
      },
-     "node_modules/fraction.js": {
-       "version": "4.3.7",
-       "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
-       "integrity": "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==",
+     "node_modules/fresh": {
+       "version": "2.0.0",
+       "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
+       "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
+       "license": "MIT",
        "engines": {
-         "node": "*"
-       },
-       "funding": {
-         "type": "patreon",
-         "url": "https://github.com/sponsors/rawify"
+         "node": ">= 0.8"
        }
      },
-     "node_modules/framer-motion": {
-       "version": "12.23.24",
-       "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-12.23.24.tgz",
-       "integrity": "sha512-HMi5HRoRCTou+3fb3h9oTLyJGBxHfW+HnNE25tAXOvVx/IvwMHK0cx7IR4a2ZU6sh3IX1Z+4ts32PcYBOqka8w==",
+     "node_modules/from2": {
+       "version": "2.3.0",
+       "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
+       "integrity": "sha512-OMcX/4IC/uqEPVgGeyfN22LJk6AZrMkRZHxcHBMBvHScDGgwTm2GT2Wkgtocyd3JfZffjj2kYUDXXII0Fk9W0g==",
+       "dev": true,
        "license": "MIT",
        "dependencies": {
-         "motion-dom": "^12.23.23",
-         "motion-utils": "^12.23.6",
-         "tslib": "^2.4.0"
-       },
-       "peerDependencies": {
-         "@emotion/is-prop-valid": "*",
-         "react": "^18.0.0 || ^19.0.0",
-         "react-dom": "^18.0.0 || ^19.0.0"
-       },
-       "peerDependenciesMeta": {
-         "@emotion/is-prop-valid": {
-           "optional": true
-         },
-         "react": {
-           "optional": true
-         },
-         "react-dom": {
-           "optional": true
-         }
+         "inherits": "^2.0.1",
+         "readable-stream": "^2.0.0"
        }
      },
 +    "node_modules/from2": {
 +      "version": "2.3.0",
 +      "resolved": "https://registry.npmjs.org/from2/-/from2-2.3.0.tgz",
 +      "integrity": "sha512-OMcX/4IC/uqEPVgGeyfN22LJk6AZrMkRZHxcHBMBvHScDGgwTm2GT2Wkgtocyd3JfZffjj2kYUDXXII0Fk9W0g==",
 +      "dev": true,
 +      "license": "MIT",
 +      "dependencies": {
 +        "inherits": "^2.0.1",
 +        "readable-stream": "^2.0.0"
 +      }
 +    },
      "node_modules/fs-extra": {
        "version": "11.3.2",
        "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-11.3.2.tgz",
@@@ -9037,83 -2507,37 +2519,52 @@@
          "traverse": "0.6.8"
        }
      },
-     "node_modules/glob": {
-       "version": "7.1.7",
-       "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.7.tgz",
-       "integrity": "sha512-OvD9ENzPLbegENnYP5UUfJIirTg4+XwMWGaQfQTY0JenxNvvIKP3U3/tAQSPIu/lHxXYSZmpXlUHeqAIdKzBLQ==",
-       "deprecated": "Glob versions prior to v9 are no longer supported",
-       "dependencies": {
-         "fs.realpath": "^1.0.0",
-         "inflight": "^1.0.4",
-         "inherits": "2",
-         "minimatch": "^3.0.4",
-         "once": "^1.3.0",
-         "path-is-absolute": "^1.0.0"
-       },
-       "engines": {
-         "node": "*"
-       },
-       "funding": {
-         "url": "https://github.com/sponsors/isaacs"
-       }
-     },
-     "node_modules/glob-parent": {
-       "version": "6.0.2",
-       "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
-       "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
-       "dependencies": {
-         "is-glob": "^4.0.3"
-       },
-       "engines": {
-         "node": ">=10.13.0"
-       }
-     },
-     "node_modules/globals": {
-       "version": "13.24.0",
-       "resolved": "https://registry.npmjs.org/globals/-/globals-13.24.0.tgz",
-       "integrity": "sha512-AhO5QUcj8llrbG09iWhPU2B204J1xnPeL8kQmVorSsy+Sjj1sk8gIyh6cUocGmH4L0UuhAJy+hJMRA4mgA4mFQ==",
++    "node_modules/git-log-parser": {
++      "version": "1.2.1",
++      "resolved": "https://registry.npmjs.org/git-log-parser/-/git-log-parser-1.2.1.tgz",
++      "integrity": "sha512-PI+sPDvHXNPl5WNOErAK05s3j0lgwUzMN6o8cyQrDaKfT3qd7TmNJKeXX+SknI5I0QhG5fVPAEwSY4tRGDtYoQ==",
++      "dev": true,
++      "license": "MIT",
 +      "dependencies": {
-         "type-fest": "^0.20.2"
-       },
-       "engines": {
-         "node": ">=8"
-       },
-       "funding": {
-         "url": "https://github.com/sponsors/sindresorhus"
++        "argv-formatter": "~1.0.0",
++        "spawn-error-forwarder": "~1.0.0",
++        "split2": "~1.0.0",
++        "stream-combiner2": "~1.1.1",
++        "through2": "~2.0.0",
++        "traverse": "0.6.8"
 +      }
 +    },
-     "node_modules/globalthis": {
-       "version": "1.0.4",
-       "resolved": "https://registry.npmjs.org/globalthis/-/globalthis-1.0.4.tgz",
-       "integrity": "sha512-DpLKbNU4WylpxJykQujfCcwYWiV/Jhm50Goo0wrVILAv5jOr9d+H+UR3PhSCD2rCCEIg0uc+G+muBTwD54JhDQ==",
+     "node_modules/glob": {
+       "version": "7.1.6",
+       "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
+       "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
+       "deprecated": "Glob versions prior to v9 are no longer supported",
+       "license": "ISC",
        "dependencies": {
-         "define-properties": "^1.2.1",
-         "gopd": "^1.0.1"
+         "fs.realpath": "^1.0.0",
+         "inflight": "^1.0.4",
+         "inherits": "2",
+         "minimatch": "^3.0.4",
+         "once": "^1.3.0",
+         "path-is-absolute": "^1.0.0"
        },
        "engines": {
-         "node": ">= 0.4"
+         "node": "*"
        },
        "funding": {
-         "url": "https://github.com/sponsors/ljharb"
+         "url": "https://github.com/sponsors/isaacs"
        }
      },
-     "node_modules/globby": {
-       "version": "11.1.0",
-       "resolved": "https://registry.npmjs.org/globby/-/globby-11.1.0.tgz",
-       "integrity": "sha512-jhIXaOzy1sb8IyocaruWSn1TjmnBVs8Ayhcy83rmxNJ8q2uWKCAj3CnJY+KpGSXCueAPc0i05kVvVKtP1t9S3g==",
+     "node_modules/glob-parent": {
+       "version": "5.1.2",
+       "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
+       "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
+       "license": "ISC",
        "dependencies": {
-         "array-union": "^2.1.0",
-         "dir-glob": "^3.0.1",
-         "fast-glob": "^3.2.9",
-         "ignore": "^5.2.0",
-         "merge2": "^1.4.1",
-         "slash": "^3.0.0"
+         "is-glob": "^4.0.1"
        },
        "engines": {
-         "node": ">=10"
-       },
-       "funding": {
-         "url": "https://github.com/sponsors/sindresorhus"
+         "node": ">= 6"
        }
      },
      "node_modules/gopd": {
@@@ -10459,325 -3526,286 +3553,475 @@@
        "dev": true,
        "license": "MIT"
      },
-     "node_modules/next": {
-       "version": "16.0.0",
-       "resolved": "https://registry.npmjs.org/next/-/next-16.0.0.tgz",
-       "integrity": "sha512-nYohiNdxGu4OmBzggxy9rczmjIGI+TpR5vbKTsE1HqYwNm1B+YSiugSrFguX6omMOKnDHAmBPY4+8TNJk0Idyg==",
+     "node_modules/node-emoji": {
+       "version": "2.2.0",
+       "resolved": "https://registry.npmjs.org/node-emoji/-/node-emoji-2.2.0.tgz",
+       "integrity": "sha512-Z3lTE9pLaJF47NyMhd4ww1yFTAP8YhYI8SleJiHzM46Fgpm5cnNzSl9XfzFNqbaz+VlJrIj3fXQ4DeN1Rjm6cw==",
+       "dev": true,
+       "license": "MIT",
+       "dependencies": {
+         "@sindresorhus/is": "^4.6.0",
+         "char-regex": "^1.0.2",
+         "emojilib": "^2.4.0",
+         "skin-tone": "^2.0.0"
+       },
+       "engines": {
+         "node": ">=18"
+       }
+     },
+     "node_modules/nodemon": {
+       "version": "3.1.10",
+       "resolved": "https://registry.npmjs.org/nodemon/-/nodemon-3.1.10.tgz",
+       "integrity": "sha512-WDjw3pJ0/0jMFmyNDp3gvY2YizjLmmOUQo6DEBY+JgdvW/yQ9mEeSw6H5ythl5Ny2ytb7f9C2nI
```

### Migration notes

* Make sure to test the system thoroughly after the changes are made.
* Check for any minor issues or bugs that may have been introduced.
* Make sure to update any dependencies or packages that may have been affected by the changes.

### Test recommendations

* Run a thorough test of the system to ensure that all features and functionality are working as expected.
* Test the new features and functionality to ensure that they are working correctly.
* Test the system for any minor issues or bugs that may have been introduced.

### Final release note

"This release includes bug fixes, new features, and updates to the package-lock.json file."

### Full markdown explanation

#### Deep Commit Analysis

Commit Hash: 276014529e6cb611b3a07492803375cc6548c556
Date: 2025-10-31 06:42:08 +0000
Author: github-actions[bot]
Subject: 🔁 Auto-sync backend → main (resolved merge conflicts)

### Diff

```diff
commit 276014529e6cb611b3a07492803375cc6548c556
Merge: da41290 7fc223c
Author: github-actions[bot] <github-actions[bot]@users.noreply.github.com>
Date:   Fri Oct 31 06:42:08 2025 +0000

    🔁 Auto-sync backend → main (resolved merge conflicts)

diff --cc backend/CHANGELOG.md
index 0000000,6c8f52f..15a23be
mode 000000,100644..100644
--- a/backend/CHANGELOG.md
+++ b/backend/CHANGELOG.md
@@@ -1,0 -1,33 +1,35 @@@
 -# [1.1.0](https://github.com/dauntless-arcane/Competency-Mapping/compare/backend-v1.0.0...backend-v1.1.0) (2025-10-30)
++# [1.1.0](https://github.com/dauntless-arcane/Competency-Mapping/compare/frontend-v1.0.0...frontend-v1.1.0) (2025-10-30)
+ 
+ 
+ ### Bug Fixes
+ 
+ * /api/users/fetch-tests to added  level,duration,recommended ([e96d9f2](https://github.com/dauntless-arcane/Competency-Mapping/commit/e96d9f29787bea87b7fa4eee2a6d987282c8240b))
++* add --legacy-peer-deps flag to @semantic-release/release-notes-generator installation ([5e68f56](https://github.com/dauntless-arcane/Competency-Mapping/commit/5e68f56320f59b9217fa3cd81587e93e1de14606))
+ * mongodb_atlas_db_uri_with_credentials in file fixed ([87225b6](https://github.com/dauntless-arcane/Competency-Mapping/commit/87225b6b6518d36672ebc0564b67db0767991380))
+ * name not coming in /api/users/fetch-tests/ ([de68eb0](https://github.com/dauntless-arcane/Competency-Mapping/commit/de68eb0f3ce59991e048a7e7ab476abd9429bb31))
+ * regenerate package-lock.json with legacy peer deps ([0cee040](https://github.com/dauntless-arcane/Competency-Mapping/commit/0cee0408d03db76a38d59768c4a6de36195ce533))
+ * **result-generator:** add missing mongoose import and update survey response with scores ([b834907](https://github.com/dauntless-arcane/Competency-Mapping/commit/b83490712d63b9f81d6baec612d995cd602abb93))
+ * **result-generator:** add missing mongoose import and update survey response with scores ([0ce93c0](https://github.com/dauntless-arcane/Competency-Mapping/commit/0ce93c0d8e562a1e387d60e3efdf97c71c1d32db))
+ * standardize quotes in frontend release workflow ([6bedced](https://github.com/dauntless-arcane/Competency-Mapping/commit/6bedcedb04a3333f9aaa93533f7720058b7c9799))
+ * the result fetch giving null for all rrsponses ([674c0f7](https://github.com/dauntless-arcane/Competency-Mapping/commit/674c0f75467f8d2218280de6d0ff9cf1eb1890ae))
+ * wrong status code sent ([f8ad45f](https://github.com/dauntless-arcane/Competency-Mapping/commit/f8ad45ff70f6b0f0e5dc87f7725024287ab7476f))
+ 
+ 
+ ### Features
+ 
+ * add @semantic-release/changelog dependency to package.json and package-lock.json ([8791a32](https://github.com/dauntless-arcane/Competency-Mapping/commit/8791a3256b987f97a56f2700e1bdccc58a2f46b4))
+ * add @semantic-release/exec dependency to package.json and package-lock.json ([13fb67a](https://github.com/dauntless-arcane/Competency-Mapping/commit/13fb67ae10110ff0fce62482ffed5ba13a772852))
+ * added Login>js and fixed api for the user-survey ([907bb15](https://github.com/dauntless-arcane/Competency-Mapping/commit/907bb15b5920e72b2821a610ba8b2d09e6083117))
++* added the saving api for saving data of users to DB ([76076c7](https://github.com/dauntless-arcane/Competency-Mapping/commit/76076c7888702349d105dc7aafed1166571bbf8d))
+ * **api:** add categoryConstants support in test creation route ([67356d6](https://github.com/dauntless-arcane/Competency-Mapping/commit/67356d6f21c7d78adf33272b0baaa75afdc51c61))
+ * backend release automation file added ([08434f9](https://github.com/dauntless-arcane/Competency-Mapping/commit/08434f972dac95d69608f18bf9ed0a901639253f))
+ * **release:** add frontend release workflow configuration ([b0fdc65](https://github.com/dauntless-arcane/Competency-Mapping/commit/b0fdc6574c846a293d28ec901666477f538c0282))
+ * **release:** add frontend release workflow with semantic-release configuration ([41f1061](https://github.com/dauntless-arcane/Competency-Mapping/commit/41f1061b169dc12e7a43736ceddb779014b9ebb7))
+ * **survey:** Implement automatic result generation on submission ([5a455c3](https://github.com/dauntless-arcane/Competency-Mapping/commit/5a455c3ba4f0f7da60c2d444649992d76ba7ac55))
+ * **survey:** integrate framer-motion for smooth question transitions and update validation schema ([0f46ddd](https://github.com/dauntless-arcane/Competency-Mapping/commit/0f46ddd236580dc7542b48b414d0062efc029b2a))
+ * **watcher:** process pending survey responses and auto-generate results ([79f02ab](https://github.com/dauntless-arcane/Competency-Mapping/commit/79f02abf78ceb37c1b74db50a7a2235288e06d09))
+ 
+ 
+ ### BREAKING CHANGES
+ 
+ * **survey:** The payload for `POST /api/users/entry

---
### Commit Detail
### Deep Commit Analysis

**Commit Hash:** 58f16405da80786a64aa573286da8dc615d88bce
**Date:** 2025-10-31 07:20:59 +0000
**Author:** github-actions[bot]
**Subject:** Merge remote-tracking branch 'origin/backend'

### 1. High-level summary

This commit is a merge of the 'origin/backend' branch into the main branch. It likely includes changes made to the backend part of the system.

### 2. What changed (bullet points)

* Merged changes from the 'origin/backend' branch into the main branch.
* The exact changes are not specified in the commit message, but they likely include updates to backend code, such as API endpoints, database schema, or business logic.

### 3. Why it likely changed

The 'origin/backend' branch is likely a feature branch or a branch for a specific task, such as updating the backend API or fixing a bug. The changes were merged into the main branch to make them available to the rest of the system.

### 4. Impact on system

The impact of this commit is likely to be significant, as it includes changes to the backend part of the system. This may affect the functionality of the system, its performance, or its security.

### 5. Possible risks

* The merge may introduce new bugs or break existing functionality.
* The changes may not be thoroughly tested, which could lead to issues in production.
* The merge may introduce dependencies on new libraries or frameworks, which could affect the system's stability.

### 6. Migration notes (if needed)

No migration notes are provided in this commit, as it is a simple merge of a branch.

### 7. Test recommendations

* Thoroughly test the system to ensure that the changes did not introduce new bugs or break existing functionality.
* Verify that the changes meet the required specifications and standards.
* Test the system's performance and security to ensure that the changes did not introduce any issues.

### 8. Final release note (1 line)

"Merge of backend changes into main branch."

### 9. Full markdown explanation

#### Merge of Backend Changes

This commit is a merge of the 'origin/backend' branch into the main branch. The 'origin/backend' branch is likely a feature branch or a branch for a specific task, such as updating the backend API or fixing a bug.

#### Changes

* Merged changes from the 'origin/backend' branch into the main branch.
* The exact changes are not specified in the commit message, but they likely include updates to backend code, such as API endpoints, database schema, or business logic.

#### Impact

The impact of this commit is likely to be significant, as it includes changes to the backend part of the system. This may affect the functionality of the system, its performance, or its security.

#### Risks

* The merge may introduce new bugs or break existing functionality.
* The changes may not be thoroughly tested, which could lead to issues in production.
* The merge may introduce dependencies on new libraries or frameworks, which could affect the system's stability.

#### Testing

* Thoroughly test the system to ensure that the changes did not introduce new bugs or break existing functionality.
* Verify that the changes meet the required specifications and standards.
* Test the system's performance and security to ensure that the changes did not introduce any issues.

#### Release Note

"Merge of backend changes into main branch."

---
### Commit Detail
### Deep Commit Analysis

#### High-Level Summary
The commit `ab3fd533f22cd111f3a02b1d383b0e0a6aad6f44` made by Pratyush comments out workflow steps in the backend release configuration.

#### What Changed
- The `name` field in the `Sync backend → main` job was commented out.
- The `on`, `permissions`, `jobs`, and `steps` sections were also commented out, effectively disabling the entire workflow.

#### Why it Likely Changed
The commit likely changed because the workflow was no longer needed or was causing issues, and the author wanted to temporarily disable it to prevent further conflicts or errors.

#### Impact on System
Disabling the workflow will prevent the automatic syncing of the backend into the main branch, which may cause delays in updating the main branch with the latest changes from the backend.

#### Possible Risks
- The main branch may not be up-to-date with the latest changes from the backend.
- The workflow may be re-enabled in the future, causing conflicts or errors if the code has changed significantly.

#### Migration Notes
- If the workflow is re-enabled, the code may need to be updated to handle any changes that occurred while the workflow was disabled.
- The `git fetch`, `git checkout`, and `git merge` commands may need to be updated to handle any changes to the repository structure or branch names.

#### Test Recommendations
- Test the workflow after re-enabling it to ensure that it is working as expected.
- Verify that the main branch is up-to-date with the latest changes from the backend.

#### Final Release Note
"Backend release configuration workflow temporarily disabled to prevent conflicts."

#### Full Markdown Explanation
Here is a full markdown explanation of the changes made in this commit:

**Commit:** `ab3fd533f22cd111f3a02b1d383b0e0a6aad6f44`
**Author:** Pratyush
**Date:** 2025-11-05 16:51:51 +0530
**Subject:** chore: comment out workflow steps in backend release configuration

**Changes:**

* Commented out the `name` field in the `Sync backend → main` job.
* Commented out the `on`, `permissions`, `jobs`, and `steps` sections, effectively disabling the entire workflow.

**Why:**

The workflow was likely disabled because it was no longer needed or was causing issues, and the author wanted to temporarily prevent further conflicts or errors.

**Impact:**

Disabling the workflow will prevent the automatic syncing of the backend into the main branch, which may cause delays in updating the main branch with the latest changes from the backend.

**Risks:**

* The main branch may not be up-to-date with the latest changes from the backend.
* The workflow may be re-enabled in the future, causing conflicts or errors if the code has changed significantly.

**Migration Notes:**

* If the workflow is re-enabled, the code may need to be updated to handle any changes that occurred while the workflow was disabled.
* The `git fetch`, `git checkout`, and `git merge` commands may need to be updated to handle any changes to the repository structure or branch names.

**Test Recommendations:**

* Test the workflow after re-enabling it to ensure that it is working as expected.
* Verify that the main branch is up-to-date with the latest changes from the backend.

**Final Release Note:**

"Backend release configuration workflow temporarily disabled to prevent conflicts."

---
### Commit Detail
### Deep Commit Analysis

**Commit Hash:** 5ce641620cd9fe85df748133790309404792a619
**Date:** 2025-11-05 11:25:27 +0000
**Author:** github-actions[bot]
**Subject:** Merge remote-tracking branch 'origin/backend'

### 1. High-level summary

This commit merges the 'backend' branch from the 'origin' remote-tracking branch into the current branch.

### 2. What changed

- Merged changes from the 'backend' branch into the current branch.

### 3. Why it likely changed

This commit likely changed to incorporate updates from the 'backend' branch, which may include bug fixes, new features, or improvements.

### 4. Impact on system

The impact of this commit on the system is likely to be minimal, as it is a merge operation. However, the actual impact depends on the changes merged from the 'backend' branch.

### 5. Possible risks

Possible risks associated with this commit include:

- Merge conflicts: If there were conflicts between the changes from the 'backend' branch and the current branch, they may need to be resolved manually.
- Breaking changes: If the changes from the 'backend' branch introduce breaking changes, they may affect the functionality of the system.

### 6. Migration notes (if needed)

No specific migration notes are required for this commit, as it is a merge operation.

### 7. Test recommendations

Recommendations for testing this commit include:

- Verify that the merge was successful and did not introduce any conflicts.
- Test the functionality of the system to ensure that it still works as expected.
- Run automated tests to catch any regressions introduced by the merge.

### 8. Final release note (1 line)

"Merge from 'origin/backend' branch to incorporate updates and bug fixes."

### 9. Full markdown explanation

#### Deep Commit Analysis

**Commit Hash:** 5ce641620cd9fe85df748133790309404792a619
**Date:** 2025-11-05 11:25:27 +0000
**Author:** github-actions[bot]
**Subject:** Merge remote-tracking branch 'origin/backend'

### 1. High-level summary

This commit merges the 'backend' branch from the 'origin' remote-tracking branch into the current branch.

### 2. What changed

- Merged changes from the 'backend' branch into the current branch.

### 3. Why it likely changed

This commit likely changed to incorporate updates from the 'backend' branch, which may include bug fixes, new features, or improvements.

### 4. Impact on system

The impact of this commit on the system is likely to be minimal, as it is a merge operation. However, the actual impact depends on the changes merged from the 'backend' branch.

### 5. Possible risks

Possible risks associated with this commit include:

- Merge conflicts: If there were conflicts between the changes from the 'backend' branch and the current branch, they may need to be resolved manually.
- Breaking changes: If the changes from the 'backend' branch introduce breaking changes, they may affect the functionality of the system.

### 6. Migration notes (if needed)

No specific migration notes are required for this commit, as it is a merge operation.

### 7. Test recommendations

Recommendations for testing this commit include:

- Verify that the merge was successful and did not introduce any conflicts.
- Test the functionality of the system to ensure that it still works as expected.
- Run automated tests to catch any regressions introduced by the merge.

### 8. Final release note (1 line)

"Merge from 'origin/backend' branch to incorporate updates and bug fixes."

### Full Explanation

This commit is a merge operation from the 'backend' branch to the current branch. The 'backend' branch likely contains updates, bug fixes, or new features that need to be incorporated into the current branch. The impact of this commit on the system is likely to be minimal, but it's essential to test the functionality of the system to ensure that it still works as expected.

To verify the success of the merge, it's recommended to run automated tests and manually test the functionality of the system. If any conflicts or breaking changes are introduced, they need to be resolved manually.

In conclusion, this commit is a routine merge operation that incorporates updates from the 'backend' branch into the current branch. It's essential to test the system thoroughly to ensure that it works as expected and to catch any regressions introduced by the merge.

---
### Commit Detail
### Deep Commit Analysis

**Commit Hash:** 187fae09531c39c9ed18ccc9d20e846aeee2c51c
**Date:** 2025-11-05 16:56:49 +0530
**Author:** Pratyush
**Subject:** feat(workflow): update backend release workflow to generate version tags and create GitHub releases

### High-level summary

This commit updates the backend release workflow to automatically generate version tags and create GitHub releases.

### What changed (bullet points)

* Renamed the workflow from "Sync frontend → main" to "Backend Auto Release"
* Changed the trigger branch from "frontend" to "backend"
* Removed the "Merge frontend into main" step
* Added a new step to generate a new backend version tag
* Added a new step to create a GitHub release using the `actions/create-release` action
* Updated the version tag generation to use a custom format "backend-vX.Y.Z"
* Added an output to store the generated tag name

### Why it likely changed

This change likely occurred to improve the automation of the backend release process, allowing it to run independently of the frontend workflow. The new workflow generates version tags and creates GitHub releases based on the backend branch pushes, making it easier to manage and track releases.

### Impact on system

This change will impact the following:

* The backend release process will now be automated and run independently of the frontend workflow
* Version tags will be generated using a custom format "backend-vX.Y.Z"
* GitHub releases will be created automatically using the `actions/create-release` action

### Possible risks

* The automated release process may introduce new errors or conflicts
* The custom version tag format may not be compatible with all tools or systems
* The GitHub release creation process may fail or produce unexpected results

### Migration notes (if needed)

* This change requires no migration steps, as it is an update to an existing workflow
* However, it is recommended to review and test the new workflow to ensure it works as expected

### Test recommendations

* Test the new workflow by pushing changes to the backend branch
* Verify that the version tag is generated correctly and the GitHub release is created successfully
* Test the workflow with different scenarios, such as conflicts or errors

### Final release note (1 line)

"Updated backend release workflow to automatically generate version tags and create GitHub releases."

### Full markdown explanation

**Updated Backend Release Workflow**

This commit updates the backend release workflow to automatically generate version tags and create GitHub releases.

### Changes

* Renamed the workflow from "Sync frontend → main" to "Backend Auto Release"
* Changed the trigger branch from "frontend" to "backend"
* Removed the "Merge frontend into main" step
* Added a new step to generate a new backend version tag
* Added a new step to create a GitHub release using the `actions/create-release` action
* Updated the version tag generation to use a custom format "backend-vX.Y.Z"
* Added an output to store the generated tag name

### Impact

This change will impact the following:

* The backend release process will now be automated and run independently of the frontend workflow
* Version tags will be generated using a custom format "backend-vX.Y.Z"
* GitHub releases will be created automatically using the `actions/create-release` action

### Risks

* The automated release process may introduce new errors or conflicts
* The custom version tag format may not be compatible with all tools or systems
* The GitHub release creation process may fail or produce unexpected results

### Migration Notes

* This change requires no migration steps, as it is an update to an existing workflow
* However, it is recommended to review and test the new workflow to ensure it works as expected

### Test Recommendations

* Test the new workflow by pushing changes to the backend branch
* Verify that the version tag is generated correctly and the GitHub release is created successfully
* Test the workflow with different scenarios, such as conflicts or errors

### Final Release Note

"Updated backend release workflow to automatically generate version tags and create GitHub releases."

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary

This commit updates the frontend release workflow in GitHub Actions to create version tags and GitHub releases for the frontend branch.

#### 2. What changed (bullet points)

* Updated the workflow name from "Backend Auto Release" to "Frontend Auto Release"
* Changed the branch trigger from "backend" to "frontend"
* Updated the job name from "Generate new backend version tag" to "Generate new frontend version tag"
* Updated the tag name pattern from "backend-v*" to "frontend-v*"
* Updated the release name and body to reflect the frontend release

#### 3. Why it likely changed

This change likely occurred because the frontend and backend branches have separate release workflows and versioning schemes. The update ensures that the frontend branch is properly tagged and released.

#### 4. Impact on system

This change will impact the automation of frontend releases, ensuring that new releases are created and tagged correctly. It will also change the naming conventions for frontend releases.

#### 5. Possible risks

* If the versioning scheme is not properly updated, it may lead to version conflicts or inconsistencies between the frontend and backend branches.
* If the GitHub Actions workflow is not properly configured, it may lead to failed releases or other issues.

#### 6. Migration notes (if needed)

* Update the versioning scheme to reflect the new frontend versioning pattern.
* Ensure that the GitHub Actions workflow is properly configured and tested.

#### 7. Test recommendations

* Test the new frontend release workflow to ensure that it creates and tags new releases correctly.
* Test the versioning scheme to ensure that it is properly updated and consistent.

#### 8. Final release note (1 line)

"Updated frontend release workflow to create version tags and GitHub releases."

#### 9. Full markdown explanation

### Deep Commit Analysis

#### Commit Details

* Commit Hash: 58f7e0f031206a8abe38ece779d161cbdca6e575
* Date: 2025-11-05 16:58:49 +0530
* Author: Pratyush
* Subject: feat(workflow): update frontend release workflow for version tagging and GitHub release creation

### Diff

```diff
commit 58f7e0f031206a8abe38ece779d161cbdca6e575
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Wed Nov 5 16:58:49 2025 +0530

    feat(workflow): update frontend release workflow for version tagging and GitHub release creation

diff --git a/.github/workflows/frontend-release.yml b/.github/workflows/frontend-release.yml
index e1a5595..e8c9567 100644
--- a/.github/workflows/frontend-release.yml
+++ b/.github/workflows/frontend-release.yml
@@ -1,9 +1,9 @@
-name: Backend Auto Release
+name: Frontend Auto Release
 
 on:
   push:
     branches:
-      - backend
+      - frontend
 
 permissions:
   contents: write
@@ -24,23 +24,23 @@ jobs:
           git config user.name "github-actions[bot]"
           git config user.email "github-actions[bot]@users.noreply.github.com"
 
-      - name: Generate new backend version tag
+      - name: Generate new frontend version tag
         id: tag
         run: |
-          echo "🏷️ Generating new backend version tag"
+          echo "🏷️ Generating new frontend version tag"
           git fetch --tags
-          latest_tag=$(git describe --tags --abbrev=0 --match "backend-v*" 2>/dev/null || echo "backend-v0.0.0")
+          latest_tag=$(git describe --tags --abbrev=0 --match "frontend-v*" 2>/dev/null || echo "frontend-v0.0.0")
 
           # Parse version numbers
-          version=${latest_tag#backend-v}
+          version=${latest_tag#frontend-v}
           major=$(echo $version | cut -d. -f1)
           minor=$(echo $version | cut -d. -f2)
           patch=$(echo $version | cut -d. -f3)
           new_patch=$((patch + 1))
-          new_tag="backend-v${major}.${minor}.${new_patch}"
+          new_tag="frontend-v${major}.${minor}.${new_patch}"
 
           echo "➡️ New tag: $new_tag"
-          git tag -a "$new_tag" -m "🔖 Auto backend release: $new_tag"
+          git tag -a "$new_tag" -m "🔖 Auto frontend release: $new_tag"
           git push origin "$new_tag"
           echo "tag=$new_tag" >> $GITHUB_OUTPUT
 
@@ -50,6 +50,6 @@ jobs:
           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
         with:
           tag_name: ${{ steps.tag.outputs.tag }}
-          release_name: "🚀 Backend Release ${{ steps.tag.outputs.tag }}"
+          release_name: "🚀 Frontend Release ${{ steps.tag.outputs.tag }}"
           body: |
-            Automated backend release created from backend branch push.
+            Automated frontend release created from frontend branch push.
```

### Analysis

This commit updates the frontend release workflow in GitHub Actions to create version tags and GitHub releases for the frontend branch. The changes include updating the workflow name, branch trigger, job name, tag name pattern, and release name and body to reflect the frontend release.

### Impact

This change will impact the automation of frontend releases, ensuring that new releases are created and tagged correctly. It will also change the naming conventions for frontend releases.

### Risks

* If the versioning scheme is not properly updated, it may lead to version conflicts or inconsistencies between the frontend and backend branches.
* If the GitHub Actions workflow is not properly configured, it may lead to failed releases or other issues.

### Migration Notes

* Update the versioning scheme to reflect the new frontend versioning pattern.
* Ensure that the GitHub Actions workflow is properly configured and tested.

### Test Recommendations

* Test the new frontend release workflow to ensure that it creates and tags new releases correctly.
* Test the versioning scheme to ensure that it is properly updated and consistent.

### Final Release Note

Updated frontend release workflow to create version tags and GitHub releases.

---
### Commit Detail
### Deep Commit Analysis

**Commit Hash:** 58f7e0f031206a8abe38ece779d161cbdca6e575
**Date:** 2025-11-05 16:58:49 +0530
**Author:** Pratyush
**Subject:** feat(workflow): update frontend release workflow for version tagging and GitHub release creation

### High-level Summary

This commit updates the frontend release workflow in GitHub Actions to generate version tags and create GitHub releases for the frontend branch.

### What Changed

* Renamed the workflow from "Backend Auto Release" to "Frontend Auto Release"
* Changed the branch that triggers the workflow from "backend" to "frontend"
* Updated the job to generate a new frontend version tag instead of a backend version tag
* Updated the job to create a GitHub release for the frontend version tag instead of a backend release

### Why it Likely Changed

The change likely occurred to reflect the switch from a backend-focused workflow to a frontend-focused workflow. This could be due to changes in the project's architecture or requirements.

### Impact on System

The change will affect how version tags are generated and GitHub releases are created for the frontend branch. This could impact how developers and users track and interact with the frontend codebase.

### Possible Risks

* The change may break existing automation or scripts that relied on the previous workflow
* The new workflow may not be thoroughly tested, potentially leading to issues or errors
* The change may introduce new security vulnerabilities or exposures if not properly reviewed

### Migration Notes (if needed)

* Review and update any scripts or automation that relied on the previous workflow
* Test the new workflow thoroughly to ensure it works as expected
* Verify that the new workflow does not introduce any security vulnerabilities or exposures

### Test Recommendations

* Test the new workflow with a sample frontend branch push
* Verify that the workflow generates the correct version tag and creates a GitHub release
* Test the workflow with different scenarios, such as multiple branch pushes or failed builds

### Final Release Note

"Updated frontend release workflow to generate version tags and create GitHub releases for the frontend branch."

### Full Markdown Explanation

**feat(workflow): update frontend release workflow for version tagging and GitHub release creation**

This commit updates the frontend release workflow in GitHub Actions to generate version tags and create GitHub releases for the frontend branch.

**Changes**

* Renamed the workflow from "Backend Auto Release" to "Frontend Auto Release"
* Changed the branch that triggers the workflow from "backend" to "frontend"
* Updated the job to generate a new frontend version tag instead of a backend version tag
* Updated the job to create a GitHub release for the frontend version tag instead of a backend release

**Why**

The change likely occurred to reflect the switch from a backend-focused workflow to a frontend-focused workflow. This could be due to changes in the project's architecture or requirements.

**Impact**

The change will affect how version tags are generated and GitHub releases are created for the frontend branch. This could impact how developers and users track and interact with the frontend codebase.

**Risks**

* The change may break existing automation or scripts that relied on the previous workflow
* The new workflow may not be thoroughly tested, potentially leading to issues or errors
* The change may introduce new security vulnerabilities or exposures if not properly reviewed

**Migration Notes**

* Review and update any scripts or automation that relied on the previous workflow
* Test the new workflow thoroughly to ensure it works as expected
* Verify that the new workflow does not introduce any security vulnerabilities or exposures

**Test Recommendations**

* Test the new workflow with a sample frontend branch push
* Verify that the workflow generates the correct version tag and creates a GitHub release
* Test the workflow with different scenarios, such as multiple branch pushes or failed builds

**Final Release Note**

"Updated frontend release workflow to generate version tags and create GitHub releases for the frontend branch."

