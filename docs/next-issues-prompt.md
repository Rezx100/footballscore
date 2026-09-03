# footballscore — master prompt: icons, league UI, visual QA, touch

Copy everything below the horizontal rule into a coding agent.  
**Goal:** native-feeling tab icons, a dedicated Apple Sports–*inspired* (not copied) leagues experience, a league silo whose chrome actually works, and scroll/touch that is correct at the document architecture — not a CSS bandage. **Visual pass is required.** A green `tsc` / HTTP 200 is not “fixed.”

---

You are continuing **footballscore** (`github.com/Rezx100/footballscore`): association-football only, Next.js App Router, one product for phone (`<768`) and web (`≥768`). Medal field is live. Scores home is live on production.

**YOLO:** do not stop for permission. Finish all four issues. Commit, push, and visually verify as you go.

## Read first (required)

1. `DESIGN.md` — visual system, tab-bar recipe, do/don’t (especially **no Apple Sports green**, no circle-cropped crests)
2. `docs/brand.md` — honest-data, football lexicon, Medal palette
3. `src/lib/league-palette.ts` — silo atmospheres only (never on `/matches`)
4. `src/components/matches/tab-bar.tsx` — text-only tabs today
5. `src/components/explore/explore-view.tsx` — `/leagues` is a country `<details>` **text dump**
6. `src/components/league/league-view.tsx` + `src/components/shell/page-shell.tsx` — silo masthead + product lockup + segment chips + bottom tabs
7. `src/app/globals.css` — `html, body { height: 100% }`, `.league-silo`, sticky chrome
8. `src/lib/espn/leagues.ts` — 28 first-class slugs (Higgsfield league marks must cover these)
9. Higgsfield MCP: `generate_image` / `generate_image_batch` (icons). Do not skip generation and drop in Lucide/SF Symbols/emoji.

## Non-negotiables (do not regress)

- ESPN sport slug **`soccer` only**. UI copy says **football**.
- Honest data. No invented xG, fees, ratings, Predict.
- Drop odds / Watch / video.
- League brand color **only** on `/league/[slug]` (and that silo’s inner tabs). `/matches` stays neutral charcoal.
- Crests = **shields on light plates**. Never `{rounded.full}` circle crops (DESIGN.md). Apple Sports circles their logos — **we do not copy that**.
- Wordmark: Condensed split (`football` + quieter `score`), no copper underscore.
- No second type family. IBM Plex Sans / Condensed / Mono only.
- Copper is live accent, date flap, mark hinge — **not** a fill for every active tab.
- After each phase: commit, push, **browser-verify at 390px and ~1280px**.

## Definition of done (visual, not technical)

An issue is **not done** until:

1. Code is in (`tsc` clean, `next build` succeeds).
2. A **Grok 4.5 computer-use subagent** has recorded **video of every affected route** on phone width, used the UI like a human (tap, scroll, swipe, back), and written a **pass/fail verdict**.
3. Failures are **fixed and re-recorded**. A “we’ll polish later” note is a fail.
4. Side-by-side: screenshot vs `DESIGN.md` recipe (and, for leagues, vs Apple Sports *structure* — identity first, not a database list — **without** copying Apple green, SF Pro, circular official crests, or odds).

**Technical-only pass is a fail.** If it types, hydrates, and still *looks* like a CMS admin list or a broken navbar, it is not fixed.

---

## Issue 0 — scroll & touch from the core (do this first)

Frontend-only tweaks (`overflow-y: auto` on a random wrapper, `touch-action` on one card) **will not count**. The bug is architectural.

### What is wrong today

- `html, body { height: 100% }` plus nested `min-h-dvh` flex columns (`AppShell`, `PageShell`, `MatchesScreen`).
- **Two tab-bar mount points:** `MatchesScreen` *and* `PageShell` both render `TabBar`. Sticky bottom + document scroll fight.
- Horizontal rails (`LiveRail`, `SegmentTabs`, league date chips) use `overflow-x-auto` with **no** `touch-action` contract, so they steal vertical pans.
- Inner `overflow-y-auto` was removed from the scores list, but there is still **no single declared scroll owner**. Sticky masthead + sticky/fixed tab bar + iOS `100%` height = trapped last rows, dead zones, rubber-band fighting chrome.
- Tap targets: tabs are **text-only**, often under 44×44.

