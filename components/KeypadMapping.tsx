import { getLetterMappings } from "@/lib/keypad";

interface KeypadMappingProps {
  word: string;
  digits: string;
}

export function KeypadMapping({ word, digits }: KeypadMappingProps) {
  const mappings = getLetterMappings(word);

  return (
    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <p className="font-semibold text-slate-800 mb-3">{word}</p>
      <div className="space-y-1">
        {mappings.map(({ letter, digit }, i) => (
          <p key={`${letter}-${i}`} className="text-sm text-slate-600 font-mono">
            {letter} = {digit}
          </p>
        ))}
      </div>
      <p className="mt-3 pt-3 border-t border-slate-200 text-sm font-semibold text-brand-700 font-mono">
        {word} = {digits}
      </p>
    </div>
  );
}
