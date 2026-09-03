import Link from "next/link";
import { Crest } from "@/components/matches/crest";
import { teamHref } from "@/lib/hrefs";
import type { StandingTable } from "@/lib/types";

export function MiniTable({
  table,
  highlight,
  leagueSlug,
  fullHref,
}: {
  table: StandingTable;
  highlight?: string[];
  leagueSlug?: string;
  fullHref?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <caption className="sr-only">{table.name}</caption>
        <thead>
          <tr className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">
            <th className="px-1 py-2 font-medium">#</th>
            <th className="px-1 py-2 font-medium">Team</th>
            <th className="px-1 py-2 text-right font-medium">PL</th>
            <th className="px-1 py-2 text-right font-medium">W</th>
            <th className="px-1 py-2 text-right font-medium">D</th>
            <th className="px-1 py-2 text-right font-medium">L</th>
            <th className="px-1 py-2 text-right font-medium">GF–GA</th>
            <th className="px-1 py-2 text-right font-medium">GD</th>
            <th className="px-1 py-2 text-right font-medium">PTS</th>
          </tr>
        </thead>
        <tbody>
          {table.entries.map((row) => {
            const hot = highlight?.includes(row.teamId);
            return (
              <tr
                key={row.teamId}
                className={hot ? "bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]" : ""}
              >
                <td className="px-1 py-2 align-middle">
                  <span className="flex items-center gap-1.5">
                    {row.note?.color ? (
                      <span
                        className="h-3 w-0.5 rounded-full"
                        style={{ background: row.note.color }}
                        title={row.note.description}
                      />
                    ) : (
                      <span className="w-0.5" />
                    )}
                    <span className="font-board text-[12px] text-[var(--muted)]">{row.rank}</span>
                  </span>
                </td>
                <td className="px-1 py-2">
                  {leagueSlug ? (
                    <Link href={teamHref(leagueSlug, row.teamId)} className="font-cond flex items-center gap-2 text-[14px]">
                      <Crest team={{ id: row.teamId, name: row.teamName, short: row.teamShort, color: "#6B7280", logo: row.logo }} size={18} />
                      <span className="truncate">{row.teamName}</span>
                    </Link>
                  ) : (
                    <span className="font-cond flex items-center gap-2 text-[14px]">
                      <Crest team={{ id: row.teamId, name: row.teamName, short: row.teamShort, color: "#6B7280", logo: row.logo }} size={18} />
                      <span className="truncate">{row.teamName}</span>
                    </span>
                  )}
                </td>
                <td className="font-board px-1 py-2 text-right text-[12px]">{row.played}</td>
                <td className="font-board px-1 py-2 text-right text-[12px]">{row.wins}</td>
                <td className="font-board px-1 py-2 text-right text-[12px]">{row.draws}</td>
                <td className="font-board px-1 py-2 text-right text-[12px]">{row.losses}</td>
                <td className="font-board px-1 py-2 text-right text-[12px]">{row.gf}–{row.ga}</td>
                <td className="font-board px-1 py-2 text-right text-[12px]">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                <td className="font-board px-1 py-2 text-right text-[13px]">{row.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {table.entries.some((row) => row.note?.description) ? (
        <ul className="mt-3 space-y-1">
          {[...new Map(table.entries.filter((row) => row.note).map((row) => [row.note!.description, row.note!])).values()].map((note) => (
            <li key={note.description} className="flex items-center gap-2 font-board text-[10px] text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full" style={{ background: note.color || "var(--muted)" }} />
              {note.description}
            </li>
          ))}
        </ul>
      ) : null}
      {fullHref ? (
        <Link href={fullHref} className="mt-3 inline-block font-board text-[11px] tracking-[0.06em] text-[var(--live)]">
          Full table
        </Link>
      ) : null}
    </div>
  );
}
