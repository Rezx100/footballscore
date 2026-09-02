import type { MarkId } from "@/lib/brand";

const COPPER = "#C17A3A";
const BONE = "#F3EDE4";

function FlapMark() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <rect x="5" y="4" width="22" height="11" fill={COPPER} />
      <rect x="5" y="17" width="22" height="11" fill={BONE} />
    </svg>
  );
}

function SlotMark() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <path
        fill={COPPER}
        fillRule="evenodd"
        d="M16 16m-13 0a13 13 0 1 1 26 0a13 13 0 1 1-26 0M8 14h16v4H8z"
      />
    </svg>
  );
}

function PostsMark() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <path fill={COPPER} fillRule="evenodd" d="M5 4h10v24H5V4Zm4 12h6v8H9z" />
      <path fill={BONE} fillRule="evenodd" d="M17 4h10v24H17V4Zm0 4h6v8h-6z" />
    </svg>
  );
}

const MARK = {
  flap: FlapMark,
  slot: SlotMark,
  posts: PostsMark,
} as const;

export function BrandMark({
  id,
  size = 28,
  className,
}: {
  id: MarkId;
  size?: number;
  className?: string;
}) {
  const Graphic = MARK[id];
  return (
    <span
      className={className}
      style={{ width: size, height: size, display: "block" }}
    >
      <Graphic />
    </span>
  );
}
