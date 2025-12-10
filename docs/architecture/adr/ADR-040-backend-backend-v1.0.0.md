# backend-backend-v1.0.0
## Status
Accepted

## Context
This ADR documents the design and implementation of the backend API for saving user data to a database. The commits referenced in this ADR are:

- 76076c7: feat: added the saving api for saving data of users to DB
- aea3d22: Initial commit: setup Next.js test app

## Problem Statement
The problem is to design and implement a backend API that can save user data to a database. The API should be scalable, secure, and easy to maintain.

## Decision Drivers
- Scalability: The API should be able to handle a large number of requests without a significant decrease in performance.
- Security: The API should protect user data from unauthorized access and ensure that data is stored securely.
- Maintainability: The API should be easy to understand, modify, and extend.

## Considered Options
- Using a relational database management system (RDBMS) such as MySQL or PostgreSQL.
- Using a NoSQL database such as MongoDB or Cassandra.
- Using a cloud-based database service such as AWS DynamoDB or Google Cloud Firestore.
- Implementing a custom database solution using a programming language such as Node.js.

## Decision Outcome
Based on the decision drivers, the chosen option is to use a cloud-based database service, specifically AWS DynamoDB. This decision is based on the following reasons:

- Scalability: DynamoDB is designed to handle large amounts of data and can scale horizontally to meet increasing demand.
- Security: DynamoDB provides robust security features such as encryption, access control, and auditing.
- Maintainability: DynamoDB is a managed service, which means that Amazon handles database maintenance, backups, and updates, freeing up development time for more critical tasks.

## Pros & Cons
Pros:

- Scalability: DynamoDB can handle large amounts of data and scale horizontally to meet increasing demand.
- Security: DynamoDB provides robust security features such as encryption, access control, and auditing.
- Maintainability: DynamoDB is a managed service, which means that Amazon handles database maintenance, backups, and updates.

Cons:

- Vendor lock-in: Using a cloud-based database service means that the application is tied to a specific vendor (Amazon).
- Cost: DynamoDB can be more expensive than self-managed databases.

## Consequences
The decision to use DynamoDB has the following consequences:

- The application will be more scalable and secure.
- The application will require less maintenance and development time.
- The application will be tied to Amazon and may incur higher costs.

## Implementation Notes
The implementation of the backend API will involve the following steps:

- Create an AWS DynamoDB table to store user data.
- Implement the API using Node.js and the AWS SDK.
- Use AWS IAM to manage access to the DynamoDB table.
- Implement data validation and error handling to ensure data integrity.

## Rollback Plan
In the event that the decision to use DynamoDB is not successful, the rollback plan is to:

- Migrate the application to a self-managed database such as MySQL or PostgreSQL.
- Update the API to use the new database.
- Update the application to use the new database.

## Security Considerations
The security considerations for this decision are:

- Data encryption: Use AWS KMS to encrypt data stored in DynamoDB.
- Access control: Use AWS IAM to manage access to the DynamoDB table.
- Auditing: Use AWS CloudTrail to audit database activity.

## Testing Strategy
The testing strategy for this decision is to:

- Unit test the API using Jest and the AWS SDK.
- Integration test the API using AWS CloudFormation and the AWS SDK.
- Perform load testing to ensure the API can handle large amounts of traffic.

## Future Improvements
Future improvements to this decision include:

- Implementing a caching layer to improve performance.
- Using a more advanced data modeling approach such as graph databases.
- Implementing a more robust security framework such as OAuth 2.0.