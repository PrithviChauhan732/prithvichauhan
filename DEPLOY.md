# prithvichauhan.yorbit.in — personal site + Wonderful demo

## What's in this folder
- `index.html` — digital resume (projects, work history, education, skills; links to yorbit.in, caas-ai.vercel.app, rasaynx.com)
- `wonderful.html` — the UPI dispute-agent demo (linked from the homepage; the Wonderful application email points here directly)
- `Resume_PrithviChauhan.pdf` — served by the "Download resume" buttons

Fully standalone: static files, no build step, no shared code or config with yorbit-frontend / yorbit-backend. Deploying it cannot affect the Yorbit apps.

## Deploy
1. **Create a separate static project** on whatever hosts yorbit.in (same account is fine — still an isolated project):
   - Vercel: New Project → drag this folder (or `vercel --prod` inside it) → preset "Other"
   - Netlify: https://app.netlify.com/drop → drag this folder
2. **Attach the subdomain**: project settings → Domains → add `prithvichauhan.yorbit.in`
3. **One additive DNS record** wherever yorbit.in's DNS lives:
   ```
   Type: CNAME · Name: prithvichauhan
   Value: cname.vercel-dns.com   (Vercel)  or  <site>.netlify.app  (Netlify)
   ```
   Doesn't touch existing records (root, www, api, …).

## Before sharing
- Optional: in `index.html`, set `CAL_URL` (script block at the bottom) to a Cal.com/Calendly link to turn "Get in touch" into "Book a conversation".
- Test: https://prithvichauhan.yorbit.in (all three project links, resume download) and https://prithvichauhan.yorbit.in/wonderful.html (run the demo, desktop + phone).

## The Wonderful email
The latest Gmail draft's "See it live →" button points to `/wonderful.html`; the signature links the homepage. Attach the resume PDF, delete older duplicate drafts, test-send to yourself, then send to careers@wonderful.ai.
