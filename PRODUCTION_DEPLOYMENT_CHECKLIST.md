# 🚀 Production Deployment Checklist - IMA Systems Cloud Hub

**Date**: February 18, 2026  
**Status**: ✅ READY FOR PRODUCTION DEPLOYMENT

---

## ✅ Pre-Deployment Verification

### System Status
- [x] Backend running on localhost:8080
- [x] Frontend running on localhost:3001
- [x] Database initialized (app.db)
- [x] All 11 Python dependencies installed in Python 3.11 venv
- [x] User created: diallo@imasystems.ai

### API Endpoints (All Verified)
- [x] `GET /api/hub/login` - Login endpoint
- [x] `GET /api/hub/workspaces` - Returns 3 real workspaces
- [x] `GET /api/hub/resources` - Knowledge resources
- [x] `GET /api/hub/projects` - User projects
- [x] `POST /api/hub/chat` - General chat
- [x] `POST /api/hub/workspace-chat` - Workspace-specific chat
- [x] `GET /health` - Health check

### Frontend Build
- [x] Next.js 16.1.6 build successful
- [x] All 5 tabs functional (Dashboard, Resources, Projects, Chat, Workspace Chat)
- [x] Workspace dropdown populating with real workspaces (3 councils)
- [x] Workspace chat with separate message history
- [x] Console logging enabled for debugging
- [x] Dark theme with quantum-safe design system applied

### Production Users Created
- [x] diallo@imasystems.ai - Primary user for Diallo West

---

## 🔧 Deployment Options

### Option 1: AWS Amplify (RECOMMENDED - Best Integration)

**Requirements:**
- AWS Account (673895432464)
- GitHub Repository (diawest82/imasystems)
- Amplify App Created (d2hpwj8zshf98p)

**Steps:**

1. **Ensure Latest Code is Committed**
   ```bash
   cd /Users/diawest/projects/imasystems
   git add -A
   git commit -m "Production deployment: Cloud Hub Portal v1.0 with workspace integration"
   git push origin main
   ```

2. **Deploy via Amplify Console**
   ```
   https://console.aws.amazon.com/amplify/
   
   → Select: imasystems (d2hpwj8zshf98p)
   → Click: "Connect repository" (if not already connected)
   → Select: GitHub → Authorize
   → Deployment starts automatically on push to main
   ```

3. **Configure Domain**
   ```
   AWS Amplify → Settings → Domain Management
   → Add domain: imasystems.ai
   → Follow DNS configuration instructions
   → SSL certificate auto-provisioned
   ```

**Deployment Time:** ~10-15 minutes  
**Cost:** Frontend included in Amplify free tier, Backend on EC2/Lambda per usage

---

### Option 2: Manual Deployment (VPS/Server)

**Requirements:**
- Linux Server (Ubuntu 20.04+)
- Node.js 18+
- Python 3.11+
- PM2 for process management

**Frontend Deployment:**

```bash
# On server
cd /var/www/imasystems/frontend

# Build frontend
npm run build

# Start with PM2
pm2 start "npm start" --name "ima-frontend" --port 3000
```

**Backend Deployment:**

```bash
# On server
cd /var/www/imasystems/backend

# Create venv
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python init_hub_db.py

# Start with PM2
pm2 start "uvicorn main:app --host 0.0.0.0 --port 8080" --name "ima-backend"

# Save PM2 configuration
pm2 save
```

---

### Option 3: Docker Deployment

**Requirements:**
- Docker & Docker Compose installed
- Container registry (Docker Hub, AWS ECR, etc.)

**Build & Push Docker Images:**

```bash
# Build backend
docker build -f Dockerfile.backend -t imasystems:backend-latest .
docker tag imasystems:backend-latest your-registry/imasystems:backend-latest
docker push your-registry/imasystems:backend-latest

# Build frontend
cd website
docker build -f Dockerfile -t imasystems:frontend-latest .
docker tag imasystems:frontend-latest your-registry/imasystems:frontend-latest
docker push your-registry/imasystems:frontend-latest
```

**Deploy with Docker Compose:**

```bash
docker-compose up -d
```

---

### Option 4: Vercel (Frontend Only)

