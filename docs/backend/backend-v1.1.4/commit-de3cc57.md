### High-level summary

This release (1.1.0) is a significant update to the Competency Mapping system, introducing several bug fixes, new features, and breaking changes. The release includes improvements to the user survey, result generation, and backend automation, as well as the addition of new dependencies and configuration files.

### What changed

* **Bug Fixes:**
	+ Fixed issues with `/api/users/fetch-tests` endpoint
	+ Added `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation
	+ Fixed `mongodb_atlas_db_uri_with_credentials` in file
	+ Fixed issue with `name` not coming in `/api/users/fetch-tests/`
	+ Regenerated `package-lock.json` with legacy peer deps
	+ Fixed issues with result fetch and status code sent
* **Features:**
	+ Added `@semantic-release/changelog` and `@semantic-release/exec` dependencies
	+ Implemented automatic result generation on survey submission
	+ Integrated framer-motion for smooth question transitions and updated validation schema
	+ Added support for categoryConstants in test creation route
	+ Added backend release automation file
	+ Added frontend release workflow configuration
* **Breaking Changes:**
	+ The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

### Why it likely changed

The changes in this release are likely due to a combination of factors, including:

* Bug fixes and improvements to existing functionality
* Addition of new features and dependencies to enhance the system's capabilities
* Breaking changes to align with new requirements or best practices

### Impact on system

The changes in this release will likely have the following impact on the system:

* Improved user experience with fixed bugs and new features
* Enhanced system capabilities with added dependencies and configuration files
* Potential breaking changes that may require updates to dependent systems or code

### Possible risks

The following risks are associated with this release:

* Potential issues with backward compatibility due to breaking changes
* Dependence on new dependencies and configuration files
* Potential security risks if not properly configured or updated

### Migration notes

To migrate to this release, follow these steps:

1. Update dependencies and configuration files as needed
2. Review and update code to accommodate breaking changes
3. Test thoroughly to ensure compatibility and functionality

### Test recommendations

To ensure a smooth transition to this release, perform the following tests:

1. Unit testing to verify individual components and functions
2. Integration testing to verify interactions between components and systems
3. End-to-end testing to verify overall system functionality and user experience

### Final release note

"Release 1.1.0 introduces significant improvements to the Competency Mapping system, including bug fixes, new features, and breaking changes. Please review and update code accordingly to ensure a smooth transition."

### Full markdown explanation

**Release 1.1.0**

**Summary**

This release is a significant update to the Competency Mapping system, introducing several bug fixes, new features, and breaking changes. The release includes improvements to the user survey, result generation, and backend automation, as well as the addition of new dependencies and configuration files.

**Bug Fixes**

* Fixed issues with `/api/users/fetch-tests` endpoint
* Added `--legacy-peer-deps` flag to `@semantic-release/release-notes-generator` installation
* Fixed `mongodb_atlas_db_uri_with_credentials` in file
* Fixed issue with `name` not coming in `/api/users/fetch-tests/`
* Regenerated `package-lock.json` with legacy peer deps
* Fixed issues with result fetch and status code sent

**Features**

* Added `@semantic-release/changelog` and `@semantic-release/exec` dependencies
* Implemented automatic result generation on survey submission
* Integrated framer-motion for smooth question transitions and updated validation schema
* Added support for categoryConstants in test creation route
* Added backend release automation file
* Added frontend release workflow configuration

**Breaking Changes**

* The payload for `POST /api/users/entry` has changed. The `ans` field is no longer a generic object and must now be an array of objects, each with a `questionId` (string) and `value` (number).

**Migration Notes**

To migrate to this release, follow these steps:

1. Update dependencies and configuration files as needed
2. Review and update code to accommodate breaking changes
3. Test thoroughly to ensure compatibility and functionality

**Test Recommendations**

To ensure a smooth transition to this release, perform the following tests:

1. Unit testing to verify individual components and functions
2. Integration testing to verify interactions between components and systems
3. End-to-end testing to verify overall system functionality and user experience

**Final Release Note**

"Release 1.1.0 introduces significant improvements to the Competency Mapping system, including bug fixes, new features, and breaking changes. Please review and update code accordingly to ensure a smooth transition."