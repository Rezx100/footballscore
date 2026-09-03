export function Wordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={`font-cond inline-flex items-baseline text-[17px] font-semibold leading-none tracking-[-0.03em] ${className ?? ""}`}
    >
      <span className="text-[var(--ink)]">football</span>
      <span className="text-[color-mix(in_srgb,var(--ink)_62%,transparent)]">score</span>
    </span>
  );
}
