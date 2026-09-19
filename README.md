# Memorable Number

Phase 1: Phone Number → Memorable Word converter for Indian 10-digit phone numbers.

Enter a phone number and discover memorable words hidden in its telephone keypad digits.

## Features

- 10-digit Indian phone number input with format normalization
- Dictionary-based keypad word matching (no brute-force)
- Ranked results with verifiable letter-to-digit mappings
- Mobile-first responsive UI

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run test` — Run test suite
- `npm run lint` — Run ESLint

## Examples

| Input | Output |
|-------|--------|
| 8003748377 | 800-DRIVERS |
| 8006008973 | 800-600-TYRE |

## Architecture

```
/app          — Next.js pages and API routes
/components   — React UI components
/lib/keypad   — Matching engine (framework-independent)
/data         — Curated dictionary
/tests        — Automated tests
```
