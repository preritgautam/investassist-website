import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"

import { Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { THEME_COLOR } from "@/lib/brand"
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
  verificationTokens,
} from "@/lib/seo-config"

const verification = verificationTokens()

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
  },
  ...(verification.google || verification.bing
    ? {
        verification: {
          ...(verification.google ? { google: verification.google } : {}),
          ...(verification.bing ? { other: { "msvalidate.01": verification.bing } } : {}),
        },
      }
    : {}),
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
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
        className={`${geistMono.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
