"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ArrowRight, Calculator, FileText, Building2, BarChart3, Sparkles, Coins, Loader2 } from "lucide-react"
import { cn, getAppUrl } from "@/lib/utils"
import { designSystem } from "@/lib/design-system"
import { usePlanCatalog } from "@/lib/hooks/use-plan-catalog"

const neu = {
  card: designSystem.cards.neo,
  inset: designSystem.cards.inset,
  btn: designSystem.buttons.secondary,
}

interface PricingSectionProps {
  authUrl: string
}

// Display shape shared by the free Trial card and the paid catalog cards.
interface DisplayPlan {
  /** null for the free trial (nothing to check out); catalog id for paid plans. */
  planId: string | null
  name: string
  /** Dollars per month. 0 for the free trial. */
  price: number
  credits: number
  /** Prepaid top-up rate ($/credit); null for the trial (no top-ups). */
  topUpRate: string | null
  tagline: string
  fullDeals: string
  highlighted: boolean
  isFree: boolean
  features: string[]
}

const creditUsage = [
  { icon: Calculator, label: "Operating Statement (T-12)", detail: "~4 pages", credits: "~3 credits" },
  { icon: FileText, label: "Rent Roll", detail: "~10 pages", credits: "~3 credits" },
  { icon: Building2, label: "Offering Memorandum", detail: "~30 pages · incl. comps", credits: "~6 credits" },
  { icon: BarChart3, label: "Benchmark + underwriting verdict", detail: "per deal", credits: "~6 credits" },
]

export function PricingSection({ authUrl }: PricingSectionProps) {
  // Plans (trial + paid) are read live from the DB `plans` table, so pricing
  // and credit counts here can never drift from what checkout actually charges.
  const { catalog, isLoading: catalogLoading } = usePlanCatalog()

  const plans: DisplayPlan[] = catalog
    ? [
        ...(catalog.trial
          ? [
              {
                planId: null,
                name: catalog.trial.name,
                price: 0,
                credits: catalog.trial.credits,
                topUpRate: null,
                tagline: catalog.trial.tagline,
                fullDeals: catalog.trial.fullDeals,
                highlighted: false,
                isFree: true,
                features: catalog.trial.features,
              },
            ]
          : []),
        ...catalog.plans.map((p) => ({
          planId: p.id,
          name: p.name,
          price: p.priceInCents / 100,
          credits: p.credits,
          topUpRate: p.topUpRate,
          tagline: p.tagline,
          fullDeals: p.fullDeals,
          highlighted: p.highlighted,
          isFree: false,
          features: p.features,
        })),
      ]
    : []

  // Build the sign-up destination for a plan card.
  // - Trial (free): straight to sign-up. The account is auto-provisioned onto
  //   the trial plan with 20 credits, so there is nothing to pay for.
  // - Paid: sign up first, then carry a `redirect` to /pricing?plan=<id> so the
  //   Stripe checkout for the chosen plan opens automatically once the account
  //   exists (checkout requires an authenticated user).
  function planHref(plan: DisplayPlan): string {
    if (plan.isFree || !plan.planId) {
      return authUrl
    }
    const dest = `/pricing?plan=${plan.planId}`
    return getAppUrl(`/auth?redirect=${encodeURIComponent(dest)}`)
  }

  return (
    <section id="pricing" className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-700 bg-white/90 border border-brand-200/60 mb-4">
            <Coins className="w-3.5 h-3.5" />
            Simple prepaid credit pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Pay for Underwriting, Not Tokens
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto text-pretty">
            One credit covers a unit of analysis — an extracted document or a benchmarked verdict.
            A typical full deal runs about sixteen to eighteen credits, so you always know what a plan buys you.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/70">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              Monthly credits refill every billing cycle
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/70">
              <Coins className="w-3.5 h-3.5 text-brand-600" />
              Top-up credits roll over and never expire
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/70">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Prepaid only — no overage bills, no card on file
            </span>
          </div>
        </div>

        {/* Plan cards */}
        {catalogLoading ? (
          <div className="flex items-center justify-center py-16 mb-12">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-full"
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ background: designSystem.gradients.teal }}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Most popular
                  </span>
                </div>
              )}
              <div
                className={cn(
                  "h-full flex flex-col rounded-2xl p-6 md:p-7",
                  plan.highlighted ? "ring-2 ring-brand-400/60" : "",
                )}
                style={neu.card}
              >
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1 mb-5 min-h-[40px]">{plan.tagline}</p>

                <div className="flex items-baseline gap-1 mb-1">
                  {plan.isFree ? (
                    <span className="text-4xl font-extrabold text-slate-900">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
                      <span className="text-sm text-slate-500 font-medium">/ month</span>
                    </>
                  )}
                </div>
                <p className="text-sm font-semibold text-brand-700 mb-1.5 min-h-[40px]">
                  {plan.isFree ? (
                    <>
                      {plan.credits} credits to start
                      <span className="text-slate-500 font-normal"> · {plan.fullDeals}</span>
                    </>
                  ) : (
                    <>
                      {plan.credits} credits / mo
                      <span className="text-slate-500 font-normal"> · {plan.fullDeals}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-slate-500 mb-5 min-h-[32px]">
                  {plan.isFree ? (
                    "One-time credits · no top-ups — upgrade when they run out"
                  ) : (
                    <>Top-up credits at ${plan.topUpRate}/credit · roll over, never expire</>
                  )}
                </p>

                <Link
                  href={planHref(plan)}
                  data-analytics={`homepage-pricing-cta-${plan.planId ?? "trial"}`}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] mb-6",
                    plan.highlighted ? "text-white" : "text-foreground",
                  )}
                  style={plan.highlighted ? designSystem.buttons.primary : neu.btn}
                >
                  {plan.isFree ? "Start free" : `Start with ${plan.name}`} <ArrowRight className="w-4 h-4" />
                </Link>

                <ul className="flex flex-col gap-3 mt-auto">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* What a credit gets you */}
        <div className="rounded-2xl p-6 md:p-8" style={neu.card}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 text-balance">What a credit actually buys</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Document size barely moves the meter — a 30-page OM uses a fraction of a credit&apos;s token budget.
                Credits are spent on the reasoning that turns raw files into a defensible underwrite, which is why
                a complete deal lands at roughly sixteen to eighteen credits.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                <Sparkles className="w-4 h-4" />
                One full deal ≈ 16–18 credits
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl p-2 overflow-x-auto" style={neu.inset}>
                <ul className="divide-y divide-slate-200/60">
                  {creditUsage.map((row) => (
                    <li key={row.label} className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-4 text-xs md:text-sm">
                      <div className="shrink-0 w-7 md:w-9 h-7 md:h-9 rounded-lg bg-brand-50 flex items-center justify-center">
                        <row.icon className="w-3.5 md:w-4.5 h-3.5 md:h-4.5 text-brand-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 line-clamp-2">{row.label}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{row.detail}</p>
                      </div>
                      <span className="font-bold text-slate-900 whitespace-nowrap text-xs md:text-sm ml-1">{row.credits}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
