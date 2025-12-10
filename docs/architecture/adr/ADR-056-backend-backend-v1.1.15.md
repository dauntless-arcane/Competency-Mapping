### backend-backend-v1.1.15

#### Status
**Accepted**

#### Context
The commits in question (99ff219, 9ca07d2, cc0e298) introduce significant changes to the backend service, including integration with BullMQ for job processing, a Redis connection refactor, and updates to the indexWatcher and resultWatcher components. This ADR aims to document the reasoning behind these changes and the trade-offs made.

#### Problem Statement
The previous implementation of job processing and index building logic was not scalable and had performance issues. The distributed lock mechanism was also causing bottlenecks. The goal was to improve the system's reliability, scalability, and maintainability.

#### Decision Drivers
- Improve job processing performance and scalability
- Enhance index building logic
- Remove distributed lock mechanism
- Update dependencies and remove unused lock utility

#### Considered Options
- Implement a custom job processing system
- Use a different message queue system (e.g., RabbitMQ, Apache Kafka)
- Refactor the Redis connection and index building logic without using BullMQ
- Keep the existing implementation and address performance issues through optimization

#### Decision Outcome
The team decided to integrate BullMQ for job processing and refactor the Redis connection and index building logic. This decision was based on the following factors:

- BullMQ provides a scalable and reliable message queue system
- The Redis connection refactor improves performance and reduces complexity
- The index building logic enhancements improve data consistency and accuracy

#### Pros & Cons
**Pros:**

- Improved job processing performance and scalability
- Enhanced index building logic and data consistency
- Removed distributed lock mechanism, reducing bottlenecks
- Updated dependencies and removed unused lock utility

**Cons:**

- Increased complexity due to integration with BullMQ
- Potential learning curve for team members familiar with the previous implementation
- Additional dependencies and maintenance requirements

#### Consequences
The changes introduced in this commit will have the following consequences:

- Improved system reliability and scalability
- Enhanced performance and data consistency
- Reduced maintenance and support requirements
- Potential for future growth and expansion

#### Implementation Notes
The implementation involved the following steps:

- Integration with BullMQ for job processing
- Refactor of the Redis connection and index building logic
- Removal of the distributed lock mechanism
- Update of dependencies and removal of unused lock utility

#### Rollback Plan
To roll back the changes, the team would:

- Revert the commits (99ff219, 9ca07d2, cc0e298)
- Revert the changes to the Redis connection and index building logic
- Re-enable the distributed lock mechanism
- Revert the update of dependencies and re-add the unused lock utility

#### Security Considerations
The changes introduced in this commit do not have any significant security implications. However, the team should ensure that the BullMQ integration is properly secured and configured to prevent potential security vulnerabilities.

#### Testing Strategy
The team should perform thorough testing to ensure that the changes do not introduce any regressions or performance issues. This includes:

- Unit testing of the BullMQ integration and Redis connection refactor
- Integration testing of the index building logic and job processing
- Performance testing to ensure that the changes do not impact system performance

#### Future Improvements
Future improvements could include:

- Further optimization of the job processing and index building logic
- Exploration of alternative message queue systems (e.g., RabbitMQ, Apache Kafka)
- Refactoring of the Redis connection and index building logic for even better performance and scalability