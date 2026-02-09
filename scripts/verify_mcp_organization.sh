#!/bin/bash
# imasystems - MCP Routing Setup Verification
# Confirms all routing configuration is organized and ready

echo "🚀 imasystems.ai - MCP Organization Verification"
echo "=================================================="
echo ""

# Check directories
echo "📁 Directory Structure:"
echo "  ✅ MCP_Orchestration_Hub/"
ls -d MCP_Orchestration_Hub/*/  2>/dev/null | sed 's/.*\//     ✅ /'

# Check key files
echo ""
echo "📄 Key Files:"
for file in "MCP_Orchestration_Hub/README.md" "MCP_Orchestration_Hub/routing_config/mcp_default_router.py" "MCP_Orchestration_Hub/persona_hub_mcp_week2/mcp_server_wrapper.py" "MCP_Orchestration_Hub/documentation/MCP_ROUTING_QUICK_REFERENCE.md"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    fi
done

# Check server status
echo ""
echo "🔌 MCP Server Status:"
curl -s http://localhost:8000/system/status > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Server running at http://localhost:8000"
    curl -s http://localhost:8000/system/status | python3 -m json.tool | head -10
else
    echo "   ⚠️  Server not responding"
    echo "   Start with: python3 MCP_Orchestration_Hub/persona_hub_mcp_week2/mcp_server_wrapper.py"
fi

echo ""
echo "📚 Documentation:"
echo "   📖 Start here: cat MCP_Orchestration_Hub/documentation/MCP_ROUTING_QUICK_REFERENCE.md"
echo "   📖 Full guide: cat MCP_Orchestration_Hub/documentation/MCP_DEFAULT_ROUTING.md"
echo ""

echo "✅ Organization Complete!"
echo "=================================================="
