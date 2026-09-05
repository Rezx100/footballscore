import { FollowButton } from "@/components/follow/follow-button";
import { MatchRow } from "@/components/matches/match-row";
import { NewsCard } from "@/components/news/news-card";
import { UpcomingFixtureCard, PlayerRow } from "@/components/scory/cards";
import { TeamDetailHeader } from "@/components/scory/headers";
import { EmptyState, InfoRow, StatRow, StatTile } from "@/components/scory/primitives";
import { FormPills, Module } from "@/components/ui/blocks";
import { MiniTable } from "@/components/ui/mini-table";
import { playerHref, leagueHref, teamHref } from "@/lib/hrefs";
import { regionForSlug } from "@/lib/espn/leagues";
import type { TeamPage } from "@/lib/espn/team-page";
import { DEFAULT_MATCHES_QUERY } from "@/lib/matches-query";
import Link from "next/link";

const GROUPS = ["Goalkeepers", "Defenders", "Midfielders", "Forwards", "Squad"];

export const TEAM_TABS = ["general", "squad", "matches", "stats", "transfers"] as const;
export type TeamTab = (typeof TEAM_TABS)[number];

export function parseTeamTab(value: string | undefined): TeamTab {
  return TEAM_TABS.includes(value as TeamTab) ? (value as TeamTab) : "general";
}

export function TeamView({ page, league, tab }: { page: TeamPage; league: string; tab: TeamTab }) {
  const club = page.profile.club;
  const grouped = GROUPS.map((group) => ({
    group,
    players: page.squad.filter((player) => player.positionGroup === group),
  })).filter((block) => block.players.length);
  const row = page.table?.entries.find((entry) => entry.teamId === club.id);
  const ages = page.squad.map((player) => player.age).filter((age): age is number => age != null);
  const avgAge = ages.length ? Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length) : null;
  const winRate = row && row.played > 0 ? `${Math.round((row.wins / row.played) * 100)}%` : null;
  const country = regionForSlug(league).country;
  const tiles = [
    row ? { label: "Played", value: String(row.played) } : null,
    row ? { label: "Wins", value: String(row.wins) } : null,
    row ? { label: "Points", value: String(row.pts) } : null,
    winRate ? { label: "Win rate", value: winRate } : avgAge != null ? { label: "Avg age", value: String(avgAge) } : null,
  ].filter((tile): tile is { label: string; value: string } => Boolean(tile));

  const tabs = TEAM_TABS.map((value) => ({
    value,
    label: value === "transfers" ? "Transfer" : value[0]!.toUpperCase() + value.slice(1),
    href: teamHref(league, club.id, value),
  }));

  return (
    <>
      <TeamDetailHeader
        club={club}
        league={league}
        country={country}
        players={page.squad.length || undefined}
        tabs={tabs}
        tab={tab}
      />
      <div className="pb-10">
        {tab === "general" ? (
          <>
            {page.next ? (
              <Module title="Upcoming Match">
                <UpcomingFixtureCard match={page.next} />
              </Module>
            ) : (
              <Module title="Upcoming Match">
                <EmptyState title="No upcoming fixture" body="ESPN has no next match for this club in the feed." />
              </Module>
            )}
            {tiles.length ? (
              <div className="grid grid-cols-2 gap-2 px-4 pb-2">
                {tiles.map((tile) => (
                  <StatTile key={tile.label} label={tile.label} value={tile.value} />
                ))}
              </div>
            ) : null}
            <div className="px-4">
              {page.coach ? <InfoRow label="Coach" value={page.coach} /> : null}
              {page.profile.record ? <InfoRow label="Record" value={page.profile.record} /> : null}
              {page.profile.standingSummary ? <InfoRow label="Standing" value={page.profile.standingSummary} /> : null}
              <InfoRow label="League" value={page.table?.name ?? league} />
            </div>
            {page.form.length ? (
              <Module title="Form">
                <FormPills results={page.form} />
              </Module>
            ) : null}
            {page.news.length ? (
              <Module title="News">
                <div className="space-y-2">
                  {page.news.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              </Module>
            ) : null}
          </>
        ) : null}

        {tab === "squad" ? (
          <div className="space-y-4 px-4 pt-4">
            {grouped.length ? (
              grouped.map((block) => (
                <section key={block.group}>
                  <p className="mb-2 text-[12px] text-[var(--scory-text-secondary)]">{block.group}</p>
                  <div className="space-y-2">
                    {block.players.map((player) => (
                      <PlayerRow key={player.id} player={player} league={league} teamId={club.id} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <EmptyState title="Squad not available" body="ESPN did not return a roster for this club." />
            )}
            {page.injuries.length ? (
              <section>
                <p className="mb-2 text-[12px] text-[var(--scory-text-secondary)]">Injuries</p>
                <ul className="space-y-2">
                  {page.injuries.map((row) => (
                    <li key={row.id} className="scory-stat-row">
                      <span>
                        <Link href={playerHref(row.id, league, club.id)} className="text-[14px] font-medium">
                          {row.name}
                        </Link>
                        {row.detail ? <p className="text-[12px] text-[var(--muted)]">{row.detail}</p> : null}
                      </span>
                      <span className="text-[12px] text-[var(--scory-text-secondary)]">{row.status ?? ""}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}

        {tab === "matches" ? (
          <div className="px-4 pt-4">
            {page.next || page.upcoming.length || page.recent.length ? (
              <div className="grid gap-2">
                {page.next ? <MatchRow match={page.next} selected={false} query={DEFAULT_MATCHES_QUERY} /> : null}
                {page.upcoming.map((match) => (
                  <MatchRow key={match.id} match={match} selected={false} query={DEFAULT_MATCHES_QUERY} />
                ))}
                {page.recent.map((match) => (
                  <MatchRow key={match.id} match={match} selected={false} query={DEFAULT_MATCHES_QUERY} />
                ))}
              </div>
            ) : (
              <EmptyState title="No fixtures" body="ESPN has no schedule for this club right now." />
            )}
          </div>
        ) : null}

        {tab === "stats" ? (
          <div className="space-y-2 px-4 pt-4">
            {row ? (
              <>
                <StatRow label="Played" value={String(row.played)} />
                <StatRow label="Wins" value={String(row.wins)} />
                <StatRow label="Draws" value={String(row.draws)} />
                <StatRow label="Losses" value={String(row.losses)} />
                <StatRow label="Goals for" value={String(row.gf)} />
                <StatRow label="Goals against" value={String(row.ga)} />
                <StatRow label="Goal difference" value={String(row.gd)} />
                <StatRow label="Points" value={String(row.pts)} />
                {avgAge != null ? <StatRow label="Average age" value={String(avgAge)} /> : null}
              </>
            ) : (
              <EmptyState title="No statistics" body="ESPN did not return a table row we can use for this club." />
            )}
            {page.table ? (
              <Module title="Table">
                <MiniTable
                  table={{
                    ...page.table,
                    entries: page.table.entries.filter(
                      (entry) => Math.abs(entry.rank - (row?.rank ?? entry.rank)) <= 3,
                    ),
                  }}
                  highlight={[club.id]}
                  leagueSlug={league}
                  fullHref={leagueHref(league, "table")}
                />
              </Module>
            ) : null}
          </div>
        ) : null}

        {tab === "transfers" ? (
          <div className="px-4 pt-4">
            <EmptyState
              title="No transfers"
              body="ESPN does not publish a transfer list for this club in the feed we use."
            />
          </div>
        ) : null}

        <div className="px-4 pt-4">
          <FollowButton league={league} teamId={club.id} />
        </div>
      </div>
    </>
  );
}
