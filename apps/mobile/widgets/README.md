# Scoreva widgets

Expo Go cannot install WidgetKit / Glance targets. Production EAS builds copy:

- `ScorevaLive.swift` → iOS Widget Extension + Live Activity
- `ScorevaLive.kt` → Android Glance widget

The in-app **More → Home screen widgets** screen shows the same compact live tracker used by both targets.

Shared payload (written every 8s while a followed match is live):

```json
{
  "home": "ARS",
  "away": "CHE",
  "homeScore": 2,
  "awayScore": 1,
  "minute": 67,
  "status": "live"
}
```
