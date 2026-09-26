/**
 * Editorial content model for InvestAssist Insights.
 *
 * Articles are code-defined (no CMS): each is an original, evidence-backed
 * piece on CRE underwriting. Content is expressed as a small set of typed
 * blocks so the article template can server-render structured HTML with
 * enforced accessibility (every image/figure REQUIRES descriptive alt text)
 * and derive metadata (reading time, structured data) without markdown parsing.
 */

export type Author = {
  /** Full display name, e.g. "The InvestAssist Team". */
  name: string
  /** Short role/byline line shown under the name. */
  role: string
}

/** A YouTube video attached to an article, with metadata for VideoObject JSON-LD. */
export type ArticleVideo = {
  /** YouTube video id (the v= value), never a full URL. */
  youtubeId: string
  /** Human title of the video — also used as the iframe title for a11y. */
  title: string
  /** One-line description used in VideoObject.description. */
  description: string
  /** ISO 8601 upload date for VideoObject.uploadDate. */
  uploadDate: string
  /** ISO 8601 duration, e.g. "PT6M32S". Optional. */
  duration?: string
}

/**
 * A single rendered block of article body content. A closed union keeps the
 * template exhaustive and forces alt text on anything visual.
 */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "figure"; src: string; alt: string; caption?: string }
  | { type: "video"; video: ArticleVideo }

export type Article = {
  /** URL slug under /insights/<slug>. Lowercase, hyphenated, unique. */
  slug: string
  /** <title> and H1 for the article. */
  title: string
  /** Meta description + OG description. ~150-160 chars. */
  description: string
  /** Short summary shown on the Insights index cards. */
  excerpt: string
  /** Editorial topic label (display only — never becomes an indexable URL). */
  topic: string
  author: Author
  /** ISO 8601 publish date. */
  publishedAt: string
  /** ISO 8601 last-modified date (>= publishedAt). */
  updatedAt: string
  /** Ordered body blocks. */
  body: ArticleBlock[]
  /** Slugs of related articles for internal linking (must resolve to real articles). */
  relatedSlugs: string[]
  /** Optional lead image. When present, alt text is REQUIRED. */
  heroImage?: { src: string; alt: string }
  /** Set false to keep an article out of the site (draft). Defaults to published. */
  draft?: boolean
}
