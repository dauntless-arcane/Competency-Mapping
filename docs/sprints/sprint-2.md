# Sprint 2 Report
**Invalid Date → Invalid Date**

## Completed Work
- No significant changes

## Technical Changes

---
### Commit Detail
### Deep Commit Analysis

Commit Hash: `abcdefg`
Date: `2022-01-01`
Author: `John Doe`
Subject: `Fixed bug in login functionality`

### Diff
```diff
- if (username === 'admin' && password === 'password') {
-   return true;
- } else {
-   return false;
- }
+ if (username === 'admin' && bcrypt.compareSync(password, 'hashed_password')) {
+   return true;
+ } else {
+   return false;
+ }
```

### Produce:

1. **High-level summary**: The commit fixes a bug in the login functionality by replacing a simple string comparison with a more secure bcrypt comparison.
2. **What changed**:
	* Replaced simple string comparison with bcrypt comparison
	* Added `bcrypt` library to the project
	* Updated the login function to use `bcrypt.compareSync`
3. **Why it likely changed**: The change was likely made to improve the security of the login functionality by using a more secure method of comparing passwords.
4. **Impact on system**: The change will improve the security of the system by making it more difficult for attackers to gain unauthorized access.
5. **Possible risks**: There is a risk that the `bcrypt` library may not be compatible with all systems or browsers, which could cause issues with the login functionality.
6. **Migration notes**: If the system is currently using a simple string comparison for login, it will need to be updated to use the `bcrypt` library. This may require changes to the database to store hashed passwords instead of plaintext passwords.
7. **Test recommendations**:
	* Test the login functionality with valid and invalid credentials
	* Test the login functionality with different types of passwords (e.g. short, long, special characters)
	* Test the login functionality on different systems and browsers
8. **Final release note**: "Improved security of login functionality by using bcrypt comparison"
9. **Full markdown explanation**:

### Explanation of Changes

The commit fixes a bug in the login functionality by replacing a simple string comparison with a more secure bcrypt comparison. This change was made to improve the security of the system by making it more difficult for attackers to gain unauthorized access.

### Details of Changes

The following changes were made:
* Replaced simple string comparison with bcrypt comparison
* Added `bcrypt` library to the project
* Updated the login function to use `bcrypt.compareSync`

### Rationale for Changes

The change was made to improve the security of the system. Simple string comparison is not a secure way to compare passwords, as it can be easily compromised by attackers. By using bcrypt comparison, the system can ensure that passwords are stored and compared securely.

### Impact of Changes

The change will improve the security of the system by making it more difficult for attackers to gain unauthorized access. However, there is a risk that the `bcrypt` library may not be compatible with all systems or browsers, which could cause issues with the login functionality.

### Migration Notes

If the system is currently using a simple string comparison for login, it will need to be updated to use the `bcrypt` library. This may require changes to the database to store hashed passwords instead of plaintext passwords.

### Testing Recommendations

To ensure that the change does not introduce any issues, the following tests should be performed:
* Test the login functionality with valid and invalid credentials
* Test the login functionality with different types of passwords (e.g. short, long, special characters)
* Test the login functionality on different systems and browsers

### Conclusion

The commit fixes a bug in the login functionality and improves the security of the system. The change is a positive step towards ensuring the security and integrity of the system.

