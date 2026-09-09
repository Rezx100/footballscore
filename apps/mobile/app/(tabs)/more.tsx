import { useRouter } from 'expo-router';

import { SettingsScreen } from '@/screens';
import { useAuth, useFeed, usePrefs } from '@/providers';

export default function MoreTab() {
  const router = useRouter();
  const { prefs, setPrefs } = usePrefs();
  const { session } = useAuth();
  const feed = useFeed();

  return (
    <SettingsScreen
      prefs={prefs}
      signedIn={Boolean(session)}
      sourceLabel={feed.stale ? `${feed.source} · cached` : feed.source}
      onChangeScheme={(scheme) => setPrefs({ scheme })}
      onChangeSpoiler={(spoiler) => setPrefs({ spoiler })}
      onChangeHour12={(hour12) => setPrefs({ hour12 })}
      onChangeHideFinished={(hideFinished) => setPrefs({ hideFinished })}
      onOpenRow={(id) => {
        if (id === 'notifications') router.push('/notifications');
        else if (id === 'widgets') router.push('/widgets');
        else if (id === 'account') router.push('/account');
        else if (id === 'about') router.push('/about');
      }}
    />
  );
}
