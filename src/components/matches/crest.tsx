import { RemoteMark } from "@/components/matches/remote-mark";
import type { Team } from "@/lib/types";

function initialsOn(color: string): string {
  const hex = color.replace("#", "");
  if (hex.length !== 6) return "#ffffff";
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 160 ? "#111111" : "#ffffff";
}

export function Crest({ team, size = 28 }: { team: Team; size?: number }) {
  const initials = (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold tracking-tight ring-1 ring-black/10"
      style={{
        width: size,
        height: size,
        background: team.color,
        color: initialsOn(team.color),
        fontSize: size < 26 ? 8 : 10,
      }}
      aria-hidden="true"
    >
      {team.short.slice(0, 3)}
    </span>
  );

  return (
    <RemoteMark
      src={team.logo}
      alt=""
      size={size}
      className="inline-block shrink-0 object-contain"
      fallback={initials}
    />
  );
}
