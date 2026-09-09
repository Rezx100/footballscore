import type { AppPrefs, FollowState, NotificationKind } from './types';

export const DEFAULT_NOTIFICATIONS: Record<NotificationKind, boolean> = {
  kickoff: true,
  goal: true,
  card: true,
  sub: false,
  ht: true,
  ft: true,
  lineup: true,
  var: true,
};

export const DEFAULT_PREFS: AppPrefs = {
  onboardingDone: false,
  scheme: 'dark',
  spoiler: false,
  delayMinutes: 0,
  hour12: false,
  tz: 'UTC',
  hideFinished: false,
  notifications: DEFAULT_NOTIFICATIONS,
};

export const DEFAULT_FOLLOW: FollowState = {
  teams: [],
  competitions: ['pl', 'ucl'],
  matches: [],
};
