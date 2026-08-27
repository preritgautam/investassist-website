export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: "How does credit-based pricing work, and how many deals does a plan cover?",
    answer:
      "You prepay for a monthly bucket of credits and spend them as you analyze — no metered overage and no card kept on file. One credit is a unit of work — extracting a document or producing a benchmarked verdict — not a per-token charge you have to guess at. A T-12 or rent roll runs about three credits, a full OM (with comp extraction) about six, and the benchmark plus verdict another six — so a complete deal is roughly 16–18 credits. Starter includes 100 credits/month ($79), Growth 300 ($199), and Pro 900 ($499) — about ~5–6, ~16–18, and ~50–55 full deals a month respectively. If you need more, buy prepaid top-up credits at your plan's rate.",
  },
  {
    question: "What's the difference between monthly credits and top-up credits?",
    answer:
      "Your plan's monthly credits refill at the start of each billing cycle and are used first; anything unused expires at the end of the cycle. Top-up credits are extra credits you prepay for at any time — they roll over indefinitely, never expire, and survive upgrades, downgrades, and even cancellation. We always spend expiring monthly credits before your purchased top-ups. Top-up rates get cheaper as you move up: $1.00/credit on Starter, $0.90 on Growth, and $0.80 on Pro (minimum $8 per purchase). Free-trial accounts can't buy top-ups — upgrade to a paid plan once your trial credits are used.",
  },
  {
    question: "What happens when I upgrade, downgrade, or cancel?",
    answer:
      "Upgrades take effect immediately — you pay only the difference between the two monthly prices (not a day-prorated amount) and instantly receive the difference in monthly credits, while your renewal date and any purchased top-up credits stay exactly as they were. Downgrades take effect at your next renewal, so you keep your current plan and credits until then. If you cancel, your plan runs through the end of the paid period; monthly credits expire at period end, but purchased top-up credits stay on your account and become usable again the moment you reactivate a paid plan.",
  },
  {
    question: "Can't I just upload an OM to an AI chatbot and ask if the deal is good?",
    answer:
      "You can — and you'll get one opinion on one document, then nothing. It won't remember the deal tomorrow, check it against your buy box, hold your assumptions steady across deals, flag a missing T-12, track the price history, or write a committee-ready note. The moat isn't reading a document; it's deal memory, buyer mandate, and workflow. InvestAssist keeps a saved pipeline, mandate-checking, consistent buyer assumptions, a watchlist, a missing-doc workflow, pricing history, offer tracking, and IC summary notes — so every deal builds on the last instead of starting from a blank chat.",
  },
  {
    question: "Why is InvestAssist cheaper than running these documents through an LLM yourself?",
    answer:
      "Because we don't make a general-purpose model do the expensive part. Clik.ai's proprietary extraction engine, built on years of CRE documents, parses the T-12, rent roll, and OM deterministically — structuring every line item without burning tokens on layout, tables, and OCR. The model is reserved for the reasoning a human underwriter does: normalizing expenses, reconciling rents, writing the verdict. That split gives you more analysis per credit and a cost per deal that stays flat instead of scaling with page count.",
  },
  {
    question: "Who is InvestAssist built for?",
    answer:
      "Anyone forming an independent opinion before capital moves. Solo investors and syndicators validate the numbers before they raise; brokers and analysts screen and package listings at volume with credible figures; acquisition teams and funds run more pipeline with a consistent first pass — killing weak deals fast and saving the full model for the few worth pursuing. If you underwrite from a T-12, rent roll, and OM, it's for you.",
  },
  {
    question: "How do you keep market-data costs down without weakening the analysis?",
    answer:
      "Third-party market data is metered and expensive, so we don't blanket-pull it. We anchor the underwrite with what's already authoritative — your documents — and let you supply your own view on inputs like rent growth, exit cap, and expense ratios. Paid lookups are reserved for figures that genuinely need an external benchmark. You pay for market data only where it changes the decision.",
  },
  {
    question: "Do you really pull comparables out of the offering memorandum?",
    answer:
      "Yes. Sponsors already assemble rent comps, sales comps, and submarket context inside the OM — so instead of charging you to re-source it, we extract those comps and fold them into the analysis. Combined with the operating statement and rent roll, that builds a benchmarked underwriting summary largely from what you uploaded, reaching for paid external data only to fill real gaps.",
  },
  {
    question: "What do I actually get back from a single deal's credits?",
    answer:
      "A complete, auditable underwrite: a normalized operating statement, structured rent roll and unit mix, in-place and pro forma NOI, cap rate, price per unit, and a cap-rate-driven valuation range stress-tested across exit scenarios — plus a plain-English verdict with risk flags and the questions to ask. Every figure traces back to its source line, so it's review-ready for your committee or lender, not a black box.",
  },
  {
    question: "Which asset classes and document types are supported?",
    answer:
      "Income-producing commercial real estate — multifamily, retail, office, and mixed-use — from the documents that drive an underwrite: offering memorandums, trailing-12 operating statements, and rent rolls, in PDF, Excel, or scanned formats. Because extraction is grounded in the documents rather than scraped listings, the analysis holds up to lender and committee scrutiny.",
  },
]
