import { DAY_LABELS, DAY_ORDER } from "@/lib/matches";
import type { DayKey } from "@/lib/types";

export function DateStrip({
  selected,
  onSelect,
}: {
  selected: DayKey;
  onSelect: (day: DayKey) => void;
}) {
  return (
    <div className="flex gap-5 overflow-x-auto px-4 pt-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {DAY_ORDER.map((day) => {
        const active = day === selected;
        return (
          <button
            key={day}
            type="button"
            onClick={() => onSelect(day)}
            className={`shrink-0 pb-2 text-[15px] ${
              active
                ? "border-b-[3px] border-[var(--ink)] font-bold text-[var(--ink)]"
                : "border-b-[3px] border-transparent font-medium text-[var(--muted)]"
            }`}
          >
            {DAY_LABELS[day]}
          </button>
        );
      })}
    </div>
  );
}
