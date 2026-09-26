import {
  buildGraph,
  organizationSchema,
  webSiteSchema,
  webPageSchema,
  softwareApplicationSchema,
  type JsonLdNode,
  type WebPageInput,
} from "@/lib/structured-data"

/** Site-wide Organization + WebSite JSON-LD. Render once, in the root layout. */
export function SiteStructuredData() {
  const graph = buildGraph([organizationSchema(), webSiteSchema()])
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user-controlled content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}

/**
 * Per-route WebPage JSON-LD, optionally accompanied by extra nodes
 * (e.g. BreadcrumbList, SoftwareApplication) folded into the same @graph.
 */
export function PageStructuredData({ extra, ...page }: WebPageInput & { extra?: JsonLdNode[] }) {
  const graph = buildGraph([webPageSchema(page), ...(extra ?? [])])
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}

/** SoftwareApplication node for the product, for use in a page's `extra`. */
export function homeSoftwareApplicationNode(): JsonLdNode {
  return softwareApplicationSchema()
}
