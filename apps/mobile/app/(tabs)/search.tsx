import { useRouter } from 'expo-router';

import { SearchScreen } from '@/screens';
import { searchAll } from '@/lib/api';

export default function SearchTab() {
  const router = useRouter();
  return (
    <SearchScreen
      searchFn={searchAll}
      onSelect={(hit) => {
        if (hit.kind === 'team') router.push(`/team/${hit.id}`);
        else if (hit.kind === 'competition') router.push(`/competition/${hit.id}`);
        else if (hit.kind === 'player') router.push(`/player/${hit.id}`);
        else router.push(`/match/${hit.id}`);
      }}
    />
  );
}
