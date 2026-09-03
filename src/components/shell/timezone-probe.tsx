"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TZ_COOKIE } from "@/lib/prefs";

export function TimezoneProbe({ override }: { override: boolean }) {
  const router = useRouter();
  const refreshed = useRef(false);

  useEffect(() => {
    if (override) return;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return;
    const current = document.cookie.split("; ").find((part) => part.startsWith(`${TZ_COOKIE}=`));
    const value = current?.slice(TZ_COOKIE.length + 1);
    if (value === encodeURIComponent(tz)) return;
    document.cookie = `${TZ_COOKIE}=${encodeURIComponent(tz)}; path=/; max-age=31536000; samesite=lax`;
    if (refreshed.current) return;
    refreshed.current = true;
    router.refresh();
  }, [override, router]);

  return null;
}
