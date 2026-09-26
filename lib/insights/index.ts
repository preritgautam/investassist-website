import { ARTICLES } from "./articles"
import type { Article, ArticleBlock } from "./types"

export type { Article, ArticleBlock, ArticleVideo, Author } from "./types"
export { ARTICLES } from "./articles"

export const INSIGHTS_BASE_PATH = "/insights"

/** Path for a given article slug. */
export function articlePath(slug: string): string {
  return `${INSIGHTS_BASE_PATH}/${slug}`
}

/** All published (non-draft) articles, newest first. */
export function getPublishedArticles(): Article[] {
  return ARTICLES.filter((a) => !a.draft).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

/** Resolve a single published article by slug, or undefined. */
export function getArticleBySlug(slug: string): Article | undefined {
  return getPublishedArticles().find((a) => a.slug === slug)
}

/**
 * Related articles for a given article, resolved from its relatedSlugs and
 * filtered to published pieces. Falls back to other recent articles if the
 * explicit list is empty, so the section is never blank.
 */
export function getRelatedArticles(slug: string, limit = 2): Article[] {
  const current = getArticleBySlug(slug)
  if (!current) return []
  const bySlug = new Map(getPublishedArticles().map((a) => [a.slug, a]))
  const explicit = current.relatedSlugs
    .map((s) => bySlug.get(s))
    .filter((a): a is Article => Boolean(a) && a!.slug !== slug)
  if (explicit.length >= limit) return explicit.slice(0, limit)
  const fallback = getPublishedArticles().filter(
    (a) => a.slug !== slug && !explicit.some((e) => e.slug === a.slug),
  )
  return [...explicit, ...fallback].slice(0, limit)
}

const WORDS_PER_MINUTE = 220

function blockWordCount(block: ArticleBlock): number {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "subheading":
      return block.text.trim().split(/\s+/).filter(Boolean).length
    case "callout":
      return `${block.title ?? ""} ${block.text}`.trim().split(/\s+/).filter(Boolean).length
    case "list":
      return block.items.join(" ").trim().split(/\s+/).filter(Boolean).length
    case "figure":
      return `${block.caption ?? ""}`.trim().split(/\s+/).filter(Boolean).length
    case "video":
      return `${block.video.title} ${block.video.description}`.trim().split(/\s+/).filter(Boolean).length
  }
}

/** Estimated reading time in whole minutes (min 1), derived from body text. */
export function readingMinutes(article: Article): number {
  const words = article.body.reduce((sum, b) => sum + blockWordCount(b), 0)
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** Format an ISO date as a human, locale-stable label (e.g. "January 14, 2026"). */
export function formatArticleDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}
