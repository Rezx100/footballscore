import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { EmptyState, Screen, useScorevaTheme } from '@/components/scoreva';

interface NotificationItem {
  id: string;
  icon: 'goal' | 'kickoff' | 'follow';
  text: string;
  time: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n-1', icon: 'goal', text: 'Goal! Arsenal 2–1 Chelsea', time: '2m' },
  { id: 'n-2', icon: 'kickoff', text: 'Kick-off in 30 minutes: Arsenal vs Chelsea', time: '38m' },
  { id: 'n-3', icon: 'follow', text: "You're now following Arsenal", time: '1h' },
];

export interface NotificationsScreenProps {
  items?: NotificationItem[];
}

export function NotificationsScreen({ items = NOTIFICATIONS }: NotificationsScreenProps) {
  const theme = useScorevaTheme();
  const [spoilerFree, setSpoilerFree] = useState(false);
  const [delayAlerts, setDelayAlerts] = useState(true);

  return (
    <Screen>
      <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Notifications
      </Text>

      <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView
          name={{ ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }}
          tintColor={theme.colors.ice}
          size={20}
        />
        <View style={styles.settingCopy}>
          <Text style={[styles.settingLabel, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
            Spoiler-free mode
          </Text>
          <Text style={[styles.settingHint, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
            Hide scores until you open the match
          </Text>
        </View>
        <Switch
          value={spoilerFree}
          onValueChange={setSpoilerFree}
          trackColor={{ false: theme.colors.hairline, true: `${theme.colors.ice}55` }}
          thumbColor={theme.colors.bone}
        />
      </View>

      <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView
          name={{ ios: 'clock', android: 'schedule', web: 'schedule' }}
          tintColor={theme.colors.ice}
          size={20}
        />
        <View style={styles.settingCopy}>
          <Text style={[styles.settingLabel, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
            Delay live alerts
          </Text>
          <Text style={[styles.settingHint, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
            +2 min behind the broadcast
          </Text>
        </View>
        <Switch
          value={delayAlerts}
          onValueChange={setDelayAlerts}
          trackColor={{ false: theme.colors.hairline, true: `${theme.colors.ice}55` }}
          thumbColor={theme.colors.bone}
        />
      </View>

      <Text
        style={[styles.sectionLabel, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}
      >
        Recent
      </Text>

      {items.length === 0 ? (
        <EmptyState title="All quiet" body="No alerts yet. Follow a club to get goal and kick-off alerts." />
      ) : (
        items.map((item) => (
          <View key={item.id} style={[styles.row, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
            <View
              style={[
                styles.iconDot,
                {
                  backgroundColor:
                    item.icon === 'goal'
                      ? theme.colors.volt
                      : item.icon === 'kickoff'
                        ? theme.colors.hairline
                        : theme.colors.hairline,
                },
              ]}
            />
            <Text style={[styles.rowText, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.text }]}>
              {item.text}
            </Text>
            <Text style={[styles.rowTime, { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.textMuted }]}>
              {item.time}
            </Text>
          </View>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  settingCopy: {
    flex: 1,
    gap: 2,
  },
  settingLabel: {
    fontSize: 15,
  },
  settingHint: {
    fontSize: 12,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 0.3,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rowText: {
    flex: 1,
    fontSize: 14,
  },
  rowTime: {
    fontSize: 12,
  },
});
