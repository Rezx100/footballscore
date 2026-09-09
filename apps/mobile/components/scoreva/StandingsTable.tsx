/**
 * StandingsTable — caption header, UI club names, score-weight points column. Followed row
 * = low-alpha volt wash, never a solid volt fill. Qualification zones = 3px rail, never a
 * full row fill.
 */
import { StyleSheet, Text, View } from 'react-native';

import { Crest } from './Crest';
import { useScorevaTheme } from './theme';
import type { Team } from './types';

export interface StandingsRow {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDifference: number;
  points: number;
  followed?: boolean;
  /** Semantic zone rail, e.g. qualification or relegation. */
  zoneColor?: string;
}

export interface StandingsTableProps {
  rows: StandingsRow[];
}

export function StandingsTable({ rows }: StandingsTableProps) {
  const theme = useScorevaTheme();

  return (
    <View style={styles.table}>
      <View style={[styles.headerRow, { borderBottomColor: theme.colors.hairline }]}>
        <Text style={[styles.headCell, styles.pos, { color: theme.colors.textMuted, fontFamily: theme.typography.caption.fontFamily }]}>#</Text>
        <Text style={[styles.headCell, styles.club, { color: theme.colors.textMuted, fontFamily: theme.typography.caption.fontFamily }]}>Club</Text>
        {(['P', 'W', 'D', 'L', 'GD'] as const).map((h) => (
          <Text
            key={h}
            style={[styles.headCell, styles.stat, { color: theme.colors.textMuted, fontFamily: theme.typography.caption.fontFamily }]}
          >
            {h}
          </Text>
        ))}
        <Text style={[styles.headCell, styles.pts, { color: theme.colors.textMuted, fontFamily: theme.typography.caption.fontFamily }]}>Pts</Text>
      </View>

      {rows.map((row) => (
        <View
          key={row.team.id}
          style={[
            styles.row,
            {
              backgroundColor: row.followed ? 'rgba(215, 255, 60, 0.08)' : 'transparent',
              borderBottomColor: theme.colors.hairline,
            },
          ]}
        >
          {row.zoneColor ? (
            <View style={[styles.rail, { backgroundColor: row.zoneColor }]} />
          ) : null}
          <Text
            style={[styles.cell, styles.pos, { color: theme.colors.text, fontFamily: theme.typography.minute.fontFamily }]}
          >
            {row.position}
          </Text>
          <View style={styles.club}>
            <Crest team={row.team} size="sm" tint="wash" />
            <Text
              style={[styles.clubName, { color: theme.colors.text, fontFamily: theme.typography.ui.fontFamily }]}
              numberOfLines={1}
            >
              {row.team.name}
            </Text>
          </View>
          <Text style={[styles.cell, styles.stat, { color: theme.colors.textMuted, fontFamily: theme.typography.minute.fontFamily }]}>{row.played}</Text>
          <Text style={[styles.cell, styles.stat, { color: theme.colors.textMuted, fontFamily: theme.typography.minute.fontFamily }]}>{row.won}</Text>
          <Text style={[styles.cell, styles.stat, { color: theme.colors.textMuted, fontFamily: theme.typography.minute.fontFamily }]}>{row.drawn}</Text>
          <Text style={[styles.cell, styles.stat, { color: theme.colors.textMuted, fontFamily: theme.typography.minute.fontFamily }]}>{row.lost}</Text>
          <Text style={[styles.cell, styles.stat, { color: theme.colors.textMuted, fontFamily: theme.typography.minute.fontFamily }]}>
            {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
          </Text>
          <Text style={[styles.cell, styles.pts, { color: theme.colors.text, fontFamily: theme.typography.score.fontFamily }]}>
            {row.points}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    gap: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  headCell: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    position: 'relative',
  },
  rail: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  cell: {
    fontSize: 13,
    textAlign: 'center',
  },
  pos: {
    width: 24,
  },
  club: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clubName: {
    fontSize: 14,
    flexShrink: 1,
  },
  stat: {
    width: 28,
  },
  pts: {
    width: 32,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
});
