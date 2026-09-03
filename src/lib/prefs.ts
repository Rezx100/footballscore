import type { Prefs } from "@/lib/types";

export const PREFS_COOKIE = "fs_prefs";
export const TZ_COOKIE = "fs_tz";

export const DEFAULT_PREFS: Prefs = {
  tz: "UTC",
  hour12: false,
  hideFinished: false,
  startTab: "matches",
  tzOverride: false,
};

export function parsePrefsCookie(raw: string | undefined, tzCookie?: string): Prefs {
  const prefs: Prefs = { ...DEFAULT_PREFS };
  if (tzCookie) prefs.tz = decodeURIComponent(tzCookie);
  if (!raw) return prefs;
  try {
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    if (typeof parsed.tz === "string" && parsed.tz) {
      prefs.tz = parsed.tz;
      prefs.tzOverride = parsed.tzOverride === true || Boolean(parsed.tz);
    }
    if (typeof parsed.hour12 === "boolean") prefs.hour12 = parsed.hour12;
    if (typeof parsed.hideFinished === "boolean") prefs.hideFinished = parsed.hideFinished;
    if (parsed.startTab === "matches" || parsed.startTab === "news" || parsed.startTab === "leagues" || parsed.startTab === "following") {
      prefs.startTab = parsed.startTab;
    }
    if (typeof parsed.tzOverride === "boolean") prefs.tzOverride = parsed.tzOverride;
  } catch {
    return prefs;
  }
  return prefs;
}

export function serializePrefs(prefs: Prefs): string {
  return JSON.stringify({
    tz: prefs.tz,
    hour12: prefs.hour12,
    hideFinished: prefs.hideFinished,
    startTab: prefs.startTab,
    tzOverride: prefs.tzOverride,
  });
}
