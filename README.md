# Scoreva

Football-only live scores for **iOS and Android**, built with **React Native + Expo** and **Supabase**.

Brand: night studio, volt signal (`#D7FF3C`), Aperture mark. Design system: [`docs/scoreva/DESIGN.md`](docs/scoreva/DESIGN.md).

The existing Next.js site at the repo root is the previous footballscore web prototype. **Scoreva** is the mobile product in `apps/mobile`.

## Run in Expo Go

```bash
cd apps/mobile
npm install
npx expo start
```

Scan the QR code with Expo Go. Web preview: `npx expo start --web`.

No account is required. Favorites and notification prefs persist on device. Optional Supabase sync:

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Football API keys stay **server-side**. Set `FOOTBALL_API_KEY` as a Supabase Edge Function secret (never `EXPO_PUBLIC_*`). The `football-proxy` function uses API-Football when the key is present, otherwise ESPN’s public soccer scoreboard. Demo data keeps every screen working offline.

## EAS production builds

```bash
cd apps/mobile
npx eas-cli login
npx eas-cli build --platform ios --profile production
npx eas-cli build --platform android --profile production
```

Widgets and Live Activities are specified in `apps/mobile/widgets/` and included in the native EAS project. Expo Go shows the same compact live tracker in **More → Home screen widgets**.

## Product flow

Onboarding → favorite clubs/competitions → Live feed → match centre (timeline, lineups, stats, table) → competition → team → player → search → notifications (spoiler + delay) → settings.

## Data honesty

If a feed does not send a module, the UI says so. No odds, no Watch CTAs, no invented xG outside demo fixtures that are labelled as demo when ESPN/API is down.
