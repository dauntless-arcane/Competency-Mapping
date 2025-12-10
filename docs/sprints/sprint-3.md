# Sprint 3 Report
**Thu Oct 30 2025 → Thu Nov 13 2025**

## Completed Work
- a/.github/workflows/frontend-release.yml


## Technical Changes

---
### Commit Detail
### High-level summary

This commit integrates Framer Motion for smooth question transitions in a survey feature and updates the validation schema.

### What changed

*   **Integrated Framer Motion**: The commit adds Framer Motion to the survey feature for smooth question transitions.
*   **Updated validation schema**: The commit updates the validation schema to allow for a value of 0 in the survey responses.
*   **Updated package.json and package-lock.json**: The commit updates the dependencies in `package.json` and `package-lock.json` to include Framer Motion.
*   **Updated backend validation**: The commit updates the backend validation to match the updated validation schema.

### Why it likely changed

The commit likely changed to improve the user experience by providing smooth transitions between questions in the survey feature. The updated validation schema allows for a value of 0, which may be necessary for the survey feature to function correctly.

### Impact on system

The integration of Framer Motion and the updated validation schema will likely have a positive impact on the system by providing a better user experience and ensuring that the survey feature functions correctly.

### Possible risks

*   **Compatibility issues**: The integration of Framer Motion may cause compatibility issues with other components or libraries in the system.
*   **Performance impacts**: The smooth transitions provided by Framer Motion may impact the performance of the system, especially if the survey feature is used extensively.
*   **Validation schema changes**: The updated validation schema may cause issues with existing survey responses or data.

### Migration notes

*   **Update dependencies**: Update `package.json` and `package-lock.json` to include Framer Motion.
*   **Update backend validation**: Update the backend validation to match the updated validation schema.
*   **Test the survey feature**: Test the survey feature to ensure that it functions correctly with the updated validation schema and Framer Motion.

### Test recommendations

*   **Unit tests**: Write unit tests to ensure that the survey feature functions correctly with the updated validation schema and Framer Motion.
*   **Integration tests**: Write integration tests to ensure that the survey feature works correctly with other components and libraries in the system.
*   **End-to-end tests**: Write end-to-end tests to ensure that the survey feature functions correctly in a real-world scenario.

### Final release note

Integrated Framer Motion for smooth question transitions and updated validation schema to allow for a value of 0 in survey responses.

### Full markdown explanation

#### Deep Commit Analysis

Commit Hash: 0f46ddd236580dc7542b48b414d0062efc029b2a
Date: 2025-10-30 20:00:26 +0530
Author: Pratyush
Subject: feat(survey): integrate framer-motion for smooth question transitions and update validation schema

### Changes

*   **Integrated Framer Motion**: The commit adds Framer Motion to the survey feature for smooth question transitions.
*   **Updated validation schema**: The commit updates the validation schema to allow for a value of 0 in the survey responses.
*   **Updated package.json and package-lock.json**: The commit updates the dependencies in `package.json` and `package-lock.json` to include Framer Motion.
*   **Updated backend validation**: The commit updates the backend validation to match the updated validation schema.

### Why it likely changed

The commit likely changed to improve the user experience by providing smooth transitions between questions in the survey feature. The updated validation schema allows for a value of 0, which may be necessary for the survey feature to function correctly.

### Impact on system

The integration of Framer Motion and the updated validation schema will likely have a positive impact on the system by providing a better user experience and ensuring that the survey feature functions correctly.

### Possible risks

*   **Compatibility issues**: The integration of Framer Motion may cause compatibility issues with other components or libraries in the system.
*   **Performance impacts**: The smooth transitions provided by Framer Motion may impact the performance of the system, especially if the survey feature is used extensively.
*   **Validation schema changes**: The updated validation schema may cause issues with existing survey responses or data.

### Migration notes

*   **Update dependencies**: Update `package.json` and `package-lock.json` to include Framer Motion.
*   **Update backend validation**: Update the backend validation to match the updated validation schema.
*   **Test the survey feature**: Test the survey feature to ensure that it functions correctly with the updated validation schema and Framer Motion.

