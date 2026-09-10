# Master prompt — implement the entire Figma file (non-looped)

Copy everything below the horizontal rule into a **new** coding-agent session.

This is **not** the four-role pixel gauntlet. Do not run capture → critic → editor loops. Do not score screens. Implement the Figma product once, verify in the browser, ship.

---

You are implementing the **entire Scory Figma library** on **footballscore** (`github.com/Rezx100/footballscore`). One product. Dark mode. Live ESPN football only.

**YOLO:** do not stop for permission. Finish every screen and shared component. Commit and push as you complete each phase. Browser-verify at 390×844 before calling a screen done.

## What this is / is not

- **Is:** one implementation pass. Read Figma with MCP (`get_design_context`, `get_screenshot`, `get_variable_defs`). Build the missing screens and restyle the existing ones so every Dark frame has a real route (or a real empty/loading state).
- **Is not:** the four-role loop (Harness / Orchestrator / Blind critic / Editor). No YAML verdicts. No “99 is failure.” No recapture loops. If a measurement is missing, **open Figma and read it** — do not write UNKNOWN and stop.

## Read first (required)

1. This file.
2. `node_modules/next/dist/docs/` before writing Next.js code (this repo’s Next is not the Next in your training data).
3. `src/app/globals.css` — Scory tokens already exist.
4. `src/components/matches/*` — `/matches` already matches **Upcoming Matches / Dark** (`32:3111`). Do not regress it.
5. `src/app/**/page.tsx` — current routes.
6. `src/lib/espn/*` — data you must reuse. Do not invent stats, fees, xG, or vote percentages.
7. Figma file `XZr22nxzzfkrQ1qz8oYk5D`  
   https://www.figma.com/design/XZr22nxzzfkrQ1qz8oYk5D

### Figma pages

| Page | Node | Role |
|---|---|---|
| Cover | `0:1` | Marketing. Do **not** implement. |
| Icons | `2:80` | Icon set 16/20/24. Stroke 1.75, round caps. |
| Buttons | `2:81` | Button + Icon Button variants. |
| Badges & Status | `2:82` | Live / FT / Error / Info + W/D/L form pills. |
| Inputs & Search | `2:83` | Search Field + Category Pill. |
| Navigation | `2:84` | Date Chip, Underline Tab, Nav Item, Bottom Nav, Date Selector, App Header. |
| Match Components | `2:85` | Crest, Competition Header, Upcoming Match Row, Live Match Card, Favorite Chip, Upcoming Fixture Card, Dual Stat Bar, Vote Button, Match Countdown Hero, Who Will Win. |
| Screens · Dark | `2:91` | **The 14 product screens.** Implement these. |
| Showcase Boards | `38:18` | Marketing boards. Reference only. Do **not** treat as routes. |

`get_metadata` on the file root may omit `2:91`. The page still exists — call `get_metadata` with `nodeId: "2:91"`.

## Brand lock (hard fail if broken)

Shipping theme is **Scory Dark**, not Medal.

| Token | Value |
|---|---|
| Type | **Inter only** (already in `layout.tsx`) |
| `--scory-bg-canvas` / `--scory-bg-nav` | `#060712` |
| `--scory-bg-brand` | `#6c0707` |
| `--scory-bg-chip` | `#1f2937` |
| `--scory-text-primary` | `#ffffff` |
| `--scory-text-secondary` / `--scory-icon-muted` | `#9ca3af` |
| `--scory-text-brand` / `--scory-icon-brand` | `#f87171` |
| `--scory-status-live` | `#ef4444` |
| `--scory-bg-live` | `#590707` |
| Radius | md 8 / lg 12 / full 999 |

Do **not** bring back IBM Plex, copper `#C17A3A` as product chrome, or the Medal flap mark on any restyled screen. Delete copper `BrandMark` from `SiteLockup`. Every page uses the Scory App Header (`[:]` + Scory + Football pill + 32px actions + 28px crimson avatar) or the Figma **Team Detail Header** / **Match Countdown Hero** where the frame specifies those.

Light frames in Showcase Boards are the same IA in light tokens. **Do not ship a second theme in this pass.** Dark only.

## Honest data (hard fail if broken)

- ESPN `soccer` only. UI copy says **football**.
- Club names, crests, kickoffs, scores, competition strings, news headlines, squads, form W/D/L, and match stats come from ESPN.
- **Never invent** xG, transfer fees, vote shares, “who will win” percentages, or fake PSG–Juve fixtures.
- **Who Will Win / Vote Button:** if ESPN has no real pick’em, **omit the module** (or render a follow/notify CTA). Do not fake 40/30/30 bars.
- **Transfers:** build the Figma Transfer Card UI; if ESPN has no transfer payload, show the Figma **Empty State**. Do not invent deals.
- Calendar chip *labels* are live dates, not Figma’s mock “Jun N”.

## Already done — do not redo, do not regress

`/matches` = **Upcoming Matches / Dark** `32:3111` (gauntlet PASS 100). Keep:

