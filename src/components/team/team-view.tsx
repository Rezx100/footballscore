import { FollowButton } from "@/components/follow/follow-button";
import { MatchRow } from "@/components/matches/match-row";
import { Crest } from "@/components/matches/crest";
import { NewsCard } from "@/components/news/news-card";
import { FormPills, Module } from "@/components/ui/blocks";
import { MiniTable } from "@/components/ui/mini-table";
import { SiteLockup } from "@/components/shell/page-shell";
import { playerHref, leagueHref } from "@/lib/hrefs";
import type { TeamPage } from "@/lib/espn/team-page";
import { DEFAULT_MARK } from "@/lib/brand";
import type { MatchesQuery } from "@/lib/matches-query";
import Link from "next/link";

const dummyQuery: MatchesQuery = {
  day: "today",
  hide: false,
  q: "",
  tab: "matches",
  match: null,
  search: false,
  mark: DEFAULT_MARK,
};

const GROUPS = ["Goalkeepers", "Defenders", "Midfielders", "Forwards", "Squad"];

export function TeamView({ page, league }: { page: TeamPage; league: string }) {
  const club = page.profile.club;
  const grouped = GROUPS.map((group) => ({
    group,
    players: page.squad.filter((player) => player.positionGroup === group),
  })).filter((block) => block.players.length);
  return (
    <>
      <header className="border-b border-[var(--line)]">
        <div className="flex items-center justify-between px-4 pt-4">
          <SiteLockup />
          <FollowButton league={league} teamId={club.id} />
        </div>
        <div className="flex items-center gap-3 px-4 py-4" style={{ boxShadow: `inset 3px 0 0 ${club.color}` }}>
          <Crest team={club} size={48} />
          <div>
            <h1 className="font-cond text-[22px] leading-none">{club.name}</h1>
            <p className="font-board mt-1 text-[11px] text-[var(--muted)]">
              {[page.profile.standingSummary, page.profile.record].filter(Boolean).join(" · ")}
            </p>
            <Link href={leagueHref(league)} className="font-board mt-1 inline-block text-[10px] tracking-[0.08em] text-[var(--live)]">
              League
            </Link>
          </div>
        </div>
      </header>
      <div className="pb-10">
        {page.next ? (
          <Module title="Next match">
            <MatchRow match={page.next} selected={false} query={dummyQuery} />
          </Module>
        ) : (
          <Module title="Next match">
            <p className="text-[14px] text-[var(--muted)]">No upcoming fixture in this feed.</p>
          </Module>
        )}
        {page.form.length ? (
          <Module title="Form">
            <FormPills results={page.form} />
          </Module>
        ) : null}
        {page.table ? (
          <Module title="Table">
            <MiniTable
              table={{
                ...page.table,
                entries: page.table.entries.filter((row) => Math.abs(row.rank - (page.table!.entries.find((item) => item.teamId === club.id)?.rank ?? row.rank)) <= 3),
              }}
              highlight={[club.id]}
              leagueSlug={league}
              fullHref={leagueHref(league, "table")}
            />
          </Module>
        ) : null}
        {page.upcoming.length ? (
          <Module title="Upcoming">
            <div className="grid gap-2">
              {page.upcoming.map((match) => (
                <MatchRow key={match.id} match={match} selected={false} query={dummyQuery} />
              ))}
            </div>
          </Module>
        ) : null}
        {page.recent.length ? (
          <Module title="Recent">
            <div className="grid gap-2">
              {page.recent.map((match) => (
                <MatchRow key={match.id} match={match} selected={false} query={dummyQuery} />
              ))}
            </div>
          </Module>
        ) : null}
        {grouped.length ? (
          <Module title="Squad" caption={page.coach ? `Coach ${page.coach}` : undefined}>
            {grouped.map((block) => (
              <div key={block.group} className="mb-4">
                <p className="font-board mb-2 text-[10px] tracking-[0.08em] text-[var(--muted)]">{block.group}</p>
                <ul className="space-y-1">
                  {block.players.map((player) => (
                    <li key={player.id}>
                      <Link href={playerHref(player.id, league, club.id)} className="font-cond flex gap-3 text-[14px]">
                        <span className="font-board w-6 text-[12px] text-[var(--muted)]">{player.jersey ?? ""}</span>
                        <span className="flex-1">{player.name}</span>
                        <span className="text-[12px] text-[var(--muted)]">{player.position}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Module>
        ) : (
          <Module title="Squad">
            <p className="text-[14px] text-[var(--muted)]">Squad not available yet.</p>
          </Module>
        )}
        {page.injuries.length ? (
          <Module title="Injuries">
            <ul className="space-y-2">
              {page.injuries.map((row) => (
                <li key={row.id} className="text-[14px]">
                  <span className="font-cond">{row.name}</span>
                  {row.status ? <span className="font-board ml-2 text-[11px] text-[var(--muted)]">{row.status}</span> : null}
                  {row.detail ? <p className="text-[13px] text-[var(--muted)]">{row.detail}</p> : null}
                </li>
              ))}
            </ul>
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
      </div>
    </>
  );
}
