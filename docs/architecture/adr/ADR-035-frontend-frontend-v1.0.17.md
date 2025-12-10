**Architectural Decision Record (ADR)**
=====================================

### Title
frontend-frontend-v1.0.17

### Status
Draft

### Context
The frontend codebase has undergone a series of updates, including the commit 3cc00d1. This commit refactors the ResultsPage to display the level instead of the score in the TestCard component.

### Problem Statement
The previous implementation of displaying scores in the TestCard component was not providing the desired user experience. The decision to refactor the ResultsPage to display levels instead of scores aims to improve the user interface and provide a more meaningful representation of test results.

### Decision Drivers
The decision to refactor the ResultsPage was driven by the following factors:

* Improve user experience by providing a more meaningful representation of test results
* Align with the product vision of displaying levels instead of scores
* Simplify the UI and reduce cognitive load on users

### Considered Options
The following options were considered:

* Update the ResultsPage to display both levels and scores
* Introduce a new component to display levels and scores separately
* Keep the existing implementation of displaying scores

### Decision Outcome
The decision was made to refactor the ResultsPage to display levels instead of scores in the TestCard component.

### Pros & Cons
**Pros:**

* Improved user experience by providing a more meaningful representation of test results
* Simplified UI and reduced cognitive load on users
* Aligns with the product vision of displaying levels instead of scores

**Cons:**

* Requires changes to the existing codebase
* May require additional testing and validation

### Consequences
The consequences of this decision include:

* Improved user experience and engagement
* Simplified UI and reduced maintenance costs
* Alignment with the product vision and strategy

### Implementation Notes
The implementation of this decision involved the following steps:

* Refactor the ResultsPage to display levels instead of scores
* Update the TestCard component to display levels
* Test and validate the changes to ensure they meet the product requirements

### Rollback Plan
In case the decision needs to be rolled back, the following steps will be taken:

* Revert the changes made to the ResultsPage and TestCard component
* Restore the original implementation of displaying scores
* Test and validate the changes to ensure they meet the product requirements

### Security Considerations
The security considerations for this decision include:

* Ensure that the changes do not introduce any security vulnerabilities
* Validate that the new implementation meets the security requirements and standards

### Testing Strategy
The testing strategy for this decision includes:

* Unit testing to ensure that the changes meet the product requirements
* Integration testing to ensure that the changes integrate correctly with other components
* User acceptance testing to ensure that the changes meet the user requirements

### Future Improvements
Future improvements to this decision include:

* Continuously monitoring user feedback and making adjustments as needed
* Exploring additional ways to improve the user experience and simplify the UI
* Ensuring that the implementation meets the evolving product requirements and standards