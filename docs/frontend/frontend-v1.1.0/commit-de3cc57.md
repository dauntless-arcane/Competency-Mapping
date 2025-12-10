### High-level summary

This commit represents a release of version 1.1.0 of the Competency Mapping project. It includes various bug fixes, new features, and breaking changes.

### What changed

#### Bug Fixes:

* Fixed issues with the `/api/users/fetch-tests` endpoint, including adding `level`, `duration`, and `recommended` fields.
* Added the `--legacy-peer-deps` flag to the `@semantic-release/release-notes-generator` installation.
* Fixed a MongoDB Atlas DB URI with credentials issue.
* Addressed a problem where the user's name was not being fetched from the `/api/users/fetch-tests` endpoint.
* Regenerated `package-lock.json` with legacy peer dependencies.
* Fixed issues with the result generator, including adding missing Mongoose imports and updating survey responses with scores.
* Standardized quotes in the frontend release workflow.
* Fixed issues with result fetching, including null responses.
* Fixed a problem where the wrong status code was being sent.

#### Features:

* Added the `@semantic-release/changelog` dependency to `package.json` and `package-lock.json`.
* Added the `@semantic-release/exec` dependency to `package.json` and `package-lock.json`.
* Added the `Login.js` file and fixed the API for user surveys.
* Added the saving API for saving user data to the DB.
* Added category constants support in the test creation route.
* Added the backend release automation file.
* Added the frontend release workflow configuration.
* Added the frontend release workflow with Semantic Release configuration.
* Implemented automatic result generation on survey submission.
* Integrated Framer Motion for smooth question transitions and updated the validation schema.
* Processed pending survey responses and auto-generated results.

#### Breaking Changes:

* The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

### Why it likely changed

The changes in this commit likely occurred due to a combination of factors, including:

* Bug fixes: The developers identified and fixed various issues with the code, including problems with data fetching and result generation.
* Feature additions: The team added new features, such as automatic result generation and Framer Motion integration, to enhance the user experience.
* Breaking changes: The payload for `POST /api/users/entry` was modified to improve data consistency and security.

### Impact on system

The changes in this commit will likely have a significant impact on the system, including:

* Improved data consistency and accuracy
* Enhanced user experience through new features and bug fixes
* Potential disruptions to existing integrations or workflows due to breaking changes

### Possible risks

The following risks are associated with this commit:

* Integration issues: The breaking changes may cause issues with existing integrations or workflows.
* Data loss: The changes may result in data loss or corruption if not implemented correctly.
* Performance issues: The new features and bug fixes may impact system performance.

### Migration notes (if needed)

To migrate to this version, follow these steps:

1. Update the `@semantic-release/changelog` and `@semantic-release/exec` dependencies in `package.json` and `package-lock.json`.
2. Update the `Login.js` file and fix the API for user surveys.
3. Update the saving API for saving user data to the DB.
4. Update the category constants support in the test creation route.
5. Update the backend release automation file.
6. Update the frontend release workflow configuration.
7. Update the frontend release workflow with Semantic Release configuration.
8. Update the payload for `POST /api/users/entry` to match the new format.

### Test recommendations

To ensure a smooth migration, perform the following tests:

1. Verify that the data is being fetched correctly from the `/api/users/fetch-tests` endpoint.
2. Test the result generator and ensure that it is producing accurate results.
3. Verify that the new features, such as automatic result generation and Framer Motion integration, are working as expected.
4. Test the breaking changes and ensure that they are not causing any issues with existing integrations or workflows.

### Final release note

"Competency Mapping version 1.1.0 released, featuring bug fixes, new features, and breaking changes."

### Full markdown explanation

**Competency Mapping Release Notes**

**Version 1.1.0**

**Release Date:** 2025-10-30

**Summary:**

This release includes various bug fixes, new features, and breaking changes. The changes aim to improve data consistency and accuracy, enhance the user experience, and address existing issues.

**Changes:**

### Bug Fixes:

* Fixed issues with the `/api/users/fetch-tests` endpoint, including adding `level`, `duration`, and `recommended` fields.
* Added the `--legacy-peer-deps` flag to the `@semantic-release/release-notes-generator` installation.
* Fixed a MongoDB Atlas DB URI with credentials issue.
* Addressed a problem where the user's name was not being fetched from the `/api/users/fetch-tests` endpoint.
* Regenerated `package-lock.json` with legacy peer dependencies.
* Fixed issues with the result generator, including adding missing Mongoose imports and updating survey responses with scores.
* Standardized quotes in the frontend release workflow.
* Fixed issues with result fetching, including null responses.
* Fixed a problem where the wrong status code was being sent.

### Features:

* Added the `@semantic-release/changelog` dependency to `package.json` and `package-lock.json`.
* Added the `@semantic-release/exec` dependency to `package.json` and `package-lock.json`.
* Added the `Login.js` file and fixed the API for user surveys.
* Added the saving API for saving user data to the DB.
* Added category constants support in the test creation route.
* Added the backend release automation file.
* Added the frontend release workflow configuration.
* Added the frontend release workflow with Semantic Release configuration.
* Implemented automatic result generation on survey submission.
* Integrated Framer Motion for smooth question transitions and updated the validation schema.
* Processed pending survey responses and auto-generated results.

### Breaking Changes:

* The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

**Risks:**

* Integration issues: The breaking changes may cause issues with existing integrations or workflows.
* Data loss: The changes may result in data loss or corruption if not implemented correctly.
* Performance issues: The new features and bug fixes may impact system performance.

**Migration Notes:**

To migrate to this version, follow these steps:

1. Update the `@semantic-release/changelog` and `@semantic-release/exec` dependencies in `package.json` and `package-lock.json`.
2. Update the `Login.js` file and fix the API for user surveys.
3. Update the saving API for saving user data to the DB.
4. Update the category constants support in the test creation route.
5. Update the backend release automation file.
6. Update the frontend release workflow configuration.
7. Update the frontend release workflow with Semantic Release configuration.
8. Update the payload for `POST /api/users/entry` to match the new format.

**Test Recommendations:**

To ensure a smooth migration, perform the following tests:

1. Verify that the data is being fetched correctly from the `/api/users/fetch-tests` endpoint.
2. Test the result generator and ensure that it is producing accurate results.
3. Verify that the new features, such as automatic result generation and Framer Motion integration, are working as expected.
4. Test the breaking changes and ensure that they are not causing any issues with existing integrations or workflows.

**Final Release Note:**

"Competency Mapping version 1.1.0 released, featuring bug fixes, new features, and breaking changes."