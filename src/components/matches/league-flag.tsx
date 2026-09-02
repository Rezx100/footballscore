import type { LeagueGroup } from "@/lib/types";

export function LeagueFlag({ flag }: { flag: LeagueGroup["flag"] }) {
  if (flag === "us") {
    return (
      <svg viewBox="0 0 16 12" className="h-3 w-4 shrink-0 rounded-[1px]" aria-hidden="true">
        <rect width="16" height="12" fill="#BF0A30" />
        <path fill="#FFF" d="M0 1.3h16v1.3H0zm0 2.6h16v1.3H0zm0 2.6h16v1.3H0zm0 2.6h16V12H0z" />
        <rect width="7" height="6.5" fill="#002868" />
      </svg>
    );
  }
  if (flag === "eng") {
    return (
      <svg viewBox="0 0 16 12" className="h-3 w-4 shrink-0 rounded-[1px]" aria-hidden="true">
        <rect width="16" height="12" fill="#FFF" />
        <rect x="6.5" width="3" height="12" fill="#CE1124" />
        <rect y="4.5" width="16" height="3" fill="#CE1124" />
      </svg>
    );
  }
  if (flag === "esp") {
    return (
      <svg viewBox="0 0 16 12" className="h-3 w-4 shrink-0 rounded-[1px]" aria-hidden="true">
        <rect width="16" height="12" fill="#C60B1E" />
        <rect y="3" width="16" height="6" fill="#FFC400" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 12" className="h-3 w-4 shrink-0 rounded-[1px]" aria-hidden="true">
      <rect width="5.4" height="12" fill="#009246" />
      <rect x="5.4" width="5.2" height="12" fill="#FFF" />
      <rect x="10.6" width="5.4" height="12" fill="#CE2B37" />
    </svg>
  );
}
