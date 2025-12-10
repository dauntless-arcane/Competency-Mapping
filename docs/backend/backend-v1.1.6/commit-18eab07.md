### High-level Summary

This commit adds metrics tracking and portals to view the same to the deployment. It includes setting up Prometheus, Grafana, and OpenTelemetry for monitoring and tracing. The changes also involve updating the `.gitignore` file to ignore logs and metrics directories, and modifying the `app.js` file to collect metrics and create a `/metrics` endpoint.

### What Changed

* Added Prometheus and Grafana setup to the deployment
* Integrated OpenTelemetry for tracing
* Updated `.gitignore` file to ignore logs and metrics directories
* Modified `app.js` file to collect metrics and create a `/metrics` endpoint
* Added a `/metrics` endpoint to serve Prometheus metrics
* Updated `ecosystem.config.js` to start Prometheus and Grafana services
* Created a new `install.ps1` and `install.sh` scripts to install Prometheus and Grafana on Windows and Linux/MacOS respectively
* Added a new `monitoring/grafana-dashboard.json` file to create a Grafana dashboard

### Why it Likely Changed

The changes were likely made to improve the monitoring and tracing capabilities of the system, allowing for better performance analysis and issue debugging. The addition of Prometheus and Grafana provides a comprehensive monitoring solution, while OpenTelemetry enables distributed tracing.

### Impact on System

The changes will have a significant impact on the system, providing real-time monitoring and tracing capabilities. This will enable developers to:

* Monitor system performance and identify bottlenecks
* Debug issues and identify root causes
* Improve system reliability and scalability
* Make data-driven decisions based on metrics and performance data

### Possible Risks

* The addition of new services and dependencies may introduce new risks, such as:
	+ Increased complexity and potential for errors
	+ Security vulnerabilities in new services or dependencies
	+ Performance issues due to increased resource utilization
* The use of OpenTelemetry may require additional configuration and setup, which can be complex and error-prone

### Migration Notes

* The changes require updating the `ecosystem.config.js` file to start Prometheus and Grafana services
* The `install.ps1` and `install.sh` scripts need to be run to install Prometheus and Grafana on Windows and Linux/MacOS respectively
* The `monitoring/grafana-dashboard.json` file needs to be updated to match the new metrics and tracing setup

### Test Recommendations

* Test the new `/metrics` endpoint to ensure it is serving Prometheus metrics correctly
* Test the Grafana dashboard to ensure it is displaying metrics and tracing data correctly
* Test the OpenTelemetry integration to ensure it is working correctly and providing accurate tracing data

### Final Release Note

"Added metrics tracking and portals to view the same to the deployment, including Prometheus, Grafana, and OpenTelemetry setup."

### Full Markdown Explanation

**Deep Commit Analysis**

### High-level Summary

This commit adds metrics tracking and portals to view the same to the deployment. It includes setting up Prometheus, Grafana, and OpenTelemetry for monitoring and tracing.

### What Changed

* Added Prometheus and Grafana setup to the deployment
* Integrated OpenTelemetry for tracing
* Updated `.gitignore` file to ignore logs and metrics directories
* Modified `app.js` file to collect metrics and create a `/metrics` endpoint
* Added a `/metrics` endpoint to serve Prometheus metrics
* Updated `ecosystem.config.js` to start Prometheus and Grafana services
* Created a new `install.ps1` and `install.sh` scripts to install Prometheus and Grafana on Windows and Linux/MacOS respectively
* Added a new `monitoring/grafana-dashboard.json` file to create a Grafana dashboard

### Why it Likely Changed

The changes were likely made to improve the monitoring and tracing capabilities of the system, allowing for better performance analysis and issue debugging. The addition of Prometheus and Grafana provides a comprehensive monitoring solution, while OpenTelemetry enables distributed tracing.

### Impact on System

The changes will have a significant impact on the system, providing real-time monitoring and tracing capabilities. This will enable developers to:

* Monitor system performance and identify bottlenecks
* Debug issues and identify root causes
* Improve system reliability and scalability
* Make data-driven decisions based on metrics and performance data

### Possible Risks

* The addition of new services and dependencies may introduce new risks, such as:
	+ Increased complexity and potential for errors
	+ Security vulnerabilities in new services or dependencies
	+ Performance issues due to increased resource utilization
* The use of OpenTelemetry may require additional configuration and setup, which can be complex and error-prone

### Migration Notes

* The changes require updating the `ecosystem.config.js` file to start Prometheus and Grafana services
* The `install.ps1` and `install.sh` scripts need to be run to install Prometheus and Grafana on Windows and Linux/MacOS respectively
* The `monitoring/grafana-dashboard.json` file needs to be updated to match the new metrics and tracing setup

### Test Recommendations

* Test the new `/metrics` endpoint to ensure it is serving Prometheus metrics correctly
* Test the Grafana dashboard to ensure it is displaying metrics and tracing data correctly
* Test the OpenTelemetry integration to ensure it is working correctly and providing accurate tracing data

### Final Release Note

"Added metrics tracking and portals to view the same to the deployment, including Prometheus, Grafana, and OpenTelemetry setup."