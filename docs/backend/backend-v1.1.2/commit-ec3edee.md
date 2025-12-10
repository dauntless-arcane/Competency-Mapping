### High-level summary

This commit introduces a new feature to display a list of all results of the assessments a user has taken. The results page includes filters for date, level, and test name, as well as a list of test cards displaying the test name, date attempted, score, and level.

### What changed (bullet points)

* A new results page was added to the frontend, allowing users to view their assessment results.
* The results page includes filters for date, level, and test name.
* The results page displays a list of test cards, each showing the test name, date attempted, score, and level.
* The backend API was updated to include the level, duration, and recommended fields in the test response.
* The backend API was also updated to fix issues with the result fetch and status code sent.

### Why it likely changed

The results page was likely added to provide users with a centralized location to view their assessment results, making it easier for them to track their progress and identify areas for improvement. The filters and test cards were added to make it easier for users to find and view specific results.

### Impact on system

The introduction of the results page and filters will likely have a positive impact on the system, making it more user-friendly and efficient. However, it may also introduce some performance issues if the backend API is not optimized to handle the increased traffic.

### Possible risks

* Performance issues: The new results page and filters may put additional strain on the backend API, leading to performance issues if not optimized properly.
* Data inconsistencies: If the backend API is not properly updated to include the level, duration, and recommended fields, it may lead to data inconsistencies and errors.

### Migration notes (if needed)

* Update the backend API to include the level, duration, and recommended fields in the test response.
* Optimize the backend API to handle the increased traffic and performance issues.
* Test the results page and filters thoroughly to ensure they are working correctly and not introducing any data inconsistencies.

### Test recommendations

* Test the results page and filters with different user scenarios to ensure they are working correctly.
* Test the backend API to ensure it is properly updated and optimized.
* Test the data consistency and accuracy to ensure there are no errors or inconsistencies.

### Final release note (1 line)

"A new results page has been added to the frontend, allowing users to view their assessment results with filters and test cards."

### Full markdown explanation

#### Introduction

This commit introduces a new feature to display a list of all results of the assessments a user has taken. The results page includes filters for date, level, and test name, as well as a list of test cards displaying the test name, date attempted, score, and level.

#### What's changed

* A new results page was added to the frontend, allowing users to view their assessment results.
* The results page includes filters for date, level, and test name.
* The results page displays a list of test cards, each showing the test name, date attempted, score, and level.
* The backend API was updated to include the level, duration, and recommended fields in the test response.
* The backend API was also updated to fix issues with the result fetch and status code sent.

#### Why it changed

The results page was likely added to provide users with a centralized location to view their assessment results, making it easier for them to track their progress and identify areas for improvement. The filters and test cards were added to make it easier for users to find and view specific results.

#### Impact on system

The introduction of the results page and filters will likely have a positive impact on the system, making it more user-friendly and efficient. However, it may also introduce some performance issues if the backend API is not optimized to handle the increased traffic.

#### Possible risks

* Performance issues: The new results page and filters may put additional strain on the backend API, leading to performance issues if not optimized properly.
* Data inconsistencies: If the backend API is not properly updated to include the level, duration, and recommended fields, it may lead to data inconsistencies and errors.

#### Migration notes

* Update the backend API to include the level, duration, and recommended fields in the test response.
* Optimize the backend API to handle the increased traffic and performance issues.
* Test the results page and filters thoroughly to ensure they are working correctly and not introducing any data inconsistencies.

#### Test recommendations

* Test the results page and filters with different user scenarios to ensure they are working correctly.
* Test the backend API to ensure it is properly updated and optimized.
* Test the data consistency and accuracy to ensure there are no errors or inconsistencies.

#### Final release note

"A new results page has been added to the frontend, allowing users to view their assessment results with filters and test cards."