### Required scroll contract (implement all of it)

Pick **one** vertical scroller for the product and delete the other:

**Preferred:** the **document** is the only vertical scroller.

```
html, body { min-height: 100dvh; height: auto; overflow-x: clip; }
body { overscroll-behavior-y: contain; }
```

- **Do not** set `overflow: hidden` on `html`/`body`.
- **Do not** nest `overflow-y: auto` / `h-full` + `min-h-0` page columns that create a second scrollport.
- Chrome:
  - Masthead: `position: sticky; top: 0; z-index: 30` with opaque/blurred field background (existing `.masthead` language).
  - Tab bar: **one** instance, **fixed** to the bottom of the viewport (`position: fixed; bottom: 0; left: 0; right: 0`) with `padding-bottom: env(safe-area-inset-bottom)`, `min-height: 56px`, hit area ≥44px.
  - Scroll content (every page): `padding-bottom: calc(56px + env(safe-area-inset-bottom) + 16px)` so the last row is never under the tab bar.
- Horizontal regions **must** declare:
  - `touch-action: pan-x pinch-zoom;`
  - `overscroll-behavior-x: contain;`
  - `-webkit-overflow-scrolling: touch;`
  so a vertical gesture on the rest of the page still scrolls the document.
- Global: `touch-action: manipulation` on `a, button` (kill 300ms tap delay). Rows ≥56px tall.
- Unify shells: `AppShell` / `PageShell` / `MatchesScreen` share this contract. Tab bar is rendered **once** (layout or a single shell), not twice.

Verify on a **real touch path** (computer-use phone viewport + swipe), not wheel-only. Record a scroll-to-end clip on `/matches`, `/leagues`, `/league/eng.1` (table), `/news`. If the finger fights the tab bar or a chip row, it is not fixed.

---

## Issue 1 — native tab bar icons (Higgsfield, one family)

**Surface:** bottom tabs — matches · news · leagues · following · more  
**File today:** `src/components/matches/tab-bar.tsx` (Mono labels, no glyphs)

### Visual brief (Medal, not iOS generic)

Generate a **coherent five-icon family** with Higgsfield — not Lucide, not SF Symbols, not emoji, not a soccer ball, not Apple Sports’ green pitch tile.

Style lock (put this in every prompt):

- Product: footballscore Medal system
- Field `#0B0B0D`, ink `#F5F5F7`, quiet `#8E8E93`, copper `#C17A3A`, plate `#ECECEF`, 1px rule `#2C2C2E`
- Optical size: glyph ~24px in a 32px frame; **same stroke weight and corner language** across all five
- Language: split-flap / medal / board — geometric, flat, no drop shadow, no 3D clay, no neon
- Transparent or field background; export for dark UI
- Active state in product CSS: ink glyph + **1px copper hinge** or copper on the label — **do not** copper-fill the whole tab
- Inactive: quiet ink
- Labels stay **IBM Plex Mono lowercase** under the icon (DESIGN.md `tab-bar`)
- Accessible name = the destination (`aria-label="matches"` etc.); icon `aria-hidden`

Suggested glyphs (keep the family; do not invent a sixth destination):

| Tab | Idea (Medal/board, not sport cliché) |
| --- | --- |
| matches | Split-flap cell / scoreboard pair |
| news | Ruled column / masthead bar |
| leagues | Shield on a **light plate** (not a circle-cropped official logo) |
| following | Pin / watch-list tick — **not** a heart |
| more | Ellipsis inside a flap cell |

### Higgsfield procedure

1. Discover `generate_image` / `generate_image_batch` via Higgsfield MCP. Prefer **`nano_banana_pro`**, `aspect_ratio` **`1:1`**, `count` 2–4 variants **per tab** then pick one family.
2. One shared style paragraph in every prompt so they match.
3. If the tool returns `unlim_choice`, follow Higgsfield billing rules (do not silently spend).
4. Save winners under `public/icons/tab/{matches,news,leagues,following,more}.png` (and `@2x` if you generate 64px). Optionally trace to SVG **only if** the line weight stays identical.
5. Wire `TabBar` as icon + label, 56px bar, safe area, 44px minimum target. Active = `aria-current="page"`.
6. **Do not** change destinations or hrefs.

