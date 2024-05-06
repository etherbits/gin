import "./globals.css";
import { Toaster } from "@/components/primitive/toaster";
import { cn } from "@/utils/tailwind";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gin",
  description: "A spaced-repetition learning web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://analytics.eu.umami.is/script.js"
          data-website-id="ebb4a417-3f6b-40cc-b816-822a4fa64f13"
        ></script>
      </head>
      <body
        className={cn(
          inter.className,
          "from-charcoal-950 to-charcoal-900 bg-gradient-to-t min-h-[100dvh]",
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
