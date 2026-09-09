import { Platform } from 'react-native';

import type { NotificationKind } from './types';

export async function registerForPushAsync(): Promise<string | null> {
  if (Platform.OS === 'web') return null;
  const Notifications = await import('expo-notifications');
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
  const existing = await Notifications.getPermissionsAsync();
  let status = existing.status;
  if (status !== 'granted') {
    const asked = await Notifications.requestPermissionsAsync();
    status = asked.status;
  }
  if (status !== 'granted') return null;
  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}

export async function scheduleLocalMatchAlert(
  kind: NotificationKind,
  title: string,
  body: string,
  delaySeconds: number,
) {
  if (Platform.OS === 'web') return;
  const Notifications = await import('expo-notifications');
  return Notifications.scheduleNotificationAsync({
    content: { title, body, data: { kind } },
    trigger:
      delaySeconds > 0
        ? { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: delaySeconds }
        : null,
  });
}
