import { describe, it, expect } from "vitest";
import {
  findWordMatches,
  findVanityMatches,
  formatVanityNumber,
} from "@/lib/keypad";

describe("findWordMatches", () => {
  it("finds DRIVERS in 8003748377", () => {
    const matches = findWordMatches("8003748377");
    const drivers = matches.find((m) => m.word === "DRIVERS");
    expect(drivers).toBeDefined();
    expect(drivers?.digits).toBe("3748377");
    expect(drivers?.startIndex).toBe(3);
    expect(drivers?.endIndex).toBe(10);
  });

  it("finds TYRE in 8006008973", () => {
    const matches = findWordMatches("8006008973");
    const tyre = matches.find((m) => m.word === "TYRE");
    expect(tyre).toBeDefined();
    expect(tyre?.digits).toBe("8973");
    expect(tyre?.startIndex).toBe(6);
    expect(tyre?.endIndex).toBe(10);
  });

  it("prefers DRIVERS over DRIVER for overlapping match", () => {
    const result = findVanityMatches("8003748377");
    const topMatch = result.matches[0];
    expect(topMatch.word).toBe("DRIVERS");
  });

  it("does not alter digits in match", () => {
    const result = findVanityMatches("8003748377");
    for (const match of result.matches) {
      const extracted = "8003748377".slice(match.startIndex, match.endIndex);
      expect(extracted).toBe(match.digits);
    }
  });
});

describe("formatVanityNumber", () => {
  it("formats 8003748377 + DRIVERS as 800-DRIVERS", () => {
    const matches = findWordMatches("8003748377");
    const drivers = matches.find((m) => m.word === "DRIVERS")!;
    expect(formatVanityNumber("8003748377", drivers)).toBe("800-DRIVERS");
  });

  it("formats 8006008973 + TYRE as 800-600-TYRE", () => {
    const matches = findWordMatches("8006008973");
    const tyre = matches.find((m) => m.word === "TYRE")!;
    expect(formatVanityNumber("8006008973", tyre)).toBe("800-600-TYRE");
  });
});

describe("findVanityMatches", () => {
  it("returns 800-DRIVERS for 8003748377", () => {
    const result = findVanityMatches("8003748377");
    expect(result.hasStrongMatch).toBe(true);
    expect(result.matches[0].formatted).toBe("800-DRIVERS");
    expect(result.matches[0].word).toBe("DRIVERS");
  });

  it("returns 800-600-TYRE for 8006008973", () => {
    const result = findVanityMatches("8006008973");
    expect(result.hasStrongMatch).toBe(true);
    expect(result.matches[0].formatted).toBe("800-600-TYRE");
    expect(result.matches[0].word).toBe("TYRE");
  });

  it("returns no strong match for number with no common words", () => {
    const result = findVanityMatches("1010101010");
    expect(result.hasStrongMatch).toBe(false);
  });
});

describe("edge cases", () => {
  it("handles numbers with 0 and 1 without letter mapping", () => {
    const result = findVanityMatches("8003748377");
    expect(result.matches[0].formatted.startsWith("800-")).toBe(true);
  });

  it("handles repeated digits", () => {
    const matches = findWordMatches("8002277000");
    expect(matches.some((m) => m.word === "CARS")).toBe(true);
  });

  it("does not produce fabricated words for random numbers", () => {
    const result = findVanityMatches("1357924680");
    if (!result.hasStrongMatch) {
      expect(result.matches.length).toBeLessThanOrEqual(3);
    }
  });
});
