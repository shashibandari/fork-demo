export { wordToDigits, getLetterMappings, KEYPAD_MAP } from "./keypad";
export { normalizePhoneNumber, validatePhoneNumber } from "./validator";
export { findWordMatches, findVanityMatches, buildDictionaryEntry } from "./matcher";
export { formatVanityNumber } from "./formatter";
export { rankWordMatches, rankVanityMatches, hasStrongMatch } from "./ranker";
export type {
  DictionaryWord,
  WordMatch,
  VanityMatch,
  MatchType,
  RankingConfig,
} from "./types";
