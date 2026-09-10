import Link from "next/link";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { SearchGlyph } from "@/components/matches/figma-icons";

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md";
}) {
  return (
    <button
      type={props.type ?? "button"}
      className={`scory-btn scory-btn--${size} scory-btn--${variant} ${className}`}
      {...props}
    />
  );
}

export function IconButton({
  variant = "ghost",
  className = "",
  label,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "soft" | "outline" | "ghost";
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type={props.type ?? "button"}
      aria-label={label}
      className={`scory-icon-btn scory-icon-btn--${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({
  tone = "info",
  children,
}: {
  tone?: "live" | "ft" | "completed" | "error" | "info";
  children: ReactNode;
}) {
  return <span className={`scory-badge scory-badge--${tone}`}>{children}</span>;
}

export function FormPills({ results }: { results: ("W" | "D" | "L")[] }) {
  if (!results.length) return null;
  return (
    <ol className="flex gap-1" aria-label={`Form ${results.join(" ")}`}>
      {results.map((result, index) => (
        <li key={`${result}-${index}`} className={`scory-form-pill scory-form-pill--${result.toLowerCase()}`}>
          {result}
        </li>
      ))}
    </ol>
  );
}

export function SearchField({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`scory-search ${className}`}>
      <span className="scory-search__icon">
        <SearchGlyph size={20} />
      </span>
      <input className="scory-search__field" {...props} />
    </div>
  );
}

export function UnderlineTabs({
  items,
  value,
}: {
  items: { href: string; label: string; value: string }[];
  value: string;
}) {
  return (
    <div className="scory-tabs h-rail" role="tablist">
      {items.map((item) => {
        const active = item.value === value;
        return (
          <Link
            key={item.value}
            href={item.href}
            role="tab"
            aria-current={active ? "page" : undefined}
            className="scory-tabs__item"
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  icon,
  actionHref,
  actionLabel,
}: {
  title: string;
  body: string;
  icon?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="scory-empty">
      <span className="scory-empty__icon" aria-hidden="true">
        {icon ?? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 10.5L12 4L20 10.5V20C20 20.2652 19.8946 20.5196 19.7071 20.7071C19.5196 20.8946 19.2652 21 19 21H5C4.73478 21 4.48043 20.8946 4.29289 20.7071C4.10536 20.5196 4 20.2652 4 20V10.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <p className="scory-empty__title">{title}</p>
      <p className="scory-empty__body">{body}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="mt-2 text-[13px] font-medium text-[var(--scory-text-brand)]">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function SkeletonRows({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="scory-skeleton" aria-hidden="true">
          <span className="scory-skeleton__disc" />
          <span className="scory-skeleton__bars">
            <span className="scory-skeleton__bar block" />
            <span className="scory-skeleton__bar scory-skeleton__bar--sm block" />
          </span>
        </div>
      ))}
    </div>
  );
}

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="scory-info-row">
      <span className="text-[13px] text-[var(--scory-text-secondary)]">{label}</span>
      <span className="text-right text-[14px] font-medium text-[var(--scory-text-primary)]">{value}</span>
    </div>
  );
}

export function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="scory-stat-row">
      <span className="text-[14px] text-[var(--scory-text-primary)]">{label}</span>
      <span className="text-[14px] font-semibold tabular-nums text-[var(--scory-text-primary)]">{value}</span>
    </div>
  );
}

export function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="scory-stat-tile">
      <p className="text-[11px] leading-[14px] text-[var(--scory-text-secondary)]">{label}</p>
      <p className="mt-1 text-[22px] font-semibold leading-7 tabular-nums text-[var(--scory-text-primary)]">{value}</p>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="px-4 text-[16px] font-semibold leading-6 text-[var(--scory-text-primary)]">{children}</h2>;
}
