# prithvichauhan.yorbit.in

Personal site / digital resume of Prithvi Chauhan.

**Stack:** Vite · TypeScript (strict) · Three.js · vanilla CSS. Multi-page app — home plus per-experience detail pages.

```
index.html                  home (Three.js particle background, animated stats, spotlight cards)
experience/*.html           detail pages: finmechanics, rispri, yorbit, markets, iitb, early
src/main.ts                 home entry (shared interactions + Three.js bg)
src/detail.ts               detail-page entry
src/shared.ts               reveals, counters, spotlight, marquee, clock, progress, rotator
src/three-bg.ts             ambient particle field + wireframe knot, mouse parallax
public/                     wonderful.html (agent demo), resume PDF, CNAME
```

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
```

## Deploy
Pushes to `main` auto-build and deploy via GitHub Actions (`.github/workflows/deploy.yml`)
to GitHub Pages at the custom domain in `public/CNAME`. See DEPLOY.md for DNS setup.
