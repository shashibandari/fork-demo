"use client";

import { useEffect, useState } from "react";
import type { VanityMatch } from "@/lib/keypad";
import { KeypadMapping } from "./KeypadMapping";
import { trackEvent } from "@/lib/analytics";

interface VanityResultProps {
  match: VanityMatch;
  phoneNumber: string;
  isBest?: boolean;
}

function tierLabel(tier: VanityMatch["tier"]): string {
  switch (tier) {
    case "best":
      return "Best match";
    case "strong":
      return "Strong match";
    default:
      return "Other match";
  }
}

export function VanityResult({ match, phoneNumber, isBest = false }: VanityResultProps) {
  const [copiedVanity, setCopiedVanity] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const copyToClipboard = async (text: string, type: "vanity" | "number") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "vanity") {
        setCopiedVanity(true);
        setTimeout(() => setCopiedVanity(false), 2000);
      } else {
        setCopiedNumber(true);
        setTimeout(() => setCopiedNumber(false), 2000);
      }
      trackEvent("vanity_result_copied", {
        phoneNumber,
        matchWord: match.word,
        formatted: match.formatted,
      });
    } catch {
      // Clipboard may be unavailable
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Memorable Phone Number",
      text: `${match.formatted} (${phoneNumber})`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackEvent("vanity_result_shared", {
          phoneNumber,
          matchWord: match.word,
          formatted: match.formatted,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await copyToClipboard(match.formatted, "vanity");
    }
  };

  return (
    <article
      className={`rounded-2xl border p-6 ${
        isBest
          ? "bg-white border-brand-200 shadow-lg shadow-brand-100/50"
          : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      {isBest && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wide uppercase text-brand-700 bg-brand-50 rounded-full">
          {tierLabel(match.tier)}
        </span>
      )}

      {!isBest && (
        <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wide uppercase text-slate-500 bg-slate-100 rounded-full">
          {tierLabel(match.tier)}
        </span>
      )}

      <div className="text-center mb-4">
        <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {match.formatted}
        </p>
        <p className="mt-2 text-slate-500 font-mono text-sm">{phoneNumber}</p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-sm text-slate-600 font-mono">{match.word}</span>
        <span className="text-slate-300">=</span>
        <span className="text-sm text-brand-600 font-mono font-semibold">{match.digits}</span>
      </div>

      <p className="text-center text-xs text-emerald-600 font-medium mb-4">
        Exact word match
      </p>

      <KeypadMapping word={match.word} digits={match.digits} />

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          type="button"
          onClick={() => copyToClipboard(match.formatted, "vanity")}
          className="flex-1 min-w-[140px] px-4 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors"
        >
          {copiedVanity ? "Copied!" : "Copy Vanity Name"}
        </button>
        <button
          type="button"
          onClick={() => copyToClipboard(phoneNumber, "number")}
          className="flex-1 min-w-[140px] px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
        >
          {copiedNumber ? "Copied!" : "Copy Number"}
        </button>
        {canShare && (
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 min-w-[100px] px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Share
          </button>
        )}
      </div>
    </article>
  );
}
