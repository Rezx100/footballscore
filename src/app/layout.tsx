import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { FollowProvider } from "@/components/follow/follow-provider";
import { TimezoneProbe } from "@/components/shell/timezone-probe";
import { serverFollow, serverPrefs } from "@/lib/server-state";
import "./globals.css";

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const condensed = IBM_Plex_Sans_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const board = IBM_Plex_Mono({
  variable: "--font-board",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "footballscore",
  description: "Live football scores. Association football only. Scores from ESPN.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [follow, prefs] = await Promise.all([serverFollow(), serverPrefs()]);
  return (
    <html
      lang="en"
      className={`${plex.variable} ${condensed.variable} ${board.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] font-sans text-[var(--ink)]">
        <FollowProvider initial={follow}>
          <TimezoneProbe override={prefs.tzOverride} />
          {children}
        </FollowProvider>
      </body>
    </html>
  );
}
