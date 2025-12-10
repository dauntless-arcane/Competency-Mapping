# Sprint 21 Report
**Sun Nov 16 2025 → Sun Nov 30 2025**

## Completed Work
- No significant changes

## Technical Changes

---
### Commit Detail
### Deep Commit Analysis

#### Commit Hash: 1b4e964de2f2ca6fda7afc6e13f75b0433048473
#### Date: 2025-11-16 15:51:59 +0000
#### Author: github-actions[bot]
#### Subject: 🔁 Sync from backend → main (auto-merge)

### 1. High-level summary

This commit is an automated merge from the backend branch to the main branch, triggered by a GitHub Actions bot.

### 2. What changed

* The codebase has been updated with changes from the backend branch.
* The update was performed automatically by a GitHub Actions bot.

### 3. Why it likely changed

The commit was triggered by a GitHub Actions workflow, which likely detected changes in the backend branch and decided to merge them into the main branch automatically.

### 4. Impact on system

The changes from the backend branch are now part of the main branch, which may affect the behavior of the system. However, since this was an automated merge, the changes are likely to be minor and incremental.

### 5. Possible risks

* The automated merge may have introduced unexpected changes or conflicts.
* The changes from the backend branch may not have been thoroughly tested.

### 6. Migration notes (if needed)

None required for this commit, as it was an automated merge.

### 7. Test recommendations

* Run a thorough test suite to ensure the changes did not introduce any regressions.
* Verify that the system behaves as expected with the new changes.

### 8. Final release note (1 line)

"Automated merge from backend branch to main branch."

### 9. Full markdown explanation

```markdown
### Deep Commit Analysis

#### Commit Hash: 1b4e964de2f2ca6fda7afc6e13f75b0433048473
#### Date: 2025-11-16 15:51:59 +0000
#### Author: github-actions[bot]
#### Subject: 🔁 Sync from backend → main (auto-merge)

### 1. High-level summary
This commit is an automated merge from the backend branch to the main branch, triggered by a GitHub Actions bot.

### 2. What changed
* The codebase has been updated with changes from the backend branch.
* The update was performed automatically by a GitHub Actions bot.

### 3. Why it likely changed
The commit was triggered by a GitHub Actions workflow, which likely detected changes in the backend branch and decided to merge them into the main branch automatically.

### 4. Impact on system
The changes from the backend branch are now part of the main branch, which may affect the behavior of the system. However, since this was an automated merge, the changes are likely to be minor and incremental.

### 5. Possible risks
* The automated merge may have introduced unexpected changes or conflicts.
* The changes from the backend branch may not have been thoroughly tested.

### 6. Migration notes (if needed)
None required for this commit, as it was an automated merge.

### 7. Test recommendations
* Run a thorough test suite to ensure the changes did not introduce any regressions.
* Verify that the system behaves as expected with the new changes.

### 8. Final release note (1 line)
"Automated merge from backend branch to main branch."
```

---
### Commit Detail
### High-level summary

This commit introduces metrics tracking and portals to view the same using Prometheus and Grafana. It adds OpenTelemetry tracing and modifies the Express.js app to collect and expose metrics. Additionally, it sets up Prometheus and Grafana services using ecosystem.config.js.

### What changed (bullet points)

* Added metrics tracking using Prometheus and OpenTelemetry
* Modified Express.js app to collect and expose metrics
* Introduced Grafana dashboard to visualize metrics
* Set up Prometheus and Grafana services using ecosystem.config.js
* Updated .gitignore to ignore logs and prometheus directories
* Added install scripts for Prometheus and Grafana on Windows and Linux
* Modified app.js to include metrics middleware and tracing
* Introduced CORS setup and API routes

### Why it likely changed

This change likely occurred to introduce monitoring and logging capabilities to the system. This would allow developers and operators to gain insights into the application's performance, errors, and behavior. The addition of OpenTelemetry tracing and Prometheus metrics collection suggests a desire to instrument the application for monitoring and analysis.

### Impact on system

This change will have a significant impact on the system, as it introduces new dependencies and configurations. The addition of Prometheus and Grafana will require additional resources and infrastructure to manage. The OpenTelemetry tracing will also require configuration and setup to work properly.

