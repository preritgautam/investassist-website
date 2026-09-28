import { SITE_NAME, SITE_DESCRIPTION, getSiteUrl, absoluteUrl } from "./seo-config"
import type { Article, ArticleVideo } from "./insights/types"
import { BRAND_LOGO_RASTER } from "./brand"

/**
 * Schema.org JSON-LD builders. Organization and WebSite are site-wide and
 * cross-referenced by @id; WebPage is per-route and linked back to the WebSite
 * via isPartOf. Rendered as a single @graph by components/seo/structured-data.
 */

export type JsonLdNode = Record<string, unknown>

export function organizationId(): string {
  return `${getSiteUrl()}/#organization`
}

export function webSiteId(): string {
  return `${getSiteUrl()}/#website`
}

export function organizationSchema(): JsonLdNode {
  const url = getSiteUrl()
  return {
    "@type": "Organization",
    "@id": organizationId(),
    name: SITE_NAME,
    url: `${url}/`,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(BRAND_LOGO_RASTER),
    },
    description: SITE_DESCRIPTION,
  }
}

export function webSiteSchema(): JsonLdNode {
  const url = getSiteUrl()
  return {
    "@type": "WebSite",
    "@id": webSiteId(),
    name: SITE_NAME,
    url: `${url}/`,
    description: SITE_DESCRIPTION,
    publisher: { "@id": organizationId() },
  }
}

export type WebPageInput = {
  path: string
  title: string
  description: string
}

export function webPageSchema({ path, title, description }: WebPageInput): JsonLdNode {
  const url = absoluteUrl(path)
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": webSiteId() },
    about: { "@id": organizationId() },
  }
}

/**
 * SoftwareApplication node for the product itself. Rendered on the homepage
 * alongside Organization/WebSite. Advertises the free trial via an Offer.
 */
export function softwareApplicationSchema(): JsonLdNode {
  const url = getSiteUrl()
  return {
    "@type": "SoftwareApplication",
    "@id": `${url}/#software`,
    name: SITE_NAME,
    url: `${url}/`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    publisher: { "@id": organizationId() },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "20 free credits — no credit card required",
    },
  }
}

/** VideoObject node for an embedded YouTube video. */
export function videoObjectSchema(video: ArticleVideo): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    uploadDate: video.uploadDate,
    thumbnailUrl: [`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`],
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
  }
  if (video.duration) node.duration = video.duration
  return node
}

/**
 * BlogPosting node for an article. Cross-references the Organization as
 * publisher and carries author, publish, and modified dates.
 */
export function blogPostingSchema(article: Article): JsonLdNode {
  const url = absoluteUrl(`/insights/${article.slug}`)
  const video = article.body.find((b) => b.type === "video")
  const node: JsonLdNode = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    url,
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.author.name, url: `${getSiteUrl()}/` },
    publisher: { "@id": organizationId() },
    isPartOf: { "@id": webSiteId() },
    articleSection: article.topic,
  }
  if (article.heroImage) {
    node.image = [absoluteUrl(article.heroImage.src)]
  }
  if (video && video.type === "video") {
    node.video = videoObjectSchema(video.video)
  }
  return node
}

export type BreadcrumbItem = { name: string; path: string }

/** BreadcrumbList node from an ordered list of crumbs. */
export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Wrap nodes into a single schema.org @graph document. */
export function buildGraph(nodes: JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  }
}
