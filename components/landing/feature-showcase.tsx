"use client"

import { motion } from "framer-motion"
import { Calculator, TrendingUp, Layers } from "lucide-react"

const noiBridge = [
  { label: "Effective gross income", value: "$2.46M" },
  { label: "Operating expenses", value: "($0.98M)" },
  { label: "In-place NOI", value: "$1.48M", strong: true },
  { label: "Loss-to-lease + normalization", value: "+$0.14M" },
  { label: "Stabilized NOI", value: "$1.62M", strong: true },
]

const unitMix = [
  { type: "1BR / 1BA", units: 56, rent: "$1,285" },
  { type: "2BR / 2BA", units: 72, rent: "$1,640" },
  { type: "3BR / 2BA", units: 20, rent: "$2,010" },
]

const scenarios = [
  { cap: "5.75%", value: "$28.2M", delta: "+22%" },
  { cap: "6.25%", value: "$25.9M", delta: "Base", base: true },
  { cap: "6.75%", value: "$24.0M", delta: "-7%" },
  { cap: "7.25%", value: "$22.3M", delta: "-14%" },
]

export function FeatureShowcase() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Underwriting summary card */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl p-6 md:p-8 neo-card"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Underwriting Summary</h3>
        </div>
        <p className="text-sm text-slate-500 mb-5 leading-relaxed">
          Go from raw documents to a clean NOI bridge and unit mix — separating the in-place
          deal from the stabilized business plan, with every line auditable to its source.
        </p>

        <div className="grid sm:grid-cols-2 gap-4" aria-hidden="true">
          {/* NOI bridge */}
          <div className="rounded-xl border border-slate-100 bg-white/70 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">NOI Bridge</p>
            <div className="space-y-2">
              {noiBridge.map((l) => (
                <div
                  key={l.label}
                  className={`flex items-center justify-between gap-2 ${l.strong ? "pt-2 border-t border-slate-100" : ""}`}
                >
                  <span className={`text-[11px] ${l.strong ? "font-semibold text-slate-800" : "text-slate-500"}`}>
                    {l.label}
                  </span>
                  <span className={`text-[11px] font-bold whitespace-nowrap ${l.strong ? "text-teal-700" : "text-slate-700"}`}>
                    {l.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Unit mix */}
          <div className="rounded-xl border border-slate-100 bg-white/70 p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Unit Mix</p>
            </div>
            <table className="w-full">
              <tbody>
                {unitMix.map((u) => (
                  <tr key={u.type} className="border-b border-slate-50 last:border-0">
                    <td className="py-1.5 text-[11px] font-medium text-slate-700">{u.type}</td>
                    <td className="py-1.5 text-[11px] text-right text-slate-500">{u.units}</td>
                    <td className="py-1.5 text-[11px] text-right font-bold text-slate-900">{u.rent}</td>
                  </tr>
                ))}
                <tr className="border-t border-slate-200">
                  <td className="py-1.5 text-[11px] font-semibold text-slate-800">148 units</td>
                  <td className="py-1.5" />
                  <td className="py-1.5 text-[11px] text-right font-bold text-teal-700">$1,548</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.article>

      {/* Valuation scenarios card */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-6 md:p-8 neo-card"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Valuation Scenarios</h3>
        </div>
        <p className="text-sm text-slate-500 mb-5 leading-relaxed">
          Pressure-test value across a range of exit cap rates instead of betting on a single
          number — so you underwrite to a defensible range and know your downside before you bid.
        </p>

        <div className="rounded-xl overflow-hidden border border-slate-100" aria-hidden="true">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="py-2 px-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Exit Cap Rate</th>
                <th className="py-2 px-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500 text-right">Value</th>
                <th className="py-2 px-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500 text-right">Δ vs Base</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr key={s.cap} className={`border-t border-slate-100 ${s.base ? "bg-teal-50/50" : ""}`}>
                  <td className="py-2.5 px-4 text-xs font-medium text-slate-700">
                    {s.cap}
                    {s.base && <span className="ml-1.5 text-[9px] font-semibold text-teal-600 uppercase">Base</span>}
                  </td>
                  <td className="py-2.5 px-4 text-xs text-right font-bold text-slate-900">{s.value}</td>
                  <td className={`py-2.5 px-4 text-xs text-right font-semibold ${s.base ? "text-slate-500" : "text-slate-500"}`}>
                    {s.delta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 mt-3">Applied to stabilized NOI of $1.62M (direct capitalization).</p>
      </motion.article>
    </div>
  )
}
