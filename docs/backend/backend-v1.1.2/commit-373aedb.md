### High-level summary

This release (1.1.0) is a maintenance update to the Competency Mapping backend. It includes a variety of bug fixes, new features, and a breaking change to the survey API.

### What changed

* **Bug Fixes:**
	+ /api/users/fetch-tests to added level, duration, recommended
	+ mongodb_atlas_db_uri_with_credentials in file fixed
	+ name not coming in /api/users/fetch-tests/
	+ regenerate package-lock.json with legacy peer deps
	+ **result-generator:** add missing mongoose import and update survey response with scores
	+ standardize quotes in frontend release workflow
	+ the result fetch giving null for all responses
	+ wrong status code sent
* **Features:**
	+ add @semantic-release/changelog dependency to package.json and package-lock.json
	+ add @semantic-release/exec dependency to package.json and package-lock.json
	+ added Login.js and fixed api for the user-survey
	+ **api:** add categoryConstants support in test creation route
	+ backend release automation file added
	+ **release:** add frontend release workflow configuration
	+ **release:** add frontend release workflow with semantic-release configuration
	+ **survey:** Implement automatic result generation on submission
	+ **survey:** integrate framer-motion for smooth question transitions and update validation schema
	+ **watcher:** process pending survey responses and auto-generate results
* **Breaking Changes:**
	+ **survey:** The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

### Why it likely changed

The changes in this release are likely due to a combination of bug fixes and feature additions. The bug fixes were probably made to address issues that were discovered during testing or usage of the system. The feature additions were likely made to improve the functionality or usability of the system.

### Impact on system

The impact of this release on the system will depend on the specific changes made. However, in general, bug fixes will improve the stability and reliability of the system, while feature additions will provide new functionality or improve existing functionality.

### Possible risks

The possible risks associated with this release are:

* **Breaking changes:** The change to the survey API may cause issues for users who are relying on the previous API. This may require additional testing or updates to their code.
* **Bug fixes:** While bug fixes are generally a good thing, they can also introduce new issues if they are not thoroughly tested.
* **Feature additions:** New features can introduce new issues or require additional testing to ensure that they work as expected.

### Migration notes (if needed)

To migrate to this release, users will need to update their code to accommodate the breaking change to the survey API. This may involve updating the payload for `POST /api/users/entry` to use an array of objects instead of a generic object.

### Test recommendations

To ensure that the changes in this release do not introduce any new issues, it is recommended to thoroughly test the system before deploying it to production.

### Final release note

This release includes a variety of bug fixes and new features, as well as a breaking change to the survey API. Users are advised to update their code to accommodate the breaking change and to thoroughly test the system before deploying it to production.

### Full markdown explanation

#### Release 1.1.0

This release includes a variety of bug fixes and new features, as well as a breaking change to the survey API.

#### Bug Fixes

* /api/users/fetch-tests to added level, duration, recommended
* mongodb_atlas_db_uri_with_credentials in file fixed
* name not coming in /api/users/fetch-tests/
* regenerate package-lock.json with legacy peer deps
* **result-generator:** add missing mongoose import and update survey response with scores
* standardize quotes in frontend release workflow
* the result fetch giving null for all responses
* wrong status code sent

#### Features

* add @semantic-release/changelog dependency to package.json and package-lock.json
* add @semantic-release/exec dependency to package.json and package-lock.json
* added Login.js and fixed api for the user-survey
* **api:** add categoryConstants support in test creation route
* backend release automation file added
* **release:** add frontend release workflow configuration
* **release:** add frontend release workflow with semantic-release configuration
* **survey:** Implement automatic result generation on submission
* **survey:** integrate framer-motion for smooth question transitions and update validation schema
* **watcher:** process pending survey responses and auto-generate results

#### Breaking Changes

* **survey:** The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

#### Migration Notes

To migrate to this release, users will need to update their code to accommodate the breaking change to the survey API. This may involve updating the payload for `POST /api/users/entry` to use an array of objects instead of a generic object.

#### Test Recommendations

To ensure that the changes in this release do not introduce any new issues, it is recommended to thoroughly test the system before deploying it to production.