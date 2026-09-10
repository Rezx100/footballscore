import Link from "next/link";
import { Lineup } from "@/components/match/lineup";
import { Place } from "@/components/match/place";
import { SeriesAndForm } from "@/components/match/series";
import { Timeline } from "@/components/match/timeline";
import { NewsCard } from "@/components/news/news-card";
import { DualStatBar } from "@/components/scory/cards";
import { MatchHero } from "@/components/scory/headers";
import { EmptyState, UnderlineTabs } from "@/components/scory/primitives";
import { MiniTable } from "@/components/ui/mini-table";
import { Module } from "@/components/ui/blocks";
import { leagueHref, matchHref } from "@/lib/hrefs";
import { isInPlay } from "@/lib/matches";
import type { MatchDetail } from "@/lib/espn/map-summary";

const PANELS = ["form", "timeline", "stats", "lineup", "table", "news"] as const;
export type MatchPanel = (typeof PANELS)[number];

const ALIASES: Record<string, MatchPanel> = {
  series: "form",
  numbers: "stats",
  standing: "table",
};

export function parsePanel(value: string | undefined): MatchPanel | undefined {
  if (!value) return undefined;
  const aliased = ALIASES[value] ?? value;
  return PANELS.includes(aliased as MatchPanel) ? (aliased as MatchPanel) : undefined;
}

export function MatchView({
  detail,
  panel,
  side,
}: {
  detail: MatchDetail;
  panel?: MatchPanel;
  side?: "home" | "away";
}) {
  const match = detail.match;
  const liveOrPlayed = isInPlay(match) || match.status === "ft";
  const available: { value: MatchPanel; label: string }[] = [];
  if (liveOrPlayed) available.push({ value: "timeline", label: "Timeline" });
  else available.push({ value: "form", label: "Form" });
  if (detail.stats.length) available.push({ value: "stats", label: "Stats" });
  if (detail.lineups.length) available.push({ value: "lineup", label: "Line Ups" });
  if (detail.tables.length) available.push({ value: "table", label: "Standing" });
  available.push({ value: "news", label: "News" });

  const fallback = available[0]?.value ?? "form";
  const active = panel && available.some((item) => item.value === panel) ? panel : fallback;
  const lineupSide = detail.lineups.find((item) => item.homeAway === (side ?? "home")) ?? detail.lineups[0];
  const news = [...(detail.recap ? [detail.recap] : []), ...detail.news.filter((item) => item.id !== detail.recap?.id)];

  return (
    <div>
      <MatchHero match={match} competition={detail.competition} round={detail.round} />
      {detail.story ? (
        <p className="px-4 py-3 text-[14px] text-[var(--scory-text-secondary)]">{detail.story}</p>
      ) : null}
      <div className="px-4">
        <UnderlineTabs
          value={active}
          items={available.map((item) => ({
            value: item.value,
            label: item.label,
            href: `${matchHref(match.id, match.leagueId)}&panel=${item.value}`,
          }))}
        />
      </div>

      {active === "timeline" ? (
        <Module title="Timeline">
          {detail.timeline.length ? <Timeline items={detail.timeline} /> : <p className="text-[14px] text-[var(--muted)]">No commentary yet.</p>}
        </Module>
      ) : null}

      {active === "form" ? (
        <Module title="Prematch form">
          {detail.form.length || detail.series ? (
            <SeriesAndForm series={detail.series} form={detail.form} />
          ) : (
            <EmptyState title="No form yet" body="ESPN has not sent recent results for these clubs." />
          )}
        </Module>
      ) : null}

      {active === "stats" ? (
        <Module title="Match stats">
          {detail.stats.length ? (
            <DualStatBar stats={detail.stats} />
          ) : (
            <EmptyState title="No stats" body="ESPN has not published match statistics yet." />
          )}
        </Module>
      ) : null}

      {active === "lineup" ? (
        <Module title="Line ups">
          {detail.lineups.length === 0 ? (
            <EmptyState title="Lineups not available" body="ESPN has not published the squads yet." />
          ) : (
            <>
              <div className="mb-4 flex gap-2">
                {detail.lineups.map((item) => (
                  <Link
                    key={item.homeAway}
                    href={`${matchHref(match.id, match.leagueId)}&panel=lineup&side=${item.homeAway}`}
                    className={`rounded-full px-3 py-1.5 text-[11px] ${
                      lineupSide?.homeAway === item.homeAway
                        ? "bg-[var(--scory-bg-chip)] text-[var(--scory-text-primary)]"
                        : "text-[var(--scory-text-secondary)]"
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

      {active === "table" && detail.tables.length ? (
        <Module title="Standing">
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

      {active === "news" ? (
        <Module title="News">
          {news.length ? (
            <div className="space-y-2">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState title="No match news" body="ESPN did not return headlines for this fixture." />
          )}
        </Module>
      ) : null}

      {detail.venue ? (
        <Module title="Place">
          <Place venue={detail.venue} />
        </Module>
      ) : null}
    </div>
  );
}
