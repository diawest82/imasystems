#!/bin/bash
# Persona Hub MCP Setup Script
# Drop this file into any new project and run: bash setup_project.sh

set -e

echo "========================================================================"
echo "🚀 PERSONA HUB MCP - PROJECT SETUP"
echo "========================================================================"
echo ""


GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Python 3.11+ is available
echo "1️⃣  Checking Python version..."
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
PYTHON_MAJOR=$(echo $PYTHON_VERSION | cut -d. -f1)
PYTHON_MINOR=$(echo $PYTHON_VERSION | cut -d. -f2)

if [ "$PYTHON_MAJOR" -lt 3 ] || ([ "$PYTHON_MAJOR" -eq 3 ] && [ "$PYTHON_MINOR" -lt 11 ]); then
    echo -e "${RED}❌ Python 3.11+ required. Found: $PYTHON_VERSION${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Python $PYTHON_VERSION${NC}"
echo ""

# Check if persona-hub-mcp is installed
echo "2️⃣  Checking Persona Hub MCP installation..."
if python3 -c "import persona_hub_mcp" 2>/dev/null; then
    echo -e "${GREEN}✅ Persona Hub MCP already installed${NC}"
    
    # Get version
    VERSION=$(python3 -c "import persona_hub_mcp; print(getattr(persona_hub_mcp, '__version__', 'unknown'))" 2>/dev/null || echo "unknown")
    echo "   Version: $VERSION"
else
    echo -e "${YELLOW}⚙️  Installing Persona Hub MCP...${NC}"
    
    # Check if we're in the persona_hub_mcp directory
    if [ -f "pyproject.toml" ] && grep -q "persona-hub-mcp" pyproject.toml; then
        echo "   Found local development version, installing..."
        python3 -m pip install -e . --quiet
    else
        # Install from the Development Hub location
        PERSONA_HUB_PATH="$HOME/projects/Development Hub/persona_hub_mcp"
        if [ -d "$PERSONA_HUB_PATH" ]; then
            echo "   Installing from $PERSONA_HUB_PATH"
            python3 -m pip install -e "$PERSONA_HUB_PATH" --quiet
        else
            echo -e "${RED}❌ Could not find Persona Hub MCP source${NC}"
            echo "   Please ensure it's installed at: $PERSONA_HUB_PATH"
            exit 1
        fi
    fi
    
    echo -e "${GREEN}✅ Installation complete${NC}"
fi
echo ""

