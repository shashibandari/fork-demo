import { describe, it, expect } from "vitest";
import {
  normalizePhoneNumber,
  validatePhoneNumber,
  findVanityMatches,
} from "@/lib/keypad";

describe("sample user numbers", () => {
  describe("7234-932227", () => {
    const input = "7234-932227";
    const normalized = "7234932227";

    it("normalizes and validates correctly", () => {
      expect(normalizePhoneNumber(input)).toBe(normalized);
      expect(validatePhoneNumber(input).valid).toBe(true);
    });

    it("finds CAR as the best match at the end", () => {
      const result = findVanityMatches(normalized);
      expect(result.hasStrongMatch).toBe(true);
      expect(result.matches[0].word).toBe("CAR");
      expect(result.matches[0].formatted).toBe("723-493-2-CAR");
      expect(result.matches[0].digits).toBe("227");
    });

    it("includes alternative matches", () => {
      const result = findVanityMatches(normalized);
      const words = [...result.matches, ...result.weakMatches].map((m) => m.word);
      expect(words).toContain("CAB");
      expect(words).toContain("FIX");
      expect(words).toContain("WEB");
    });
  });

  describe("80046 22227", () => {
    const input = "80046 22227";
    const normalized = "8004622227";

    it("normalizes and validates correctly", () => {
      expect(normalizePhoneNumber(input)).toBe(normalized);
      expect(validatePhoneNumber(input).valid).toBe(true);
    });

    it("finds CAR as the best match at the end", () => {
      const result = findVanityMatches(normalized);
      expect(result.hasStrongMatch).toBe(true);
      expect(result.matches[0].word).toBe("CAR");
      expect(result.matches[0].formatted).toBe("800-462-2-CAR");
      expect(result.matches[0].digits).toBe("227");
    });

    it("includes alternative matches", () => {
      const result = findVanityMatches(normalized);
      const words = [...result.matches, ...result.weakMatches].map((m) => m.word);
      expect(words).toContain("CAB");
      expect(words).toContain("GO");
    });
  });
});
