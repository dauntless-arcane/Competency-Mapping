### High-level summary

This release (1.1.0) includes a range of bug fixes, new features, and breaking changes. The primary focus of this release appears to be the enhancement of the user survey feature, including automatic result generation and smoother question transitions. Additionally, there are changes to the backend release automation and the addition of new dependencies for semantic-release.

### What changed

* **Bug Fixes:**
	+ /api/users/fetch-tests to added level, duration, recommended
	+ add --legacy-peer-deps flag to @semantic-release/release-notes-generator installation
	+ mongodb_atlas_db_uri_with_credentials in file fixed
	+ name not coming in /api/users/fetch-tests/
	+ regenerate package-lock.json with legacy peer deps
	+ **result-generator:** add missing mongoose import and update survey response with scores
	+ **result-generator:** add missing mongoose import and update survey response with scores
	+ standardize quotes in frontend release workflow
	+ the result fetch giving null for all rrsponses
	+ wrong status code sent
* **Features:**
	+ add @semantic-release/changelog dependency to package.json and package-lock.json
	+ add @semantic-release/exec dependency to package.json and package-lock.json
	+ added Login.js and fixed api for the user-survey
	+ added the saving api for saving data of users to DB
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

This release likely changed due to the implementation of new features, bug fixes, and the enhancement of the user survey feature. The addition of new dependencies for semantic-release suggests that the project is adopting a more robust and automated release process.

### Impact on system

This release will likely have a positive impact on the system by:

* Fixing bugs and improving the overall stability of the application
* Enhancing the user survey feature with automatic result generation and smoother question transitions
* Improving the release process with the addition of semantic-release dependencies

However, there may be some potential risks and challenges associated with this release, such as:

* The breaking change to the payload for `POST /api/users/entry` may require changes to existing code that interacts with this endpoint
* The addition of new dependencies may introduce new dependencies and potential conflicts

### Possible risks

* The breaking change to the payload for `POST /api/users/entry` may require changes to existing code that interacts with this endpoint
* The addition of new dependencies may introduce new dependencies and potential conflicts
* The implementation of new features and bug fixes may introduce new bugs or issues

### Migration notes (if needed)

* Update the payload for `POST /api/users/entry` to match the new format (array of objects with questionId and value properties)
* Review and update existing code that interacts with the `POST /api/users/entry` endpoint
* Review and update the dependencies in the package.json file to ensure compatibility with the new semantic-release dependencies

### Test recommendations

* Test the user survey feature with automatic result generation and smoother question transitions
* Test the release process with the new semantic-release dependencies
* Test the `POST /api/users/entry` endpoint with the new payload format

### Final release note (1 line)

This release (1.1.0) includes bug fixes, new features, and breaking changes to the user survey feature.

### Full markdown explanation

#### Release 1.1.0

This release includes a range of bug fixes, new features, and breaking changes. The primary focus of this release appears to be the enhancement of the user survey feature, including automatic result generation and smoother question transitions.

#### Bug Fixes

* /api/users/fetch-tests to added level, duration, recommended
* add --legacy-peer-deps flag to @semantic-release/release-notes-generator installation
* mongodb_atlas_db_uri_with_credentials in file fixed
* name not coming in /api/users/fetch-tests/
* regenerate package-lock.json with legacy peer deps
* **result-generator:** add missing mongoose import and update survey response with scores
* **result-generator:** add missing mongoose import and update survey response with scores
* standardize quotes in frontend release workflow
* the result fetch giving null for all rrsponses
* wrong status code sent

#### Features

* add @semantic-release/changelog dependency to package.json and package-lock.json
* add @semantic-release/exec dependency to package.json and package-lock.json
* added Login.js and fixed api for the user-survey
* added the saving api for saving data of users to DB
* **api:** add categoryConstants support in test creation route
* backend release automation file added
* **release:** add frontend release workflow configuration
* **release:** add frontend release workflow with semantic-release configuration
* **survey:** Implement automatic result generation on submission
* **survey:** integrate framer-motion for smooth question transitions and update validation schema
* **watcher:** process pending survey responses and auto-generate results

#### Breaking Changes

* **survey:** The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

#### Impact

This release will likely have a positive impact on the system by:

* Fixing bugs and improving the overall stability of the application
* Enhancing the user survey feature with automatic result generation and smoother question transitions
* Improving the release process with the addition of semantic-release dependencies

However, there may be some potential risks and challenges associated with this release, such as:

* The breaking change to the payload for `POST /api/users/entry` may require changes to existing code that interacts with this endpoint
* The addition of new dependencies may introduce new dependencies and potential conflicts

#### Migration Notes

* Update the payload for `POST /api/users/entry` to match the new format (array of objects with questionId and value properties)
* Review and update existing code that interacts with the `POST /api/users/entry` endpoint
* Review and update the dependencies in the package.json file to ensure compatibility with the new semantic-release dependencies

#### Test Recommendations

* Test the user survey feature with automatic result generation and smoother question transitions
* Test the release process with the new semantic-release dependencies
* Test the `POST /api/users/entry` endpoint with the new payload format

#### Final Release Note

This release (1.1.0) includes bug fixes, new features, and breaking changes to the user survey feature.