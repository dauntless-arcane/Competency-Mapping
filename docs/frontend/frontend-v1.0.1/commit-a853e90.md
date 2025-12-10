### High-level summary

This commit adds version bumping and tagging to the frontend sync workflow in the `.github/workflows/frontend-release.yml` file. It also updates the `tsconfig.json` file to use "react-jsx" instead of "preserve" for JSX compilation.

### What changed

* Added a new step to the frontend sync workflow to bump the version and create a new tag.
* Updated the `tsconfig.json` file to use "react-jsx" instead of "preserve" for JSX compilation.
* Modified the frontend sync workflow to use the new version tag.

### Why it likely changed

The author likely changed this to automate the version bumping and tagging process for the frontend release workflow. This would make it easier to manage versioning and tagging for the frontend codebase.

### Impact on system

The changes will impact the frontend release workflow, making it more automated and easier to manage versioning and tagging. This should improve the overall efficiency and reliability of the release process.

### Possible risks

* The new version bumping and tagging process may not work as expected, causing versioning issues.
* The "react-jsx" setting in `tsconfig.json` may not be compatible with all dependencies or configurations.

### Migration notes

* Make sure to test the new version bumping and tagging process thoroughly before deploying it to production.
* Review the updated `tsconfig.json` file to ensure it is compatible with all dependencies and configurations.

### Test recommendations

* Test the frontend sync workflow with the new version bumping and tagging process.
* Verify that the version tags are created correctly and are reflected in the `git describe` output.
* Test the `tsconfig.json` file with different JSX compilation settings to ensure compatibility.

### Final release note

"Automated version bumping and tagging added to frontend sync workflow."

### Full markdown explanation

**Deep Commit Analysis: `a853e9083ce374ecee9ec51abbc34283f97f8ac8`**

**High-level summary**

This commit adds version bumping and tagging to the frontend sync workflow in the `.github/workflows/frontend-release.yml` file. It also updates the `tsconfig.json` file to use "react-jsx" instead of "preserve" for JSX compilation.

**What changed**

* Added a new step to the frontend sync workflow to bump the version and create a new tag.
* Updated the `tsconfig.json` file to use "react-jsx" instead of "preserve" for JSX compilation.
* Modified the frontend sync workflow to use the new version tag.

**Why it likely changed**

The author likely changed this to automate the version bumping and tagging process for the frontend release workflow. This would make it easier to manage versioning and tagging for the frontend codebase.

**Impact on system**

The changes will impact the frontend release workflow, making it more automated and easier to manage versioning and tagging. This should improve the overall efficiency and reliability of the release process.

**Possible risks**

* The new version bumping and tagging process may not work as expected, causing versioning issues.
* The "react-jsx" setting in `tsconfig.json` may not be compatible with all dependencies or configurations.

**Migration notes**

* Make sure to test the new version bumping and tagging process thoroughly before deploying it to production.
* Review the updated `tsconfig.json` file to ensure it is compatible with all dependencies and configurations.

**Test recommendations**

* Test the frontend sync workflow with the new version bumping and tagging process.
* Verify that the version tags are created correctly and are reflected in the `git describe` output.
* Test the `tsconfig.json` file with different JSX compilation settings to ensure compatibility.

**Final release note**

"Automated version bumping and tagging added to frontend sync workflow."