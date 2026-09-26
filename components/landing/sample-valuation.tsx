"use client"

import * as React from "react"

/**
 * Interactive valuation panel for the in-page sample (#sample).
 *
 * Self-contained illustrative fixture — Oakline Residences. It is deliberately
 * isolated from any production financial logic, store, or the existing
 * /sample-analysis route dataset. The arithmetic mirrors the approved landing
 * reference exactly: value = in-place NOI ÷ cap rate.
 */
const SAMPLE_DEAL = { inPlaceNoi: 1_480_000, askingPrice: 25_000_000 }

function formatGap(difference: number): string {
  const abs = Math.abs(difference)
  if (abs < 0.5) return "At asking price"
  const direction = difference < 0 ? "below" : "above"
  const amount =
    abs >= 1_000_000
      ? `$${(abs / 1_000_000).toFixed(2)}M`
      : `$${Math.round(abs / 1_000).toLocaleString("en-US")}K`
  const pct = ((abs / SAMPLE_DEAL.askingPrice) * 100).toFixed(2)
  return `${amount} ${direction} ask (${pct}%)`
}

export function SampleValuation() {
  const [rate, setRate] = React.useState(6)

  const value = SAMPLE_DEAL.inPlaceNoi / (rate / 100)
  const difference = value - SAMPLE_DEAL.askingPrice
  const capLabel = `${rate.toFixed(2)}%`
  const valueLabel = `$${(value / 1_000_000).toFixed(2)}M`
  const equation = `$${SAMPLE_DEAL.inPlaceNoi.toLocaleString("en-US")} ÷ ${capLabel} = $${Math.round(
    value,
  ).toLocaleString("en-US")}`
  const gap = formatGap(difference)

  return (
    <div className="analysis">
      <div className="paneltop">
        <strong>Valuation</strong>
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
          Asking price <b>$25.00M</b>
        </span>
        <span id="value-gap">{gap}</span>
      </div>

      <p className="valuation-note">
        At a {capLabel} cap, in-place value is {valueLabel} versus the $25.00M ask.
      </p>
    </div>
  )
}