- 80px App Header + 9:41 / 8×8 dots / 100%
- Date rail Today → Tomorrow → dated chip
- Competition Header 24×24 white disc + 2px **outside** halo
- 358×84 `#1f2937` Upcoming Match Row, time left, stacked clubs, 20px bell
- Bottom Nav Home | Matches | News | Leagues | Following (no More tab)
- Home house outline, no Next.js N-badge (`devIndicators: false` + hide `nextjs-portal`)

Shared pieces already in code (extend, don’t fork):

- `src/components/matches/figma-icons.tsx`
- `src/components/matches/status-bar.tsx`
- `src/components/brand/lockup.tsx` (Scory App Header actions)
- `src/components/matches/tab-bar.tsx`
- `src/components/matches/crest.tsx` / `match-row.tsx` / `league-group.tsx` / `day-head.tsx`

## Route map (implement every Dark screen)

All frames are **390×844**. Viewport for visual QA is 390×844.

| # | Figma frame | Node | App target | Status |
|---|---|---|---|---|
| 1 | Upcoming Matches / Dark | `32:3111` | `/matches` | **Done** |
| 2 | Score Feed / Dark | `32:3045` | `/` (Home tab). Stop redirecting `/` to `/matches`. | Build |
| 3 | Live Matches / Dark | `32:3102` | `/live` and/or `/matches?tab=live`. Home live rail links here. | Build |
| 4 | Match Details / Dark | `32:3124` | `/match/[id]` | Restyle |
| 5 | Team Profile / Dark | `32:3074` | `/team/[league]/[id]` | Restyle |
| 6 | Transfers / Dark | `32:3093` | `/team/[league]/[id]/transfers` or `?tab=transfers` | Build |
| 7 | Statistics / Dark | `32:3160` | `/team/[league]/[id]?tab=stats` | Restyle |
| 8 | Squad / Dark | `32:3175` | `/team/[league]/[id]?tab=squad` | Restyle |
| 9 | Search / Dark | `32:3188` | `/search` — wire the header search icon here (today it only toggles a `/matches` query box) | Build |
| 10 | News / Dark | `32:3205` | `/news` | Restyle |
| 11 | Favorites / Dark | `32:3221` | `/following` | Restyle |
| 12 | Calendar / Dark | `32:3237` | `/calendar` — wire the header calendar icon here | Build |
| 13 | Empty State / Dark | `32:3246` | Shared empty module on every list | Build |
| 14 | Loading / Dark | `32:3253` | Shared skeleton module | Build |

There is **no** Figma Leagues grid. Keep `/leagues` but restyle it with Search Field, Category Pills, Competition Headers, and crests — same tokens, not the old Medal dump.

`/more` is off the Figma tab bar. Keep the route for prefs if needed; do not put **More** back in Bottom Nav.

`/news/[id]` and `/player/[id]` have no dedicated Figma frames. Restyle them with App Header / Team Detail Header, News Card, Player Row, and tokens so they do not look like Medal leftovers.

`/league/[slug]` has no dedicated Figma frame. Restyle with Competition Header + Upcoming Match Rows + date chips.

## Shared chrome (every screen)

Use Figma components, not one-off CSS:

1. **App Header** `7:46` — status bar + `[:]` Scory + Football Category Pill + search/calendar/filter 32 + avatar 28. Reuse `Lockup` + `StatusBar`.
2. **Team Detail Header** — back, crest, name, follow. Use on Team / Transfers / Stats / Squad.
3. **Match Countdown Hero** `22:536` — on Match Details (upcoming). Live matches use **Live Match Card** language in the hero if the match is in play.
4. **Bottom Nav** `7:4` — five tabs, 56px at y=768, labels 11/14, active label `#f87171`, icons white outlines, home indicator 134×5. One instance in `layout.tsx` (already).
5. **Date Selector** `7:35` — horizontal chips, `touch-action: pan-x pinch-zoom`.
6. **Underline Tab** `6:222` / `6:225` — News, Search, Match Details, team inner tabs.

## Component library (build or finish before the leftover screens)

Put primitives under `src/components/scory/` (or extend `figma-icons.tsx` + `ui/`). One implementation per Figma symbol. No Lucide/SF/emoji substitutes.

**Icons (`2:80`)** — 16/20/24, INSTANCE_SWAP not a variant-per-icon: home, matches, news, trophy, heart, search, calendar, filter, share, back, plus, bell, chevron-down, chevron-right, clock, user, more, close, star, check.

**Buttons (`2:81`)** — Primary/Secondary/Outline/Ghost × Small/Medium × Default/Pressed/Disabled. Icon Button 32×32 Primary/Soft/Outline/Ghost.

**Badges (`2:82`)** — Live / Completed / FT / Error / Info (Solid + Soft). Form Pill W/D/L.

**Inputs (`2:83`)** — Search Field 358×44 Default/Focused/Filled/Disabled. Category Pill (Football selected = `#6c0707`).

**Match (`2:85`)** — Team Crest SM/MD/LG/XL (white plate + outside halo). Competition Header. Upcoming Match Row (reuse). Live Match Card 320/358×154. Favorite Chip. Upcoming Fixture Card 358×188. Dual Stat Bar (wire to ESPN `DualStat`). Vote Button only if real data exists. Match Countdown Hero. Who Will Win (omit if no data).

