### High-level summary

This commit reverts a previous change that auto-synced the backend with the main branch, resolving merge conflicts. The reverted change modified the `/users/result` endpoint to fetch results based on `attemptId` instead of `surveyId`, and also added functionality to fetch test details and format response data.

### What changed (bullet points)

* Reverted a previous change that auto-synced the backend with the main branch
* Modified the `/users/result` endpoint to fetch results based on `attemptId` instead of `surveyId`
* Added functionality to fetch test details
* Formatted response data to include test details
* Modified the `/users` endpoint to fetch all results for a user and extract survey IDs
* Modified the `/users` endpoint to fetch corresponding test details and combine data
* Updated error handling and response formatting

### Why it likely changed

The change was likely reverted because it caused issues or conflicts with other parts of the system. The previous change may have introduced bugs or unexpected behavior, or it may have caused compatibility issues with other components.

### Impact on system

The reverted change likely had a significant impact on the system, as it modified a critical endpoint and added new functionality. The changes may have caused issues with data consistency, performance, or security.

### Possible risks

* Data inconsistencies: The reverted change may have caused data inconsistencies, such as incorrect test details or missing results.
* Performance issues: The added functionality may have caused performance issues, such as slow response times or high memory usage.
* Security risks: The modified endpoint may have introduced security risks, such as unauthorized access or data exposure.

### Migration notes (if needed)

* If the reverted change is re-introduced, it is recommended to thoroughly test the system to ensure that it works as expected and does not introduce any new issues.
* The modified endpoint should be thoroughly reviewed and tested to ensure that it meets security and performance requirements.

### Test recommendations

* Test the `/users/result` endpoint with various input scenarios, including valid and invalid `attemptId` values.
* Test the `/users` endpoint with various input scenarios, including valid and invalid `userId` values.
* Test the system's performance and security under heavy load and stress testing.

### Final release note

"This commit reverts a previous change to the `/users/result` endpoint and modifies the `/users` endpoint to fetch results and test details."

### Full markdown explanation

#### Commit Explanation

This commit reverts a previous change that auto-synced the backend with the main branch, resolving merge conflicts. The reverted change modified the `/users/result` endpoint to fetch results based on `attemptId` instead of `surveyId`, and also added functionality to fetch test details and format response data.

#### What Changed

* Reverted a previous change that auto-synced the backend with the main branch
* Modified the `/users/result` endpoint to fetch results based on `attemptId` instead of `surveyId`
* Added functionality to fetch test details
* Formatted response data to include test details
* Modified the `/users` endpoint to fetch all results for a user and extract survey IDs
* Modified the `/users` endpoint to fetch corresponding test details and combine data
* Updated error handling and response formatting

#### Why It Likely Changed

The change was likely reverted because it caused issues or conflicts with other parts of the system. The previous change may have introduced bugs or unexpected behavior, or it may have caused compatibility issues with other components.

#### Impact on System

The reverted change likely had a significant impact on the system, as it modified a critical endpoint and added new functionality. The changes may have caused issues with data consistency, performance, or security.

#### Possible Risks

* Data inconsistencies: The reverted change may have caused data inconsistencies, such as incorrect test details or missing results.
* Performance issues: The added functionality may have caused performance issues, such as slow response times or high memory usage.
* Security risks: The modified endpoint may have introduced security risks, such as unauthorized access or data exposure.

#### Migration Notes

* If the reverted change is re-introduced, it is recommended to thoroughly test the system to ensure that it works as expected and does not introduce any new issues.
* The modified endpoint should be thoroughly reviewed and tested to ensure that it meets security and performance requirements.

#### Test Recommendations

* Test the `/users/result` endpoint with various input scenarios, including valid and invalid `attemptId` values.
* Test the `/users` endpoint with various input scenarios, including valid and invalid `userId` values.
* Test the system's performance and security under heavy load and stress testing.

#### Final Release Note

"This commit reverts a previous change to the `/users/result` endpoint and modifies the `/users` endpoint to fetch results and test details."