import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Crest, Screen, ScoreCard, StandingsTable, useScorevaTheme } from '@/components/scoreva';
import type { Team } from '@/components/scoreva';

import { MOCK_MATCHES, STANDINGS, TEAMS } from './mocks';

const FORM: ('W' | 'D' | 'L')[] = ['W', 'W', 'D', 'L', 'W'];

export interface TeamScreenProps {
  team?: Team;
  followed?: boolean;
  onToggleFollow?: () => void;
}

function formColor(result: 'W' | 'D' | 'L', theme: ReturnType<typeof useScorevaTheme>) {
  if (result === 'W') return theme.colors.volt;
  if (result === 'L') return theme.colors.cardRed;
  return theme.colors.mute;
}

export function TeamScreen({ team = TEAMS.arsenal, followed, onToggleFollow }: TeamScreenProps) {
  const theme = useScorevaTheme();
  const nextMatch = MOCK_MATCHES.find((m) => m.status === 'ns') ?? MOCK_MATCHES[0]!;
  const miniTable = STANDINGS.filter((r) => Math.abs(r.position - (STANDINGS.find((s) => s.team.id === team.id)?.position ?? 1)) <= 1);

  return (
    <Screen
      header={
        <View style={[styles.rail, { backgroundColor: team.color }]} />
      }
    >
      <View style={styles.identity}>
        <Crest team={team} size="lg" tint="wash" />
        <Text style={[styles.name, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
          {team.name}
        </Text>
        <Pressable
          onPress={onToggleFollow}
          accessibilityRole="button"
          style={[styles.followBtn, { borderColor: theme.colors.hairline }]}
        >
          <Text style={[styles.followText, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
            {followed ? 'Following' : 'Follow'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.formRow}>
        {FORM.map((r, i) => (
          <View
            key={i}
            style={[styles.formChip, { backgroundColor: `${formColor(r, theme)}22` }]}
          >
            <Text style={[styles.formText, { fontFamily: theme.typography.ui.fontFamily, color: formColor(r, theme) }]}>
              {r}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Next match
      </Text>
      <ScoreCard match={nextMatch} />

      <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Table
      </Text>
      <StandingsTable rows={miniTable} />

      <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Squad
      </Text>
      {['Raya', 'Saliba', 'Rice', 'Ødegaard', 'Saka'].map((name, i) => (
        <View key={name} style={[styles.squadRow, { borderBottomColor: theme.colors.hairline }]}>
          <View style={[styles.squadNumber, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
            <Text style={[styles.squadNumberText, { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.text }]}>
              {i + 1}
            </Text>
          </View>
          <Text style={[styles.squadName, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
            {name}
          </Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  rail: {
    height: 3,
  },
  identity: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  followBtn: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  followText: {
    fontSize: 13,
    fontWeight: '600',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  formChip: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formText: {
    fontSize: 13,
    fontWeight: '700',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
  squadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  squadNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squadNumberText: {
    fontSize: 12,
    fontWeight: '600',
  },
  squadName: {
    fontSize: 15,
  },
});
