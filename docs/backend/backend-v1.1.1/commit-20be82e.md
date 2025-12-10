### High-level summary

This commit reverts a previous auto-sync from the backend to the main branch, resolving merge conflicts. The reverted changes made significant updates to the `/users/result` API endpoint, including changes to the endpoint's parameters, database queries, and response formatting.

### What changed (bullet points)

* Reverted changes to the `/users/result` API endpoint
* Changes included:
	+ Updated endpoint parameters from `userId` and `surveyId` to `userId` and `attemptId`
	+ Added new database queries to fetch related test information
	+ Added new response formatting to include test information
	+ Modified existing database queries to fetch results and tests
	+ Updated error handling and logging

### Why it likely changed

The changes were reverted due to merge conflicts, indicating that the previous auto-sync caused issues when merging code from the backend to the main branch. The reverted changes likely introduced new functionality or modifications that were not compatible with the existing codebase.

### Impact on system

The reverted changes will remove the new functionality and modifications made to the `/users/result` API endpoint. The system will return to its previous state, using the original endpoint parameters, database queries, and response formatting.

### Possible risks

* The reverted changes may have introduced new bugs or issues that were not present in the original codebase.
* The removal of new functionality may impact users who relied on the updated endpoint.
* The reverted changes may require additional testing to ensure that the system is functioning as expected.

### Migration notes (if needed)

* If the new functionality is desired, the changes should be reapplied and thoroughly tested to ensure compatibility with the existing codebase.
* The database schema may need to be updated to accommodate the new test information.
* Additional logging and error handling may be necessary to handle potential issues with the updated endpoint.

### Test recommendations

* Thoroughly test the `/users/result` API endpoint to ensure that it is functioning as expected.
* Test the endpoint with various input parameters and scenarios to ensure that it handles edge cases correctly.
* Verify that the updated endpoint returns the correct response formatting and data.

### Final release note

"This commit reverts changes made to the `/users/result` API endpoint, resolving merge conflicts and returning the system to its previous state."

### Full markdown explanation

### Commit Analysis

### Commit Details

* Commit Hash: 20be82e80a992f6431fb45f0cd8f2f73c788b650
* Date: 2025-10-31 11:37:19 +0530
* Author: Pratyush
* Subject: Revert "🔁 Auto-sync backend → main (resolved merge conflicts)"

### High-level Summary

This commit reverts a previous auto-sync from the backend to the main branch, resolving merge conflicts. The reverted changes made significant updates to the `/users/result` API endpoint, including changes to the endpoint's parameters, database queries, and response formatting.

### What Changed

* Reverted changes to the `/users/result` API endpoint
* Changes included:
	+ Updated endpoint parameters from `userId` and `surveyId` to `userId` and `attemptId`
	+ Added new database queries to fetch related test information
	+ Added new response formatting to include test information
	+ Modified existing database queries to fetch results and tests
	+ Updated error handling and logging

### Why it Likely Changed

The changes were reverted due to merge conflicts, indicating that the previous auto-sync caused issues when merging code from the backend to the main branch. The reverted changes likely introduced new functionality or modifications that were not compatible with the existing codebase.

### Impact on System

The reverted changes will remove the new functionality and modifications made to the `/users/result` API endpoint. The system will return to its previous state, using the original endpoint parameters, database queries, and response formatting.

### Possible Risks

* The reverted changes may have introduced new bugs or issues that were not present in the original codebase.
* The removal of new functionality may impact users who relied on the updated endpoint.
* The reverted changes may require additional testing to ensure that the system is functioning as expected.

### Migration Notes (if needed)

* If the new functionality is desired, the changes should be reapplied and thoroughly tested to ensure compatibility with the existing codebase.
* The database schema may need to be updated to accommodate the new test information.
* Additional logging and error handling may be necessary to handle potential issues with the updated endpoint.

### Test Recommendations

* Thoroughly test the `/users/result` API endpoint to ensure that it is functioning as expected.
* Test the endpoint with various input parameters and scenarios to ensure that it handles edge cases correctly.
* Verify that the updated endpoint returns the correct response formatting and data.

### Final Release Note

"This commit reverts changes made to the `/users/result` API endpoint, resolving merge conflicts and returning the system to its previous state."