Reference (structure only): iOS tab bars with icon+caption. Do **not** copy Apple Sports green or SF symbols.

---

## Issue 2 — league silo navbar + whole-app visual QA (Grok 4.5)

### 2a. League page chrome (known broken)

**Route:** `/league/[slug]`  
**Today:** `PageShell` + `LeagueView` masthead stacks **product lockup** (`SiteLockup`) + Follow + league plate + H1 + `SegmentTabs` pills, then a **second** app tab bar. The silo aura (`league-silo__aura`) fights the chips. It reads as two products glued together.

Fix the **navbar area** to a single silo identity:

- **Top row:** back (to `/leagues` or referrer) · **league mark on light plate** · Condensed name · Follow. **Do not** repeat the footballscore wordmark on the silo (mark-only lockup is OK if it is 18px and not competing with the league name).
- **Second row:** Now / Table / Fixtures / Clubs / News as **segment control** (existing URL `?tab=`). Sticky under the identity, does not wrap into the aura, does not collide with the bottom app tabs.
- Respect safe-area-inset-top.
- Inner tabs stay URL-driven. Omit empty tabs as today (no Table for some tournaments).
- Atmosphere from `league-palette.ts` stays on this page only.
- Verify at least `/league/eng.1` and `/league/uefa.champions` (table vs no table).

### 2b. Human visual QA — Grok 4.5 computer-use + video

Use a **computerUse** subagent with model **`cursor-grok-4.5-high`** (Grok 4.5). Do not substitute a “quick curl.”

For **each** route below, on **390px** (and `/matches` + `/league/eng.1` also at **~1280px**):

1. `RecordScreen` `START_RECORDING` (or the computer-use equivalent: interact + screenshot sequence if recording is unavailable — prefer video).
2. Open the URL, wait for real ESPN data (not the empty shell).
3. Behave like a person: scroll to the end, tap a row, go back, switch inner tabs, switch bottom tabs, open search where it exists.
4. `SAVE_RECORDING` with a name like `qa-league-eng1-table`.
5. Subagent returns a verdict table: **visual pass/fail**, **touch/scroll pass/fail**, notes (overlap, clipped type, double chrome, dead tap, trapped scroll).

**Route list (all of them):**

| Route | What a human checks |
| --- | --- |
| `/matches` | Day rail, live rail, tiles, tab bar icons, scroll to last group |
| `/matches?day=yesterday` | Finished tiles, no trapped footer |
| `/matches?search=1` | Search field, keyboard, results |
| `/news` · `/news?tab=world` | Cards, images, tab bar |
| `/news/[id]` | Article type, back, no video |
| `/leagues` | After Issue 3: identity grid, not a dump |
| `/leagues?q=` | Search leagues + clubs |
| `/league/eng.1` | Now / Table / Fixtures / Clubs / News — **navbar** |
| `/league/uefa.champions` | Tournament empty-table honesty |
| `/match/{id}?league={slug}` | Sticky scoreboard vs tab bar; timeline scroll |
| `/team/{league}/{id}` | Club rail, schedule scroll |
| `/following` | Follow controls vs row tap |
| `/more` | Toggles, no clipped buttons |

If video review is available (`videoReview` subagent), run it on each recording with: what you believe is on screen + questions (overlap? Apple-green? circle-cropped crests? scroll stuck?).

**Fail and loop:** any visual fail → fix → re-record that route. Do not call the issue complete with leftover “nits.”

Polish **visual and technical** together: type hierarchy, spacing 8px grid, 12px tile radius, hairlines, plate marks, copper only on live, contrast of muted labels, sticky chrome not covering scores.

---

## Issue 3 — dedicated `/leagues` (Apple Sports–inspired, not copied)

**Today:** `/leagues` is Yours / World / `All {n}` country `<details>` — a **database of names**. That is rejected.

### Intent

