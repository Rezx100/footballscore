import { useRouter } from 'expo-router';

import { NotificationsScreen } from '@/screens';
import { NOTIFICATION_FEED } from '@/lib/demo';
import { usePrefs } from '@/providers';

export default function NotificationsRoute() {
  const router = useRouter();
  const { prefs, setPrefs, setNotification } = usePrefs();
  return (
    <NotificationsScreen
      items={NOTIFICATION_FEED}
      prefs={prefs}
      onChangeSpoiler={(spoiler) => setPrefs({ spoiler })}
      onChangeDelay={(delayMinutes) => setPrefs({ delayMinutes })}
      onToggleKind={setNotification}
      onOpenMatch={(id) => router.push(`/match/${id}`)}
    />
  );
}