### Test recommendations

*   **Unit tests**: Write unit tests to ensure that the survey feature functions correctly with the updated validation schema and Framer Motion.
*   **Integration tests**: Write integration tests to ensure that the survey feature works correctly with other components and libraries in the system.
*   **End-to-end tests**: Write end-to-end tests to ensure that the survey feature functions correctly in a real-world scenario.

### Final release note

Integrated Framer Motion for smooth question transitions and updated validation schema to allow for a value of 0 in survey responses.

---
### Commit Detail
### Deep Commit Analysis

**Commit Hash:** 41f1061b169dc12e7a43736ceddb779014b9ebb7
**Date:** 2025-10-30 20:25:04 +0530
**Author:** Pratyush
**Subject:** feat(release): add frontend release workflow with semantic-release configuration

### High-level Summary

This commit adds a new frontend release workflow to the repository using semantic-release configuration.

### What Changed

* A new file `.github/workflows/frontend-release.yml` was added to the repository.
* The existing file `.github/workflows/deploy.yml` was deleted.
* The new workflow file contains the configuration for releasing the frontend code using semantic-release.

### Why it Likely Changed

The commit likely changed because there was a need to separate the frontend release workflow from the existing deploy workflow. This separation is likely due to the differences in the deployment process for the frontend and backend code. The addition of semantic-release configuration suggests that the team wants to use a standardized approach for releasing the frontend code.

### Impact on System

The addition of this new workflow will change the way the frontend code is released. It will now use semantic-release to automate the release process, which will improve the consistency and reliability of the releases.

### Possible Risks

* The new workflow may not be properly tested, which could lead to issues during the release process.
* The semantic-release configuration may not be correctly set up, which could result in incorrect or missing metadata in the releases.
* The deletion of the existing deploy workflow may break the deployment process for the backend code.

### Migration Notes

* The existing deploy workflow should be reviewed and updated to ensure it is still working correctly after the deletion.
* The semantic-release configuration should be reviewed to ensure it is correctly set up and configured.
* The new frontend release workflow should be properly tested to ensure it is working correctly and not breaking any existing functionality.

### Test Recommendations

* Test the new frontend release workflow to ensure it is working correctly and not breaking any existing functionality.
* Test the semantic-release configuration to ensure it is correctly set up and configured.
* Test the existing deploy workflow to ensure it is still working correctly after the deletion.

### Final Release Note

"Added frontend release workflow using semantic-release configuration to automate releases."

### Full Markdown Explanation

**Commit Analysis: feat(release): add frontend release workflow with semantic-release configuration**

This commit adds a new frontend release workflow to the repository using semantic-release configuration. The existing deploy workflow was deleted, and a new file `frontend-release.yml` was added to the repository. The new workflow file contains the configuration for releasing the frontend code using semantic-release.

**What Changed**

* A new file `.github/workflows/frontend-release.yml` was added to the repository.
* The existing file `.github/workflows/deploy.yml` was deleted.
* The new workflow file contains the configuration for releasing the frontend code using semantic-release.

**Why it Likely Changed**

The commit likely changed because there was a need to separate the frontend release workflow from the existing deploy workflow. This separation is likely due to the differences in the deployment process for the frontend and backend code. The addition of semantic-release configuration suggests that the team wants to use a standardized approach for releasing the frontend code.

**Impact on System**

The addition of this new workflow will change the way the frontend code is released. It will now use semantic-release to automate the release process, which will improve the consistency and reliability of the releases.

**Possible Risks**

* The new workflow may not be properly tested, which could lead to issues during the release process.
* The semantic-release configuration may not be correctly set up, which could result in incorrect or missing metadata in the releases.
* The deletion of the existing deploy workflow may break the deployment process for the backend code.

**Migration Notes**

* The existing deploy workflow should be reviewed and updated to ensure it is still working correctly after the deletion.
* The semantic-release configuration should be reviewed to ensure it is correctly set up and configured.
* The new frontend release workflow should be properly tested to ensure it is working correctly and not breaking any existing functionality.

