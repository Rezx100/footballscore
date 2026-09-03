import { cookies } from "next/headers";
import { FOLLOW_COOKIE, parseFollowCookie, type FollowState } from "@/lib/follow";
import { parsePrefsCookie, PREFS_COOKIE, TZ_COOKIE } from "@/lib/prefs";
import type { Prefs } from "@/lib/types";

export async function serverPrefs(): Promise<Prefs> {
  const jar = await cookies();
  return parsePrefsCookie(jar.get(PREFS_COOKIE)?.value, jar.get(TZ_COOKIE)?.value);
}

export async function serverFollow(): Promise<FollowState> {
  const jar = await cookies();
  return parseFollowCookie(jar.get(FOLLOW_COOKIE)?.value);
}
