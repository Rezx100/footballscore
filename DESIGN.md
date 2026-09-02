---
version: alpha
status: proposed
name: footballscore
description: >
  Association-football scores product. A Carbon timing board, not a cream programme.
  The score is the jumbotron. Copper is only the live minute. Geist is scaffolding.
  Hex is the approved Medal palette. Mark and wordmark are not locked.
  CSS remains scaffolding until those lock.
  Format follows getdesign.md / Google Stitch DESIGN.md. See docs/getdesign-refs/.
source: https://getdesign.md/
colors:
  field: "#141210"
  on-field: "#F3EDE4"
  copper: "#C17A3A"
  paper: "#F3EDE4"
  surface: "#1C1916"
  ink: "#F3EDE4"
  quiet: "#8A8278"
  rule: "#2C2824"
  live-ink: "#C17A3A"
  cardinal: "#9B1B1B"
  caution: "#C4A574"
  wash: "#1C1916"
  chip: "#2C2824"
  on-primary: "#F3EDE4"
  patina: "#3D5C52"
typography:
  caption:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 11px
    fontWeight: 600
    lineHeight: 14px
    letterSpacing: 0
  meta:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
  body:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
  ui:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 15px
    fontWeight: 600
    lineHeight: 20px
  title:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 17px
    fontWeight: 650
    lineHeight: 24px
  masthead:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 18px
    fontWeight: 650
    lineHeight: 24px
    letterSpacing: -0.8px
  score:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 22px
    fontWeight: 700
    lineHeight: 24px
    fontVariantNumeric: tabular-nums
    letterSpacing: -0.8px
  score-lg:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 72px
    fontWeight: 700
    lineHeight: 68px
    fontVariantNumeric: tabular-nums
    letterSpacing: -2.4px
rounded:
  none: 0px
  sm: 8px
  pill: 9999px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
components:
  masthead-bar:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.masthead}"
    padding: "{spacing.lg} {spacing.lg}"
  date-strip:
    textColor: "{colors.quiet}"
    typography: "{typography.ui}"
    activeBorder: "none"
  live-rail:
    backgroundColor: "{colors.field}"
    textColor: "{colors.copper}"
    typography: "{typography.caption}"
    padding: "{spacing.sm} {spacing.lg}"
  league-group:
    backgroundColor: "{colors.field}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.none}"
  match-row:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    padding: "{spacing.md} {spacing.lg}"
    minHeight: 64px
  match-row-selected:
    backgroundColor: "{colors.wash}"
  score-axis:
    typography: "{typography.score}"
    textColor: "{colors.ink}"
    width: 88px
  live-minute:
    typography: "{typography.caption}"
    textColor: "{colors.copper}"
  status-chip:
    backgroundColor: "transparent"
    textColor: "{colors.quiet}"
    rounded: "{rounded.none}"
    typography: "{typography.caption}"
  tab-bar:
    backgroundColor: "{colors.field}"
    borderColor: "{colors.rule}"
    padding: "{spacing.xs} {spacing.xs}"
  search-field:
    backgroundColor: "{colors.paper}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.sm}"
    typography: "{typography.body}"
    height: 40px
  button-text:
    textColor: "{colors.live-ink}"
    typography: "{typography.ui}"
  empty-state:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "{spacing.3xl} {spacing.xl}"
---

## Overview

footballscore is a football-only scores product (association football). The product surface is a **Carbon timing board**: Bone type on `{colors.field}`, the **score as jumbotron**, Copper only on the live minute. Bone paper is reverse, splash, and marketing — not the Scores canvas. It is not a cream card stack, not a sports-TV chyron, not FotMob white groups, not Apple Sports green.

