"use client";

import { useState } from "react";
import { ShareGlyph } from "@/components/matches/figma-icons";

export function ShareButton({
  title,
  url,
  variant = "text",
}: {
  title: string;
  url: string;
  variant?: "text" | "icon";
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const href = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: href });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => void share()}
        className="scory-icon-btn scory-icon-btn--soft"
        aria-label={copied ? "Copied" : "Share"}
      >
        <ShareGlyph size={20} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void share()}
      className="rounded-full px-3 py-1.5 text-[10px] tracking-[0.08em] text-[var(--scory-text-secondary)] ring-1 ring-[var(--scory-border-subtle)]"
    >
      {copied ? "Copied" : "Share"}
    </button>
  );
}
