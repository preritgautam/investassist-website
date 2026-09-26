/**
 * Pure valuation math for the in-page sample (#sample) — Oakline Residences.
 *
 * Extracted from the SampleValuation component so the arithmetic and the exact
 * display strings can be regression-tested independently of React rendering or
 * the dev preview. This module has NO React or DOM dependencies.
 *
 * Every field the component renders (headline value, cap label, equation,
 * ask-comparison gap, and note) is derived here from a single `rate` input, so
 * the UI can never show two fields computed from different states.
 */
export interface SampleDeal {
  /** NOI as currently operating (contract rent, other income, vacancy). */
  inPlaceNoi: number
  /** NOI as presented in the seller's offering. Not reconciled to in-place. */
  sellerReportedNoi: number
  askingPrice: number
}

export const SAMPLE_DEAL: SampleDeal = {
  inPlaceNoi: 1_480_000,
  sellerReportedNoi: 1_620_000,
  askingPrice: 25_000_000,
}

/** `$1.48M` style label. */
export function formatMillions(n: number): string {
  return `$${(n / 1_000_000).toFixed(2)}M`
}

/** Short absolute label: `$140K` under $1M, `$1.62M` at/above $1M. */
export function formatShort(n: number): string {
  const abs = Math.abs(n)
  return abs >= 1_000_000
    ? `$${(abs / 1_000_000).toFixed(2)}M`
    : `$${Math.round(abs / 1_000).toLocaleString("en-US")}K`
}

export interface SampleSummary {
  /** Difference between seller-reported and in-place NOI (signed). */
  noiDifference: number
  /** In-place cap rate implied by the asking price, as a percent number. */
  capAtAsk: number
  inPlaceNoiLabel: string
  sellerReportedNoiLabel: string
  askingPriceLabel: string
  noiDifferenceLabel: string
  capAtAskLabel: string
}

/**
 * Static findings for the sample, all derived from the fixture so the card
 * copy can never drift from the numbers. `capAtAsk` uses the in-place NOI;
 * `noiDifference` is seller-reported minus in-place.
 */
export function computeSampleSummary(deal: SampleDeal = SAMPLE_DEAL): SampleSummary {
  const noiDifference = deal.sellerReportedNoi - deal.inPlaceNoi
  const capAtAsk = (deal.inPlaceNoi / deal.askingPrice) * 100
  return {
    noiDifference,
    capAtAsk,
    inPlaceNoiLabel: formatMillions(deal.inPlaceNoi),
    sellerReportedNoiLabel: formatMillions(deal.sellerReportedNoi),
    askingPriceLabel: formatMillions(deal.askingPrice),
    noiDifferenceLabel: formatShort(noiDifference),
    capAtAskLabel: `${capAtAsk.toFixed(2)}%`,
  }
}

/** Income approach: value = in-place NOI ÷ cap rate. Unrounded. */
export function computeValue(rate: number, deal: SampleDeal = SAMPLE_DEAL): number {
  return deal.inPlaceNoi / (rate / 100)
}

/** Human-readable gap vs asking price, matching the approved reference. */
export function formatGap(difference: number, deal: SampleDeal = SAMPLE_DEAL): string {
  const abs = Math.abs(difference)
  if (abs < 0.5) return "At asking price"
  const direction = difference < 0 ? "below" : "above"
  const amount =
    abs >= 1_000_000
      ? `$${(abs / 1_000_000).toFixed(2)}M`
      : `$${Math.round(abs / 1_000).toLocaleString("en-US")}K`
  const pct = ((abs / deal.askingPrice) * 100).toFixed(2)
  return `${amount} ${direction} ask (${pct}%)`
}

export interface Valuation {
  value: number
  difference: number
  capLabel: string
  valueLabel: string
  equation: string
  gap: string
}

/** Single source of truth for all sample fields at a given cap rate. */
export function computeValuation(rate: number, deal: SampleDeal = SAMPLE_DEAL): Valuation {
  const value = computeValue(rate, deal)
  const difference = value - deal.askingPrice
  const capLabel = `${rate.toFixed(2)}%`
  const valueLabel = `$${(value / 1_000_000).toFixed(2)}M`
  const equation = `$${deal.inPlaceNoi.toLocaleString("en-US")} ÷ ${capLabel} = $${Math.round(
    value,
  ).toLocaleString("en-US")}`
  const gap = formatGap(difference, deal)
  return { value, difference, capLabel, valueLabel, equation, gap }
}
