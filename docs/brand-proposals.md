# Approve: palette (then marks, then wordmark)

**Nothing here is the brand until you say so.** The v1 board is rejected. Reply with a palette name, or reject and name what to change.

Visual boards:

- [Medal](./brand-boards/palette-medal.html) · [Archive](./brand-boards/palette-archive.html) · [Ribbon](./brand-boards/palette-ribbon.html)
- Rejected v1: [brand-board.html](./brand-board.html)

Gap analysis (what was missing): [brand-gap.md](./brand-gap.md)

Current app UI still uses temporary grey/green scaffolding. The in-product title is plain `footballscore` in ink — not a finished wordmark.

---

## What you are choosing now

| Decision | You pick | We will then |
| --- | --- | --- |
| **Palette** | Medal, Archive, or Ribbon | Generate three original marks in that chroma, then a custom `footballscore` wordmark / type lockup |
| **Wordmark** | *Not yet* | v1 Unit / weight-split / color-split are retired. Lettering comes after the palette and the mark. |

Do not lock hex into `brand.md` or CSS until you approve a palette **and** later a mark + wordmark.

---

## Hard no

- International orange / rust / pumpkin
- iOS grouped-table grey (`#F2F2F7`) + system green (`#00A651`)
- Lime phosphor as identity
- Cobalt SaaS blue as identity
- Broadcast red + black as the *only* look
- Full-bleed club red/blue headers as product chrome
- A soccer-ball glyph, or a shield used as a synonym for trust

---

## Palettes (v2)

Each option differs by **strategy**, not a hue swap. Each has a field, paper, ink, one owned signal, a quiet, and cardinal (red card / error — never the logo color).

### Medal — championship hardware

Carbon field, bone paper, one struck-copper signal.

| Token | Hex | Role |
| --- | --- | --- |
| Carbon | `#141210` | Field, reverse, studio |
| Bone | `#F3EDE4` | Page |
| Ink | `#1A1612` | Type |
| Copper | `#C17A3A` | Brand signal (sparingly) |
| Patina | `#3D5C52` | Support, never a pitch fill |
| Cardinal | `#9B1B1B` | Red card, error |

**Why it might win:** metal is ownable in scores; grass and sky are not. Copper is hardware, not orange endurance kit.  
**Risk:** copper can read “luxury goods” if overused. Discipline: Copper is signal + live-on-field, never page tint. Patina is quiet structure, not identity green.  
**Marks this palette can carry:** struck-metal FS monogram with a coin-edge notch; a scoreline strike through counters; a kickoff-coin disc with one cut — no ball.

### Archive — match-day print

Ivory stock, claret as the owned chroma, ink. Gold is a hairline, never a luxury wash.

| Token | Hex | Role |
| --- | --- | --- |
| Ivory | `#F6F1E6` | Page |
| Claret | `#6E1024` | Field + brand signal |
| Ink | `#191412` | Type |
| Quiet | `#6A6259` | Meta |
| Rule | `#C4A574` | Hairlines only |
| Cardinal | `#8E1515` | Red card (distinct from Claret) |

**Why it might win:** the programme is already our territory. Claret is football heritage without being a club skin if it stays ink-on-ivory, not a full-bleed jersey.  
**Risk:** too close to one club if Claret becomes the chrome. Keep it as masthead + live rail, not the whole UI. Rule gold must stay 1px.  
**Marks this palette can carry:** condensed programme-masthead FS lettermark; negative-space score window in an o-counter; two-column table rule — not a shield.

### Ribbon — stadium LED

Void and optical white, one magenta strobe that is neither live-green nor desk-blue.

| Token | Hex | Role |
| --- | --- | --- |
| Void | `#0B0B0D` | Field |
| Optical | `#F5F4F0` | Page |
| Ink | `#141416` | Type |
| Strobe | `#E4007C` | Brand + live |
| Quiet | `#8A8682` | Meta |
| Cardinal | `#A3182A` | Red card (not Strobe) |

**Why it might win:** nothing in the scores category owns magenta. It reads as timing hardware and stadium ribbon, not a pitch or a SaaS button.  
**Risk:** Strobe is loud. Use it like a LIVE rail and a wordmark cut, never as a page. Cardinal must stay the card/error red so live ≠ foul.  
**Marks this palette can carry:** LED-ribbon cut through an FS monogram; minute-rail with a live notch; optical score-window rectangle — no ball.

---

## Wordmark (not on this board)

v1 options are retired:

- ~~Unit~~ (system sans, one weight)
- ~~Weight split~~ (`football` / **`score`**)
- ~~Color split~~ (`football` + painted `score`)

After you pick a palette, we generate three marks, then a custom lettered `footballscore` (one word, lowercase, locked name) that can only be this product.

---

## How to approve

Reply with one line:

`Approve Palette Medal` / `Archive` / `Ribbon`

or

`Reject. Try: …`

After that, three marks. Then the wordmark. Then tokens in `brand.md` and CSS.