Also from screens: News Card 358×88, Transfer Card 358×166, Stat Tile, Stat Row, Info Row, Player Row 358×60, Calendar Month, Empty State 358×180, Skeleton Row 358×64.

## Screen-by-screen build notes

### Score Feed `/` (`32:3045`) — Home

App Header. **Favorites** rail (40×40 crests + labels + Add). **Live rail** of Live Match Cards (replace today’s copper chip `LiveRail`). Date Selector. Fixtures = Competition Header + Upcoming Match Rows. This is the Home tab.

### Live Matches `/live` (`32:3102`)

App Header. Title “Live Matches”. Stack of Live Match Cards. Empty State when the ESPN day has no in-play games.

### Match Details `/match/[id]` (`32:3124`)

Match Countdown Hero (or live hero). Five Underline Tabs as in Figma. Default body: Who Will Win **only with real data**, Prematch Form (ESPN last-five → Form Pills), Match Stats (existing `DualStats` restyled as Dual Stat Bar). Keep ESPN Timeline / Lineup / Table behind the extra underline tabs — do not delete working panels; restyle them.

### Team Profile `/team/...` (`32:3074`)

Team Detail Header. “Upcoming Match” + Upcoming Fixture Card. Four Stat Tiles. Info Rows. Trending News Card. Tabs or links through to Transfers / Statistics / Squad.

### Transfers (`32:3093`)

Team Detail Header + Transfer Card list, or Empty State.

### Statistics (`32:3160`)

Team Detail Header. Section label (Attack, …) + Stat Rows from ESPN team/player stats. Skip rows you cannot source.

### Squad (`32:3175`)

Team Detail Header + Player Rows (photo/initials, name, number, position). Link to `/player/[id]`.

### Search `/search` (`32:3188`)

App Header. Search Field. Underline Tabs (map Figma labels via `get_design_context` — do not guess). Trending News Cards. Also search clubs/leagues with existing ESPN catalog.

### News `/news` (`32:3205`)

App Header. Underline Tabs (replace today’s SegmentTabs). News Card list 358×88. Article route uses the same card + tokens.

### Favorites `/following` (`32:3221`)

App Header. “Following” + Favorite Chip row. “Upcoming” + Upcoming Match Rows for followed teams/leagues.

### Calendar `/calendar` (`32:3237`)

App Header + Date Selector + “Pick a date” + Calendar Month. Selecting a day navigates to `/matches?day=…` or a dated query the existing date lib already understands.

### Empty / Loading

Extract Figma Empty State and Skeleton Row. Use on every list (live, news, following, search, transfers, no-fixtures day). `/matches` empty copy can keep ESPN fallback text inside the Figma empty layout.

## IA / tab changes

```
Home      → /           Score Feed / Dark
Matches   → /matches    Upcoming Matches / Dark   (done)
News      → /news       News / Dark
Leagues   → /leagues    restyled, no Figma frame
Following → /following  Favorites / Dark
```

Header search → `/search`. Header calendar → `/calendar`. Do not leave those icons inert.

## Implementation order

0. Primitives: remaining icons, Button, Badge, Search Field, Underline Tab, News Card, Live Match Card, Empty, Skeleton. Tokens complete in `globals.css`.
1. Kill Medal leftovers: `SiteLockup` copper mark, Plex class usage on restyled pages, `--copper` as tab/live chrome (live uses `--scory-status-live` / `--scory-bg-live`).
2. Home Score Feed + Live Matches + Live Match Card (replaces `LiveRail`).
3. Match Details restyle.
4. Team Profile + Stats + Squad + Transfers.
5. News + Search + Following + Calendar.
6. `/leagues`, `/league/[slug]`, `/news/[id]`, `/player/[id]` token-aligned.
7. Empty + Loading on every list.

Commit after each numbered phase.

## Visual QA (not a scoring loop)

For each shipped screen:

1. `get_screenshot` of the Figma frame (`maxDimension` 1688; native size is 390×844).
2. Open the app route in a browser at **390×844**.
3. Click through: tabs, search, calendar, a match, a team, following, empty live day if you can.
4. Fix obvious chrome misses (header, type, pad, gap, radius, colors). Do **not** start a critic YAML loop.
5. `npx tsc --noEmit` clean.

Desktop `≥768` can stay a centered 390–720 column. Do not invent a separate desktop Figma.

## Git

- Branch from latest `main`. Name: `cursor/<short-name>-9018` (lowercase).
- Push `origin HEAD`. Open/update the PR against `main`.
- Do not revert `/matches` geometry.

## Definition of done

- All 14 Dark frames are either a route, a tab on a route, or a shared empty/loading module actually used.
- Bottom Nav and App Header match Figma on every restyled page.
- No Medal flap, no Plex, no copper product chrome.
- No fake vote % / transfer fees.
- `/matches` still matches `32:3111`.
- `tsc` clean. Browser-checked at 390×844 for Home, Matches, Live, Match, Team, News, Following, Search, Calendar.

Start at phase 0. Do not ask which screen to do first.
