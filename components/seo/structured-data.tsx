import {
  buildGraph,
  organizationSchema,
  webSiteSchema,
  webPageSchema,
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

/** Per-route WebPage JSON-LD. Render once inside each page. */
export function PageStructuredData(page: WebPageInput) {
  const graph = buildGraph([webPageSchema(page)])
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
