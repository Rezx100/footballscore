# footballscore — master implementation prompt

Copy everything below the line into a coding agent. The agent must follow it in order: **redesign first**, then ESPN-backed product surfaces. Do not skip Phase 0.

---

You are implementing **footballscore**, a football-only (association football / soccer) scores product: one Next.js App Router app that is both the **phone app** (`<768px`) and the **website** (`≥768px`). Repo: `github.com/Rezx100/footballscore`. Current branch already has a FotMob-lookalike Matches list wired to ESPN soccer.

## 0. Mission (read twice)

Build a scores product that is **better than FotMob**, not a clone of it.

FotMob, Apple Sports, SofaScore, X Sports, and Perplexity Sports are **references for jobs-to-be-done and information density**, not templates. If a screen would be recognizable as “FotMob with our wordmark,” it is wrong. Invent **footballscore’s own visual language, information architecture, and interaction model**, then fill it with **real ESPN soccer data**.

**Non-negotiables**
- Soccer only. ESPN sport slug is `soccer`. Never call `football` (that is NFL), NBA, MLB, or NHL endpoints.
- No betting, odds, pickcenter, DraftKings, “Watch”, streaming paywalls, or video players — even when ESPN returns them. Drop those fields on the floor.
- Do not invent FotMob-only data: player ratings, TOTW, xG, xGOT, shot maps, goal maps, transfer fees, market values. If ESPN does not have it, the UI must not fake it. Design around **honest ESPN stats**.
- Follow / watchlist is **our** client state (cookie or local storage for v1). ESPN has no follow graph.
- Keep URL-driven filters (shareable, work without JS) for day, query, hide, selected match, league, team, tab.
- Verify UI in a real browser after visual or interaction changes: click, navigate, empty/error/live/FT — not a single screenshot.

**Current code (do not throw away blindly)**
- Next.js 16 App Router, React 19, Tailwind 4, `src/`
- Live Matches: `src/app/matches/page.tsx` → `getMatchesForDay` in `src/lib/espn/matches.ts`
- ESPN client: `src/lib/espn/client.ts` (header + per-league scoreboard only)
- First-class 28 leagues: `src/lib/espn/leagues.ts`
- Types: `src/lib/types.ts`
- Old spec that said “copy FotMob”: `docs/ui-spec.md` — **superseded by this prompt**. You may keep tokens that still fit; you must replace the “copy FotMob / X / Perplexity chrome” mandate.

---

## Phase 0 — Redesign (must complete before new ESPN pages)

The existing Matches UI is a FotMob facsimile inside a fake iPhone bezel. That bezel and that visual system go away (or become an optional “device preview” in Storybook only — not the product).

### 0.1 Product bets (this is how we beat FotMob)

1. **One design system, two densities.** Phone and desktop share components, type scale, and color. Desktop is not a 3-column Perplexity clone. It is the same product with more simultaneous context (live rail + table + article).
2. **The day has a story, not a dump.** Live matches never sit below 40 NCAA/cup groups. Order: **Live → followed → first-class with games → the rest**. Quiet days are designed (“Last night in the Championship”, “Next: Friday’s Premier League”), not a dead empty state.
3. **A match is one story.** FotMob’s 7 competing tabs (Preview / Facts / Commentary / Lineup / Stats / Table / H2H / Knockout) force hunting. footballscore uses a **sticky scoreboard + a single Timeline** (key events and commentary merged), with **Lineup, Stats, Table, Series** as secondary panels or a compact segment — never seven equal tabs.
4. **User clock, not ESPN Eastern.** Format kickoff and group “today” in the **viewer’s timezone** (client `resolvedOptions().timeZone`, with ISO stored on the server). Do not leave `America/New_York` as the product TZ.
5. **Follow is a sort key, not a ghetto.** Followed leagues/teams float to the top of Matches, but the rest of the world’s games stay one scroll away. Discoverability must not require opening Leagues.
6. **Crests are identity.** Shield logos stay shields (no circle crop). League marks stay square-ish. Initials only when ESPN has no `logo`.
7. **Live is a verb.** Live minute is `--live`, announced in text (`aria-label`), and a thin **live rail** (horizontal) sits under the header whenever anything is in play — tappable into that match.
8. **Silence the junk.** No odds, no Watch, no Predict, no “Subscribe on Apple TV”. Broadcast names may appear as quiet text (“USA Network”) if ESPN sends them.
9. **Honest gaps.** If commentary is empty, say “No play-by-play yet.” If injuries are `{}`, omit the section. If leaders 400, hide Leaders. Never skeleton-fake xG bars.
10. **Speed of reading.** Primary type is ink on paper-light (not Apple Sports’ all-black sports TV, not FotMob’s iOS grey soup). Use **one** accent. Football green `#00A651` may stay as live/follow only — not as a page tint.

