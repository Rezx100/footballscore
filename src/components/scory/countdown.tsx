"use client";

import { useEffect, useState } from "react";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function formatRemaining(iso: string, now: number): string {
  const diff = Math.max(0, new Date(iso).getTime() - now);
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function KickoffCountdown({ iso }: { iso: string }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <p className="match-hero__clock">{formatRemaining(iso, now)}</p>;
}
