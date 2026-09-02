# footballscore brand

Version 0.2 — foundation locked; v1 visual board **rejected**.  
**Wordmark construction and color palette are not locked.** Approve a v2 palette in [brand-proposals.md](./brand-proposals.md) before anyone treats hex as the brand. Marks and custom lettering follow that pick. Why v1 failed: [brand-gap.md](./brand-gap.md).

Quality bar for the finished book: the completeness and rigor of [Strava Brand Guidelines 2.0 (2021)](https://deck.gallery/strava-brand-guidelines-2021/) — not that brand’s orange, type, marks, or voice. See [brand-plan.md](./brand-plan.md).

---

## Status

| Layer | Status |
| --- | --- |
| Name, mission, vision, principles, audience | **Locked** |
| Voice stance and football lexicon (v1) | **Locked** |
| Honest-data rules | **Locked** |
| Color palette (brand + product + data) | **Needs your approval** (v2: Medal / Archive / Ribbon) |
| Custom mark | After palette pick |
| Wordmark construction | After palette + mark — not Geist split |
| Type pairing beyond Geist scaffolding | After mark |
| Photography, icons, motion, applications | After marks + color |

Until color is approved, CSS in `src/app/globals.css` is **scaffolding**, not identity. Do not add a second “official” palette in code.

---

## This is us

**footballscore** is a football-only scores product: one Next.js app that is the phone experience under 768px and the website at 768px and up. The name is the job. You open it to know the score, then stay to read the match.

We are not a broadcaster, a betting desk, a multi-sport ticker, or a highlight network. We are the **match-day programme** brought up to the minute: crests, clock, score, table, lineup, and the story of the game — from real ESPN soccer data, never invented stats.

---

## Name

| Rule | Do | Don’t |
| --- | --- | --- |
| Form | `footballscore` one word, lowercase | `FootballScore`, `Football Score`, `FS`, `the Score` |
| Spoken | “football score” | Initialisms as the primary name |
| In UI | The wordmark (once approved) or the same lowercase string | A different product name on web vs phone |
| Sport | **Football** in all user-facing copy | **Soccer** in UI (that word is an ESPN API slug only) |
| Code | `soccer` in ESPN paths and internal slugs | Renaming ESPN’s `football` sport (that is NFL — never call it) |

No tagline is locked. Candidates after color/wordmark: “The score, then the story.” / “Every match, readable.” Reject slogans that sound like a network ident.

---

## Mission

Make every football match readable in one glance, and the whole day of football readable in one sitting.

## Vision

Be the most trusted live record of association football — worldwide, honest, and fast.

## Audience

**The match-day reader.** Follows a handful of clubs and leagues. Checks scores between other things. Wants the story of a match without a stream, a bet, or a 40-tab encyclopedia. Speaks football, not broadcast-producer.

---

## Principles

1. **The score is sacred.** Size, type, and position of the score always beat chrome.
2. **Honest data only.** If ESPN does not send it, the UI does not invent it. Empty modules are omitted or named as empty — never faked.
3. **Football only.** Association football. No NFL, NBA, MLB, NHL, racing, or “all sports” chrome.
4. **One glance, then depth.** Scores first. Timeline, lineup, table, news on purpose — not seven equal destinations.
5. **Clubs keep their colors; we keep ours.** Club tints are a thin rail or a 12% wash. They never become the product skin.
6. **Speed of reading.** Ink on paper-like surfaces. One brand accent, once approved. Live is a verb, not a theme.

---

## Voice (v1)

**Reader to reader.** Direct, present tense, no hype.

- Prefer: `FT`, `HT`, `LIVE`, `2–1`, `kick-off 20:00`, `No play-by-play yet.`
- Avoid: `unbelievable`, `must-win`, `click here`, `Watch now`, odds language, American TV chyrons (`THIS is a football club`).
- Exclamation marks: almost never.
- Numbers: scores use an en dash (`2–1`) in prose; tabular numerals in UI.
- Time: viewer timezone once that ships; 24h default with a 12h setting.

**Never say** (product or docs): betting, odds, Watch, streaming paywalls, invented ratings, xG we do not have.

---

## What we never show

Drop on the floor even when a payload includes them: odds, pickcenter, video players, “Watch”, gambling CTAs, transfer fees, market values, player match ratings we do not receive, xG / xGOT / shot maps / goal maps we do not receive, NFL or other sports.

---

## Visual identity

**Not in this file until you approve a proposal.**

Open [brand-proposals.md](./brand-proposals.md) and pick one **palette**: Medal, Archive, or Ribbon — or send us back.

v1 (Programme & floodlight / Desk & cobalt / Night ticket, plus Unit / weight-split / color-split) is rejected. Do not revive lime, cobalt, or ember as identity. The wordmark is not a Geist split; it is custom lettering after the palette and mark.

After approval, this section will gain: hex/RGB/CMYK, WCAG matrix, clearspace, minimum size, misuse, and product vs marketing split.

---

## Product system name

Working name for the interface system: **Pitch**. Marketing brand remains **footballscore**. Same split Strava makes between brand and Spandex: brand color is not the UI grey ramp; data colors are not the brand accent.

Pitch is specified in [design.md](./design.md) as a **proposed** system. Color roles are listed there; hex in DESIGN.md is leftover v1 scaffolding and is **not** the brand.