### 0.2 Visual language (invent it, then lock tokens)

Create a named system in `src/app/globals.css` and a short `docs/design.md` (one page):

| Token | Role |
| --- | --- |
| `--bg` | Page (not `#F2F2F7` iOS chrome unless you can defend it) |
| `--surface` | Cards |
| `--ink` / `--muted` / `--line` | Text and rules |
| `--live` | Live only |
| `--follow` | Follow/following (can equal live) |
| `--danger` | Unfollow / red card |
| `--home` / `--away` | Optional, derived from ESPN team colors at 12% tint — never full-bleed club red headers on every page (FotMob does this; we use a **thin color rail** or a 48px band, then white body) |

**Type:** One family (already Geist). Display for scores (tabular-nums, heavy). Body 15–16. Meta 12–13 muted. Do not mimic SF Pro + FotMob 34pt large titles unless it is clearly ours.

**Motion:** 150–200ms opacity/transform only. Live minute can tick; do not bounce crests.

**Chrome**
- **Phone:** top bar (wordmark + search + calendar) + **four** destinations, not five if you can justify it. Recommended: **Scores · Explore · Following · More**. News is not a peer tab — it lives inside Explore and Match. If you keep five, News must earn it with real ESPN articles, not a placeholder.
- **Desktop ≥1100px:** left icon rail OR a top nav — pick one and commit. Center = Scores. Optional right column only when it adds data (mini table on a league, timeline on a match). No dark “phone shell” on desktop.
- **768–1099:** single column, phone layouts, no squeezed 3-col.

**Match row (must be original)**
Do **not** copy FotMob’s `home name | crest | time/score | crest | away name | TV`.
Design a row that still puts **home left, away right** (football convention) but is unmistakably ours. Suggested: stacked names under crests (Apple Sports–like) **or** a single baseline with score as the only center axis and status as a small pill — pick one after a 3-option sketch in `docs/design.md`, then implement **one**.

**League group**
League mark + name + optional “Hide finished” per group. Followed groups get a quiet star, not a green wall.

### 0.3 Information architecture (routes stay canonical)

Keep these routes so deep links survive the redesign:

| Object | Route |
| --- | --- |
| Scores (home) | `/matches` (alias `/` redirect) |
| Match | `/match/[id]?league={slug}` (league slug required for ESPN paths) |
| Explore / leagues index | `/leagues` |
| League | `/league/[slug]` |
| Team | `/team/[slug]/[id]` (ESPN team id + league slug) |
| Player | `/player/[id]` (only if ESPN athlete payload is enough; otherwise defer with a honest “limited player pages” note) |
| Following | `/following` |
| News index | `/news` |
| Article | `/news/[id]` |
| Settings | `/more` |

Query params to preserve/extend: `day`, `date=` (prefer ISO `YYYY-MM-DD` over `yesterday`), `q`, `hide`, `match`, `tab`.

### 0.4 Redesign deliverable (Phase 0 done when)

