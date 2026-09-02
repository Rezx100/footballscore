import type { Team } from "@/lib/types";

export function Crest({ team, size = 28 }: { team: Team; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full text-[10px] font-bold tracking-tight text-white ring-1 ring-black/10"
      style={{
        width: size,
        height: size,
        background: team.color,
        fontSize: size < 26 ? 8 : 10,
      }}
      aria-hidden="true"
    >
      {team.short.slice(0, 3)}
    </span>
  );
}
