"use client"

export interface PublicCatalogPlan {
  id: string
  name: string
  priceInCents: number
  credits: number
  /** Prepaid top-up rate in dollars per credit for this plan. */
  topUpRate: string
  fullDeals: string
  tagline: string
  highlighted: boolean
  features: string[]
}

export interface PublicTrialPlan {
  id: "trial"
  name: string
  credits: number
  fullDeals: string
  tagline: string
  features: string[]
}

export interface PublicPlanCatalog {
  trial: PublicTrialPlan | null
  plans: PublicCatalogPlan[]
}

/**
 * Standalone-landing stub.
 *
 * In the main InvestAssist app this hook reads the live pricing catalog from
 * the DB `plans` table via `getPlanCatalog()` (lib/actions/subscription-actions.ts),
 * so pricing never drifts from what checkout actually charges. This extracted
 * copy of the landing page has no backend, so it returns static placeholder
 * pricing instead — update the numbers below to match production, or wire
 * this hook back up to a real API if this project grows a backend.
 */
const STATIC_CATALOG: PublicPlanCatalog = {
  trial: {
    id: "trial",
    name: "Trial",
    credits: 20,
    fullDeals: "~1 full deal",
    tagline: "20 credits for new users. One-time grant; upgrade to a paid plan when credits run out.",
    features: [
      "20 credits free the moment you sign up",
      "Enough for roughly one full deal end-to-end",
      "T-12, rent roll & OM extraction",
      "In-place NOI, cap rate & valuation",
      "No credit card required",
    ],
  },
  plans: [
    {
      id: "starter",
      name: "Starter",
      priceInCents: 7900,
      credits: 100,
      topUpRate: "1.00",
      fullDeals: "~5-6 full deals / mo",
      tagline: "For solo buyers underwriting their own deals.",
      highlighted: false,
      features: [
        "~5-6 full deals / month",
        "T-12, rent roll & OM extraction",
        "In-place pro forma NOI, cap rate, valuation",
        "Source-line traceability on every figure",
        "$1.00 / credit on overage",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      priceInCents: 19900,
      credits: 300,
      topUpRate: "0.90",
      fullDeals: "~16-18 full deals / mo",
      tagline: "The default plan for active investors and analysts.",
      highlighted: true,
      features: [
        "~16-18 full deals / month",
        "Everything in Starter",
        "Market benchmarking on every metric",
        "Comp extraction pulled from the OM",
        "Side-by-side deal comparison",
        "$0.90 / credit on overage",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      priceInCents: 49900,
      credits: 900,
      topUpRate: "0.80",
      fullDeals: "~50-55 full deals / mo",
      tagline: "For acquisition teams and funds running pipeline volume.",
      highlighted: false,
      features: [
        "~50-55 full deals / month",
        "Everything in Growth",
        "Priority extraction queue",
        "Shared workspace & deal history",
        "$0.80 / credit on overage",
      ],
    },
  ],
}

export function usePlanCatalog() {
  return {
    catalog: STATIC_CATALOG,
    isLoading: false,
    error: null as string | null,
  }
}
