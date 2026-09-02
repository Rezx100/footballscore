import { AppShell } from "@/components/app-shell";

export default function MatchesLoading() {
  return (
    <AppShell>
      <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)]">
        <div className="border-b border-[var(--line)] px-4 pt-4 pb-3">
          <div className="h-7 w-44 bg-[var(--surface)]" />
          <div className="mt-4 flex gap-5">
            <div className="h-4 w-16 bg-[var(--surface)]" />
            <div className="h-4 w-14 bg-[var(--surface)]" />
            <div className="h-4 w-20 bg-[var(--surface)]" />
          </div>
        </div>
        <div className="flex flex-col">
          {[0, 1, 2].map((key) => (
            <div key={key} className="px-4 pt-5">
              <div className="h-3 w-28 bg-[var(--surface)]" />
              <div className="mt-3 h-16 border-t border-[var(--line)]" />
              <div className="h-16 border-t border-[var(--line)]" />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
