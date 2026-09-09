import { Redirect } from 'expo-router';

import { usePrefs } from '@/providers';

export default function Index() {
  const { prefs, ready } = usePrefs();
  if (!ready) return null;
  if (!prefs.onboardingDone) return <Redirect href="/(onboarding)" />;
  return <Redirect href="/(tabs)" />;
}
