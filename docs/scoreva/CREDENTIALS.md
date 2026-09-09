# Credentials (server-side only)

Scoreva runs on demo data without any keys. To connect live coverage:

1. Create a dedicated **Supabase** project named Scoreva (do not reuse unrelated projects).
2. Apply `supabase/migrations/20260909120000_scoreva_core.sql`.
3. Deploy `supabase/functions/football-proxy`.
4. Set secrets on the function (never in the Expo client):
   - `FOOTBALL_API_KEY` — API-Football / API-Sports key
   - `FOOTBALL_API_HOST` — default `v3.football.api-sports.io`
5. Put only publishable values in Expo:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

EAS:

```bash
eas secret:create --name FOOTBALL_API_KEY --value <key>
```

Ask the operator for the football API key in a password manager or EAS secret prompt. Do not paste keys into git, screenshots, or chat.
