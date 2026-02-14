#!/bin/bash
# Test build script - mimics Vercel's build process

set -e  # Exit on any error

echo "================================================"
echo "🧪 Testing Build (Vercel Simulation)"
echo "================================================"
echo ""

# Clean previous build artifacts
echo "🧹 Cleaning previous builds..."
rm -rf website/.next website/out

# Install dependencies in website directory
echo "📦 Installing dependencies..."
npm --prefix website install

# Run the build command (same as Vercel)
echo "🔨 Building with: npm --prefix website run build"
npm --prefix website run build

# Check if build succeeded
if [ $? -eq 0 ]; then
  echo ""
  echo "================================================"
  echo "✅ BUILD SUCCESSFUL!"
  echo "================================================"
  echo ""
  echo "The build would succeed in Vercel. Safe to commit!"
  echo ""
  exit 0
else
  echo ""
  echo "================================================"
  echo "❌ BUILD FAILED!"
  echo "================================================"
  echo ""
  echo "Fix the errors above before committing."
  echo ""
  exit 1
fi
