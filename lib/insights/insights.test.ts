import { test } from "node:test"
import assert from "node:assert/strict"

import { ARTICLES } from "./articles"
import {
  articlePath,
  formatArticleDate,
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
  INSIGHTS_BASE_PATH,
  readingMinutes,
} from "./index"
import { blogPostingSchema, breadcrumbSchema, buildGraph } from "../structured-data"

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

test("every article has a unique, well-formed slug", () => {
  const slugs = ARTICLES.map((a) => a.slug)
  assert.equal(new Set(slugs).size, slugs.length, "slugs must be unique")
  for (const slug of slugs) assert.match(slug, SLUG_RE, `slug "${slug}" must be url-safe`)
})

test("articles carry valid dates with updatedAt >= publishedAt", () => {
  for (const a of ARTICLES) {
    assert.match(a.publishedAt, ISO_DATE_RE, `${a.slug} publishedAt`)
    assert.match(a.updatedAt, ISO_DATE_RE, `${a.slug} updatedAt`)
    assert.ok(
      new Date(a.updatedAt).getTime() >= new Date(a.publishedAt).getTime(),
      `${a.slug}: updatedAt must be >= publishedAt`,
    )
  }
})

test("meta descriptions are within a sensible length band", () => {
  for (const a of ARTICLES) {
    assert.ok(a.description.length >= 50, `${a.slug}: description too short`)
    assert.ok(a.description.length <= 200, `${a.slug}: description too long`)
  }
})

test("every figure and hero image has non-empty alt text", () => {
  for (const a of ARTICLES) {
    if (a.heroImage) assert.ok(a.heroImage.alt.trim().length > 0, `${a.slug}: hero alt required`)
    for (const block of a.body) {
      if (block.type === "figure") {
        assert.ok(block.alt.trim().length > 0, `${a.slug}: figure alt required`)
      }
    }
  }
})

test("relatedSlugs resolve to real, non-self articles", () => {
  const known = new Set(ARTICLES.map((a) => a.slug))
  for (const a of ARTICLES) {
    for (const rel of a.relatedSlugs) {
      assert.ok(known.has(rel), `${a.slug}: relatedSlug "${rel}" must exist`)
      assert.notEqual(rel, a.slug, `${a.slug}: cannot relate to itself`)
    }
  }
})

test("getPublishedArticles excludes drafts and sorts newest first", () => {
  const published = getPublishedArticles()
  assert.ok(published.every((a) => !a.draft), "no drafts in published list")
  for (let i = 1; i < published.length; i++) {
    assert.ok(
      new Date(published[i - 1].publishedAt).getTime() >= new Date(published[i].publishedAt).getTime(),
      "published articles must be sorted newest-first",
    )
  }
})

test("articlePath composes under the insights base path", () => {
  assert.equal(articlePath("foo-bar"), `${INSIGHTS_BASE_PATH}/foo-bar`)
})

test("getArticleBySlug round-trips a known article", () => {
  const first = getPublishedArticles()[0]
  assert.ok(first, "expected at least one published article")
  assert.equal(getArticleBySlug(first.slug)?.slug, first.slug)
  assert.equal(getArticleBySlug("does-not-exist"), undefined)
})

test("getRelatedArticles never returns the current article and respects the limit", () => {
  for (const a of getPublishedArticles()) {
    const related = getRelatedArticles(a.slug, 2)
    assert.ok(related.length <= 2, `${a.slug}: at most 2 related`)
    assert.ok(!related.some((r) => r.slug === a.slug), `${a.slug}: excludes self`)
  }
})

test("readingMinutes is always at least one minute", () => {
  for (const a of ARTICLES) {
    assert.ok(readingMinutes(a) >= 1, `${a.slug}: reading time >= 1`)
  }
})

test("formatArticleDate is timezone-stable (UTC)", () => {
  assert.equal(formatArticleDate("2026-01-14"), "January 14, 2026")
})

test("blogPostingSchema produces a valid BlogPosting with cross-refs", () => {
  const a = getPublishedArticles()[0]
  const node = blogPostingSchema(a) as Record<string, any>
  assert.equal(node["@type"], "BlogPosting")
  assert.equal(node.headline, a.title)
  assert.equal(node.datePublished, a.publishedAt)
  assert.equal(node.dateModified, a.updatedAt)
  assert.ok(node.publisher["@id"].endsWith("/#organization"), "publisher references org @id")
})

test("breadcrumbSchema numbers positions from 1 in order", () => {
  const node = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Insights", path: INSIGHTS_BASE_PATH },
  ]) as Record<string, any>
  assert.equal(node["@type"], "BreadcrumbList")
  assert.deepEqual(
    node.itemListElement.map((el: any) => el.position),
    [1, 2],
  )
})

test("buildGraph wraps nodes in a schema.org @graph", () => {
  const graph = buildGraph([blogPostingSchema(getPublishedArticles()[0])]) as Record<string, any>
  assert.equal(graph["@context"], "https://schema.org")
  assert.ok(Array.isArray(graph["@graph"]))
})
