### Commit Analysis

#### 1. High-level summary

This commit changes the HTTP request methods from GET to POST for fetching tests and results in the load test functionality for consistency.

#### 2. What changed

* `http.get` was replaced with `http.post` for the following requests:
	+ Fetching tests (`/api/users/fetch-tests`)
	+ Fetching test details (`/api/users/fetch-tests/${testId}`)
	+ Fetching result (`/api/users/result/${username}`)

#### 3. Why it likely changed

The change was made to ensure consistency in the HTTP request methods used in the load test functionality. Using POST requests for these endpoints may be a design decision to align with the expected behavior of the API or to follow a specific security guideline.

#### 4. Impact on system

The change is likely to have a minimal impact on the system, as the API endpoints and their expected behavior remain the same. However, this change may affect any external integrations or third-party services that rely on the original GET requests.

#### 5. Possible risks

* If the API endpoints are not designed to handle POST requests, this change may lead to unexpected behavior or errors.
* Any external integrations or third-party services that rely on the original GET requests may break or require updates to accommodate the new POST requests.

#### 6. Migration notes (if needed)

* Any external integrations or third-party services that rely on the original GET requests should be updated to use the new POST requests.
* The API documentation should be updated to reflect the change in HTTP request methods.

#### 7. Test recommendations

* Run thorough tests to ensure that the load test functionality works as expected with the new POST requests.
* Verify that any external integrations or third-party services that rely on the original GET requests are updated correctly.

#### 8. Final release note

"Updated load test functionality to use POST requests for consistency."

#### 9. Full markdown explanation

### Commit Analysis

#### High-level summary
This commit changes the HTTP request methods from GET to POST for fetching tests and results in the load test functionality for consistency.

#### What changed
* `http.get` was replaced with `http.post` for the following requests:
	+ Fetching tests (`/api/users/fetch-tests`)
	+ Fetching test details (`/api/users/fetch-tests/${testId}`)
	+ Fetching result (`/api/users/result/${username}`)

#### Why it likely changed
The change was made to ensure consistency in the HTTP request methods used in the load test functionality. Using POST requests for these endpoints may be a design decision to align with the expected behavior of the API or to follow a specific security guideline.

#### Impact on system
The change is likely to have a minimal impact on the system, as the API endpoints and their expected behavior remain the same. However, this change may affect any external integrations or third-party services that rely on the original GET requests.

#### Possible risks
* If the API endpoints are not designed to handle POST requests, this change may lead to unexpected behavior or errors.
* Any external integrations or third-party services that rely on the original GET requests may break or require updates to accommodate the new POST requests.

#### Migration notes (if needed)
* Any external integrations or third-party services that rely on the original GET requests should be updated to use the new POST requests.
* The API documentation should be updated to reflect the change in HTTP request methods.

#### Test recommendations
* Run thorough tests to ensure that the load test functionality works as expected with the new POST requests.
* Verify that any external integrations or third-party services that rely on the original GET requests are updated correctly.

#### Final release note
"Updated load test functionality to use POST requests for consistency."