**Test Recommendations**

* Test the new frontend release workflow to ensure it is working correctly and not breaking any existing functionality.
* Test the semantic-release configuration to ensure it is correctly set up and configured.
* Test the existing deploy workflow to ensure it is still working correctly after the deletion.

**Final Release Note**

"Added frontend release workflow using semantic-release configuration to automate releases."

---
### Commit Detail
### High-level summary

The commit hash 5910b0372bc24ee777dc14082611e546b1b18291, made by Pratyush on 2025-10-30, refactors the frontend release workflow by simplifying the dependency installation process.

### What changed

* The `Install dependencies` job is replaced with `Install dependencies (ignore peer conflicts)` in the frontend release workflow.
* The `--legacy-peer-deps` flag is added to `npm ci` to ignore peer conflicts during dependency installation.
* The `Release Frontend` job name is simplified to `Frontend Release`.

### Why it likely changed

The change likely occurred to address issues related to peer dependencies in the project. When a new version of a dependency is installed, it may not be compatible with the existing version of another dependency. The `--legacy-peer-deps` flag helps to ignore these peer conflicts and allows the installation to proceed.

### Impact on system

The change should have a positive impact on the system by making the frontend release workflow more robust and less prone to errors caused by peer dependency conflicts. However, it may also introduce potential security risks if the ignored peer conflicts are not properly addressed.

### Possible risks

* Ignoring peer conflicts may lead to security vulnerabilities if the conflicting dependencies are not properly updated.
* The use of `--legacy-peer-deps` flag may lead to unexpected behavior or errors in the future if the dependencies are not properly compatible.

### Migration notes

* If you are using a similar workflow, consider adding the `--legacy-peer-deps` flag to your `npm ci` command to ignore peer conflicts.
* Regularly review and update your dependencies to ensure they are properly compatible.

### Test recommendations

* Run a thorough test suite to ensure that the changed workflow does not introduce any new errors or issues.
* Verify that the `--legacy-peer-deps` flag does not cause any unexpected behavior or errors.

### Final release note

"Refactored frontend release workflow to simplify dependency installation and ignore peer conflicts."

### Full markdown explanation

#### Commit Analysis

**Commit Hash:** 5910b0372bc24ee777dc14082611e546b1b18291
**Date:** 2025-10-30 20:27:35 +0530
**Author:** Pratyush
**Subject:** refactor(release): streamline frontend release workflow by simplifying dependency installation

#### Diff

```diff
commit 5910b0372bc24ee777dc14082611e546b1b18291
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Thu Oct 30 20:27:35 2025 +0530

    refactor(release): streamline frontend release workflow by simplifying dependency installation

diff --git a/.github/workflows/frontend-release.yml b/.github/workflows/frontend-release.yml
index 36968e9..a87027a 100644
--- a/.github/workflows/frontend-release.yml
+++ b/.github/workflows/frontend-release.yml
@@ -21,13 +21,10 @@ jobs:
         with:
           node-version: 20
 
-      - name: Install dependencies
-        working-directory: ./
-        run: npm ci
+      - name: Install dependencies (ignore peer conflicts)
+        run: npm ci --legacy-peer-deps
 
-      - name: Release Frontend
-        working-directory: ./
+      - name: Frontend Release
         env:
           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
-        run: |
-          npx semantic-release --tag-format "frontend-v${version}" --branches main
+        run: npx semantic-release --tag-format "frontend-v${version}" --branches main
```

#### Analysis

The commit refactors the frontend release workflow by simplifying the dependency installation process. The `Install dependencies` job is replaced with `Install dependencies (ignore peer conflicts)` and the `--legacy-peer-deps` flag is added to `npm ci` to ignore peer conflicts. The `Release Frontend` job name is also simplified to `Frontend Release`.

#### Impact

The change should have a positive impact on the system by making the frontend release workflow more robust and less prone to errors caused by peer dependency conflicts. However, it may also introduce potential security risks if the ignored peer conflicts are not properly addressed.

#### Risks

