---
version: 1.0
status: locked
name: scoreva
description: >
  Live football scores app. Night broadcast studio + tungsten floodlight + ledger board.
  Not a soccer ball, not pitch green, not a purple chrome, not FotMob grey groups, not Apple
  Sports system green, not the Medal-copper look. Outfit names the wordmark and titles, Inter
  is body, IBM Plex Mono tabular is the board (scores, minutes, kick-off, table numerals).
  Aperture palette is locked. Mark is the Aperture ring + volt slash — never a football.
  Format follows getdesign.md / Google Stitch DESIGN.md. See docs/scoreva/brand.md.
source: https://getdesign.md/
colors:
  night: "#08090D"
  studio: "#111318"
  plate: "#181B22"
  hairline: "#2A313C"
  bone: "#F3F0E8"
  mute: "#8B93A1"
  volt: "#D7FF3C"
  ember: "#FF5A2D"
  cardRed: "#E23D3D"
  cardAmber: "#E6B84A"
  ice: "#6EC8E0"
  paper: "#F4F1EA"
  ink: "#0E1014"
  liveOnPaper: "#C43A12"
typography:
  caption:
    fontFamily: IBM Plex Mono, ui-monospace, monospace
    fontSize: 11px
    fontWeight: 500
    lineHeight: 14px
    letterSpacing: 0.2px
  meta:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
  body:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 21px
  ui:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 15px
    fontWeight: 600
    lineHeight: 20px
  title:
    fontFamily: Outfit, ui-sans-serif, system-ui, sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 25px
  wordmark:
    fontFamily: Outfit, ui-sans-serif, system-ui, sans-serif
    fontSize: 20px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: -0.2px
  score:
    fontFamily: IBM Plex Mono, ui-monospace, monospace
    fontSize: 20px
    fontWeight: 600
    lineHeight: 24px
    fontVariantNumeric: tabular-nums
  score-lg:
    fontFamily: IBM Plex Mono, ui-monospace, monospace
    fontSize: 34px
    fontWeight: 600
    lineHeight: 40px
    fontVariantNumeric: tabular-nums
  minute:
    fontFamily: IBM Plex Mono, ui-monospace, monospace
    fontSize: 12px
    fontWeight: 600
    lineHeight: 14px
    fontVariantNumeric: tabular-nums
rounded:
  none: 0px
  sm: 8px
  md: 12px
  pill: 999px
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
  screen:
    backgroundColor: "{colors.night}"
    textColor: "{colors.bone}"
    padding: "{spacing.lg}"
  date-rail:
    backgroundColor: "{colors.studio}"
    activeIndicator: "{colors.volt}"
    typography: "{typography.ui}"
  score-card:
    backgroundColor: "{colors.plate}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
    minHeight: 92px
  live-pulse:
    color: "{colors.volt}"
    typography: "{typography.minute}"
  match-header:
    backgroundColor: "{colors.studio}"
    scoreTypography: "{typography.score-lg}"
  timeline-event:
    goalColor: "{colors.ember}"
    typography: "{typography.body}"
  formation-pitch:
    lineColor: "{colors.hairline}"
    backgroundColor: "{colors.studio}"
  standings-row:
    backgroundColor: "{colors.plate}"
    followedWash: "rgba(215,255,60,0.08)"
  tab-bar:
    backgroundColor: "{colors.studio}"
    activeColor: "{colors.bone}"
    inactiveColor: "{colors.mute}"
  spoiler-cover:
    backgroundColor: "{colors.plate}"
    iconColor: "{colors.ice}"
  skeleton:
    backgroundColor: "{colors.plate}"
    shimmerColor: "{colors.hairline}"
---

## Overview

Scoreva is a football-only live scores app. The territory is a **night broadcast studio** (`#08090D`) with a **tungsten floodlight + ledger board** feeling — not pitch green, not a football, not a purple chrome, not FotMob's grey grouped lists, not Apple Sports system green, not this repo's earlier Medal-copper look. Volt (`#D7FF3C`) is the single electric signal: it marks what just changed, never what is merely present.

