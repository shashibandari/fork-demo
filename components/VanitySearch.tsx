"use client";

import { useState } from "react";
import type { VanityMatch } from "@/lib/keypad";
import { PhoneInput } from "./PhoneInput";
import { VanityResults } from "./VanityResults";
import { trackEvent } from "@/lib/analytics";

interface SearchResponse {
  phoneNumber: string;
  matches: VanityMatch[];
  weakMatches: VanityMatch[];
  hasStrongMatch: boolean;
  error?: string;
}

export function VanitySearch() {
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (input: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    trackEvent("number_submitted");

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: input }),
      });

      const data: SearchResponse = await response.json();

      if (!response.ok || data.error) {
        setError(data.error ?? "Enter a valid 10-digit phone number.");
        return;
      }

      setResult(data);

      if (data.hasStrongMatch) {
        trackEvent("vanity_match_found", { phoneNumber: data.phoneNumber });
      } else {
        trackEvent("no_match_found", { phoneNumber: data.phoneNumber });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PhoneInput onSubmit={handleSubmit} isLoading={isLoading} />

      {error && (
        <p className="mt-4 text-center text-red-600 text-sm font-medium" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-10">
          <VanityResults
            phoneNumber={result.phoneNumber}
            matches={result.matches}
            weakMatches={result.weakMatches}
            hasStrongMatch={result.hasStrongMatch}
          />
        </div>
      )}
    </div>
  );
}
