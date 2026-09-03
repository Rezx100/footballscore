import type { DualStat } from "@/lib/types";

function barWidth(value: number | undefined, other: number | undefined, pct?: boolean): number {
  if (value == null) return 0;
  if (pct) {
    const n = value <= 1 ? value * 100 : value;
    return Math.max(4, Math.min(100, n));
  }
  const total = (value || 0) + (other || 0);
  if (total <= 0) return 0;
  return Math.max(4, (value / total) * 100);
}

export function DualStats({
  stats,
  homeColor,
  awayColor,
}: {
  stats: DualStat[];
  homeColor: string;
  awayColor: string;
}) {
  if (!stats.length) return null;
  return (
    <ul className="space-y-3">
      {stats.map((stat) => {
        const homeW = barWidth(stat.homeValue, stat.awayValue, stat.pct);
        const awayW = barWidth(stat.awayValue, stat.homeValue, stat.pct);
        return (
          <li key={stat.key}>
            <div className="mb-1 flex items-center justify-between font-board text-[12px]">
              <span>{stat.home}</span>
              <span className="text-[11px] tracking-[0.06em] text-[var(--muted)]">{stat.label}</span>
              <span>{stat.away}</span>
            </div>
            <div className="flex h-1.5 gap-1">
              <div className="flex flex-1 justify-end overflow-hidden rounded-sm bg-[var(--elev)]">
                <span
                  className="h-full rounded-sm"
                  style={{ width: `${homeW}%`, background: homeColor, opacity: 0.85 }}
                />
              </div>
              <div className="flex flex-1 overflow-hidden rounded-sm bg-[var(--elev)]">
                <span
                  className="h-full rounded-sm"
                  style={{ width: `${awayW}%`, background: awayColor, opacity: 0.85 }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
