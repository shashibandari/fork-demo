"use client";

import { useState, FormEvent } from "react";

interface PhoneInputProps {
  onSubmit: (value: string) => void;
  isLoading?: boolean;
}

export function PhoneInput({ onSubmit, isLoading = false }: PhoneInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <label htmlFor="phone-input" className="sr-only">
        10-digit phone number
      </label>
      <input
        id="phone-input"
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="8003748377"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-5 py-4 text-xl text-center tracking-wider bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition-all placeholder:text-slate-300"
        maxLength={20}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 px-6 py-4 text-lg font-semibold text-white bg-brand-600 rounded-2xl shadow-md hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? "Searching..." : "Find Memorable Words"}
      </button>
    </form>
  );
}
