"use client"

import { Sparkles } from "lucide-react"

import { usePlanCatalog } from "@/lib/hooks/use-plan-catalog"
import { getAppUrl } from "@/lib/utils"

interface PricingSectionProps {
  /** Auth entry on the external product app. Paid cards append a checkout redirect. */
  authUrl: string
}

/**
 * Static reference copy, keyed by the catalog plan id. Prices, credit counts and
 * feature bullets are NOT hard-coded here — they are read from the plan catalog
 * below so the displayed numbers can never drift from what checkout actually
 * charges. Only the CTA label and the "most popular" badge (which have no
 * billing meaning) live here.
 */
const COPY: Record<string, { cta: string; badge?: string }> = {
  trial: { cta: "Included on signup" },
  starter: { cta: "Choose Starter" },
  growth: { cta: "Choose Growth", badge: "Most popular" },
  pro: { cta: "Choose Pro" },
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
  tagline: string
  fullDeals: string
  features: string[]
  cta: string
  badge?: string
  highlighted: boolean
  /** Trial is granted automatically on signup — its CTA is inert, not a link. */
  disabled?: boolean
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
                name: catalog.trial.name,
                price: "Free",
                recurring: false,
                creditsLabel: `${catalog.trial.credits} credits to start · ${catalog.trial.fullDeals} + some more`,
                tagline: catalog.trial.tagline,
                fullDeals: catalog.trial.fullDeals,
                features: catalog.trial.features,
                cta: COPY.trial.cta,
                highlighted: false,
                disabled: true,
              },
            ]
          : []),
        ...catalog.plans.map((p) => {
          const copy = COPY[p.id] ?? { cta: `Choose ${p.name}` }
          return {
            planId: p.id,
            key: p.id,
            name: p.name,
            price: `$${Math.round(p.priceInCents / 100)}`,
            recurring: true,
            creditsLabel: `${p.credits} credits /mo · ${p.fullDeals}`,
            tagline: p.tagline,
            fullDeals: p.fullDeals,
            features: p.features,
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
            {card.badge && (
              <span className="badge">
                <Sparkles aria-hidden="true" size={12} />
                {card.badge}
              </span>
            )}
            <h3>{card.name}</h3>
            <p className="for">{card.tagline}</p>
            <strong>
              {card.price}
              {card.recurring && <small> / month</small>}
            </strong>
            <p className="credits">{card.creditsLabel}</p>
            {card.disabled ? (
              <button type="button" className="btn light cta" disabled aria-disabled="true">
                {card.cta}
              </button>
            ) : (
              <a
                className={card.highlighted ? "btn cta" : "btn light cta"}
                href={planHref(card)}
                data-analytics={`homepage-pricing-cta-${card.key}`}
              >
                {card.cta} <span aria-hidden="true">→</span>
              </a>
            )}
            <ul className="feature-list">
              {card.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="pricing-note" id="pricing-note">
        A typical full deal uses approximately 16–18 credits. Usage varies with the analysis.
      </p>
    </section>
  )
}