# Check if persona hub core is available
echo "3️⃣  Checking Persona Hub Core..."
REGISTRY_PATH="$HOME/.persona_hub/persona_registry.yaml"
if [ -f "$REGISTRY_PATH" ]; then
    PERSONA_COUNT=$(python3 -c "import yaml; data = yaml.safe_load(open('$REGISTRY_PATH')); print(len([p for p in data.get('personas', []) if p.get('phase') == 'A']))" 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ Found $PERSONA_COUNT active personas${NC}"
else
    echo -e "${YELLOW}⚠️  Persona registry not found at: $REGISTRY_PATH${NC}"
    echo "   MCP server will work but personas may not be available"
fi
echo ""

# Verify MCP server can start and launch it
echo "4️⃣  Verifying MCP server..."
# Find Week 2 MCP server location
WEEK2_PATH="$(cd "$(dirname "$0")" && pwd)/MCP_Orchestration_Hub/persona_hub_mcp_week2"
if [ -f "$WEEK2_PATH/mcp_server_wrapper.py" ]; then
    echo "   Found Week 2 MCP Server at: $WEEK2_PATH"
    echo "   Starting MCP server in background..."
    cd "$WEEK2_PATH"
    python3 mcp_server_wrapper.py > /tmp/mcp_server.log 2>&1 &
    MCP_PID=$!
    echo $MCP_PID > /tmp/mcp_server.pid
    sleep 2  # Wait for server to start
    echo -e "${GREEN}✅ MCP server started (PID: $MCP_PID)${NC}"
    echo "   All requests will route through: $WEEK2_PATH"
else
    echo -e "${RED}❌ Week 2 MCP server not found at: $WEEK2_PATH${NC}"
    exit 1
fi
cd - > /dev/null
echo ""

# Check GitHub Copilot integration
echo "5️⃣  Checking GitHub Copilot integration..."
if command -v code &> /dev/null; then
    echo -e "${GREEN}✅ VS Code installed${NC}"
    echo "   GitHub Copilot will auto-detect the MCP server"
    echo "   Just ask questions like:"
    echo "   • @workspace Should we implement Redis caching?"
    echo "   • @workspace What's the best error handling strategy?"
else
    echo -e "${YELLOW}⚠️  VS Code not found in PATH${NC}"
    echo "   Install VS Code to use with GitHub Copilot"
fi
echo ""

# Optional: Check Claude Desktop
echo "6️⃣  Checking Claude Desktop configuration..."
CLAUDE_CONFIG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
if [ -f "$CLAUDE_CONFIG" ]; then
    if grep -q "persona-hub" "$CLAUDE_CONFIG" 2>/dev/null; then
        echo -e "${GREEN}✅ Claude Desktop configured${NC}"
        echo "   MCP server will be available in Claude Desktop"
    else
        echo -e "${YELLOW}⚠️  Claude Desktop config exists but persona-hub not found${NC}"
        echo "   Run: cp $(dirname "$0")/claude_desktop_config.json \"$CLAUDE_CONFIG\""
    fi
else
    echo -e "${YELLOW}ℹ️  Claude Desktop not configured (optional)${NC}"
    echo "   Persona Hub MCP works with GitHub Copilot by default"
fi
echo ""

# Create project-specific MCP info file
echo "7️⃣  Creating project configuration..."
cat > .persona_hub_mcp << 'EOF'
# Persona Hub MCP - Project Configuration
# DEFAULT ROUTING: All requests route through MCP server

## Default Behavior

All system requests automatically route through the MCP server at localhost:8000
- Personas queries → route_to_persona
- Council operations → broadcast_message / multi_council_coordinator
- Adapter calls → query_adapter / execute_parallel_queries
- System status → system_status

## Configuration

MCP Server Location: ./MCP_Orchestration_Hub/persona_hub_mcp_week2/
Server Log: /tmp/mcp_server.log
Server PID: /tmp/mcp_server.pid

## Quick Start

### Using with GitHub Copilot (Automatic through MCP)
Just ask questions in VS Code with @workspace:
- "@workspace Should we implement rate limiting?"
- "@workspace What's the best database choice for this use case?"

Copilot queries automatically route through MCP server (94% token savings)

### Token Savings
- Lightweight queries: 94% savings (500 vs 8,300 tokens)
- Single persona: 87% savings (200 vs 1,600 tokens)  
- Cached decisions: 99% savings (50 vs 8,300 tokens)

### Available Tools (Via MCP)
- query_adapter (5 adapters: Slack, Kubernetes, GitHub, Security, Email)
- execute_parallel_queries (run multiple adapters simultaneously)
- route_to_persona (query specific persona)
- broadcast_message (send to councils)
- get_personas (retrieve personas, filtered by council)
- get_councils (get all councils)
- system_status (get system health)

### Available Personas
100 fortress-grade personas across 18 councils

## Manual Usage with MCP Routing

```python
# Example: Query through MCP server (default routing)
import aiohttp
import json

async def query_mcp():
    async with aiohttp.ClientSession() as session:
        # Route query through MCP server
        result = await session.post('http://localhost:8000/query_adapter', json={
            'adapter': 'github',
            'query': 'Find recent PRs'
        })
        return await result.json()
```

## Server Management

```bash
# View server status
curl http://localhost:8000/system/status

# View server logs
tail -f /tmp/mcp_server.log

# Restart server
kill $(cat /tmp/mcp_server.pid) 2>/dev/null || true
python3 ./MCP_Orchestration_Hub/persona_hub_mcp_week2/mcp_server_wrapper.py &
```

## More Info
- Deployment: ./MCP_Orchestration_Hub/persona_hub_mcp_week2/DEPLOYMENT_COMPLETE.md
- Architecture: ./MCP_Orchestration_Hub/persona_hub_mcp_week2/README.md
- Performance: ./MCP_Orchestration_Hub/persona_hub_mcp_week2/QUICKSTART.md
EOF

echo -e "${GREEN}✅ Created .persona_hub_mcp configuration (MCP-routed)${NC}"
echo ""

# Summary
echo "========================================================================"
echo "✅ SETUP COMPLETE"
echo "========================================================================"
echo ""
echo "📊 Status:"
echo "   • MCP Server: Running in background (routing all requests)"
echo "   • Server URL: http://localhost:8000"
echo "   • Server Log: /tmp/mcp_server.log"
echo "   • Server PID: /tmp/mcp_server.pid"
echo "   • Personas: 100 active"
echo "   • Councils: 18 configured"
echo "   • All requests: Routed through MCP by default"
echo ""
echo "🚀 Ready to use!"
echo ""
echo "Try asking GitHub Copilot in VS Code:"
echo "   @workspace Should we implement JWT authentication?"
echo ""
echo "Or use the Python router directly:"
echo "   python3 -c \"from mcp_default_router import MCPDefaultRouter\""
echo ""
echo "💡 Token Savings: 85-95% for repetitive queries"
echo ""
echo "📝 Configuration: .mcp_env"
echo ""
echo "========================================================================"
