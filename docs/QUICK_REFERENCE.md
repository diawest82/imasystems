# 🚀 IMA Systems Website - Quick Reference Card

## ⚡ Start Development (30 seconds)

```bash
cd /Users/diawest/projects/imasystems
./start_website.sh
```

Then open:
- **Site**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login  
- **API Docs**: http://localhost:8001/docs

## 🔐 Admin Access

**Default Login**:
- Username: `admin`
- Password: `changeme123`

## ➕ Add a Patent/Demo (2 minutes)

1. Go to: http://localhost:3000/admin
2. Click: "+ Add New Patent"
3. Fill in:
   ```
   Title: Your Patent Name
   Description: Technical details here
   Video URL: https://www.youtube.com/embed/VIDEO_ID
   ☑ Publish immediately
   ```
4. Click: "Create Patent"
5. View on: http://localhost:3000/patents

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/main.py` | API server |
| `website/app/page.js` | Homepage |
| `website/app/admin/page.js` | Admin dashboard |
| `backend/app/database/db.py` | Database models |
| `website/lib/api.js` | API client |

## 🔌 API Basics

### Get All Patents
```bash
curl http://localhost:8001/api/patents/
```

### Login
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"changeme123"}'
```

### Create Patent (with token)
```bash
curl -X POST "http://localhost:8001/api/patents/?token=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My Patent",
    "description":"Details",
    "video_url":"https://www.youtube.com/embed/dQw4w9WgXcQ",
    "is_published":true
  }'
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 8001 in use | `lsof -i :8001` then kill process |
| Can't login | Check .env, restart backend |
| Frontend won't load | Check Node is installed, run `npm install` |
| Videos won't play | Use embed URL, not watch URL |

## 📋 Directory Structure

```
imasystems/
├── backend/          ← API (Python/FastAPI)
├── website/          ← Frontend (Next.js)
├── start_website.sh  ← Launch both
└── PROJECT_SUMMARY.md ← Full docs
```

## ✅ Deployment (Feb 15)

1. Test locally ✅ (you're here!)
2. Build frontend: `cd website && npm run build`
3. Deploy backend to server
4. Deploy frontend to Namecheap/Vercel
5. Update domain DNS
6. Test live site
7. Go live! 🎉

## 💾 Database

- **Dev**: SQLite (`backend/app.db`)
- **Prod**: PostgreSQL (configure in .env)

Auto-creates tables on first run.

## 🔒 Security

- Passwords hashed with bcrypt
- JWTs for authentication
- Admin routes require token
- Credentials in .env (not in git)
- Backup codes in .credentials/

## 📞 Quick Links

- **Code**: `/Users/diawest/projects/imasystems`
- **Backend Docs**: http://localhost:8001/docs
- **Website Setup**: `cat WEBSITE_SETUP.md`
- **Full Summary**: `cat PROJECT_SUMMARY.md`

---

**Status**: ✅ Ready to launch  
**Timeline**: 7 days until Feb 15  
**Next**: Run `./start_website.sh` and start adding patents! 🚀
