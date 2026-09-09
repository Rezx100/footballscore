# Scoreva

Football-only live scores for **iOS and Android**, built with **React Native + Expo** and **Supabase**.

Brand: night studio, volt signal (`#D7FF3C`), Aperture mark. Design system: [`docs/scoreva/DESIGN.md`](docs/scoreva/DESIGN.md).

The existing Next.js site at the repo root is the previous footballscore web prototype. **Scoreva** is the mobile product in `apps/mobile`.

## Run on a laptop

Scoreva is a phone app. On a laptop you run it in the browser (a phone-width column).

You need **Node.js 20+** and Git. Then:

```bash
git clone https://github.com/Rezx100/footballscore.git
cd footballscore
git checkout cursor/scoreva-expo-live-ff43
cd apps/mobile
npm install
npx expo start --web
```

When Metro prints a URL, open it (usually `http://localhost:8081`). Chrome / Edge / Safari all work. After it loads, Chrome can **Install Scoreva** from the address bar if you want a desktop window.

No account is required.

### Phone (Expo Go)

```bash
cd apps/mobile
npm install
npx expo start
```

Scan the QR code with Expo Go.

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

## Store assets

App Store UI frames: `apps/mobile/assets/store/01-home.png` … `07-notifications.png`.
Captured product screens from the running app: `apps/mobile/assets/store/product-*.png`.


If a feed does not send a module, the UI says so. No odds, no Watch CTAs, no invented xG outside demo fixtures that are labelled as demo when ESPN/API is down.
