"use client";

import { useEffect } from "react";
import { TZ_COOKIE } from "@/lib/prefs";

export function TimezoneProbe({ override }: { override: boolean }) {
  useEffect(() => {
    if (override) return;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return;
    const current = document.cookie.split("; ").find((part) => part.startsWith(`${TZ_COOKIE}=`));
    const value = current?.slice(TZ_COOKIE.length + 1);
    if (value === encodeURIComponent(tz)) return;
    document.cookie = `${TZ_COOKIE}=${encodeURIComponent(tz)}; path=/; max-age=31536000; samesite=lax`;
  }, [override]);
  return null;
}
