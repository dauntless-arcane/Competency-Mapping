### High-level summary

The commit `de3cc571ab035a798f7346c920f116f70ddde682` represents a major release of the Competency Mapping application, version 1.1.0. This release includes various bug fixes, new features, and breaking changes. The changes are primarily related to the frontend and backend infrastructure, with a focus on improving the user experience and functionality of the application.

### What changed

* **Bug Fixes:**
	+ Fixed issues with the `/api/users/fetch-tests` endpoint, including adding level, duration, and recommended fields.
	+ Added the `--legacy-peer-deps` flag to the `@semantic-release/release-notes-generator` installation.
	+ Fixed the `mongodb_atlas_db_uri_with_credentials` in a file.
	+ Resolved issues with the `/api/users/fetch-tests/` endpoint, including name not being displayed.
	+ Regenerated `package-lock.json` with legacy peer dependencies.
	+ Added missing mongoose imports and updated survey responses with scores in the result generator.
	+ Standardized quotes in the frontend release workflow.
	+ Resolved issues with result fetch giving null responses.
	+ Fixed wrong status code being sent.
* **Features:**
	+ Added `@semantic-release/changelog` and `@semantic-release/exec` dependencies to `package.json` and `package-lock.json`.
	+ Added a login.js file and fixed the API for the user survey.
	+ Added a saving API for saving user data to the database.
	+ Added categoryConstants support in the test creation route.
	+ Added a backend release automation file.
	+ Implemented automatic result generation on survey submission.
	+ Integrated framer-motion for smooth question transitions and updated the validation schema.
	+ Processed pending survey responses and auto-generated results.
* **Breaking Changes:**
	+ The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

### Why it likely changed

The changes in this release are likely due to the need to improve the application's functionality, user experience, and infrastructure. The bug fixes and features added in this release suggest that the development team is actively working to resolve issues and enhance the application's capabilities. The breaking changes, on the other hand, may have been introduced to improve the application's architecture or to align with new requirements or standards.

### Impact on system

The changes in this release are likely to have a significant impact on the system, particularly in terms of the user experience and functionality. The bug fixes and features added in this release may improve the application's performance, reliability, and usability. However, the breaking changes may require updates to existing code or workflows, which could potentially disrupt the system's operation.

### Possible risks

The breaking changes introduced in this release may pose a risk to the system's operation, particularly if existing code or workflows are not updated to accommodate the changes. Additionally, the introduction of new features and dependencies may introduce new risks, such as security vulnerabilities or performance issues.

### Migration notes (if needed)

To migrate to this release, users may need to update their code or workflows to accommodate the breaking changes. This may involve updating existing APIs, workflows, or dependencies to align with the new requirements or standards.

### Test recommendations

To ensure a smooth transition to this release, it is recommended to thoroughly test the application's functionality and user experience. This may involve testing the application's APIs, workflows, and dependencies to ensure that they are working as expected.

### Final release note (1 line)

The Competency Mapping application has been updated to version 1.1.0, with various bug fixes, new features, and breaking changes.

### Full markdown explanation

**Competency Mapping Application Release Notes**

**Version 1.1.0**

The Competency Mapping application has been updated to version 1.1.0, with various bug fixes, new features, and breaking changes.

**Bug Fixes**

* Fixed issues with the `/api/users/fetch-tests` endpoint, including adding level, duration, and recommended fields.
* Added the `--legacy-peer-deps` flag to the `@semantic-release/release-notes-generator` installation.
* Fixed the `mongodb_atlas_db_uri_with_credentials` in a file.
* Resolved issues with the `/api/users/fetch-tests/` endpoint, including name not being displayed.
* Regenerated `package-lock.json` with legacy peer dependencies.
* Added missing mongoose imports and updated survey responses with scores in the result generator.
* Standardized quotes in the frontend release workflow.
* Resolved issues with result fetch giving null responses.
* Fixed wrong status code being sent.

**Features**

* Added `@semantic-release/changelog` and `@semantic-release/exec` dependencies to `package.json` and `package-lock.json`.
* Added a login.js file and fixed the API for the user survey.
* Added a saving API for saving user data to the database.
* Added categoryConstants support in the test creation route.
* Added a backend release automation file.
* Implemented automatic result generation on survey submission.
* Integrated framer-motion for smooth question transitions and updated the validation schema.
* Processed pending survey responses and auto-generated results.

**Breaking Changes**

* The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).