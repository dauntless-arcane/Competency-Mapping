### backend-backend-v1.1.4

#### Status
Accepted

#### Context
This ADR documents the architectural changes made in the backend service, specifically in the assessment feature. The changes were introduced in commit a41ee4e and are part of the v1.1.4 release.

#### Problem Statement
The assessment feature required the addition of Big Five test data and a dynamic scoring engine to provide a more comprehensive evaluation of users. The existing implementation was not sufficient to meet the requirements, and a new architecture was needed to support the dynamic scoring engine.

#### Decision Drivers
The decision drivers for this change were:

* The need for a more comprehensive evaluation of users
* The requirement for a dynamic scoring engine to support the assessment feature
* The existing implementation was not sufficient to meet the requirements

#### Considered Options
The following options were considered:

* Implement a static scoring engine
* Use an existing third-party library for scoring
* Develop a custom scoring engine using a specific programming language or framework

#### Decision Outcome
The decision was to develop a custom scoring engine using a dynamic programming approach. This decision was based on the need for a flexible and scalable solution that could handle complex scoring logic.

#### Pros & Cons
**Pros:**

* Custom scoring engine provides flexibility and scalability
* Dynamic programming approach allows for efficient computation of scores
* Ability to handle complex scoring logic

**Cons:**

* Development of custom scoring engine requires significant resources and expertise
* Potential for errors or bugs in the custom implementation
* May require additional testing and validation

#### Consequences
The consequences of this change are:

* The assessment feature now supports dynamic scoring
* The custom scoring engine provides a flexible and scalable solution
* The development of the custom scoring engine required significant resources and expertise

#### Implementation Notes
The implementation of the custom scoring engine involved:

* Development of a dynamic programming algorithm to compute scores
* Integration with the existing assessment feature
* Testing and validation of the custom scoring engine

#### Rollback Plan
In the event of a rollback, the following steps would be taken:

* Remove the custom scoring engine and revert to the previous implementation
* Update the assessment feature to use the previous scoring engine
* Test and validate the assessment feature to ensure correct functionality

#### Security Considerations
The security considerations for this change are:

* The custom scoring engine must be designed with security in mind to prevent potential vulnerabilities
* The use of dynamic programming may introduce additional security risks if not implemented correctly
* Regular security audits and testing should be performed to ensure the custom scoring engine is secure

#### Testing Strategy
The testing strategy for this change involves:

* Unit testing of the custom scoring engine to ensure correct functionality
* Integration testing of the assessment feature to ensure correct interaction with the custom scoring engine
* System testing to ensure the overall system is functioning correctly

#### Future Improvements
Future improvements to this feature may include:

* Optimization of the custom scoring engine for performance
* Addition of new scoring algorithms or features
* Integration with other features or systems to provide a more comprehensive evaluation of users