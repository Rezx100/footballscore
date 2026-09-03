import { asArray, asNumber, asString, isRecord } from "@/lib/espn/json";
import type { StandingRow, StandingTable } from "@/lib/types";

function standingStat(stats: unknown[], name: string): number {
  for (const stat of stats) {
    if (isRecord(stat) && asString(stat.name) === name) {
      return asNumber(stat.value) ?? asNumber(stat.displayValue) ?? 0;
    }
  }
  return 0;
}

function teamLogoFrom(entry: Record<string, unknown>, teamId: string): string | undefined {
  if (asString(entry.logo)) return asString(entry.logo);
  const team = isRecord(entry.team) ? entry.team : undefined;
  if (team && asString(team.logo)) return asString(team.logo);
  const logo = team ? asArray(team.logos).find(isRecord) : undefined;
  if (logo && asString(logo.href)) return asString(logo.href);
  return `https://a.espncdn.com/i/teamlogos/soccer/500/${teamId}.png`;
}

export function mapStandingEntries(entries: unknown[], tableName: string): StandingTable | null {
  const rows: StandingRow[] = [];
  for (const entry of entries) {
    if (!isRecord(entry)) continue;
    const stats = asArray(entry.stats);
    const teamField = entry.team;
    const teamId = asString(entry.id) ?? (isRecord(teamField) ? asString(teamField.id) : undefined);
    const teamName =
      (isRecord(teamField) ? asString(teamField.displayName) ?? asString(teamField.name) : undefined) ??
      (typeof teamField === "string" ? teamField : undefined);
    if (!teamId || !teamName) continue;
    const teamShort = isRecord(teamField)
      ? (asString(teamField.abbreviation) ?? teamName.slice(0, 3).toUpperCase())
      : teamName.slice(0, 3).toUpperCase();
    const note = isRecord(entry.note)
      ? { color: asString(entry.note.color) ?? "", description: asString(entry.note.description) ?? "" }
      : undefined;
    rows.push({
      teamId,
      teamName,
      teamShort,
      logo: teamLogoFrom(entry, teamId),
      rank: standingStat(stats, "rank") || rows.length + 1,
      played: standingStat(stats, "gamesPlayed"),
      wins: standingStat(stats, "wins"),
      draws: standingStat(stats, "ties"),
      losses: standingStat(stats, "losses"),
      gf: standingStat(stats, "pointsFor"),
      ga: standingStat(stats, "pointsAgainst"),
      gd: standingStat(stats, "pointDifferential"),
      pts: standingStat(stats, "points"),
      note: note?.description ? note : undefined,
    });
  }
  if (!rows.length) return null;
  return { name: tableName, entries: rows };
}

export function mapV2Standings(raw: unknown): StandingTable[] {
  if (!isRecord(raw)) return [];
  const tables: StandingTable[] = [];
  const children = asArray(raw.children).filter(isRecord);
  const blocks = children.length
    ? children
    : isRecord(raw.standings)
      ? [{ name: asString(raw.name) ?? "Table", standings: raw.standings }]
      : [];
  for (const block of blocks) {
    const name = asString(block.name) ?? asString(block.abbreviation) ?? "Table";
    const standings = isRecord(block.standings) ? block.standings : undefined;
    const entries = standings ? asArray(standings.entries) : [];
    const table = mapStandingEntries(entries, asString(standings?.displayName) ?? name);
    if (table) tables.push(table);
  }
  return tables;
}
