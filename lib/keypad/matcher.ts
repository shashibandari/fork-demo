import { dictionary } from "@/data/dictionary";
import { formatVanityNumber } from "./formatter";
import { rankVanityMatches, rankWordMatches, hasStrongMatch, DEFAULT_CONFIG } from "./ranker";
import type { DictionaryWord, RankingConfig, VanityMatch, WordMatch } from "./types";
import { wordToDigits } from "./keypad";

type DigitIndex = Map<string, DictionaryWord[]>;

let digitIndex: DigitIndex | null = null;

function buildDigitIndex(words: DictionaryWord[]): DigitIndex {
  const index: DigitIndex = new Map();

  for (const entry of words) {
    const existing = index.get(entry.digits) ?? [];
    existing.push(entry);
    index.set(entry.digits, existing);
  }

  return index;
}

function getDigitIndex(): DigitIndex {
  if (!digitIndex) {
    digitIndex = buildDigitIndex(dictionary);
  }
  return digitIndex;
}

export function resetDigitIndex(): void {
  digitIndex = null;
}

export function findWordMatches(phoneNumber: string): WordMatch[] {
  const index = getDigitIndex();
  const matches: WordMatch[] = [];

  for (let start = 0; start < phoneNumber.length; start++) {
    for (let end = start + 1; end <= phoneNumber.length; end++) {
      const substring = phoneNumber.slice(start, end);
      const entries = index.get(substring);

      if (!entries) continue;

      for (const entry of entries) {
        matches.push({
          word: entry.word,
          digits: entry.digits,
          startIndex: start,
          endIndex: end,
          length: entry.word.length,
          frequencyScore: entry.frequencyScore,
          memorabilityScore: entry.memorabilityScore,
          rankScore: 0,
          categories: entry.categories,
          preferred: entry.preferred,
        });
      }
    }
  }

  return matches;
}

export interface VanitySearchResult {
  matches: VanityMatch[];
  hasStrongMatch: boolean;
  weakMatches: VanityMatch[];
}

export function findVanityMatches(
  phoneNumber: string,
  config: Partial<RankingConfig> = {}
): VanitySearchResult {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const rawMatches = findWordMatches(phoneNumber);
  const ranked = rankWordMatches(rawMatches, mergedConfig);

  const vanityMatches: VanityMatch[] = ranked.map((match, index) => ({
    ...match,
    formatted: formatVanityNumber(phoneNumber, match),
    tier:
      index === 0 && match.rankScore >= mergedConfig.strongMatchThreshold
        ? "best"
        : match.rankScore >= mergedConfig.strongMatchThreshold
          ? "strong"
          : "other",
  }));

  const strong = vanityMatches.filter((m) => m.tier === "best" || m.tier === "strong");
  const weak = vanityMatches.filter((m) => m.tier === "other");

  const displayMatches =
    strong.length > 0
      ? strong.slice(0, mergedConfig.maxResults)
      : weak.slice(0, Math.min(3, mergedConfig.maxResults));

  const remainingWeak =
    strong.length > 0
      ? [...weak, ...strong.slice(mergedConfig.maxResults)]
      : weak.slice(Math.min(3, mergedConfig.maxResults));

  return {
    matches: rankVanityMatches(displayMatches, mergedConfig),
    hasStrongMatch: hasStrongMatch(vanityMatches),
    weakMatches: remainingWeak.slice(0, 5),
  };
}

export function buildDictionaryEntry(
  word: string,
  categories: string[],
  frequencyScore: number,
  memorabilityScore: number,
  preferred = false
): DictionaryWord {
  return {
    word: word.toUpperCase(),
    digits: wordToDigits(word),
    categories,
    frequencyScore,
    memorabilityScore,
    preferred,
  };
}
