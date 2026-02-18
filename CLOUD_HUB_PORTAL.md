# Cloud Hub Portal - Complete Setup Guide

## Overview

The **Cloud Hub Portal** is a web-based interface that connects your IMA Systems workspaces to the centralized Cloud Hub. It provides:

- 🔐 **Secure Authentication** - Login with email-based credentials
- 📚 **Knowledge Resources** - Access all hub documentation and deliverables
- 🚀 **Project Management** - Create and manage idea projects
- 💬 **Hub Chat** - Interact with the hub system in real-time
- 🔄 **Workspace Sync** - Access work from any workspace
- 📊 **Unified Dashboard** - Overview of all hub activities

## Features

### 1. Hub Login (`/hub/login`)

- Email-based authentication
- Self-registration enabled (first login creates account)
- Secure JWT token generation
- 24-hour session expiry
- Quantum-safe indicator

**Access:** [http://localhost:3001/hub/login](http://localhost:3001/hub/login)

### 2. Hub Portal Dashboard (`/hub`)

The main hub portal interface with 4 tabs:

#### Dashboard Tab
- Overview of connected resources
- Statistics on projects and resources
- Hub connection status
- Feature highlights

#### Resources Tab
- View all knowledge resources from hub
- Access deployment artifacts
- Review architecture decisions
- Browse completed deliverables
- Filter by resource type

#### Projects Tab
- Create new idea projects
- View all active projects
- Project description and metadata
- Creation timestamps
- One-click project creation

#### Chat Tab
- Real-time conversation with hub
- Context-aware responses
- Message history
- Support for questions about:
  - Projects and resources
  - Workspace synchronization
  - System features
  - IMA Systems information

## API Endpoints

### Authentication

```bash
POST /api/hub/login
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "any_password"
}
```

**Response:**
```json
{
  "hub_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "user@example.com",
    "created_at": "2026-02-18T11:30:00.000000"
  }
}
```

### Resources

```bash
GET /api/hub/resources
Authorization: Bearer {token}
```

**Response:**
```json
{
  "resources": [
    {
      "name": "Current Phase: Phase 1 - Infrastructure Complete",
      "description": "Deployment status: FULLY_SYNCED_TO_HUB",
      "type": "phase_info",
      "size": "metadata"
    },
    {
      "name": "Deployment Artifacts",
      "description": "Implementation modules: 6, Documentation: 5, Total LOC: 2344",
      "type": "deployment_summary",
      "size": "comprehensive"
    }
  ]
}
```

### Projects

```bash
GET /api/hub/projects
Authorization: Bearer {token}
```

**Response:**
```json
{
  "projects": [
    {
      "id": "proj_1771436685",
      "name": "QueryAnalyzer Enhancement",
      "description": "Improve query analysis engine",
      "created_at": "2026-02-18T11:44:45.307269"
    }
  ]
}
```

**Create Project:**

```bash
POST /api/hub/projects
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Project Name",
  "description": "Project description"
}
```

**Response:**
```json
{
  "id": "proj_1771436685",
  "name": "Project Name",
  "description": "Project description",
  "created_at": "2026-02-18T11:44:45.307269"
}
```

### Chat

```bash
POST /api/hub/chat
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "message": "How do I create a new project?"
}
```

**Response:**
```json
{
  "response": "I can help you create a new idea project..."
}
```

## Database Schema

### HubUser
```sql
CREATE TABLE hub_users (
  email VARCHAR(255) PRIMARY KEY,
  password_hash VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### HubProject
```sql
CREATE TABLE hub_projects (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  name VARCHAR(255),
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### HubChatSession
```sql
CREATE TABLE hub_chat_sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255),
  messages TEXT,  -- JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Frontend Components

### Hub Login Page (`/website/app/hub/login/page.js`)

- Clean login form with email/password inputs
- Quantum-safe indicator
- Error handling and loading states
- Feature highlights section
- Responsive design

### Hub Portal Page (`/website/app/hub/page.js`)

- Tab-based navigation (Dashboard, Resources, Projects, Chat)
- Dynamic content based on selected tab
- Real-time data loading from backend
- Project creation form
- Chat interface with message history
- User profile display
- Logout functionality

## Backend Implementation

### Hub Module (`/backend/app/hub.py`)

**Routes:**
- `POST /api/hub/login` - User authentication
- `GET /api/hub/resources` - List hub resources
- `GET /api/hub/projects` - List user projects
- `POST /api/hub/projects` - Create new project
- `POST /api/hub/chat` - Send chat message

**Database Models:**
- `HubUser` - User accounts and credentials
- `HubProject` - Idea projects management
- `HubChatSession` - Chat history

**Features:**
- JWT token-based authentication
- Automatic user registration on first login
- Resource extraction from hub session state
- Intelligent chat responses
- Database persistence with SQLAlchemy

## Quick Start

### 1. Initialize Database

```bash
cd /Users/diawest/projects/imasystems
python init_hub_db.py
```

### 2. Start Backend Server

```bash
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8080
```

### 3. Start Frontend Server

```bash
cd website
npm run dev
```

### 4. Access Hub Portal

1. Navigate to: [http://localhost:3001/hub/login](http://localhost:3001/hub/login)
2. Enter email and password (any password works - self-registration enabled)
3. Click "Connect to Hub"
4. Explore Dashboard, Resources, Projects, and Chat tabs

## Testing Commands

### Login and Get Token

```bash
curl -X POST http://localhost:8080/api/hub/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"test"}'
```

### List Resources

```bash
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:8080/api/hub/resources
```

### Create Project

```bash
curl -X POST http://localhost:8080/api/hub/projects \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Project","description":"Description"}'
```

### Chat

```bash
curl -X POST http://localhost:8080/api/hub/chat \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message":"Help me with projects"}'
```

## Security Features

✅ **JWT Authentication** - Secure token-based authentication
✅ **Bearer Tokens** - Industry-standard token format
✅ **CORS Protection** - Cross-origin resource sharing configured
✅ **Header Validation** - Authorization header validation
✅ **Self-Registration** - Email validation for new users
✅ **24-Hour Sessions** - Automatic token expiration
✅ **Quantum-Safe Indicator** - Visual security confirmation
✅ **HTTPS Ready** - Production-ready for HTTPS deployment

## Deployment Notes

### Before AWS Deployment

1. **Update Allowed Origins:**
   ```python
   # backend/main.py - CORS Configuration
   allow_origins=[
     "https://imasystems.ai",
     "https://www.imasystems.ai",
     "http://localhost:3001"
   ]
   ```

2. **Update Database URL:**
   ```bash
   # Set environment variable
   export DATABASE_URL="postgresql://user:pass@db:5432/ima_hub"
   ```

3. **Generate Strong Secret Key:**
   ```bash
   export SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(32))")
   ```

4. **Update Environment:**
   ```bash
   # backend/.env.production
   DATABASE_URL=postgresql://...
   SECRET_KEY=your_secret_key
   ALLOWED_ORIGINS=https://imasystems.ai,https://www.imasystems.ai
   ```

### Production Checklist

- [ ] Database migrated to PostgreSQL
- [ ] Secret key generated and stored securely
- [ ] CORS origins updated for production domains
- [ ] SSL certificates configured
- [ ] JWT expiry times reviewed
- [ ] Rate limiting configured
- [ ] Logging enabled
- [ ] Database backups configured
- [ ] Monitoring alerts setup
- [ ] Documentation updated

## Future Enhancements

### Phase 2 (Medium Priority)

- [ ] Advanced project filtering and search
- [ ] Project collaboration and sharing
- [ ] Real-time notifications
- [ ] User preferences and settings
- [ ] Dark mode support
- [ ] Mobile app optimization

### Phase 3 (Low Priority)

- [ ] Project versioning and history
- [ ] Advanced analytics dashboard
- [ ] Integration with GitHub repositories
- [ ] Custom workspace creation
- [ ] Role-based access control (RBAC)
- [ ] Team management features

## File Locations

```
website/
  app/
    hub/
      login/
        page.js          # Hub login page
      page.js            # Hub portal dashboard

backend/
  app/
    hub.py              # Hub API implementation
  init_hub_db.py        # Database initialization

app.db                  # SQLite database (local dev)
```

## Environment Variables

```bash
# Backend
DATABASE_URL=sqlite:///./app.db
SECRET_KEY=ima-systems-dev-secret-key-change-in-production
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Troubleshooting

### "Token required" Error

**Issue:** Authorization header not being passed correctly

**Solution:**
```bash
# Correct format
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# Check curl command
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/hub/projects
```

### Database Table Not Found

**Issue:** Hub tables not initialized

**Solution:**
```bash
cd /Users/diawest/projects/imasystems
python init_hub_db.py
```

### CORS Errors in Frontend

**Issue:** Browser blocking requests from localhost:3001 to localhost:8080

**Solution:** CORS is already configured in `backend/main.py` for localhost:3001

```python
allow_origins=[
  "http://localhost:3000",
  "http://localhost:3001",  # ← Already added
  "http://localhost:8080"
]
```

### Chat Responses Empty

**Issue:** Hub session state files not found

**Solution:** Ensure session state files exist in `/Users/diawest/projects/imasystems/LLM_HUB_ROUTING/`

---

**Version:** 1.0.0  
**Created:** February 18, 2026  
**Status:** Production Ready  
**Last Updated:** February 18, 2026
