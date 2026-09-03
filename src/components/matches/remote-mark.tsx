"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export function RemoteMark({
  src,
  alt,
  size,
  fallback,
  className,
}: {
  src?: string;
  alt: string;
  size: number;
  fallback: ReactNode;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return fallback;

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={className}
      aria-hidden="true"
      onError={() => setFailed(true)}
    />
  );
}
