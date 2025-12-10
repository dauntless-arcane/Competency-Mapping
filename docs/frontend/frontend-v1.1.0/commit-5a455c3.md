### Commit Analysis

#### High-level summary
This commit introduces a major enhancement to the survey system, enabling automatic result processing as soon as a user submits their answers. It includes changes to the `SurveyResponse` model, API and validation, database and watchers, and dependencies and tooling.

#### What changed
* **Automatic Result Generation:**
	+ Refactored the `SurveyResponse` model (`suvey-response.js`) to use a structured schema with an `answers` array (`[{ questionId, value }]`).
	+ Added a Mongoose `post('save')` hook to the `SurveyResponse` model. This hook now automatically triggers the `generateResultFromSurvey` utility to process scores immediately after a response is saved.
* **API & Validation:**
	+ Implemented robust **Joi** validation on the `POST /api/users/entry` endpoint (`user-survey.js`) to enforce the new payload structure and provide detailed error messages.
	+ Added stubs for new user routes: `/api/users/result` and `/api/users/fetch-tests`.
	+ Introduced a new, stubbed admin API module at `/api/admin`.
* **Database & Watchers:**
	+ Added `startTestIndexWatcher` (in `mongo.cjs`) to run on a successful MongoDB connection, likely for real-time indexing.
* **Dependencies & Tooling:**
	+ Added `nodemon` for auto-reloading in development and updated the `start` script.
	+ Added `joi` for schema validation.
	+ Added `swagger-jsdoc` and `swagger-ui-express` to lay the groundwork for future API documentation.
	+ Removed the unused `mongo` package.

#### Why it likely changed
The changes were made to improve the survey system's functionality and user experience. The automatic result generation feature allows users to receive their results immediately after submitting their answers, which can enhance engagement and satisfaction. The changes also improve the system's robustness and maintainability by introducing robust validation and a more structured schema.

#### Impact on system
The changes will have a significant impact on the system, as they introduce a new feature and improve the overall user experience. The automatic result generation feature will likely increase user engagement and satisfaction, while the improved validation and schema will reduce errors and improve maintainability.

#### Possible risks
The changes may introduce some risks, such as:
* **Validation errors:** The new validation rules may cause errors if the payload is not correctly formatted.
* **Schema changes:** The changes to the `SurveyResponse` model may cause issues if the schema is not correctly updated.
* **Watcher issues:** The new watcher may cause issues if it is not correctly configured or if there are problems with the MongoDB connection.

#### Migration notes
To migrate to this commit, follow these steps:
1. Update the `SurveyResponse` model to use the new schema.
2. Update the `POST /api/users/entry` endpoint to use the new validation rules.
3. Update the `start` script to include `nodemon`.
4. Update the `swagger-jsdoc` and `swagger-ui-express` configurations to reflect the new API endpoints.

#### Test recommendations
To test the changes, follow these recommendations:
1. Test the automatic result generation feature to ensure it is working correctly.
2. Test the new validation rules to ensure they are correctly enforcing the payload structure.
3. Test the new watcher to ensure it is correctly indexing the MongoDB data.

#### Final release note
This commit introduces a major enhancement to the survey system, enabling automatic result processing as soon as a user submits their answers.

#### Full markdown explanation
### Commit Analysis

#### High-level summary
This commit introduces a major enhancement to the survey system, enabling automatic result processing as soon as a user submits their answers. It includes changes to the `SurveyResponse` model, API and validation, database and watchers, and dependencies and tooling.

#### What changed
* **Automatic Result Generation:**
	+ Refactored the `SurveyResponse` model (`suvey-response.js`) to use a structured schema with an `answers` array (`[{ questionId, value }]`).
	+ Added a Mongoose `post('save')` hook to the `SurveyResponse` model. This hook now automatically triggers the `generateResultFromSurvey` utility to process scores immediately after a response is saved.
* **API & Validation:**
	+ Implemented robust **Joi** validation on the `POST /api/users/entry` endpoint (`user-survey.js`) to enforce the new payload structure and provide detailed error messages.
	+ Added stubs for new user routes: `/api/users/result` and `/api/users/fetch-tests`.
	+ Introduced a new, stubbed admin API module at `/api/admin`.
* **Database & Watchers:**
	+ Added `startTestIndexWatcher` (in `mongo.cjs`) to run on a successful MongoDB connection, likely for real-time indexing.
* **Dependencies & Tooling:**
	+ Added `nodemon` for auto-reloading in development and updated the `start` script.
	+ Added `joi` for schema validation.
	+ Added `swagger-jsdoc` and `swagger-ui-express` to lay the groundwork for future API documentation.
	+ Removed the unused `mongo` package.

#### Why it likely changed
The changes were made to improve the survey system's functionality and user experience. The automatic result generation feature allows users to receive their results immediately after submitting their answers, which can enhance engagement and satisfaction. The changes also improve the system's robustness and maintainability by introducing robust validation and a more structured schema.

#### Impact on system
The changes will have a significant impact on the system, as they introduce a new feature and improve the overall user experience. The automatic result generation feature will likely increase user engagement and satisfaction, while the improved validation and schema will reduce errors and improve maintainability.

#### Possible risks
The changes may introduce some risks, such as:
* **Validation errors:** The new validation rules may cause errors if the payload is not correctly formatted.
* **Schema changes:** The changes to the `SurveyResponse` model may cause issues if the schema is not correctly updated.
* **Watcher issues:** The new watcher may cause issues if it is not correctly configured or if there are problems with the MongoDB connection.

#### Migration notes
To migrate to this commit, follow these steps:
1. Update the `SurveyResponse` model to use the new schema.
2. Update the `POST /api/users/entry` endpoint to use the new validation rules.
3. Update the `start` script to include `nodemon`.
4. Update the `swagger-jsdoc` and `swagger-ui-express` configurations to reflect the new API endpoints.

#### Test recommendations
To test the changes, follow these recommendations:
1. Test the automatic result generation feature to ensure it is working correctly.
2. Test the new validation rules to ensure they are correctly enforcing the payload structure.
3. Test the new watcher to ensure it is correctly indexing the MongoDB data.

#### Final release note
This commit introduces a major enhancement to the survey system, enabling automatic result processing as soon as a user submits their answers.