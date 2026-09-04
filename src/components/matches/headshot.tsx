import { RemoteMark } from "@/components/matches/remote-mark";

function initialsFrom(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Headshot({
  src,
  name,
  size = 32,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  const fallback = (
    <span
      className="font-board inline-flex h-full w-full items-center justify-center text-[10px] text-[var(--muted)]"
      style={{ fontSize: size < 28 ? 8 : 10 }}
    >
      {initialsFrom(name)}
    </span>
  );

  return (
    <span
      className="relative inline-flex shrink-0 overflow-hidden rounded-full bg-[var(--elev)]"
      style={{ width: size, height: size }}
    >
      <RemoteMark src={src} alt="" size={size} className="h-full w-full object-cover" fallback={fallback} />
    </span>
  );
}
