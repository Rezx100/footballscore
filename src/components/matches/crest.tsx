import { RemoteMark } from "@/components/matches/remote-mark";
import type { Team } from "@/lib/types";

function initialsOn(color: string): string {
  const hex = color.replace("#", "");
  if (hex.length !== 6) return "#F3EDE4";
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 160 ? "#141210" : "#F3EDE4";
}

export function Crest({ team, size = 24 }: { team: Team; size?: number }) {
  const art = Math.round(size * 0.75);
  const initials = (
    <span
      className="inline-flex h-full w-full items-center justify-center text-[8px] font-medium"
      style={{
        background: team.color,
        color: initialsOn(team.color),
        fontSize: size < 22 ? 8 : 10,
      }}
      aria-hidden="true"
    >
      {team.short.slice(0, 3)}
    </span>
  );

  return (
    <span className="crest-disc" style={{ width: size, height: size }}>
      <span className="crest-art">
        <RemoteMark
          src={team.logo}
          alt=""
          size={art}
          className="h-full w-full object-contain"
          fallback={initials}
        />
      </span>
    </span>
  );
}
