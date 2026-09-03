"use client";

import { useEffect } from "react";
import { TZ_COOKIE } from "@/lib/prefs";

function readCookie(name: string): string | undefined {
  const prefix = `${name}=`;
  const part = document.cookie.split("; ").find((row) => row.startsWith(prefix));
  if (!part) return undefined;
  try {
    return decodeURIComponent(part.slice(prefix.length));
  } catch {
    return part.slice(prefix.length);
  }
}

export function TimezoneProbe({ override }: { override: boolean }) {
  useEffect(() => {
    if (override) return;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return;
    if (readCookie(TZ_COOKIE) === tz) return;
    document.cookie = `${TZ_COOKIE}=${encodeURIComponent(tz)}; path=/; max-age=31536000; samesite=lax`;
  }, [override]);
  return null;
}
