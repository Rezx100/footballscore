import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Crest, EmptyState, Screen, useScorevaTheme } from '@/components/scoreva';
import { searchCatalog } from '@/lib/demo';
import type { SearchHit } from '@/lib/types';

export interface SearchScreenProps {
  onSelect?: (hit: SearchHit) => void;
  searchFn?: (query: string) => SearchHit[];
}

export function SearchScreen({ onSelect, searchFn = searchCatalog }: SearchScreenProps) {
  const theme = useScorevaTheme();
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchFn(query), [query, searchFn]);

  return (
    <Screen scroll={false}>
      <View style={[styles.field, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
        <SymbolView
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          tintColor={theme.colors.textMuted}
          size={18}
        />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search clubs, competitions, players"
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.text }]}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {query === '' ? (
        <EmptyState title="Search the night" body="Find a club, competition, player or match." />
      ) : results.length === 0 ? (
        <EmptyState title="No matches" body={`Nothing found for “${query}”.`} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.kind}:${item.id}`}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSelect?.(item)}
              style={[styles.row, { borderBottomColor: theme.colors.hairline }]}
            >
              {item.kind === 'team' ? (
                <Crest team={{ name: item.title, short: item.short ?? item.title.slice(0, 3), color: item.color ?? '#8B93A1' }} size="sm" tint="wash" />
              ) : (
                <View style={[styles.kind, { borderColor: theme.colors.hairline }]}>
                  <Text style={[styles.kindText, { color: theme.colors.textMuted }]}>{item.kind.slice(0, 1).toUpperCase()}</Text>
                </View>
              )}
              <View style={styles.copy}>
                <Text style={[styles.name, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.sub, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
                  {item.subtitle}
                </Text>
              </View>
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
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
  },
  sub: {
    fontSize: 12,
  },
  kind: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kindText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
