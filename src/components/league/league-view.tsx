import Link from "next/link";
import { FollowButton } from "@/components/follow/follow-button";
import { MatchRow } from "@/components/matches/match-row";
import { RemoteMark } from "@/components/matches/remote-mark";
import { NewsCard } from "@/components/news/news-card";
import { MiniTable } from "@/components/ui/mini-table";
import { EmptyState, Module, SegmentTabs } from "@/components/ui/blocks";
import { SiteLockup } from "@/components/shell/page-shell";
import type { LeaguePage } from "@/lib/espn/league-page";
import { leagueHref, teamHref } from "@/lib/hrefs";
import type { MatchesQuery } from "@/lib/matches-query";
import { DEFAULT_MARK } from "@/lib/brand";

const TABS = ["now", "table", "fixtures", "clubs", "news"] as const;
export type LeagueTab = (typeof TABS)[number];

export function parseLeagueTab(value: string | undefined): LeagueTab {
  return TABS.includes(value as LeagueTab) ? (value as LeagueTab) : "now";
}

const dummyQuery: MatchesQuery = {
  day: "today",
  hide: false,
  q: "",
  tab: "matches",
  match: null,
  search: false,
  mark: DEFAULT_MARK,
};

export function LeagueView({
  page,
  tab,
  teamFilter,
}: {
  page: LeaguePage;
  tab: LeagueTab;
  teamFilter?: string;
}) {
  const { meta } = page;
  const items = TABS.filter((value) => {
    if (value === "table") return page.tables.length > 0 || meta.isTournament;
    if (value === "news") return page.news.length > 0;
    if (value === "clubs") return page.clubs.length > 0;
    return true;
  }).map((value) => ({
    value,
    label: value[0]!.toUpperCase() + value.slice(1),
    href: leagueHref(meta.slug, value),
  }));

  const snapshot = page.tables[0]
    ? { ...page.tables[0], entries: page.tables[0].entries.filter((row) => row.rank <= 4) }
    : undefined;

  return (
    <>
      <header className="masthead">
        <div className="flex items-center justify-between gap-4 px-4 pt-4">
          <SiteLockup />
          <FollowButton league={meta.slug} label="Follow league" />
        </div>
        <div className="relative px-4 pb-4 pt-5">
          <span className="league-silo__aura" aria-hidden="true" />
          <div className="relative flex items-center gap-3">
            <span className="league-mark-plate h-12 w-12">
              <RemoteMark
                src={meta.logo}
                alt=""
                size={32}
                className="h-8 w-8 object-contain"
                fallback={<span className="font-board text-[10px] text-[#1c1c1e]">{meta.name.slice(0, 3)}</span>}
              />
            </span>
            <div>
              <h1 className="font-cond text-[22px] leading-none">{meta.name}</h1>
              <p className="font-board mt-1 text-[11px] tracking-[0.06em] text-[var(--muted)]">{meta.country}</p>
            </div>
          </div>
        </div>
        <SegmentTabs value={tab} items={items} />
      </header>

      {tab === "now" ? (
        <div className="pb-10">
          {page.live.length ? (
            <Module title="Live">
              <div className="grid gap-2">
                {page.live.map((match) => (
                  <MatchRow key={match.id} match={match} selected={false} query={dummyQuery} />
                ))}
              </div>
            </Module>
          ) : null}
          <Module title="Today">
            {page.today.length ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {page.today.map((match) => (
                  <MatchRow key={match.id} match={match} selected={false} query={dummyQuery} />
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-[var(--muted)]">No fixtures today. Open Fixtures for the next matchdays.</p>
            )}
          </Module>
          {snapshot ? (
            <Module title="Table" caption="Top 4">
              <MiniTable table={snapshot} leagueSlug={meta.slug} fullHref={leagueHref(meta.slug, "table")} />
            </Module>
          ) : meta.isTournament ? (
            <p className="px-4 pb-6 text-[14px] text-[var(--muted)]">No league table for this competition. See fixtures instead.</p>
          ) : null}
        </div>
      ) : null}

      {tab === "table" ? (
        <div className="pb-10">
          {page.tables.length ? (
            page.tables.map((table) => (
              <Module key={table.name} title={table.name}>
                <MiniTable table={table} leagueSlug={meta.slug} />
              </Module>
            ))
          ) : (
            <EmptyState
              title="No table in this feed"
              body="Cups often have no league table. Fixtures stay available."
              actionHref={leagueHref(meta.slug, "fixtures")}
              actionLabel="See fixtures"
            />
          )}
        </div>
      ) : null}

      {tab === "fixtures" ? (
        <div className="pb-10">
          <div className="flex gap-2 overflow-x-auto px-4 pt-3">
            {page.fixtureDates.slice(0, 24).map((date) => {
              const iso = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
              const href = `${leagueHref(meta.slug, "fixtures")}&date=${iso}${teamFilter ? `&team=${teamFilter}` : ""}`;
              return (
                <Link key={date} href={href} className="font-board shrink-0 rounded-full bg-[var(--elev)] px-3 py-1.5 text-[10px] tracking-[0.06em] text-[var(--muted)]">
                  {iso.slice(5)}
                </Link>
              );
            })}
          </div>
          {page.clubs.length ? (
            <form action={`/league/${encodeURIComponent(meta.slug)}`} method="get" className="px-4 pt-3">
              <input type="hidden" name="tab" value="fixtures" />
              <label className="sr-only" htmlFor="fixture-team">Filter by club</label>
              <select
                id="fixture-team"
                name="team"
                defaultValue={teamFilter ?? ""}
                className="h-10 w-full rounded-[10px] border border-[var(--line)] bg-[var(--elev)] px-3 font-cond text-[14px]"
              >
                <option value="">All clubs</option>
                {page.clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name}
                  </option>
                ))}
              </select>
            </form>
          ) : null}
          <Module title="Fixtures">
            {page.fixtures.length ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {page.fixtures.map((match) => (
                  <MatchRow key={match.id} match={match} selected={false} query={dummyQuery} />
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-[var(--muted)]">No fixtures on this date.</p>
            )}
          </Module>
        </div>
      ) : null}

      {tab === "clubs" ? (
        <div className="grid grid-cols-1 gap-2 px-4 py-4 pb-10 sm:grid-cols-2">
          {page.clubs.map((club) => (
            <Link key={club.id} href={teamHref(meta.slug, club.id)} className="score-card flex items-center gap-3 rounded-[12px] p-3">
              <RemoteMark
                src={club.logo}
                alt=""
                size={28}
                className="h-7 w-7 object-contain"
                fallback={<span className="font-board text-[10px]">{club.short}</span>}
              />
              <span>
                <span className="font-cond block text-[15px]">{club.name}</span>
                <span className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">{club.short}</span>
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      {tab === "news" ? (
        <div className="space-y-2 px-4 py-4 pb-10">
          {page.news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : null}
    </>
  );
}
