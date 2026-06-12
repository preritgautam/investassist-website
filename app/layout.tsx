import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "InvestAssist - CRE Underwriting & Deal Analysis Software",
    template: "%s | InvestAssist",
  },
  description:
    "Upload an offering memorandum, T-12, and rent roll to instantly underwrite commercial real estate deals. Get cap rate, NOI, valuation, comps, and side-by-side comparisons in minutes.",
  icons: {
    icon: "/investassist-short-logo-bgrmd.png",
    apple: "/investassist-short-logo-bgrmd.png",
  },
  openGraph: {
    title: "InvestAssist - CRE Underwriting & Deal Analysis Software",
    description:
      "Independent CRE underwriting from the actual deal documents. Upload the OM, T-12, and rent roll and get a benchmarked verdict in minutes.",
    images: ["/og-image.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-background font-sans text-foreground antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}