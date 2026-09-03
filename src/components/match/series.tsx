import { FormPills } from "@/components/ui/blocks";
import type { FormSide, SeasonSeries } from "@/lib/types";

export function SeriesAndForm({ series, form }: { series?: SeasonSeries; form: FormSide[] }) {
  if (!series && !form.length) return null;
  return (
    <div className="space-y-4">
      {series ? (
        <div>
          <p className="font-cond text-[15px]">{series.title}</p>
          {series.summary ? <p className="mt-1 text-[13px] text-[var(--muted)]">{series.summary}</p> : null}
          <ul className="mt-3 space-y-2">
            {series.events.map((event) => (
              <li key={event.id} className="font-cond text-[13px] text-[var(--muted)]">
                {event.homeName} {event.homeScore ?? ""}–{event.awayScore ?? ""} {event.awayName}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {form.map((side) => (
        <div key={side.teamId} className="flex items-center justify-between gap-3">
          <p className="font-cond text-[14px]">{side.teamName}</p>
          <FormPills results={side.games.map((game) => game.result)} />
        </div>
      ))}
    </div>
  );
}
