# footballscore — master prompt: build every remaining page

Copy everything below the horizontal rule into a coding agent.  
**Goal:** ship every ESPN-backed surface that can provide real value. No thin pages. No skipped inner scopes. Scores home is already live — extend, do not rebuild it from scratch.

---

You are continuing **footballscore** (`github.com/Rezx100/footballscore`): association-football only, Next.js App Router, one app for phone (`<768`) and web (`≥768`).

## Read first (required)

1. `DESIGN.md` — visual system, page recipes, do/don’t  
2. `docs/brand.md` — honest-data rules, football lexicon, Medal palette  
3. `src/lib/league-palette.ts` — league brand atmospheres  
4. Current Scores UI: `src/components/matches/*`, `src/app/matches/page.tsx`  
5. ESPN client: `src/lib/espn/client.ts`, `matches.ts`, `map.ts`, `leagues.ts`

## Non-negotiables

- Sport slug is ESPN **`soccer` only**. Never call `football` (NFL) or other sports. UI copy says **football**, never soccer.
- **Honest data.** If ESPN does not send it, omit the module or label it empty. Never invent ratings, xG, xGOT, shot maps, transfer fees, market values, team-of-the-week, or Predict.
- **Drop on the floor:** odds, pickcenter, Watch, streaming CTAs, ESPN video embeds — even when present in JSON.
- **League brand color** (`league-palette.ts`) is **reserved for league silo pages and their inner tabs**. Scores home stays **neutral** charcoal chrome. Do not reintroduce per-league washes on `/matches`.
- Club color = thin rail or ≤12% wash only. Never full-bleed club skins on every page.
- Follow/watchlist is **app-owned** (`localStorage` + cookie). ESPN has no follow graph.
- URL-driven state: shareable, works without JS where practical.
- Crests stay **shields** (no circle crop). League marks sit on **light plates** on dark UI.
- Wordmark: Condensed split weight (`football` + quieter `score`) — **no copper underscore**.
- After each phase: commit, push, browser-verify new routes **and** `/matches` for regressions (390px + 1280px).

## Already shipped (do not regress)

- `/` → `/matches`
- Scores list: day rail, search, hide finished, elev score tiles, live copper accents, neutral home, first-class + header merge
- Tab bar destinations exist as placeholders — replace with real routes

## Definition of “not thin”

Every page must answer a real match-day question in **one glance**, then offer depth. A page is thin (and rejected) if it is only a title + “coming soon”, a single list with no context, or a shell that could have been a deep-link into nowhere. Each route below lists **minimum valuable modules**. Ship all modules that ESPN returns; omit only empty ones with honest copy.

---

## Information architecture (canonical routes)

| Object | Route | Notes |
| --- | --- | --- |
| Scores | `/matches` | Keep; polish only |
| Match | `/match/[id]?league={slug}` | `league` query **required** for ESPN |
| Explore | `/leagues` | Catalog + search |
| League silo | `/league/[slug]` | Brand atmosphere **allowed** here |
| Team | `/team/[league]/[id]` | Club rail |
| Player | `/player/[id]?league=&team=` | Only if payload is coherent; else names on lineups |
| Following | `/following` | App state |
| News index | `/news` | Aggregate |
| Article | `/news/[id]` | Or ESPN article deep link pattern you choose — keep shareable |
| Settings | `/more` | No fake Account |

Tab bar → real hrefs: Scores `/matches` · News `/news` · Leagues `/leagues` · Following `/following` · More `/more`.

---

## ESPN hosts & engineering

- Site: `https://site.api.espn.com`  
- Core: `https://sports.core.api.espn.com`  
- Crests: `https://a.espncdn.com/i/teamlogos/soccer/500/{id}.png`  
- Headers: `Accept: application/json`, real `User-Agent` (`footballscore/…`)  
- Cache: live summary/scoreboard `revalidate: 15`, standings/teams `60`, news `300`, catalog `86400`  
- `Promise.allSettled` everywhere — one league 404 must not blank a page  
- **Never** use `site/v2/.../standings` for soccer (empty). Use:  
  `GET /apis/v2/sports/soccer/{slug}/standings`  
- Expand `src/lib/espn/client.ts` with typed fetchers; map in `map*.ts`; keep raw ESPN JSON out of React  
- `encodeURIComponent` slugs (`uefa.europa.conf`)  
- Images: `a.espncdn.com` already allowed; `RemoteMark` onError → initials  
- A11y: live minute in text; tables have captions; W/D/L = letters + quiet fills, not color alone  
- Viewer timezone for kickoff / “today” (do not leave product TZ as `America/New_York`)

