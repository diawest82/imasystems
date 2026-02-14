# Build Testing Framework - Implementation Guide

## Overview
This document describes the build testing framework implemented for IMA Systems website deployments. It prevents failed Vercel deployments by testing builds locally before committing.

## Problem Statement
- Multiple failed Vercel deployments due to undetected build errors
- Each failure requires iterative debugging and redeployment
- Time-consuming process that could be prevented with local testing

## Solution
Two complementary testing approaches:

### 1. **test-build.sh** - Quick Local Testing
Fast, lightweight script that mimics Vercel's exact build process without Docker.

**File**: `test-build.sh`

**Usage**:
```bash
cd /Users/diawest/projects/imasystems
./test-build.sh
```

**What it does**:
- Cleans previous build artifacts
- Installs dependencies: `npm --prefix website install`
- Runs build: `npm --prefix website run build`
- Reports success or failure

**Output**:
```
✅ BUILD SUCCESSFUL!
The build would succeed in Vercel. Safe to commit!
```

### 2. **Dockerfile** - Full Environment Testing
Complete Docker container that replicates Vercel's Node.js environment exactly.

**File**: `Dockerfile`

**Usage**:
```bash
cd /Users/diawest/projects/imasystems
docker build -t imasystems-build-test .
```

**When to use**:
- Final validation before major releases
- Testing in isolated environment
- Debugging environment-specific issues

## Workflow

### Before Making Commits
1. Make your code changes
2. Run the test script:
   ```bash
   ./test-build.sh
   ```
3. Check output:
   - ✅ **SUCCESS** → Safe to commit and push
   - ❌ **FAILURE** → Fix errors, then re-run test-build.sh

### Example Session
```bash
# Make changes to website
$ nano website/app/page.js

# Test the build
$ ./test-build.sh

# If it passes:
$ git add website/app/page.js
$ git commit -m "Update page component"
$ git push origin main
# Vercel will deploy successfully!

# If it fails:
# Fix the error shown in test-build.sh output
# Run test-build.sh again
# Repeat until success
```

## Vercel Configuration

**File**: `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm --prefix website run build",
  "installCommand": "npm --prefix website install",
  "outputDirectory": "website/.next"
}
```

This configuration tells Vercel:
- Build framework: Next.js
- Install dependencies in website directory: `npm --prefix website install`
- Run build in website directory: `npm --prefix website run build`
- Output location: `website/.next`

## Why This Works

### Import Resolution
The `jsconfig.json` in website directory handles path aliases:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

### Build Isolation
By using `npm --prefix website run build`:
- npm changes to website directory context
- All relative imports work correctly
- Aliases resolve properly
- No path confusion between root and website folders

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Module not found errors | Run ./test-build.sh to catch before pushing |
| Import path errors | Check relative paths in imports |
| Build timeout | Increase timeout in test-build.sh |
| Docker build fails | Ensure Docker daemon is running |

## Benefits

✅ **Prevents Failed Deployments**
- Catch errors before Vercel
- Save deployment cycles

✅ **Fast Feedback Loop**
- Test in ~30 seconds locally
- No wait for Vercel build

✅ **Reproducible Builds**
- Same commands as Vercel uses
- Exact environment simulation

✅ **Team Efficiency**
- Clear pass/fail indicators
- Reduces deployment debugging time

## Extending to Other Projects

To apply this framework to other Vercel sites:

1. Copy `test-build.sh` to project root
2. Adapt the build command if needed (check package.json scripts)
3. For projects with different structure:
   ```bash
   # Edit test-build.sh and change the build line:
   npm --prefix <YOUR_APP_DIR> run build
   ```

4. Copy `Dockerfile` and update the build command
5. Add to git and commit

## Files in This Framework

```
imasystems/
├── test-build.sh          ← Quick test script
├── Dockerfile             ← Container test environment
├── vercel.json            ← Vercel configuration
└── website/               ← Next.js application
    ├── package.json
    ├── next.config.js
    ├── jsconfig.json
    ├── app/
    ├── components/
    └── lib/
```

## Next Steps

1. ✅ Use `./test-build.sh` before every commit
2. ✅ Review the build output for any warnings
3. ✅ Push only when test-build.sh shows SUCCESS
4. ✅ Monitor Vercel deployments (should now all succeed)
5. ⏳ Extend framework to queryanalyzer.com when ready

## References

- **Next.js Build**: https://nextjs.org/docs/app/building-your-application/deploying
- **Vercel Configuration**: https://vercel.com/docs/projects/project-configuration
- **Docker for Node**: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
