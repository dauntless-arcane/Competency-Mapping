### 1. High-level summary
This commit is a merge pull request that fixes an issue with a wrong status code being sent.

### 2. What changed
* The status code sent in a response was corrected.
* The merge pull request #3 from Mpratyush54/main was incorporated into the main branch.

### 3. Why it likely changed
It likely changed because the wrong status code was causing issues with the system, such as incorrect error handling or unexpected behavior, and needed to be corrected to ensure proper functionality.

### 4. Impact on system
The impact on the system is that it will now send the correct status code, which should improve the overall reliability and accuracy of the system's responses.

### 5. Possible risks
Possible risks associated with this change include:
* Potential breaking changes if the corrected status code affects downstream dependencies or error handling mechanisms.
* Incompatibility issues with clients or services that were adapted to handle the incorrect status code.

### 6. Migration notes (if needed)
No migration notes are needed for this change, as it is a simple fix to a status code issue.

### 7. Test recommendations
Recommended tests for this change include:
* Unit tests to verify that the correct status code is being sent.
* Integration tests to ensure that the corrected status code does not break any downstream dependencies or error handling mechanisms.
* End-to-end tests to verify that the system behaves as expected with the corrected status code.

### 8. Final release note
Fixed issue with wrong status code being sent in responses.

### 9. Full markdown explanation
#### Introduction
This commit is a merge pull request that fixes an issue with a wrong status code being sent. The change was made to ensure that the system sends the correct status code, which is essential for proper error handling and system behavior.

#### Changes Made
The changes made in this commit include:
* Correcting the status code sent in a response.
* Incorporating the merge pull request #3 from Mpratyush54/main into the main branch.

#### Rationale
The change was made because the wrong status code was causing issues with the system, such as incorrect error handling or unexpected behavior. By correcting the status code, the system will now send the correct response, which should improve the overall reliability and accuracy of the system's responses.

#### Impact
The impact on the system is that it will now send the correct status code, which should improve the overall reliability and accuracy of the system's responses. However, there are potential risks associated with this change, such as breaking changes or incompatibility issues with clients or services that were adapted to handle the incorrect status code.

#### Testing
To verify the correctness of this change, it is recommended to perform the following tests:
* Unit tests to verify that the correct status code is being sent.
* Integration tests to ensure that the corrected status code does not break any downstream dependencies or error handling mechanisms.
* End-to-end tests to verify that the system behaves as expected with the corrected status code.

#### Conclusion
In conclusion, this commit fixes an issue with a wrong status code being sent in responses. The change should improve the overall reliability and accuracy of the system's responses, but it is essential to perform thorough testing to verify the correctness of the change and identify any potential issues.