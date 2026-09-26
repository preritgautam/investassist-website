import type { Metadata } from "next"

/**
 * Central SEO configuration — the single source of truth for site identity,
 * canonical URL resolution, and preview-vs-production indexing policy.
 * Consumed by app/layout.tsx (metadata), app/robots.ts, app/sitemap.ts, and
 * the structured-data builders. Keep all site-level SEO constants here.
 */

export const SITE_NAME = "InvestAssist"

/** Canonical production origin used when NEXT_PUBLIC_SITE_URL is not set. */
export const DEFAULT_SITE_URL = "https://investassist.ai"

export const SITE_TITLE = "InvestAssist - CRE Underwriting & Deal Analysis Software"

export const TITLE_TEMPLATE = "%s | InvestAssist"

export const SITE_DESCRIPTION =
  "Underwrite commercial real estate deals in minutes. Upload an offering memorandum, T-12, and rent roll to get instant cap rate, NOI, valuation, comps, side-by-side comparisons, and a saved watchlist."

/** Slightly shorter description tuned for social share cards. */
export const OG_DESCRIPTION =
  "Underwrite commercial real estate deals in minutes. Upload an offering memorandum, T-12, and rent roll to get instant cap rate, NOI, valuation, comps, and a saved watchlist."

export const SITE_KEYWORDS = [
  "CRE underwriting software",
  "commercial real estate deal analysis",
  "multifamily underwriting",
  "rent roll analysis",
  "T-12 analysis",
  "cap rate calculator",
  "real estate comps",
  "property comparison tool",
]

export type SitemapRoute = {
  path: string
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
}

/** Public, indexable routes included in sitemap.xml. */
export const SITEMAP_ROUTES: SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/sample-analysis", changeFrequency: "monthly", priority: 0.8 },
]

/**
 * Resolve the canonical site origin, without a trailing slash.
 * Prefers NEXT_PUBLIC_SITE_URL so previews and self-hosts can override.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const base = raw && raw.length > 0 ? raw : DEFAULT_SITE_URL
  return base.replace(/\/+$/, "")
}

/** Build an absolute URL for a path against the canonical origin. */
export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  if (!path || path === "/") return `${base}/`
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

/**
 * Preview-vs-production indexing policy.
 * - NEXT_PUBLIC_ALLOW_INDEXING="true"/"false" is an explicit override.
 * - Otherwise only the Vercel production environment is indexable; preview and
 *   development deployments are kept out of search indexes.
 */
export function shouldIndex(): boolean {
  const override = process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim().toLowerCase()
  if (override === "true") return true
  if (override === "false") return false
  const env = (process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV)?.trim().toLowerCase()
  return env === "production"
}

/** Robots directive shared by layout metadata and app/robots.ts. */
export function robotsDirective(): Metadata["robots"] {
  const index = shouldIndex()
  return {
    index,
    follow: index,
    googleBot: {
      index,
      follow: index,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  }
}
