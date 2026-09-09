# Scoreva brand

Version 1.0 — **locked**. Name, palette (Aperture), type system, and mark territory are decided. This file is the agent-facing reference; implement, do not reopen.

Quality bar for the finished book: the completeness and rigor of [Strava Brand Guidelines 2.0 (2021)](https://deck.gallery/strava-brand-guidelines-2021/) — not that brand's orange, type, marks, or voice.

---

## This is us

**Scoreva** (score + nova) is a live football scores app. Spoken **skor-VAH**. The name is a signal flaring up the instant a score changes — a small explosion of light on a dark board, not a ball rolling across grass.

We are not a broadcaster, a betting desk, a multi-sport ticker, or a highlight network. We are a **night broadcast studio + tungsten floodlight + ledger board**: the calm dark control room where the scores live, lit only where something is happening right now.

## Name

| Rule | Do | Don't |
| --- | --- | --- |
| Form | `Scoreva`, capital S, one word | `ScoreVA`, `Score-va`, `SCOREVA` in running copy |
| Spoken | "skor-VAH" | "score-EE-va", "score-va" flat |
| In UI | The wordmark (`Wordmark.tsx`) or plain `Scoreva` | A different product name across platforms |
| Sport | **Football** in all user-facing copy | **Soccer** — never in UI copy |

## Mission

Make the instant a score changes readable before it happens anywhere else — one glance, then the whole story of the match.

## Vision

The night desk every football reader trusts first: honest, fast, and legible in a stadium tunnel or a dark bedroom at 11pm.

## Audience

**The night-shift reader.** Checks scores compulsively between other things, often in low light. Wants the studio-broadcast feeling of "we're on it" without video, betting, or noise. Speaks football, not producer jargon.

---

## Principles

1. **The score is the flare.** Everything else is the dark board it flares against. Volt only touches what just changed or is live right now.
2. **Territory, not sport.** We are a studio and a ledger — never a pitch, a ball, or a stadium turf render.
3. **Honest data only.** No invented stats, no fake commentary, no odds.
4. **Football only.** Association football. No NFL/NBA/MLB/NHL chrome, no "all sports" tabs.
5. **One glance, then depth.** Home feed is scores; match centre, lineups, and tables are opt-in depth.
6. **Clubs keep their colors; we keep ours.** Club color is a 3px rail or a ≤12% wash — never a full-bleed skin, never a circle-cropped badge.
7. **Restraint is premium.** 8pt grid, hairlines, one inner highlight. No drop-shadow mush, no candy pills, no fake phone bezels.

---

## Voice

**Studio desk, reader to reader.** Direct, present tense, no hype, no exclamation points.

- Prefer: `LIVE`, `HT`, `FT`, `kick-off 20:00`, `67'`, `pens`, `extra time`, `No lineup yet.`
- Avoid: `unbelievable`, `must-win`, `click here`, `Watch now`, odds language, betting CTAs, American chyron voice.
- Football lexicon only: **LIVE, HT, FT, kick-off, extra time, pens.** Never "soccer" anywhere in UI.
- Numbers: scores use an en dash in prose (`2–1`); UI uses a fixed tabular column so digits never shift the row.

**Never say:** betting, odds, Watch, stream, paywall CTAs, invented ratings, xG we do not have, real player likenesses we do not have rights to.

---

## Visual identity

### Palette — Aperture (locked)

Night broadcast studio + tungsten floodlight + ledger board. Not pitch green. Not a football.

| Token | Hex | Role |
| --- | --- | --- |
| night | `#08090D` | App canvas, dark theme |
| studio | `#111318` | Raised surface / header |
| plate | `#181B22` | Card / row fill |
| hairline | `#2A313C` | 1px dividers, rings |
| bone | `#F3F0E8` | Primary type on dark |
| mute | `#8B93A1` | Meta, secondary type |
| volt | `#D7FF3C` | **Live / brand signal.** Electric lemon stadium flood. The score just moved. |
| ember | `#FF5A2D` | **Goal flash only.** Never a persistent UI color. |
| cardRed | `#E23D3D` | Red card, error |
| cardAmber | `#E6B84A` | Yellow card |
| ice | `#6EC8E0` | Spoiler / delayed content marker |

Light theme (secondary, must remain legible):

| Token | Hex | Role |
| --- | --- | --- |
| paper | `#F4F1EA` | App canvas, light theme |
| ink | `#0E1014` | Primary type on light |
| live (light) | `#C43A12` | Live signal on paper — **volt fails contrast on paper, use this ember-red instead** |

Volt is rare on purpose: the live dot, the live minute, the score-just-changed flash, the brand slash in the mark. It is never a background fill, never a button color for anything but "LIVE" itself, never a tab bar tint.

### Type

- **Outfit** — wordmark, titles, section headers.
- **Inter** — body copy, meta, labels.
- **IBM Plex Mono** (tabular) — scores, minutes, kick-off clocks, table numerals. Every score and clock is tabular so digits never cause layout shift.
- iOS uses **SF Symbols** via `expo-symbols`; Android/web fall back to Material Symbols through the same `SymbolView` name maps — never a second icon set shipped as assets.

### Mark — Aperture

An elliptical stadium bowl (camera iris ring) pierced by a single **volt slash** — the nova of a score changing. Construction:

1. Draw a flattened ellipse (stadium bowl seen from a broadcast crane, ~1.4:1 width:height), stroked, not filled, in bone or night depending on ground.
2. Cut a single diagonal slash through the ellipse at roughly 20° off vertical, offset toward the upper-right — the "flash." This is always volt, regardless of theme, unless the mark sits on volt itself (then night).
3. The bowl is a **ring**, never a solid disc — it must read as an aperture/stadium, not a coin or a badge.
4. Never render as a football (no pentagon/hexagon panel pattern), never as a circle-cropped photo, never with a second accent color.

Minimum size: 20px (app icon safe area aside). Clear space: 0.5× the mark's own height on all sides.

### Misuse

- Never recolor the mark's slash to anything but volt (or night-on-volt).
- Never fill the bowl solid.
- Never pair the mark with a drop shadow, bevel, or gradient skin.
- Never place volt as a full-bleed background — it is a signal, not a wallpaper.
- Never use ember outside an actual goal-flash moment (it is not a second brand color).
- Never render real club crests, real kit, or real player likenesses in brand/marketing artwork — use generic geometric monogram shields and abstract figures only.

### Photography / generated imagery rules

- Territory: night broadcast studio, tungsten floodlight rigs, ledger boards, abstract stadium bowls, textured broadcast graphics, premium 3D generic sports objects (a plain ball, a net, a scoreboard) — never a licensed logo, never a real player's face, never a real kit.
- Grade: cool night blacks, volt as the only saturated light source, warm tungsten as secondary practical light. No teal-and-orange blockbuster grade, no pastel gradients.
- Composition: broadcast-crane angles, shallow depth of field, anamorphic-adjacent flares are acceptable in **marketing** stills only — never in product UI screens, which stay flat and precise.
- Crests in any generated artwork: geometric monogram shields (angular, heraldic-modern), never a circle crop, never a copy of a real club's identity.

---

## Lexicon (UI copy)

| Situation | Say | Never say |
| --- | --- | --- |
| Match in progress | `LIVE`, `67'` | `In Play`, `Now Playing` |
| Half time | `HT` | `Halftime break` |
| Full time | `FT` | `Final`, `Game Over` |
| Not started | kickoff time, `20:00` | `Upcoming`, `TBD` without a time |
| Postponed | `PP` | — |
| Abandoned | `AB` | — |
| Overtime period | `extra time` | `overtime`, `OT` |
| Penalty shootout | `pens` | `PKs`, `shootout` (stand-alone, use `pens`) |
| The sport | `football` | `soccer` |

---

## Product system name

Working name for the interface system: **Aperture UI**. Marketing brand remains **Scoreva**. Aperture UI is specified in [`DESIGN.md`](./DESIGN.md).
