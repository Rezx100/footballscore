import type { ReactNode } from "react";

type FlapTone = "today" | "live" | "idle";

const TOP: Record<FlapTone, string> = {
  today: "var(--copper)",
  live: "var(--copper)",
  idle: "var(--surface)",
};

const BOT: Record<FlapTone, string> = {
  today: "var(--ink)",
  live: "color-mix(in_srgb, var(--copper) 72%, #000)",
  idle: "var(--line)",
};

export function BoardFlap({
  tone,
  width,
  height,
  children,
}: {
  tone: FlapTone;
  width: number;
  height: number;
  children: ReactNode;
}) {
  const gap = 2;
  const half = (height - gap) / 2;
  return (
    <span className="relative block shrink-0" style={{ width, height }} aria-hidden="true">
      <span className="absolute inset-x-0 top-0" style={{ height: half, background: TOP[tone] }} />
      <span
        className="absolute inset-x-0"
        style={{ top: half + gap, height: half, background: BOT[tone] }}
      />
      <span className="relative z-10 flex h-full items-center justify-center">{children}</span>
    </span>
  );
}

export function DateFlap({ day, month }: { day: string; month: string }) {
  return (
    <span className="flex h-14 w-16 shrink-0 flex-col" aria-hidden="true">
      <span className="flex h-[27px] items-end justify-center bg-[var(--copper)] pb-0.5 font-board text-[22px] leading-none text-[var(--ink)]">
        {day}
      </span>
      <span className="h-[2px] bg-[var(--bg)]" />
      <span className="flex h-[27px] items-start justify-center bg-[var(--ink)] pt-1 font-board text-[11px] leading-none tracking-[0.08em] text-[var(--bg)]">
        {month}
      </span>
    </span>
  );
}