* Ignoring peer conflicts may lead to security vulnerabilities if the conflicting dependencies are not properly updated.
* The use of `--legacy-peer-deps` flag may lead to unexpected behavior or errors in the future if the dependencies are not properly compatible.

#### Migration Notes

* If you are using a similar workflow, consider adding the `--legacy-peer-deps` flag to your `npm ci` command to ignore peer conflicts.
* Regularly review and update your dependencies to ensure they are properly compatible.

#### Test Recommendations

* Run a thorough test suite to ensure that the changed workflow does not introduce any new errors or issues.
* Verify that the `--legacy-peer-deps` flag does not cause any unexpected behavior or errors.

#### Final Release Note

"Refactored frontend release workflow to simplify dependency installation and ignore peer conflicts."

---
### Commit Detail
### Deep Commit Analysis

#### 1. High-level summary

This commit regenerates the `package-lock.json` file with legacy peer dependencies. It specifically adds a new dependency on `caniuse-lite` version 1.0.30001751.

#### 2. What changed (bullet points)

* Added a new dependency on `caniuse-lite` version 1.0.30001751
* Updated the `package-lock.json` file to reflect the new dependency
* Included funding information for `caniuse-lite`
* Updated the license for `caniuse-lite` to CC-BY-4.0

#### 3. Why it likely changed

This change likely occurred to ensure compatibility with legacy peer dependencies, which are dependencies that are required by other packages but are not explicitly listed in the project's dependencies. By regenerating the `package-lock.json` file, the project is now able to properly resolve these dependencies.

#### 4. Impact on system

The impact of this change is likely to be minimal, as it only affects the project's dependencies. However, it may have a significant impact on the project's build process, as it may require additional dependencies to be installed.

#### 5. Possible risks

* The addition of a new dependency may introduce new security vulnerabilities or compatibility issues.
* The regenerating of the `package-lock.json` file may cause issues with the project's build process or dependencies.

#### 6. Migration notes (if needed)

* If the project is using a version manager like `yarn` or `npm`, the new dependency may need to be installed using the version manager.
* If the project is using a build tool like `webpack` or `rollup`, the new dependency may need to be configured in the build tool's configuration file.

#### 7. Test recommendations

* Run a full build and test cycle to ensure that the project is still building and testing correctly.
* Verify that the new dependency is being properly resolved and used in the project.

#### 8. Final release note (1 line)

"Updated `package-lock.json` to include legacy peer dependencies."

#### 9. Full markdown explanation

### Deep Commit Analysis

#### Commit Information

* Commit Hash: 0cee0408d03db76a38d59768c4a6de36195ce533
* Date: 2025-10-30 20:30:58 +0530
* Author: Pratyush
* Subject: fix: regenerate package-lock.json with legacy peer deps

#### What Changed

* Added a new dependency on `caniuse-lite` version 1.0.30001751
* Updated the `package-lock.json` file to reflect the new dependency
* Included funding information for `caniuse-lite`
* Updated the license for `caniuse-lite` to CC-BY-4.0

#### Why It Likely Changed

This change likely occurred to ensure compatibility with legacy peer dependencies, which are dependencies that are required by other packages but are not explicitly listed in the project's dependencies. By regenerating the `package-lock.json` file, the project is now able to properly resolve these dependencies.

#### Impact on System

The impact of this change is likely to be minimal, as it only affects the project's dependencies. However, it may have a significant impact on the project's build process, as it may require additional dependencies to be installed.

#### Possible Risks

* The addition of a new dependency may introduce new security vulnerabilities or compatibility issues.
* The regenerating of the `package-lock.json` file may cause issues with the project's build process or dependencies.

#### Migration Notes

* If the project is using a version manager like `yarn` or `npm`, the new dependency may need to be installed using the version manager.
* If the project is using a build tool like `webpack` or `rollup`, the new dependency may need to be configured in the build tool's configuration file.

#### Test Recommendations

* Run a full build and test cycle to ensure that the project is still building and testing correctly.
* Verify that the new dependency is being properly resolved and used in the project.

#### Final Release Note

