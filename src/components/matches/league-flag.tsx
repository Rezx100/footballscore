import { RemoteMark } from "@/components/matches/remote-mark";
import type { LeagueGroup } from "@/lib/types";

function CountryBadge({ flag }: { flag: string }) {
  const label = flag === "int" ? "INT" : flag.slice(0, 3).toUpperCase();
  return (
    <span className="inline-flex h-full w-full items-center justify-center text-[7px] font-semibold tracking-[0.04em] text-[#1c1c1e]">
      {label}
    </span>
  );
}

export function LeagueFlag({ group }: { group: LeagueGroup }) {
  return (
    <span className="league-mark-plate" title={group.name}>
      <span className="crest-art">
        <RemoteMark
          src={group.logo}
          alt=""
          size={18}
          className="h-full w-full object-contain"
          fallback={<CountryBadge flag={group.flag} />}
        />
      </span>
    </span>
  );
}
