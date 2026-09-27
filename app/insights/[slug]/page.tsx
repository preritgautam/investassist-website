import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAppUrl } from "@/lib/utils"
import {
  articlePath,
  formatArticleDate,
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
  INSIGHTS_BASE_PATH,
  readingMinutes,
} from "@/lib/insights"
import { absoluteUrl, robotsDirective, SITE_NAME } from "@/lib/seo-config"
import { blogPostingSchema, breadcrumbSchema, buildGraph } from "@/lib/structured-data"
import { InsightsShell } from "@/components/insights/insights-shell"
import { ArticleBody } from "@/components/insights/article-body"
import { ArticleCard } from "@/components/insights/article-card"

type Params = { slug: string }

/** Pre-render every published article at build time. */
export function generateStaticParams(): Params[] {
  return getPublishedArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  const url = absoluteUrl(articlePath(slug))
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: articlePath(slug) },
    robots: robotsDirective(),
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      ...(article.heroImage ? { images: [{ url: absoluteUrl(article.heroImage.src), alt: article.heroImage.alt }] } : {}),
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.description },
  }
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(slug)
  const authUrl = getAppUrl("/auth")

  const graph = buildGraph([
    blogPostingSchema(article),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Insights", path: INSIGHTS_BASE_PATH },
      { name: article.title, path: articlePath(slug) },
    ]),
  ])

  return (
    <InsightsShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <div className="wrap article">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="sep" aria-hidden="true">
            /
          </span>
          <a href={INSIGHTS_BASE_PATH}>Insights</a>
          <span className="sep" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{article.topic}</span>
        </nav>

        <header className="article-header">
          <span className="topic">{article.topic}</span>
          <h1>{article.title}</h1>
          <p className="lead">{article.description}</p>
          <div className="article-byline">
            <span className="who">{article.author.name}</span>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <span>{article.author.role}</span>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
            {article.updatedAt !== article.publishedAt ? (
              <>
                <span className="dot" aria-hidden="true">
                  ·
                </span>
                <span>Updated {formatArticleDate(article.updatedAt)}</span>
              </>
            ) : null}
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <span>{readingMinutes(article)} min read</span>
          </div>
        </header>

        {article.heroImage ? (
          <div className="prose">
            <figure>
              <img src={article.heroImage.src || "/placeholder.svg"} alt={article.heroImage.alt} />
            </figure>
          </div>
        ) : null}

        <ArticleBody blocks={article.body} />

        <aside className="article-cta">
          <h2>See it on your own deal</h2>
          <p>Upload a T-12, rent roll and OM and get a reconciled operating picture in minutes.</p>
          <a className="btn" href={authUrl} data-analytics="insights-article-cta">
            Analyze your first deal free <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>

      {related.length > 0 ? (
        <div className="wrap">
          <section className="related" aria-label="Related articles">
            <h2>Related reading</h2>
            <div className="related-grid">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} />
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </InsightsShell>
  )
}
