import { describe, it, expect } from "vitest";
import { wordToDigits } from "@/lib/keypad/keypad";

describe("wordToDigits", () => {
  it("converts DRIVERS to 3748377", () => {
    expect(wordToDigits("DRIVERS")).toBe("3748377");
  });

  it("converts DRIVER to 374837", () => {
    expect(wordToDigits("DRIVER")).toBe("374837");
  });

  it("converts TYRE to 8973", () => {
    expect(wordToDigits("TYRE")).toBe("8973");
  });

  it("converts TAXI to 8294", () => {
    expect(wordToDigits("TAXI")).toBe("8294");
  });

  it("converts HOME to 4663", () => {
    expect(wordToDigits("HOME")).toBe("4663");
  });

  it("converts CARS to 2277", () => {
    expect(wordToDigits("CARS")).toBe("2277");
  });

  it("handles lowercase input", () => {
    expect(wordToDigits("drivers")).toBe("3748377");
  });
});
