import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gin",
  description: "Spaced Repetition App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-charcoal-950 text-charcoal-200 px-8 py-12`}
      >
        {children}
      </body>
    </html>
  );
}
