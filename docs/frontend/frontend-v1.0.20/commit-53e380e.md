### Commit Analysis

#### 1. High-level summary

This commit updates the frontend release workflow for Next.js deployment with auto versioning. The changes include updating the GitHub Actions workflow to generate a new frontend version tag, configure Git identity, and deploy the updated code to a server.

#### 2. What changed (bullet points)

* Renamed the workflow to "Next.js Deploy with Auto Versioning (CAPS)"
* Updated the workflow to generate a new frontend version tag with auto versioning
* Configured Git identity using `github-actions[bot]`
* Updated the workflow to deploy the updated code to a server using SSH
* Added steps to install dependencies, build Next.js, and restart PM2 (Production)
* Removed the step to create a GitHub Release

#### 3. Why it likely changed

The changes were likely made to update the frontend release workflow to use auto versioning and to deploy the updated code to a server using SSH. This allows for more automated and efficient deployment of the frontend code.

#### 4. Impact on system

The changes will impact the system by automating the deployment of the frontend code to a server using SSH. This will reduce the manual effort required to deploy the code and make the process more efficient.

#### 5. Possible risks

* The use of SSH to deploy the code may introduce security risks if not properly configured.
* The auto versioning feature may cause issues if not properly tested.

#### 6. Migration notes (if needed)

* Make sure to update the `DEPLOY_KEY` and `SERVER_IP` secrets in the GitHub Actions workflow.
* Test the auto versioning feature to ensure it works as expected.
* Verify that the deployment to the server is successful.

#### 7. Test recommendations

* Test the auto versioning feature to ensure it works as expected.
* Verify that the deployment to the server is successful.
* Test the deployment process with different versions of the code.

#### 8. Final release note (1 line)

"Updated frontend release workflow to use auto versioning and deploy to server using SSH."

#### 9. Full markdown explanation

### Commit Analysis

#### 1. High-level summary

This commit updates the frontend release workflow for Next.js deployment with auto versioning. The changes include updating the GitHub Actions workflow to generate a new frontend version tag, configure Git identity, and deploy the updated code to a server.

#### 2. What changed (bullet points)

* Renamed the workflow to "Next.js Deploy with Auto Versioning (CAPS)"
* Updated the workflow to generate a new frontend version tag with auto versioning
* Configured Git identity using `github-actions[bot]`
* Updated the workflow to deploy the updated code to a server using SSH
* Added steps to install dependencies, build Next.js, and restart PM2 (Production)
* Removed the step to create a GitHub Release

#### 3. Why it likely changed

The changes were likely made to update the frontend release workflow to use auto versioning and to deploy the updated code to a server using SSH. This allows for more automated and efficient deployment of the frontend code.

#### 4. Impact on system

The changes will impact the system by automating the deployment of the frontend code to a server using SSH. This will reduce the manual effort required to deploy the code and make the process more efficient.

#### 5. Possible risks

* The use of SSH to deploy the code may introduce security risks if not properly configured.
* The auto versioning feature may cause issues if not properly tested.

#### 6. Migration notes (if needed)

* Make sure to update the `DEPLOY_KEY` and `SERVER_IP` secrets in the GitHub Actions workflow.
* Test the auto versioning feature to ensure it works as expected.
* Verify that the deployment to the server is successful.

#### 7. Test recommendations

* Test the auto versioning feature to ensure it works as expected.
* Verify that the deployment to the server is successful.
* Test the deployment process with different versions of the code.

#### 8. Final release note (1 line)

"Updated frontend release workflow to use auto versioning and deploy to server using SSH."

### Full Code Explanation

