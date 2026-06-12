import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Check,
  Sparkles,
  Upload,
  FileText,
  BarChart3,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Building2,
  Target,
  Eye,
  Lightbulb,
  LogIn,
  UserPlus,
} from "lucide-react"
import { ProductWalkthrough } from "@/components/landing/product-walkthrough"
import { FeatureShowcase } from "@/components/landing/feature-showcase"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
import { HeroInput } from "@/components/landing/hero-input"
import { PersonaTabs } from "@/components/landing/persona-tabs"
import { Reveal } from "@/components/landing/reveal"
import { NeuralNetworkCanvas } from "@/components/landing/neural-network-canvas"
import { buildAuthUrl, buildMainAppUrl, buildSignupUrl } from "@/lib/app-url"
import { cn } from "@/lib/utils"
import { designSystem, LOGO_PATH, LOGO_ALT } from "@/lib/design-system"

// Neumorphic style constants matching the platform
const neu = {
  card: designSystem.cards.neo,
  inset: designSystem.cards.inset,
  btn: designSystem.buttons.secondary,
}

const whyItWorks = [
  {
    icon: ShieldCheck,
    title: "Trust the documents, not the pitch",
    description:
      "Underwritten from your actual T-12, rent roll, and OM — never a scraped listing or a headline cap rate.",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    icon: BarChart3,
    title: "Benchmark every assumption",
    description:
      "Each metric is measured against market data, so inflated income and aggressive pro formas are obvious at a glance.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Eye,
    title: "Catch the red flags first",
    description:
      "Missing months, below-market rents, deferred maintenance, optimistic exits — surfaced before they cost you.",
    color: "text-slate-700",
    bgColor: "bg-slate-100",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Add the Address & Documents",
    description:
      "Enter the property address and upload the T-12, Rent Roll, or Offering Memorandum. PDFs, Excel, and scans all work.",
    icon: Upload,
  },
  {
    step: "02",
    title: "AI Extracts & Benchmarks",
    description:
      "Every line item is extracted, normalized, and compared against market data automatically — no spreadsheet modeling required.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Get Your Verdict",
    description:
      "A plain-English summary with risk ratings, benchmarked metrics, and the exact questions to ask before you proceed.",
    icon: Target,
  },
]

