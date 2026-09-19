import type { RankingConfig, VanityMatch, WordMatch } from "./types";

const DEFAULT_CONFIG: RankingConfig = {
  minDisplayLength: 4,
  maxResults: 7,
  strongMatchThreshold: 0.55,
};

function computeRankScore(match: WordMatch): number {
  const lengthBonus = Math.min(match.length / 10, 0.25);
  const frequencyWeight = match.frequencyScore * 0.3;
  const memorabilityWeight = match.memorabilityScore * 0.25;
  const preferredBonus = match.preferred ? 0.15 : 0;
  const businessBonus = match.categories.some((c) =>
    ["automotive", "transport", "business", "healthcare", "finance", "food", "real-estate"].includes(c)
  )
    ? 0.1
    : 0;

  const positionBonus = match.startIndex === 0 ? 0.05 : match.startIndex <= 3 ? 0.03 : 0;

  const shortWordPenalty = match.length < 4 ? 0.35 : match.length === 4 ? 0 : 0;

  return (
    frequencyWeight +
    memorabilityWeight +
    lengthBonus +
    preferredBonus +
    businessBonus +
    positionBonus -
    shortWordPenalty
  );
}

function classifyTier(index: number, score: number, config: RankingConfig): VanityMatch["tier"] {
  if (index === 0 && score >= config.strongMatchThreshold) return "best";
  if (score >= config.strongMatchThreshold) return "strong";
  return "other";
}

export function rankWordMatches(
  matches: WordMatch[],
  config: Partial<RankingConfig> = {}
): WordMatch[] {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const scored = matches.map((match) => ({
    ...match,
    rankScore: computeRankScore(match),
  }));

  const sorted = scored.sort((a, b) => {
    if (b.rankScore !== a.rankScore) return b.rankScore - a.rankScore;
    if (b.length !== a.length) return b.length - a.length;
    if (b.frequencyScore !== a.frequencyScore) return b.frequencyScore - a.frequencyScore;
    return a.word.localeCompare(b.word);
  });

  const seen = new Set<string>();
  const deduped: WordMatch[] = [];

  for (const match of sorted) {
    const key = `${match.startIndex}-${match.endIndex}-${match.word}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(match);
  }

  return deduped.slice(0, mergedConfig.maxResults);
}

export function rankVanityMatches(
  matches: VanityMatch[],
  config: Partial<RankingConfig> = {}
): VanityMatch[] {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const ranked = rankWordMatches(matches, mergedConfig);

  return ranked.map((match, index) => ({
    ...match,
    formatted: (match as VanityMatch).formatted,
    tier: classifyTier(index, match.rankScore, mergedConfig),
  })) as VanityMatch[];
}

export function hasStrongMatch(matches: VanityMatch[]): boolean {
  return matches.some((m) => m.tier === "best" || m.tier === "strong");
}

export { DEFAULT_CONFIG };
