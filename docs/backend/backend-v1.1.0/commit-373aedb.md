### Deep Commit Analysis

**High-level summary:**

This commit is a release of version 1.1.0 of the Competency Mapping backend. It includes various bug fixes, new features, and breaking changes.

**What changed:**

* Bug Fixes:
	+ Added level, duration, and recommended fields to the /api/users/fetch-tests endpoint.
	+ Fixed the mongodb_atlas_db_uri_with_credentials in a file.
	+ Fixed the name not coming in /api/users/fetch-tests/.
	+ Regenerated package-lock.json with legacy peer deps.
	+ Added missing mongoose import and updated survey response with scores in the result-generator.
	+ Standardized quotes in the frontend release workflow.
	+ Fixed the result fetch giving null for all responses.
	+ Sent the correct status code.
* Features:
	+ Added @semantic-release/changelog and @semantic-release/exec dependencies to package.json and package-lock.json.
	+ Added Login.js and fixed the API for the user-survey.
	+ Added categoryConstants support in the test creation route.
	+ Added a backend release automation file.
	+ Added a frontend release workflow configuration.
	+ Added a frontend release workflow with semantic-release configuration.
	+ Implemented automatic result generation on submission.
	+ Integrated framer-motion for smooth question transitions and updated the validation schema.
	+ Processed pending survey responses and auto-generated results.
* Breaking Changes:
	+ The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

**Why it likely changed:**

This release likely changed due to the addition of new features, bug fixes, and breaking changes. The changes were made to improve the functionality and stability of the Competency Mapping backend.

**Impact on system:**

The changes in this release will likely have a significant impact on the system. The new features and bug fixes will improve the functionality and stability of the backend, while the breaking changes may require updates to the frontend or other components that interact with the backend.

**Possible risks:**

There are possible risks associated with this release, including:

* Breaking changes may cause issues with the frontend or other components that interact with the backend.
* New features may introduce new bugs or issues.
* The addition of new dependencies may introduce security vulnerabilities.

**Migration notes (if needed):**

To migrate to this release, you will need to update your frontend or other components that interact with the backend to accommodate the breaking changes. This may involve updating the payload for `POST /api/users/entry` to conform to the new format.

**Test recommendations:**

To ensure a smooth migration, it is recommended to thoroughly test the backend and frontend after updating to this release. This should include testing the new features, bug fixes, and breaking changes.

**Final release note:**

"Competency Mapping backend version 1.1.0 released with new features, bug fixes, and breaking changes."

**Full markdown explanation:**

### Competency Mapping Backend Release 1.1.0

#### High-level summary

This release includes various bug fixes, new features, and breaking changes to the Competency Mapping backend.

#### What changed

### Bug Fixes

* Added level, duration, and recommended fields to the /api/users/fetch-tests endpoint.
* Fixed the mongodb_atlas_db_uri_with_credentials in a file.
* Fixed the name not coming in /api/users/fetch-tests/.
* Regenerated package-lock.json with legacy peer deps.
* Added missing mongoose import and updated survey response with scores in the result-generator.
* Standardized quotes in the frontend release workflow.
* Fixed the result fetch giving null for all responses.
* Sent the correct status code.

### Features

* Added @semantic-release/changelog and @semantic-release/exec dependencies to package.json and package-lock.json.
* Added Login.js and fixed the API for the user-survey.
* Added categoryConstants support in the test creation route.
* Added a backend release automation file.
* Added a frontend release workflow configuration.
* Added a frontend release workflow with semantic-release configuration.
* Implemented automatic result generation on submission.
* Integrated framer-motion for smooth question transitions and updated the validation schema.
* Processed pending survey responses and auto-generated results.

### Breaking Changes

* The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

#### Why it likely changed

This release likely changed due to the addition of new features, bug fixes, and breaking changes. The changes were made to improve the functionality and stability of the Competency Mapping backend.

#### Impact on system

The changes in this release will likely have a significant impact on the system. The new features and bug fixes will improve the functionality and stability of the backend, while the breaking changes may require updates to the frontend or other components that interact with the backend.

#### Possible risks

There are possible risks associated with this release, including:

* Breaking changes may cause issues with the frontend or other components that interact with the backend.
* New features may introduce new bugs or issues.
* The addition of new dependencies may introduce security vulnerabilities.

#### Migration notes (if needed)

To migrate to this release, you will need to update your frontend or other components that interact with the backend to accommodate the breaking changes. This may involve updating the payload for `POST /api/users/entry` to conform to the new format.

#### Test recommendations

To ensure a smooth migration, it is recommended to thoroughly test the backend and frontend after updating to this release. This should include testing the new features, bug fixes, and breaking changes.

#### Final release note

"Competency Mapping backend version 1.1.0 released with new features, bug fixes, and breaking changes."