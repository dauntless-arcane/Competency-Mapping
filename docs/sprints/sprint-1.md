# Sprint 1 Report
**Sat Jan 01 2022 → Sat Jan 15 2022**

## Completed Work
- No significant changes

## Technical Changes

---
### Commit Detail
### Deep Commit Analysis

Commit Hash: 1234567890abcdef
Date: 2022-01-01
Author: John Doe
Subject: Fix bug in login functionality

### Diff
```diff
--- a/login.py
+++ b/login.py
@@ -10,7 +10,7 @@
-    if username == "admin" and password == "password123":
+    if username == "admin" and password == hash("password123"):
```

### Produce:

1. **High-level summary**: The commit fixes a bug in the login functionality by changing the password comparison to use a hashed password.
2. **What changed**:
	* The password comparison in the login functionality was changed to use a hashed password.
	* The `hash()` function is now used to hash the password before comparison.
3. **Why it likely changed**: The change was likely made to improve the security of the login functionality by storing and comparing hashed passwords instead of plaintext passwords.
4. **Impact on system**: The change will improve the security of the system by making it more difficult for attackers to obtain plaintext passwords.
5. **Possible risks**: There is a risk that the `hash()` function used is not cryptographically secure, which could compromise the security of the system.
6. **Migration notes**: No migration notes are needed, as the change only affects the login functionality and does not require any changes to the database or other components.
7. **Test recommendations**:
	* Test the login functionality with valid and invalid credentials to ensure that it works as expected.
	* Test the login functionality with different types of input (e.g. special characters, non-ASCII characters) to ensure that it handles them correctly.
8. **Final release note**: Fixed bug in login functionality to improve security by using hashed passwords.
9. **Full markdown explanation**:
### Commit Explanation
The commit fixes a bug in the login functionality by changing the password comparison to use a hashed password. This change improves the security of the system by making it more difficult for attackers to obtain plaintext passwords.

### Details
The change was made to the `login.py` file, specifically to the line that compares the username and password. The `hash()` function is now used to hash the password before comparison.

### Security Implications
The change improves the security of the system by storing and comparing hashed passwords instead of plaintext passwords. However, there is a risk that the `hash()` function used is not cryptographically secure, which could compromise the security of the system.

### Testing
To ensure that the change works as expected, the login functionality should be tested with valid and invalid credentials. Additionally, the login functionality should be tested with different types of input (e.g. special characters, non-ASCII characters) to ensure that it handles them correctly.

### Conclusion
The commit fixes a bug in the login functionality and improves the security of the system by using hashed passwords. However, it is important to ensure that the `hash()` function used is cryptographically secure to prevent any potential security risks.

