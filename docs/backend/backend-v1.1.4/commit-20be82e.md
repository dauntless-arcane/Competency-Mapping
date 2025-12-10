### High-level Summary

This commit appears to be a revert of a previous commit that introduced changes to the `users/result.js` file. The revert aims to restore the original functionality and behavior of the file, likely due to issues or conflicts introduced by the previous commit.

### What Changed (Bullet Points)

* The `router.post('/:userId/:surveyId')` endpoint was modified to `router.post('/:userId/:attemptId')` to use `attemptId` instead of `surveyId`.
* The `Result.findOne` query was updated to use `userId` and `attemptId` instead of `userId` and `surveyId`.
* A new `Test.findOne` query was added to fetch the related test using `surveyId` from the result.
* The response format was updated to include additional fields such as `name`, `level`, and `description` from the test.
* The `router.get('/:userId')` endpoint was modified to fetch all results for the user and extract survey IDs, then fetch corresponding test details and combine data.
* The response format was updated to include additional fields such as `name`, `level`, and `resultId` from the test.

### Why it Likely Changed

The changes likely occurred due to issues or conflicts introduced by the previous commit. The revert aims to restore the original functionality and behavior of the file, which suggests that the previous changes were not successful or caused unintended consequences.

### Impact on System

The revert will likely restore the original functionality and behavior of the `users/result.js` file, which may have been affected by the previous commit. The changes may have caused issues or conflicts, and the revert aims to resolve these problems.

### Possible Risks

* The revert may introduce new issues or conflicts if the original functionality and behavior were not thoroughly tested.
* The changes may have been made to address specific issues or requirements, and the revert may not address these underlying problems.
* The revert may not be the final solution, and further changes may be needed to address the underlying issues.

### Migration Notes (if needed)

* The changes made in the previous commit may need to be revisited and re-implemented to address the underlying issues or requirements.
* The revert may require additional testing to ensure that the original functionality and behavior are restored.
* Further changes may be needed to address any new issues or conflicts introduced by the revert.

### Test Recommendations

* Thoroughly test the `users/result.js` file to ensure that the original functionality and behavior are restored.
* Test the `router.post('/:userId/:attemptId')` endpoint to ensure that it functions correctly.
* Test the `router.get('/:userId')` endpoint to ensure that it fetches all results for the user and combines data correctly.

### Final Release Note (1 line)

"This commit reverts changes made to the `users/result.js` file to restore original functionality and behavior."

### Full Markdown Explanation

**Revert Commit: `20be82e80a992f6431fb45f0cd8f2f73c788b650`**

**Summary**

This commit reverts changes made to the `users/result.js` file to restore original functionality and behavior. The changes were made to address issues or conflicts introduced by a previous commit, but the revert aims to resolve these problems.

**Changes**

* The `router.post('/:userId/:surveyId')` endpoint was modified to `router.post('/:userId/:attemptId')` to use `attemptId` instead of `surveyId`.
* The `Result.findOne` query was updated to use `userId` and `attemptId` instead of `userId` and `surveyId`.
* A new `Test.findOne` query was added to fetch the related test using `surveyId` from the result.
* The response format was updated to include additional fields such as `name`, `level`, and `description` from the test.
* The `router.get('/:userId')` endpoint was modified to fetch all results for the user and extract survey IDs, then fetch corresponding test details and combine data.
* The response format was updated to include additional fields such as `name`, `level`, and `resultId` from the test.

**Why it Likely Changed**

The changes likely occurred due to issues or conflicts introduced by the previous commit. The revert aims to restore the original functionality and behavior of the file, which suggests that the previous changes were not successful or caused unintended consequences.

**Impact on System**

The revert will likely restore the original functionality and behavior of the `users/result.js` file, which may have been affected by the previous commit. The changes may have caused issues or conflicts, and the revert aims to resolve these problems.

**Possible Risks**

* The revert may introduce new issues or conflicts if the original functionality and behavior were not thoroughly tested.
* The changes may have been made to address specific issues or requirements, and the revert may not address these underlying problems.
* The revert may not be the final solution, and further changes may be needed to address the underlying issues.

**Migration Notes (if needed)**

* The changes made in the previous commit may need to be revisited and re-implemented to address the underlying issues or requirements.
* The revert may require additional testing to ensure that the original functionality and behavior are restored.
* Further changes may be needed to address any new issues or conflicts introduced by the revert.

**Test Recommendations**

* Thoroughly test the `users/result.js` file to ensure that the original functionality and behavior are restored.
* Test the `router.post('/:userId/:attemptId')` endpoint to ensure that it functions correctly.
* Test the `router.get('/:userId')` endpoint to ensure that it fetches all results for the user and combines data correctly.

**Final Release Note**

This commit reverts changes made to the `users/result.js` file to restore original functionality and behavior.