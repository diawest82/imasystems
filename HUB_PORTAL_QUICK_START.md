# Cloud Hub Portal - Quick Start

## 🚀 Access the Hub Portal

### Local Development

```bash
# 1. Start Backend (if not running)
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8080

# 2. Start Frontend (in another terminal)
cd website
npm run dev

# 3. Access Hub Login
https://localhost:3001/hub/login
```

### Login Details

- **URL:** http://localhost:3001/hub/login
- **Email:** Any email address (self-registration enabled)
- **Password:** Any password (not validated)
- **Session:** 24 hours

## 📚 Hub Portal Features

### 1. Dashboard
- Overview of all hub resources
- Statistics on projects and resources
- Hub connection status
- Feature highlights

### 2. Resources
- Access all knowledge resources from hub
- View deployment artifacts
- Review architecture decisions
- Browse completed deliverables

### 3. Projects
- Create new idea projects
- Manage active projects
- Track project metadata
- One-click project creation

### 4. Chat
- Ask questions about the hub
- Get context-aware responses
- Access system information
- Real-time conversation

## 🔧 API Testing

### Get Token

```bash
curl -X POST http://localhost:8080/api/hub/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"test"}'
```

### Explore Resources

```bash
TOKEN="your_token_here"
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/hub/resources
```

### Create Project

```bash
TOKEN="your_token_here"
curl -X POST http://localhost:8080/api/hub/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Project",
    "description": "Project description here"
  }'
```

### Send Chat Message

```bash
TOKEN="your_token_here"
curl -X POST http://localhost:8080/api/hub/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I create a project?"}'
```

## 📊 Database

### Initialize Hub Database

```bash
cd /Users/diawest/projects/imasystems
python init_hub_db.py
```

### Database Location

- **File:** `app.db` (SQLite for local dev)
- **Tables:** `hub_users`, `hub_projects`, `hub_chat_sessions`
- **Path:** `/Users/diawest/projects/imasystems/backend/app.db`

## 🔐 Authentication Flow

1. **Login Request**
   ```
   User → /api/hub/login (email, password)
   ```

2. **Token Generation**
   ```
   Backend generates JWT token (24-hour validity)
   ```

3. **API Requests**
   ```
   User → /api/hub/* with "Authorization: Bearer TOKEN" header
   ```

4. **Token Validation**
   ```
   Backend verifies token and processes request
   ```

## 📁 File Structure

```
website/
  app/
    hub/
      login/page.js     # Login page
      page.js           # Hub portal

backend/
  app/
    hub.py             # API endpoints
  init_hub_db.py       # Database setup
  main.py              # FastAPI app

CLOUD_HUB_PORTAL.md    # Full documentation
```

## ✅ Verification Checklist

- [ ] Backend running on port 8080
- [ ] Frontend running on port 3001
- [ ] Hub login page loads
- [ ] Can login with email
- [ ] Can view dashboard
- [ ] Can browse resources
- [ ] Can create projects
- [ ] Can send chat messages

## 🆘 Troubleshooting

### Backend Won't Start
```bash
# Kill existing process
pkill -f uvicorn

# Start fresh
cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8080
```

### Database Error
```bash
# Reinitialize database
python init_hub_db.py
```

### CORS Error
- Ensure backend is on port 8080
- Ensure frontend is on port 3001
- CORS is pre-configured for these ports

### Token Invalid
- Token expires after 24 hours
- Get new token by logging in again
- Verify "Authorization: Bearer" format

## 🎯 Next Steps

1. ✅ Cloud Hub Portal created and tested
2. ⏳ Deploy to AWS Amplify (before doing this)
3. ⏳ Configure custom domain
4. ⏳ Enable HTTPS
5. ⏳ Setup database backups
6. ⏳ Configure monitoring and alerts

## 📞 Support

For detailed documentation, see [CLOUD_HUB_PORTAL.md](CLOUD_HUB_PORTAL.md)

---

**Status:** ✅ Ready for Deployment  
**Version:** 1.0.0  
**Last Updated:** February 18, 2026
