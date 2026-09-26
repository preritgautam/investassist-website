import { SITE_NAME, SITE_DESCRIPTION, getSiteUrl, absoluteUrl } from "./seo-config"

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
      url: absoluteUrl("/brand/investassist-blue.svg"),
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

/** Wrap nodes into a single schema.org @graph document. */
export function buildGraph(nodes: JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  }
}
