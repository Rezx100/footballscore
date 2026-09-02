import type { Metadata } from "next";
import { Schibsted_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const grotesque = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const wordmark = Syne({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "footballscore — Matches",
  description: "Live football scores. Association football only.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesque.variable} ${wordmark.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] font-sans text-[var(--ink)]">{children}</body>
    </html>
  );
}
