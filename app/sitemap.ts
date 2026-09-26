import type { MetadataRoute } from "next"

import { absoluteUrl, SITEMAP_ROUTES } from "@/lib/seo-config"
import { articlePath, getPublishedArticles, INSIGHTS_BASE_PATH } from "@/lib/insights"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = SITEMAP_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const articles = getPublishedArticles()

  const insightsIndex: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(INSIGHTS_BASE_PATH),
      lastModified: articles[0] ? new Date(`${articles[0].updatedAt}T00:00:00Z`) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(articlePath(article.slug)),
    lastModified: new Date(`${article.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticEntries, ...insightsIndex, ...articleEntries]
}
