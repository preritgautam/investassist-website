"use client"

import { usePlanCatalog } from "@/lib/hooks/use-plan-catalog"
import { getAppUrl } from "@/lib/utils"

interface PricingSectionProps {
  /** Auth entry on the external product app. Paid cards append a checkout redirect. */
  authUrl: string
}

/**
 * Static reference copy, keyed by the catalog plan id. Prices and credit counts
 * are NOT hard-coded here — they are read from the plan catalog below so the
 * displayed numbers can never drift from what checkout actually charges. Only
 * the descriptive/marketing copy (which has no billing meaning) lives here.
 */
const COPY: Record<string, { for: string; support: string; cta: string; badge?: string }> = {
  trial: {
    for: "See it work on your documents.",
    support: "Roughly one full deal · No credit card required",
    cta: "Start free",
  },
  starter: {
    for: "For investors underwriting their own deals.",
    support: "Approximately 5–6 full deals · Document extraction + analysis",
    cta: "Explore Starter",
  },
  growth: {
    for: "For a steady pipeline of opportunities.",
    support: "Approximately 16–18 full deals · Benchmarking + comparison",
    cta: "Explore Growth",
    badge: "For active deal flow",
  },
  pro: {
    for: "For acquisition teams reviewing at scale.",
    support: "Approximately 50–55 full deals · Shared workspace + deal history",
    cta: "Explore Pro",
  },
}

interface PriceCard {
  /** null for the free trial (nothing to check out); catalog id for paid plans. */
  planId: string | null
  /** copy/analytics key: "trial" | catalog id */
  key: string
  name: string
  /** formatted price line, e.g. "$0" or "$79" */
  price: string
  /** true → show "/ month" suffix and "credits / month" label */
  recurring: boolean
  creditsLabel: string
  for: string
  support: string
  /**
   * Footnote line above the CTA. For paid plans this is the prepaid overage
   * rate, derived from the catalog's per-plan `topUpRate` (never hard-coded, so
   * it stays in lockstep with billing). For the trial it names what the credits
   * unlock instead, since a free grant has no overage.
   */
  overage: string
  cta: string
  badge?: string
  highlighted: boolean
}

export function PricingSection({ authUrl }: PricingSectionProps) {
  // Pricing (trial + paid) is read from the plan catalog, the single source of
  // truth for what checkout charges. Displayed price/credits are derived from
  // it — never typed in — so the cards cannot advertise an offer checkout won't
  // honor. (This standalone landing uses a static catalog stub; the main app
  // reads the same shape live from its DB.)
  const { catalog } = usePlanCatalog()

  const cards: PriceCard[] = catalog
    ? [
        ...(catalog.trial
          ? [
              {
                planId: null,
                key: "trial",
                name: "Free trial",
                price: "$0",
                recurring: false,
                creditsLabel: `${catalog.trial.credits} credits · one-time grant`,
                for: COPY.trial.for,
                support: COPY.trial.support,
                overage: "T-12, RR & OM extraction",
                cta: COPY.trial.cta,
                highlighted: false,
              },
            ]
          : []),
        ...catalog.plans.map((p) => {
          const copy = COPY[p.id] ?? { for: p.tagline, support: p.fullDeals, cta: `Explore ${p.name}` }
          return {
            planId: p.id,
            key: p.id,
            name: p.name,
            price: `$${Math.round(p.priceInCents / 100)}`,
            recurring: true,
            creditsLabel: `${p.credits} credits / month`,
            for: copy.for,
            support: copy.support,
            overage: `$${p.topUpRate} / credit on overage`,
            cta: copy.cta,
            badge: copy.badge,
            highlighted: p.highlighted,
          }
        }),
      ]
    : []

  // Send pricing CTAs through auth so a new or returning user lands back on
  // pricing after sign-in, with the selected paid plan preserved.
  function planHref(card: PriceCard): string {
    const redirect = card.planId
      ? getAppUrl(`/pricing?plan=${encodeURIComponent(card.planId)}`)
      : getAppUrl("/pricing")
    try {
      const url = new URL(authUrl)
      url.searchParams.set("redirect", redirect)
      return url.toString()
    } catch {
      return authUrl
    }
  }

  return (
    <section className="section wrap pricing" id="pricing" aria-labelledby="pricing-heading">
      <div className="eyebrow">Start with a real deal</div>
      <h2 id="pricing-heading">
        Start with one deal. <br />
        Choose a plan for your pipeline.
      </h2>
      <p className="section-lead">
        Start with 20 free credits. Paid plans support a regular flow of underwriting work.
      </p>

      <div className="price-grid">
        {cards.map((card) => (
          <article key={card.key} className={card.highlighted ? "price feat" : "price"}>
            {card.badge && <span className="badge">{card.badge}</span>}
            <h3>{card.name}</h3>
            <p className="for">{card.for}</p>
            <strong>
              {card.price}
              {card.recurring && <small> / month</small>}
            </strong>
            <p className="credits">{card.creditsLabel}</p>
            <p className="support">{card.support}</p>
            <p className="overage">{card.overage}</p>
            <a
              className={card.highlighted ? "btn cta" : "btn light cta"}
              href={planHref(card)}
              data-analytics={`homepage-pricing-cta-${card.key}`}
            >
              {card.cta} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>

      <p className="pricing-note" id="pricing-note">
        A typical full deal uses approximately 16–18 credits. Usage varies with the analysis.
      </p>
    </section>
  )
}