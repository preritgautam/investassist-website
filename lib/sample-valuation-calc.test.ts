import { test } from "node:test"
import assert from "node:assert/strict"
import { computeValuation, SAMPLE_DEAL } from "./sample-valuation-calc.ts"

/**
 * Regression coverage for the #sample interactive valuation.
 *
 * Runs on Node's built-in test runner (no framework dependency):
 *   node --test lib/sample-valuation-calc.test.ts
 *
 * The three reference cap rates plus the exact-ask boundary. Because the
 * component renders these same derived strings, asserting them here also pins
 * the dependent UI fields (headline value, cap label, equation, gap).
 */

test("5.00% cap → $29.60M, $4.60M above ask", () => {
  const r = computeValuation(5)
  assert.equal(r.value, 29_600_000)
  assert.equal(r.capLabel, "5.00%")
  assert.equal(r.valueLabel, "$29.60M")
  assert.equal(r.equation, "$1,480,000 ÷ 5.00% = $29,600,000")
  assert.equal(r.gap, "$4.60M above ask (18.40%)")
})

test("6.00% cap → $24.67M, ~$333K below ask", () => {
  const r = computeValuation(6)
  assert.ok(Math.abs(r.value - 24_666_666.67) < 0.01)
  assert.equal(r.capLabel, "6.00%")
  assert.equal(r.valueLabel, "$24.67M")
  assert.equal(r.equation, "$1,480,000 ÷ 6.00% = $24,666,667")
  assert.equal(r.gap, "$333K below ask (1.33%)")
})

test("7.00% cap → $21.14M, ~$3.86M below ask", () => {
  const r = computeValuation(7)
  assert.ok(Math.abs(r.value - 21_142_857.14) < 0.01)
  assert.equal(r.capLabel, "7.00%")
  assert.equal(r.valueLabel, "$21.14M")
  assert.equal(r.equation, "$1,480,000 ÷ 7.00% = $21,142,857")
  assert.equal(r.gap, "$3.86M below ask (15.43%)")
})

test("exact-ask boundary reports 'At asking price'", () => {
  // Cap rate that reproduces the asking price exactly: NOI / askingPrice.
  const rate = (SAMPLE_DEAL.inPlaceNoi / SAMPLE_DEAL.askingPrice) * 100
  const r = computeValuation(rate)
  assert.equal(r.gap, "At asking price")
})

test("gap sign flips around the asking price", () => {
  assert.match(computeValuation(5).gap, /above ask/)
  assert.match(computeValuation(7).gap, /below ask/)
})
