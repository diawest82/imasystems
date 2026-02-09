#!/bin/bash
# IMA Systems Website - Pre-Launch Checklist

echo "📋 IMA Systems Website - Pre-Launch Checklist"
echo "=============================================="
echo ""

PASS=0
FAIL=0

check() {
    if [ $? -eq 0 ]; then
        echo "✅ $1"
        ((PASS++))
    else
        echo "❌ $1"
        ((FAIL++))
    fi
}

# Check directories
test -d backend && check "Backend directory exists"
test -d website && check "Website directory exists"
test -d "MCP_Orchestration_Hub" && check "MCP Hub exists"

# Check backend files
test -f backend/main.py && check "Backend main.py exists"
test -f backend/requirements.txt && check "Backend requirements.txt exists"
test -f backend/app/routes/auth.py && check "Auth routes exist"
test -f backend/app/routes/patents.py && check "Patent routes exist"

# Check frontend files
test -f website/package.json && check "Frontend package.json exists"
test -f website/app/page.js && check "Frontend homepage exists"
test -f website/app/admin/page.js && check "Admin dashboard exists"
test -f website/styles/globals.css && check "Styles exist"

# Check documentation
test -f PROJECT_SUMMARY.md && check "Project summary exists"
test -f WEBSITE_SETUP.md && check "Setup guide exists"
test -f .credentials/namecheap_backup_codes.txt && check "Namecheap codes secured"

# Check credentials
test -f .gitignore && grep -q ".credentials" .gitignore && check ".credentials in .gitignore"

# Check servers
lsof -Pi :8001 -sTCP:LISTEN -t >/dev/null 2>&1 && check "Backend running on :8001" || echo "⏹️  Backend not running (normal)"
lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 && check "Frontend running on :3000" || echo "⏹️  Frontend not running (normal)"

echo ""
echo "=============================================="
echo "Results: ✅ $PASS passed, ❌ $FAIL failed"
echo "=============================================="
echo ""

if [ $FAIL -eq 0 ]; then
    echo "🎉 Ready to launch!"
    echo ""
    echo "Next steps:"
    echo "1. Run: ./start_website.sh"
    echo "2. Visit: http://localhost:3000"
    echo "3. Login at: http://localhost:3000/admin/login"
    echo "4. Add patents with video demos"
    echo ""
else
    echo "⚠️  Please resolve the issues above before launching"
fi
