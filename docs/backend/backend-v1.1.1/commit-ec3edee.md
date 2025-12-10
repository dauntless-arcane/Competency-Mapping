### High-level summary

This release adds a results page to show a list of all results of the assessments the user has taken. It includes filtering capabilities by level, date, and test name. The backend has also been updated to include additional fields in the API response, such as level and duration.

### What changed

* A new results page has been added to the frontend, which displays a list of all results of the assessments the user has taken.
* The results page includes filtering capabilities by level, date, and test name.
* The backend has been updated to include additional fields in the API response, such as level and duration.
* The `fetch-tests` API endpoint has been modified to return the additional fields.
* The `result-generator` has been updated to include the additional fields in the survey response.
* The `release` workflow has been updated to include the additional fields in the frontend release configuration.

### Why it likely changed

The results page and filtering capabilities were likely added to provide a better user experience and to make it easier for users to view and manage their results. The additional fields in the API response were likely added to provide more information to the frontend and to enable more advanced filtering and sorting capabilities.

### Impact on system

The addition of the results page and filtering capabilities is likely to have a positive impact on the system, making it easier for users to view and manage their results. The additional fields in the API response may also enable more advanced filtering and sorting capabilities, which could improve the overall user experience.

### Possible risks

* The addition of new API endpoints and fields may introduce new security risks if not properly implemented.
* The filtering capabilities may not work as expected if the data is not properly formatted or if there are issues with the API response.
* The results page may not display correctly if there are issues with the frontend code or if the data is not properly formatted.

### Migration notes

* The `fetch-tests` API endpoint has been modified to return additional fields, so any code that relies on this endpoint will need to be updated to handle the new fields.
* The `result-generator` has been updated to include the additional fields in the survey response, so any code that relies on this generator will need to be updated to handle the new fields.
* The `release` workflow has been updated to include the additional fields in the frontend release configuration, so any code that relies on this workflow will need to be updated to handle the new fields.

### Test recommendations

* Test the results page and filtering capabilities to ensure they are working correctly.
* Test the API endpoints and fields to ensure they are returning the correct data.
* Test the `result-generator` to ensure it is generating the correct survey responses.

### Final release note

"This release adds a results page with filtering capabilities and updates the backend to include additional fields in the API response."

### Full markdown explanation

## Release Notes

### High-level summary

This release adds a results page to show a list of all results of the assessments the user has taken. It includes filtering capabilities by level, date, and test name. The backend has also been updated to include additional fields in the API response, such as level and duration.

### What changed

* A new results page has been added to the frontend, which displays a list of all results of the assessments the user has taken.
* The results page includes filtering capabilities by level, date, and test name.
* The backend has been updated to include additional fields in the API response, such as level and duration.
* The `fetch-tests` API endpoint has been modified to return the additional fields.
* The `result-generator` has been updated to include the additional fields in the survey response.
* The `release` workflow has been updated to include the additional fields in the frontend release configuration.

### Why it likely changed

The results page and filtering capabilities were likely added to provide a better user experience and to make it easier for users to view and manage their results. The additional fields in the API response were likely added to provide more information to the frontend and to enable more advanced filtering and sorting capabilities.

### Impact on system

The addition of the results page and filtering capabilities is likely to have a positive impact on the system, making it easier for users to view and manage their results. The additional fields in the API response may also enable more advanced filtering and sorting capabilities, which could improve the overall user experience.

### Possible risks

* The addition of new API endpoints and fields may introduce new security risks if not properly implemented.
* The filtering capabilities may not work as expected if the data is not properly formatted or if there are issues with the API response.
* The results page may not display correctly if there are issues with the frontend code or if the data is not properly formatted.

### Migration notes

* The `fetch-tests` API endpoint has been modified to return additional fields, so any code that relies on this endpoint will need to be updated to handle the new fields.
* The `result-generator` has been updated to include the additional fields in the survey response, so any code that relies on this generator will need to be updated to handle the new fields.
* The `release` workflow has been updated to include the additional fields in the frontend release configuration, so any code that relies on this workflow will need to be updated to handle the new fields.

### Test recommendations

* Test the results page and filtering capabilities to ensure they are working correctly.
* Test the API endpoints and fields to ensure they are returning the correct data.
* Test the `result-generator` to ensure it is generating the correct survey responses.

### Final release note

"This release adds a results page with filtering capabilities and updates the backend to include additional fields in the API response."