"Updated `package-lock.json` to include legacy peer dependencies."

---
### Commit Detail
### Deep Commit Analysis

#### Commit Information

* **Commit Hash:** 6bedcedb04a3333f9aaa93533f7720058b7c9799
* **Date:** 2025-10-30 20:35:19 +0530
* **Author:** Pratyush
* **Subject:** fix: standardize quotes in frontend release workflow

#### High-Level Summary

This commit standardizes the quotes in the frontend release workflow by changing the double quotes to single quotes in the `semantic-release` command.

#### What Changed

* The `run` section of the `Frontend Release` job in the `.github/workflows/frontend-release.yml` file was modified.
* The `--tag-format` option in the `semantic-release` command was changed from double quotes to single quotes.
* The command now looks like this: `npx semantic-release --tag-format 'frontend-v${version}' --branches main`

#### Why it Likely Changed

The change was made to standardize the quotes in the `semantic-release` command. In YAML files, single quotes are often used to enclose strings, while double quotes are used for keys. This change ensures consistency in the formatting of the command.

#### Impact on System

This change should not have any significant impact on the system, as it only affects the formatting of the `semantic-release` command. However, it's essential to verify that the command works as expected after the change.

#### Possible Risks

* If the `semantic-release` command is not properly formatted, it may fail or produce unexpected results.
* This change may not be backward compatible if other parts of the system rely on double quotes.

#### Migration Notes (if needed)

* This change is a minor update and should not require any significant migration efforts.
* If other parts of the system rely on double quotes, they may need to be updated to use single quotes instead.

#### Test Recommendations

* Verify that the `semantic-release` command works as expected after the change.
* Test the frontend release workflow to ensure it functions correctly.

#### Final Release Note

Standardized quotes in frontend release workflow to improve consistency.

#### Full Markdown Explanation

### Commit Analysis: Standardize Quotes in Frontend Release Workflow

#### Commit Information

* **Commit Hash:** 6bedcedb04a3333f9aaa93533f7720058b7c9799
* **Date:** 2025-10-30 20:35:19 +0530
* **Author:** Pratyush
* **Subject:** fix: standardize quotes in frontend release workflow

#### High-Level Summary

This commit standardizes the quotes in the frontend release workflow by changing the double quotes to single quotes in the `semantic-release` command.

#### What Changed

* The `run` section of the `Frontend Release` job in the `.github/workflows/frontend-release.yml` file was modified.
* The `--tag-format` option in the `semantic-release` command was changed from double quotes to single quotes.
* The command now looks like this: `npx semantic-release --tag-format 'frontend-v${version}' --branches main`

#### Why it Likely Changed

The change was made to standardize the quotes in the `semantic-release` command. In YAML files, single quotes are often used to enclose strings, while double quotes are used for keys. This change ensures consistency in the formatting of the command.

#### Impact on System

This change should not have any significant impact on the system, as it only affects the formatting of the `semantic-release` command. However, it's essential to verify that the command works as expected after the change.

#### Possible Risks

* If the `semantic-release` command is not properly formatted, it may fail or produce unexpected results.
* This change may not be backward compatible if other parts of the system rely on double quotes.

#### Migration Notes (if needed)

* This change is a minor update and should not require any significant migration efforts.
* If other parts of the system rely on double quotes, they may need to be updated to use single quotes instead.

#### Test Recommendations

* Verify that the `semantic-release` command works as expected after the change.
* Test the frontend release workflow to ensure it functions correctly.

#### Final Release Note

Standardized quotes in frontend release workflow to improve consistency.

---
### Commit Detail
### Deep Commit Analysis

#### Commit Hash: 3b0f069ffcb31ac015b25010595358f23dc840ab
#### Date: 2025-10-30 20:48:42 +0530
#### Author: Pratyush
#### Subject: refactor(release): update backend release workflow for clarity and consistency

### High-level summary

The commit updates the backend release workflow in the `.github/workflows/backend-release.yml` file to improve clarity and consistency. The changes focus on simplifying the workflow triggers and configuration.

### What changed

