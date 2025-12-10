### High-level summary

The commit `de3cc571ab035a798f7346c920f116f70ddde682` represents a release of version 1.1.0 of the Competency Mapping project. This release includes various bug fixes, new features, and breaking changes.

### What changed

#### Bug Fixes

* `/api/users/fetch-tests` to added `level`, `duration`, `recommended`
* Added `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation
* Fixed `mongodb_atlas_db_uri_with_credentials` in file
* Name not coming in `/api/users/fetch-tests/`
* Regenerated `package-lock.json` with legacy peer deps
* Added missing mongoose import and updated survey response with scores in `result-generator`
* Standardized quotes in frontend release workflow
* Result fetch giving null for all responses
* Wrong status code sent

#### Features

* Added `@semantic-release/changelog` dependency to `package.json` and `package-lock.json`
* Added `@semantic-release/exec` dependency to `package.json` and `package-lock.json`
* Added login functionality and fixed API for user survey
* Added saving API for saving data of users to DB
* Added categoryConstants support in test creation route
* Added backend release automation file
* Added frontend release workflow configuration
* Implemented automatic result generation on submission
* Integrated framer-motion for smooth question transitions and updated validation schema
* Processed pending survey responses and auto-generated results

#### Breaking Changes

* The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

### Why it likely changed

The changes in this release likely occurred due to the addition of new features, bug fixes, and the implementation of automatic result generation on submission. The breaking change in the payload for `POST /api/users/entry` suggests that the API has been updated to accommodate the new feature.

### Impact on system

The changes in this release will likely have a positive impact on the system, as they address various bugs and add new features. However, the breaking change in the API payload may require updates to any external systems that interact with the API.

### Possible risks

The possible risks associated with this release include:

* Incompatibility issues with external systems that interact with the API
* Potential errors in the automatic result generation feature
* Issues with the framer-motion integration

### Migration notes (if needed)

To migrate to this release, users will need to update their API calls to accommodate the new payload format for `POST /api/users/entry`. Additionally, users may need to update their external systems to ensure compatibility with the new features and bug fixes.

### Test recommendations

To ensure the stability and functionality of the system, it is recommended to perform thorough testing of the new features and bug fixes. This should include:

* Testing the automatic result generation feature
* Verifying the compatibility of external systems with the new API payload format
* Testing the framer-motion integration

### Final release note

This release includes various bug fixes, new features, and breaking changes that improve the stability and functionality of the Competency Mapping project.

### Full markdown explanation

**Release Notes: Competency Mapping 1.1.0**

**High-level summary**

The commit `de3cc571ab035a798f7346c920f116f70ddde682` represents a release of version 1.1.0 of the Competency Mapping project. This release includes various bug fixes, new features, and breaking changes.

**What changed**

#### Bug Fixes

* `/api/users/fetch-tests` to added `level`, `duration`, `recommended`
* Added `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation
* Fixed `mongodb_atlas_db_uri_with_credentials` in file
* Name not coming in `/api/users/fetch-tests/`
* Regenerated `package-lock.json` with legacy peer deps
* Added missing mongoose import and updated survey response with scores in `result-generator`
* Standardized quotes in frontend release workflow
* Result fetch giving null for all responses
* Wrong status code sent

#### Features

* Added `@semantic-release/changelog` dependency to `package.json` and `package-lock.json`
* Added `@semantic-release/exec` dependency to `package.json` and `package-lock.json`
* Added login functionality and fixed API for user survey
* Added saving API for saving data of users to DB
* Added categoryConstants support in test creation route
* Added backend release automation file
* Added frontend release workflow configuration
* Implemented automatic result generation on submission
* Integrated framer-motion for smooth question transitions and updated validation schema
* Processed pending survey responses and auto-generated results

#### Breaking Changes

* The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

**Why it likely changed**

The changes in this release likely occurred due to the addition of new features, bug fixes, and the implementation of automatic result generation on submission. The breaking change in the payload for `POST /api/users/entry` suggests that the API has been updated to accommodate the new feature.

**Impact on system**

The changes in this release will likely have a positive impact on the system, as they address various bugs and add new features. However, the breaking change in the API payload may require updates to any external systems that interact with the API.

**Possible risks**

The possible risks associated with this release include:

* Incompatibility issues with external systems that interact with the API
* Potential errors in the automatic result generation feature
* Issues with the framer-motion integration

**Migration notes (if needed)**

To migrate to this release, users will need to update their API calls to accommodate the new payload format for `POST /api/users/entry`. Additionally, users may need to update their external systems to ensure compatibility with the new features and bug fixes.

**Test recommendations**

To ensure the stability and functionality of the system, it is recommended to perform thorough testing of the new features and bug fixes. This should include:

* Testing the automatic result generation feature
* Verifying the compatibility of external systems with the new API payload format
* Testing the framer-motion integration

**Final release note**

This release includes various bug fixes, new features, and breaking changes that improve the stability and functionality of the Competency Mapping project.