This file is the agent-facing design system in the [getdesign.md](https://getdesign.md/) / Google Stitch `DESIGN.md` format, scoped to `apps/mobile`.

**Identity gate:** Aperture palette, Outfit/Inter/Plex Mono type, and the Aperture ring-and-slash mark are locked. Implement as specified; do not propose new hex or a new mark.

**Key characteristics**
- Canvas is `{colors.night}`. Raised surfaces step up through `{colors.studio}` → `{colors.plate}`, never a color jump, only a value jump.
- Volt appears only on: the live dot, the live minute, the "LIVE" caption, the score-just-changed flash (160ms), the Aperture mark's slash, and the active date-rail tab underline. Nowhere else.
- Ember appears only inside an actual goal-flash micro-animation (haptic + 400ms fade on `ScoreCard`/`MatchHeader`). It is never a static UI color, never a card background.
- Score is always IBM Plex Mono tabular, reserved-width, heavier than the team name beside it.
- Crests are geometric monogram shields — never circle-cropped, never a real club logo. Club color is a 3px rail or ≤12% wash.
- Home over away, always. Stacked score card is the signature row, not a single-line baseline row.

## Colors

### Ground
- **night** (`{colors.night}` — `#08090D`): app canvas, dark theme default.
- **studio** (`{colors.studio}` — `#111318`): header, tab bar, date rail, match header.
- **plate** (`{colors.plate}` — `#181B22`): score card, row, table row fill.
- **hairline** (`{colors.hairline}` — `#2A313C`): 1px dividers, card borders, inner highlight edge.

### Text
- **bone** (`{colors.bone}` — `#F3F0E8`): primary type on night/studio/plate.
- **mute** (`{colors.mute}` — `#8B93A1`): meta, secondary labels, inactive tab.

### Signal (rare, on purpose)
- **volt** (`{colors.volt}` — `#D7FF3C`): live dot, live minute, LIVE caption, score-change flash, mark slash, active rail tab. Never a background fill, never a button fill, never a tab bar tint.
- **ember** (`{colors.ember}` — `#FF5A2D`): goal-flash only. 400ms fade-in/out on the scoring team's score digit + a thin rail — never full-bleed, never a persistent card color.

### Semantic
- **cardRed** (`{colors.cardRed}` — `#E23D3D`): red card, error, destructive action.
- **cardAmber** (`{colors.cardAmber}` — `#E6B84A`): yellow card only.
- **ice** (`{colors.ice}` — `#6EC8E0`): spoiler / delayed-score marker (`SpoilerCover`, `LiveTracker` delayed state).
- Club hex: 3px rail on the score card's leading edge, or ≤12% wash behind the crest chip. Never a full-bleed row skin.

### Light theme
- **paper** (`{colors.paper}` — `#F4F1EA`) canvas, **ink** (`{colors.ink}` — `#0E1014`) type.
- Live signal on paper is **`{colors.liveOnPaper}`** (`#C43A12`), not volt — volt fails contrast on paper.

## Typography

### Family
**Outfit** for the wordmark and titles. **Inter** for body and UI labels. **IBM Plex Mono** tabular for every score, minute, kick-off clock, and table numeral. iOS icon glyphs via SF Symbols (`expo-symbols`); Android/web via the same component's Material Symbols fallback — never a bundled second icon font.

Do not load Geist, IBM Plex Sans Condensed, Futura, or any serif — those belong to other systems in this repo, not Scoreva.

### Hierarchy

| Token | Size | Weight | Line | Use |
| --- | --- | --- | --- | --- |
| `{typography.caption}` | 11 | 500 mono | 14 | LIVE/HT/FT/PP/AB status caption |
| `{typography.meta}` | 12 | 400 | 16 | League name, kick-off date, byline |
| `{typography.body}` | 15 | 400 | 21 | Timeline commentary, empty copy |
| `{typography.ui}` | 15 | 600 | 20 | Team names, buttons, tab labels |
| `{typography.title}` | 20 | 600 | 25 | Section headers |
| `{typography.wordmark}` | 20 | 700 | 24 | `Scoreva` wordmark lockup |
| `{typography.score}` | 20 | 600 tabular | 24 | List row score — reserved width |
| `{typography.score-lg}` | 34 | 600 tabular | 40 | Match centre sticky scoreboard |
| `{typography.minute}` | 12 | 600 tabular | 14 | Live clock, kick-off clock |

### Principles
- The score is always heavier and larger than the team name beside it, on a fixed-width column so a `10` never shifts the row versus a `1`.
- Prose scores use an en dash (`2–1`); UI scores sit in two separate tabular cells per row (home over away), not one inline pair.
- Status caption sits **above** the score column, never a trailing icon column.

## Layout

### Spacing
Base **8px** (4px exception for the crest rail and icon optical alignment). Tokens: `{spacing.xs}` 4 · `{spacing.sm}` 8 · `{spacing.md}` 12 · `{spacing.lg}` 16 · `{spacing.xl}` 24 · `{spacing.2xl}` 32 · `{spacing.3xl}` 48.
Screen pad 16. Card gap 12. Row min-height **56**, score card min-height **92** (two stacked rows + status). Tab bar 56 + safe area.

### Grid
Phone-first (`apps/mobile` is Expo/React Native, no responsive breakpoints needed): single column, `Screen.tsx` sets the 16px pad and safe-area insets. Depth screens (match centre, competition, team) scroll under a sticky header.

### Whitespace
Density of a broadcast lower-third ledger, not a marketing page. Breathing room lives **between** score cards (12px gap), not inside one.

## Elevation & depth

| Level | Treatment | Use |
| --- | --- | --- |
| 0 Flat | `{colors.night}`, no border | Screen canvas |
| 1 Hairline | 1px `{colors.hairline}` border + one 1px inner top highlight at 6% bone | `score-card`, `standings-row`, inputs |
| 2 Raised | `{colors.studio}` fill, hairline border | Sticky header, date rail, tab bar |

No drop shadows anywhere. Depth is a hairline plus a single inner highlight, never `boxShadow`/`elevation` blur.

## Shapes

| Token | Value | Use |
| --- | --- | --- |
| `{rounded.none}` | 0 | Table rows (flush inside a group) |
| `{rounded.sm}` | 8 | Inputs, chips, spoiler cover |
| `{rounded.md}` | 12 | Score card, match header, formation pitch panel |
| `{rounded.pill}` | 999 | Status chip, live dot, date-rail tab |

Crests: **monogram shields** (angular heraldic-modern), native aspect, never a circle crop.

## Motion

160ms `Easing.out(Easing.cubic)` on opacity/transform (`react-native-reanimated` or `Animated`), matched across `LivePulse`, `Timeline` row-enter, and tab transitions.

- **Live pulse**: `LivePulse` opacity 1 → 0.5 → 1 over 1.2s loop on the live dot + minute only, disabled when `AccessibilityInfo.isReduceMotionEnabled()`.
- **Goal flash**: `ScoreCard`/`MatchHeader` score digit flashes `{colors.ember}` for 400ms then eases back to `{colors.bone}`, paired with `expo-haptics` `notificationAsync(Success)` — fires once per score change, never repeats.
- Crests never bounce. Score column width is reserved so a digit change never reflows the row.

## Components

### `Mark`
SVG Aperture ring (stroked ellipse) + volt diagonal slash. Props: `size`, `variant` (`"mono" | "volt"`), `color` override. Never rendered as a filled disc or a football.

### `Wordmark`
`Scoreva` in Outfit 700, optional trailing volt dot (the "nova") after the final `a`. Props: `size`, `tone` (`"bone" | "ink" | "volt"`).

### `Crest`
Monogram shield — a pointed-base heraldic outline, initials centered, club color as background wash (≤12%) or a 3px leading rail, never a full fill, never a circle. Sizes: `sm` 20 / `md` 28 / `lg` 44.

### `ScoreCard` (signature)
```
[● 67′]                         LIVE
[crest] Arsenal          ARS    2
[crest] Chelsea          CHE    1
```
- `{colors.plate}` fill, `{rounded.md}`, 1px hairline border + inner top highlight.
- Status caption top-left (`LivePulse` dot + mono minute, or `HT`/`FT`/kick-off time), league/competition tag top-right when relevant.
- Home over away, each row: crest (md) → team name (`{typography.ui}`, truncate) → short code (mute, mono) → score (`{typography.score}`, fixed 28px column).
- Club color: 3px rail on the card's leading edge (top team's color only, to avoid a two-color stripe), or omit.
- Winner emphasis on FT: loser's row drops to `{colors.mute}` text, winner stays `{colors.bone}`.
- Tap → match centre. Long-press → follow/unfollow (haptic).

