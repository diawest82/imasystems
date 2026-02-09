# IMA Systems Group Website - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database and create admin user
python3 -c "from app.database.db import *; Base.metadata.create_all(bind=engine)"

# Create first admin user (interactive)
python3 -c "
from app.database.db import SessionLocal, AdminUser
from app.security import get_password_hash

db = SessionLocal()
admin = AdminUser(
    username='admin',
    email='admin@imasystems.ai',
    hashed_password=get_password_hash('changeme123')
)
db.add(admin)
db.commit()
print('Admin user created: admin / changeme123')
db.close()
"

# Start backend server
python3 main.py
# Server will run on http://localhost:8001
```

### 2. Frontend Setup

```bash
cd website

# Install dependencies
npm install

# Start development server
npm run dev
# Site will run on http://localhost:3000
```

## 📚 Usage

### Admin Login
1. Go to http://localhost:3000/admin
2. Login with your admin credentials
3. Click "Admin Dashboard" or navigate to /admin
4. Add patents/demonstrations

### Admin Dashboard Features
- **Add Patents**: Create new patent entries with title, description, and video URL
- **Manage Patents**: View all patents (published and draft)
- **Edit Patents**: Update patent information
- **Publish/Unpublish**: Control which patents are visible on the public site

### Patent Entry Format
- **Title**: Name of the patent/demonstration
- **Description**: Technical details and features
- **Video URL**: YouTube embed URL (format: https://www.youtube.com/embed/VIDEO_ID)
- **Publish**: Checkbox to show/hide from public

## 🎬 Adding a Patent Demo

1. Log in to admin dashboard
2. Click "+ Add New Patent"
3. Fill in:
   - Title: "Distributed Decision Making System v1.0"
   - Description: "Our flagship system demonstrating..."
   - Video URL: https://www.youtube.com/embed/dQw4w9WgXcQ
   - Check "Publish immediately"
4. Click "Create Patent"
5. Patent will appear on Patents & Demos page

## 🔐 Security

### Default Credentials (Change Immediately in Production!)
- Username: `admin`
- Password: `changeme123`

### Change Password
Edit database directly or create new admin user:
```python
from app.database.db import SessionLocal, AdminUser
from app.security import get_password_hash

db = SessionLocal()
user = db.query(AdminUser).filter(AdminUser.username == 'admin').first()
user.hashed_password = get_password_hash('new_password_here')
db.commit()
```

## 📦 Deployment

### Backend (Production)
```bash
# Use production ASGI server
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:8001 main:app
```

### Frontend (Production)
```bash
# Build
npm run build

# Start
npm start
```

### Environment Variables (Production)
Backend (`.env`):
```
DATABASE_URL=postgresql://user:password@host/dbname
SECRET_KEY=your-production-secret-key-min-32-chars
ALGORITHM=HS256
DEBUG=False
```

Frontend (`.env.production`):
```
NEXT_PUBLIC_API_URL=https://api.imasystems.ai
```

## 🔗 Integration with MCP

The backend can integrate with the MCP routing system for AI-assisted admin functions:

```python
from MCP_Orchestration_Hub.routing_config.mcp_default_router import MCPDefaultRouter

@router.get("/suggest-description/{patent_id}")
async def suggest_patent_description(patent_id: int):
    """Use MCP to get AI suggestions for patent descriptions"""
    async with MCPDefaultRouter() as router:
        suggestion = await router.route_to_persona(
            persona_id='technical_writer',
            query=f'Suggest a professional description for patent {patent_id}'
        )
        return suggestion
```

## 📝 API Endpoints

### Public Endpoints
- `GET /api/patents/` - Get all patents
- `GET /api/patents/published` - Get published patents only
- `GET /api/patents/{id}` - Get specific patent

### Admin Endpoints (Require Token)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/current-user` - Get current user
- `POST /api/patents/` - Create patent (token required)
- `PUT /api/patents/{id}` - Update patent (token required)
- `DELETE /api/patents/{id}` - Delete patent (token required)
- `GET /api/config/` - Get site configuration
- `PUT /api/config/{key}` - Update configuration (token required)

## 🐛 Troubleshooting

### Backend won't start
- Check if port 8001 is available
- Verify database file exists: `backend/app.db`
- Check console for specific error messages

### Frontend won't connect to backend
- Ensure backend is running on http://localhost:8001
- Check NEXT_PUBLIC_API_URL in `.env.local`
- Check CORS settings in backend `main.py`

### Login not working
- Verify admin user exists in database
- Check password is correct (case-sensitive)
- Try creating new admin user

## 📞 Support

For issues or questions:
1. Check the logs (backend console and browser console)
2. Verify all prerequisites are installed
3. Ensure both servers are running
4. Check network connectivity between frontend and backend

---

**Ready to launch by February 15!** 🚀
