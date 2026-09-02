import { RemoteMark } from "@/components/matches/remote-mark";
import type { LeagueGroup } from "@/lib/types";

function CountryBadge({ flag }: { flag: string }) {
  const label = flag === "int" ? "INT" : flag.slice(0, 3).toUpperCase();
  return (
    <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-[3px] bg-[#EEF2F7] px-0.5 text-[8px] font-bold tracking-wide text-[var(--muted)]">
      {label}
    </span>
  );
}

export function LeagueFlag({ group }: { group: LeagueGroup }) {
  return (
    <RemoteMark
      src={group.logo}
      alt=""
      size={18}
      className="h-[18px] w-[18px] shrink-0 object-contain"
      fallback={<CountryBadge flag={group.flag} />}
    />
  );
}
