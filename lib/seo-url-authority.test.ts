import { test, beforeEach, afterEach } from "node:test"
import assert from "node:assert/strict"

import {
  DEFAULT_SITE_URL,
  SITEMAP_ROUTES,
  getSiteUrl,
  absoluteUrl,
  shouldIndex,
} from "./seo-config"
import { indexNowUrls, submitToIndexNow } from "./indexnow"
import { articlePath, getPublishedArticles, INSIGHTS_BASE_PATH } from "./insights"
import {
  organizationId,
  webSiteId,
  organizationSchema,
  webSiteSchema,
  webPageSchema,
  softwareApplicationSchema,
  blogPostingSchema,
  breadcrumbSchema,
  type JsonLdNode,
} from "./structured-data"

/**
 * URL-authority contract.
 *
 * Proves that SITE_URL is the single source of truth for every public
 * SEO/discovery URL, and that it is NOT bound to NEXT_PUBLIC_APP_URL (the
 * authenticated-app origin) or to a Vercel preview origin. Even when those
 * point elsewhere, all canonical/sitemap/RSS/OG/structured-data/robots/IndexNow
 * URLs must resolve under SITE_URL.
 */

// The canonical authority under test, and decoy origins that MUST NOT leak in.
const CANONICAL = "https://investassist.ai"
const APP_ORIGIN = "https://app.investassist.dev"
const PREVIEW_ORIGIN = "https://investassist-git-feature-team.vercel.app"

const KEYS = [
  "SITE_URL",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_ALLOW_INDEXING",
  "VERCEL_ENV",
  "NEXT_PUBLIC_VERCEL_ENV",
  "VERCEL_URL",
  "NEXT_PUBLIC_VERCEL_URL",
  "INDEXNOW_KEY",
] as const
let saved: Record<string, string | undefined> = {}

beforeEach(() => {
  saved = {}
  for (const k of KEYS) {
    saved[k] = process.env[k]
    delete process.env[k]
  }
})

afterEach(() => {
  for (const k of KEYS) {
    if (saved[k] === undefined) delete process.env[k]
    else process.env[k] = saved[k]
  }
})

/** Recursively collect every string that looks like an absolute http(s) URL. */
function collectUrls(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    if (/^https?:\/\//.test(value)) out.push(value)
  } else if (Array.isArray(value)) {
    for (const v of value) collectUrls(v, out)
  } else if (value && typeof value === "object") {
    for (const v of Object.values(value as Record<string, unknown>)) collectUrls(v, out)
  }
  return out
}

/**
 * Every first-party URL the site advertises for discovery, mirroring exactly
 * what app/sitemap.ts, app/robots.ts, app/feed.xml, lib/indexnow.ts, and the
 * structured-data builders emit (all of which funnel through absoluteUrl).
 */
function allDiscoveryUrls(): string[] {
  const articles = getPublishedArticles()
  const urls: string[] = []

  // Canonical + Open Graph base.
  urls.push(getSiteUrl(), absoluteUrl("/"))

  // sitemap.xml
  for (const r of SITEMAP_ROUTES) urls.push(absoluteUrl(r.path))
  urls.push(absoluteUrl(INSIGHTS_BASE_PATH))
  for (const a of articles) urls.push(absoluteUrl(articlePath(a.slug)))

  // robots.txt sitemap + host references.
  urls.push(absoluteUrl("/sitemap.xml"), absoluteUrl("/").replace(/\/+$/, ""))

  // feed.xml
  urls.push(absoluteUrl("/feed.xml"), absoluteUrl("/insights"))

  // IndexNow submission set + key location.
  urls.push(...indexNowUrls(), absoluteUrl("/api/indexnow"))

  // Structured-data url / @id fields.
  const nodes: JsonLdNode[] = [
    organizationSchema(),
    webSiteSchema(),
    softwareApplicationSchema(),
    webPageSchema({ path: "/", title: "Home", description: "d" }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
    ]),
  ]
  if (articles[0]) nodes.push(blogPostingSchema(articles[0]))
  urls.push(organizationId(), webSiteId())
  for (const node of nodes) collectUrls(node, urls)

  return urls
}

/** Assert every first-party URL is under CANONICAL and no decoy origin leaks. */
function assertAllUnderCanonical(urls: string[]) {
  const canonicalHost = new URL(CANONICAL).host
  for (const u of urls) {
    const host = new URL(u).host
    // Ignore known third-party media hosts (YouTube thumbnails/embeds).
    if (host.endsWith("ytimg.com") || host.endsWith("youtube.com")) continue
    assert.equal(
      host,
      canonicalHost,
      `URL escaped the canonical authority: ${u} (host ${host} !== ${canonicalHost})`,
    )
    assert.ok(u.startsWith(CANONICAL), `URL not rooted at SITE_URL: ${u}`)
  }
  const joined = urls.join("\n")
  assert.ok(!joined.includes(new URL(APP_ORIGIN).host), "app origin leaked into public URLs")
  assert.ok(!joined.includes(new URL(PREVIEW_ORIGIN).host), "preview origin leaked into public URLs")
}

test("all public SEO/discovery URLs resolve under SITE_URL in production", () => {
  process.env.SITE_URL = CANONICAL
  process.env.NEXT_PUBLIC_APP_URL = APP_ORIGIN
  process.env.VERCEL_ENV = "production"
  assertAllUnderCanonical(allDiscoveryUrls())
})

test("SITE_URL wins even when NEXT_PUBLIC_APP_URL points at a different app origin", () => {
  process.env.SITE_URL = CANONICAL
  process.env.NEXT_PUBLIC_APP_URL = APP_ORIGIN
  assert.equal(getSiteUrl(), CANONICAL)
  assert.equal(absoluteUrl("/insights"), `${CANONICAL}/insights`)
})

test("preview deployments never self-canonicalize to the preview origin", () => {
  // Simulate a preview deploy whose runtime origin differs from the canonical site.
  process.env.SITE_URL = CANONICAL
  process.env.NEXT_PUBLIC_APP_URL = PREVIEW_ORIGIN
  process.env.VERCEL_ENV = "preview"
  process.env.VERCEL_URL = new URL(PREVIEW_ORIGIN).host
  process.env.NEXT_PUBLIC_VERCEL_URL = new URL(PREVIEW_ORIGIN).host

  // Canonical/OG/sitemap/etc. still resolve to the production authority...
  assertAllUnderCanonical(allDiscoveryUrls())
  // ...and the deployment is correctly marked non-indexable.
  assert.equal(shouldIndex(), false)
})

test("IndexNow submission is skipped on non-production deployments", async () => {
  process.env.SITE_URL = CANONICAL
  process.env.VERCEL_ENV = "preview"
  process.env.INDEXNOW_KEY = "test-key"
  const res = await submitToIndexNow()
  assert.equal(res.ok, false)
  assert.equal((res as { skipped: boolean }).skipped, true)
})

test("with no SITE_URL set, discovery URLs fall back to the canonical default, not an app/preview origin", () => {
  process.env.NEXT_PUBLIC_APP_URL = APP_ORIGIN
  process.env.VERCEL_URL = new URL(PREVIEW_ORIGIN).host
  assert.equal(getSiteUrl(), DEFAULT_SITE_URL)
  // DEFAULT_SITE_URL is the canonical host used by the contract.
  assert.equal(new URL(DEFAULT_SITE_URL).host, new URL(CANONICAL).host)
})
