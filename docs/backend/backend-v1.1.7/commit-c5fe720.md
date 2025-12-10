### High-level summary

This commit adds user device fingerprinting for more robust verification and avoids cloning of IDs. It also introduces a suspicious mode in the login screen to detect suspicious requests. The suspicious mode has three modes: strict, loose, and off.

### What changed (bullet points)

* Added user device fingerprinting using `ua-parser-js`
* Introduced a suspicious mode in the login screen
* Added a `SUSPICIOUS_MODE` environment variable to enable or disable suspicious mode
* Added a `deviceName`, `deviceType`, `os`, `browser`, and `userAgent` fields to the `RefreshToken` model
* Updated the `loginSchema` to validate the `username` and `password` fields
* Updated the `forgotSchema` and `resetSchema` to validate the `username`, `dob`, and `otp` fields
* Added a `parseDeviceFromReq` function to extract device information from the request
* Added a `isSuspicious` function to check if a request is suspicious based on the IP and user agent
* Updated the `login` and `refresh` routes to use the new device fingerprinting and suspicious mode logic

### Why it likely changed

The changes in this commit suggest that the system was experiencing issues with cloning of IDs or unauthorized access. The addition of user device fingerprinting and suspicious mode logic is likely intended to improve the security and robustness of the system.

### Impact on system

The changes in this commit should improve the security and robustness of the system by:

* Preventing cloning of IDs
* Detecting suspicious requests
* Improving the accuracy of device fingerprinting

However, the changes may also introduce some performance overhead due to the additional database queries and calculations required for device fingerprinting and suspicious mode logic.

### Possible risks

* The introduction of suspicious mode logic may lead to false positives or false negatives, which could impact user experience or security.
* The use of `ua-parser-js` may introduce security risks if not properly configured or maintained.
* The addition of device fingerprinting may lead to issues with users who have multiple devices or use different browsers.

### Migration notes (if needed)

* The changes in this commit are backward compatible, but the new suspicious mode logic may require some adjustments to the system configuration or user behavior.
* The `SUSPICIOUS_MODE` environment variable should be set to one of the three modes (strict, loose, or off) to enable or disable suspicious mode.
* The `ua-parser-js` library should be properly configured and maintained to ensure accurate device fingerprinting.

### Test recommendations

* Test the system with different device types, browsers, and user agents to ensure accurate device fingerprinting.
* Test the suspicious mode logic with different scenarios, such as IP and user agent changes, to ensure accurate detection of suspicious requests.
* Test the system with different suspicious mode settings (strict, loose, or off) to ensure correct behavior.

### Final release note

"Improved security and robustness with user device fingerprinting and suspicious mode logic."

### Full markdown explanation

**Deep Commit Analysis**

### High-level summary

This commit adds user device fingerprinting for more robust verification and avoids cloning of IDs. It also introduces a suspicious mode in the login screen to detect suspicious requests. The suspicious mode has three modes: strict, loose, and off.

### What changed (bullet points)

* Added user device fingerprinting using `ua-parser-js`
* Introduced a suspicious mode in the login screen
* Added a `SUSPICIOUS_MODE` environment variable to enable or disable suspicious mode
* Added a `deviceName`, `deviceType`, `os`, `browser`, and `userAgent` fields to the `RefreshToken` model
* Updated the `loginSchema` to validate the `username` and `password` fields
* Updated the `forgotSchema` and `resetSchema` to validate the `username`, `dob`, and `otp` fields
* Added a `parseDeviceFromReq` function to extract device information from the request
* Added a `isSuspicious` function to check if a request is suspicious based on the IP and user agent
* Updated the `login` and `refresh` routes to use the new device fingerprinting and suspicious mode logic

### Why it likely changed

The changes in this commit suggest that the system was experiencing issues with cloning of IDs or unauthorized access. The addition of user device fingerprinting and suspicious mode logic is likely intended to improve the security and robustness of the system.

### Impact on system

The changes in this commit should improve the security and robustness of the system by:

* Preventing cloning of IDs
* Detecting suspicious requests
* Improving the accuracy of device fingerprinting

However, the changes may also introduce some performance overhead due to the additional database queries and calculations required for device fingerprinting and suspicious mode logic.

### Possible risks

* The introduction of suspicious mode logic may lead to false positives or false negatives, which could impact user experience or security.
* The use of `ua-parser-js` may introduce security risks if not properly configured or maintained.
* The addition of device fingerprinting may lead to issues with users who have multiple devices or use different browsers.

### Migration notes (if needed)

* The changes in this commit are backward compatible, but the new suspicious mode logic may require some adjustments to the system configuration or user behavior.
* The `SUSPICIOUS_MODE` environment variable should be set to one of the three modes (strict, loose, or off) to enable or disable suspicious mode.
* The `ua-parser-js` library should be properly configured and maintained to ensure accurate device fingerprinting.

### Test recommendations

* Test the system with different device types, browsers, and user agents to ensure accurate device fingerprinting.
* Test the suspicious mode logic with different scenarios, such as IP and user agent changes, to ensure accurate detection of suspicious requests.
* Test the system with different suspicious mode settings (strict, loose, or off) to ensure correct behavior.

### Final release note

"Improved security and robustness with user device fingerprinting and suspicious mode logic."