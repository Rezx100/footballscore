import Image from "next/image";
import { RemoteMark } from "@/components/matches/remote-mark";
import { firstClassMarkSrc } from "@/lib/league-marks";

export function LeagueMark({
  slug,
  name,
  logo,
  size = 40,
}: {
  slug: string;
  name: string;
  logo?: string;
  size?: number;
}) {
  const custom = firstClassMarkSrc(slug);
  const glyph = Math.round(size * 0.72);
  const initials = (
    <span className="font-board text-[10px] text-[#1c1c1e]">{name.slice(0, 3)}</span>
  );

  return (
    <span className="league-mark-plate" style={{ width: size, height: size }}>
      {custom ? (
        <Image src={custom} alt="" width={glyph} height={glyph} unoptimized className="object-contain" />
      ) : (
        <RemoteMark
          src={logo}
          alt=""
          size={glyph}
          className="object-contain"
          fallback={initials}
        />
      )}
    </span>
  );
}