### `DateRail`
Horizontal 7-day strip, `{colors.studio}` background, each day a pill tab (`{typography.ui}`), active tab underlined/filled with volt at ≤12% wash + volt text — never a solid volt pill.

### `LivePulse`
Volt dot (6px) + mono minute, 1.2s pulse loop. Standalone component reused inside `ScoreCard`, `MatchHeader`, `LiveTracker`.

### `MatchHeader`
Sticky match-centre scoreboard: two crests (`lg`), team names, `{typography.score-lg}` score pair, `LivePulse` status, kick-off/competition meta below. Goal flash uses `{colors.ember}` on the just-scored digit only — never a full-bleed red card.

### `Timeline`
Newest-event-first vertical list. Goal rows carry an `{colors.ember}` left rail + ball glyph; card rows carry `{colors.cardRed}`/`{colors.cardAmber}` chips; substitution rows are quiet (`{colors.mute}`). No drop shadow, hairline separators only.

### `FormationPitch`
4-3-3 (or passed formation) pitch panel, `{colors.studio}` fill, hairline grid lines (never green turf texture), player dots as small monogram initials on `{colors.plate}` chips.

### `DualStats`
Home/away stat bars, club-tint fill at accessible contrast on a `{colors.hairline}` track, value in `{typography.meta}` tabular on both ends.

