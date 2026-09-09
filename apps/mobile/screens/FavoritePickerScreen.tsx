import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Crest, Screen, useScorevaTheme, Wordmark } from '@/components/scoreva';
import { COMPETITIONS, TEAMS } from '@/lib/demo';
import type { Competition, Team } from '@/lib/types';

export interface FavoritePickerScreenProps {
  initialTeamIds?: string[];
  initialCompetitionIds?: string[];
  onContinue: (selected: { teams: string[]; competitions: string[] }) => void;
}

const ALL_TEAMS: Team[] = Object.values(TEAMS);

export function FavoritePickerScreen({
  initialTeamIds = [],
  initialCompetitionIds = ['pl', 'ucl'],
  onContinue,
}: FavoritePickerScreenProps) {
  const theme = useScorevaTheme();
  const [teams, setTeams] = useState<Set<string>>(new Set(initialTeamIds));
  const [competitions, setCompetitions] = useState<Set<string>>(new Set(initialCompetitionIds));

  const toggle = (set: Set<string>, id: string, write: (next: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    write(next);
  };

  return (
    <Screen scroll={false} noPadding>
      <View style={styles.header}>
        <Wordmark size={20} />
        <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
          Follow the night
        </Text>
        <Text style={[styles.subtitle, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted }]}>
          Clubs and competitions you follow light up first. You can skip this.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={[styles.section, { color: theme.colors.textMuted }]}>Competitions</Text>
        <View style={styles.chips}>
          {COMPETITIONS.map((c: Competition) => {
            const on = competitions.has(c.id);
            return (
              <Pressable
                key={c.id}
                onPress={() => toggle(competitions, c.id, setCompetitions)}
                style={[styles.chip, { borderColor: on ? theme.colors.volt : theme.colors.hairline, backgroundColor: theme.colors.card }]}
              >
                <Text style={[styles.chipText, { color: on ? theme.colors.volt : theme.colors.text }]}>{c.name}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.section, { color: theme.colors.textMuted }]}>Clubs</Text>
        <View style={styles.grid}>
          {ALL_TEAMS.map((item) => {
            const isSelected = teams.has(item.id);
            return (
              <Pressable
                key={item.id}
                onPress={() => toggle(teams, item.id, setTeams)}
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
          })}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => onContinue({ teams: Array.from(teams), competitions: Array.from(competitions) })}
        accessibilityRole="button"
        style={[styles.cta, { borderColor: theme.colors.hairline }]}
      >
        <Text style={[styles.ctaText, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
          {teams.size + competitions.size > 0 ? `Continue (${teams.size} clubs)` : 'Skip for now'}
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
  section: {
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
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
