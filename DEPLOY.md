# Deploy — prithvichauhan.yorbit.in

## One-time GitHub setup
1. Push (see below), then on GitHub: repo → Settings → Pages → Source: **GitHub Actions**
2. Add one DNS record wherever yorbit.in's DNS lives:
   `CNAME · Name: prithvichauhan · Value: prithvichauhan732.github.io`
3. Repo → Settings → Pages → Custom domain: prithvichauhan.yorbit.in → tick "Enforce HTTPS" once verified
   (public/CNAME already carries the domain into every build)

Every push to main then auto-builds (type-check + Vite) and deploys.

## Push from your machine
```bash
cd ~/Desktop/Yorbit/Yorbit/prithvichauhan-site
rm -f .git/HEAD.lock .git/objects/maintenance.lock   # clear stale locks if present
git add -A && git commit -m "Vite + TypeScript + Three.js rebuild with experience detail pages"
git push -u origin main
```

## Alternative: Vercel
Import the repo as a new project — Vite is auto-detected (build `npm run build`, output `dist`).
Add domain prithvichauhan.yorbit.in + the CNAME record Vercel shows.

Either way: isolated project + one additive DNS record. yorbit-frontend / yorbit-backend untouched.

## Test after deploy
Home: Three.js background, rotating hero line, stat counters, all project links, resume download.
Detail pages: /experience/{finmechanics,rispri,yorbit,markets,iitb,early}.html + prev/next pager.
Demo: /wonderful.html (run it). Then finish the Gmail draft (attach resume, delete old drafts, test-send).
