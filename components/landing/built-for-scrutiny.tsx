"use client"

import { useState } from "react"

/**
 * "Built for scrutiny" — the second section on the landing page, directly below
 * the hero. An interactive three-state walkthrough that shows what a clear basis
 * looks like at each stage of a first-pass analysis: understanding the NOI,
 * testing the valuation, and focusing the diligence.
 *
 * All figures are ILLUSTRATIVE and internally consistent (direct capitalization
 * of a $1.48M in-place NOI). They are presentation-only reference copy — nothing
 * here is a live calculation or a feature unlock.
 *
 * The three principles beneath the divider ("Separate fact from assumption",
 * etc.) live here rather than in the hero so this section carries the full
 * "made legible" argument in one place.
 */

type LedgerRow = { label: string; value: string; feat?: boolean }
type FindingRow = { label: string; action: string; desc: string }

type ScrutinyState = {
  id: string
  num: string
  tab: string
  kicker: string
  title: string
} & (
  | { kind: "ledger"; rows: LedgerRow[]; note: string }
  | { kind: "findings"; findings: FindingRow[]; note: string }
)

const STATES: ScrutinyState[] = [
  {
    id: "noi",
    num: "01",
    tab: "Understand the NOI",
    kicker: "Illustrative financials · Annual basis",
    title: "Understand what drives the NOI.",
    kind: "ledger",
    rows: [
      { label: "Annual in-place income", value: "$2,460,000" },
      { label: "Annual operating expenses", value: "($980,000)" },
      { label: "In-place NOI", value: "$1,480,000", feat: true },
    ],
    note: "Rent-roll income and operating expenses shown on a consistent annual basis. Source periods and assumptions remain visible.",
  },
  {
    id: "valuation",
    num: "02",
    tab: "Test the valuation",
    kicker: "Illustrative offer analysis",
    title: "See how assumptions change value.",
    kind: "ledger",
    rows: [
      { label: "5.50% cap rate", value: "$26.91M" },
      { label: "6.00% cap rate", value: "$24.67M", feat: true },
      { label: "6.50% cap rate", value: "$22.77M" },
    ],
    note: "Direct capitalization of $1.48M in-place NOI. These are illustrative assumptions, not market comparables or an appraisal.",
  },
  {
    id: "diligence",
    num: "03",
    tab: "Focus the diligence",
    kicker: "Illustrative review findings",
    title: "Make the next conversation specific.",
    kind: "findings",
    findings: [
      {
        label: "Income basis",
        action: "Review",
        desc: "What explains the difference between seller-reported income and current rent-roll collections?",
      },
      {
        label: "Expense coverage",
        action: "Confirm",
        desc: "Do the financials include a full year of property taxes and insurance?",
      },
    ],
    note: "A finding starts a diligence conversation. It does not establish that the seller\u2019s numbers are wrong.",
  },
]

export function BuiltForScrutiny() {
  const [active, setActive] = useState(0)
  const state = STATES[active]

  return (
    <section className="section wrap scrutiny" id="scrutiny" aria-labelledby="scrutiny-title">
      <div className="scrutiny-top">
        <div className="scrutiny-intro">
          <div className="eyebrow">Built for scrutiny</div>
          <h2 id="scrutiny-title">
            Every number needs <br />
            a clear basis.
          </h2>
          <p className="section-lead">
            A useful analysis shows how it was built. Review the source periods, income basis, and assumptions before
            drawing a conclusion.
          </p>

          <ul className="scrutiny-states" role="tablist" aria-label="What a clear basis looks like">
            {STATES.map((s, i) => (
              <li key={s.id} className={i === active ? "active" : undefined}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="scrutiny-panel"
                  onClick={() => setActive(i)}
                >
                  <span className="num">{s.num}</span>
                  <span className="txt">{s.tab}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="scrutiny-card" id="scrutiny-panel" role="tabpanel" aria-live="polite">
          <span className="scrutiny-kicker">{state.kicker}</span>
          <h3>{state.title}</h3>

          {state.kind === "ledger" ? (
            <div className="scrutiny-ledger">
              {state.rows.map((row) => (
                <div key={row.label} className={row.feat ? "scrutiny-row feat" : "scrutiny-row"}>
                  <span>{row.label}</span>
                  <b>{row.value}</b>
                </div>
              ))}
            </div>
          ) : (
            <div className="scrutiny-findings">
              {state.findings.map((f) => (
                <div key={f.label} className="scrutiny-finding">
                  <div className="finding-row">
                    <span>{f.label}</span>
                    <b>{f.action}</b>
                  </div>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          )}

          <p className="scrutiny-note">{state.note}</p>
        </div>
      </div>

      <div className="scrutiny-principles">
        <div>
          <h3>Separate fact from assumption</h3>
          <p>
            Historical performance, annualized estimates, and market-rent scenarios serve different purposes. Keep each
            basis explicit.
          </p>
        </div>
        <div>
          <h3>Keep open questions visible</h3>
          <p>
            Missing data and unexplained differences need investigation. An incomplete analysis should not imply
            certainty.
          </p>
        </div>
        <div>
          <h3>Keep the decision with your team</h3>
          <p>Use an organized first pass to support diligence, broker questions, and investment discussions.</p>
        </div>
      </div>
    </section>
  )
}
