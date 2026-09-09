import { useRouter } from 'expo-router';

import { SearchScreen } from '@/screens';

export default function SearchTab() {
  const router = useRouter();
  return (
    <SearchScreen
      onSelect={(hit) => {
        if (hit.kind === 'team') router.push(`/team/${hit.id}`);
        else if (hit.kind === 'competition') router.push(`/competition/${hit.id}`);
        else if (hit.kind === 'player') router.push(`/player/${hit.id}`);
        else router.push(`/match/${hit.id}`);
      }}
    />
  );
}