- [ ] `docs/design.md` exists: tokens, type, row anatomy, nav, “how we differ from FotMob” in 10 bullets.
- [ ] Phone shell removed from the default product (`src/components/phone-shell.tsx` unused on `/matches`).
- [ ] `/matches` restyled to the new system **with the same ESPN data** (no regressions: day strip, search, hide finished, live/`FT`/`PP`/`AB`, crests).
- [ ] Live rail on Scores when any match is `live` or `ht`.
- [ ] Timezone is viewer-local.
- [ ] Browser-verified at 390px and 1280px.

Do **not** start Match/League/Team/News pages until Phase 0 is verified.

---

## Phase 1+ — ESPN soccer API (unofficial, no key)

Base hosts
- Site: `https://site.api.espn.com`
- Core: `https://sports.core.api.espn.com`
- Marks: `https://a.espncdn.com/i/teamlogos/soccer/500/{teamId}.png` and `https://a.espncdn.com/i/leaguelogos/soccer/500/{logoId}.png`

Headers on every fetch: `Accept: application/json`, a real `User-Agent`. Cache: `next: { revalidate: 15 }` for live scoreboards/summary, `60` for standings/teams, `300` for news, `86400` for league catalog.

Always `Promise.allSettled`. One league 404 must not blank the page.

**Never** use `site/v2/.../standings` for soccer (empty `{}`). Standings are:

`GET https://site.api.espn.com/apis/v2/sports/soccer/{league}/standings`

### 1. Catalog

| Need | Endpoint |
| --- | --- |
| All 218 slugs | `GET https://sports.core.api.espn.com/v2/sports/soccer/leagues?limit=1000` |
| First-class 28 | Keep `FIRST_CLASS_LEAGUES` in `src/lib/espn/leagues.ts` (already listed). Priority 0–27. |
| Clubs in a league | `GET /apis/site/v2/sports/soccer/{league}/teams` |
| One club | `GET /apis/site/v2/sports/soccer/{league}/teams/{id}` |
| League logos | From scoreboard `leagues[0].logos` or first-class table |

Persist a generated `src/lib/espn/catalog.json` (slug, name, $ref) at build or first request, refresh daily. Explore page lists **all 218**, grouped by slug prefix → country (map already in `regionForSlug`). First-class pinned at top.

### 2. Scores / Matches (extend existing)

Already implemented: header + 28 scoreboards, merge by event id, filter by calendar day.

Keep and improve:

| Need | Endpoint |
| --- | --- |
| Cross-league day | `GET /apis/v2/scoreboard/header?sport=soccer&dates={YYYYMMDD}` |
| Per league day | `GET /apis/site/v2/sports/soccer/{league}/scoreboard?dates={YYYYMMDD}` |

Map
- `status.type.name` / header `fullStatus`: `STATUS_SCHEDULED` → ns, `IN_PROGRESS` / `FIRST_HALF` / `SECOND_HALF` → live, `HALFTIME` → ht, `FULL_TIME` / `FINAL` / `post` → ft, `POSTPONED`/`CANCEL` → pp, `ABANDON` → ab
- Clock: `displayClock` / header `clock` (keep `90'+1'`). If live and missing, show `LIVE`
- Scores: competitor `score`; omit for ns/pp/ab
- Home left: `homeAway === "home"` — ESPN order is often away-first
- Form: competitor `form` (`WWDLW`) — show as five tiny pills on match detail and team cards, optional on rows if not noisy
- Kickoff: event `date` ISO → viewer TZ
- TV: `onWatch` or `competitions[].broadcasts` → quiet broadcaster label, not a TV icon farm
- Crest: `competitor.logo` or espncdn by id
- Color: `#` + `team.color` (6 hex)

Header `dates=` is leaky and capped (~75 events). **Always filter by viewer calendar date** and **always merge first-class scoreboards** so EPL is not dropped.

