import { cookies, headers } from "next/headers";
import { isValidTimeZone } from "@/lib/dates";
import { FOLLOW_COOKIE, parseFollowCookie, type FollowState } from "@/lib/follow";
import { parsePrefsCookie, PREFS_COOKIE, TZ_COOKIE } from "@/lib/prefs";
import type { Prefs } from "@/lib/types";

export async function serverPrefs(): Promise<Prefs> {
  const jar = await cookies();
  const prefs = parsePrefsCookie(jar.get(PREFS_COOKIE)?.value, jar.get(TZ_COOKIE)?.value);
  if (!jar.get(TZ_COOKIE)?.value && !prefs.tzOverride) {
    const ipTz = (await headers()).get("x-vercel-ip-timezone") ?? undefined;
    if (isValidTimeZone(ipTz)) prefs.tz = ipTz;
  }
  return prefs;
}

export async function serverFollow(): Promise<FollowState> {
  const jar = await cookies();
  return parseFollowCookie(jar.get(FOLLOW_COOKIE)?.value);
}