`/leagues` is a **competition destination**: you *see* the league, then open it. Inspired by Apple Sports’ “leagues as identity” ([browse/grid of competition marks](https://mobbin.com/screens/9a3664eb-ffe5-4216-a7dc-19aa689322ed), [follow list with logos](https://mobbin.com/screens/bb44f18a-88ee-4256-b252-ef7fd1b7770c), [silo with competition header](https://mobbin.com/screens/efdc453c-7860-4314-9b20-a4f31133a761)) — **structure and rhythm only**.

### Do not copy

- Apple green, SF Pro, circular official crests, odds, Yesterday/Today/Upcoming as our day model, Apple Sports wordmark, star-in-white-circle as our Follow (we already have Follow pills — keep product language).
- DESIGN.md: *“Don't copy … Apple Sports green.”*

### Do ship

1. **Search** first (existing GET `q`) — leagues + clubs.
2. **Yours** — followed competitions as **identity cards** (custom mark + name), not a text row.
3. **World** — the 28 `FIRST_CLASS_LEAGUES` as a **visual grid** (phone: 3 columns; ≥768: denser). Each cell: **Higgsfield custom mark on a light plate**, Condensed name, quiet country. Tap → `/league/{slug}`. Follow control must not steal the whole row (separate hit target).
4. **All competitions** — the ~218 catalog is **secondary** (collapsed country groups or a “All” sheet), not the opening screen. Still honest, still searchable.
5. Higgsfield **league-specific** marks for all 28 first-class slugs:
   - Same family: shield-on-plate, Medal field, stroke weight shared with tab “leagues” icon
   - Color accent from `league-palette.ts` (`mid` / `accent`) — atmosphere, not a pasted official vector
   - **Do not trace official trademarks.** Allude (stars, tricolor, lion geometry) in our language. ESPN `logo` URL remains **fallback** on silo if a file is missing.
   - Files: `public/icons/leagues/{slug}.png` (`eng.1.png`, `uefa.champions.png`, …). Map slug → src in code; never invent a 29th first-class league.
6. Silos (`/league/[slug]`) should **feel like the same product as the grid**: shared marks, palette, type — not a different website.

Club search results can stay list-like (clubs are not the 28-mark family). League search hits should use the same marks.

---

## Issue 4 — (covered by Issue 0)

Issue 4 is the scroll/touch **core contract**. Do not “fix touch” by adding `cursor: pointer` or a div wrapper. If Issue 0 is done, Issue 4 is done only after the Grok 4.5 **swipe verdict** on the recorded videos.

---

## Higgsfield batching (practical)

- Tab icons: 5 concepts × 2–4 variants, then lock the set.
- League marks: `generate_image_batch` in waves of ~6–8 slugs, **same style lock**, slug in the filename.
- Store prompts in `docs/icon-prompts.md` so a later agent can regenerate without guessing.
- `next.config.ts` already allows `a.espncdn.com`; local `/icons/*` needs no remote pattern.

## Shell / component work likely

| Area | Likely files |
| --- | --- |
| Scroll owner | `src/app/globals.css`, `layout.tsx`, `app-shell.tsx`, `page-shell.tsx`, `matches-screen.tsx` |
| Tab bar | `src/components/matches/tab-bar.tsx` |
| Leagues browse | `src/components/explore/explore-view.tsx`, `src/app/leagues/page.tsx` |
| Silo chrome | `src/components/league/league-view.tsx`, `src/components/ui/blocks.tsx` (`SegmentTabs`) |
| Marks map | new `src/lib/league-marks.ts` |

Do not rebuild Scores home. Do not reintroduce per-league washes on `/matches`.

## Phase order (mandatory)

0. Scroll/touch contract + single tab bar mount  
1. Higgsfield tab icons wired  
2. League silo navbar  
3. `/leagues` identity grid + 28 Higgsfield marks  
4. Grok 4.5 video QA of **every** route; fix; re-record fails  
5. `npx tsc --noEmit` && production build; commit; push  

## Agent notes for subagents

When launching computer-use:

- `subagent_type`: `computerUse`
- `model`: `cursor-grok-4.5-high`
- Prompt must list the exact URL, viewport 390×844, what to tap, and to wait for ESPN content
- Prefer the local app (`npm run dev`) **and** the production host if it is up: `https://temporary-swift-marimba-kx68wzz.vercel.app`
- Save recordings under `/opt/cursor/artifacts/` with human names

---

## Out of scope

- Betting, Watch, new sports, Account, rewriting ESPN mappers, changing Medal hex, circle-cropping crests “because Apple does.”
