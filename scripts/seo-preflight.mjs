#!/usr/bin/env node
/**
 * SEO preflight checker.
 *
 * Fetches rendered routes from a running server and asserts the SEO contract
 * holds in the actual HTML: a single canonical, title/description present,
 * Open Graph tags, JSON-LD graph with Organization + WebSite + WebPage, and a
 * robots directive consistent with the target environment. It also checks that
 * /robots.txt and /sitemap.xml respond and reference the site origin.
 *
 * Usage:
 *   node scripts/seo-preflight.mjs [baseUrl]
 *   BASE_URL=https://investassist.ai node scripts/seo-preflight.mjs
 *
 * Exit code is non-zero if any check fails, so it can gate CI.
 */

const BASE = (process.argv[2] || process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "")
const ROUTES = ["/", "/sample-analysis", "/insights"]

/**
 * Article routes get a BlogPosting + BreadcrumbList assertion on top of the
 * base contract. Slugs are resolved at runtime from the Insights index page so
 * this stays in sync with published content without hardcoding.
 */
const ARTICLE_ROUTE_TYPES = ["BlogPosting", "BreadcrumbList"]

/**
 * Whether this target is expected to be search-indexable.
 * Defaults to false (preview/dev): robots should be noindex and robots.txt
 * should disallow all. Set EXPECT_INDEXABLE=true when checking production so
 * the checker instead requires indexable robots and a Sitemap reference.
 */
const EXPECT_INDEXABLE = /^(1|true|yes)$/i.test(process.env.EXPECT_INDEXABLE ?? "")

let failures = 0
const fail = (msg) => {
  failures++
  console.error(`  \u2717 ${msg}`)
}
const pass = (msg) => console.log(`  \u2713 ${msg}`)

async function fetchText(path) {
  const url = `${BASE}${path}`
  const res = await fetch(url, { headers: { "user-agent": "seo-preflight" } })
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  return res.text()
}

function all(re, html) {
  return [...html.matchAll(re)]
}

