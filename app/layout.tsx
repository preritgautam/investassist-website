import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"

import { Geist, Inter, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Modern AI-fintech type system: Geist (Vercel's precise, low-contrast grotesk)
// for ALL UI + display — clean, technical, and pairs 1:1 with Geist Mono for
// tabular figures. Inter kept only as a metric-compatible fallback.
const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
})
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://investassist.clik.ai"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InvestAssist - CRE Underwriting & Deal Analysis Software",
    template: "%s | InvestAssist",
  },
  description:
    "Underwrite commercial real estate deals in minutes. Upload an offering memorandum, T-12, and rent roll to get instant cap rate, NOI, valuation, comps, side-by-side comparisons, and a saved watchlist.",
  keywords: [
    "CRE underwriting software",
    "commercial real estate deal analysis",
    "multifamily underwriting",
    "rent roll analysis",
    "T-12 analysis",
    "cap rate calculator",
    "real estate comps",
    "property comparison tool",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "InvestAssist",
    title: "InvestAssist - CRE Underwriting & Deal Analysis Software",
    description:
      "Underwrite commercial real estate deals in minutes. Upload an offering memorandum, T-12, and rent roll to get instant cap rate, NOI, valuation, comps, and a saved watchlist.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${inter.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
