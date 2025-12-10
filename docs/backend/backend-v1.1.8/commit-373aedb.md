### High-level summary
This commit represents a major release of the Competency-Mapping backend, version 1.1.0. The changes include bug fixes, new features, and breaking changes. The release is automated using Semantic Release.

### What changed

**Bug Fixes:**

* /api/users/fetch-tests to added level, duration, recommended
* mongodb_atlas_db_uri_with_credentials in file fixed
* name not coming in /api/users/fetch-tests/
* regenerate package-lock.json with legacy peer deps
* result-generator: add missing mongoose import and update survey response with scores
* result-generator: add missing mongoose import and update survey response with scores
* standardize quotes in frontend release workflow
* the result fetch giving null for all responses
* wrong status code sent

**Features:**

* add @semantic-release/changelog dependency to package.json and package-lock.json
* add @semantic-release/exec dependency to package.json and package-lock.json
* added Login.js and fixed api for the user-survey
* api: add categoryConstants support in test creation route
* backend release automation file added
* release: add frontend release workflow configuration
* release: add frontend release workflow with semantic-release configuration
* survey: Implement automatic result generation on submission
* survey: integrate framer-motion for smooth question transitions and update validation schema
* watcher: process pending survey responses and auto-generate results

**Breaking Changes:**

* survey: The payload for POST /api/users/entry has changed. The ans field is no longer a generic object and must now be an array of objects, each with a questionId (string) and value (number).

### Why it likely changed
The changes in this release are likely due to a combination of factors, including:

* Bug fixes: The team has identified and fixed several bugs that were causing issues in the system.
* New features: The team has added new features to improve the functionality and user experience of the system.
* Breaking changes: The team has made changes to the API or data structures that may break existing integrations or workflows.

### Impact on system
The changes in this release will likely have the following impact on the system:

* Improved functionality and user experience
* Fixed bugs and issues
* New features and capabilities
* Potential breaking changes for existing integrations or workflows

### Possible risks
The following risks are possible:

* Breaking changes may cause issues for existing integrations or workflows
* New features may introduce new bugs or issues
* The team may have missed some bugs or issues in the testing process

### Migration notes (if needed)
To migrate to this release, follow these steps:

* Update the package.json and package-lock.json files to include the new dependencies
* Update the backend release automation file to use the new release workflow
* Update the frontend release workflow configuration to use the new release workflow
* Update the survey API to use the new payload format
* Test the system thoroughly to ensure that all integrations and workflows are working correctly

### Test recommendations
To test this release, follow these recommendations:

* Run a thorough regression test suite to ensure that all bugs and issues are fixed
* Test the new features and capabilities to ensure that they are working correctly
* Test the breaking changes to ensure that they are working correctly and do not cause issues for existing integrations or workflows

### Final release note
"Released Competency-Mapping backend version 1.1.0 with bug fixes, new features, and breaking changes."

### Full markdown explanation
**Release Note: Competency-Mapping Backend Version 1.1.0**

Released on October 30, 2025

### Changes

#### Bug Fixes

* /api/users/fetch-tests to added level, duration, recommended
* mongodb_atlas_db_uri_with_credentials in file fixed
* name not coming in /api/users/fetch-tests/
* regenerate package-lock.json with legacy peer deps
* result-generator: add missing mongoose import and update survey response with scores
* result-generator: add missing mongoose import and update survey response with scores
* standardize quotes in frontend release workflow
* the result fetch giving null for all responses
* wrong status code sent

#### Features

* add @semantic-release/changelog dependency to package.json and package-lock.json
* add @semantic-release/exec dependency to package.json and package-lock.json
* added Login.js and fixed api for the user-survey
* api: add categoryConstants support in test creation route
* backend release automation file added
* release: add frontend release workflow configuration
* release: add frontend release workflow with semantic-release configuration
* survey: Implement automatic result generation on submission
* survey: integrate framer-motion for smooth question transitions and update validation schema
* watcher: process pending survey responses and auto-generate results

#### Breaking Changes

* survey: The payload for POST /api/users/entry has changed. The ans field is no longer a generic object and must now be an array of objects, each with a questionId (string) and value (number).

### Impact

The changes in this release will likely have the following impact on the system:

* Improved functionality and user experience
* Fixed bugs and issues
* New features and capabilities
* Potential breaking changes for existing integrations or workflows

### Risks

The following risks are possible:

* Breaking changes may cause issues for existing integrations or workflows
* New features may introduce new bugs or issues
* The team may have missed some bugs or issues in the testing process

### Migration Notes

To migrate to this release, follow these steps:

* Update the package.json and package-lock.json files to include the new dependencies
* Update the backend release automation file to use the new release workflow
* Update the frontend release workflow configuration to use the new release workflow
* Update the survey API to use the new payload format
* Test the system thoroughly to ensure that all integrations and workflows are working correctly

### Test Recommendations

To test this release, follow these recommendations:

* Run a thorough regression test suite to ensure that all bugs and issues are fixed
* Test the new features and capabilities to ensure that they are working correctly
* Test the breaking changes to ensure that they are working correctly and do not cause issues for existing integrations or workflows

### Final Release Note

Released Competency-Mapping backend version 1.1.0 with bug fixes, new features, and breaking changes.