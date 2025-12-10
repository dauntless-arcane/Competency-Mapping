### High-level summary

This commit represents a version update to 1.1.0 of the Competency Mapping backend. It includes several bug fixes, new features, and breaking changes.

### What changed

* Bug Fixes:
	+ Added level, duration, and recommended fields to the /api/users/fetch-tests endpoint.
	+ Fixed the mongodb_atlas_db_uri_with_credentials in a file.
	+ Resolved an issue where the name was not being retrieved in the /api/users/fetch-tests/ endpoint.
	+ Regenerated the package-lock.json file with legacy peer dependencies.
	+ Added missing mongoose imports and updated survey responses with scores in the result-generator.
	+ Standardized quotes in the frontend release workflow.
	+ Resolved an issue where the result fetch was returning null for all responses.
	+ Sent the correct status code in a previous commit.
* Features:
	+ Added the @semantic-release/changelog dependency to package.json and package-lock.json.
	+ Added the @semantic-release/exec dependency to package.json and package-lock.json.
	+ Added a Login.js file and fixed the API for the user-survey.
	+ Added categoryConstants support in the test creation route.
	+ Added a backend release automation file.
	+ Configured the frontend release workflow.
	+ Integrated framer-motion for smooth question transitions and updated the validation schema.
	+ Processed pending survey responses and auto-generated results.
* Breaking Changes:
	+ The payload for POST /api/users/entry has changed. The 'ans' field is no longer a generic object and must now be an array of objects, each with a 'questionId' (string) and 'value' (number).

### Why it likely changed

This commit likely changed due to the introduction of new features and bug fixes. The breaking changes may have been introduced to improve the functionality of the system or to align it with industry standards.

### Impact on system

The changes in this commit are likely to improve the functionality and stability of the system. However, the breaking changes may require updates to the client-side code to accommodate the new payload format for the POST /api/users/entry endpoint.

### Possible risks

The breaking changes may cause issues with existing clients that do not support the new payload format. This may require additional testing and validation to ensure that the system functions as expected.

### Migration notes

To migrate to this version, clients will need to update their code to accommodate the new payload format for the POST /api/users/entry endpoint. This may involve updating the client-side code to parse the new format correctly.

### Test recommendations

To ensure that the system functions as expected, it is recommended to perform thorough testing of the new features and bug fixes. This should include testing the breaking changes to ensure that they do not cause any issues with existing clients.

### Final release note

"Competency Mapping backend updated to version 1.1.0 with several bug fixes, new features, and breaking changes."

### Full markdown explanation

**Competency Mapping Backend Update to Version 1.1.0**

The Competency Mapping backend has been updated to version 1.1.0, introducing several bug fixes, new features, and breaking changes.

**Bug Fixes**

* Added level, duration, and recommended fields to the /api/users/fetch-tests endpoint.
* Fixed the mongodb_atlas_db_uri_with_credentials in a file.
* Resolved an issue where the name was not being retrieved in the /api/users/fetch-tests/ endpoint.
* Regenerated the package-lock.json file with legacy peer dependencies.
* Added missing mongoose imports and updated survey responses with scores in the result-generator.
* Standardized quotes in the frontend release workflow.
* Resolved an issue where the result fetch was returning null for all responses.
* Sent the correct status code in a previous commit.

**Features**

* Added the @semantic-release/changelog dependency to package.json and package-lock.json.
* Added the @semantic-release/exec dependency to package.json and package-lock.json.
* Added a Login.js file and fixed the API for the user-survey.
* Added categoryConstants support in the test creation route.
* Added a backend release automation file.
* Configured the frontend release workflow.
* Integrated framer-motion for smooth question transitions and updated the validation schema.
* Processed pending survey responses and auto-generated results.

**Breaking Changes**

* The payload for POST /api/users/entry has changed. The 'ans' field is no longer a generic object and must now be an array of objects, each with a 'questionId' (string) and 'value' (number).

**Migration Notes**

To migrate to this version, clients will need to update their code to accommodate the new payload format for the POST /api/users/entry endpoint. This may involve updating the client-side code to parse the new format correctly.

**Test Recommendations**

To ensure that the system functions as expected, it is recommended to perform thorough testing of the new features and bug fixes. This should include testing the breaking changes to ensure that they do not cause any issues with existing clients.