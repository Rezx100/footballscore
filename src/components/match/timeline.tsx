import type { TimelineItem } from "@/lib/types";

function cardClass(kind: TimelineItem["kind"], key: boolean): string {
  if (kind === "goal") return "border-[color-mix(in_srgb,var(--copper)_40%,var(--line))] bg-[color-mix(in_srgb,var(--copper)_10%,var(--elev))]";
  if (kind === "card") return "border-[color-mix(in_srgb,var(--caution,#c4a574)_40%,var(--line))] bg-[var(--elev)]";
  if (kind === "sub") return "border-[var(--line)] bg-[var(--elev)]";
  if (key) return "border-[var(--line)] bg-[var(--elev)]";
  return "border-transparent bg-transparent";
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  if (!items.length) {
    return <p className="text-[14px] text-[var(--muted)]">No play-by-play yet.</p>;
  }
  return (
    <ol className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className={`rounded-[10px] border px-3 py-2 ${cardClass(item.kind, item.key)}`}>
          <div className="flex items-baseline gap-3">
            <span className="font-board w-10 shrink-0 text-[11px] text-[var(--muted)]">{item.clock ?? ""}</span>
            <p className={`min-w-0 text-[14px] leading-[20px] ${item.key ? "text-[var(--ink)]" : "text-[color-mix(in_srgb,var(--ink)_82%,transparent)]"}`}>
              {item.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
