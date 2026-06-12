"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ArrowRight, Calculator, FileText, Building2, BarChart3, Sparkles, Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { designSystem } from "@/lib/design-system"

const neu = {
  card: designSystem.cards.neo,
  inset: designSystem.cards.inset,
  btn: designSystem.buttons.secondary,
}

interface PricingSectionProps {
  authUrl: string
}

const plans = [
  {
    name: "Starter",
    price: 79,
    credits: 100,
    overage: "1.00",
    tagline: "For solo buyers underwriting their own deals.",
    fullDeals: "5–6",
    highlighted: false,
    features: [
      "~5–6 full deals / month",
      "T-12, rent roll & OM extraction",
      "In-place & pro forma NOI, cap rate, valuation",
      "Source-line traceability on every figure",
      "$1.00 / credit on overage",
    ],
  },
  {
    name: "Growth",
    price: 199,
    credits: 300,
    overage: "0.90",
    tagline: "The default plan for active investors and analysts.",
    fullDeals: "16–18",
    highlighted: true,
    features: [
      "~16–18 full deals / month",
      "Everything in Starter",
      "Market benchmarking on every metric",
      "Comp extraction pulled from the OM",
      "Side-by-side deal comparison",
      "$0.90 / credit on overage",
    ],
  },
  {
    name: "Pro",
    price: 499,
    credits: 900,
    overage: "0.80",
    tagline: "For acquisition teams and funds running pipeline at volume.",
    fullDeals: "50–55",
    highlighted: false,
    features: [
      "~50–55 full deals / month",
      "Everything in Growth",
      "Priority extraction queue",
      "Shared workspace & deal history",
      "$0.80 / credit on overage",
    ],
  },
]

const creditUsage = [
  { icon: Calculator, label: "Operating Statement (T-12)", detail: "~4 pages", credits: "~3 credits" },
  { icon: FileText, label: "Rent Roll", detail: "~10 pages", credits: "~3 credits" },
  { icon: Building2, label: "Offering Memorandum", detail: "~30 pages · incl. comps", credits: "~6 credits" },
  { icon: BarChart3, label: "Benchmark + underwriting verdict", detail: "per deal", credits: "~6 credits" },
]

export function PricingSection({ authUrl }: PricingSectionProps) {
  return (
    <section id="pricing" className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-teal-700 bg-white/90 border border-teal-100/80 mb-4">
            <Coins className="w-3.5 h-3.5" />
            Simple credit-based pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance">
            Pay for Underwriting, Not Tokens
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto text-pretty">
            One credit covers a unit of analysis — an extracted document or a benchmarked verdict.
            A typical full deal runs about sixteen to eighteen credits, so you always know what a plan buys you.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 items-stretch">
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
                  plan.highlighted ? "ring-2 ring-teal-400/60" : "",
                )}
                style={neu.card}
              >
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1 mb-5 min-h-[40px]">{plan.tagline}</p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
                  <span className="text-sm text-slate-500 font-medium">/ month</span>
                </div>
                <p className="text-sm font-semibold text-teal-700 mb-5">
                  {plan.credits} credits / mo
                  <span className="text-slate-500 font-normal"> · ~{plan.fullDeals} full deals</span>
                </p>

                <Link
                  href={`${authUrl}${authUrl.includes("?") ? "&" : "?"}mode=signup`}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] mb-6",
                    plan.highlighted ? "text-white" : "text-slate-700",
                  )}
                  style={plan.highlighted ? designSystem.buttons.primary : neu.btn}
                >
                  Start with {plan.name} <ArrowRight className="w-4 h-4" />
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
              <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
                <Sparkles className="w-4 h-4" />
                One full deal ≈ 16–18 credits
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl p-2 overflow-x-auto" style={neu.inset}>
                <ul className="divide-y divide-slate-200/60">
                  {creditUsage.map((row) => (
                    <li key={row.label} className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-4 text-xs md:text-sm">
                      <div className="shrink-0 w-7 md:w-9 h-7 md:h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                        <row.icon className="w-3.5 md:w-4.5 h-3.5 md:h-4.5 text-teal-600" />
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
