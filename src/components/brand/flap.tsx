import type { ReactNode } from "react";

type FlapTone = "today" | "live" | "idle";

const TOP: Record<FlapTone, string> = {
  today: "var(--copper)",
  live: "var(--live)",
  idle: "color-mix(in_srgb, var(--ink) 8%, var(--elev))",
};

const BOT: Record<FlapTone, string> = {
  today: "var(--ink)",
  live: "color-mix(in_srgb, var(--live) 55%, #000)",
  idle: "color-mix(in_srgb, var(--ink) 5%, var(--surface))",
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
  const gap = 1;
  const half = (height - gap) / 2;
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-[10px]"
      style={{ width, height }}
      aria-hidden="true"
    >
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
    <span
      className="flex h-12 w-[3.4rem] shrink-0 flex-col overflow-hidden rounded-[10px]"
      aria-hidden="true"
    >
      <span className="flex h-[23px] items-end justify-center bg-[var(--copper)] pb-0.5 font-board text-[20px] leading-none text-[var(--ink)]">
        {day}
      </span>
      <span className="h-px bg-[var(--bg)]" />
      <span className="flex h-[24px] items-start justify-center bg-[var(--ink)] pt-1 font-board text-[10px] leading-none tracking-[0.12em] text-[var(--bg)]">
        {month}
      </span>
    </span>
  );
}
