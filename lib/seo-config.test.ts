import { test, beforeEach, afterEach } from "node:test"
import assert from "node:assert/strict"

import {
  DEFAULT_SITE_URL,
  SITEMAP_ROUTES,
  getSiteUrl,
  absoluteUrl,
  shouldIndex,
  robotsDirective,
} from "./seo-config"
import {
  organizationSchema,
  webSiteSchema,
  webPageSchema,
  buildGraph,
  webSiteId,
} from "./structured-data"

// Snapshot and restore the env keys these helpers read, so tests are isolated.
const KEYS = ["SITE_URL", "NEXT_PUBLIC_APP_URL", "NEXT_PUBLIC_ALLOW_INDEXING", "VERCEL_ENV", "NEXT_PUBLIC_VERCEL_ENV"] as const
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

test("getSiteUrl falls back to the canonical default", () => {
  assert.equal(getSiteUrl(), DEFAULT_SITE_URL)
})

test("getSiteUrl honors SITE_URL and strips trailing slashes", () => {
  process.env.SITE_URL = "https://investassist.ai/"
  assert.equal(getSiteUrl(), "https://investassist.ai")
})

test("getSiteUrl ignores NEXT_PUBLIC_APP_URL (the authenticated-app origin)", () => {
  process.env.NEXT_PUBLIC_APP_URL = "https://app.investassist.dev"
  // No SITE_URL set: must fall back to the canonical default, never the app origin.
  assert.equal(getSiteUrl(), DEFAULT_SITE_URL)
})

test("absoluteUrl composes paths against the origin", () => {
  assert.equal(absoluteUrl("/"), `${DEFAULT_SITE_URL}/`)
  assert.equal(absoluteUrl("/sample-analysis"), `${DEFAULT_SITE_URL}/sample-analysis`)
  assert.equal(absoluteUrl("sitemap.xml"), `${DEFAULT_SITE_URL}/sitemap.xml`)
})

test("shouldIndex is true only in Vercel production by default", () => {
  process.env.VERCEL_ENV = "production"
  assert.equal(shouldIndex(), true)
})

test("shouldIndex is false on preview and development", () => {
  process.env.VERCEL_ENV = "preview"
  assert.equal(shouldIndex(), false)
  process.env.VERCEL_ENV = "development"
  assert.equal(shouldIndex(), false)
})

test("shouldIndex defaults to false when no environment is set", () => {
  assert.equal(shouldIndex(), false)
})

test("NEXT_PUBLIC_ALLOW_INDEXING overrides the environment either way", () => {
  process.env.VERCEL_ENV = "preview"
  process.env.NEXT_PUBLIC_ALLOW_INDEXING = "true"
  assert.equal(shouldIndex(), true)

  process.env.VERCEL_ENV = "production"
  process.env.NEXT_PUBLIC_ALLOW_INDEXING = "false"
  assert.equal(shouldIndex(), false)
})

test("robotsDirective mirrors the indexing decision", () => {
  process.env.VERCEL_ENV = "production"
  const prod = robotsDirective() as { index: boolean; follow: boolean }
  assert.equal(prod.index, true)
  assert.equal(prod.follow, true)

  process.env.VERCEL_ENV = "preview"
  const preview = robotsDirective() as { index: boolean; follow: boolean }
  assert.equal(preview.index, false)
  assert.equal(preview.follow, false)
})

test("sitemap routes are unique, rooted, and homepage is highest priority", () => {
  const paths = SITEMAP_ROUTES.map((r) => r.path)
  assert.equal(new Set(paths).size, paths.length, "duplicate sitemap paths")
  for (const r of SITEMAP_ROUTES) {
    assert.ok(r.path.startsWith("/"), `route not rooted: ${r.path}`)
    assert.ok(r.priority >= 0 && r.priority <= 1, `priority out of range: ${r.path}`)
  }
  const home = SITEMAP_ROUTES.find((r) => r.path === "/")
  assert.ok(home, "homepage missing from sitemap")
  assert.equal(home?.priority, 1)
})

test("structured data graph cross-references Organization and WebSite by @id", () => {
  const org = organizationSchema() as Record<string, unknown>
  const site = webSiteSchema() as Record<string, unknown>
  assert.equal(org["@type"], "Organization")
  assert.equal(site["@type"], "WebSite")
  // WebSite.publisher points at the Organization @id.
  assert.deepEqual(site.publisher, { "@id": org["@id"] })
})

test("webPageSchema links to the site and resolves an absolute url", () => {
  const page = webPageSchema({ path: "/", title: "Home", description: "desc" }) as Record<string, unknown>
  assert.equal(page["@type"], "WebPage")
  assert.equal(page.url, `${DEFAULT_SITE_URL}/`)
  assert.deepEqual(page.isPartOf, { "@id": webSiteId() })
})

test("buildGraph wraps nodes with schema.org context", () => {
  const graph = buildGraph([organizationSchema()]) as Record<string, unknown>
  assert.equal(graph["@context"], "https://schema.org")
  assert.ok(Array.isArray(graph["@graph"]))
  assert.equal((graph["@graph"] as unknown[]).length, 1)
})
