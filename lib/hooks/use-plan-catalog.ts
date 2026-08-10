"use client"

export interface PublicCatalogPlan {
  id: string
  name: string
  priceInCents: number
  credits: number
  overage: string
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
    name: "Free Trial",
    credits: 20,
    fullDeals: "~1-2 full deals",
    tagline: "Try InvestAssist on your next deal, no card required.",
    features: ["Upload T-12, Rent Roll & OM", "Underwriting verdict", "Comps & benchmarking"],
  },
  plans: [
    {
      id: "starter",
      name: "Starter",
      priceInCents: 4900,
      credits: 60,
      overage: "1.00",
      fullDeals: "~6-8 full deals / mo",
      tagline: "For individual investors analyzing a few deals a month.",
      highlighted: false,
      features: ["Everything in Trial", "Priority extraction", "Saved pipeline & watchlist"],
    },
    {
      id: "pro",
      name: "Pro",
      priceInCents: 14900,
      credits: 200,
      overage: "0.85",
      fullDeals: "~20-25 full deals / mo",
      tagline: "For active buyers and small teams underwriting weekly.",
      highlighted: true,
      features: ["Everything in Starter", "Team sharing", "IC-ready reports"],
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
