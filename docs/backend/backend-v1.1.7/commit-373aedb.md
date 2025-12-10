### High-level summary

This is a release commit for version 1.1.0 of the Competency Mapping backend. The commit includes various bug fixes, new features, and breaking changes.

### What changed

* **Bug Fixes:**
	+ Fixed issues with the `/api/users/fetch-tests` endpoint.
	+ Resolved issues with the `mongodb_atlas_db_uri_with_credentials` file.
	+ Fixed issues with the `name` field not being displayed in the `/api/users/fetch-tests` endpoint.
	+ Regenerated `package-lock.json` with legacy peer dependencies.
	+ Added missing mongoose imports and updated survey responses with scores in the `result-generator`.
	+ Standardized quotes in the frontend release workflow.
	+ Resolved issues with result fetching and wrong status codes.
* **Features:**
	+ Added `@semantic-release/changelog` and `@semantic-release/exec` dependencies to `package.json` and `package-lock.json`.
	+ Added a login.js file and fixed the API for user surveys.
	+ Added category constants support in the test creation route.
	+ Added a backend release automation file.
	+ Added a frontend release workflow configuration.
	+ Added a frontend release workflow with semantic-release configuration.
	+ Implemented automatic result generation on survey submission.
	+ Integrated framer-motion for smooth question transitions and updated the validation schema.
	+ Processed pending survey responses and auto-generated results.
* **Breaking Changes:**
	+ The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

### Why it likely changed

The changes in this commit are likely due to a combination of factors, including:

* Bug fixes and feature additions to improve the stability and functionality of the Competency Mapping backend.
* Updates to the frontend release workflow to improve the automation and efficiency of the release process.
* Changes to the backend architecture to support new features and improve performance.

### Impact on system

The changes in this commit will likely have a significant impact on the Competency Mapping system, including:

* Improved stability and functionality of the backend.
* Enhanced automation and efficiency of the release process.
* Support for new features and improved performance.

### Possible risks

The changes in this commit may introduce the following risks:

* Compatibility issues with existing integrations or dependencies.
* Performance impacts due to changes in the backend architecture.
* Unexpected behavior due to changes in the frontend release workflow.

### Migration notes

To migrate to this release, the following steps should be taken:

* Update the `package.json` and `package-lock.json` files to reflect the new dependencies.
* Update the frontend release workflow configuration to reflect the changes.
* Update the backend architecture to support the new features and improvements.
* Test the system thoroughly to ensure compatibility and performance.

### Test recommendations

The following tests should be performed to ensure the system is functioning correctly:

* Unit tests to verify the functionality of individual components.
* Integration tests to verify the interactions between components.
* System tests to verify the overall behavior of the system.
* Regression tests to verify the system's behavior after changes.

### Final release note

"Competency Mapping backend version 1.1.0 released with various bug fixes, new features, and breaking changes."

### Full markdown explanation

Here is the full markdown explanation of the release notes:

**Release Notes for Competency Mapping Backend 1.1.0**

This release includes various bug fixes, new features, and breaking changes to the Competency Mapping backend.

### Bug Fixes

The following bug fixes were included in this release:

* Fixed issues with the `/api/users/fetch-tests` endpoint.
* Resolved issues with the `mongodb_atlas_db_uri_with_credentials` file.
* Fixed issues with the `name` field not being displayed in the `/api/users/fetch-tests` endpoint.
* Regenerated `package-lock.json` with legacy peer dependencies.
* Added missing mongoose imports and updated survey responses with scores in the `result-generator`.
* Standardized quotes in the frontend release workflow.
* Resolved issues with result fetching and wrong status codes.

### Features

The following features were included in this release:

* Added `@semantic-release/changelog` and `@semantic-release/exec` dependencies to `package.json` and `package-lock.json`.
* Added a login.js file and fixed the API for user surveys.
* Added category constants support in the test creation route.
* Added a backend release automation file.
* Added a frontend release workflow configuration.
* Added a frontend release workflow with semantic-release configuration.
* Implemented automatic result generation on survey submission.
* Integrated framer-motion for smooth question transitions and updated the validation schema.
* Processed pending survey responses and auto-generated results.

### Breaking Changes

The following breaking changes were included in this release:

* The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

### Migration Notes

To migrate to this release, the following steps should be taken:

* Update the `package.json` and `package-lock.json` files to reflect the new dependencies.
* Update the frontend release workflow configuration to reflect the changes.
* Update the backend architecture to support the new features and improvements.
* Test the system thoroughly to ensure compatibility and performance.

### Test Recommendations

The following tests should be performed to ensure the system is functioning correctly:

* Unit tests to verify the functionality of individual components.
* Integration tests to verify the interactions between components.
* System tests to verify the overall behavior of the system.
* Regression tests to verify the system's behavior after changes.

### Final Release Note

Competency Mapping backend version 1.1.0 released with various bug fixes, new features, and breaking changes.