import Link from "next/link";
import { Headshot } from "@/components/matches/headshot";
import { playerHref } from "@/lib/hrefs";
import type { LineupSide } from "@/lib/types";

function rowsFromFormation(formation: string | undefined, starters: LineupSide["players"]) {
  if (!formation || !starters.length) return null;
  const parts = formation.split("-").map((n) => Number(n)).filter((n) => Number.isFinite(n) && n > 0);
  if (!parts.length) return null;
  const gk = starters.find((player) => player.position === "G") ?? starters.find((player) => player.formationPlace === 1);
  const rest = starters.filter((player) => player.id !== gk?.id).sort((a, b) => (a.formationPlace ?? 99) - (b.formationPlace ?? 99));
  const rows: LineupSide["players"][] = [];
  let cursor = 0;
  for (const count of parts) {
    rows.push(rest.slice(cursor, cursor + count));
    cursor += count;
  }
  if (gk) rows.unshift([gk]);
  return rows;
}

export function Lineup({
  side,
  league,
}: {
  side: LineupSide;
  league: string;
}) {
  const starters = side.players.filter((player) => player.starter);
  const bench = side.players.filter((player) => !player.starter);
  const rows = rowsFromFormation(side.formation, starters);

  return (
    <div>
      {side.formation ? (
        <p className="font-board mb-3 text-[11px] tracking-[0.08em] text-[var(--muted)]">{side.formation}</p>
      ) : null}
      {rows ? (
        <div className="pitch mb-4 rounded-[12px] px-2 py-4">
          {rows.map((row, index) => (
            <div key={index} className="mb-3 flex justify-evenly gap-1">
              {row.map((player) => (
                <Link
                  key={player.id}
                  href={playerHref(player.id, league, side.team.id)}
                  className="flex min-w-0 flex-col items-center"
                >
                  <Headshot src={player.headshot} name={player.name} size={28} />
                  <span className="font-board mt-1 text-[10px] text-[var(--muted)]">{player.jersey ?? "–"}</span>
                  <span className="font-cond max-w-[72px] truncate text-center text-[11px]">{player.name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <ul className="mb-4 space-y-1">
          {starters.map((player) => (
            <li key={player.id}>
              <Link href={playerHref(player.id, league, side.team.id)} className="font-cond flex items-center gap-2 text-[14px]">
                <Headshot src={player.headshot} name={player.name} size={24} />
                <span className="font-board w-6 text-[12px] text-[var(--muted)]">{player.jersey ?? ""}</span>
                {player.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {bench.length ? (
        <div>
          <p className="font-board mb-2 text-[10px] tracking-[0.08em] text-[var(--muted)]">Bench</p>
          <ul className="space-y-1">
            {bench.map((player) => (
              <li key={player.id}>
                <Link href={playerHref(player.id, league, side.team.id)} className="font-cond flex items-center gap-2 text-[13px] text-[color-mix(in_srgb,var(--ink)_80%,transparent)]">
                  <Headshot src={player.headshot} name={player.name} size={24} />
                  <span className="font-board w-6 text-[12px] text-[var(--muted)]">{player.jersey ?? ""}</span>
                  {player.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
