import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { FollowProvider } from "@/components/follow/follow-provider";
import { TabBar } from "@/components/matches/tab-bar";
import { TimezoneProbe } from "@/components/shell/timezone-probe";
import { serverFollow, serverPrefs } from "@/lib/server-state";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "footballscore",
  description: "Live football scores. Association football only. Scores from ESPN.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [follow, prefs] = await Promise.all([serverFollow(), serverPrefs()]);
  return (
    <html lang="en" className={`${inter.variable} min-h-dvh antialiased`}>
      <body className="min-h-dvh bg-[var(--bg)] font-sans text-[var(--ink)]">
        <FollowProvider initial={follow}>
          <TimezoneProbe override={prefs.tzOverride} />
          {children}
          <TabBar />
        </FollowProvider>
      </body>
    </html>
  );
}
