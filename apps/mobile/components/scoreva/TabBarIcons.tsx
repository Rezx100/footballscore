/**
 * TabBarIcons — SF Symbols on iOS via expo-symbols, Material Symbols fallback on
 * Android/web through the same SymbolView component. Active = bone/ink, inactive = mute,
 * no fill background. A tiny volt dot marks unread notifications only.
 */
import { StyleSheet, View } from 'react-native';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { useScorevaTheme } from './theme';

export type ScorevaTabKey = 'home' | 'explore' | 'following' | 'notifications' | 'settings';

type SymbolName = NonNullable<SymbolViewProps['name']>;

const ICONS: Record<ScorevaTabKey, SymbolName> = {
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  explore: { ios: 'list.bullet.rectangle', android: 'leaderboard', web: 'leaderboard' },
  following: { ios: 'star.fill', android: 'star', web: 'star' },
  notifications: { ios: 'bell.fill', android: 'notifications', web: 'notifications' },
  settings: { ios: 'gearshape.fill', android: 'settings', web: 'settings' },
};

export interface TabBarIconProps {
  tab: ScorevaTabKey;
  focused: boolean;
  size?: number;
  /** Show a small volt unread dot, e.g. on the notifications tab. */
  badge?: boolean;
}

export function TabBarIcon({ tab, focused, size = 24, badge }: TabBarIconProps) {
  const theme = useScorevaTheme();
  const color = focused ? theme.colors.text : theme.colors.textMuted;

  return (
    <View style={styles.wrap}>
      <SymbolView name={ICONS[tab]} tintColor={color} size={size} />
      {badge ? <View style={[styles.badge, { backgroundColor: theme.colors.volt }]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
