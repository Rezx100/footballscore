# footballscore

Live football scores for **app** and **website** — one product, association football only.

**Brand (foundation):** [docs/brand.md](docs/brand.md)  
**Design system (getdesign.md format):** [DESIGN.md](DESIGN.md)  
**Catalog of pulled analyses:** [docs/getdesign-refs/CATALOG.md](docs/getdesign-refs/CATALOG.md)  
**Figma live-score screens (Community, CC BY 4.0):** [docs/getdesign-refs/figma-livescore.md](docs/getdesign-refs/figma-livescore.md) · [gallery](docs/getdesign-refs/figma-livescore/index.html)  
**Approve wordmark + color:** [docs/brand-proposals.md](docs/brand-proposals.md) · [board](docs/brand-board.html)  
**How we get to a full brand book:** [docs/brand-plan.md](docs/brand-plan.md)  
**Product system (proposed Pitch):** [docs/design.md](docs/design.md)  
**Build prompt:** [docs/redesign-and-espn-prompt.md](docs/redesign-and-espn-prompt.md)

Wordmark construction and color palette are **not locked**. Do not treat CSS tokens as identity until a pair is approved.

## Implemented so far

**Scores** at `/matches`, fed by ESPN’s unofficial soccer API (`sport=soccer`).

- **Matches list:** that day’s games from the soccer header, merged with 28 first-class leagues (Big 5, UEFA clubs, FIFA, MLS, and other widely followed competitions). Extra cups and lower divisions still appear when they have fixtures.
- **Times and grouping:** America/New_York, matching ESPN’s US feed (viewer timezone is planned).
- Scores refresh about every 30 seconds.

```bash
npm install
npm run dev
```

Open [http://localhost:3000/matches](http://localhost:3000/matches). Date tabs, Hide all, search, and live/`FT` rows are interactive.
