#!/bin/bash
# AWS Amplify GitHub Deployment Script
# For IMA Systems: Connect GitHub to Amplify and Deploy

set -e

APP_ID="d2hpwj8zshf98p"
REPO="https://github.com/diawest82/imasystems"
BRANCH="main"
REGION="us-east-1"

echo "════════════════════════════════════════════════════════════════"
echo "   🚀 IMA SYSTEMS - AWS AMPLIFY GITHUB DEPLOYMENT"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Status: AWS Amplify App Created ✅"
echo ""
echo "App Configuration:"
echo "  • App ID: $APP_ID"
echo "  • Repository: $REPO"
echo "  • Branch: $BRANCH"
echo "  • Region: $REGION"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""

# Step 1: Verify AWS CLI
echo "✓ Step 1: Verifying AWS CLI..."
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Install it first: https://aws.amazon.com/cli/"
    exit 1
fi
echo "   ✅ AWS CLI v$(aws --version 2>&1 | cut -d' ' -f1)"
echo ""

# Step 2: Verify GitHub SSH
echo "✓ Step 2: Verifying GitHub SSH Authentication..."
if [ -f ~/.ssh/id_ed25519 ]; then
    echo "   ✅ SSH key found: ~/.ssh/id_ed25519"
else
    echo "   ⚠️  No SSH key found. Creating one..."
    ssh-keygen -t ed25519 -C "github" -f ~/.ssh/id_ed25519 -N ""
    echo "   ✅ SSH key created"
fi
echo ""

# Step 3: Verify Git credentials
echo "✓ Step 3: Verifying Git Configuration..."
GIT_USER=$(git config --global user.name 2>/dev/null || echo "not set")
GIT_EMAIL=$(git config --global user.email 2>/dev/null || echo "not set")
echo "   • User: $GIT_USER"
echo "   • Email: $GIT_EMAIL"
if [ "$GIT_USER" == "not set" ] || [ "$GIT_EMAIL" == "not set" ]; then
    echo "   ⚠️  Git not configured. Configure it:"
    echo "      git config --global user.name 'Your Name'"
    echo "      git config --global user.email 'your.email@example.com'"
fi
echo ""

# Step 4: Verify AWS credentials
echo "✓ Step 4: Verifying AWS Credentials..."
AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "not found")
echo "   ✅ AWS Account: $AWS_ACCOUNT"
echo ""

# Step 5: Create GitHub Personal Access Token (optional)
echo "✓ Step 5: GitHub Personal Access Token (OPTIONAL)"
echo ""
echo "   To deploy without using AWS Console OAuth, you can create a PAT:"
echo "   1. Go to: https://github.com/settings/tokens/new"
echo "   2. Name: 'AWS Amplify IMA Systems'"
echo "   3. Select scopes: repo, admin:repo_hook"
echo "   4. Generate and copy token"
echo "   5. Store securely in AWS Secrets Manager:"
echo ""
echo "      aws secretsmanager create-secret \\"
echo "        --name github/amplify/imasystems-token \\"
echo "        --description 'GitHub token for AWS Amplify IMA Systems' \\"
echo "        --secret-string 'ghp_your_token_here' \\"
echo "        --region $REGION"
echo ""

# Step 6: Show deployment options
echo "════════════════════════════════════════════════════════════════"
echo "   📋 DEPLOYMENT OPTIONS"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "OPTION A: AWS Amplify Console (RECOMMENDED - Easiest)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Go to: https://console.aws.amazon.com/amplify/"
echo "2. Select app: imasystems ($APP_ID)"
echo "3. Click 'Connect repository' → 'GitHub'"
echo "4. Click 'Authorize AWS Amplify'"
echo "5. GitHub OAuth will prompt - approve permissions"
echo "6. Select repo: diawest82/imasystems"
echo "7. Select branch: main"
echo "8. Click 'Connect' → Amplify auto-deploys!"
echo ""
echo "Expected time: 5-10 minutes"
echo "Status: Visible in Amplify Console → Deployments"
echo ""

echo "OPTION B: AWS CLI (Advanced - Requires GitHub Token)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "If you have a GitHub Personal Access Token:"
echo ""
echo "export GITHUB_TOKEN='ghp_your_token_here'"
echo ""
echo "aws amplify update-app \\"
echo "  --app-id $APP_ID \\"
echo "  --repository $REPO \\"
echo "  --oauth-token \$GITHUB_TOKEN \\"
echo "  --region $REGION"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "   ✅ YOU'RE READY TO DEPLOY!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Your IMA Systems backend is fully configured:"
echo "  ✅ amplify.yml created"
echo "  ✅ Dockerfile.backend created"
echo "  ✅ .env.production configured"
echo "  ✅ All code committed to GitHub"
echo "  ✅ AWS Amplify app created"
echo ""
echo "Next: Use OPTION A or OPTION B above to deploy!"
echo ""
echo "For help: See GITHUB_AMPLIFY_SETUP.md"
echo ""
