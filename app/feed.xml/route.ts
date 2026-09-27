import { absoluteUrl, SITE_NAME, SITE_DESCRIPTION, shouldIndex } from "@/lib/seo-config"
import { articlePath, getPublishedArticles } from "@/lib/insights"

/** Escape a string for inclusion in XML text/attribute content. */
function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export const dynamic = "force-static"

export function GET(): Response {
  const articles = getPublishedArticles()
  const feedUrl = absoluteUrl("/feed.xml")
  const siteUrl = absoluteUrl("/")
  const lastBuild = (articles[0] ? new Date(`${articles[0].updatedAt}T00:00:00Z`) : new Date()).toUTCString()

  const items = articles
    .map((article) => {
      const url = absoluteUrl(articlePath(article.slug))
      const pubDate = new Date(`${article.publishedAt}T00:00:00Z`).toUTCString()
      return `    <item>
      <title>${xmlEscape(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${xmlEscape(article.topic)}</category>
      <description>${xmlEscape(article.excerpt)}</description>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(`${SITE_NAME} — Insights`)}</title>
    <link>${absoluteUrl("/insights")}</link>
    <description>${xmlEscape(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      // Do not let non-production feeds be cached/discovered aggressively.
      "Cache-Control": shouldIndex() ? "public, max-age=3600, s-maxage=3600" : "no-store",
      "X-Robots-Tag": shouldIndex() ? "all" : "noindex",
    },
  })
}