### Possible risks

* Configuration errors: Incorrect configuration of Prometheus, Grafana, or OpenTelemetry may lead to errors or incorrect data.
* Resource constraints: The addition of Prometheus and Grafana may require additional resources, such as memory or CPU, which may lead to performance issues if not managed properly.
* Security risks: OpenTelemetry tracing and Prometheus metrics collection may introduce new security risks if not properly configured or secured.

### Migration notes (if needed)

* Update dependencies: Make sure to update the dependencies for Prometheus, Grafana, and OpenTelemetry to the latest versions.
* Configure services: Configure the Prometheus and Grafana services according to the ecosystem.config.js file.
* Update configurations: Update the configurations for OpenTelemetry tracing and Prometheus metrics collection to work properly.
* Test thoroughly: Test the system thoroughly to ensure that the new features work as expected and do not introduce any issues.

### Test recommendations

* Test the metrics collection and visualization using Prometheus and Grafana.
* Test the OpenTelemetry tracing to ensure it works correctly and provides accurate data.
* Test the CORS setup and API routes to ensure they work correctly and do not introduce any issues.

### Final release note (1 line)

"Introduced metrics tracking and portals using Prometheus and Grafana, with OpenTelemetry tracing and CORS setup for improved monitoring and logging."

### Full markdown explanation

**Deep Commit Analysis**

**Commit Hash:** 18eab07421eaf7c025a7e98da373c9a09dcc7dfa
**Date:** 2025-11-19 01:30:06 +0530
**Author:** Pratyush
**Subject:** feat(deployement):added matrics tracking and potals to view the same

**High-level summary**

This commit introduces metrics tracking and portals to view the same using Prometheus and Grafana. It adds OpenTelemetry tracing and modifies the Express.js app to collect and expose metrics. Additionally, it sets up Prometheus and Grafana services using ecosystem.config.js.

**What changed (bullet points)**

* Added metrics tracking using Prometheus and OpenTelemetry
* Modified Express.js app to collect and expose metrics
* Introduced Grafana dashboard to visualize metrics
* Set up Prometheus and Grafana services using ecosystem.config.js
* Updated .gitignore to ignore logs and prometheus directories
* Added install scripts for Prometheus and Grafana on Windows and Linux
* Modified app.js to include metrics middleware and tracing
* Introduced CORS setup and API routes

**Why it likely changed**

This change likely occurred to introduce monitoring and logging capabilities to the system. This would allow developers and operators to gain insights into the application's performance, errors, and behavior. The addition of OpenTelemetry tracing and Prometheus metrics collection suggests a desire to instrument the application for monitoring and analysis.

**Impact on system**

This change will have a significant impact on the system, as it introduces new dependencies and configurations. The addition of Prometheus and Grafana will require additional resources and infrastructure to manage. The OpenTelemetry tracing will also require configuration and setup to work properly.

**Possible risks**

* Configuration errors: Incorrect configuration of Prometheus, Grafana, or OpenTelemetry may lead to errors or incorrect data.
* Resource constraints: The addition of Prometheus and Grafana may require additional resources, such as memory or CPU, which may lead to performance issues if not managed properly.
* Security risks: OpenTelemetry tracing and Prometheus metrics collection may introduce new security risks if not properly configured or secured.

**Migration notes (if needed)**

* Update dependencies: Make sure to update the dependencies for Prometheus, Grafana, and OpenTelemetry to the latest versions.
* Configure services: Configure the Prometheus and Grafana services according to the ecosystem.config.js file.
* Update configurations: Update the configurations for OpenTelemetry tracing and Prometheus metrics collection to work properly.
* Test thoroughly: Test the system thoroughly to ensure that the new features work as expected and do not introduce any issues.

**Test recommendations**

* Test the metrics collection and visualization using Prometheus and Grafana.
* Test the OpenTelemetry tracing to ensure it works correctly and provides accurate data.
* Test the CORS setup and API routes to ensure they work correctly and do not introduce any issues.

**Final release note (1 line)**

"Introduced metrics tracking and portals using Prometheus and Grafana, with OpenTelemetry tracing and CORS setup for improved monitoring and logging."

