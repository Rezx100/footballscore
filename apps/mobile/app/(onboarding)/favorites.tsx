import { useRouter } from 'expo-router';

import { FavoritePickerScreen } from '@/screens';
import { useFollow, usePrefs } from '@/providers';

export default function OnboardingFavorites() {
  const router = useRouter();
  const { setPrefs } = usePrefs();
  const { setTeams, setCompetitions, follow } = useFollow();

  return (
    <FavoritePickerScreen
      initialTeamIds={follow.teams}
      initialCompetitionIds={follow.competitions}
      onContinue={({ teams, competitions }) => {
        setTeams(teams);
        setCompetitions(competitions);
        setPrefs({ onboardingDone: true });
        router.replace('/(tabs)');
      }}
    />
  );
}
