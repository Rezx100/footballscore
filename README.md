# ESPN football API

Unofficial ESPN **soccer** client (`sport=soccer`). Association football only. No UI.

Import from `@/lib/espn`. Fetch uses Next.js `revalidate` caching.

```ts
import { DEFAULT_PREFS } from "@/lib/types";
import { getMatchesForDay, getLeaguePage, getMatchDetail } from "@/lib/espn";

const prefs = DEFAULT_PREFS; // { tz: "UTC", hour12: false }

const { groups } = await getMatchesForDay("today", prefs);
const league = await getLeaguePage("eng.1", prefs);
const match = await getMatchDetail("eng.1", "eventId", prefs);
```

## Loaders

| Function | What it returns |
|---|---|
| `getMatchesForDay(day, prefs)` | Scoreboard groups for yesterday / today / tomorrow / next |
| `getLeaguePage(slug, prefs)` | League meta, live/today, table, clubs, news, fixtures |
| `getMatchDetail(league, id, prefs)` | Match, timeline, lineups, stats, venue |
| `getTeamPage(league, id, prefs)` | Club profile, schedule, form, squad, injuries |
| `getPlayerPage(id, league?, teamId?)` | Player from core athletes + optional roster |
| `getNewsIndex(follow)` | World + followed news |
| `getArticle(id)` | Story HTML |
| `getCatalog()` | All soccer leagues (live ESPN catalog, persisted fallback) |
| `getFirstClassClubs()` | Clubs in the 28 first-class competitions |
| `getFollowedClubs(teams)` | Clubs for followed team ids |

## Raw ESPN fetches

`fetchSoccerHeader`, `fetchScoreboard`, `fetchSummary`, `fetchStandings`, `fetchTeams`, `fetchTeam`, `fetchRoster`, `fetchSchedule`, `fetchInjuries`, `fetchNews`, `fetchArticle`, `fetchLeaguesCatalog`, `fetchLeaders`, `fetchCoreLeague`, `fetchOnDayDates`, `fetchAthlete`.

First-class slugs live in `FIRST_CLASS_LEAGUES` (`eng.1`, `esp.1`, `uefa.champions`, …).

```bash
npm install
npm run dev
```
