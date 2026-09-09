import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { TabBarIcon, useScorevaTheme } from '@/components/scoreva';

export default function TabLayout() {
  const theme = useScorevaTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.hairline,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.caption.fontFamily,
          fontSize: 10,
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Live',
          tabBarIcon: ({ focused }) => <TabBarIcon tab="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <TabBarIcon tab="explore" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="following"
        options={{
          title: 'Following',
          tabBarIcon: ({ focused }) => <TabBarIcon tab="following" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon tab="search" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ focused }) => <TabBarIcon tab="settings" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
