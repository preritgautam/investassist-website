import Link from "next/link"
import {
  ArrowRight,
  Check,
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
  AlertTriangle,
  CircleDot,
  ChevronRight,
  TrendingDown,
  Minus,
  Store,
  Briefcase,
  Warehouse,
  Layers,
  Boxes,
} from "lucide-react"
import { ProductWalkthrough } from "@/components/landing/product-walkthrough"
import { FeatureShowcase } from "@/components/landing/feature-showcase"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
import { PersonaTabs } from "@/components/landing/persona-tabs"
import { Reveal } from "@/components/landing/reveal"
import { cn, getAppUrl } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { palette } from "@/lib/design-system"

// ── Design tokens — resolve from the global palette (single source of truth).
// No hardcoded hex; a token change in globals.css cascades here too. ──────────
const PARCHMENT   = palette.parchment
const IVORY       = palette.ivory
const INK         = palette.ink
const INK_MUTED   = palette.inkMuted
const INK_FAINT   = palette.inkFaint
const AMBER       = palette.brand
const AMBER_LIGHT = palette.brandLight
const RULE        = palette.rule

const whyItWorks = [
  {
    icon: ShieldCheck,
    title: "Trust the documents, not the pitch",
    description:
      "Underwritten from your actual T-12, rent roll, and OM — never a scraped listing or a headline cap rate.",
  },
  {
    icon: BarChart3,
    title: "Benchmark every assumption",
    description:
      "Each metric is measured against market data, so inflated income and aggressive pro formas are obvious at a glance.",
  },
  {
    icon: Eye,
    title: "Catch the red flags first",
    description:
      "Missing months, below-market rents, deferred maintenance, optimistic exits — surfaced before they cost you.",
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

// ── Mock data — 128-unit Dallas multifamily deal ──────────────────────────
// Single source of truth — every displayed number derives from these constants.
//
// Credible buy-side scenario: Seller NOI > In-Place NOI because the seller's
// T-12 inflates occupancy (97%) and defers maintenance. The buyer's rent-roll
// analysis reveals the real in-place NOI is lower — that's the gap.
//
// All values below are arithmetic identities. Change any constant and the
// downstream figures stay consistent:
//
//   Seller-implied ask  = SELLER_NOI / MARKET_CAP  = $2,847,200 / 0.0575 = $49,517,391
//   In-Place value      = IN_PLACE_NOI / MARKET_CAP = $2,491,600 / 0.0575 = $43,331,304
//   Gap                 = $49,517,391 − $43,331,304 = $6,186,087 ≈ −$6.2M  ✓
//   Cap at Asking       = IN_PLACE_NOI / ASKING      = $2,491,600 / $49,517,391 = 5.03%
//   Conservative bid    = IN_PLACE_NOI / 0.0625      = $39,865,600
//   Target bid          = IN_PLACE_NOI / 0.0575      = $43,331,304  (= In-Place value ✓)
//   Aggressive bid      = IN_PLACE_NOI / 0.0525      = $47,459,048

const SELLER_NOI    = 2_847_200   // T-12 (inflated: 97% occ, deferred maint.)
const IN_PLACE_NOI  = 2_491_600   // Rent roll annualized (91% occ, normalized)
const ECONOMIC_NOI  = 2_698_400   // All units at market rent, same expenses
const MARKET_CAP    = 0.0575      // 5.75% — market cap rate from OM
const ASKING_PRICE  = Math.round(SELLER_NOI / MARKET_CAP)  // $49,517,391 — seller's implied ask
const CAP_AT_ASKING = (IN_PLACE_NOI / ASKING_PRICE) * 100  // 5.03% — buyer's real yield at ask
const VALUE_GAP     = ASKING_PRICE - Math.round(IN_PLACE_NOI / MARKET_CAP) // $6,186,087

const mockVerdict = {
  address:     "128-Unit Multifamily · Dallas, TX",
  badge:       "REVIEW RECOMMENDED",
  sellerNOI:   `$${SELLER_NOI.toLocaleString()}`,   // $2,847,200
  inPlaceNOI:  `$${IN_PLACE_NOI.toLocaleString()}`, // $2,491,600
  economicNOI: `$${ECONOMIC_NOI.toLocaleString()}`, // $2,698,400
  capRate:     `${(MARKET_CAP * 100).toFixed(2)}%`, // 5.75%
  // Gap label: seller's price implied by their NOI vs. buyer's in-place value
  valueDelta:  `−$${(VALUE_GAP / 1_000_000).toFixed(1)}M vs. seller price`, // −$6.2M
  flags: [
    "Seller occ. 97% vs rent roll 91%",
    "Deferred maintenance suppresses T-12 repairs",
    "12 units 8–14% below market rent",
  ],
}

const mockOffer = {
  // Asking price = what the seller implies from their NOI @ market cap
  askingPrice: ASKING_PRICE,                               // $49,517,391
  noiLabel:    `$${(IN_PLACE_NOI / 1_000_000).toFixed(2)}M`, // $2.49M
  noiSource:   "In-Place NOI",
  marketCap:   `${(MARKET_CAP * 100).toFixed(2)}%`,        // 5.75%
  // Cap at Asking = in-place NOI ÷ seller's asking price (buyer's real yield)
  capAtAsking: parseFloat(CAP_AT_ASKING.toFixed(2)),        // 5.03%
  scenarios: [
    // Each value = IN_PLACE_NOI ÷ cap rate — ties directly to the NOI above
    { label: "Conservative", cap: 6.25, value: Math.round(IN_PLACE_NOI / 0.0625), style: "conservative" as const },
    { label: "Target",       cap: 5.75, value: Math.round(IN_PLACE_NOI / 0.0575), style: "target"       as const },
    { label: "Aggressive",   cap: 5.25, value: Math.round(IN_PLACE_NOI / 0.0525), style: "aggressive"   as const },
  ],
}

function fmtM(n: number) {
  return `$${(n / 1_000_000).toFixed(2)}M`
}

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const { redirect } = await searchParams
  const authUrl = redirect ? getAppUrl(`/auth?redirect=${encodeURIComponent(redirect)}`) : getAppUrl("/auth")
  const signupUrl = authUrl

  return (
    <div className="min-h-screen overflow-x-hidden super-gradient-bg" style={{ color: INK }}>

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <main>
        <section className="relative overflow-hidden hero-gradient hero-grid-texture">

          {/* ── Navigation ──────────────────────────────────────────────────────── */}
          <nav className="relative z-50 px-6 pt-5 pb-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

              {/* Logo */}
              <Logo priority />

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: INK_MUTED }}>
                <a href="#who-its-for" className="hover:text-foreground transition-colors">Who It&apos;s For</a>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
                <a href="#documents" className="hover:text-foreground transition-colors">What We Analyze</a>
                <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
              </div>

              {/* Mobile hamburger */}
              <div className="md:hidden flex items-center">
                <details className="group relative">
                  <summary className="cursor-pointer list-none p-2.5 rounded-lg hover:bg-black/6 transition-all" style={{ color: INK_MUTED }}>
                    <svg className="w-5 h-5 group-open:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg className="w-5 h-5 hidden group-open:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </summary>
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white shadow-lg border p-2 z-50" style={{ borderColor: RULE }}>
                    {["Who It's For", "How It Works", "What We Analyze", "Pricing"].map((label, i) => (
                      <a key={label} href={["#who-its-for","#how-it-works","#documents","#pricing"][i]} className="block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-black/5" style={{ color: INK }}>
                        {label}
                      </a>
                    ))}
                  </div>
                </details>
              </div>

              {/* Auth CTAs */}
              <div className="flex items-center gap-2 md:gap-3">
                <ThemeToggle className="border-0 bg-transparent hover:bg-black/6" />
                <Link
                  href={authUrl}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/6 focus-visible:outline-none focus-visible:ring-2"
                  style={{ color: INK_MUTED }}
                >
                  <LogIn className="w-4 h-4" /> Sign in
                </Link>
                <Link
                  href={signupUrl}
                  data-analytics="homepage-nav-cta"
                  className="neo-btn-primary hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2"
                >
                  <UserPlus className="w-4 h-4" /> Start free
                </Link>
                {/* Mobile icon-only */}
                <Link href={authUrl} aria-label="Sign in" className="md:hidden p-2.5 rounded-lg hover:bg-black/6 transition-all" style={{ color: INK_MUTED }}>
                  <LogIn className="w-5 h-5" />
                </Link>
                <Link
                  href={signupUrl}
                  aria-label="Sign up"
                  className="md:hidden p-2 rounded-full"
                  style={{ background: INK }}
                >
                  <UserPlus className="w-5 h-5" style={{ color: IVORY }} />
                </Link>
              </div>
            </div>
          </nav>

          {/* ── Hero content ─────────────────────────────────────────────── */}
          <div className="relative z-10 px-6 pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-0 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">

              {/* Left: value proposition */}
              <div className="text-center lg:text-left pb-14 lg:pb-16">

                {/* Eyebrow — small label pill, like Moment/Pax */}
                <div className="flex justify-center lg:justify-start mb-6">
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border"
                    style={{ color: AMBER, borderColor: `${AMBER}55`, background: AMBER_LIGHT }}
                  >
                    <CircleDot className="w-3 h-3" />
                    Buy-side underwriting intelligence
                  </div>
                </div>

                {/* Headline — Playfair Display, large, confident */}
                <h1
                  className="text-5xl sm:text-6xl lg:text-[4.2rem] xl:text-[4.6rem] leading-[1.06] tracking-tight mb-7 text-balance"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    color: INK,
                  }}
                >
                  The seller&apos;s numbers{" "}
                  <em
                    className="not-italic"
                    style={{ color: AMBER }}
                  >
                    are not
                  </em>{" "}
                  your numbers.
                </h1>

                <p
                  className="text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed text-pretty mb-9"
                  style={{ color: INK_MUTED }}
                >
                  Upload the T-12, rent roll, and OM. InvestAssist extracts every line item,
                  builds real in-place NOI, and tells you exactly what the deal is worth —
                  before you make an offer.
                </p>

                {/* Primary + secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-9">
                  <Link
                    href={signupUrl}
                    data-analytics="homepage-hero-primary-cta"
                    className="neo-btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2"
                  >
                    Analyze your first deal free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/sample-analysis"
                    data-analytics="homepage-hero-secondary-cta"
                    className="neo-btn-elevated inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold active:scale-[0.98] focus-visible:outline-none"
                    style={{ color: INK }}
                  >
                    See a sample verdict
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Trust chips */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
                  {["No credit card required", "Free credits to start", "First verdict in 5 min"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: INK_MUTED }}>
                      <Check className="w-3.5 h-3.5" style={{ color: AMBER }} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: combined analysis card */}
              <div className="hidden lg:block relative">
                <div
                  className="glass-card glass-card-hover relative rounded-2xl overflow-hidden"
                  style={{ border: undefined }}
                >

                  {/* ── PANEL 1: NOI Analysis ─────────────────────────────── */}
                  {/* Header */}
                  <div
                    className="flex items-center justify-between px-5 py-3 border-b"
                    style={{ borderBottomColor: RULE, background: IVORY }}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" style={{ color: INK_FAINT }} />
                      <span className="text-xs font-medium" style={{ color: INK_MUTED }}>{mockVerdict.address}</span>
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: AMBER, color: "#fff", letterSpacing: "0.08em" }}
                    >
                      {mockVerdict.badge}
                    </span>
                  </div>

                  {/* NOI metrics grid — Seller is HIGHER (crossed out), buyer underwrites lower */}
                  <div className="grid grid-cols-3 border-b" style={{ borderColor: RULE }}>
                    {[
                      {
                        label: "Seller NOI",
                        value: mockVerdict.sellerNOI,
                        sub: "T-12 (inflated)",
                        strikethrough: true,
                      },
                      {
                        label: "In-Place NOI",
                        value: mockVerdict.inPlaceNOI,
                        sub: "Rent roll actual",
                        strikethrough: false,
                      },
                      {
                        label: "Economic NOI",
                        value: mockVerdict.economicNOI,
                        sub: "At market rent",
                        strikethrough: false,
                      },
                    ].map((m, i) => (
                      <div
                        key={m.label}
                        className="px-3.5 py-3"
                        style={{
                          borderLeft: i > 0 ? `1px solid ${RULE}` : undefined,
                        }}
                      >
                        <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: INK_MUTED }}>
                          {m.label}
                        </p>
                        <p
                          className={cn("text-sm font-bold tabular-nums", m.strikethrough && "line-through")}
                          style={{ color: m.strikethrough ? INK_MUTED : INK }}
                        >
                          {m.value}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: INK_MUTED }}>{m.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Value delta + risk flags */}
                  <div className="px-4 pt-3 pb-1">
                    <div
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl mb-3"
                      style={{ background: AMBER_LIGHT, border: `1px solid ${AMBER}44` }}
                    >
                      <span className="text-xs font-medium" style={{ color: INK_MUTED }}>
                        Value @ {mockVerdict.capRate} cap
                      </span>
                      <span className="text-sm font-bold tabular-nums" style={{ color: AMBER }}>
                        {mockVerdict.valueDelta}
                      </span>
                    </div>
                    <div className="space-y-1.5 pb-3">
                      {mockVerdict.flags.map((flag) => (
                        <div key={flag} className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 mt-px shrink-0" style={{ color: AMBER }} />
                          <span className="text-xs" style={{ color: INK_MUTED }}>{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── DIVIDER with Offer Analysis label ─────────────────── */}
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 border-t border-b"
                    style={{ borderColor: RULE, background: IVORY }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: INK }}
                    >
                      <Target style={{ color: IVORY, width: 13, height: 13 }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: INK }}>Offer Analysis</span>
                    <div className="ml-auto flex items-center gap-3">
                      <span className="text-[10px]" style={{ color: INK_MUTED }}>
                        Basis: {mockOffer.noiLabel} In-Place NOI · Market cap {mockOffer.marketCap}
                      </span>
                      <div
                        className="flex items-center gap-2 rounded-lg px-2.5 py-1"
                        style={{ background: IVORY, border: `1px solid ${RULE}` }}
                      >
                        <span className="text-[10px] font-semibold" style={{ color: INK_MUTED }}>Cap at Ask</span>
                        <span className="text-[11px] font-bold tabular-nums" style={{ color: "#dc2626" }}>
                          {mockOffer.capAtAsking.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── PANEL 2: Bid Scenarios — 3 columns side by side ───── */}
                  <div className="px-4 pt-3 pb-2 grid grid-cols-3 gap-2">
                    {mockOffer.scenarios.map((s) => {
                      // On-brand palette (no green/yellow — those clashed with
                      // the blue theme). TARGET is the highlighted recommendation:
                      // a blue `--brand-*` tint. Conservative & Aggressive are the
                      // quiet bookends in neutral `--muted`. All tokens are
                      // theme-aware and invert cleanly for dark mode: brand-50 →
                      // dark-blue tint, brand-700 → light azure text.
                      const cfgMap = {
                        conservative: { bg: "var(--muted)", border: "var(--border)", text: "var(--muted-foreground)", highlight: false },
                        target:       { bg: "var(--brand-50)", border: "var(--brand-300)", text: "var(--brand-700)", highlight: true },
                        aggressive:   { bg: "var(--muted)", border: "var(--border)", text: "var(--muted-foreground)", highlight: false },
                      }
                      const cfg = cfgMap[s.style]
                      const Icon = s.style === "conservative" ? TrendingDown : s.style === "aggressive" ? TrendingUp : Minus
                      return (
                        <div
                          key={s.label}
                          className="flex flex-col items-start rounded-xl px-3 py-3 gap-2"
                          style={{
                            background: cfg.bg,
                            border: `${cfg.highlight ? "1.5px" : "1px"} solid ${cfg.border}`,
                            boxShadow: cfg.highlight ? "0 0 0 1px var(--brand-200)" : "none",
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <Icon className="w-3 h-3 shrink-0" style={{ color: cfg.text }} />
                            <p className="text-[10px] font-bold uppercase tracking-widest leading-none" style={{ color: cfg.text }}>{s.label}</p>
                          </div>
                          <p className="text-base font-bold tabular-nums leading-none" style={{ color: INK }}>{fmtM(s.value)}</p>
                          <p className="text-[10px] leading-none" style={{ color: cfg.text }}>{s.cap}% cap rate</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* CTA */}
                  <div className="px-4 pb-4">
                    <Link
                      href={signupUrl}
                      className="neo-btn-primary flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold"
                    >
                      Run this on your deal
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Mobile hero CTA — the full interactive upload widget
              (HeroInput) lives in the main InvestAssist app and depends on
              its Supabase-backed upload pipeline, so this standalone copy
              of the landing page uses a simple static CTA instead. */}
          <div className="lg:hidden px-6 pb-10 max-w-lg mx-auto">
            <Link
              href={signupUrl}
              className="neo-btn-primary flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold"
            >
              Analyze your first deal free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ─── STAT BAR ──────────────────────────────────────────────────────── */}
        {/* Dark INK band — the duotone contrast anchor between hero and body. */}
        <section className="on-ink border-y border-ink-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y divide-ink-border sm:divide-y-0 sm:divide-x">
            {[
              { stat: "Under 5 min", label: "from upload to first verdict" },
              { stat: "T-12 · RR · OM", label: "all three documents analyzed" },
              { stat: "In-place NOI", label: "not the seller\u2019s pro forma" },
            ].map((item) => (
              <div key={item.stat} className="flex flex-col items-center text-center px-8 py-8">
                <span className="ia-stat-value text-xl font-bold tracking-tight mb-1.5 text-azure">
                  {item.stat}
                </span>
                <span className="text-xs font-medium text-ink-fg-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ASSET CLASSES (SEO + social proof) ─────���────────────────────── */}
        <section aria-labelledby="asset-classes-heading" className="px-6 py-14 md:py-20" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: AMBER }}>
                Built for every deal
              </p>
              <h2
                id="asset-classes-heading"
                className="text-2xl md:text-3xl font-bold mb-4 text-balance"
                style={{ color: INK, fontFamily: "var(--font-display)" }}
              >
                Underwriting for every commercial real estate asset class
              </h2>
              <p className="text-base text-pretty leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: INK_MUTED }}>
                From multifamily rent rolls to industrial NNN leases, InvestAssist reads the
                documents and builds a defensible valuation for the property types buy-side
                investors underwrite most.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {[
                  { icon: Building2, label: "Multifamily" },
                  { icon: Store, label: "Retail" },
                  { icon: Briefcase, label: "Office" },
                  { icon: Warehouse, label: "Industrial" },
                  { icon: Layers, label: "Mixed-Use" },
                  { icon: Boxes, label: "Self-Storage" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="glass-card glass-card-hover flex flex-col items-center justify-center gap-2.5 rounded-2xl px-3 py-6"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: AMBER_LIGHT, color: AMBER }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold" style={{ color: INK }}>{label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ─── PRODUCT WALKTHROUGH ─────────────────────────────────────────── */}
        <section id="walkthrough" className="px-6 py-16 md:py-24" style={{ background: PARCHMENT }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: AMBER }}>
                The platform
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 text-balance"
                style={{ color: INK, fontFamily: "var(--font-display)" }}
              >
                See Exactly What You Get
              </h2>
              <p className="text-base text-pretty leading-relaxed" style={{ color: INK_MUTED }}>
                From raw documents to a benchmarked verdict — financials extracted, NOI built,
                the deal valued and compared head to head.
              </p>
            </div>
            <ProductWalkthrough />
          </div>
        </section>

        {/* ─── WHY IT WORKS + WHO IT'S FOR ─────────────────────────────────── */}
        <section id="features" className="px-6 py-16 md:py-24" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

              {/* Left: thesis + benefits */}
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: AMBER }}>
                  The thesis
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-5 text-balance"
                  style={{ color: INK, fontFamily: "var(--font-display)" }}
                >
                  The Independent Underwriting Layer for Commercial Real Estate
                </h2>
                <p className="text-base mb-10 text-pretty leading-relaxed" style={{ color: INK_MUTED }}>
                  Every deal arrives as a polished pitch. InvestAssist works from the underlying
                  numbers — so you act on what the documents actually say, not what the seller
                  wants you to believe.
                </p>

                <div className="flex flex-col gap-0">
                  {whyItWorks.map((feature, index) => (
                    <Reveal key={feature.title} delay={index * 0.08} x={-16} y={0}>
                      <div
                        className="flex items-start gap-5 py-6 border-b last:border-0"
                        style={{ borderBottomColor: RULE }}
                      >
                        {/* Amber left rule */}
                        <div className="w-0.5 self-stretch rounded-full shrink-0" style={{ background: AMBER }} />
                        <div>
                          <h3 className="text-base font-semibold mb-1.5" style={{ color: INK }}>{feature.title}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: INK_MUTED }}>{feature.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Right: who it's for */}
              <div className="lg:col-span-6 lg:sticky lg:top-24" id="who-its-for">
                <div
                  className="rounded-2xl p-6 md:p-8 border"
                  style={{ background: PARCHMENT, borderColor: RULE }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: AMBER }}>
                    Who it&apos;s for
                  </p>
                  <h3
                    className="text-xl font-bold mb-5 text-balance"
                    style={{ color: INK, fontFamily: "var(--font-display)" }}
                  >
                    Built for everyone at the underwriting table
                  </h3>
                  <PersonaTabs />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ───────────────────────────────────��────────────── */}
        <section id="how-it-works" className="px-6 py-16 md:py-24" style={{ background: PARCHMENT }}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: AMBER }}>
                The process
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 text-balance"
                style={{ color: INK, fontFamily: "var(--font-display)" }}
              >
                Three Steps to an Underwriting Verdict
              </h2>
              <p className="text-base text-pretty leading-relaxed" style={{ color: INK_MUTED }}>
                From raw documents to a defensible decision in minutes, not weeks.
              </p>
            </div>

            {/* Steps — horizontal numbered flow, Pax-inspired */}
            <div className="relative grid gap-px md:grid-cols-3 rounded-2xl overflow-hidden" style={{ background: RULE }}>
              {howItWorks.map((item, index) => (
                <Reveal key={item.step} delay={index * 0.1}>
                  <div
                    className="flex flex-col gap-5 px-7 py-8 h-full"
                    style={{ background: IVORY }}
                  >
                    {/* Step number + icon row */}
                    <div className="flex items-center gap-4">
                      <span
                        className="text-3xl font-bold tabular-nums leading-none"
                        style={{
                          color: AMBER,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {item.step}
                      </span>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: AMBER_LIGHT }}
                      >
                        <item.icon className="w-4.5 h-4.5" style={{ color: AMBER }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-2" style={{ color: INK }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: INK_MUTED }}>{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURE SHOWCASE ────────────────────────────────────────────── */}
        <section id="features-deep" className="px-6 py-16 md:py-24" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: AMBER }}>
                Underwriting outputs
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 text-balance"
                style={{ color: INK, fontFamily: "var(--font-display)" }}
              >
                NOI, Cap Rate, Valuation &amp; Comps That Drive a Buying Decision
              </h2>
              <p className="text-base text-pretty leading-relaxed" style={{ color: INK_MUTED }}>
                A clean NOI bridge, unit mix, a cap-rate-driven valuation range, and rent and sales comps
                pulled straight from the OM — plus side-by-side deal comparison.
              </p>
            </div>
            <FeatureShowcase />
          </div>
        </section>

        {/* ─── DOCUMENTS ───────────────────────────────────────────────────── */}
        <section id="documents" className="px-6 py-16 md:py-24" style={{ background: PARCHMENT }}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: AMBER }}>
                Data sources
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold mb-3 text-balance"
                style={{ color: INK, fontFamily: "var(--font-display)" }}
              >
                We Analyze the Documents That Tell the Truth
              </h2>
              <p className="text-base text-pretty max-w-xl leading-relaxed" style={{ color: INK_MUTED }}>
                Our analysis is built from the three core documents behind every deal — the same files
                your lender and investment committee will scrutinize.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {analyzedDocs.map((doc, index) => (
                <Reveal key={doc.name} delay={index * 0.1} y={10}>
                  <div
                    className="rounded-2xl p-6 h-full border"
                    style={{ background: IVORY, borderColor: RULE }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-5"
                      style={{ background: AMBER_LIGHT }}
                    >
                      <doc.icon className="w-5 h-5" style={{ color: AMBER }} />
                    </div>
                    <h3 className="font-semibold mb-0.5" style={{ color: INK }}>{doc.name}</h3>
                    <p className="text-xs mb-3 font-medium" style={{ color: AMBER }}>{doc.aka}</p>
                    <p className="text-sm leading-relaxed" style={{ color: INK_MUTED }}>{doc.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-2.5 text-sm" style={{ color: INK_FAINT }}>
              <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" style={{ color: AMBER }} />
              <span>No MLS scraping, no listing URLs — your underwriting stays grounded in real documents.</span>
            </div>
          </div>
        </section>

        {/* ─── PRICING ─────────────────────────────────────────────────────── */}
        <PricingSection authUrl={authUrl} />

        {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
        <section id="faq" className="px-6 py-16 md:py-24" style={{ background: IVORY }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: AMBER }}>
                Questions
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 text-balance"
                style={{ color: INK, fontFamily: "var(--font-display)" }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-base text-pretty leading-relaxed" style={{ color: INK_MUTED }}>
                Everything you need to know about underwriting commercial real estate deals with InvestAssist.
              </p>
            </div>
            <FaqSection />
          </div>
        </section>

        {/* ─── BOTTOM CTA ──────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28" style={{ background: PARCHMENT }}>
          <div className="max-w-4xl mx-auto">
            <Reveal y={20}>
              {/* Large editorial-style divider line */}
              <div className="w-16 h-0.5 mb-10 mx-auto" style={{ background: AMBER }} />
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-5 text-center"
                style={{ color: AMBER }}
              >
                Ready?
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold mb-5 text-balance text-center"
                style={{ color: INK, fontFamily: "var(--font-display)" }}
              >
                Stop Underwriting on Faith
              </h2>
              <p className="text-base mb-10 max-w-xl mx-auto text-pretty text-center leading-relaxed" style={{ color: INK_MUTED }}>
                Upload your next deal&apos;s documents and get an independent, benchmarked read in minutes.
                Start free — no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={signupUrl}
                  data-analytics="homepage-primary-cta"
                  className="neo-btn-primary inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-base font-bold active:scale-[0.98]"
                >
                  Underwrite Your First Deal
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/sample-analysis"
                  data-analytics="homepage-secondary-cta"
                  className="neo-btn-elevated inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold active:scale-[0.98]"
                  style={{ color: INK }}
                >
                  See Sample Analysis
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────────────────── */}
      {/* Dark INK band — closes the duotone frame at the base of the page. */}
      <footer className="on-ink px-6 py-12 border-t border-ink-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo href={null} />
          <div className="flex items-center gap-6 text-sm text-ink-fg-muted">
            <Link href="/legal/privacy" className="hover:text-ink-fg transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-ink-fg transition-colors">Terms</Link>
            <a href="mailto:sales@investassist.ai" className="hover:text-ink-fg transition-colors">Contact</a>
          </div>
          <p className="text-sm text-ink-fg-muted">
            &copy; {new Date().getFullYear()} InvestAssist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
