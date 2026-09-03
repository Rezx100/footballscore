const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MatchesTabIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="8" rx="1.6" />
      <rect x="5" y="12.5" width="14" height="8" rx="1.6" />
      <path d="M8.5 7.5h7M8.5 16.5h7" />
    </svg>
  );
}

export function NewsTabIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <rect x="5.5" y="3.5" width="13" height="17" rx="1.6" />
      <path d="M5.5 8h13M8.5 11.5h7M8.5 14.5h7M8.5 17.5h4.5" />
    </svg>
  );
}

export function LeaguesTabIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M12 6.6 16.4 8.7v4.4c0 2.3-1.8 4-4.4 4.8-2.6-.8-4.4-2.5-4.4-4.8V8.7Z" />
    </svg>
  );
}

export function FollowingTabIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <path d="M12 20.2s-5.2-5.8-5.2-9.4a5.2 5.2 0 1 1 10.4 0c0 3.6-5.2 9.4-5.2 9.4Z" />
      <circle cx="12" cy="10.4" r="1.7" />
    </svg>
  );
}

export function MoreTabIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <rect x="4.5" y="7" width="15" height="10" rx="1.5" />
      <circle cx="8.6" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BackChevronIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </svg>
  );
}

export const TAB_ICONS = {
  matches: MatchesTabIcon,
  news: NewsTabIcon,
  leagues: LeaguesTabIcon,
  following: FollowingTabIcon,
  more: MoreTabIcon,
} as const;
