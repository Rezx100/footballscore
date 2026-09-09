const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function dayKey(iso: string, timeZone?: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timeZone ?? undefined,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

export function todayKey(timeZone?: string): string {
  return dayKey(new Date().toISOString(), timeZone);
}

export function shiftDay(key: string, days: number): string {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function formatKickoff(iso: string, hour12: boolean, timeZone?: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, {
    timeZone: timeZone || undefined,
    hour: 'numeric',
    minute: '2-digit',
    hour12,
  }).format(d);
}

export function weekdayLabel(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(Date.UTC(y ?? 2026, (m ?? 1) - 1, d ?? 1));
  return WEEKDAYS[date.getUTCDay()] ?? '';
}

export function dayNumber(key: string): string {
  return key.slice(8, 10);
}

export function buildDateRail(center = todayKey(), span = 3) {
  return Array.from({ length: span * 2 + 1 }, (_, i) => {
    const iso = shiftDay(center, i - span);
    return {
      iso,
      label: weekdayLabel(iso),
      day: dayNumber(iso),
      liveCount: 0,
    };
  });
}

export function espnDate(key: string): string {
  return key.replaceAll('-', '');
}
