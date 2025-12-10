### High-level summary

The commit adds a results page to display a list of all results of the assessments the user has taken. It includes filtering options for level, date, and test name. The backend has been updated to include additional fields in the responses, such as level and duration.

### What changed

* Added a results page to display a list of all results of the assessments the user has taken
* Included filtering options for level, date, and test name
* Updated backend to include additional fields in the responses, such as level and duration
* Fixed bugs in the backend, including:
	+ /api/users/fetch-tests to added level, duration, recommended
	+ mongodb_atlas_db_uri_with_credentials in file fixed
	+ name not coming in /api/users/fetch-tests/
	+ regenerate package-lock.json with legacy peer deps
	+ result-generator: add missing mongoose import and update survey response with scores
	+ wrong status code sent
* Added features to the backend, including:
	+ add @semantic-release/changelog dependency to package.json and package-lock.json
	+ add @semantic-release/exec dependency to package.json and package-lock.json
	+ added Login.js and fixed api for the user-survey
	+ **api:** add categoryConstants support in test creation route
	+ backend release automation file added
	+ **release:** add frontend release workflow configuration
	+ **release:** add frontend release workflow with semantic-release configuration
	+ **survey:** Implement automatic result generation on submission
	+ **survey:** integrate framer-motion for smooth question transitions and update validation schema
	+ **watcher:** process pending survey responses and auto-generate results

### Why it likely changed

The changes were likely made to improve the user experience and functionality of the application. The addition of a results page and filtering options allows users to easily view and manage their assessment results. The updates to the backend include additional fields in the responses, which will provide more detailed information to the frontend. The fixes to bugs and the addition of features will improve the stability and functionality of the application.

### Impact on system

The changes will impact the following systems:

* Frontend: The results page and filtering options will be visible to users, allowing them to easily view and manage their assessment results.
* Backend: The updates to the backend will provide more detailed information to the frontend and improve the stability and functionality of the application.
* Database: The changes to the database schema will require updates to the data model and may impact existing data.

### Possible risks

The changes may introduce the following risks:

* Data loss: The updates to the database schema may impact existing data, potentially leading to data loss.
* Performance issues: The addition of filtering options and the updates to the backend may impact performance, potentially leading to slow loading times or errors.
* Security vulnerabilities: The changes may introduce new security vulnerabilities, potentially allowing unauthorized access to sensitive data.

### Migration notes (if needed)

To migrate to this new version, follow these steps:

1. Update the frontend to include the new results page and filtering options.
2. Update the backend to include the additional fields in the responses.
3. Update the database schema to reflect the changes.
4. Test the application to ensure that it is functioning as expected.

### Test recommendations

To test the changes, follow these recommendations:

1. Test the results page and filtering options to ensure that they are functioning as expected.
2. Test the backend to ensure that it is providing the correct information and that the updates to the database schema are correct.
3. Test the application to ensure that it is functioning as expected and that there are no performance issues or security vulnerabilities.

### Final release note

Added results page and filtering options to display a list of all results of the assessments the user has taken, and updated backend to include additional fields in the responses.

### Full markdown explanation

#### Added results page and filtering options

The commit adds a results page to display a list of all results of the assessments the user has taken. It includes filtering options for level, date, and test name.

#### Updated backend to include additional fields in the responses

The backend has been updated to include additional fields in the responses, such as level and duration.

#### Fixed bugs

The following bugs have been fixed:

* /api/users/fetch-tests to added level, duration, recommended
* mongodb_atlas_db_uri_with_credentials in file fixed
* name not coming in /api/users/fetch-tests/
* regenerate package-lock.json with legacy peer deps
* result-generator: add missing mongoose import and update survey response with scores
* wrong status code sent

#### Added features

The following features have been added:

* add @semantic-release/changelog dependency to package.json and package-lock.json
* add @semantic-release/exec dependency to package.json and package-lock.json
* added Login.js and fixed api for the user-survey
* **api:** add categoryConstants support in test creation route
* backend release automation file added
* **release:** add frontend release workflow configuration
* **release:** add frontend release workflow with semantic-release configuration
* **survey:** Implement automatic result generation on submission
* **survey:** integrate framer-motion for smooth question transitions and update validation schema
* **watcher:** process pending survey responses and auto-generate results