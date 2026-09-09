import { useRouter } from 'expo-router';

import { OnboardingScreen } from '@/screens';

export default function OnboardingIntro() {
  const router = useRouter();
  return <OnboardingScreen onDone={() => router.push('/(onboarding)/favorites')} />;
}
