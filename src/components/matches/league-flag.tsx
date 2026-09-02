import { RemoteMark } from "@/components/matches/remote-mark";
import type { LeagueGroup } from "@/lib/types";

function CountryBadge({ flag }: { flag: string }) {
  const label = flag === "int" ? "INT" : flag.slice(0, 3).toUpperCase();
  return (
    <span className="inline-flex h-4 min-w-4 items-center justify-center text-[8px] font-semibold text-[var(--muted)]">
      {label}
    </span>
  );
}

export function LeagueFlag({ group }: { group: LeagueGroup }) {
  return (
    <RemoteMark
      src={group.logo}
      alt=""
      size={16}
      className="h-4 w-4 shrink-0 object-contain"
      fallback={<CountryBadge flag={group.flag} />}
    />
  );
}