const analyzedDocs = [
  {
    name: "Operating Statement",
    aka: "T-12 / P&L",
    description: "12 months of income and expenses — the financial truth",
    icon: Calculator,
  },
  {
    name: "Rent Roll",
    aka: "Unit Mix",
    description: "Current tenants, rents, lease terms — the revenue picture",
    icon: FileText,
  },
  {
    name: "Offering Memo",
    aka: "OM / Marketing Package",
    description: "Property details, photos, seller projections — the story",
    icon: Building2,
  },
]

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const { redirect } = await searchParams
  const landingAuthUrl = "https://app.investassist.ai/auth"
  const authUrl = buildAuthUrl(redirect)
  const signupUrl = buildSignupUrl(redirect)
  const privacyUrl = buildMainAppUrl("/privacy")
  const termsUrl = buildMainAppUrl("/terms")
  const contactUrl = buildMainAppUrl("/contact")

  return (
    <div className="min-h-screen overflow-x-hidden super-gradient-bg">
      {/* Hero Section — vivid colorful gradient band with the header merged in */}
      <main>
        <section className="relative overflow-hidden hero-gradient">
          {/* Document-extraction network (desktop only, hidden on mobile to reduce clutter) */}
          <NeuralNetworkCanvas
            variant="light"
            className="hidden lg:block absolute inset-0 h-full w-full"
          />

          {/* Merged transparent navigation — floats at top on mobile, relative on desktop */}
          <nav className="relative md:relative md:z-50 md:px-4 md:pt-5 md:pb-2 fixed md:relative top-0 inset-x-0 z-50 px-4 pt-4 pb-3 md:pt-5 md:pb-2 bg-gradient-to-b from-purple-900/90 via-purple-800/70 to-transparent md:from-transparent md:via-transparent md:to-transparent backdrop-blur-md md:backdrop-blur-none safe-area-inset-top">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link href="/" className="relative h-10 w-36 md:h-12 md:w-52">
                <Image src={LOGO_PATH} alt={LOGO_ALT} fill className="object-contain object-left brightness-0 invert" priority />
              </Link>
              <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-white/90">
                <a href="#who-its-for" className="hover:text-white transition-colors">Who It&apos;s For</a>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
                <a href="#documents" className="hover:text-white transition-colors">What We Analyze</a>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              </div>
              {/* Mobile: Dropdown menu for navigation links */}
              <div className="md:hidden flex items-center">
                <details className="group relative">
                  <summary className="cursor-pointer list-none p-2.5 rounded-lg text-white/90 hover:text-white hover:bg-white/15 transition-all">
                    <svg className="w-5 h-5 group-open:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg className="w-5 h-5 hidden group-open:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </summary>
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-200 p-2 z-50">
                    <a href="#who-its-for" className="block px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Who It&apos;s For</a>
                    <a href="#how-it-works" className="block px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">How It Works</a>
                    <a href="#documents" className="block px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">What We Analyze</a>
                    <a href="#pricing" className="block px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">Pricing</a>
                  </div>
                </details>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                {/* Desktop: text labels */}
                <Link href={landingAuthUrl} className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <LogIn className="w-4 h-4" /> Sign in
                </Link>
                <Link href={landingAuthUrl} data-analytics="homepage-nav-cta" className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-[#7c3aed] bg-white hover:bg-white/90 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <UserPlus className="w-4 h-4" /> Sign up
                </Link>
                {/* Mobile: icon-only */}
                <Link href={landingAuthUrl} aria-label="Sign in" className="md:hidden p-2.5 rounded-lg text-white/90 hover:text-white hover:bg-white/15 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <LogIn className="w-5 h-5" />
                </Link>
                <Link href={landingAuthUrl} aria-label="Sign up" className="md:hidden p-2.5 rounded-full text-[#7c3aed] bg-white hover:bg-white/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <UserPlus className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </nav>

          {/* Hero content — add top padding on mobile for floating header */}
          <div className="relative z-10 px-4 pt-24 sm:pt-20 md:pt-16 lg:pt-24 pb-16 md:pb-24 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center lg:pt-4">
              {/* Left column: value proposition */}
              <div className="text-center lg:text-left">
                {/* Announcement Badge */}
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-white/15 border border-white/25 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Independent CRE underwriting, straight from your deal documents</span>
                  </div>
                </div>

                {/* Main Headline - rendered statically (no entrance animation) to protect LCP */}
                <div className="mb-8">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 text-balance">
                    CRE Underwriting That{" "}
                    <span className="text-white/90 underline decoration-white/40 decoration-4 underline-offset-[6px]">
                      Sees Through the Pitch
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
                    Automated commercial real estate deal analysis. Upload the T-12, rent roll, and offering
                    memorandum, and InvestAssist extracts every line item, builds in-place NOI and cap rate,
                    and benchmarks the deal against the market — <span className="text-emerald-400">in minutes, not days</span>.
                  </p>
                </div>

                {/* Trust Indicators — solid chips so they stand out on the gradient */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <span className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-white shadow-sm text-sm font-semibold text-slate-800">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    No credit card required
                  </span>
                  <span className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-white shadow-sm text-sm font-semibold text-slate-800">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    Free credits to start
                  </span>
                  <span className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-white shadow-sm text-sm font-semibold text-slate-800">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    First verdict in under 5 minutes
                  </span>
                </div>
              </div>

              {/* Right column: interactive input island */}
              <HeroInput authUrl={authUrl} />
            </div>
          </div>
        </section>

        {/* Product Walkthrough Section */}
        <section id="walkthrough" className="px-4 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
                See Exactly What You Get
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto text-pretty">
                From raw documents to a benchmarked verdict — financials extracted, NOI built,
                the deal valued and compared head to head.
              </p>
            </div>
            <ProductWalkthrough />
          </div>
        </section>

        {/* Why It Works + Who It's For (merged, asymmetric) */}
        <section id="features" className="px-4 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left: the thesis + benefits as a vertical list */}
              <div className="lg:col-span-6">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
                  The Independent Underwriting Layer for Commercial Real Estate
                </h2>
                <p className="text-lg text-slate-500 mb-8 text-pretty leading-relaxed">
                  Every deal arrives as a polished pitch. InvestAssist works from the underlying numbers —
                  so you act on what the documents actually say, not what the seller wants you to believe.
                </p>

                <div className="flex flex-col gap-5">
                  {whyItWorks.map((feature, index) => (
                    <Reveal key={feature.title} delay={index * 0.08} x={-16} y={0} className="flex items-start gap-4">
                      <div className={cn("shrink-0 w-11 h-11 rounded-xl flex items-center justify-center", feature.bgColor)}>
                        <feature.icon className={cn("w-5 h-5", feature.color)} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 mb-1">{feature.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Right: personas as compact chips + a single detail panel */}
              <div className="lg:col-span-6 lg:sticky lg:top-24" id="who-its-for">
                <div className="rounded-2xl p-6 md:p-8 neo-card">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">Who it&apos;s for</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-5 text-balance">
                    Built for everyone at the underwriting table
                  </h3>
                  <PersonaTabs />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section — horizontal timeline */}
        <section id="how-it-works" className="px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
                Three Steps to an Underwriting Verdict
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto text-pretty">
                From raw documents to a defensible decision in minutes, not weeks.
              </p>
            </div>

            <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
              {/* Connector line (desktop only) */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-teal-200 via-slate-200 to-slate-200"
              />
              {howItWorks.map((item, index) => (
                <Reveal key={item.step} delay={index * 0.12} className="relative flex flex-col items-center text-center">
                  {/* Node */}
                  <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-5 ring-8 ring-[#7c3aed]/15" style={{ background: designSystem.gradients.brand }}>
                    <item.icon className="w-6 h-6 text-white" />
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#db2777] text-white text-[11px] font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Underwriting Outputs Showcase */}
        <section id="features-deep" className="px-4 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
                NOI, Cap Rate, Valuation &amp; Comps That Drive a Buying Decision
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto text-pretty">
                A clean NOI bridge, unit mix, a cap-rate-driven valuation range, and rent and sales comps
                pulled straight from the OM — plus side-by-side deal comparison you&apos;d normally rebuild
                in a spreadsheet, ready the moment your documents land.
              </p>
            </div>
            <FeatureShowcase />
          </div>
        </section>

        {/* Data Sources Transparency */}
        <section id="documents" className="px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl p-8 md:p-12" style={neu.card}>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 text-balance">
                  We Analyze the Documents That Tell the Truth
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-pretty">
                  Our analysis is built from the three core documents behind every deal — the same files
                  your lender and investment committee will scrutinize. Purpose-built for income-producing
                  commercial real estate: multifamily, retail, office, and mixed-use.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {analyzedDocs.map((doc, index) => (
                  <Reveal key={doc.name} delay={index * 0.1} y={10} className="text-center p-4 rounded-xl" >
                    <div style={neu.inset} className="h-full rounded-xl p-4">
                      <doc.icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1">{doc.name}</h3>
                      <p className="text-xs text-slate-500 mb-2">{doc.aka}</p>
                      <p className="text-sm text-slate-500">{doc.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
                <Lightbulb className="w-4 h-4 text-teal-500" />
                <span>No MLS scraping, no listing URLs — your underwriting stays grounded in real documents.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection authUrl={authUrl} />

        {/* FAQ Section */}
        <section id="faq" className="px-4 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto text-pretty">
                Everything you need to know about underwriting commercial real estate deals with InvestAssist.
              </p>
            </div>
            <FaqSection />
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal y={20}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
                Stop Underwriting on Faith
              </h2>
              <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto text-pretty">
                Upload your next deal&apos;s documents and get an independent, benchmarked read in minutes.
                Start free — no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={landingAuthUrl}
                  data-analytics="homepage-primary-cta"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  style={{ ...designSystem.buttons.primary }}
                >
                  Underwrite Your First Deal <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/sample-analysis"
                  data-analytics="homepage-secondary-cta"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  style={neu.btn}
                >
                  See Sample Analysis
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer — flows on the same white background; no hard divider */}
      <footer className="px-4 pt-8 pb-12 mt-8">
        <div className="max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-10" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative h-8 w-32">
            <Image src={LOGO_PATH} alt={LOGO_ALT} fill className="object-contain object-left" />
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <Link href={privacyUrl} className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href={termsUrl} className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href={contactUrl} className="hover:text-slate-900 transition-colors">Contact</Link>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} InvestAssist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
