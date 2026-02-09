#!/bin/bash
# Start both backend and frontend servers

echo "🚀 Starting IMA Systems Group Website Stack"
echo "=========================================="
echo ""

# Check if backend is already running
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Backend already running on :8080"
else
    echo "Starting backend on :8001..."
    cd backend
    source .venv/bin/activate 2>/dev/null || python3 -m venv .venv && source .venv/bin/activate
    pip install -q -r requirements.txt
    python3 main.py &
    BACKEND_PID=$!
    cd ..
    sleep 2
    echo "✅ Backend started (PID: $BACKEND_PID)"
fi

# Check if frontend is already running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Frontend already running on :3000"
else
    echo "Starting frontend on :3000..."
    cd website
    npm install -q >/dev/null 2>&1
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    sleep 3
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
fi

echo ""
echo "=========================================="
echo "🎉 IMA Systems Website is Running!"
echo "=========================================="
echo ""
echo "📍 URLs:"
echo "   • Website:  http://localhost:3000"
echo "   • Admin:    http://localhost:3000/admin"
echo "   • API:      http://localhost:8080/api"
echo "   • Docs:     http://localhost:8080/docs"
echo ""
echo "👤 Default Admin Credentials:"
echo "   • Username: admin"
echo "   • Password: changeme123"
echo ""
echo "💡 Tips:"
echo "   • First login: http://localhost:3000/admin/login"
echo "   • Add patent: Click '+ Add New Patent' in admin dashboard"
echo "   • Use YouTube embed URLs for videos"
echo ""
echo "🛑 To stop: Press Ctrl+C"
echo ""
