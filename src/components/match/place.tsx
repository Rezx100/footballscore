import type { VenueInfo } from "@/lib/types";

export function Place({ venue }: { venue: VenueInfo }) {
  const bits = [venue.name, [venue.city, venue.country].filter(Boolean).join(", ")].filter(Boolean);
  return (
    <dl className="space-y-2 text-[14px]">
      {bits.length ? (
        <div>
          <dt className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">Venue</dt>
          <dd className="font-cond">{bits.join(" · ")}</dd>
        </div>
      ) : null}
      {venue.attendance != null ? (
        <div>
          <dt className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">Attendance</dt>
          <dd className="font-board">{venue.attendance.toLocaleString("en-GB")}</dd>
        </div>
      ) : null}
      {venue.referee ? (
        <div>
          <dt className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">Referee</dt>
          <dd className="font-cond">{venue.referee}</dd>
        </div>
      ) : null}
    </dl>
  );
}
