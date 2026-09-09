import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { Screen, useScorevaTheme, Wordmark, type ScorevaColorScheme } from '@/components/scoreva';

type SymbolName = NonNullable<SymbolViewProps['name']>;

interface SettingsRow {
  id: string;
  icon: SymbolName;
  label: string;
  kind: 'switch' | 'link';
  value?: boolean;
}

export interface SettingsScreenProps {
  scheme?: ScorevaColorScheme;
  onChangeScheme?: (scheme: ScorevaColorScheme) => void;
  onOpenRow?: (id: string) => void;
}

const ROWS: SettingsRow[] = [
  { id: 'spoiler', icon: { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }, label: 'Spoiler-free mode', kind: 'switch', value: false },
  { id: 'notifications', icon: { ios: 'bell', android: 'notifications', web: 'notifications' }, label: 'Notifications', kind: 'link' },
  { id: 'account', icon: { ios: 'person', android: 'person', web: 'person' }, label: 'Account', kind: 'link' },
  { id: 'about', icon: { ios: 'info.circle', android: 'info', web: 'info' }, label: 'About Scoreva', kind: 'link' },
];

export function SettingsScreen({ scheme = 'dark', onChangeScheme, onOpenRow }: SettingsScreenProps) {
  const theme = useScorevaTheme();

  return (
    <Screen>
      <View style={styles.brand}>
        <Wordmark size={22} />
      </View>

      <View style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView
          name={{ ios: 'moon.stars', android: 'dark_mode', web: 'dark_mode' }}
          tintColor={theme.colors.textMuted}
          size={20}
        />
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

      {ROWS.map((row) => (
        <Pressable
          key={row.id}
          onPress={() => onOpenRow?.(row.id)}
          style={[styles.settingRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}
        >
          <SymbolView name={row.icon} tintColor={theme.colors.textMuted} size={20} />
          <Text style={[styles.label, { flex: 1, fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
            {row.label}
          </Text>
          {row.kind === 'switch' ? (
            <Switch
              value={row.value}
              trackColor={{ false: theme.colors.hairline, true: `${theme.colors.ice}55` }}
              thumbColor={theme.colors.bone}
            />
          ) : (
            <SymbolView
              name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
              tintColor={theme.colors.textMuted}
              size={16}
            />
          )}
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  label: {
    fontSize: 15,
  },
});
