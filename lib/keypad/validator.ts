const MAX_INPUT_LENGTH = 30;

export interface ValidationResult {
  valid: boolean;
  normalized: string;
  error?: string;
}

export function normalizePhoneNumber(input: string): string {
  let cleaned = input.trim();

  if (cleaned.startsWith("+91")) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith("91") && cleaned.replace(/\D/g, "").length === 12) {
    cleaned = cleaned.replace(/^91/, "");
  }

  return cleaned.replace(/\D/g, "");
}

export function validatePhoneNumber(input: string): ValidationResult {
  if (input.length > MAX_INPUT_LENGTH) {
    return {
      valid: false,
      normalized: "",
      error: "Enter a valid 10-digit phone number.",
    };
  }

  const normalized = normalizePhoneNumber(input);

  if (normalized.length !== 10) {
    return {
      valid: false,
      normalized,
      error: "Enter a valid 10-digit phone number.",
    };
  }

  if (!/^\d{10}$/.test(normalized)) {
    return {
      valid: false,
      normalized,
      error: "Enter a valid 10-digit phone number.",
    };
  }

  return { valid: true, normalized };
}
