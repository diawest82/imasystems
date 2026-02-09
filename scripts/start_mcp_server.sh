#!/bin/bash
# Persona Hub MCP - Default Startup Script
# Launches MCP server and sets up routing

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_DIR="$SCRIPT_DIR/MCP_Orchestration_Hub/persona_hub_mcp_week2"
LOG_FILE="/tmp/mcp_server.log"
PID_FILE="/tmp/mcp_server.pid"

echo "🚀 Starting Persona Hub MCP Server (Default Routing)"
echo "=========================================="
echo ""

# Load environment
if [ -f "$SCRIPT_DIR/.mcp_env" ]; then
    export $(cat "$SCRIPT_DIR/.mcp_env" | grep -v '^#' | xargs)
    echo "✅ Environment loaded from .mcp_env"
else
    echo "⚠️  .mcp_env not found, using defaults"
fi

# Check if already running
if [ -f "$PID_FILE" ]; then
    EXISTING_PID=$(cat "$PID_FILE")
    if ps -p "$EXISTING_PID" > /dev/null 2>&1; then
        echo "✅ MCP Server already running (PID: $EXISTING_PID)"
        echo "   Log: $LOG_FILE"
        exit 0
    else
        echo "⚠️  Stale PID file, cleaning up..."
        rm -f "$PID_FILE"
    fi
fi

# Change to MCP directory
cd "$MCP_DIR"

# Start server
echo "Starting server at $MCP_DIR..."
python3 mcp_server_wrapper.py > "$LOG_FILE" 2>&1 &
SERVER_PID=$!
echo $SERVER_PID > "$PID_FILE"

# Wait for startup
sleep 2

# Verify server is running
if ps -p "$SERVER_PID" > /dev/null 2>&1; then
    echo "✅ MCP Server started successfully"
    echo "   PID: $SERVER_PID"
    echo "   URL: http://localhost:8000"
    echo "   Log: $LOG_FILE"
    echo ""
    echo "📊 Server Status:"
    tail -5 "$LOG_FILE" | grep "✅"
    echo ""
    echo "🔀 DEFAULT ROUTING: All requests route through MCP server"
    echo ""
    echo "Stop server with: kill $SERVER_PID"
else
    echo "❌ Failed to start MCP server"
    tail -20 "$LOG_FILE"
    exit 1
fi
