**Commit Analysis**
====================

### High-level summary

This commit updates the frontend release workflow to trigger on the frontend branch and ignore backend changes. The backend release workflow is deleted as it is no longer needed.

### What changed
* Deleted the backend-release.yml workflow file
* Updated the frontend-release.yml workflow file to:
	+ Trigger on the frontend branch
	+ Ignore backend changes
	+ Install dependencies without ignoring peer conflicts
	+ Run Semantic Release with the correct repository URL

### Why it likely changed

The change likely occurred to decouple the frontend and backend release workflows, allowing for independent releases and reducing the complexity of the release process.

### Impact on system

The change will allow for more flexible and independent releases of the frontend and backend components. However, it may also introduce new risks if not properly tested.

### Possible risks

* The frontend release workflow may not correctly handle changes to the frontend codebase
* The backend release workflow may still be referenced in other parts of the system, causing issues
* The decoupling of the frontend and backend release workflows may introduce new complexity and errors

### Migration notes

* Ensure that the frontend release workflow is properly tested and validated
* Review and update any references to the backend release workflow
* Consider implementing additional testing and validation to ensure the decoupling of the frontend and backend release workflows does not introduce new issues

### Test recommendations

* Perform a thorough review of the frontend release workflow to ensure it correctly handles changes to the frontend codebase
* Test the frontend release workflow with a variety of scenarios, including changes to the frontend codebase and backend codebase
* Verify that the backend release workflow is properly deleted and not referenced in any other parts of the system

### Final release note

"Updated frontend release workflow to trigger on frontend branch and ignore backend changes, decoupling frontend and backend release processes."

### Full markdown explanation

```markdown
**Commit Analysis**
====================

### High-level summary

This commit updates the frontend release workflow to trigger on the frontend branch and ignore backend changes. The backend release workflow is deleted as it is no longer needed.

### What changed
* Deleted the backend-release.yml workflow file
* Updated the frontend-release.yml workflow file to:
	+ Trigger on the frontend branch
	+ Ignore backend changes
	+ Install dependencies without ignoring peer conflicts
	+ Run Semantic Release with the correct repository URL

### Why it likely changed

The change likely occurred to decouple the frontend and backend release workflows, allowing for independent releases and reducing the complexity of the release process.

### Impact on system

The change will allow for more flexible and independent releases of the frontend and backend components. However, it may also introduce new risks if not properly tested.

### Possible risks

* The frontend release workflow may not correctly handle changes to the frontend codebase
* The backend release workflow may still be referenced in other parts of the system, causing issues
* The decoupling of the frontend and backend release workflows may introduce new complexity and errors

### Migration notes

* Ensure that the frontend release workflow is properly tested and validated
* Review and update any references to the backend release workflow
* Consider implementing additional testing and validation to ensure the decoupling of the frontend and backend release workflows does not introduce new issues

### Test recommendations

* Perform a thorough review of the frontend release workflow to ensure it correctly handles changes to the frontend codebase
* Test the frontend release workflow with a variety of scenarios, including changes to the frontend codebase and backend codebase
* Verify that the backend release workflow is properly deleted and not referenced in any other parts of the system

### Final release note

"Updated frontend release workflow to trigger on frontend branch and ignore backend changes, decoupling frontend and backend release processes."
```