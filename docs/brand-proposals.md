# Approve: wordmark + color

**Nothing here is the brand until you say so.** Reply with a pair, for example `Palette B + Wordmark 1`, or reject and name what to change.

Visual board (open in a browser): [brand-board.html](./brand-board.html)

Current app UI still uses temporary grey/green scaffolding. The in-product title is plain `footballscore` in ink — not a finished wordmark.

---

## What you are choosing

| Decision | You pick | We will then |
| --- | --- | --- |
| **Palette** | A, B, or C | Write hex/RGB/CMYK + WCAG into `brand.md`, replace CSS scaffolding, restyle Scores |
| **Wordmark** | 1, 2, or 3 | Lock construction rules, clearspace, and the header treatment |

A custom symbol (app icon) comes **after** this pair. We will not draw a football, a chevron, or an orange “record” button.

---

## Hard no (do not approve these, we will not propose them)

- International orange / rust / pumpkin (too close to a well-known endurance brand)
- iOS grouped-table grey (`#F2F2F7`) + system green (`#00A651`) as identity
- Broadcast red + black as the only look
- Full-bleed club red/blue headers as the product chrome
- A soccer-ball glyph as the logo

---

## Palettes

Each palette has: a **field** (marketing / studio), a **paper** (product canvas), **ink**, a **quiet** grey, a **rule**, one **signal** (brand emphasis), one **live** treatment, and **cardinal** (red card / error). Signal is used sparingly — fills, live, follow — not as body text unless WCAG AA holds.

### Palette A — Programme & floodlight

Night pitch + match-day paper + phosphor yellow for *live only*.

| Token | Hex | Role |
| --- | --- | --- |
| Pitch | `#10241C` | Field, studio, reverse wordmark ground |
| Paper | `#F3F0E8` | Page |
| Surface | `#FFFDF8` | Cards |
| Ink | `#141714` | Type |
| Quiet | `#5E635C` | Meta |
| Rule | `#DDD8CC` | Hairlines |
| Flare | `#D6F230` | Live pulse, marketing spark **on Pitch only** |
| Flare ink | `#3E4A00` | Live *text* on paper (Flare on paper fails WCAG) |
| Cardinal | `#B01A1A` | Red card, error |

**Why it might win:** nothing else in scores looks like floodlights on grass. Paper is editorial, not iOS grey.  
**Risk:** Flare can read “tech startup” if overused. Discipline: Flare is live + campaign, never page tint.  
**WCAG:** Ink on Paper AAA. Flare on Pitch OK for large UI. Flare on Paper is **not** for text.

### Palette B — Desk & cobalt

A sports desk: warm cream, near-black ink, one electric blue for interactive + live.

| Token | Hex | Role |
| --- | --- | --- |
| Navy | `#0B1C3A` | Field / reverse |
| Cream | `#F7F4EE` | Page |
| Surface | `#FFFFFF` | Cards |
| Ink | `#1A1814` | Type |
| Quiet | `#5C5850` | Meta |
| Rule | `#E4DFD4` | Hairlines |
| Cobalt | `#2154E8` | Signal, links, live, follow |
| Cardinal | `#B01A1A` | Red card, error |

**Why it might win:** one accent, strong contrast, reads as “tool” not “broadcast”. Cobalt on cream is AA for large type; use Navy for small text links if needed.  
**Risk:** Cobalt is a familiar “app blue.” We keep it sharp and pair it with cream/navy so it is not default Bootstrap.  
**WCAG:** Ink on Cream AAA. Cobalt on Cream: large/UI yes; 12px meta no.

### Palette C — Night ticket

Almost no chroma. Identity is black, ticket-stock, and a live ember that is **not** the logo color.

| Token | Hex | Role |
| --- | --- | --- |
| Night | `#0E0E10` | Field |
| Ticket | `#F4F1EA` | Page |
| Surface | `#FFFdf7` | Cards |
| Ink | `#161616` | Type |
| Quiet | `#5A5A5A` | Meta |
| Rule | `#E2DDD4` | Hairlines |
| Ember | `#E23B2C` | Live only (never wordmark, never follow) |
| Cardinal | `#9E1B1B` | Red card (darker than Ember so live ≠ card) |

**Why it might win:** the most “state of the art editorial.” Wordmark is typography, not a paint chip.  
**Risk:** Ember vs red card needs the darker Cardinal. Follow state must use Ink/Night, not Ember.

---

## Wordmarks

All options use the locked name `footballscore` (one word, lowercase). No icon yet.

### Wordmark 1 — Unit

One weight, one color, tight tracking.  
`footballscore`

Works on every palette. This is the masthead: a newspaper name, not a startup split logo. **Recommended default.**

### Wordmark 2 — Weight split

Same color. `football` medium, `score` bold (or the reverse).  
Signals that *score* is the payload without introducing a second color.

Works on every palette. Slightly more “productized” than Unit.

### Wordmark 3 — Color split

`football` in Ink, `score` in Signal (Flare ink / Cobalt / not Ember).  
Only after a palette is approved. **Incompatible with Palette C** (C has no logo chroma).  
This is the current scaffolding idea; it is **not** approved.

---

## Suggested pairs (optional)

If you want a single recommendation to accept or reject:

**Palette A + Wordmark 1** — strongest original territory, safest lettering.

Alternates: **B + 1** (more conventional product), **C + 1** (most restrained), **A + 2** (same colors, slightly more wordmark).

Do not pick **C + 3**.

---

## How to approve

Reply with one line:

`Approve Palette _ + Wordmark _`

or

`Reject. Try: …`

After that, we lock tokens in `brand.md` and `globals.css`, and only then restyle the product.
