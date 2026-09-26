import type { Article } from "@/lib/insights"
import { articlePath, formatArticleDate, readingMinutes } from "@/lib/insights"

/** Compact article summary used on the Insights index and related lists. */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <span className="topic">{article.topic}</span>
      <h2>
        <a className="card-link" href={articlePath(article.slug)}>
          {article.title}
        </a>
      </h2>
      <p>{article.excerpt}</p>
      <div className="meta">
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
        <span className="dot" aria-hidden="true">
          ·
        </span>
        <span>{readingMinutes(article)} min read</span>
      </div>
    </article>
  )
}