This file is the agent-facing design system in the [getdesign.md](https://getdesign.md/) / Google Stitch `DESIGN.md` format.

**Identity gate:** Medal palette is approved. Mark and wordmark still need a pick in `docs/brand-proposals.md`. YAML hex is Medal. CSS remains scaffolding until the lockup exists.

**Key characteristics**
- Page is `{colors.field}` (`#141210`). Bone is type and reverse.
- Featured live: `{typography.score-lg}` (56–96px tabular). List score `{typography.score}` 22px.
- No cards, no shadows, no date-strip underlines, no LIVE ticker.
- Copper is the live clock only. Not a pill. Not a tab accent.
- Three destinations: Scores · Following · More.
- Home left, away right. Native crests, never circle-cropped, never invented rainbow shields.

## Colors

Hex is Medal, approved. Roles stay even if a later mark export tightens Copper.

### Brand & accent
- **Field** (`{colors.field}` — `#141210`): the product page. Marketing studio is the same ground.
- **Copper** (`{colors.copper}` — `#C17A3A`): live minute, mark, reverse on Field. Not a fill for cards or tabs.
- **Live ink** (`{colors.live-ink}` — `#C17A3A`): live minute on Field (Copper meets contrast on Carbon).
- **Patina** (`{colors.patina}` — `#3D5C52`): support structure, never a pitch fill.

### Surface
- **Paper** (`{colors.paper}` — `#F3EDE4`): reverse, splash, marketing. Not the Scores page.
- **Surface** (`{colors.surface}` — `#1C1916`): raised row / featured well on Field.
- **Rule** (`{colors.rule}` — `#2C2824`): 1px fascia lines.
- **Wash** (`{colors.wash}` — `#1C1916`): selected row.
- **Chip** (`{colors.chip}` — `#2C2824`): FT / PP / AB — letters, not candy pills.

### Text
- **Ink** (`{colors.ink}` — `#F3EDE4`): body, scores, masthead on Field.
- **Quiet** (`{colors.quiet}` — `#8A8278`): meta, inactive, kick-off.

### Semantic
- **Cardinal** (`{colors.cardinal}` — `#9B1B1B`): red card, error, unfollow. Never live.
- **Caution** (`{colors.caution}` — `#C4A574`): yellow card only.
- Club hex from ESPN: 12% wash or **3px rail**. Never full-bleed page skin.
- W / D / L: letters plus quiet fills — never color alone.

## Typography

### Font family
**Geist Sans** only in product (already loaded in `src/app/layout.tsx`). Tabular numerals on every score and clock. CJK/Arabic: Noto Sans at the same sizes.

No second display serif until color is locked. Do not load WiredDisplay, MarkForMC, or Nike Futura.

### Hierarchy

| Token | Size | Weight | Line | Use |
| --- | --- | --- | --- | --- |
| `{typography.caption}` | 11 | 600 | 14 | LIVE / HT / FT over the score; rail labels |
| `{typography.meta}` | 12 | 500 | 16 | League name, byline, relative time |
| `{typography.body}` | 15 | 400 | 22 | Commentary, empty copy |
| `{typography.ui}` | 15 | 600 | 20 | Team names, text buttons |
| `{typography.title}` | 17 | 650 | 24 | Empty titles, section headers |
| `{typography.masthead}` | 18 | 650 | 24 | `footballscore` header (Geist until wordmark) |
| `{typography.score}` | 22 | 700 tabular | 24 | List row score |
| `{typography.score-lg}` | 72 | 700 tabular | 68 | Featured live jumbotron |

### Principles
- The score is always heavier and larger than the team name beside it.
- Prose scores use an en dash (`2–1`); UI scores use tabular `2–1` or `2 - 1` with reserved width so digits do not jump.
- Caption status sits **above** the score, never a trailing TV column.

## Layout

### Spacing
Base **8px** (4px exception for icon optics and the 3px club rail).  
Tokens: `{spacing.xs}` 4 · `{spacing.sm}` 8 · `{spacing.md}` 12 · `{spacing.lg}` 16 · `{spacing.xl}` 24 · `{spacing.2xl}` 32 · `{spacing.3xl}` 48.  
Page pad 16. Group gap 12. Row min-height **56**. Tab bar 56 + safe area.

### Grid
- Phone `<768`: full-bleed Field. No device bezel.
- `768–1099`: same, max 720 centered.
- `≥1100`: featured live left, fascia list right. Top nav, not a 72px icon rail.

### Whitespace
Density of a fixture list, not Mastercard emptiness and not a magazine cover grid. Breathing room is **between league groups**, not inside a match row.

## Elevation & depth

| Level | Treatment | Use |
| --- | --- | --- |
| 0 Flat | No shadow, no border | Page Paper |
| 1 Hairline | 1px `{colors.rule}` | Row dividers, tab top edge, input ring |
| 2 Ruled group | 1px rule + `{rounded.sm}` | League group |

No drop shadows. (WIRED rule. Mastercard halos are forbidden here.)

## Shapes

| Token | Value | Use |
| --- | --- | --- |
| `{rounded.none}` | 0 | Match rows (flush in the group), club rail |
| `{rounded.sm}` | 8 | Groups, search field, empty cards |
| `{rounded.pill}` | 9999 | Status chips, live dot |

Crests: **shields**, native aspect, never `{rounded.full}` circle crops (Nike avatars / Mastercard orbits do not apply).

## Motion

160ms `cubic-bezier(0.2, 0.8, 0.2, 1)` on opacity/transform. Live Caption may pulse 1.2s 1→0.55 unless `prefers-reduced-motion`. Crests never bounce. Reserve the 72px score axis so digits do not shift layout.

## Components

### `masthead-bar`
Field. Mark + `{typography.masthead}` in Bone. Search only. No extra chrome.

### `date-strip`
One line: `Today · 2 live`. Not a horizontal day carousel. Calendar is a tool, not a tab.

### `featured-live`
The jumbotron. Competition caption, Copper minute, `{score-lg}`, home left / away right under the number. No ticker duplicating this.

### `league-group`
Caption + flush rows. No ruled card. No radius.

### `match-row` (signature — Axis)
```
[ Home name → ]   78′    [ ← Away name ]
                  2–1
```
- Home right, away left, `{typography.ui}`, truncate.
- `{score-axis}` width 88px: Copper minute above `{typography.score}` for live; quiet time for KO.
- FT is Caption, not a pill.
- **No TV icon column.**

### `tab-bar`
Three items: Scores · Following · More. Caption. Active Bone, inactive Quiet.

### `search-field`
Height 40, radius 8, Paper fill, Rule ring, focus ring Live-ink.

### `sticky-scoreboard` (match page)
Score-lg, crests 48, thin club rails. Follow + share.

### `timeline`
Default match panel. Newest first. Key events stronger than commentary.

### `dual-stat`
Club-tint bars at accessible contrast. Values in Meta tabular.

### `table`
Caption headers, UI club names, pts in score weight. Followed row = wash.

### `empty-state`
Title + Body + one `{button-text}`. Honest copy (“No play-by-play yet.”). No illustration v1.

## Page recipes

**Scores** — masthead → Today/live count → featured live (if any) → flush groups. No ticker.

**Match** — jumbotron sticky → last key event → timeline → Lineup / Numbers / Table / Series.

**Match** — sticky-scoreboard → last key event → timeline → Lineup / Numbers / Table / Series segment.

**League** — mark + name (no full-bleed) → Now / Table / Fixtures / News.

**Team** — 3px club rail → next match → form → mini table → squad.

## Do's and Don'ts

### Do
- Put the score on a reserved center axis at `{typography.score}`.
- Use Paper + hairlines. Club color as a rail or 12% wash.
- Keep Geist + tabular nums.
- Announce live minutes in text (`aria-label` + visible Caption).
- Drop ESPN odds, video, Watch, xG you do not have.

### Don't
- Don't use iOS grouped grey `#F2F2F7` or system green `#00A651` as identity.
- Don't paint Scores as cream paper cards or a date-underline strip.
- Don't circle-crop crests or add a soccer-ball mark.
- Don't wrap the product in a fake phone bezel.
- Don't ship seven equal match tabs; Timeline is the default.
- Don't copy WIRED link-blue, Vercel mesh, Mastercard orbits, Nike 96px uppercase, FotMob white groups, or Apple Sports green.
- Don't treat YAML hex as locked until `docs/brand-proposals.md` is signed — then rewrite this file to match.

## Responsive behavior

| Name | Width | Changes |
| --- | --- | --- |
| Phone | <768 | Axis row, 4-tab bar, 16px page pad. |
| Tablet | 768–1099 | Same; canvas max 720. |
| Desktop | ≥1100 | Top nav; optional right rail with data. |

Touch: rows ≥56px, tabs ≥44px.

## Agent prompt guide

Before any UI work: read this file, then `docs/brand.md`. Medal hex is approved; mark and wordmark are not. You may restyle **structure** (Axis row, radius 8, kill bezel, 4 tabs) but do not invent a second palette.

Example: “Rebuild `MatchRow` as Axis per DESIGN.md. Score 20px tabular, 72px axis, drop TvIcon. Use CSS variables mapped to the YAML color roles.”

## Known gaps

- Medal palette approved; mark and wordmark not human-approved.
- Dark mode: mapped ramp of the approved palette, not an invert. Unspecified until light ships.
- Display serif: explicitly out until color lock.
- Icon grid: 24×24 stroke 1.75 in `src/components/matches/icons.tsx`; optical sheet not drawn.
