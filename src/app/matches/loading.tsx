import { AppShell } from "@/components/app-shell";

export default function MatchesLoading() {
  return (
    <AppShell>
      <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)]">
        <div className="px-5 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-5 bg-[var(--surface)]" />
            <div className="h-4 w-36 bg-[var(--surface)]" />
          </div>
          <div className="mt-8 flex items-end gap-1.5">
            <div className="h-9 w-10 bg-[var(--surface)]" />
            <div className="h-14 w-16 bg-[var(--copper)]" />
            <div className="h-9 w-10 bg-[var(--surface)]" />
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          {[0, 1, 2].map((key) => (
            <div key={key} className="px-5 pt-6">
              <div className="h-3 w-28 bg-[var(--surface)]" />
              <div className="mt-3 h-14 border-t border-[var(--line)]" />
              <div className="h-14 border-t border-[var(--line)]" />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