```diff
commit 53e380e5c628d15057c45dae7136b7b03a1aafb4
Author: Pratyush <79155396+Mpratyush54@users.noreply.github.com>
Date:   Tue Dec 2 09:32:46 2025 +0530

    feat: update frontend release workflow for Next.js deployment with auto versioning

diff --git a/.github/workflows/frontend-release.yml b/.github/workflows/frontend-release.yml
index e8c9567..b4efdae 100644
--- a/.github/workflows/frontend-release.yml
+++ b/.github/workflows/frontend-release.yml
@@ -1,4 +1,4 @@
-name: Frontend Auto Release
+name: 🚀 Next.js Deploy with Auto Versioning (CAPS)
 
 on:
   push:
@@ -9,47 +9,81 @@ permissions:
   contents: write
 
 jobs:
-  release:
+  build-release-deploy:
     runs-on: ubuntu-latest
 
     steps:
-      - name: Checkout repository
+      # 1️⃣ Checkout Code
+      - name: 🧩 Checkout repository
         uses: actions/checkout@v4
         with:
           fetch-depth: 0
           token: ${{ secrets.GITHUB_TOKEN }}
 
-      - name: Configure Git
+      # 2️⃣ Configure Git Identity
+      - name: 🛠️ Configure Git
         run: |
           git config user.name "github-actions[bot]"
           git config user.email "github-actions[bot]@users.noreply.github.com"
 
-      - name: Generate new frontend version tag
+      # 3️⃣ Auto Version Tag (frontend-v0.0.X)
+      - name: 🏷️ Generate frontend tag
         id: tag
         run: |
-          echo "🏷️ Generating new frontend version tag"
           git fetch --tags
-          latest_tag=$(git describe --tags --abbrev=0 --match "frontend-v*" 2>/dev/null || echo "frontend-v0.0.0")
 
-          # Parse version numbers
+          latest_tag=$(git describe --tags --abbrev=0 --match "frontend-v*" 2>/dev/null || echo "frontend-v0.0.0")
           version=${latest_tag#frontend-v}
+
           major=$(echo $version | cut -d. -f1)
           minor=$(echo $version | cut -d. -f2)
           patch=$(echo $version | cut -d. -f3)
+
           new_patch=$((patch + 1))
           new_tag="frontend-v${major}.${minor}.${new_patch}"
 
-          echo "➡️ New tag: $new_tag"
-          git tag -a "$new_tag" -m "🔖 Auto frontend release: $new_tag"
+          echo "New tag: $new_tag"
+          git tag -a "$new_tag" -m "Auto frontend release: $new_tag"
           git push origin "$new_tag"
+
           echo "tag=$new_tag" >> $GITHUB_OUTPUT
 
-      - name: Create GitHub Release
-        uses: actions/create-release@v1
-        env:
-          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
+      # 4️⃣ Setup Node.js
+      - name: ⚙️ Setup Node.js
+        uses: actions/setup-node@v4
         with:
-          tag_name: ${{ steps.tag.outputs.tag }}
-          release_name: "🚀 Frontend Release ${{ steps.tag.outputs.tag }}"
-          body: |
-            Automated frontend release created from frontend branch push.
+          node-version: 20
+
+      # 5️⃣ Install Dependencies
+      - name: 📦 Install dependencies
+        run: npm ci
+
+      # 6️⃣ Build Next.js
+      - name: 🏗️ Build Next.js
+        run: npm run build
+
+      # 7️⃣ Configure SSH for Deployment
+      - name: 🔐 Configure SSH
+        run: |
+          mkdir -p ~/.ssh
+          echo "${{ secrets.DEPLOY_KEY }}" > ~/.ssh/id_ed25519
+          chmod 600 ~/.ssh/id_ed25519
+          ssh-keyscan -H ${{ secrets.SERVER_IP }} >> ~/.ssh/known_hosts
+
+      # 8️⃣ Deploy to caps.pratyushh.online
+      - name: 🚚 Deploy to Server
+        run: |
+          rsync -avz --delete \
+            .next/ \
+            public/ \
+            package.json \
+            next.config.js \
+            github@${{ secrets.SERVER_IP }}:/var/www/caps.pratyushh.online/
+
+      # 9️⃣ Restart PM2 (Production)
+      - name: 🔄 Restart PM2
+        run: |
+          ssh github@${{ secrets.SERVER_IP }} "
+            cd /var/www/caps.pratyushh.online/ &&
+            pm2 restart caps-app || pm2 start npm --name caps-app -- run start
+          "
```