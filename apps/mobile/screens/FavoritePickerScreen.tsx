import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Crest, Screen, useScorevaTheme, Wordmark, type Team } from '@/components/scoreva';

import { TEAMS } from './mocks';

const ALL_TEAMS: Team[] = Object.values(TEAMS);

export interface FavoritePickerScreenProps {
  onContinue: (selectedIds: string[]) => void;
}

export function FavoritePickerScreen({ onContinue }: FavoritePickerScreenProps) {
  const theme = useScorevaTheme();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Screen scroll={false}>
      <View style={styles.header}>
        <Wordmark size={20} />
        <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
          Pick your clubs
        </Text>
        <Text style={[styles.subtitle, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted }]}>
          Followed clubs light up first on your home feed.
        </Text>
      </View>

      <FlatList
        data={ALL_TEAMS}
        keyExtractor={(t) => t.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = selected.has(item.id);
          return (
            <Pressable
              onPress={() => toggle(item.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
              style={[
                styles.tile,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: isSelected ? theme.colors.volt : theme.colors.hairline,
                },
              ]}
            >
              <Crest team={item} size="md" tint="wash" />
              <Text style={[styles.name, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
                {item.name}
              </Text>
              {isSelected ? (
                <SymbolView
                  name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
                  tintColor={theme.colors.volt}
                  size={18}
                  style={styles.check}
                />
              ) : null}
            </Pressable>
          );
        }}
      />

      <Pressable
        onPress={() => onContinue(Array.from(selected))}
        accessibilityRole="button"
        style={[styles.cta, { borderColor: theme.colors.hairline }]}
      >
        <Text style={[styles.ctaText, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
          {selected.size > 0 ? `Continue (${selected.size})` : 'Skip for now'}
        </Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  row: {
    gap: 12,
  },
  tile: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  check: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  cta: {
    margin: 16,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
