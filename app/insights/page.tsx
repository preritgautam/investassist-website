import type { Metadata } from "next"

import { getPublishedArticles, INSIGHTS_BASE_PATH } from "@/lib/insights"
import { absoluteUrl, robotsDirective, SITE_NAME } from "@/lib/seo-config"
import { InsightsShell } from "@/components/insights/insights-shell"
import { ArticleCard } from "@/components/insights/article-card"
import { PageStructuredData } from "@/components/seo/structured-data"
import { breadcrumbSchema } from "@/lib/structured-data"

import "../landing.css"
import "./insights.css"

const TITLE = "Insights — CRE underwriting, T-12 analysis & NOI reconciliation"
const DESCRIPTION =
  "Original, evidence-backed writing on multifamily underwriting: reading T-12 operating statements, rent roll analysis, NOI reconciliation, valuation, and deal screening."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: INSIGHTS_BASE_PATH },
  robots: robotsDirective(),
  openGraph: {
    type: "website",
    url: absoluteUrl(INSIGHTS_BASE_PATH),
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
}

export default function InsightsIndexPage() {
  const articles = getPublishedArticles()

  return (
    <InsightsShell>
      <PageStructuredData
        path={INSIGHTS_BASE_PATH}
        title={TITLE}
        description={DESCRIPTION}
        extra={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: INSIGHTS_BASE_PATH },
          ]),
        ]}
      />

      <section className="insights-hero">
        <div className="wrap">
          <div className="eyebrow">INSIGHTS</div>
          <h1>Underwriting, read closely.</h1>
          <p>
            Field notes on reading a deal beneath the deal — T-12 analysis, rent roll extraction, NOI reconciliation,
            valuation, and screening. Written for buy-side investors who underwrite their own opportunities.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="insights-grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </InsightsShell>
  )
}
