import Link from "next/link";
import { Lineup } from "@/components/match/lineup";
import { Place } from "@/components/match/place";
import { SeriesAndForm } from "@/components/match/series";
import { StickyScoreboard } from "@/components/match/sticky-scoreboard";
import { Timeline } from "@/components/match/timeline";
import { NewsCard } from "@/components/news/news-card";
import { DualStats } from "@/components/ui/dual-stats";
import { MiniTable } from "@/components/ui/mini-table";
import { Module, SegmentTabs } from "@/components/ui/blocks";
import { SiteLockup } from "@/components/shell/page-shell";
import { leagueHref, matchHref } from "@/lib/hrefs";
import type { MatchDetail } from "@/lib/espn/map-summary";

const PANELS = ["timeline", "lineup", "numbers", "table", "series"] as const;
export type MatchPanel = (typeof PANELS)[number];

export function parsePanel(value: string | undefined): MatchPanel {
  return PANELS.includes(value as MatchPanel) ? (value as MatchPanel) : "timeline";
}

export function MatchView({
  detail,
  panel,
  side,
}: {
  detail: MatchDetail;
  panel: MatchPanel;
  side?: "home" | "away";
}) {
  const match = detail.match;
  const available: { value: MatchPanel; label: string }[] = [{ value: "timeline", label: "Timeline" }];
  if (detail.lineups.length) available.push({ value: "lineup", label: "Lineup" });
  if (detail.stats.length) available.push({ value: "numbers", label: "Numbers" });
  if (detail.tables.length) available.push({ value: "table", label: "Table" });
  if (detail.series || detail.form.length) available.push({ value: "series", label: "Series" });

  const active = available.some((item) => item.value === panel) ? panel : "timeline";
  const lineupSide = detail.lineups.find((item) => item.homeAway === (side ?? "home")) ?? detail.lineups[0];
  const news = [...(detail.recap ? [detail.recap] : []), ...detail.news.filter((item) => item.id !== detail.recap?.id)];

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,720px)_minmax(280px,1fr)]">
      <div>
        <div className="flex items-center justify-between px-4 pt-4">
          <SiteLockup />
        </div>
        <StickyScoreboard match={match} competition={detail.competition} round={detail.round} />
        {detail.story ? (
          <p className="border-b border-[var(--line)] px-4 py-3 text-[14px] text-[var(--muted)]">{detail.story}</p>
        ) : null}
        <SegmentTabs
          value={active}
          items={available.map((item) => ({
            value: item.value,
            label: item.label,
            href: `${matchHref(match.id, match.leagueId)}&panel=${item.value}`,
          }))}
        />

        {active === "timeline" ? (
          <Module title="Timeline">
            <Timeline items={detail.timeline} />
          </Module>
        ) : null}

        {active === "lineup" ? (
          <Module title="Lineup">
            {detail.lineups.length === 0 ? (
              <p className="text-[14px] text-[var(--muted)]">Lineups not available yet.</p>
            ) : (
              <>
                <div className="mb-4 flex gap-2">
                  {detail.lineups.map((item) => (
                    <Link
                      key={item.homeAway}
                      href={`${matchHref(match.id, match.leagueId)}&panel=lineup&side=${item.homeAway}`}
                      className={`font-board rounded-full px-3 py-1.5 text-[11px] ${
                        lineupSide?.homeAway === item.homeAway ? "bg-[var(--elev)] text-[var(--ink)]" : "text-[var(--muted)]"
                      }`}
                    >
                      {item.team.name}
                    </Link>
                  ))}
                </div>
                {lineupSide ? <Lineup side={lineupSide} league={match.leagueId} /> : null}
              </>
            )}
          </Module>
        ) : null}

        {active === "numbers" && detail.stats.length ? (
          <Module title="Numbers">
            <DualStats stats={detail.stats} homeColor={match.home.color} awayColor={match.away.color} />
          </Module>
        ) : null}

        {active === "table" && detail.tables.length ? (
          <Module title="Table">
            {detail.tables.map((table) => (
              <MiniTable
                key={table.name}
                table={table}
                highlight={[match.home.id, match.away.id]}
                leagueSlug={match.leagueId}
                fullHref={leagueHref(match.leagueId, "table")}
              />
            ))}
          </Module>
        ) : null}

        {active === "series" ? (
          <Module title="Series & form">
            <SeriesAndForm series={detail.series} form={detail.form} />
          </Module>
        ) : null}

        {detail.venue ? (
          <Module title="Place">
            <Place venue={detail.venue} />
          </Module>
        ) : null}

        {news.length ? (
          <Module title="Match news">
            <div className="space-y-2">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </Module>
        ) : null}
      </div>
      <aside className="hidden border-l border-[var(--line)] lg:block">
        {detail.tables[0] ? (
          <Module title="Table">
            <MiniTable
              table={{
                ...detail.tables[0],
                entries: detail.tables[0].entries.filter((row) => {
                  const ids = [match.home.id, match.away.id];
                  const ranks = detail.tables[0].entries.filter((entry) => ids.includes(entry.teamId)).map((entry) => entry.rank);
                  const min = Math.min(...ranks, 4) - 1;
                  const max = Math.max(...ranks, 4) + 1;
                  return row.rank >= min && row.rank <= max;
                }),
              }}
              highlight={[match.home.id, match.away.id]}
              leagueSlug={match.leagueId}
              fullHref={leagueHref(match.leagueId, "table")}
            />
          </Module>
        ) : null}
      </aside>
    </div>
  );
}
