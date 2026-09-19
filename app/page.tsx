import { VanitySearch } from "@/components/VanitySearch";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 text-balance leading-tight">
            Make Your Phone Number
            <br />
            <span className="text-brand-600">Easy to Remember</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-md mx-auto text-balance">
            Enter your 10-digit phone number and discover words that match its keypad digits.
          </p>
        </header>

        <VanitySearch />

        <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
          <p>Standard telephone keypad mapping. Digits 0 and 1 remain numeric.</p>
        </footer>
      </div>
    </main>
  );
}
