### High-level summary

This commit implements API integration and user roles in the authentication pages of an application. The changes include refactoring the login and signup pages to use a real backend API for authentication and registration, replacing mock logic. The commit also introduces user roles and redirects users based on their roles after successful authentication.

### What changed

* **API Integration**:
	+ Replaced mock authentication with an asynchronous fetch call to `${API_BASE}/login` in the login page.
	+ Integrated the new `apiClient` utility for making authenticated requests in multiple pages.
* **User Roles**:
	+ Removed role selection from the login page and instead redirects users based on their roles received in the response.
	+ Introduced student-specific registration fields (`username`, `class`, `section`, `rollNo`, and `dob`) in the signup page.
* **Code Refactoring**:
	+ Updated form data handling and validation in the signup page.
	+ Removed unnecessary code and variables in the login and signup pages.

### Why it likely changed

The code likely changed to improve the security and functionality of the application's authentication system. By integrating a real backend API, the application can now authenticate users securely and efficiently. The introduction of user roles allows for more granular access control and customization of the application's behavior based on user roles.

### Impact on system

The changes will likely have a significant impact on the system, including:

* Improved security: The application now uses a secure authentication mechanism, reducing the risk of unauthorized access.
* Enhanced functionality: The introduction of user roles and student-specific registration fields improves the application's usability and customization options.
* Code maintenance: The refactored code is more maintainable and easier to understand, reducing the risk of bugs and errors.

### Possible risks

The changes may introduce some risks, including:

* **API dependency**: The application is now dependent on the backend API, which may be subject to downtime, changes, or security vulnerabilities.
* **User role management**: The introduction of user roles may require additional management and maintenance to ensure that roles are correctly assigned and updated.

### Migration notes (if needed)

If the application is being migrated to a new environment or version, the following notes should be considered:

* **API endpoint changes**: The `${API_BASE}/login` endpoint may change or be removed in the new environment, requiring updates to the login page.
* **User role configuration**: The user role configuration may need to be updated or recreated in the new environment.

### Test recommendations

To ensure the changes are thoroughly tested, the following tests should be performed:

* **Unit tests**: Test the individual components and functions of the login and signup pages to ensure they are working correctly.
* **Integration tests**: Test the integration of the login and signup pages with the backend API to ensure that authentication and user roles are working correctly.
* **End-to-end tests**: Test the entire application flow, including authentication and user role management, to ensure that the changes are working as expected.

### Final release note

"Improved security and functionality with API integration and user roles in authentication pages."

### Full markdown explanation

**Deep Commit Analysis**

**Commit Hash:** ffa01abb87faa58be0a2f827b5f5c735a153aa42
**Date:** 2025-11-22 08:30:27 +0530
**Author:** Pratyush
**Subject:** Feat: Implement API Integration and User Roles in Auth Pages

**High-level summary**

This commit implements API integration and user roles in the authentication pages of an application. The changes include refactoring the login and signup pages to use a real backend API for authentication and registration, replacing mock logic. The commit also introduces user roles and redirects users based on their roles after successful authentication.

**What changed**

* **API Integration**:
	+ Replaced mock authentication with an asynchronous fetch call to `${API_BASE}/login` in the login page.
	+ Integrated the new `apiClient` utility for making authenticated requests in multiple pages.
* **User Roles**:
	+ Removed role selection from the login page and instead redirects users based on their roles received in the response.
	+ Introduced student-specific registration fields (`username`, `class`, `section`, `rollNo`, and `dob`) in the signup page.
* **Code Refactoring**:
	+ Updated form data handling and validation in the signup page.
	+ Removed unnecessary code and variables in the login and signup pages.

**Why it likely changed**

The code likely changed to improve the security and functionality of the application's authentication system. By integrating a real backend API, the application can now authenticate users securely and efficiently. The introduction of user roles allows for more granular access control and customization of the application's behavior based on user roles.

**Impact on system**

The changes will likely have a significant impact on the system, including:

* Improved security: The application now uses a secure authentication mechanism, reducing the risk of unauthorized access.
* Enhanced functionality: The introduction of user roles and student-specific registration fields improves the application's usability and customization options.
* Code maintenance: The refactored code is more maintainable and easier to understand, reducing the risk of bugs and errors.

**Possible risks**

The changes may introduce some risks, including:

* **API dependency**: The application is now dependent on the backend API, which may be subject to downtime, changes, or security vulnerabilities.
* **User role management**: The introduction of user roles may require additional management and maintenance to ensure that roles are correctly assigned and updated.

**Migration notes (if needed)**

If the application is being migrated to a new environment or version, the following notes should be considered:

* **API endpoint changes**: The `${API_BASE}/login` endpoint may change or be removed in the new environment, requiring updates to the login page.
* **User role configuration**: The user role configuration may need to be updated or recreated in the new environment.

**Test recommendations**

To ensure the changes are thoroughly tested, the following tests should be performed:

* **Unit tests**: Test the individual components and functions of the login and signup pages to ensure they are working correctly.
* **Integration tests**: Test the integration of the login and signup pages with the backend API to ensure that authentication and user roles are working correctly.
* **End-to-end tests**: Test the entire application flow, including authentication and user role management, to ensure that the changes are working as expected.

**Final release note**

"Improved security and functionality with API integration and user roles in authentication pages."