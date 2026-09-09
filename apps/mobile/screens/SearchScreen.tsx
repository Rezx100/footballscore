import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Crest, EmptyState, Screen, useScorevaTheme } from '@/components/scoreva';
import type { Team } from '@/components/scoreva';

import { TEAMS } from './mocks';

export interface SearchScreenProps {
  onSelectTeam?: (team: Team) => void;
}

export function SearchScreen({ onSelectTeam }: SearchScreenProps) {
  const theme = useScorevaTheme();
  const [query, setQuery] = useState('');
  const all = useMemo(() => Object.values(TEAMS), []);
  const results = query
    ? all.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <Screen scroll={false}>
      <View
        style={[styles.field, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}
      >
        <SymbolView
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          tintColor={theme.colors.textMuted}
          size={18}
        />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search clubs, competitions"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.text }]}
        />
      </View>

      {query === '' ? (
        <EmptyState title="Search the night" body="Find a club or competition to follow." />
      ) : results.length === 0 ? (
        <EmptyState title="No matches" body={`Nothing found for "${query}".`} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(t) => t.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSelectTeam?.(item)}
              style={[styles.row, { borderBottomColor: theme.colors.hairline }]}
            >
              <Crest team={item} size="sm" tint="wash" />
              <Text style={[styles.name, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  list: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 15,
  },
});
