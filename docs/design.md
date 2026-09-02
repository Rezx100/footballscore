# Pitch — product design system (proposed)

Pitch is how footballscore screens are built. The marketing brand is **footballscore**; Pitch is the interface OS.

**Agent-facing spec (getdesign.md / Stitch format):** [`/DESIGN.md`](../DESIGN.md) — synthesized from [getdesign.md](https://getdesign.md/) analyses (WIRED, Vercel, Mastercard, Nike) then rewritten for this product. Catalog copies live in [`docs/getdesign-refs/`](./getdesign-refs/).

**Status:** proposed. Hex in `DESIGN.md` is Palette A as a working target only. Wordmark + palette letter still need [your approval](./brand-proposals.md).

Reply `Approve Pitch` to lock the system below (except color/wordmark), or name the bits to change.

---

## 1. What we keep from the scaffolding

| Scaffolding | Proposal |
| --- | --- |
| Brand ≠ product greys | **Keep.** Signal/live is not the page tint. |
| Phone `<768` / site `≥768` / split `≥1100` | **Keep.** |
| Scores home `/matches` | **Keep.** Drop the device bezel as default chrome. |
| Home left, away right | **Keep.** Football convention. |
| Geist Sans, scores `tabular-nums` | **Keep Geist as the only product face** until a display face is chosen after color. |
| 150–200ms opacity/transform; no bouncing crests | **Keep**, tighten to 160ms ease-out. Live minute may tick. |

What the live UI does today that Pitch should **not** keep: iOS grouped-grey canvas, 15px scores, TV-icon column, drop-shadow cards, five peer tabs, fake phone frame on desktop.

---

## 2. Color roles (hex after palette lock)

One canvas, one ink, one quiet, one rule, one signal, one live, one danger. Club colors are data, not theme.

| Role | CSS | Use |
| --- | --- | --- |
| Paper | `--bg` | Page |
| Surface | `--surface` | Header, tab bar, group body |
| Ink | `--ink` | Body, scores, wordmark (until split is approved) |
| Quiet | `--muted` | Meta, kick-off, inactive tabs |
| Rule | `--line` | Hairlines, row dividers — **no drop shadows** |
| Field | `--field` | Studio / marketing / reverse (today’s `#1A1A1A` backdrop) |
| Signal | `--accent` | Follow, text links, focus ring. Rare. |
| Live | `--live` | Minute, live rail, LIVE label. Palette A uses a separate on-paper live ink. |
| Cardinal | `--danger` | Red card, error, unfollow. Never live. |
| Caution | `--caution` | Yellow card only |
| Wash | `--wash` | Selected row, 8–12% signal or live |
| Chip | `--chip` | FT / PP / AB pills |

**Data (not brand):** W / D / L use letters plus quiet fills. Possession bars use club hex at 80% with accessible contrast, not Signal. Home/away tints: 12% wash or a **3px left rail**, never a full-bleed header.

---

## 3. Type

Family: **Geist Sans** (`--font-geist-sans`). Tabular numerals on every clock and score. Tracking −0.03em on masthead and Score only.

| Name | Size / line | Weight | Where |
| --- | --- | --- | --- |
| Caption | 11 / 14 | 600 | LIVE/HT/FT over the score, rail labels |
| Meta | 12 / 16 | 500 | League name, relative time, byline |
| Body | 15 / 22 | 400 | Commentary, empty copy, settings |
| UI | 15 / 20 | 600 | Team names in a row, buttons |
| Title | 17 / 24 | 650 | Section headers, empty titles |
| Masthead | 22 / 28 | 700 | Approved wordmark in the Scores header |
| Score | 20 / 24 | 700 tabular | List row — **the sacred number** (today’s 15px is too small) |
| Score lg | 34 / 40 | 700 tabular | Match sticky scoreboard |
| Display | 44 / 48 | 700 tabular | Marketing / OG only |

Do not add a serif until color is locked. CJK/Arabic: Noto Sans fallback, same sizes.

---

## 4. Grid, space, radius

- **8-point grid.** 4-point only for icon optical tweaks and the 3px club rail.
- Page padding **16**. Group gap **12**. Row inset **12 × 12**.
- Row min-height **56**. Tab bar **56** + safe area.
- Radius: cards/groups **8** (programme, not iOS 12 blob). Pills **999**. Match rows **0** (flush inside the group). Inputs **8**.
- Elevation: **none / flat / ruled.** Ruled = 1px `--line`. No `box-shadow` on league groups.

---

## 5. Breakpoints and chrome

| Width | Chrome |
| --- | --- |
| `<768` | Full-bleed Pitch. Top: wordmark + tools. Bottom: 4 destinations. |
| `768–1099` | Same layouts, max width 720, centered, no 3-column squeeze. |
| `≥1100` | Left 72px icon rail **or** a 56px top nav (pick top nav — fewer patterns). Center Scores (max 720). Right column **only** when it has data (mini table, live list). |

**Kill** `PhoneShell` as the default product. Field color can stay as the desktop page margins behind the 720 canvas.

**Destinations (4, not 5):** **Scores · Explore · Following · More.** News lives on match, league, and Explore — not a peer tab until articles are real.

---

## 6. Icons

- Canvas **24×24**, live at 20 or 24.
- Stroke **1.75**, round cap/join, optical grid.
- Current set in `src/components/matches/icons.tsx` is the seed (pitch, search, calendar, star, menu).
- **Drop the TV glyph** from the match row. Broadcaster name is quiet text on match detail only.
- Do not use a filled social “kudos” mark. Follow is an outline star, filled when on.

---

## 7. Motion

- Duration **160ms**, easing `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Allowed: opacity, transform (translateY 4px max), live minute text swap.
- Live pulse: 1.2s opacity 1 → 0.55 on the Caption minute only, `prefers-reduced-motion: none`.
- Forbidden: bouncing crests, layout jump on score change (reserve Score width), page-tint flashes.

---

## 8. Match row (the system’s signature)

Three sketches; **implement Axis.**

**A — Axis (recommended)**  
One horizontal band. The **score is the only center axis** (fixed 72px). Caption status sits *above* the score (`78'` / `HT` / `FT` / `20:00`). Shields 24px, 8px from the axis. Names `UI`, home right-aligned, away left-aligned, truncate. No TV column. Selected = `--wash`, not a green sheet.

```
[ Home name    ] [🛡️]  78'   [🛡️] [    Away name ]
                      2–1
```

**B — Stack**  
Crest + name stacked in two columns, score still center. More distinctive, ~30% fewer rows per screen. Use on desktop right-rail cards only, not the main list.

**C — Baseline**  
Everything on one baseline, status as a trailing pill. Fast to scan kick-offs, weak for live. Reject as the default.

Kick-off uses Caption+Score column too: Caption empty or `KO`, Score slot shows time in UI tabular, not a smaller 13px.

---

## 9. Core components

| Component | Rule |
| --- | --- |
| **Masthead** | Approved wordmark, 22px. Tools: search, calendar. No extra logo mark in v1. |
| **DateStrip** | 15/20, active = 3px ink underline (not a filled chip). |
| **LiveRail** | Sticky under header when any match is live/HT. Horizontal. Caption minute + Score 16px + two shorts. Tap opens that match. |
| **LeagueGroup** | Ruled surface, 8 radius. Header: 16px mark + Meta name + optional hide. Followed = outline star, not a painted header. |
| **MatchRow** | Axis. `aria-label` already required (keep). |
| **Crest** | Shield, never circle-crop. 24 list / 32 group / 48 scoreboard. Initials on Paper if logo fails. |
| **StatusChip** | FT/PP/AB on `--chip`. Live/HT are Caption in `--live`, not a chip. |
| **TabBar** | 4 items, Caption labels, 24 icons. Active = ink; inactive = quiet. No colored fill. |
| **StickyScoreboard** | Match page. Score lg, crests 48, thin club rails. Follow + share. |
| **Timeline** | Default match panel. Newest first. Key events stronger than commentary. All / Key toggle. |
| **DualStat** | Possession-style bars, club tints, accessible contrast, value in Meta tabular. |
| **Table** | Caption header, UI club names, Score-weight pts. Highlight followed rows with wash. Qualification color only if ESPN sends it. |
| **Follow** | Star control. Quiet until on; then ink (Palette C) or signal (A/B). Never Cardinal, never Ember-as-follow. |
| **Empty** | Title + Body + one text button. No illustration in v1. Honest: “No play-by-play yet.” |
| **SearchField** | Height 40, radius 8, rule ring, focus = signal. |

---

## 10. Page recipes

**Scores**  
Masthead → LiveRail (if needed) → DateStrip → Live groups → followed → first-class with games → rest. Hide finished is a text control, not a banner.

**Match**  
StickyScoreboard → story strip (last key event) → Timeline default → Lineup / Numbers / Table / Series as a compact segment.

**League**  
Thin identity (mark + name, no full-bleed). Now / Table / Fixtures / News.

**Team**  
3px club rail + Paper body. Next match → form → mini table → squad.

---

## 11. Accessibility (non-optional)

- Live minute always in text, not color alone.
- Score contrast AAA on Paper.
- Don’t use color alone for W/D/L (letters).
- Hit targets ≥ 44px for tabs and row height ≥ 56.
- `prefers-reduced-motion` kills the live pulse.

---

## 12. Out of Pitch v1

Device bezels, betting chrome, video, xG graphics, circular crests, a fifth News tab, a second type family, dark mode (when it comes, it is a mapped ramp of the approved palette — not an invert).

---

## Map from today’s CSS

| Today | Pitch role after palette approval |
| --- | --- |
| `--bg` `#F2F2F7` | Paper (warm, not iOS grey) |
| `--surface` `#FFF` | Surface |
| `--ink` `#111` | Ink |
| `--muted` `#6B7280` | Quiet (slightly warmer) |
| `--line` `#E5E7EB` | Rule (paper-colored) |
| `--accent` / `--live` `#00A651` | Replaced by approved signal + live |
| `--danger` `#FF3B30` | Cardinal |
| `--radius-card` 12 | 8 |

Do not retoken the app until [brand-proposals.md](./brand-proposals.md) is signed **and** this Pitch proposal is accepted.