**Requirements:**
- Vercel Account (free tier available)
- GitHub Repository connected

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd /Users/diawest/projects/imasystems/website
   vercel --prod
   ```

3. **Configure Environment**
   - Vercel Dashboard → Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://api.imasystems.ai/api`

4. **Connect Custom Domain**
   - Vercel Dashboard → Domains
   - Add: imasystems.ai
   - Point DNS to Vercel nameservers

**Note:** Requires separate backend deployment (see Option 2 or 3)

---

## 🔐 Production Security Checklist

- [ ] Change JWT_SECRET in backend/.env.production
  ```bash
  JWT_SECRET=$(openssl rand -hex 32)
  ```

- [ ] Enable HTTPS/SSL everywhere
  - Amplify: Auto-enabled
  - Manual: Use Let's Encrypt + Nginx/Apache

- [ ] Configure CORS properly
  - Only allow: https://imasystems.ai
  - Not: localhost, http, other domains

- [ ] Set database backup schedule
  - Daily backups recommended
  - Store offsite or in S3

- [ ] Enable logging & monitoring
  - CloudWatch (AWS Amplify)
  - Or: ELK Stack / Datadog

- [ ] Set up error tracking
  - Sentry recommended
  - Or: AWS X-Ray

- [ ] Configure rate limiting
  - Prevent abuse on API endpoints
  - Especially /login and /workspace-chat

---

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Frontend
curl https://imasystems.ai

# Backend health
curl https://api.imasystems.ai/health

# Full endpoint test
curl -X GET "https://api.imasystems.ai/api/hub/workspaces" \
  -H "Authorization: Bearer [valid_token]"
```

### Logs to Monitor
- Frontend build/startup logs
- Backend API request logs
- Database connection logs
- Authentication/login failures
- Workspace chat interactions

### Scaling Considerations
- Auto-scaling for backend (Lambda or EC2 ASG)
- CDN for frontend assets (CloudFront)
- Database optimization (add indexes)
- API rate limiting (Kong, API Gateway)

---

## 📝 Post-Deployment Steps

1. **Verify Production Access**
   ```bash
   # Login as Diallo West
   https://imasystems.ai/hub/login
   Email: diallo@imasystems.ai
   Password: (as created)
   ```

2. **Test All Features**
   - [ ] Login successful
   - [ ] Dashboard loads
   - [ ] Workspace dropdown shows 3 councils
   - [ ] Workspace chat works
   - [ ] Workspace context responses accurate

3. **Monitor First 24 Hours**
   - Watch error logs
   - Monitor performance metrics
   - Test from different locations
   - Verify email notifications (if enabled)

4. **Update Documentation**
   - Share live URL with team
   - Update DNS records as needed
   - Document any custom configurations

---

## 🚨 Rollback Plan

If issues occur in production:

1. **AWS Amplify Rollback**
   ```
   Amplify Console → Deployments
   → Select previous successful deployment
   → Click "Redeploy"
   ```

2. **Manual Server Rollback**
   ```bash
   # Stop current services
   pm2 stop ima-frontend ima-backend
   
   # Revert code
   git revert [commit-hash]
   git push origin main
   
   # Restart services
   pm2 start ima-frontend ima-backend
   ```

3. **Database Rollback**
   - Restore from backup (Daily snapshots)
   - Restore to point-in-time if available

---

## 📞 Support & Escalation

**If Issues Occur:**

1. Check error logs (AWS CloudWatch / server logs)
2. Verify all environment variables are set
3. Test endpoints with curl manually
4. Check database connectivity
5. Monitor system resources (CPU, memory, disk)
6. Scale up if needed (increase instance size)

---

## ✅ Final Checklist

- [x] All code committed to git
- [x] Backend verified running
- [x] Frontend verified running
- [x] User created: diallo@imasystems.ai
- [x] All endpoints tested
- [x] Environment files ready
- [x] Deployment scripts ready
- [ ] Choose deployment option
- [ ] Execute deployment
- [ ] Verify live access
- [ ] Monitor logs for errors
- [ ] Share live URL with team

---

**NEXT STEP:** Choose your deployment option (Amplify, Manual, Docker, or Vercel) and follow the instructions above.

**Questions?** Refer to individual deployment guide files or check logs for specific errors.