### `StandingsTable`
Caption header row (`{typography.caption}` mute), `{typography.ui}` club names, `{typography.score}`-weight points column. Followed row = `rgba(215,255,60,0.08)` wash, never a solid volt row. Qualification zones marked by a 3px left rail in a semantic zone color, not row fills.

### `Skeleton`
Shimmer block matching `ScoreCard`/`StandingsTable` geometry exactly — `{colors.plate}` base, `{colors.hairline}` shimmer sweep, 1.1s loop.

### `EmptyState`
Title (`{typography.title}`) + body (`{typography.body}`) + optional single text action. Honest copy ("No lineup yet."). No illustration required, but composes with a Higgsfield editorial still when one is supplied via `imageSource`.

### `SpoilerCover`
Frosted `{colors.plate}` panel over a hidden score, `{colors.ice}` eye-off icon + "Score hidden" label, tap to reveal (no swipe-to-peek gimmick).

### `LiveTracker`
Compact Live-Activity-style bar (Dynamic-Island-adjacent, not iOS-exclusive): crest pair, tabular score, `LivePulse` minute, thin volt progress underline for elapsed match time. Docked bottom-above-tab-bar or top, controlled by parent.

### `TabBarIcons`
`SymbolView` name maps per destination (`ios`/`android`/`web`), active = bone, inactive = mute, no fill background, no colored badge beyond a volt dot for unread notifications.

### `Screen`
Page chrome: safe-area view, `{colors.night}` (or `{colors.paper}` light) background, optional sticky header slot, `{spacing.lg}` horizontal pad.

## Page recipes

**Home** — `Screen` → `DateRail` → live section (`ScoreCard` list) → by-competition sections.

**Match centre** — `MatchHeader` (sticky) → `Timeline` default, `FormationPitch` / `DualStats` / `StandingsTable` as segmented tabs.

**Competition** — thin competition identity (name + tag, no full-bleed) → `StandingsTable` / fixtures / results segments.

**Team** — 3px club rail + `night` body → next match `ScoreCard` → form strip → mini `StandingsTable` row → squad list.

**Player** — identity block (monogram, not a real photo) → season `DualStats` → recent ratings list.

**Notifications** — list of follow/goal/kick-off alerts, `SpoilerCover` toggle for delayed/spoiler mode surfaced at the top as a settings row, not a modal interrupt.

## Do's and Don'ts

### Do
- Reserve the score column at `{typography.score}` / `{typography.score-lg}`.
- Keep volt to live-only signal moments; keep ember to the goal-flash micro-animation only.
- Use IBM Plex Mono tabular on every clock, minute, and score.
- Build crests as monogram shields; club color as rail or ≤12% wash.
- Announce live minutes and goal flashes in accessible text, not color alone (`accessibilityLabel` on `LivePulse`).

### Don't
- Don't use purple chrome, red full-bleed goal cards, or FollowScores artwork.
- Don't use FotMob grey grouped lists or Apple Sports system green.
- Don't reuse this repo's Medal-copper palette (`#C17A3A`/`#141210`/etc.) — Scoreva is a separate, unrelated brand.
- Don't render a football, a pitch-green background, or a circle-cropped crest.
- Don't use volt as a background fill, a button color, or a tab tint — it is the flare, not the wallpaper.
- Don't add drop shadows, oversized rounded "candy" cards, fake phone bezels, or gradient mush.
- Don't add betting, odds, or Watch/stream CTAs anywhere.

## Accessibility

- Live minute and goal flash always paired with visible text/label, never color alone.
- Score contrast AAA on night/plate.
- W/D/L uses letters, not color alone.
- Hit targets ≥44px for tabs and interactive rows; row height ≥56 (score card ≥92).
- `prefers-reduced-motion` / `AccessibilityInfo.isReduceMotionEnabled()` disables `LivePulse` looping and the goal-flash animation (state still changes instantly, just without the animated transition).

## Agent prompt guide

Before UI work: read this file, then `docs/scoreva/brand.md`. Aperture hex, Outfit/Inter/Plex Mono, and the ring-and-slash mark are locked — do not invent a second palette or a new mark. Import shared types from `@/lib/types` when present; otherwise use the local types declared in each component matching `MatchStatus`/`Team`/`Match`.

Example: "Keep `ScoreCard` stacked, home over away. Score 20px tabular. Volt only on the live dot and minute."
