import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { Screen, useScorevaTheme, Wordmark, type ScorevaColorScheme } from '@/components/scoreva';
import type { AppPrefs } from '@/lib/types';

type SymbolName = NonNullable<SymbolViewProps['name']>;

export interface SettingsScreenProps {
  prefs: AppPrefs;
  signedIn?: boolean;
  sourceLabel?: string;
  onChangeScheme?: (scheme: ScorevaColorScheme | 'system') => void;
  onChangeSpoiler?: (value: boolean) => void;
  onChangeHour12?: (value: boolean) => void;
  onChangeHideFinished?: (value: boolean) => void;
  onOpenRow?: (id: string) => void;
}

export function SettingsScreen({
  prefs,
  signedIn,
  sourceLabel,
  onChangeScheme,
  onChangeSpoiler,
  onChangeHour12,
  onChangeHideFinished,
  onOpenRow,
}: SettingsScreenProps) {
  const theme = useScorevaTheme();
  const scheme = prefs.scheme === 'light' ? 'light' : 'dark';

  const rows: Array<{ id: string; icon: SymbolName; label: string; hint?: string }> = [
    { id: 'notifications', icon: { ios: 'bell', android: 'notifications', web: 'notifications' }, label: 'Notifications' },
    { id: 'widgets', icon: { ios: 'square.stack', android: 'widgets', web: 'widgets' }, label: 'Home screen widgets' },
    { id: 'account', icon: { ios: 'person', android: 'person', web: 'person' }, label: signedIn ? 'Account · synced' : 'Account · optional' },
    { id: 'about', icon: { ios: 'info.circle', android: 'info', web: 'info' }, label: 'About Scoreva' },
  ];

  return (
    <Screen>
      <View style={styles.brand}>
        <Wordmark size={22} />
        {sourceLabel ? (
          <Text style={[styles.hint, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
            Feed · {sourceLabel}
          </Text>
        ) : null}
      </View>

      <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView name={{ ios: 'moon.stars', android: 'dark_mode', web: 'dark_mode' }} tintColor={theme.colors.textMuted} size={20} />
        <Text style={[styles.label, { flex: 1, fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
          Dark theme
        </Text>
        <Switch
          value={scheme === 'dark'}
          onValueChange={(v) => onChangeScheme?.(v ? 'dark' : 'light')}
          trackColor={{ false: theme.colors.hairline, true: `${theme.colors.volt}55` }}
          thumbColor={theme.colors.bone}
        />
      </View>

      <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView name={{ ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }} tintColor={theme.colors.ice} size={20} />
        <Text style={[styles.label, { flex: 1, fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
          Spoiler-free mode
        </Text>
        <Switch
          value={prefs.spoiler}
          onValueChange={onChangeSpoiler}
          trackColor={{ false: theme.colors.hairline, true: `${theme.colors.ice}55` }}
          thumbColor={theme.colors.bone}
        />
      </View>

      <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView name={{ ios: 'clock', android: 'schedule', web: 'schedule' }} tintColor={theme.colors.textMuted} size={20} />
        <Text style={[styles.label, { flex: 1, fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
          12-hour kick-off
        </Text>
        <Switch
          value={prefs.hour12}
          onValueChange={onChangeHour12}
          trackColor={{ false: theme.colors.hairline, true: `${theme.colors.volt}55` }}
          thumbColor={theme.colors.bone}
        />
      </View>

      <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView name={{ ios: 'line.3.horizontal.decrease', android: 'filter_list', web: 'filter_list' }} tintColor={theme.colors.textMuted} size={20} />
        <Text style={[styles.label, { flex: 1, fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
          Hide finished
        </Text>
        <Switch
          value={prefs.hideFinished}
          onValueChange={onChangeHideFinished}
          trackColor={{ false: theme.colors.hairline, true: `${theme.colors.volt}55` }}
          thumbColor={theme.colors.bone}
        />
      </View>

      {rows.map((row) => (
        <Pressable
          key={row.id}
          onPress={() => onOpenRow?.(row.id)}
          style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}
        >
          <SymbolView name={row.icon} tintColor={theme.colors.textMuted} size={20} />
          <Text style={[styles.label, { flex: 1, fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
            {row.label}
          </Text>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            tintColor={theme.colors.textMuted}
            size={16}
          />
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: { alignItems: 'center', marginBottom: 8, gap: 4 },
  hint: { fontSize: 12 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  label: { fontSize: 15 },
});
