# AWS Deployment Setup for imasystems.ai

## Prerequisites
- AWS Account (with imasystems.ai domain in Namecheap)
- GitHub account (to host code)
- GitHub repository with your code

---

## STEP 1: Prepare GitHub Repository

Your code needs to be in a GitHub repository (public or private).

```bash
# If not already a git repo:
cd /Users/diawest/projects/imasystems
git init
git add .
git commit -m "Initial commit"
```

Then create a repository on GitHub and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/imasystems.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy Frontend with AWS Amplify

### 2.1 Connect GitHub to Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"Create app"** > **"Host web app"**
3. Select **GitHub** as your source
4. Click **"Connect branch"** and authorize GitHub
5. Select your `imasystems` repository
6. Select the `main` branch
7. Click **"Next"**

### 2.2 Configure Build Settings

Amplify should auto-detect Next.js. Confirm these settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

Click **"Save and deploy"**

Deployment will take 3-5 minutes. Once complete, you'll get a URL like:
`https://main.d123abc.amplifyapp.com`

---

## STEP 3: Connect Custom Domain (imasystems.ai)

### 3.1 In AWS Amplify Console

1. Go to your Amplify app dashboard
2. Click **"Domain management"** (left sidebar)
3. Click **"Add domain"**
4. Enter `imasystems.ai`
5. Click **"Configure domain"**

AWS will show you the DNS records you need to add.

### 3.2 Update Namecheap DNS

1. Go to [Namecheap Dashboard](https://www.namecheap.com/myaccount/)
2. Find imasystems.ai > Click **"Manage"**
3. Go to **"Advanced DNS"** tab
4. Add/update records as shown by Amplify:
   - **Type:** A (or CNAME, depending on Amplify's instruction)
   - **Host:** @ (for root domain)
   - **Value:** Amplify endpoint
   - **TTL:** 3600

5. Save changes (DNS propagation takes 24-48 hours, but usually faster)

### 3.3 Verify in Amplify

Once DNS is updated, Amplify will show green checkmarks confirming domain is connected.

---

## STEP 4: Deploy Python Backend

You have 3 options:

### Option A: AWS Lightsail (Easiest)
```bash
# 1. Create Lightsail instance (Ubuntu)
# 2. SSH into instance
# 3. Install Python, pip, requirements
# 4. Run your Flask/FastAPI app on port 8000
# 5. Set up reverse proxy (nginx)
```

### Option B: EC2 (More control)
```bash
# Similar to Lightsail but more complex
# Good if you need advanced config
```

### Option C: AWS Lambda (Serverless - if using FastAPI)
```bash
# Deploy Python functions directly
# No server management needed
```

**Recommendation:** Start with **Lightsail** - it's the easiest.

---

## STEP 5: Configure Backend API Connection

Update your frontend to call the backend:

In `/website/lib/api.js`:
```javascript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const fetchPatents = async () => {
  const response = await fetch(`${API_BASE_URL}/api/patents`);
  return response.json();
};
```

In `/website/.env.local` (development):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, set environment variable in Amplify:
- Amplify Console > App Settings > Environment Variables
- Add: `NEXT_PUBLIC_API_URL=https://api.imasystems.ai` (or your backend URL)

---

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub connected to Amplify
- [ ] Frontend deployed successfully
- [ ] Domain connected to Amplify
- [ ] DNS records updated at Namecheap
- [ ] Domain resolves to website
- [ ] Backend infrastructure planned (Lightsail/EC2/Lambda)
- [ ] API connection configured

---

## Next Steps

1. **Ready to deploy?** Let me know and I'll help you:
   - Set up Lightsail for the backend
   - Configure environment variables
   - Connect frontend to backend

2. **Questions?** About Amplify, DNS, or backend options?

---

## Useful Links

- [AWS Amplify Docs](https://docs.amplify.aws/)
- [Connect Custom Domain](https://docs.amplify.aws/gen1/react/build-a-backend/hosting/connect-custom-domain/)
- [Namecheap DNS Management](https://www.namecheap.com/support/knowledgebase/article.aspx/319/78/how-do-i-link-my-domain-to-my-hosting-account)
