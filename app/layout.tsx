import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import { faqItems } from "@/lib/faq-data"

const inter = Inter({ subsets: ["latin"] })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

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
    "property comparison tool"
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
      "Underwrite commercial real estate deals in minutes. Upload an OM, T-12, and rent roll for instant cap rate, NOI, valuation, comps, and comparisons.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvestAssist - CRE underwriting and deal analysis software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InvestAssist - CRE Underwriting & Deal Analysis Software",
    description:
      "Underwrite commercial real estate deals in minutes. Upload an OM, T-12, and rent roll for instant cap rate, NOI, valuation, comps, and comparisons.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/investassist-short-logo-bgrmd.png",
    apple: "/investassist-short-logo-bgrmd.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "InvestAssist",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "CRE underwriting and deal analysis software that turns an offering memorandum, T-12, and rent roll into instant cap rate, NOI, valuation, comps, and side-by-side comparisons.",
    publisher: {
      "@type": "Organization",
      name: "Clik.ai",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "79",
        priceCurrency: "USD",
        description: "~5–6 full deals / month. T-12, rent roll & OM extraction with NOI, cap rate, and valuation.",
        category: "subscription",
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: "199",
        priceCurrency: "USD",
        description:
          "~16–18 full deals / month. Adds market benchmarking, OM comp extraction, and side-by-side deal comparison.",
        category: "subscription",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "499",
        priceCurrency: "USD",
        description: "~50–55 full deals / month. Adds priority extraction, shared workspace, and deal history.",
        category: "subscription",
      },
    ],
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InvestAssist",
    url: siteUrl,
    logo: `${siteUrl}/investassist-logo.png`,
    parentOrganization: {
      "@type": "Organization",
      name: "Clik.ai",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InvestAssist",
    url: siteUrl,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const jsonLd = [softwareApplicationSchema, organizationSchema, websiteSchema, faqSchema]

  return (
    <html lang="en" className="bg-background" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.className} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": jsonLd.map(({ "@context": _ctx, ...rest }) => rest),
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
