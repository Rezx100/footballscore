import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

import { usePrefs } from '@/providers';

export default function Index() {
  const { prefs, ready } = usePrefs();
  if (!ready && Platform.OS !== 'web') return null;
  if (!prefs.onboardingDone) return <Redirect href="/(onboarding)" />;
  return <Redirect href="/(tabs)" />;
}
