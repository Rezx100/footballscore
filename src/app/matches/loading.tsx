import { PhoneShell } from "@/components/phone-shell";

export default function MatchesLoading() {
  return (
    <PhoneShell>
      <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)]">
        <div className="bg-[var(--surface)] px-4 pt-3 pb-3">
          <div className="h-7 w-40 rounded bg-[#EDEDF2]" />
          <div className="mt-4 flex gap-5">
            <div className="h-5 w-16 rounded bg-[#EDEDF2]" />
            <div className="h-5 w-14 rounded bg-[#EDEDF2]" />
            <div className="h-5 w-20 rounded bg-[#EDEDF2]" />
          </div>
        </div>
        <div className="flex flex-col gap-3 px-3 py-3">
          {[0, 1, 2].map((key) => (
            <div
              key={key}
              className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface)]"
            >
              <div className="h-10 border-b border-[var(--line)] px-3">
                <div className="mt-3 h-3 w-32 rounded bg-[#EDEDF2]" />
              </div>
              <div className="h-12 border-b border-[var(--line)]" />
              <div className="h-12" />
            </div>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}
