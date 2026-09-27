import type { Article } from "./types"

/**
 * Seed Insights library. Original, evidence-backed editorial on CRE
 * underwriting — written to be genuinely useful, not keyword-stuffed. Each
 * piece cross-links to related articles and ends with a single CTA back to
 * "Analyze your first deal free" (rendered by the article template).
 */

const TEAM = {
  name: "The InvestAssist Team",
  role: "CRE underwriting analysts",
}

export const ARTICLES: Article[] = [
  {
    slug: "reading-a-t12-operating-statement",
    title: "How to read a T-12 the way an underwriter does",
    description:
      "A trailing-twelve operating statement hides as much as it shows. Here is how experienced buy-side underwriters read a T-12 line by line before trusting a single number.",
    excerpt:
      "The T-12 is the first document you open and the easiest to misread. A field guide to the lines that move a deal — and the ones sellers lean on.",
    topic: "T-12 analysis",
    author: TEAM,
    publishedAt: "2026-01-14",
    updatedAt: "2026-01-14",
    relatedSlugs: ["noi-reconciliation-reported-vs-reconstructed", "rent-roll-analysis-multifamily"],
    body: [
      {
        type: "paragraph",
        text: "A trailing-twelve-month operating statement — the T-12 — is the most-cited and least-questioned document in a multifamily deal package. It looks authoritative: twelve columns of actuals, a tidy net operating income at the bottom. But a T-12 is a narrative the seller chose to tell, and the way it is assembled decides how flattering that narrative is. Reading it well means separating what the property actually did from how the statement was framed.",
      },
      { type: "heading", text: "Start with the period, not the numbers" },
      {
        type: "paragraph",
        text: "Before you read a single dollar figure, confirm what the twelve months actually are. A true trailing twelve ends in the most recent closed month. Sellers frequently present a T-12 that ends several months stale, or splice a strong recent quarter onto an older base to annualize a number the property has never actually earned over a full year.",
      },
      {
        type: "list",
        items: [
          "Confirm the exact start and end month, and that all twelve are consecutive and closed.",
          "Watch for annualized or partial-period figures dressed up as trailing actuals.",
          "Check that the statement basis is consistent — cash vs. accrual should not switch mid-year.",
        ],
      },
      { type: "heading", text: "Income: reconstruct it, do not accept it" },
      {
        type: "paragraph",
        text: "Gross potential rent, loss-to-lease, concessions, vacancy, and other income each carry assumptions. The single most common inflation is understating economic vacancy — showing physical occupancy while quietly omitting the concessions and non-paying units that reduce collected rent. Rebuild effective gross income from the rent roll rather than trusting the summary line, and the gap between the two is often the first real finding of the deal.",
      },
      {
        type: "callout",
        title: "The reconciliation habit",
        text: "Any income line on the T-12 that you cannot rebuild from the rent roll or a bank deposit is an assumption, not an actual. Treat it as unresolved until it reconciles.",
      },
      { type: "heading", text: "Expenses: look for what is missing" },
      {
        type: "paragraph",
        text: "Expense manipulation is usually subtraction, not addition. Management fees below market, deferred maintenance booked as capital, property taxes that have not yet reassessed to the purchase price, and payroll that will not survive a management change all understate the real operating cost. The most defensible expense ratio comes from normalizing each line to what a new owner will actually pay — not from the seller's trailing figure.",
      },
      {
        type: "subheading",
        text: "The three expenses that reset at sale",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Property taxes — reassessment to the new basis can move NOI materially in many jurisdictions.",
          "Insurance — trailing premiums rarely reflect current market pricing.",
          "Management and payroll — in-place staffing is often below a third-party managed cost.",
        ],
      },
      { type: "heading", text: "Only then, net operating income" },
      {
        type: "paragraph",
        text: "By the time you reach NOI, you should have already rebuilt income from the rent roll and normalized expenses. The reported NOI becomes a checkpoint, not a conclusion — a number to reconcile against your reconstruction. When the two diverge, the difference is the deal's real story, and it is exactly the kind of gap our NOI reconciliation work is designed to make visible.",
      },
    ],
  },
  {
    slug: "noi-reconciliation-reported-vs-reconstructed",
    title: "NOI reconciliation: closing the gap between reported and reconstructed",
    description:
      "Reported NOI and the NOI you can rebuild from source documents rarely match. Reconciling the two — line by line — is where underwriting conviction actually comes from.",
    excerpt:
      "The seller's NOI and the NOI you rebuild from the documents almost never agree. The reconciliation between them is the most valuable number in the package.",
    topic: "NOI reconciliation",
    author: TEAM,
    publishedAt: "2026-01-21",
    updatedAt: "2026-01-21",
    relatedSlugs: ["reading-a-t12-operating-statement", "rent-roll-analysis-multifamily"],
    body: [
      {
        type: "paragraph",
        text: "Every offering memorandum states a net operating income. Every T-12 states one too. And the NOI you can reconstruct from the rent roll and the operating statement is a third number. Underwriting conviction does not come from picking one of the three — it comes from reconciling them and understanding precisely why they differ.",
      },
      { type: "heading", text: "Why the numbers diverge" },
      {
        type: "paragraph",
        text: "The gap between reported and reconstructed NOI is not usually fraud. It is the accumulation of ordinary framing choices: a management fee assumption, a market-rent line applied to vacant units, taxes held at the seller's basis, capital items reclassified below the NOI line. Each is individually defensible and collectively material. Reconciliation is the discipline of naming each contributor to the gap.",
      },
      {
        type: "callout",
        title: "A gap you can explain is an asset",
        text: "A reconciled $140K difference you can attribute to three specific lines is far more useful than a single NOI you cannot defend. The explanation is the underwriting.",
      },
      { type: "heading", text: "A reconciliation that holds up" },
      {
        type: "list",
        ordered: true,
        items: [
          "Rebuild effective gross income from the rent roll — actual leases, concessions, and economic vacancy.",
          "Normalize each expense line to what a new owner will pay, flagging taxes, insurance, and management.",
          "Compute a reconstructed NOI and place it beside the reported figure.",
          "Attribute every dollar of the difference to a named line — no residual 'other'.",
          "Keep anything that does not reconcile visible as an open item, not buried.",
        ],
      },
      { type: "heading", text: "Cap rate at ask, honestly" },
      {
        type: "paragraph",
        text: "Once you have a reconstructed NOI you can defend, the cap rate at the asking price becomes an honest number rather than a marketing one. Dividing your reconstructed NOI by the ask — not the seller's NOI by the ask — is often the single most clarifying calculation in the entire review, and it frequently reframes whether the deal is worth pursuing at all.",
      },
      {
        type: "paragraph",
        text: "This is the core of how InvestAssist reads a deal: reported and reconstructed side by side, every difference attributed, and nothing that fails to reconcile quietly dropped. For the document-level mechanics that feed this, start with reading the T-12 and analyzing the rent roll.",
      },
    ],
  },
  {
    slug: "rent-roll-analysis-multifamily",
    title: "Rent roll analysis for multifamily underwriting",
    description:
      "The rent roll is the ground truth of a multifamily deal. Here is how to turn a raw unit-level export into economic vacancy, loss-to-lease, and a defensible income base.",
    excerpt:
      "Physical occupancy is the number sellers quote. Economic occupancy is the number that pays the mortgage. The rent roll is where you find the difference.",
    topic: "Multifamily underwriting",
    author: TEAM,
    publishedAt: "2026-01-28",
    updatedAt: "2026-01-28",
    relatedSlugs: ["reading-a-t12-operating-statement", "noi-reconciliation-reported-vs-reconstructed"],
    body: [
      {
        type: "paragraph",
        text: "If the T-12 is the story a seller tells, the rent roll is the ground truth underneath it. It is a unit-by-unit snapshot of who is paying what, on which lease, with which concessions. Read carefully, it produces a defensible income base that no summary statement can override — which is exactly why it deserves more scrutiny than any other document in the package.",
      },
      { type: "heading", text: "Physical vs. economic occupancy" },
      {
        type: "paragraph",
        text: "A property can be 96% physically occupied and materially below that economically. Units occupied by non-paying tenants, employees, or models; heavy concessions burning off collected rent; and tenants in arrears all separate the occupancy a broker quotes from the rent actually collected. Economic occupancy — collected rent over gross potential rent — is the number that services debt.",
      },
      { type: "heading", text: "Loss-to-lease is a signal, not just a line" },
      {
        type: "paragraph",
        text: "The spread between in-place rents and current market rents — loss-to-lease — tells you how much embedded upside is real versus already captured. A large loss-to-lease can be genuine upside or a sign that the market-rent assumption is aggressive. Testing that assumption against actual recent leases, not a pro forma, is what separates underwriting from wishful thinking.",
      },
      {
        type: "subheading",
        text: "What to extract from every rent roll",
      },
      {
        type: "list",
        items: [
          "In-place rent per unit and per square foot, by floor plan.",
          "Lease start and end dates, to see how much of the roll turns over in year one.",
          "Concessions and their burn-off schedule.",
          "Delinquency and non-revenue units, separated from vacant units.",
        ],
      },
      {
        type: "callout",
        title: "Rebuild, then compare",
        text: "The income base you rebuild from the rent roll is what you carry into NOI reconciliation. If it disagrees with the T-12, the rent roll usually wins.",
      },
      {
        type: "paragraph",
        text: "A rent roll rebuilt this way feeds directly into a defensible NOI and an honest cap rate at ask. It is the same unit-level discipline InvestAssist applies automatically — extracting the roll, computing economic vacancy and loss-to-lease, and keeping anything ambiguous visible rather than smoothing it away.",
      },
    ],
  },
]
