### Commit Analysis

#### High-level summary
This commit implements user authentication with cookie management and middleware protection. It introduces a new authentication system that uses cookies to store access tokens and refresh tokens, and a middleware function to protect routes that require authentication.

#### What changed (bullet points)

* Introduced a new authentication system using cookies to store access tokens and refresh tokens
* Added a middleware function to protect routes that require authentication
* Modified the `apiClient` function to use the new authentication system
* Modified the `tokenManager` function to store access tokens in local storage
* Added a new `hydrateAccessToken` function to refresh access tokens from refresh cookies
* Modified the `getUser` function to retrieve user information from session storage
* Added a new `handleForceLogout` function to handle forced logout scenarios

#### Why it likely changed
The changes were likely made to improve the security and reliability of the authentication system. The new system uses cookies to store access tokens and refresh tokens, which provides a more secure way to authenticate users. The middleware function protects routes that require authentication, which helps to prevent unauthorized access.

#### Impact on system
The changes will have a significant impact on the system, as they introduce a new authentication system that uses cookies to store access tokens and refresh tokens. This will require updates to the client-side code to use the new authentication system. Additionally, the middleware function will protect routes that require authentication, which may require updates to the server-side code to handle authentication-related errors.

#### Possible risks
The changes introduce several possible risks, including:

* Cookie-based authentication is vulnerable to CSRF attacks if not properly implemented
* The middleware function may block legitimate requests if it is not properly configured
* The `hydrateAccessToken` function may not work correctly if the refresh cookie is not properly set

#### Migration notes (if needed)
To migrate to the new authentication system, follow these steps:

1. Update the client-side code to use the new authentication system
2. Update the server-side code to handle authentication-related errors
3. Configure the middleware function to protect routes that require authentication
4. Test the new authentication system thoroughly to ensure it works correctly

#### Test recommendations
To test the new authentication system, follow these steps:

1. Test the authentication flow from start to finish
2. Test the middleware function to ensure it blocks unauthorized requests
3. Test the `hydrateAccessToken` function to ensure it works correctly
4. Test the `getUser` function to ensure it retrieves user information correctly

#### Final release note (1 line)
"Implemented user authentication with cookie management and middleware protection to improve security and reliability."

#### Full markdown explanation

### Commit Analysis

#### High-level summary
This commit implements user authentication with cookie management and middleware protection. It introduces a new authentication system that uses cookies to store access tokens and refresh tokens, and a middleware function to protect routes that require authentication.

#### What changed (bullet points)

* Introduced a new authentication system using cookies to store access tokens and refresh tokens
* Added a middleware function to protect routes that require authentication
* Modified the `apiClient` function to use the new authentication system
* Modified the `tokenManager` function to store access tokens in local storage
* Added a new `hydrateAccessToken` function to refresh access tokens from refresh cookies
* Modified the `getUser` function to retrieve user information from session storage
* Added a new `handleForceLogout` function to handle forced logout scenarios

#### Why it likely changed
The changes were likely made to improve the security and reliability of the authentication system. The new system uses cookies to store access tokens and refresh tokens, which provides a more secure way to authenticate users. The middleware function protects routes that require authentication, which helps to prevent unauthorized access.

#### Impact on system
The changes will have a significant impact on the system, as they introduce a new authentication system that uses cookies to store access tokens and refresh tokens. This will require updates to the client-side code to use the new authentication system. Additionally, the middleware function will protect routes that require authentication, which may require updates to the server-side code to handle authentication-related errors.

#### Possible risks
The changes introduce several possible risks, including:

* Cookie-based authentication is vulnerable to CSRF attacks if not properly implemented
* The middleware function may block legitimate requests if it is not properly configured
* The `hydrateAccessToken` function may not work correctly if the refresh cookie is not properly set

#### Migration notes (if needed)
To migrate to the new authentication system, follow these steps:

1. Update the client-side code to use the new authentication system
2. Update the server-side code to handle authentication-related errors
3. Configure the middleware function to protect routes that require authentication
4. Test the new authentication system thoroughly to ensure it works correctly

#### Test recommendations
To test the new authentication system, follow these steps:

1. Test the authentication flow from start to finish
2. Test the middleware function to ensure it blocks unauthorized requests
3. Test the `hydrateAccessToken` function to ensure it works correctly
4. Test the `getUser` function to ensure it retrieves user information correctly

#### Final release note (1 line)
"Implemented user authentication with cookie management and middleware protection to improve security and reliability."