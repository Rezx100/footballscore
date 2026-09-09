/**
 * Scoreva design tokens — Aperture palette + Outfit/Inter/Plex Mono type.
 *
 * If `@/lib/theme` exists (Grok's data/theme layer), prefer wiring this hook to read the
 * active color scheme from there. Until it exists, this hook reads the OS color scheme
 * directly via `useColorScheme` from `react-native`. Shape is intentionally flat so it can
 * be merged with (not fought against) a future `lib/theme.ts`.
 *
 * Locked spec: docs/scoreva/DESIGN.md
 */
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export type ScorevaColorScheme = 'dark' | 'light';

export interface ScorevaColors {
  night: string;
  studio: string;
  plate: string;
  hairline: string;
  bone: string;
  mute: string;
  volt: string;
  ember: string;
  cardRed: string;
  cardAmber: string;
  ice: string;
  /** Canvas background for the active scheme (night on dark, paper on light). */
  background: string;
  /** Raised surface for the active scheme (studio on dark, bone-tinted on light). */
  surface: string;
  /** Card / row fill for the active scheme. */
  card: string;
  /** Primary text for the active scheme (bone on dark, ink on light). */
  text: string;
  /** Secondary text for the active scheme. */
  textMuted: string;
  /** Live / brand signal for the active scheme — volt on dark, ember-red on paper. */
  live: string;
}

export interface ScorevaTypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700';
  lineHeight: number;
  letterSpacing?: number;
}

export interface ScorevaTypography {
  caption: ScorevaTypographyStyle;
  meta: ScorevaTypographyStyle;
  body: ScorevaTypographyStyle;
  ui: ScorevaTypographyStyle;
  title: ScorevaTypographyStyle;
  wordmark: ScorevaTypographyStyle;
  score: ScorevaTypographyStyle;
  scoreLg: ScorevaTypographyStyle;
  minute: ScorevaTypographyStyle;
}

export interface ScorevaSpacing {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface ScorevaRadii {
  none: number;
  sm: number;
  md: number;
  pill: number;
}

export interface ScorevaTheme {
  scheme: ScorevaColorScheme;
  colors: ScorevaColors;
  typography: ScorevaTypography;
  spacing: ScorevaSpacing;
  radii: ScorevaRadii;
  motion: { duration: number };
}

const APERTURE = {
  night: '#08090D',
  studio: '#111318',
  plate: '#181B22',
  hairline: '#2A313C',
  bone: '#F3F0E8',
  mute: '#8B93A1',
  volt: '#D7FF3C',
  ember: '#FF5A2D',
  cardRed: '#E23D3D',
  cardAmber: '#E6B84A',
  ice: '#6EC8E0',
  paper: '#F4F1EA',
  ink: '#0E1014',
  liveOnPaper: '#C43A12',
} as const;

export const spacing: ScorevaSpacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radii: ScorevaRadii = {
  none: 0,
  sm: 8,
  md: 12,
  pill: 999,
};

export const typography: ScorevaTypography = {
  caption: {
    fontFamily: 'IBMPlexMono_500Medium',
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  meta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 21,
  },
  ui: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  title: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 25,
  },
  wordmark: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  score: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  scoreLg: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 34,
    fontWeight: '600',
    lineHeight: 40,
  },
  minute: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
  },
};

function buildTheme(scheme: ScorevaColorScheme): ScorevaTheme {
  const isDark = scheme === 'dark';
  const colors: ScorevaColors = {
    night: APERTURE.night,
    studio: APERTURE.studio,
    plate: APERTURE.plate,
    hairline: APERTURE.hairline,
    bone: APERTURE.bone,
    mute: APERTURE.mute,
    volt: APERTURE.volt,
    ember: APERTURE.ember,
    cardRed: APERTURE.cardRed,
    cardAmber: APERTURE.cardAmber,
    ice: APERTURE.ice,
    background: isDark ? APERTURE.night : APERTURE.paper,
    surface: isDark ? APERTURE.studio : '#EAE6DC',
    card: isDark ? APERTURE.plate : '#FFFFFF',
    text: isDark ? APERTURE.bone : APERTURE.ink,
    textMuted: isDark ? APERTURE.mute : '#5B6270',
    // Volt fails contrast on paper — light theme live signal is ember-red, not volt.
    live: isDark ? APERTURE.volt : APERTURE.liveOnPaper,
  };

  return {
    scheme,
    colors,
    typography,
    spacing,
    radii,
    motion: { duration: 160 },
  };
}

export const scorevaDarkTheme = buildTheme('dark');
export const scorevaLightTheme = buildTheme('light');

const ScorevaThemeContext = createContext<ScorevaTheme | null>(null);

export function ScorevaThemeProvider({
  children,
  scheme,
}: {
  children: ReactNode;
  /** Force a scheme instead of following the OS setting. */
  scheme?: ScorevaColorScheme;
}) {
  const systemScheme = useColorScheme();
  const resolved: ScorevaColorScheme = scheme ?? (systemScheme === 'light' ? 'light' : 'dark');
  const value = useMemo(() => buildTheme(resolved), [resolved]);
  return <ScorevaThemeContext.Provider value={value}>{children}</ScorevaThemeContext.Provider>;
}

/**
 * Reads the active Scoreva theme. Works without `ScorevaThemeProvider` too — it falls back
 * to the OS color scheme so components can be used standalone in screens/tests.
 */
export function useScorevaTheme(): ScorevaTheme {
  const ctx = useContext(ScorevaThemeContext);
  const systemScheme = useColorScheme();
  if (ctx) return ctx;
  return buildTheme(systemScheme === 'light' ? 'light' : 'dark');
}
