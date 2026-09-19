const KEYPAD_MAP: Record<string, string> = {
  A: "2",
  B: "2",
  C: "2",
  D: "3",
  E: "3",
  F: "3",
  G: "4",
  H: "4",
  I: "4",
  J: "5",
  K: "5",
  L: "5",
  M: "6",
  N: "6",
  O: "6",
  P: "7",
  Q: "7",
  R: "7",
  S: "7",
  T: "8",
  U: "8",
  V: "8",
  W: "9",
  X: "9",
  Y: "9",
  Z: "9",
};

export function wordToDigits(word: string): string {
  const normalized = word.toUpperCase().replace(/[^A-Z]/g, "");
  let digits = "";

  for (const char of normalized) {
    const digit = KEYPAD_MAP[char];
    if (!digit) {
      throw new Error(`Character "${char}" has no keypad mapping`);
    }
    digits += digit;
  }

  return digits;
}

export function getKeypadLetter(digit: string, letter: string): string {
  const upper = letter.toUpperCase();
  if (KEYPAD_MAP[upper] === digit) {
    return upper;
  }
  return upper;
}

export function getLetterMappings(word: string): Array<{ letter: string; digit: string }> {
  const normalized = word.toUpperCase().replace(/[^A-Z]/g, "");
  return normalized.split("").map((letter) => ({
    letter,
    digit: KEYPAD_MAP[letter] ?? "",
  }));
}

export { KEYPAD_MAP };
