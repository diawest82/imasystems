# IMA Systems Website - Deployment Guide
## Deploying to imasystems.ai

**Build Status**: ✅ Production build successful  
**Build Size**: Optimized (1062.7ms)  
**Output Format**: Static HTML + React  
**Target Domain**: imasystems.ai

---

## Quick Deployment Options

### Option 1: Vercel (Recommended)
Vercel is the creator of Next.js and provides the best integration.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from website directory
cd /Users/diawest/projects/imasystems/website
vercel --prod

# When prompted:
# - Link to existing project or create new
# - Project name: ima-systems
# - Framework: Next.js
# - Build command: npm run build
# - Output directory: .next
# - Root: ./
```

**Then configure domain**:
1. Go to vercel.com/dashboard
2. Select project "ima-systems"
3. Settings → Domains
4. Add domain: imasystems.ai
5. Add DNS records from Vercel (CNAME)

---

### Option 2: Manual Deployment (VPS/Server)

If you have your own server hosting imasystems.ai:

```bash
# Build locally
npm run build

# Copy to server
scp -r .next/ server:/var/www/imasystems/
scp -r public/ server:/var/www/imasystems/
scp -r node_modules/ server:/var/www/imasystems/  # Or: npm install on server
scp package.json package-lock.json server:/var/www/imasystems/

# On server, start with PM2
pm2 start "npm start" --name "imasystems"
```

---

### Option 3: Docker Deployment

Create `Dockerfile` in website root:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Then:
```bash
docker build -t imasystems .
docker run -p 3000:80 imasystems
```

---

## Deployment Checklist

- [x] **Production Build**: Complete and optimized
- [x] **All Routes**: Static prerendered (/, /about, /contact, /patents, /admin)
- [x] **Logo**: Animated quantum symbol, CSS modules
- [x] **Color Scheme**: Dark navy + electric cyan quantum aesthetic
- [x] **Typography**: Syne Bold, Inter, IBM Plex Mono
- [x] **Responsive Design**: Mobile, tablet, desktop optimized
- [x] **Performance**: <1.1 seconds build time
- [ ] **Domain Setup**: imasystems.ai → Configure DNS
- [ ] **SSL Certificate**: Automatic with Vercel, manual if self-hosted
- [ ] **Environment Variables**: Set up .env.local on server
- [ ] **Analytics**: Optional (Google Analytics, Vercel Analytics)
- [ ] **Monitoring**: Optional (error tracking, uptime monitoring)

---

## Environment Variables

Create `.env.local` in website root (already exists, configure as needed):

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_URL=https://imasystems.ai

# Optional: API endpoints
NEXT_PUBLIC_API_URL=https://api.imasystems.ai
```

---

## Post-Deployment Checks

After deploying to imasystems.ai:

```bash
# Test homepage
curl https://imasystems.ai/

# Check all routes
curl https://imasystems.ai/about
curl https://imasystems.ai/contact
curl https://imasystems.ai/patents
curl https://imasystems.ai/admin

# Check performance (if using Vercel)
# https://vercel.com/dashboard → Select project → Analytics tab
```

---

## Rollback Strategy

If something breaks:

**Vercel**:
```bash
vercel rollback  # Automatic rollback to previous deployment
```

**Server**:
```bash
# Keep previous builds
git revert <commit-hash>
npm run build
pm2 restart imasystems
```

---

## What's Deployed

✅ **Homepage** - Quantum-forward hero section with animated logo  
✅ **About Page** - Company information  
✅ **Contact Page** - Contact form  
✅ **Patents Page** - Patent showcase  
✅ **Admin Panel** - Secure login access  

---

## Design Specifications (Deployed)

**Color Palette**:
- Dark Navy: #0a0e27 (primary background)
- Electric Cyan: #00d9ff (accent, logo glow)
- Neon Green: #00ff88 (secondary accent)
- Neon Magenta: #ff00ff (tertiary accent)
- Cream: #fafbf8 (text)

**Typography**:
- Headings: Syne Bold (geometric, modern)
- Body: Inter (contemporary, readable)
- Code: IBM Plex Mono (technical)

**Logo**:
- Animated quantum symbol (I, M, A nodes)
- Central glowing core
- Subtle pulse animations
- Cyan glow effect on hover

---

## Support & Monitoring

**Vercel Dashboard**: https://vercel.com/dashboard  
**Domain Provider**: Update DNS to point to deployment  
**Error Tracking**: Configure Sentry for production errors  
**Performance**: Use Vercel Analytics or Google Analytics  

---

## Next Steps

1. Choose deployment platform (Vercel recommended)
2. Configure domain DNS settings
3. Deploy with chosen method
4. Verify all routes work on imasystems.ai
5. Monitor performance and errors
6. Set up email notifications for deployment failures

---

**Ready to deploy!** 🚀

Choose your deployment method and let me know if you need help with DNS configuration or any deployment issues.
