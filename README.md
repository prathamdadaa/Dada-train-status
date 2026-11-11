# Dada Train Status Checker

Live Indian Railways running-status tracker. React + Vite + Framer Motion + Lucide.
Search by train number or name, pick Yesterday / Today / Tomorrow, then watch the train glide along an animated track with a radar pulse, or switch to List view.

## Run locally
```bash
npm install
cp .env.example .env     # keep VITE_USE_MOCK=true for the demo simulator
npm run dev
```
Try `12301`, `12019` or `12951`.

## Data layer (`src/api/trainApi.js`)
- **Demo mode** (`VITE_USE_MOCK=true`): a simulator advances the train every poll, like a WebSocket feed. The routes and timings in `src/data/trains.js` are sample data, not real timetables.
- **Live mode**: set `VITE_USE_MOCK=false` plus `VITE_RAPIDAPI_KEY` / `VITE_RAPIDAPI_HOST`. If the request fails, the app falls back to the simulator automatically and shows a "Demo data" badge.
- API providers return different JSON shapes. Adjust `normalize()` in `trainApi.js` to match the plan you subscribe to.
- **Security:** `VITE_*` variables are bundled into the browser. For production, put the key behind a small proxy (Cloudflare Worker, Vercel function) and point `BASE` at it.

## Deploy from GitHub
1. Create a repo and push:
   ```bash
   git init && git add . && git commit -m "Dada Train Status Checker"
   git branch -M main
   git remote add origin https://github.com/<you>/dada-train-status.git
   git push -u origin main
   ```
2. **GitHub Pages:** Settings > Pages > Source: **GitHub Actions**. The included workflow builds and publishes on every push to `main`. Add `VITE_RAPIDAPI_KEY` under Settings > Secrets and variables > Actions if you use live mode.
3. **Vercel / Netlify (one click):** import the repo. Build command `npm run build`, output `dist`. Add the env vars from `.env.example`.

## Structure
```
src/
  api/trainApi.js        live API + simulator + fallback
  data/trains.js         sample routes
  components/            SearchPanel, StatusHeader, LiveStats, TrackView, ListView
  App.jsx  styles.css
```