* Renamed the workflow to "Backend Release"
* Simplified the `on.push` trigger by removing the specific path filter
* Updated the `working-directory` for several steps to `./backend`
* Changed the `node-version` to 20
* Removed the `defaults` section
* Updated the `run` command for the `Install dependencies` step to include `--legacy-peer-deps`
* Updated the `run` command for the `Run Semantic Release for Backend` step to include a custom `--tag-format` and `--branches` option

### Why it likely changed

The changes were made to improve the clarity and consistency of the backend release workflow. The original workflow had specific path filters and configuration options that may have caused confusion or issues. By simplifying the workflow triggers and configuration, the updated workflow is more straightforward and easier to maintain.

### Impact on system

The changes to the backend release workflow will likely have a positive impact on the system. The simplified workflow will reduce the complexity of the release process and make it easier to manage. However, the removal of specific path filters may cause the workflow to trigger on non-backend changes, which could lead to unintended consequences.

### Possible risks

* The removal of specific path filters may cause the workflow to trigger on non-backend changes, leading to unintended consequences.
* The updated `run` command for the `Install dependencies` step may cause issues with dependency resolution due to the inclusion of `--legacy-peer-deps`.

### Migration notes (if needed)

* Review the updated workflow to ensure it meets the requirements of the project.
* Test the workflow with different scenarios to ensure it behaves as expected.
* Consider adding additional configuration options or filters to prevent unintended consequences.

### Test recommendations

* Test the workflow with different scenarios, including:
	+ Pushing changes to the `main` branch
	+ Pushing changes to non-backend files
	+ Pushing changes with dependencies that require `--legacy-peer-deps`
* Verify that the workflow triggers and completes as expected in each scenario.

### Final release note

"Updated backend release workflow for clarity and consistency."

### Full markdown explanation

```markdown
### Deep Commit Analysis

#### Commit Hash: 3b0f069ffcb31ac015b25010595358f23dc840ab
#### Date: 2025-10-30 20:48:42 +0530
#### Author: Pratyush
#### Subject: refactor(release): update backend release workflow for clarity and consistency

### High-level summary

The commit updates the backend release workflow in the `.github/workflows/backend-release.yml` file to improve clarity and consistency. The changes focus on simplifying the workflow triggers and configuration.

### What changed

* Renamed the workflow to "Backend Release"
* Simplified the `on.push` trigger by removing the specific path filter
* Updated the `working-directory` for several steps to `./backend`
* Changed the `node-version` to 20
* Removed the `defaults` section
* Updated the `run` command for the `Install dependencies` step to include `--legacy-peer-deps`
* Updated the `run` command for the `Run Semantic Release for Backend` step to include a custom `--tag-format` and `--branches` option

### Why it likely changed

The changes were made to improve the clarity and consistency of the backend release workflow. The original workflow had specific path filters and configuration options that may have caused confusion or issues. By simplifying the workflow triggers and configuration, the updated workflow is more straightforward and easier to maintain.

### Impact on system

The changes to the backend release workflow will likely have a positive impact on the system. The simplified workflow will reduce the complexity of the release process and make it easier to manage. However, the removal of specific path filters may cause the workflow to trigger on non-backend changes, which could lead to unintended consequences.

### Possible risks

* The removal of specific path filters may cause the workflow to trigger on non-backend changes, leading to unintended consequences.
* The updated `run` command for the `Install dependencies` step may cause issues with dependency resolution due to the inclusion of `--legacy-peer-deps`.

### Migration notes (if needed)

* Review the updated workflow to ensure it meets the requirements of the project.
* Test the workflow with different scenarios to ensure it behaves as expected.
* Consider adding additional configuration options or filters to prevent unintended consequences.

### Test recommendations

* Test the workflow with different scenarios, including:
	+ Pushing changes to the `main` branch
	+ Pushing changes to non-backend files
	+ Pushing changes with dependencies that require `--legacy-peer-deps`
* Verify that the workflow triggers and completes as expected in each scenario.

### Final release note

"Updated backend release workflow for clarity and consistency."
```

