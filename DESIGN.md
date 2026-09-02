---
version: alpha
status: proposed
name: footballscore
description: >
  Association-football scores product. Match-day programme brought up to the minute.
  Canvas is warm paper, type is Geist, the score is the only center axis, elevation is
  hairlines not shadows. Hex below is Palette A (Programme & floodlight) as a working
  target — not locked until docs/brand-proposals.md is signed. Format follows getdesign.md
  / Google Stitch DESIGN.md. Craft references (not clones): WIRED hairline rows, Vercel Geist,
  Mastercard cream paper. See docs/getdesign-refs/.
source: https://getdesign.md/
colors:
  field: "#10241C"
  on-field: "#F3F0E8"
  flare: "#D6F230"
  paper: "#F3F0E8"
  surface: "#FFFDF8"
  ink: "#141714"
  quiet: "#5E635C"
  rule: "#DDD8CC"
  live-ink: "#3E4A00"
  cardinal: "#B01A1A"
  caution: "#C9A227"
  wash: "#EEF2C4"
  chip: "#ECE8DC"
  on-primary: "#FFFDF8"
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
    fontSize: 22px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: -0.66px
  score:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 20px
    fontWeight: 700
    lineHeight: 24px
    fontVariantNumeric: tabular-nums
    letterSpacing: -0.6px
  score-lg:
    fontFamily: Geist, ui-sans-serif, system-ui, sans-serif
    fontSize: 34px
    fontWeight: 700
    lineHeight: 40px
    fontVariantNumeric: tabular-nums
    letterSpacing: -1.02px
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
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.masthead}"
    padding: "{spacing.md} {spacing.lg}"
  date-strip:
    textColor: "{colors.quiet}"
    typography: "{typography.ui}"
    activeBorder: "{colors.ink}"
  live-rail:
    backgroundColor: "{colors.field}"
    textColor: "{colors.flare}"
    typography: "{typography.caption}"
    padding: "{spacing.sm} {spacing.lg}"
  league-group:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.sm}"
  match-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    padding: "{spacing.md} {spacing.md}"
    minHeight: 56px
  match-row-selected:
    backgroundColor: "{colors.wash}"
  score-axis:
    typography: "{typography.score}"
    textColor: "{colors.ink}"
    width: 72px
  live-minute:
    typography: "{typography.caption}"
    textColor: "{colors.live-ink}"
  status-chip:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.quiet}"
    rounded: "{rounded.pill}"
    typography: "{typography.caption}"
  tab-bar:
    backgroundColor: "{colors.surface}"
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

footballscore is a football-only scores product (association football). The surface should read as a **printed match-day programme** that updates every 30 seconds: warm paper, dark ink, crests as heraldry, the **score as the sacred number**. It is not a sports-TV skin, not a SaaS marketing site, and not a device mockup.

