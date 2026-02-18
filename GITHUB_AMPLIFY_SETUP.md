# GitHub + AWS Amplify Connection Setup

**Status**: AWS Amplify App Created ✅  
**App ID**: d2hpwj8zshf98p  
**App Name**: imasystems  
**Region**: us-east-1  

---

## Step 1: Generate GitHub Personal Access Token

To connect your GitHub repository to AWS Amplify, you need a Personal Access Token:

1. **Go to GitHub Settings**
   - URL: https://github.com/settings/tokens
   - Or: Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Click "Generate new token (classic)"**

3. **Configure Token**
   - **Token name**: `AWS Amplify IMA Systems`
   - **Expiration**: 90 days (or longer for production)
   
4. **Select Scopes**
   ```
   ✓ repo                    (Full control of private repositories)
   ✓ admin:repo_hook         (Write access to hooks and webhooks)
   ✓ user:email              (Access to user profile data)
   ```

5. **Generate and Copy Token**
   - Click "Generate token"
   - **⚠️ Copy the token immediately** (you won't be able to see it again)
   - Format: `ghp_...` (40+ characters)

---

## Step 2: Connect GitHub to Amplify (Choose One)

### Option A: AWS Amplify Console (Recommended - Easier)

1. Go to AWS Amplify Console
   - URL: https://console.aws.amazon.com/amplify/

2. Select your app: **imasystems** (d2hpwj8zshf98p)

3. Click **"Host web app"** or **"Connect repository"**

4. Select **GitHub** as source

5. Click **"Authorize AWS Amplify"**
   - This opens GitHub OAuth flow
   - GitHub will ask for permissions
   - Click "Authorize aws-amplify"

6. Select Repository
   - Select: `diawest82/imasystems`
   - Branch: `main`
   - Click **Connect**

7. Configure Build Settings
   - Amplify detects your `amplify.yml`
   - Framework: Next.js (auto-detected)
   - Build command: `npm run build`
   - Output directory: `.next`
   - Click **Next**

8. Review and Deploy
   - Click **Save and deploy**
   - Amplify will trigger first build (5-10 minutes)

---

### Option B: AWS CLI (Advanced)

If Option A doesn't work, use CLI with your GitHub token:

```bash
# Set GitHub token
export GITHUB_TOKEN="ghp_your_token_here"

# Connect repository to Amplify app
aws amplify create-app-connectivity-settings \
  --app-id d2hpwj8zshf98p \
  --repository https://github.com/diawest82/imasystems \
  --source-repository-type GITHUB \
  --access-token "$GITHUB_TOKEN" \
  --region us-east-1

# Or update existing app to connect repository
aws amplify update-app \
  --app-id d2hpwj8zshf98p \
  --repository https://github.com/diawest82/imasystems \
  --oauth-token "$GITHUB_TOKEN" \
  --region us-east-1
```

---

## Step 3: First Deployment

After connecting GitHub, Amplify will automatically:

1. **Clone your repository** from GitHub
2. **Detect build configuration** from `amplify.yml`
3. **Install dependencies**:
   ```bash
   # Frontend
   cd website && npm install
   
   # Backend
   pip install -r backend/requirements.txt
   ```
4. **Build frontend**: `npm run build`
5. **Build backend**: Echo "Backend ready"
6. **Deploy** to CloudFront (frontend) + EC2/ECS (backend)

Expected build time: **5-10 minutes**

---

## Step 4: Monitor Build

In AWS Amplify Console:

1. Select app: **imasystems**
2. Go to **Deployments** tab
3. Watch the build progress
4. Status will show:
   - ⏳ Build in progress
   - ✅ Build succeeded
   - ❌ Build failed

---

## Step 5: Access Your Live App

Once deployment completes:

**Frontend (Next.js Website)**
- Default domain: `https://d2hpwj8zshf98p.amplifyapp.com`
- Custom domain: `https://imasystems.ai` (needs DNS config)

**Backend (FastAPI API)**
- Default domain: `https://<backend-url>.amplifyapp.com`
- Custom domain: `https://api.imasystems.ai` (needs DNS config)

---

## Step 6: Configure Custom Domains (Optional)

After deployment succeeds:

1. Go to **App settings** → **Custom domains**
2. Add domains:
   - `imasystems.ai` → Frontend URL
   - `api.imasystems.ai` → Backend URL
3. Update DNS records at your domain registrar
4. Amplify will provision SSL certificates automatically

---

## Verification Checklist

After Amplify deployment:

- [ ] App created in AWS Amplify (✅ d2hpwj8zshf98p)
- [ ] GitHub repository connected
- [ ] First build completed successfully
- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Health check endpoint responding
- [ ] Admin login working
- [ ] Custom domains configured (optional)

---

## Troubleshooting

### Build Fails with "Module not found"

**Solution**: Ensure all source files are committed to git:
```bash
git status
git add -A
git commit -m "Add missing source files"
git push origin main
```

### Backend not starting

**Solutions**:
1. Check `amplify.yml` has Python install phase
2. Verify `requirements.txt` exists in backend/
3. Check CloudWatch logs for detailed errors

### CORS errors from frontend to backend

**Solution**: Update backend `.env.production`:
```
ALLOWED_ORIGINS=https://imasystems.ai,https://www.imasystems.ai,https://d2hpwj8zshf98p.amplifyapp.com
```

### Still need GitHub token?

Generate one here: https://github.com/settings/tokens/new

---

## Current Setup Summary

```
Repository: https://github.com/diawest82/imasystems
Default Branch: main
AWS Region: us-east-1
App ID: d2hpwj8zshf98p
App Name: imasystems
Platform: WEB_COMPUTE
Auto-Build: Enabled
```

**Status**: Ready for GitHub connection ✅

Next: Follow **Option A** (AWS Console) or **Option B** (AWS CLI) above
