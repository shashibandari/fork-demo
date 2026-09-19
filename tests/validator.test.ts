import { describe, it, expect } from "vitest";
import { normalizePhoneNumber, validatePhoneNumber } from "@/lib/keypad/validator";

describe("normalizePhoneNumber", () => {
  it("normalizes plain 10-digit number", () => {
    expect(normalizePhoneNumber("8003748377")).toBe("8003748377");
  });

  it("normalizes hyphenated format", () => {
    expect(normalizePhoneNumber("800-374-8377")).toBe("8003748377");
  });

  it("normalizes spaced format", () => {
    expect(normalizePhoneNumber("800 374 8377")).toBe("8003748377");
  });

  it("normalizes +91 prefix", () => {
    expect(normalizePhoneNumber("+91 8003748377")).toBe("8003748377");
  });
});

describe("validatePhoneNumber", () => {
  it("accepts valid 10-digit number", () => {
    const result = validatePhoneNumber("8003748377");
    expect(result.valid).toBe(true);
    expect(result.normalized).toBe("8003748377");
  });

  it("accepts hyphenated format", () => {
    expect(validatePhoneNumber("800-374-8377").valid).toBe(true);
  });

  it("accepts spaced format", () => {
    expect(validatePhoneNumber("800 374 8377").valid).toBe(true);
  });

  it("accepts +91 prefix", () => {
    expect(validatePhoneNumber("+91 8003748377").valid).toBe(true);
  });

  it("rejects fewer than 10 digits", () => {
    const result = validatePhoneNumber("123456789");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Enter a valid 10-digit phone number.");
  });

  it("rejects more than 10 digits", () => {
    const result = validatePhoneNumber("12345678901");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Enter a valid 10-digit phone number.");
  });

  it("rejects alphabetic characters", () => {
    const result = validatePhoneNumber("800DRIVERS");
    expect(result.valid).toBe(false);
  });
});
