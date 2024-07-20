import "./globals.css";
import { Header } from "@/components/primitive/header";
import { ReactQueryClientProvider } from "@/components/primitive/providers";
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
      <body
        className={cn(
          inter.className,
          `flex min-h-[100dvh] flex-col items-center bg-gradient-to-t
          from-charcoal-950 to-charcoal-900`,
        )}
      >
        <ReactQueryClientProvider>
          <Header />
          <div className="flex max-w-[1440px] flex-col px-6 pb-5 pt-3 md:px-12">
            {children}
            <Toaster />
          </div>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
