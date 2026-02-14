# Build Testing - Quick Reference

## One-Line Summary
Run `./test-build.sh` before committing to catch build errors locally instead of on Vercel.

## Quick Commands

```bash
# Test the build (do this before every commit)
./test-build.sh

# If test passes:
git add <your-files>
git commit -m "Your commit message"
git push origin main

# If test fails:
# 1. Read the error message
# 2. Fix the issue
# 3. Run ./test-build.sh again
# 4. Repeat until it passes
```

## Expected Output - SUCCESS ✅
```
================================================
✅ BUILD SUCCESSFUL!
================================================

The build would succeed in Vercel. Safe to commit!
```

## Expected Output - FAILURE ❌
```
Error: Turbopack build failed with 1 errors:
./website/app/page.js:5:1
Module not found: Can't resolve '../components/Logo'
```
👆 Fix the error, then run test-build.sh again

## Why This Matters

| Before | After |
|--------|-------|
| ❌ Push → Vercel fails | ✅ Test locally → Push → Vercel succeeds |
| ⏱️ 2-5 minutes per cycle | ⏱️ 30 seconds per test |
| 😞 Frustrating debugging | 😊 Confident deployments |

## Files Used

- **test-build.sh** - The test script (run this!)
- **Dockerfile** - For advanced Docker testing
- **vercel.json** - Vercel configuration
- **jsconfig.json** - Path aliases for imports

## When to Use Each Tool

| Tool | When | Duration |
|------|------|----------|
| test-build.sh | Before every commit | 30 sec |
| Dockerfile | Major releases / validation | 2 min |
| Manual npm build | Debugging specific issues | Varies |

## Common Questions

**Q: Will this catch all errors?**
A: Yes, it runs the exact same build command Vercel uses.

**Q: How long does it take?**
A: 20-40 seconds typically.

**Q: Do I need Docker?**
A: No! test-build.sh works without Docker. Dockerfile is optional for extra validation.

**Q: Can I skip it sometimes?**
A: You can, but you risk Vercel failures. Not recommended!

## Support

If test-build.sh fails:
1. Read the error message carefully
2. Check the BUILD_TESTING_GUIDE.md for details
3. Fix the issue in your code
4. Run test-build.sh again

If it still fails:
- Check jsconfig.json for path aliases
- Verify imports use correct relative paths
- Ensure all files actually exist