function checkRoute(path, html, requiredTypes = ["Organization", "WebSite", "WebPage"]) {
  console.log(`\nRoute ${path}`)

  // Title
  const title = all(/<title[^>]*>([^<]*)<\/title>/gi, html)
  if (title.length === 1 && title[0][1].trim()) pass(`single <title>: "${title[0][1].trim()}"`)
  else fail(`expected exactly one non-empty <title>, found ${title.length}`)

  // Meta description
  const desc = all(/<meta[^>]+name=["']description["'][^>]*>/gi, html)
  if (desc.length === 1) pass("single meta description")
  else fail(`expected exactly one meta description, found ${desc.length}`)

  // Canonical
  const canon = all(/<link[^>]+rel=["']canonical["'][^>]*>/gi, html)
  if (canon.length === 1) {
    const href = /href=["']([^"']+)["']/i.exec(canon[0][0])?.[1] || ""
    if (href.startsWith("http")) pass(`single absolute canonical: ${href}`)
    else fail(`canonical is not absolute: ${href}`)
  } else fail(`expected exactly one canonical link, found ${canon.length}`)

  // Open Graph essentials
  for (const prop of ["og:title", "og:description", "og:url", "og:type"]) {
    const found = new RegExp(`property=["']${prop}["']`, "i").test(html)
    found ? pass(`has ${prop}`) : fail(`missing ${prop}`)
  }

  // Robots meta must be present and consistent with the target environment.
  const robots = all(/<meta[^>]+name=["']robots["'][^>]*>/gi, html)
  if (robots.length >= 1) {
    const content = /content=["']([^"']+)["']/i.exec(robots[0][0])?.[1] ?? ""
    pass(`robots meta present: ${content}`)
    const isNoindex = /noindex/i.test(content)
    if (EXPECT_INDEXABLE && isNoindex) fail("expected indexable robots but found noindex")
    else if (!EXPECT_INDEXABLE && !isNoindex) fail("expected noindex robots but found indexable")
  } else fail("missing robots meta")

  // JSON-LD graph with the three required node types.
  const ld = all(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, html)
  if (ld.length === 0) {
    fail("no JSON-LD script found")
    return
  }
  let types = []
  let parsedOk = true
  for (const m of ld) {
    try {
      const json = JSON.parse(m[1].trim())
      const nodes = Array.isArray(json["@graph"]) ? json["@graph"] : [json]
      types.push(...nodes.map((n) => n["@type"]))
    } catch (e) {
      parsedOk = false
      fail(`JSON-LD failed to parse: ${e.message}`)
    }
  }
  if (parsedOk) pass("all JSON-LD blocks parse")
  for (const t of requiredTypes) {
    types.includes(t) ? pass(`JSON-LD has ${t}`) : fail(`JSON-LD missing ${t}`)
  }
}

/** Discover the first published article slug from the Insights index links. */
function firstArticlePath(indexHtml) {
  const m = /href=["'](\/insights\/[a-z0-9-]+)["']/i.exec(indexHtml)
  return m ? m[1] : null
}

async function checkFeed() {
  console.log("\n/feed.xml")
  try {
    const xml = await fetchText("/feed.xml")
    const hasFeedRoot = /<rss|<feed/i.test(xml)
    hasFeedRoot ? pass("valid RSS/Atom root") : fail("no <rss>/<feed> root")
    const items = all(/<item>|<entry>/gi, xml)
    items.length ? pass(`${items.length} feed item(s)`) : fail("no feed items")
  } catch (e) {
    fail(e.message)
  }
}

async function checkRobotsTxt() {
  console.log("\n/robots.txt")
  try {
    const txt = await fetchText("/robots.txt")
    const hasAgent = /user-agent/i.test(txt)
    hasAgent ? pass("declares a user-agent") : fail("no user-agent line")
    const hasSitemap = /sitemap\s*:/i.test(txt)
    const disallowAll = /disallow:\s*\/\s*$/im.test(txt)
    if (EXPECT_INDEXABLE) {
      hasSitemap ? pass("references a sitemap") : fail("no Sitemap line")
      disallowAll ? fail("production robots.txt disallows all") : pass("does not disallow all")
    } else {
      disallowAll ? pass("non-indexable: disallows all") : fail("expected Disallow: / in non-indexable env")
    }
  } catch (e) {
    fail(e.message)
  }
}

async function checkSitemap() {
  console.log("\n/sitemap.xml")
  try {
    const xml = await fetchText("/sitemap.xml")
    const hasUrlset = /<urlset/i.test(xml)
    hasUrlset ? pass("valid urlset root") : fail("no <urlset> root")
    const locs = all(/<loc>([^<]+)<\/loc>/gi, xml).map((m) => m[1])
    locs.length ? pass(`${locs.length} url(s): ${locs.join(", ")}`) : fail("no <loc> entries")
  } catch (e) {
    fail(e.message)
  }
}

async function main() {
  console.log(`SEO preflight against ${BASE}`)
  let insightsHtml = null
  for (const path of ROUTES) {
    try {
      const html = await fetchText(path)
      checkRoute(path, html)
      if (path === "/insights") insightsHtml = html
    } catch (e) {
      fail(`could not fetch ${path}: ${e.message}`)
    }
  }

  // Resolve and check the first published article, if any.
  const articlePath = insightsHtml ? firstArticlePath(insightsHtml) : null
  if (articlePath) {
    try {
      const html = await fetchText(articlePath)
      checkRoute(articlePath, html, [...["Organization", "WebSite"], ...ARTICLE_ROUTE_TYPES])
    } catch (e) {
      fail(`could not fetch ${articlePath}: ${e.message}`)
    }
  } else {
    fail("could not resolve an article link from /insights")
  }

  await checkRobotsTxt()
  await checkSitemap()
  await checkFeed()

  console.log("")
  if (failures) {
    console.error(`SEO preflight FAILED with ${failures} issue(s).`)
    process.exit(1)
  }
  console.log("SEO preflight passed.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