### 3. Match detail — `GET /apis/site/v2/sports/soccer/{league}/summary?event={id}`

Wire `/match/[id]`. Pass `league` in the path or searchParams; ESPN requires the league slug.

The summary payload includes (verified): `boxscore`, `gameInfo`, `lastFiveGames`, `leaders`, `broadcasts`, `rosters`, `news`, `article`, `videos`, `header`, `seasonseries`, `keyEvents`, `commentary`, `standings`, plus `odds`/`pickcenter` **ignore**.

**Layout (redesigned, not FotMob tabs)**

1. **Sticky scoreboard** — crests (shields), names, score or countdown, live minute, competition + round / `2nd leg` from header/seasonseries. Follow star, share, notify (notify can be UI-only v1).
2. **Story strip** — last key event in one line (“Xhaka 46' · goal”) when live/FT.
3. **Timeline** (default panel) — merge `keyEvents` + `commentary`:
   - Newest-first
   - Toggle: All / Key
   - Goal/card/sub get stronger cards; commentary is body text
   - Do **not** build shot maps or xG from nothing
4. **Lineup panel** — `rosters`: formation if present, starters on a simple pitch (CSS grid, not a photo-real pitch), bench below. Toggle home/away. Jersey # + name. No market-value chips (ESPN doesn’t have them).
5. **Numbers panel** — `boxscore.teams[].statistics` as dual bars:
   - possessionPct, totalShots, shotsOnTarget, accuratePasses/passPct, wonCorners, foulsCommitted, offsides, yellowCards, redCards, saves, penaltyKickGoals
   - Tint bars with team colors at accessible contrast
6. **Table panel** — `standings.groups` mini table, highlight both clubs; link to `/league/[slug]`
7. **Series panel** — `seasonseries` + `lastFiveGames` as H2H-ish and form pills
8. **Place** — `gameInfo.venue` (name, city, attendance), `officials` (referee). Skip weather if absent.
9. **News** — `news.articles` + `article` recap. Headlines only; no ESPN video embed.

Optional deeper PBP (do not block v1):  
`GET https://sports.core.api.espn.com/v2/sports/soccer/leagues/{league}/events/{id}/competitions/{id}/plays?limit=300`  
Use if commentary is thin. Cap display at ~150 rows.

### 4. League pages

`/league/[slug]`

| Need | Endpoint | Notes |
| --- | --- | --- |
| Table | `/apis/v2/sports/soccer/{slug}/standings` | Columns: # Team PL W D L GF-GA GD PTS if present. Qualification rails only if ESPN notes/color exist — don’t invent CL/EL/relegation colors |
| Fixtures | scoreboard `dates=` across the season calendar | Group by date; filters Date / Team |
| Clubs | `.../teams` | |
| News | `GET /apis/site/v2/sports/soccer/{slug}/news` | headline, image, byline, published |
| Calendar / season | core `.../leagues/{slug}/calendar` and `.../seasons` | season dropdown |
| Leaders | core `.../leagues/{slug}/leaders` | **can 400** — hide the module |

Overview composition (not six FotMob tabs): **Now** (today’s/next fixtures + mini table) / **Table** / **Fixtures** / **News**. Stats/leaders only when the endpoint works.

Cups: if standings are empty, show fixtures + knockout-ish grouping from scoreboard `group` / `notes`, not a fake bracket.

### 5. Team pages

`/team/[league]/[id]`

| Need | Endpoint |
| --- | --- |
| Metadata, color, logo | `.../teams/{id}` |
| Squad + coach | `.../teams/{id}/roster` (`athletes`, `coach`) |
| Schedule | `.../teams/{id}/schedule` |
| Injuries | `.../teams/{id}/injuries` — **often empty**; omit section |
| News | filter league news by team id/category, plus match summaries |

Composition: identity band (thin club color) → **Next match** → **Form** (last 5 from schedule) → **Mini table** (from league standings, row highlighted) → **Upcoming** → **Squad** (by position if ESPN sends it) → **News**. No trophies cabinet (ESPN doesn’t give a clean honours list). No transfer-fee cards.

### 6. News

- Index `/news`: aggregate news from first-class leagues (parallel, cap 8 leagues to start) + followed leagues. Deduplicate by article id. Sort by `published`.
- Cards: image if present, headline, source/byline, relative time. Tap → `/news/[id]` or external `links.web.href` if body missing.
- Match page already has tagged articles.
- Tabs: **For you** (followed teams/leagues) · **World** (first-class mix). Do not clone FotMob’s three news tabs unless the data supports it.

### 7. Following (app-owned)

Store `{ leagues: string[], teams: { league, id }[], order: string[] }` in `localStorage` + a cookie so the server can sort Matches on first paint.

UI `/following`: one list, not a fantasy grid. Add via search (leagues + teams from ESPN teams endpoints). Suggested = first-class minus already followed.

Following drives: Matches sort, live rail priority, News “For you”, league default chips.

### 8. Explore (`/leagues`)

Search “Find leagues and clubs”. Sections: **Yours** · **World** (28) · **All 218** accordion by country. Tap → league page. Do not copy FotMob’s “Don’t show again” suggested block unless you have a better first-run.

### 9. More / settings

Appearance (light default, optional dark — design dark as first-class if you add it), timezone override, 12/24h, start tab, hide finished by default, about. No fake Account unless you add auth (out of scope).

### 10. What you must not build (ESPN missing or forbidden)

- FotMob rating, TOTW, Predict
- xG, xGOT, shot maps, goal maps
- Transfer centre with fees / market value
- Full TV guide
- Player season splits that 404 (`site.web.api` athlete stats/gamelog)
- ESPN video, odds, Watch
- NFL/NBA/etc.

Player pages: only ship if roster athlete + summary leaders give a coherent profile (name, team, position, number). Otherwise players are names on lineups that don’t 404.

---

## Engineering rules

- Expand `src/lib/espn/client.ts` with typed fetchers: `fetchHeader`, `fetchScoreboard`, `fetchSummary`, `fetchStandings`, `fetchTeams`, `fetchTeam`, `fetchRoster`, `fetchSchedule`, `fetchNews`, `fetchLeaguesCatalog`. No fetch in client components except timezone/follow.
- Map in `src/lib/espn/map*.ts`. Keep ESPN JSON out of React files.
- `encodeURIComponent` league slugs (`uefa.europa.conf`).
- Dynamic scores: `export const dynamic = "force-dynamic"` plus fetch revalidate.
- Images: `next.config.ts` already allows `a.espncdn.com`. Keep `unoptimized` for crests. `onError` → initials (`RemoteMark`).
- Accessibility: every live minute in text; table has a caption; contrast on club tints; don’t use color alone for W/D/L (use letters).
- Loading: real skeletons that match the new layout. Errors: inline retry, not a white crash.
- Tests: mapper unit tests for status, home/away swap, date filter. Optional: a script that hits summary for one known event id and asserts keys.

## Implementation order (do not parallelize across phases)

0. Design system + Scores restyle (existing ESPN Matches)
1. Match detail (summary) — unblocks everything else
2. League (standings + fixtures + news)
3. Team (roster + schedule)
4. Explore catalog (218) + Following persistence
5. News index
6. Desktop density pass
7. Polish: live rail, quiet-day storytelling, 12/24h, hide-finished default

After each phase: commit, browser-verify the new routes **and** `/matches` for regressions.

## Definition of done

A new user can: open Scores and understand today’s football in 3 seconds; tap a live or FT match and see timeline + lineup + stats from ESPN; open a first-class league table; open a club and see next match + squad; follow a league and see it sort to the top; search a team name; never see odds, video, xG, or NFL. The UI does not look like FotMob.

---

End of prompt.
