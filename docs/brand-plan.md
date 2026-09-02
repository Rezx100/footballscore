# Brand system plan

How footballscore gets a brand book as complete as a category-leading sports guidelines deck — without copying anyone’s marks, palette, or UI.

**Gate:** [wordmark + color approval](./brand-proposals.md). No hex or logo construction is final until that gate passes.

---

## 1. Audit: Strava Brand Guidelines 2.0 (April 2021)

Source: [deck.gallery/strava-brand-guidelines-2021](https://deck.gallery/strava-brand-guidelines-2021/) (101 slides).

This deck is the **quality bar**: how a mature sports brand specifies itself for designers, partners, and product. It is **not** a moodboard to restyle footballscore. We take structure and discipline. We refuse Orange, Maison Neue, the Echelon chevron, Spandex naming, athlete-to-athlete voice, and any lockup that would be recognizable as that company.

### 1.1 How the book is built

Four movements:

1. **Foundation** — who we are, name origin, mission, vision, principles, named audience  
2. **Brand** — marks, color, type, voice, photography, icons, in-product marketing templates, community surfaces  
3. **Product design system** (they name it Spandex) — type scale, interface greys vs brand color, data colors, 8-point grid, containers, badges  
4. **Visual archive** — proof in merch, campaigns, digital, print

That sequence is the point. Visuals come after meaning. Product UI greys are **not** the brand orange. Data viz has its own hues (e.g. heart-rate red) so charts do not steal the brand color.

### 1.2 What the deck actually specifies (jobs we must also do)

| Chapter (their book) | Job | footballscore equivalent |
| --- | --- | --- |
| This is us / name origin | One sentence origin, not a myth | Name *is* the job (locked in `brand.md`) |
| Mission / vision | Memorable, operational | Locked |
| Six principles | Decision filters | Six principles locked |
| Named audience | “Invested Athlete” | “Match-day reader” |
| Wordmark + clearspace + colorways | Permitted lockups only | **After your approval** |
| Icon mark vs wordmark | When the symbol may stand alone | Custom mark after wordmark |
| Sub-brands | Business, Metro lockups | None in v1 (no Business/Metro analog) |
| Partner lockups | Side-by-side, “Compatible with” / “Powered by” | Later, if we ever badge a data source — never a betting partner |
| Logo misuse (nine don’ts) | Visual don’ts | Required in v1.1 of `brand.md` |
| Primary color + supporting named ramps | Orange + Pumpkin, Rust, Coal, Gravel, Fog, Icicle, Silver; orange *sparingly* | Our named ramp after palette approval |
| WCAG AA/AAA on the brand color | Contrast as a first-class slide | Required; Flare-on-paper will fail — we already designed around that in Palette A |
| Type + script coverage | Maison Neue; Noto Sans for CJK | Geist scaffolding now; display face + CJK plan after color |
| Voice, tone by context, punctuation, banned words | Athlete to athlete | Reader to reader (v1 locked) |
| Photography principles | In the action, real people, motion, emotion, crop space | Pitch-side, honest, no stock handshake; after marks |
| Icon grid + common mistakes | Sizes, optical grid | 24px / 8pt stroke language in Pitch |
| In-product ads (“Dorados” Z1 / Z11 / Z2) | Named templates with safe zones | “Kickoff cards” — only if we ever promo in-product |
| Clubs & challenges | Community skins | Out of scope v1 |
| Product type scale, 8pt grid, containers | Named sizes caption→display | Pitch `design.md` |
| Interface greys ≠ brand orange | N20 backgrounds, panel fills | Paper / surface / rule |
| Data colors | Separate from brand | Possession, W/D/L, cards — letters + color |
| Badges | Employee, subscriber, Pro, verified | Follow is a state, not a social badge; skip celebrity badges |
| Archive | Campaigns, kit, Year in Sport | OG images, empty states, one launch campaign |

### 1.3 Why this deck is “best of the best” (craft, not aesthetics)

- **Foundation before Figma.** Mission and audience are binding, not poster copy.
- **One loud color, used rarely.** Emphasis stays emphasis.
- **Accessibility is in the brand chapter**, not an appendix.
- **Voice is specified as tightly as the logo** (punctuation, hyphens, banned phrases).
- **Don’ts are pictured**, not implied.
- **Product system is named and separate** from marketing.
- **Partnerships are locked down** so the mark cannot be casually co-branded.
- **Applications prove the system** (archive), so the book is not hypothetical.

### 1.4 What we explicitly will not take

- Palette family (orange / rust / coal-as-identity)
- Wordmark geometry or Echelon
- “Athlete” as our noun (ours is reader / match / club)
- Feed-native social mechanics as brand (kudos, clubs, challenges)
- A protruding circular “record” control as identity
- Their product grey recipe as ours

---

## 2. Where footballscore is today

| Asset | Today | Gap vs the bar |
| --- | --- | --- |
| Meaning | This plan + `brand.md` foundation | Need the rest of the book |
| Wordmark | Unapproved; UI shows plain `footballscore` | Construction, clearspace, reverse, min size, misuse |
| Color | Scaffolding greys + green in CSS | Named ramp, WCAG matrix, data vs brand |
| Type | Geist Sans | Display face decision, score tabular system, CJK |
| Voice | v1 in `brand.md` | Surface-by-surface tone, full banned list |
| UI | Temporary phone frame around Scores | Original match row, live rail, desktop density — after palette |
| Icons | Custom 24px strokes | Grid, optical corrections, full set |
| Photography | None | Principles + crop rules |
| Archive | None | OG, empty states, one campaign |

Competitor UI specs have been **removed** from this repo. Product IA (Scores, match, league, team, following, news) is ours. Data is ESPN soccer.

---

## 3. Original territory

**Programme & floodlight** — a printed match-day programme (paper, ink, crests as heraldry) plus the one modern intrusion: the floodlight when a match is live.

That territory is independent of which palette you approve. Palette A leans into it chromatically. B and C still use paper/ink; they change the signal.

Product bets that are brand, not chrome:

- The **score** is the hero, not the tab bar.
- A match is **one story** (sticky scoreboard + timeline; secondary panels for lineup / numbers / table / series).
- **Follow** sorts the day; it does not ghetto the rest of the world.
- Club color is a **rail**, not a skin.
- Desktop is the **same product at a higher density**, not a different website.

---

## 4. Target table of contents (finished book)

The finished `docs/brand.md` (and later a designed PDF) should contain every chapter below. v0.1 is Foundation only.

### Foundation

1. How to use this document  
2. This is us  
3. Name (origin, casing, don’ts)  
4. Mission / vision  
5. Principles  
6. Audience  

### Brand

7. Wordmark — lockups, clearspace, min size, colorways, reverse  
8. Mark — when it may stand alone (after design)  
9. Misuse — at least nine pictured don’ts  
10. Color — primary, supporting, product greys, data, WCAG  
11. Type — marketing vs product, scores, numerals, CJK/Arabic fallbacks  
12. Voice — tone by surface (Scores, match live, errors, news, empty)  
13. Lexicon — FT/HT/NS, kick-off, extra time, pens  
14. Photography / imagery — principles, crest handling, no fake crowds  
15. Iconography — grid, sizes, creation don’ts  
16. Motion — 150–200ms, live pulse, no bouncing crests  
17. Sound / haptics — none in v1; if added, specify  

### Pitch (product)

18. Type scale (named: Caption → Display)  
19. 8-point grid (4-point exception)  
20. Containers (none / flat / raised)  
21. Match row anatomy (original; one chosen after three sketches)  
22. Live language (rail, minute, `aria-label`)  
23. Nav (phone destinations + desktop)  
24. Dark mode (first-class if shipped; not an invert)  

### Applications

25. Kickoff cards (in-product promo templates, if any)  
26. App icon, favicon, OG, social  
27. Empty states  
28. Visual archive (real screens once they exist)  

---

## 5. Creation phases

Do not skip gates. Wordmark and color are **human-approved**.

### Phase 0 — Foundation + purge (this change)

- Remove every competitor brand as a design source from docs, README, metadata, and UI copy.
- Lock meaning in `brand.md`.
- Publish three palettes and three wordmarks for approval.
- CSS remains scaffolding.

**Done when:** repo grep is clean; you have a one-line approval path.

### Phase 1 — Lock identity (after your reply)

- Record the approved pair in `brand.md` with full token tables.
- Replace `globals.css` scaffolding.
- Wordmark in the Scores header follows the approved construction only.
- WCAG checklist in the book (text on paper, live on paper, reverse on field).
- Clearspace + min size + three misuse examples (more later).

**Done when:** tokens in code === tokens in the book, and you have signed the pair.

### Phase 2 — Marks + type

- Commission or construct a **custom mark** that is not a ball and not a chevron (sketch 5, pick 1).
- App icon, favicon, OG using Field + Wordmark.
- Decide display face vs Geist-only. Scores: `tabular-nums`, weight scale.
- Document CJK/Arabic: Noto Sans as fallback (same job their book gives Noto).

### Phase 3 — Pitch UI restyle (Scores first)

- Retire the fake device bezel as the default product chrome.
- Original match row (home left, away right — football convention — our layout).
- Live rail, viewer timezone, paper surfaces.
- Browser-verify 390 and 1280.

Do not open Match/League/Team visual design until Scores is the system.

### Phase 4 — Voice + imagery + icons

- Expand banned words; tone matrix.
- Photography principles; crest rules (shields stay shields).
- Icon grid baked into `icons.tsx`.

### Phase 5 — Book completion + archive

- Misuse sheet (nine).
- Data palette vs brand.
- Dark mode spec if we ship it.
- Archive: real screenshots in `docs/archive/`.
- Optional designed PDF of `brand.md` (the 101-slide analog).

### Phase 6 — Applications

- Kickoff card templates only if we need in-product promo.
- No partner “powered by” mark unless legal asks; ESPN is a data source, not a co-brand.

---

## 6. Governance

- **Single source:** `docs/brand.md`. Code tokens must match.
- **Palette/wordmark changes** after lock require a new approval, not a drive-by hex edit.
- **No third palette** “just for dark mode” — dark is a mapped ramp of the approved one.
- **Do not “reference” other scores apps in docs.** Jobs-to-be-done can be described without naming them.

---

## 7. Definition of done (state of the art)

The brand is done when a designer who has never seen the product can, from `brand.md` alone:

1. Write a headline in our voice  
2. Place the wordmark on paper and on field without guessing clearspace  
3. Color a live minute, a red card, and a follow control without colliding  
4. Build a new screen on the 8pt grid that still reads as footballscore  
5. Reject a bad lockup using the misuse sheet  

That is the bar the 2021 sports guidelines deck sets. We meet the bar with **our** name, **our** audience, and **your** approved palette and wordmark.
