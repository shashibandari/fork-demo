export interface DictionaryWord {
  word: string;
  digits: string;
  categories: string[];
  frequencyScore: number;
  memorabilityScore: number;
  preferred: boolean;
}

export interface WordMatch {
  word: string;
  digits: string;
  startIndex: number;
  endIndex: number;
  length: number;
  frequencyScore: number;
  memorabilityScore: number;
  rankScore: number;
  categories: string[];
  preferred: boolean;
}

export interface VanityMatch extends WordMatch {
  formatted: string;
  tier: "best" | "strong" | "other";
}

export type MatchType = "EXACT_WORD" | "MULTI_WORD" | "PARTIAL_WORD";

export interface RankingConfig {
  minDisplayLength: number;
  maxResults: number;
  strongMatchThreshold: number;
}
