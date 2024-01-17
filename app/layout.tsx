import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gin",
  description: "Spaced Repetition App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-charcoal-950 px-8 py-12 text-charcoal-200`}
      >
        {children}
        <ToastContainer theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