Add fetchers (names illustrative):  
`fetchSummary`, `fetchStandings`, `fetchTeams`, `fetchTeam`, `fetchRoster`, `fetchSchedule`, `fetchInjuries`, `fetchNews`, `fetchLeaguesCatalog`, optional `fetchPlays`.

---

## Phase 1 — Match page (highest value)

**Route:** `/match/[id]?league={slug}`  
**Endpoint:** `GET /apis/site/v2/sports/soccer/{league}/summary?event={id}`

Ignore: `odds`, `pickcenter`, `videos` (no embeds).

### Sticky scoreboard (always)

- Crests 48, Condensed names, score **or** countdown, live minute / HT / FT / PP / AB  
- Competition + round / leg from header / `seasonseries`  
- Follow team(s), share (Web Share API or copy link)  
- Dual club rails (3px), not full-bleed skins  
- Links: home/away → `/team/...`, competition → `/league/{slug}`

### Story strip

- One line: last key event when live/FT (“Xhaka 46' · goal”). Omit if none.

### Default panel — Timeline

- Merge `keyEvents` + `commentary`, newest first  
- Toggle: All / Key  
- Stronger cards for goal / card / sub; commentary as body  
- Empty: “No play-by-play yet.”  
- Optional (non-blocking): core plays `.../plays?limit=300` if commentary thin; cap ~150 rows

### Panel — Lineup

- From `rosters`: formation if present, starters (simple CSS pitch/grid), bench  
- Toggle home / away  
- Jersey # + name → player route only if Phase 5 ships  
- Empty: “Lineups not available yet.”

### Panel — Numbers

- `boxscore.teams[].statistics` as **dual-stat** bars (club-tint at accessible contrast)  
- Prefer: possessionPct, totalShots, shotsOnTarget, accuratePasses / passPct, wonCorners, foulsCommitted, offsides, yellowCards, redCards, saves, penaltyKickGoals — **only keys ESPN actually sends**  
- Empty: omit panel

### Panel — Table

- Mini table from `standings.groups`; highlight both clubs  
- Link “Full table” → `/league/[slug]`  
- Cups with empty standings: omit or show group notes — never fake a bracket

### Panel — Series & form

- `seasonseries` (H2H / leg context)  
- `lastFiveGames` as form pills (W/D/L letters)  
- Empty: omit

### Place

- `gameInfo.venue` (name, city, attendance), `officials` (referee)  
- Skip weather if absent

### Match news

- `news.articles` + `article` recap — headlines + relative time; tap → article  
- No video

**Match done when:** live and FT matches show scoreboard + at least Timeline or honest empty; Lineup and Numbers appear when ESPN sends them; browser-verified from a Scores tile tap.

---

## Phase 2 — League silo (brand color allowed)

**Route:** `/league/[slug]`  
**Wrap root in `.league-silo`** and set CSS vars from `paletteForLeague({ id: slug, name })`.

### Masthead

- League mark on light plate, name, country/meta  
- Atmospheric wash from league palette (this is the silo — OK here)  
- Follow league control

### Tabs / segments (all required if data exists)

1. **Now**  
   - Today’s / next fixtures from scoreboard(s)  
   - Mini table snapshot (top 4 + followed clubs if any)  
   - Live matches for this slug first  

2. **Table**  
   - Full `GET /apis/v2/sports/soccer/{slug}/standings`  
   - Columns ESPN provides (#, Team, PL, W, D, L, GF–GA or GF/GA, GD, PTS)  
   - Qualification notes/rails only if ESPN provides notes/colors  
   - Cups: if standings empty → fixtures + group notes, not a fake knockout tree  

3. **Fixtures**  
   - Scoreboards across calendar / season (`calendar` + `seasons` from core when needed)  
   - Group by date; filters: date range, team  
   - Each row = same elev score-tile language as Scores; tap → match  

4. **Clubs**  
   - `GET .../soccer/{slug}/teams`  
   - Crest plate, name, short; tap → team page  

5. **News**  
   - `GET .../soccer/{slug}/news`  
   - Cards: image if present, headline, byline, relative time  

6. **Leaders** (optional module)  
   - Core `.../leagues/{slug}/leaders` — **often 400** → hide entirely if fail  

**League done when:** first-class slug has Now + Table (or honest cup alternative) + Fixtures + News; atmosphere uses silo palette; home Scores still neutral.

---

## Phase 3 — Team page

**Route:** `/team/[league]/[id]`

| Need | Endpoint |
| --- | --- |
| Meta / color / logo | `.../teams/{id}` |
| Squad + coach | `.../teams/{id}/roster` |
| Schedule | `.../teams/{id}/schedule` |
| Injuries | `.../teams/{id}/injuries` — omit if empty |
| News | league news filtered by team + match recaps |

### Composition (all that have data)

1. Identity band — 3px club rail, crest, name, follow  
2. **Next match** — elev tile + countdown / live link  
3. **Form** — last five W/D/L  
4. **Mini table** — club highlighted; link to league table  
5. **Upcoming / recent** schedule list  
6. **Squad** — grouped by position; coach if present; jersey #  
7. **Injuries** — only if ESPN returns rows  
8. **News** — team-filtered headlines  

No trophies cabinet. No transfer-fee cards.

**Team done when:** next match + squad + schedule or honest empties; navigable from match scoreboard and league clubs list.

---

## Phase 4 — Explore + Following

### `/leagues` (Explore)

- Search: “Find leagues and clubs”  
- Sections: **Yours** (followed) · **World** (28 first-class) · **All ~218** accordion by country (`regionForSlug` / catalog)  
- Catalog: `GET https://sports.core.api.espn.com/v2/sports/soccer/leagues?limit=1000` → persist `src/lib/espn/catalog.json`, refresh daily  
- Tap league → `/league/[slug]`; club search hits → `/team/...`

### `/following`

- Persist `{ leagues: string[], teams: { league, id }[], order: string[] }` in `localStorage` + cookie for SSR sort  
- One list; add via search; suggested = first-class minus followed  
- Drives: Matches sort (followed first), live-rail priority, News “For you”, Explore “Yours”

**Done when:** follow a league → it rises on Scores; Explore shows 218 without crashing.

---

## Phase 5 — News + optional Player

### `/news`

- Aggregate news from first-class leagues (parallel; start with ~8 + followed)  
- Dedupe by article id; sort by `published`  
- Segments: **For you** · **World**  
- Cards: image, headline, byline, relative time → `/news/[id]` or stable article route

### `/news/[id]`

- Full headline, byline, published, body/summary ESPN provides  
- Related matches/teams links when ids exist  
- No video player

### `/player/[id]` (ship only if coherent)

- From roster athlete + summary leaders: name, team, position, number, recent stats if present  
- If ESPN payload is a stub → **do not ship the route**; keep players as lineup text

---

## Phase 6 — More / settings + Scores polish

### `/more`

- Timezone override, 12/24h, start tab, hide-finished default  
- About / data source honesty (“Scores from ESPN”)  
- Mark cycle can live here if still unlocked  
- No fake Account / auth

### Scores polish (while building above)

- Live rail under header when any match is live/ht — tappable  
- Sort: Live → followed → first-class with games → rest  
- Quiet-day storytelling (“Last night…”, “Next: …”) — not a dead empty  
- Viewer-local timezone end-to-end  

---

## UI system (apply everywhere)

- Cool near-black field `#0B0B0D`; elev tiles `#1C1C1F`; ink `#F5F5F7`; muted `#8E8E93`  
- Score tiles: Stack (home over away), 22px tabular mono, live copper/live token  
- League silo mastheads: `.league-silo` + palette vars  
- Motion: 160ms opacity/transform; live tick only  
- Empty states: title + one sentence + one text action  
- Skeletons match final layout  

---

## Implementation order (do not skip)

1. ESPN fetchers + mappers + types for summary / standings / teams / roster / schedule / news / catalog  
2. **Match page** (full modules above)  
3. **League silo** (Now / Table / Fixtures / Clubs / News + atmosphere)  
4. **Team page**  
5. **Explore + Following**  
6. **News** (+ Player only if earned)  
7. **More** + Scores live-rail / TZ / sort polish  
8. Desktop density (≥1100): same components, optional contextual rail — not a second product  

After each phase: commit with a clear message; browser-verify; update PR description with routes verified.

---

## Explicitly out of scope (do not build)

- Betting, odds, Watch, video embeds, xG/shot maps, invented ratings  
- Multi-sport chrome, NFL/NBA endpoints  
- League color washes on `/matches` home  
- Fake brackets when ESPN has no knockout payload  
- Thin “coming soon” destination tabs  

---

## Definition of done

A new user can:

1. Read today’s football on Scores in ~3 seconds  
2. Open any live/FT match and get timeline + lineup + stats **when ESPN has them**  
3. Open a first-class league and use table + fixtures + news inside a branded silo  
4. Open a club and see next match, form, schedule, squad  
5. Follow a league/team and see it sort to the top  
6. Explore all ~218 leagues and search clubs  
7. Read news without video/odds  
8. Never see invented stats, betting, or non-football sports  

Every shipped route is **dense with real modules**, not a title over an empty shell.

---

End of master prompt.
