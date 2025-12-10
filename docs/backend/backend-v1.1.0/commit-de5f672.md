### 1. High-level summary
This commit is a merge of pull request #7 from the `main` branch of the `Mpratyush54` repository, fixing an issue where the name was not being retrieved in the `/api/users/fetch-tests` endpoint.

### 2. What changed
* The code now correctly fetches the name in the `/api/users/fetch-tests` API endpoint.
* The merge includes changes from the `main` branch of the `Mpratyush54` repository.

### 3. Why it likely changed
The change likely occurred to resolve a bug or issue reported by users or developers, where the name was not being displayed or retrieved as expected in the `/api/users/fetch-tests` endpoint.

### 4. Impact on system
The impact of this change is that the `/api/users/fetch-tests` endpoint will now correctly return the user's name, improving the overall functionality and user experience of the system.

### 5. Possible risks
Possible risks associated with this change include:
* Potential introduction of new bugs or issues in the `/api/users/fetch-tests` endpoint.
* Incompatibility with existing code or dependencies.

### 6. Migration notes (if needed)
No migration notes are needed for this change, as it appears to be a straightforward bug fix.

### 7. Test recommendations
Recommended tests for this change include:
* Unit tests for the `/api/users/fetch-tests` endpoint to ensure it correctly returns the user's name.
* Integration tests to verify the endpoint works as expected in different scenarios.

### 8. Final release note
Fixed issue where name was not being retrieved in the `/api/users/fetch-tests` endpoint.

### 9. Full markdown explanation
#### Commit Analysis
This commit is a merge of pull request #7 from the `Mpratyush54` repository, which fixes an issue where the name was not being retrieved in the `/api/users/fetch-tests` endpoint.

#### Changes
The changes made in this commit include:
* Fixing the `/api/users/fetch-tests` endpoint to correctly fetch the user's name.
* Merging changes from the `main` branch of the `Mpratyush54` repository.

#### Rationale
The change was likely made to resolve a reported issue or bug, where the name was not being displayed or retrieved as expected in the `/api/users/fetch-tests` endpoint.

#### Impact
The impact of this change is that the `/api/users/fetch-tests` endpoint will now correctly return the user's name, improving the overall functionality and user experience of the system.

#### Risks and Mitigations
Possible risks associated with this change include the introduction of new bugs or issues in the `/api/users/fetch-tests` endpoint, or incompatibility with existing code or dependencies. To mitigate these risks, thorough testing and review of the changed code is recommended.

#### Testing and Validation
To validate the changes made in this commit, the following tests are recommended:
* Unit tests for the `/api/users/fetch-tests` endpoint to ensure it correctly returns the user's name.
* Integration tests to verify the endpoint works as expected in different scenarios.

#### Release Notes
The final release note for this change is: Fixed issue where name was not being retrieved in the `/api/users/fetch-tests` endpoint.