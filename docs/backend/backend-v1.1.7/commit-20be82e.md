### High-level summary

This commit reverts a previous change that auto-synced the backend with the main branch, resolving merge conflicts. The reverted change modified the `/users/result` endpoint to fetch results for a user based on their ID and attempt ID, and also modified the `/users` endpoint to fetch all results for a user and return test details. The revert brings back the original functionality of the endpoints.

### What changed (bullet points)

* Reverted changes made to the `/users/result` endpoint to fetch results based on user ID and attempt ID
* Reverted changes made to the `/users` endpoint to fetch all results for a user and return test details
* Removed the requirement for the `surveyId` parameter in the `/users/result` endpoint
* Removed the requirement for the `testId` parameter in the `/users/result` endpoint
* Removed the formatting of the response in the `/users/result` endpoint
* Removed the extraction of survey IDs from results in the `/users` endpoint
* Removed the fetching of corresponding test details in the `/users` endpoint
* Removed the mapping of test info by survey ID in the `/users` endpoint
* Removed the combination of data in the `/users` endpoint
* Removed the return of formatted results in the `/users` endpoint

### Why it likely changed

The revert likely changed because the previous change caused issues or was not fully tested. The auto-sync feature may have introduced conflicts or unexpected behavior, leading to the need to revert the change.

### Impact on system

The revert will likely have a minimal impact on the system, as the original functionality of the endpoints is being restored. However, any downstream components or services that relied on the modified endpoints may need to be updated to accommodate the revert.

### Possible risks

* Downstream components or services may need to be updated to accommodate the revert
* The revert may introduce new conflicts or issues if the original functionality was not thoroughly tested
* The revert may not address the underlying issues that led to the need for the auto-sync feature

### Migration notes (if needed)

* Any downstream components or services that relied on the modified endpoints will need to be updated to accommodate the revert
* The original functionality of the endpoints should be thoroughly tested to ensure that the revert does not introduce any new issues

### Test recommendations

* Test the `/users/result` endpoint to ensure that it returns the correct results based on user ID and attempt ID
* Test the `/users` endpoint to ensure that it returns the correct results and test details for a user
* Test downstream components or services that relied on the modified endpoints to ensure that they are updated correctly

### Final release note

"Reverted changes to the `/users/result` and `/users` endpoints to restore original functionality."

### Full markdown explanation

**Commit Analysis**

This commit reverts a previous change that auto-synced the backend with the main branch, resolving merge conflicts. The reverted change modified the `/users/result` endpoint to fetch results for a user based on their ID and attempt ID, and also modified the `/users` endpoint to fetch all results for a user and return test details.

**Why it changed**

The revert likely changed because the previous change caused issues or was not fully tested. The auto-sync feature may have introduced conflicts or unexpected behavior, leading to the need to revert the change.

**Impact on system**

The revert will likely have a minimal impact on the system, as the original functionality of the endpoints is being restored. However, any downstream components or services that relied on the modified endpoints may need to be updated to accommodate the revert.

**Possible risks**

* Downstream components or services may need to be updated to accommodate the revert
* The revert may introduce new conflicts or issues if the original functionality was not thoroughly tested
* The revert may not address the underlying issues that led to the need for the auto-sync feature

**Migration notes**

* Any downstream components or services that relied on the modified endpoints will need to be updated to accommodate the revert
* The original functionality of the endpoints should be thoroughly tested to ensure that the revert does not introduce any new issues

**Test recommendations**

* Test the `/users/result` endpoint to ensure that it returns the correct results based on user ID and attempt ID
* Test the `/users` endpoint to ensure that it returns the correct results and test details for a user
* Test downstream components or services that relied on the modified endpoints to ensure that they are updated correctly

**Final release note**

Reverted changes to the `/users/result` and `/users` endpoints to restore original functionality.