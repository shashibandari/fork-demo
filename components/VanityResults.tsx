"use client";

import type { VanityMatch } from "@/lib/keypad";
import { VanityResult } from "./VanityResult";

interface VanityResultsProps {
  phoneNumber: string;
  matches: VanityMatch[];
  weakMatches: VanityMatch[];
  hasStrongMatch: boolean;
}

export function VanityResults({
  phoneNumber,
  matches,
  weakMatches,
  hasStrongMatch,
}: VanityResultsProps) {
  if (!hasStrongMatch && matches.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-100">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          No strong word match found.
        </h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          We couldn&apos;t find a common memorable word in this number.
        </p>
      </div>
    );
  }

  const [bestMatch, ...otherMatches] = matches;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-slate-500 font-mono text-lg mb-2">{phoneNumber}</p>
        <div className="flex items-center justify-center text-brand-500 my-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900">{bestMatch.formatted}</p>
      </div>

      <VanityResult match={bestMatch} phoneNumber={phoneNumber} isBest />

      {otherMatches.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700">More matches</h3>
          {otherMatches.map((match) => (
            <VanityResult
              key={`${match.word}-${match.startIndex}`}
              match={match}
              phoneNumber={phoneNumber}
            />
          ))}
        </div>
      )}

      {weakMatches.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-500">Other possible matches</h3>
          {weakMatches.map((match) => (
            <VanityResult
              key={`weak-${match.word}-${match.startIndex}`}
              match={match}
              phoneNumber={phoneNumber}
            />
          ))}
        </div>
      )}
    </div>
  );
}
