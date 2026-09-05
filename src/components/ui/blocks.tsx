import type { ReactNode } from "react";
import Link from "next/link";
import { EmptyState as ScoryEmpty, FormPills as ScoryFormPills, UnderlineTabs } from "@/components/scory/primitives";

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
    <div className="px-4 py-6">
      <ScoryEmpty title={title} body={body} actionHref={actionHref} actionLabel={actionLabel} />
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
    <div className="px-4">
      <UnderlineTabs items={items} value={value} />
    </div>
  );
}

export function FormPills({ results }: { results: ("W" | "D" | "L")[] }) {
  return <ScoryFormPills results={results} />;
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
        <h2 className="text-[16px] font-semibold tracking-[-0.02em]">{title}</h2>
        {caption ? <p className="text-[10px] tracking-[0.08em] text-[var(--muted)]">{caption}</p> : null}
      </header>
      {children}
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-[13px] font-medium text-[var(--scory-text-brand)]">
      {children}
    </Link>
  );
}
