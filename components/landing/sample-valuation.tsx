"use client"

import * as React from "react"
import { SAMPLE_DEAL, computeValuation, formatMillions } from "@/lib/sample-valuation-calc"

/**
 * Interactive valuation panel for the in-page sample (#sample).
 *
 * Self-contained illustrative fixture — Oakline Residences. It is deliberately
 * isolated from any production financial logic, store, or the existing
 * /sample-analysis route dataset. All displayed fields derive from a single
 * `rate` state via `computeValuation`, so no two fields can reflect different
 * states. The pure math lives in `lib/sample-valuation-calc` and is covered by
 * `lib/sample-valuation-calc.test.ts`.
 */
export function SampleValuation() {
  const [rate, setRate] = React.useState(6)

  const { capLabel, valueLabel, equation, gap } = computeValuation(rate)
  const askLabel = formatMillions(SAMPLE_DEAL.askingPrice)

  return (
    <div className="analysis">
      <div className="paneltop">
        <strong>In-place valuation</strong>
        <span className="pill">Income approach</span>
      </div>

      <p className="valuation-basis">
        In-place NOI <b>${SAMPLE_DEAL.inPlaceNoi.toLocaleString("en-US")}</b> ÷ cap rate
      </p>

      <div className="value">
        <strong>{valueLabel}</strong>
        <small>at {capLabel} cap</small>
      </div>

      <label className="sr-only" htmlFor="caprange">
        Cap rate
      </label>
      <input
        id="caprange"
        type="range"
        min={5}
        max={7}
        step={0.05}
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
        aria-valuetext={capLabel}
      />
      <div className="scale">
        <span>5.00%</span>
        <span>6.00%</span>
        <span>7.00%</span>
      </div>

      <p className="valuation-equation">{equation}</p>

      <div className="ask-comparison">
        <span>
          Asking price <b>{askLabel}</b>
        </span>
        <span id="value-gap">{gap}</span>
      </div>

      <p className="valuation-note">
        At a {capLabel} cap, in-place value is {valueLabel} versus the {askLabel} ask.
      </p>
    </div>
  )
}
