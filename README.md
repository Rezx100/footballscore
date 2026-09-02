# footballscore

Live football scores for **app** and **website**.

- App UI follows **FotMob iOS**.
- Website chrome follows **X Sports** + **Perplexity Sports**.
- Football data and modules stay aligned across both surfaces.

**Spec:** [docs/ui-spec.md](docs/ui-spec.md)

## Implemented so far

**A1 Matches** (FotMob home) at `/matches`, fed by ESPN’s unofficial soccer API (`sport=soccer`).

- **Matches list:** that day’s games from the soccer header, merged with 28 first-class leagues (Big 5, UEFA clubs, FIFA, MLS, and other widely followed competitions). Extra cups and lower divisions still appear when they have fixtures.
- **Times and grouping:** America/New_York, matching ESPN’s US feed.
- Scores refresh about every 30 seconds.

```bash
npm install
npm run dev
```

Open [http://localhost:3000/matches](http://localhost:3000/matches). Date tabs, Hide all, search, and live/`FT` rows are interactive.
