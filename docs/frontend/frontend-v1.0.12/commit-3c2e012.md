### High-level summary

This commit is a revert of a previous commit that implemented API integration and user roles in auth pages. The reverted commit likely added features such as API calls to authenticate users, storing access tokens, and redirecting users based on their roles. This revert likely removes these features and returns the auth pages to their previous state.

### What changed (bullet points)

* Removed API calls to authenticate users
* Removed storing of access tokens
* Removed redirecting users based on their roles
* Removed username input field from login page
* Removed class, section, roll number, and date of birth input fields from signup page
* Added email input field to login page
* Added role select field to login and signup pages
* Modified API calls in results page to use fetch instead of apiClient

### Why it likely changed

The revert likely occurred because the previous implementation had issues or was not working as expected. The developer may have decided to revert the changes to get the auth pages working again or to simplify the code.

### Impact on system

The revert will likely remove the API integration and user roles features, which may impact the system's functionality. Users will no longer be able to authenticate using API calls, and the system may not be able to redirect users based on their roles.

### Possible risks

* The system may not be able to authenticate users correctly
* The system may not be able to redirect users based on their roles
* The system may be vulnerable to security risks if the API integration is not properly implemented

### Migration notes (if needed)

To migrate to a new implementation of API integration and user roles, the developer will need to:

* Implement API calls to authenticate users
* Store access tokens securely
* Redirect users based on their roles
* Update the auth pages to use the new implementation

### Test recommendations

* Test the auth pages to ensure they are working correctly
* Test the API calls to ensure they are authenticating users correctly
* Test the redirect functionality to ensure it is working correctly

### Final release note (1 line)

"Reverted changes to auth pages to simplify code and fix issues."

### Full markdown explanation

### Commit Analysis

#### High-level summary
This commit is a revert of a previous commit that implemented API integration and user roles in auth pages. The reverted commit likely added features such as API calls to authenticate users, storing access tokens, and redirecting users based on their roles. This revert likely removes these features and returns the auth pages to their previous state.

#### What changed (bullet points)
* Removed API calls to authenticate users
* Removed storing of access tokens
* Removed redirecting users based on their roles
* Removed username input field from login page
* Removed class, section, roll number, and date of birth input fields from signup page
* Added email input field to login page
* Added role select field to login and signup pages
* Modified API calls in results page to use fetch instead of apiClient

#### Why it likely changed
The revert likely occurred because the previous implementation had issues or was not working as expected. The developer may have decided to revert the changes to get the auth pages working again or to simplify the code.

#### Impact on system
The revert will likely remove the API integration and user roles features, which may impact the system's functionality. Users will no longer be able to authenticate using API calls, and the system may not be able to redirect users based on their roles.

#### Possible risks
* The system may not be able to authenticate users correctly
* The system may not be able to redirect users based on their roles
* The system may be vulnerable to security risks if the API integration is not properly implemented

#### Migration notes (if needed)
To migrate to a new implementation of API integration and user roles, the developer will need to:
* Implement API calls to authenticate users
* Store access tokens securely
* Redirect users based on their roles
* Update the auth pages to use the new implementation

#### Test recommendations
* Test the auth pages to ensure they are working correctly
* Test the API calls to ensure they are authenticating users correctly
* Test the redirect functionality to ensure it is working correctly

#### Final release note (1 line)
"Reverted changes to auth pages to simplify code and fix issues."

This commit analysis provides a summary of the changes made in the commit, the reasons behind the changes, the impact on the system, possible risks, and migration notes. It also provides test recommendations and a final release note.