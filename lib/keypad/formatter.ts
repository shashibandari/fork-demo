import type { WordMatch } from "./types";

function formatNumericSegment(digits: string): string {
  if (!digits) return "";

  const parts: string[] = [];
  let remaining = digits;

  while (remaining.length > 3) {
    parts.push(remaining.slice(0, 3));
    remaining = remaining.slice(3);
  }

  if (remaining) {
    parts.push(remaining);
  }

  return parts.join("-");
}

export function formatVanityNumber(phoneNumber: string, match: WordMatch): string {
  const before = phoneNumber.slice(0, match.startIndex);
  const after = phoneNumber.slice(match.endIndex);
  const segments: string[] = [];

  if (before) {
    segments.push(formatNumericSegment(before));
  }

  segments.push(match.word);

  if (after) {
    segments.push(formatNumericSegment(after));
  }

  return segments.join("-");
}
