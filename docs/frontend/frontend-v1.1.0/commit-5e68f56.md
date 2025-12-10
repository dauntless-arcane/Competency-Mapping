### High-level summary

This commit adds the `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the frontend release workflow on GitHub Actions.

### What changed (bullet points)

* Added the `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the frontend release workflow.
* Updated the `frontend-release.yml` file in the `.github/workflows` directory.

### Why it likely changed

The `--legacy-peer-deps` flag is used to allow the installation of packages with peer dependencies that are not compatible with the current version of Node.js. This change likely occurred to resolve an issue where the `@semantic-release/release-notes-generator` package was not installing correctly due to peer dependency conflicts.

### Impact on system

This change will affect the installation of the `@semantic-release/release-notes-generator` package in the frontend release workflow. It will allow the package to be installed with its peer dependencies, even if they are not compatible with the current version of Node.js.

### Possible risks

* If the `--legacy-peer-deps` flag is not properly configured, it may lead to issues with package installation or compatibility.
* This change may introduce new dependencies or versions that were not previously installed, which could lead to issues with the frontend release workflow.

### Migration notes (if needed)

* This change is specific to the frontend release workflow and will not affect other workflows or systems.
* If you are using a different version of Node.js or a different package manager, you may need to adjust the `--legacy-peer-deps` flag accordingly.

### Test recommendations

* Test the frontend release workflow with the updated `frontend-release.yml` file to ensure that the `@semantic-release/release-notes-generator` package is installed correctly.
* Verify that the package is functioning as expected and that there are no issues with its peer dependencies.

### Final release note (1 line)

Added `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation to resolve peer dependency conflicts.

### Full markdown explanation

#### Deep Commit Analysis

Commit Hash: 5e68f56320f59b9217fa3cd81587e93e1de14606
Date: 2025-10-30 21:05:53 +0530
Author: Pratyush
Subject: fix: add --legacy-peer-deps flag to @semantic-release/release-notes-generator installation

#### What changed

* Added the `--legacy-peer-deps` flag to the installation of `@semantic-release/release-notes-generator` in the frontend release workflow.
* Updated the `frontend-release.yml` file in the `.github/workflows` directory.

#### Why it changed

The `--legacy-peer-deps` flag is used to allow the installation of packages with peer dependencies that are not compatible with the current version of Node.js. This change likely occurred to resolve an issue where the `@semantic-release/release-notes-generator` package was not installing correctly due to peer dependency conflicts.

#### Impact on system

This change will affect the installation of the `@semantic-release/release-notes-generator` package in the frontend release workflow. It will allow the package to be installed with its peer dependencies, even if they are not compatible with the current version of Node.js.

#### Possible risks

* If the `--legacy-peer-deps` flag is not properly configured, it may lead to issues with package installation or compatibility.
* This change may introduce new dependencies or versions that were not previously installed, which could lead to issues with the frontend release workflow.

#### Migration notes

* This change is specific to the frontend release workflow and will not affect other workflows or systems.
* If you are using a different version of Node.js or a different package manager, you may need to adjust the `--legacy-peer-deps` flag accordingly.

#### Test recommendations

* Test the frontend release workflow with the updated `frontend-release.yml` file to ensure that the `@semantic-release/release-notes-generator` package is installed correctly.
* Verify that the package is functioning as expected and that there are no issues with its peer dependencies.

#### Final release note

Added `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation to resolve peer dependency conflicts.