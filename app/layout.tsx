import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phone Number to Word Converter | Memorable Number Generator",
  description:
    "Enter a 10-digit phone number and find memorable words that match its telephone keypad digits.",
  openGraph: {
    title: "Phone Number to Word Converter | Memorable Number Generator",
    description:
      "Enter a 10-digit phone number and find memorable words that match its telephone keypad digits.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
