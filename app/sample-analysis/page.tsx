import type { Metadata } from "next"
import Link from "next/link"
import { BrandMark } from "@/components/ui/brand-logo"
import { StatusIcon } from "@/components/ui/status-icon"
import { getAppUrl } from "@/lib/utils"
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  MapPin,
  TrendingUp,
  Gauge,
  DollarSign,
  Percent,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react"
import { FeatureShowcase } from "@/components/landing/feature-showcase"
import { PageStructuredData } from "@/components/seo/structured-data"
import { getSiteUrl } from "@/lib/seo-config"

const siteUrl = getSiteUrl()

const SAMPLE_TITLE = "Sample CRE Underwriting Analysis"
const SAMPLE_DESCRIPTION =
  "See a full InvestAssist underwriting analysis on a sample 148-unit multifamily deal — in-place and stabilized NOI, cap rate, valuation range, OM-extracted rent and sales comps, and a benchmarked verdict."

export const metadata: Metadata = {
  title: SAMPLE_TITLE,
  description: SAMPLE_DESCRIPTION,
  alternates: { canonical: "/sample-analysis" },
  openGraph: {
    type: "article",
    url: `${siteUrl}/sample-analysis`,
    title: "Sample CRE Underwriting Analysis | InvestAssist",
    description:
      "A full underwriting read on a sample 148-unit multifamily deal — NOI, cap rate, valuation, comps, and a benchmarked verdict.",
  },
}

const keyMetrics = [
  { label: "Purchase price", value: "$25.9M", icon: DollarSign, note: "$175K / unit" },
  { label: "In-place cap rate", value: "5.71%", icon: Percent, note: "On $1.48M NOI" },
  { label: "Stabilized cap rate", value: "6.26%", icon: Gauge, note: "On $1.62M NOI" },
  { label: "Going-in DSCR", value: "1.28x", icon: TrendingUp, note: "65% LTV @ 6.5%" },
]

const rentComps = [
  { property: "The Maddox", distance: "0.4 mi", rentPsf: "$1.72", avgRent: "$1,610" },
  { property: "Parkline Flats", distance: "0.9 mi", rentPsf: "$1.66", avgRent: "$1,575" },
  { property: "Cedar & 7th", distance: "1.3 mi", rentPsf: "$1.58", avgRent: "$1,498" },
  { property: "Subject (in-place)", distance: "—", rentPsf: "$1.49", avgRent: "$1,548", subject: true },
]

const salesComps = [
  { property: "Riverside Commons", price: "$31.4M", perUnit: "$182K", capRate: "5.9%", date: "Q4 2024" },
  { property: "Halcyon Apartments", price: "$22.8M", perUnit: "$171K", capRate: "6.1%", date: "Q3 2024" },
  { property: "Westgate 220", price: "$40.1M", perUnit: "$188K", capRate: "5.7%", date: "Q2 2024" },
]

const strengths = [
  "In-place rents sit ~6% below the rent-comp set, supporting a credible loss-to-lease capture.",
  "Going-in cap rate (5.71%) is inside the submarket sales-comp band of 5.7%–6.1%.",
  "Unit mix skews to durable 2BR product (49% of units) with the deepest comp support.",
]

const risks = [
  "Seller pro forma assumes a 9% rent bump in year one — nearly double the comp-implied trend.",
  "Two months of the T-12 are annualized, not actuals; expense ratio may be understated.",
  "Exit cap of 5.75% is more aggressive than today's 6.25% market; value is cap-rate sensitive.",
]

const card = "min-w-0 rounded border border-border bg-card text-card-foreground"
const th = "py-2 text-caption font-semibold uppercase tracking-wider text-muted-foreground"
const sectionTitle = "text-2xl md:text-3xl font-bold text-foreground text-balance"

