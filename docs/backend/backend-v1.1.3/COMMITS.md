# Release backend-v1.1.3

## Commits (4)

- 2025-11-16 15:51:59 +0000 — 🔁 Sync from backend → main (auto-merge) (`1b4e964`)
- 2025-11-16 23:23:44 +0530 — feat: added user divece fingerprinting for more robust verification and avoid cloningof the ids -added ua-parser-js for getting the client detais from the request - added SUSPICIOUS_MODE from the env in login screen to see if the rewuest is suspisious mode -SUSPICIOUS_MODE has 3 modes     strict  = block when IP or UA changes   loose = block only when BOTH IP and UA change   off = disables suspicious detection(Not Recommended)   the isSuspicious is used to check suspicious request (`c5fe720`)
- 2025-11-16 17:53:59 +0000 — Merge remote-tracking branch 'origin/backend' (`c14c3f1`)
- 2025-11-16 17:53:59 +0000 — 🔁 Sync from backend → main (auto-merge) (`33e11b4`)
