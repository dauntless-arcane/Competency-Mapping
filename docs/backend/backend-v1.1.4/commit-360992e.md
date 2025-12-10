### High-level summary

This commit introduces a new authentication system to the backend, including login, signup, refresh token, logout, forgot password, and reset password features.

### What changed

* Added new routes for:
	+ Login
	+ Signup
	+ Refresh token
	+ Logout
	+ Forgot password
	+ Reset password
* Implemented authentication logic using JWT tokens
* Introduced a refresh token system to extend token validity
* Added rate limiting and IP logging for security
* Implemented password hashing and verification using bcrypt
* Introduced a forgot password feature with OTP generation
* Implemented a reset password feature using OTP

### Why it likely changed

The authentication system was likely changed to improve security and user experience. The new system introduces a refresh token system, rate limiting, and IP logging to prevent abuse and unauthorized access. The forgot password feature with OTP generation and reset password feature also improve user experience by providing a more secure and convenient way to manage passwords.

### Impact on system

The new authentication system will impact the following:

* User authentication and authorization
* Token generation and verification
* Password hashing and verification
* Rate limiting and IP logging
* Forgot password and reset password features

### Possible risks

* Token expiration and revocation issues
* Password hashing and verification vulnerabilities
* Rate limiting and IP logging configuration errors
* Forgot password and reset password feature misconfigurations

### Migration notes (if needed)

* Update client-side code to use the new authentication endpoints
* Update server-side code to use the new authentication logic
* Configure rate limiting and IP logging settings
* Test forgot password and reset password features

### Test recommendations

* Test login, signup, refresh token, logout, forgot password, and reset password features thoroughly
* Test rate limiting and IP logging configurations
* Test forgot password and reset password features with various input scenarios

### Final release note

"New authentication system introduced with improved security and user experience features, including refresh token, rate limiting, and forgot password/reset password functionality."

### Full markdown explanation

**Deep Commit Analysis**

**Commit Hash:** 360992eac66dddd83cc0cb482d4446e81ba49d58
**Date:** 2025-11-16 21:21:42 +0530
**Author:** Pratyush
**Subject:** feat: added login and signup to the backend

**High-level summary**

This commit introduces a new authentication system to the backend, including login, signup, refresh token, logout, forgot password, and reset password features.

**What changed**

* Added new routes for:
	+ Login
	+ Signup
	+ Refresh token
	+ Logout
	+ Forgot password
	+ Reset password
* Implemented authentication logic using JWT tokens
* Introduced a refresh token system to extend token validity
* Added rate limiting and IP logging for security
* Implemented password hashing and verification using bcrypt
* Introduced a forgot password feature with OTP generation
* Implemented a reset password feature using OTP

**Why it likely changed**

The authentication system was likely changed to improve security and user experience. The new system introduces a refresh token system, rate limiting, and IP logging to prevent abuse and unauthorized access. The forgot password feature with OTP generation and reset password feature also improve user experience by providing a more secure and convenient way to manage passwords.

**Impact on system**

The new authentication system will impact the following:

* User authentication and authorization
* Token generation and verification
* Password hashing and verification
* Rate limiting and IP logging
* Forgot password and reset password features

**Possible risks**

* Token expiration and revocation issues
* Password hashing and verification vulnerabilities
* Rate limiting and IP logging configuration errors
* Forgot password and reset password feature misconfigurations

**Migration notes (if needed)**

* Update client-side code to use the new authentication endpoints
* Update server-side code to use the new authentication logic
* Configure rate limiting and IP logging settings
* Test forgot password and reset password features

**Test recommendations**

* Test login, signup, refresh token, logout, forgot password, and reset password features thoroughly
* Test rate limiting and IP logging configurations
* Test forgot password and reset password features with various input scenarios

**Final release note**

"New authentication system introduced with improved security and user experience features, including refresh token, rate limiting, and forgot password/reset password functionality."