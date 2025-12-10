### Commit Analysis

#### 1. High-level summary

This commit is a release of version 1.1.0 of the Competency Mapping project. It includes various bug fixes, new features, and breaking changes.

#### 2. What changed

* Bug Fixes:
	+ Fixed `/api/users/fetch-tests` to include `level`, `duration`, and `recommended` fields.
	+ Fixed `mongodb_atlas_db_uri_with_credentials` in a file.
	+ Fixed `name` not being returned in `/api/users/fetch-tests/`.
	+ Regenerated `package-lock.json` with legacy peer dependencies.
	+ Added missing mongoose import and updated survey response with scores in the `result-generator`.
	+ Standardized quotes in the frontend release workflow.
	+ Fixed result fetch giving null for all responses.
	+ Fixed wrong status code sent.
* Features:
	+ Added `@semantic-release/changelog` and `@semantic-release/exec` dependencies to `package.json` and `package-lock.json`.
	+ Added login.js and fixed API for user survey.
	+ Added categoryConstants support in test creation route.
	+ Added backend release automation file.
	+ Added frontend release workflow configuration.
	+ Added frontend release workflow with semantic-release configuration.
	+ Implemented automatic result generation on submission.
	+ Integrated framer-motion for smooth question transitions and updated validation schema.
	+ Processed pending survey responses and auto-generated results.
* Breaking Changes:
	+ The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

#### 3. Why it likely changed

The changes in this commit are likely due to the addition of new features and the fixing of bugs that were reported by users. The breaking change is likely due to the need to improve the security and stability of the system.

#### 4. Impact on system

The changes in this commit will likely have a positive impact on the system by fixing bugs and adding new features. However, the breaking change may require users to update their code to accommodate the new payload format for `POST /api/users/entry`.

#### 5. Possible risks

The breaking change may cause issues for users who have not updated their code to accommodate the new payload format. This may lead to errors or unexpected behavior.

#### 6. Migration notes (if needed)

To migrate to the new payload format, users should update their code to expect an array of objects with `questionId` and `value` properties in the `ans` field of the `POST /api/users/entry` request.

#### 7. Test recommendations

Users should test their code to ensure that it is working correctly with the new payload format.

#### 8. Final release note (1 line)

Version 1.1.0 of the Competency Mapping project is now available, with various bug fixes, new features, and a breaking change to the payload format for `POST /api/users/entry`.

#### 9. Full markdown explanation

### Commit Analysis

#### High-level summary

This commit is a release of version 1.1.0 of the Competency Mapping project. It includes various bug fixes, new features, and breaking changes.

#### What changed

* Bug Fixes:
	+ Fixed `/api/users/fetch-tests` to include `level`, `duration`, and `recommended` fields.
	+ Fixed `mongodb_atlas_db_uri_with_credentials` in a file.
	+ Fixed `name` not being returned in `/api/users/fetch-tests/`.
	+ Regenerated `package-lock.json` with legacy peer dependencies.
	+ Added missing mongoose import and updated survey response with scores in the `result-generator`.
	+ Standardized quotes in the frontend release workflow.
	+ Fixed result fetch giving null for all responses.
	+ Fixed wrong status code sent.
* Features:
	+ Added `@semantic-release/changelog` and `@semantic-release/exec` dependencies to `package.json` and `package-lock.json`.
	+ Added login.js and fixed API for user survey.
	+ Added categoryConstants support in test creation route.
	+ Added backend release automation file.
	+ Added frontend release workflow configuration.
	+ Added frontend release workflow with semantic-release configuration.
	+ Implemented automatic result generation on submission.
	+ Integrated framer-motion for smooth question transitions and updated validation schema.
	+ Processed pending survey responses and auto-generated results.
* Breaking Changes:
	+ The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

#### Why it likely changed

The changes in this commit are likely due to the addition of new features and the fixing of bugs that were reported by users. The breaking change is likely due to the need to improve the security and stability of the system.

#### Impact on system

The changes in this commit will likely have a positive impact on the system by fixing bugs and adding new features. However, the breaking change may require users to update their code to accommodate the new payload format for `POST /api/users/entry`.

#### Possible risks

The breaking change may cause issues for users who have not updated their code to accommodate the new payload format. This may lead to errors or unexpected behavior.

#### Migration notes (if needed)

To migrate to the new payload format, users should update their code to expect an array of objects with `questionId` and `value` properties in the `ans` field of the `POST /api/users/entry` request.

#### Test recommendations

Users should test their code to ensure that it is working correctly with the new payload format.

#### Final release note (1 line)

Version 1.1.0 of the Competency Mapping project is now available, with various bug fixes, new features, and a breaking change to the payload format for `POST /api/users/entry`.