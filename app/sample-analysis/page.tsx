import type { Metadata } from "next"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
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
import { designSystem } from "@/lib/design-system"

const neu = {
  card: designSystem.cards.neo,
  inset: designSystem.cards.inset,
  btn: designSystem.buttons.secondary,
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://investassist.clik.ai"

export const metadata: Metadata = {
  title: "Sample CRE Underwriting Analysis",
  description:
    "See a full InvestAssist underwriting analysis on a sample 148-unit multifamily deal — in-place and stabilized NOI, cap rate, valuation range, OM-extracted rent and sales comps, and a benchmarked verdict.",
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
  { property: "The Maddox", distance: "0.4 mi", rentPsf: "$1.72", avgRent: "$1,610", vintage: "2019" },
  { property: "Parkline Flats", distance: "0.9 mi", rentPsf: "$1.66", avgRent: "$1,575", vintage: "2016" },
  { property: "Cedar & 7th", distance: "1.3 mi", rentPsf: "$1.58", avgRent: "$1,498", vintage: "2014" },
  { property: "Subject (in-place)", distance: "—", rentPsf: "$1.49", avgRent: "$1,548", vintage: "2012", subject: true },
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

export default function SampleAnalysisPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-app">
      {/* Institutional dashboard background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ background: designSystem.backgrounds.dashboard }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-4 py-4 border-b border-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo priority />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </nav>

      <main className="relative z-10 px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Sample banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 bg-white/50 border border-white/60 mb-8">
            <ShieldCheck className="w-3.5 h-3.5" />
            Sample analysis · illustrative figures
          </div>

          {/* Deal header */}
          <section className="rounded-2xl p-6 md:p-8 mb-8" style={neu.card}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-brand-800 mb-2">
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">148-Unit Multifamily</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 text-balance">
                  Maple Grove Apartments
                </h1>
                <p className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="w-4 h-4" /> Garden-style · Sun Belt submarket · Built 2012
                </p>
              </div>
              <div className="rounded-xl px-5 py-4 text-center" style={neu.inset}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Verdict</p>
                <p className="text-lg font-bold text-brand-800">Proceed with conditions</p>
                <p className="text-xs text-slate-600 mt-1">Underwrites at the comp band, not the pitch</p>
              </div>
            </div>
          </section>

          {/* Key metrics */}
          <section aria-labelledby="key-metrics" className="mb-12">
            <h2 id="key-metrics" className="sr-only">Key metrics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {keyMetrics.map((m) => (
                <div key={m.label} className="rounded-2xl p-5" style={neu.card}>
                  <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center mb-3">
                    <m.icon className="w-4.5 h-4.5 text-brand-800" />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">{m.value}</p>
                  <p className="text-sm font-medium text-slate-700">{m.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{m.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NOI bridge + valuation scenarios */}
          <section aria-labelledby="financials" className="mb-12">
            <h2 id="financials" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-balance">
              Financials &amp; Valuation
            </h2>
            <FeatureShowcase />
          </section>

          {/* Comps extracted from the OM */}
          <section aria-labelledby="comps" className="mb-12">
            <h2 id="comps" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-balance">
              Comps Pulled Straight From the OM
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl text-pretty text-base">
              Rent and sales comparables extracted from the offering memorandum and benchmarked against
              the subject — no separate data subscription required.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Rent comps */}
              <div className="rounded-2xl p-6 md:p-7" style={neu.card}>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Rent Comparables</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Property</th>
                        <th className="py-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Dist.</th>
                        <th className="py-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">$/SF</th>
                        <th className="py-2 pl-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Avg Rent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentComps.map((c) => (
                        <tr key={c.property} className={`border-b border-slate-100 last:border-0 ${c.subject ? "bg-brand-50/30" : ""}`}>
                          <td className="py-2.5 pr-3 text-sm font-medium text-slate-800">{c.property}</td>
                          <td className="py-2.5 px-3 text-sm text-right text-slate-500">{c.distance}</td>
                          <td className="py-2.5 px-3 text-sm text-right text-slate-700">{c.rentPsf}</td>
                          <td className="py-2.5 pl-3 text-sm text-right font-bold text-slate-900">{c.avgRent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Subject in-place rent of $1,548 sits ~6% below the comp average — supporting upside.
                </p>
              </div>

              {/* Sales comps */}
              <div className="rounded-2xl p-6 md:p-7" style={neu.card}>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Sales Comparables</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Property</th>
                        <th className="py-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Price</th>
                        <th className="py-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">$/Unit</th>
                        <th className="py-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Cap</th>
                        <th className="py-2 pl-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesComps.map((c) => (
                        <tr key={c.property} className="border-b border-slate-100 last:border-0">
                          <td className="py-2.5 pr-3 text-sm font-medium text-slate-800">{c.property}</td>
                          <td className="py-2.5 px-3 text-sm text-right text-slate-700">{c.price}</td>
                          <td className="py-2.5 px-3 text-sm text-right text-slate-700">{c.perUnit}</td>
                          <td className="py-2.5 px-3 text-sm text-right font-bold text-slate-900">{c.capRate}</td>
                          <td className="py-2.5 pl-3 text-sm text-right text-slate-500">{c.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Going-in cap of 5.71% prices inside the 5.7%–6.1% submarket band.
                </p>
              </div>
            </div>
          </section>

          {/* Verdict: strengths + risks */}
          <section aria-labelledby="verdict" className="mb-12">
            <h2 id="verdict" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-balance">
              The Benchmarked Verdict
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6 md:p-7" style={neu.card}>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-900">What checks out</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6 md:p-7" style={neu.card}>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-bold text-slate-900">What to question</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {risks.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl p-8 md:p-12 text-center" style={neu.card}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-balance">
              Run This on Your Own Deal
            </h2>
            <p className="text-slate-600 mb-7 max-w-xl mx-auto text-pretty">
              Upload a T-12, rent roll, and offering memorandum and get this exact analysis on your next deal —
              benchmarked, auditable, and ready in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getAppUrl("/auth")}
                data-analytics="sample-analysis-cta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ ...designSystem.buttons.primary }}
              >
                Underwrite Your First Deal <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={neu.btn}
              >
                See Pricing
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
