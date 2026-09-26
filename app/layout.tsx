import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"

import { Geist, Inter, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteStructuredData } from "@/components/seo/structured-data"
import {
  SITE_TITLE,
  TITLE_TEMPLATE,
  SITE_DESCRIPTION,
  OG_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  getSiteUrl,
  robotsDirective,
} from "@/lib/seo-config"

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

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  robots: robotsDirective(),
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
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
      <head>
        <SiteStructuredData />
      </head>
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
