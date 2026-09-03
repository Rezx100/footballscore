import type { ReactNode } from "react";
import Link from "next/link";

export function EmptyState({
  title,
  body,
  actionHref,
  actionLabel,
}: {
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="px-5 pt-16 pb-10">
      <p className="font-cond text-[20px] leading-none">{title}</p>
      <p className="mt-3 text-[14px] leading-[22px] text-[var(--muted)]">{body}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="mt-5 inline-block font-board text-[12px] tracking-[0.04em] text-[var(--live)]">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function SegmentTabs({
  items,
  value,
}: {
  items: { href: string; label: string; value: string }[];
  value: string;
}) {
  return (
    <div className="h-rail px-4 pb-3">
      <div className="inline-flex min-h-11 items-center gap-0.5 rounded-[10px] bg-[color-mix(in_srgb,var(--ink)_6%,transparent)] p-0.5">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <Link
              key={item.value}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-10 shrink-0 items-center rounded-[8px] px-3 font-board text-[11px] tracking-[0.06em] ${
                active
                  ? "bg-[var(--elev)] text-[var(--ink)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function FormPills({ results }: { results: ("W" | "D" | "L")[] }) {
  if (!results.length) return null;
  return (
    <ol className="flex gap-1" aria-label={`Form ${results.join(" ")}`}>
      {results.map((result, index) => (
        <li
          key={`${result}-${index}`}
          className={`font-board flex h-6 w-6 items-center justify-center rounded-[4px] text-[10px] ${
            result === "W"
              ? "bg-[color-mix(in_srgb,var(--patina)_40%,var(--elev))] text-[var(--ink)]"
              : result === "L"
                ? "bg-[color-mix(in_srgb,var(--danger)_22%,var(--elev))] text-[var(--ink)]"
                : "bg-[var(--elev)] text-[var(--muted)]"
          }`}
        >
          {result}
        </li>
      ))}
    </ol>
  );
}

export function Module({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <section className="px-4 py-4">
      <header className="mb-3 flex items-end justify-between gap-3">
        <h2 className="font-cond text-[16px] tracking-[-0.02em]">{title}</h2>
        {caption ? <p className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">{caption}</p> : null}
      </header>
      {children}
    </section>
  );
}