This file is the agent-facing design system in the [getdesign.md](https://getdesign.md/) / Google Stitch `DESIGN.md` format. It was synthesized from four catalog analyses (`npx getdesign add …`) and then rewritten for this product:

- **WIRED** — hairline list rows, no drop shadows, one quiet accent, magazine density.
- **Vercel** — Geist as the only product sans; tight tracking on display; no decorative mesh in the app.
- **Mastercard** — warm cream paper instead of iOS grey; ink slightly green-black so it sits on paper.
- **Nike** — chroma lives in photography/crests, not in chrome. We refuse their campaign Futura and full-bleed heroes.

**Identity gate:** Wordmark construction and palette letter still need a human `Approve Palette _ + Wordmark _` in `docs/brand-proposals.md`. YAML hex is **Palette A (Programme & floodlight)** as the recommended working target. If Palette B or C wins, remap `{colors.field}` / `{colors.flare}` / `{colors.live-ink}` only; Paper / Ink / Rule / type / Axis row stay.

**Key characteristics**
- Paper canvas `{colors.paper}`, not `#F2F2F7`.
- Score in `{typography.score}` 20px tabular at the **only center axis** of a match row (today’s 15px is too small).
- Elevation = 1px `{colors.rule}`. No card shadows.
- Live is a verb: Caption minute in `{colors.live-ink}` on paper; Flare only on Field (live rail, reverse).
- Four destinations: Scores · Explore · Following · More.
- Home left, away right. Shields never circle-cropped.

## Colors

Hex is Palette A, proposed. Roles are locked even if hex changes.

### Brand & accent
- **Field** (`{colors.field}` — `#10241C`): marketing / studio / live rail ground. Reverse wordmark.
- **Flare** (`{colors.flare}` — `#D6F230`): live spark **on Field only**. Never body text on Paper (contrast fails).
- **Live ink** (`{colors.live-ink}` — `#3E4A00`): live minute on Paper. WCAG stand-in for Flare.

### Surface
- **Paper** (`{colors.paper}` — `#F3F0E8`): page.
- **Surface** (`{colors.surface}` — `#FFFDF8`): header, groups, tab bar.
- **Rule** (`{colors.rule}` — `#DDD8CC`): 1px dividers.
- **Wash** (`{colors.wash}` — `#EEF2C4`): selected row.
- **Chip** (`{colors.chip}` — `#ECE8DC`): FT / PP / AB pills.

### Text
- **Ink** (`{colors.ink}` — `#141714`): body, scores, masthead.
- **Quiet** (`{colors.quiet}` — `#5E635C`): meta, inactive tabs, kick-off.

### Semantic
- **Cardinal** (`{colors.cardinal}` — `#B01A1A`): red card, error, unfollow. Never live.
- **Caution** (`{colors.caution}` — `#C9A227`): yellow card only.
- Club hex from ESPN: 12% wash or **3px rail**. Never full-bleed page skin.
- W / D / L: letters plus quiet fills — never color alone.

Palette B maps Field→Navy `#0B1C3A`, Flare/live→Cobalt `#2154E8`, Paper→Cream `#F7F4EE`.  
Palette C maps Field→Night `#0E0E10`, live on paper→Ember `#E23B2C` (never follow), no logo chroma.

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
| `{typography.masthead}` | 22 | 700 | 28 | `footballscore` header (Unit wordmark until 2/3 approved) |
| `{typography.score}` | 20 | 700 tabular | 24 | List row score — sacred |
| `{typography.score-lg}` | 34 | 700 tabular | 40 | Match sticky scoreboard |

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
- Phone `<768`: full-bleed Paper. No device bezel.
- `768–1099`: same layouts, max 720 centered.
- `≥1100`: top nav or 72px icon rail — **pick top nav**. Center max 720. Right column only with real data (live list, mini table).

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
Surface bar. Wordmark `{typography.masthead}` in Ink (Wordmark 1 / Unit until another is approved). Tools: search, calendar. No extra mark.

### `date-strip`
`{typography.ui}`. Active day: 3px Ink underline, not a filled chip.

### `live-rail`
Sticky under masthead when any match is live/HT. Field ground, Flare/on-field type, horizontal scroll of minute + score + two shorts. Tap opens the match.

### `league-group`
Ruled Surface, radius 8. Header: 16px league mark + Meta name. Followed = outline star, not a painted header.

### `match-row` (signature — Axis)
```
[ Home name → ] [🛡️]  78'   [🛡️] [ ← Away name ]
                      2–1
```
- Home `text-align: right`, away left, `{typography.ui}`, truncate.
- Crest 24px, 8px from the axis.
- `{score-axis}` width 72px: Caption status above `{typography.score}`.
- Kick-off: Caption empty or `KO`, axis shows time in UI tabular.
- FT/PP/AB: `{status-chip}` above the score.
- Live/HT: `{live-minute}` text, not a chip.
- Selected: `{match-row-selected}` wash.
- **No TV icon column.** Broadcaster is quiet text on match detail.

### `tab-bar`
Four items: Scores · Explore · Following · More. Caption labels, 24px stroke icons (1.75). Active Ink, inactive Quiet.

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

**Scores** — masthead → live-rail (if needed) → date-strip → live groups → followed → first-class with games → rest. Hide finished = text control.

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
- Don't circle-crop crests or add a soccer-ball mark.
- Don't wrap the product in a fake phone bezel.
- Don't ship seven equal match tabs; Timeline is the default.
- Don't copy WIRED link-blue, Vercel mesh, Mastercard orbits, or Nike 96px uppercase as this product.
- Don't treat YAML hex as locked until `docs/brand-proposals.md` is signed — then rewrite this file to match.

## Responsive behavior

| Name | Width | Changes |
| --- | --- | --- |
| Phone | <768 | Axis row, 4-tab bar, 16px page pad. |
| Tablet | 768–1099 | Same; canvas max 720. |
| Desktop | ≥1100 | Top nav; optional right rail with data. |

Touch: rows ≥56px, tabs ≥44px.

## Agent prompt guide

Before any UI work: read this file, then `docs/brand.md`. If hex and wordmark are still unapproved, you may restyle **structure** (Axis row, radius 8, kill bezel, 4 tabs) but do not invent a fourth palette.

Example: “Rebuild `MatchRow` as Axis per DESIGN.md. Score 20px tabular, 72px axis, drop TvIcon. Use CSS variables mapped to the YAML color roles.”

## Known gaps

- Wordmark 1/2/3 and Palette A/B/C not human-approved.
- Dark mode: mapped ramp of the approved palette, not an invert. Unspecified until light ships.
- Display serif: explicitly out until color lock.
- Icon grid: 24×24 stroke 1.75 in `src/components/matches/icons.tsx`; optical sheet not drawn.