export default function SampleAnalysisPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <PageStructuredData path="/sample-analysis" title={SAMPLE_TITLE} description={SAMPLE_DESCRIPTION} />

      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="page-container flex items-center justify-between py-4">
          <BrandMark width={140} />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-pill px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Back
          </Link>
        </div>
      </nav>

      <main className="page-container section-stack py-8 md:py-12">
        <div className="inline-flex w-fit items-center gap-2 rounded-pill border border-border bg-muted px-4 py-1.5 text-xs font-semibold text-muted-foreground">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Sample analysis · illustrative figures
        </div>

        <section data-slot="card" className={`${card} card-pad`}>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-brand-text">
                <Building2 className="size-5" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider">148-Unit Multifamily</span>
              </div>
              <h1 className="mb-2 text-3xl font-bold text-foreground text-balance md:text-4xl">
                Maple Grove Apartments
              </h1>
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-4 shrink-0" aria-hidden="true" /> Garden-style · Sun Belt submarket · Built 2012
              </p>
            </div>
            <div className="rounded border border-border bg-muted px-5 py-4 text-center">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Verdict</p>
              <p className="text-lg font-bold text-foreground">Proceed with conditions</p>
              <p className="mt-1 text-xs text-muted-foreground">Underwrites at the comp band, not the pitch</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="key-metrics">
          <h2 id="key-metrics" className="sr-only">Key metrics</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {keyMetrics.map((m) => (
              <div key={m.label} data-slot="card" className={`${card} card-pad`}>
                <div className="mb-3 flex size-9 items-center justify-center rounded bg-surface-muted">
                  <m.icon className="size-4 text-accent-foreground" aria-hidden="true" />
                </div>
                <p className="text-2xl font-extrabold text-foreground">{m.value}</p>
                <p className="text-sm font-medium text-foreground">{m.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="financials" className="flex flex-col gap-6">
          <h2 id="financials" className={sectionTitle}>
            Financials &amp; Valuation
          </h2>
          <FeatureShowcase />
        </section>

        <section aria-labelledby="comps" className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 id="comps" className={sectionTitle}>
              Comps Pulled Straight From the OM
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground text-pretty">
              Rent and sales comparables extracted from the offering memorandum and benchmarked against the
              subject — no separate data subscription required.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div data-slot="card" className={`${card} card-pad`}>
              <h3 className="mb-4 text-lg font-bold text-foreground">Rent Comparables</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className={`${th} pr-2 md:pr-3`}>Property</th>
                      <th className={`${th} px-2 text-right md:px-3`}>Dist.</th>
                      <th className={`${th} px-2 text-right md:px-3`}>$/SF</th>
                      <th className={`${th} pl-2 text-right md:pl-3`}>Avg Rent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentComps.map((c) => (
                      <tr key={c.property} className={`border-b border-border last:border-0 ${c.subject ? "bg-highlight" : ""}`}>
                        <td className="py-2.5 pr-2 text-sm font-medium text-foreground md:pr-3">{c.property}</td>
                        <td className="px-2 py-2.5 text-right text-sm text-muted-foreground md:px-3">{c.distance}</td>
                        <td className="px-2 py-2.5 text-right text-sm text-foreground md:px-3">{c.rentPsf}</td>
                        <td className="py-2.5 pl-2 text-right text-sm font-bold text-foreground md:pl-3">{c.avgRent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Subject in-place rent of $1,548 sits ~6% below the comp average — supporting upside.
              </p>
            </div>

            <div data-slot="card" className={`${card} card-pad`}>
              <h3 className="mb-4 text-lg font-bold text-foreground">Sales Comparables</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className={`${th} pr-2 md:pr-3`}>Property</th>
                      <th className={`${th} px-1.5 text-right md:px-3`}>Price</th>
                      <th className={`${th} px-1.5 text-right md:px-3`}>$/Unit</th>
                      <th className={`${th} px-1.5 text-right md:px-3`}>Cap</th>
                      <th className={`${th} pl-1.5 text-right md:pl-3`}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesComps.map((c) => (
                      <tr key={c.property} className="border-b border-border last:border-0">
                        <td className="py-2.5 pr-2 text-sm font-medium text-foreground md:pr-3">{c.property}</td>
                        <td className="px-1.5 py-2.5 text-right text-sm text-foreground md:px-3">{c.price}</td>
                        <td className="px-1.5 py-2.5 text-right text-sm text-foreground md:px-3">{c.perUnit}</td>
                        <td className="px-1.5 py-2.5 text-right text-sm font-bold text-foreground md:px-3">{c.capRate}</td>
                        <td className="py-2.5 pl-1.5 text-right text-sm text-muted-foreground md:pl-3">{c.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Going-in cap of 5.71% prices inside the 5.7%–6.1% submarket band.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="verdict" className="flex flex-col gap-6">
          <h2 id="verdict" className={sectionTitle}>
            The Benchmarked Verdict
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div data-slot="card" className={`${card} card-pad`}>
              <div className="mb-4 flex items-center gap-2">
                <StatusIcon icon={CheckCircle2} tone="success" size="md" />
                <h3 className="text-lg font-bold text-foreground">What checks out</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <StatusIcon icon={CheckCircle2} tone="success" className="mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-slot="card" className={`${card} card-pad`}>
              <div className="mb-4 flex items-center gap-2">
                <StatusIcon icon={AlertTriangle} tone="warning" size="md" />
                <h3 className="text-lg font-bold text-foreground">What to question</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {risks.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <StatusIcon icon={AlertTriangle} tone="warning" className="mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section data-slot="card" className={`${card} card-pad text-center md:p-12`}>
          <h2 className={`${sectionTitle} mb-3`}>Run This on Your Own Deal</h2>
          <p className="mx-auto mb-7 max-w-xl text-muted-foreground text-pretty">
            Upload a T-12, rent roll, and offering memorandum and get this exact analysis on your next deal —
            benchmarked, auditable, and ready in minutes.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={getAppUrl("/auth")}
              data-analytics="sample-analysis-cta"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-action-hover"
            >
              Underwrite Your First Deal <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-border bg-card px-8 py-4 text-base font-bold text-foreground transition-colors hover:bg-muted"
            >
              See Pricing
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
