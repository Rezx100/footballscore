import { StyleSheet, Switch, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { EmptyState, Screen, useScorevaTheme } from '@/components/scoreva';
import type { AppPrefs, NotificationItem, NotificationKind } from '@/lib/types';

const KIND_LABELS: Array<{ id: NotificationKind; label: string; hint: string }> = [
  { id: 'kickoff', label: 'Kick-off', hint: 'When the match starts' },
  { id: 'goal', label: 'Goals', hint: 'Score changes' },
  { id: 'card', label: 'Cards', hint: 'Yellow and red' },
  { id: 'sub', label: 'Substitutions', hint: 'Off by default' },
  { id: 'ht', label: 'Half-time', hint: 'When the whistle goes' },
  { id: 'ft', label: 'Full-time', hint: 'Final score' },
  { id: 'lineup', label: 'Lineups', hint: 'When XIs drop' },
  { id: 'var', label: 'VAR', hint: 'Reviews and overturns' },
];

export interface NotificationsScreenProps {
  items?: NotificationItem[];
  prefs: AppPrefs;
  onChangeSpoiler?: (value: boolean) => void;
  onChangeDelay?: (minutes: number) => void;
  onToggleKind?: (kind: NotificationKind, value: boolean) => void;
  onOpenMatch?: (matchId: string) => void;
}

export function NotificationsScreen({
  items = [],
  prefs,
  onChangeSpoiler,
  onChangeDelay,
  onToggleKind,
}: NotificationsScreenProps) {
  const theme = useScorevaTheme();

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
          value={prefs.spoiler}
          onValueChange={onChangeSpoiler}
          trackColor={{ false: theme.colors.hairline, true: `${theme.colors.ice}55` }}
          thumbColor={theme.colors.bone}
        />
      </View>

      <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView name={{ ios: 'clock', android: 'schedule', web: 'schedule' }} tintColor={theme.colors.ice} size={20} />
        <View style={styles.settingCopy}>
          <Text style={[styles.settingLabel, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
            Delay live alerts
          </Text>
          <Text style={[styles.settingHint, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
            {prefs.delayMinutes === 0 ? 'Live with the whistle' : `+${prefs.delayMinutes} min behind the broadcast`}
          </Text>
        </View>
        <Switch
          value={prefs.delayMinutes > 0}
          onValueChange={(v) => onChangeDelay?.(v ? 2 : 0)}
          trackColor={{ false: theme.colors.hairline, true: `${theme.colors.ice}55` }}
          thumbColor={theme.colors.bone}
        />
      </View>

      <Text style={[styles.sectionLabel, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
        Event types
      </Text>
      {KIND_LABELS.map((row) => (
        <View key={row.id} style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
          <View style={styles.settingCopy}>
            <Text style={[styles.settingLabel, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
              {row.label}
            </Text>
            <Text style={[styles.settingHint, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
              {row.hint}
            </Text>
          </View>
          <Switch
            value={prefs.notifications[row.id]}
            onValueChange={(v) => onToggleKind?.(row.id, v)}
            trackColor={{ false: theme.colors.hairline, true: `${theme.colors.volt}55` }}
            thumbColor={theme.colors.bone}
          />
        </View>
      ))}

      <Text style={[styles.sectionLabel, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
        Recent
      </Text>
      {items.length === 0 ? (
        <EmptyState title="All quiet" body="Follow a club to get goal and kick-off alerts." />
      ) : (
        items.map((item) => (
          <View key={item.id} style={[styles.row, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
            <View
              style={[
                styles.iconDot,
                { backgroundColor: item.kind === 'goal' ? theme.colors.volt : theme.colors.hairline },
              ]}
            />
            <Text style={[styles.rowText, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.text }]}>
              {prefs.spoiler && (item.kind === 'goal' || item.kind === 'ft') ? 'Score hidden · tap a match to reveal' : item.text}
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
  title: { fontSize: 24, fontWeight: '600', marginTop: 4 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  settingCopy: { flex: 1, gap: 2 },
  settingLabel: { fontSize: 15 },
  settingHint: { fontSize: 12 },
  sectionLabel: { fontSize: 12, letterSpacing: 0.3, marginTop: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  iconDot: { width: 8, height: 8, borderRadius: 4 },
  rowText: { flex: 1, fontSize: 14 },
  rowTime: { fontSize: 12 },
});
