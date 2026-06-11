"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  BarChart3,
  Columns3,
  FileText,
  FileSpreadsheet,
  MapPin,
  Check,
  CheckCircle2,
  TrendingUp,
  Layers,
  Calculator,
  Building2,
} from "lucide-react"
import { designSystem } from "@/lib/design-system"

interface WalkthroughStep {
  id: string
  label: string
  caption: string
  icon: React.ComponentType<{ className?: string }>
  panel: React.ReactNode
}

// ---------------------------------------------------------------------------
// Coded UI panels — crisp, on-brand recreations of the product (no screenshots).
// Each panel is built h-full so it fills the frame edge to edge: no dead space.
// ---------------------------------------------------------------------------

function PanelCard({
  icon: Icon,
  title,
  children,
  footer,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-white/80 border border-slate-100 p-4 md:p-5 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-teal-700" />
        <span className="text-sm font-semibold text-slate-900">{title}</span>
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
      {footer ? <div className="mt-auto pt-3">{footer}</div> : null}
    </div>
  )
}

function StatLine({
  label,
  value,
  strong,
  positive,
  muted,
}: {
  label: string
  value: string
  strong?: boolean
  positive?: boolean
  muted?: boolean
}) {
  return (
    <div className={`flex items-center justify-between ${strong ? "pt-2.5 mt-1 border-t border-slate-100" : ""}`}>
      <span
        className={`text-[13px] ${
          strong ? "font-semibold text-slate-800" : muted ? "text-slate-500" : "text-slate-600"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-[13px] font-bold tabular-nums ${
          strong ? "text-slate-900" : positive ? "text-emerald-600" : "text-slate-700"
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function UploadPanel() {
  const docs = [
    { icon: FileText, name: "Offering Memorandum.pdf", status: "Extracted", done: true },
    { icon: FileSpreadsheet, name: "T-12 Operating Statement.xlsx", status: "Extracted", done: true },
    { icon: FileSpreadsheet, name: "Rent Roll.xlsx", status: "Reading 148 units…", done: false },
  ]
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="rounded-xl bg-white/80 border border-slate-100 px-4 py-3 flex items-center gap-3">
        <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
        <span className="text-sm font-medium text-slate-700">1234 Maple Court, Austin, TX 78704</span>
      </div>
      <div className="flex-1 rounded-xl border-2 border-dashed border-teal-200 bg-teal-50/40 flex flex-col items-center justify-center gap-3 min-h-0">
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
          <Upload className="w-6 h-6 text-teal-600" />
        </div>
        <p className="text-base font-semibold text-slate-700">Drop your deal documents</p>
        <p className="text-xs text-slate-500">PDF, Excel, or scans — OM, T-12, Rent Roll</p>
      </div>
      <div className="space-y-2">
        {docs.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-3 rounded-xl bg-white/80 border border-slate-100 px-4 py-3"
          >
            <d.icon className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-[13px] font-medium text-slate-700 truncate flex-1">{d.name}</span>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                d.done ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {d.done ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExtractPanel() {
  const income = [
    { label: "Gross potential rent", value: "$2.71M" },
    { label: "Other income (RUBS, fees)", value: "+$0.08M" },
    { label: "Vacancy & credit loss", value: "($0.20M)" },
    { label: "Loss-to-lease", value: "($0.13M)" },
    { label: "Effective gross income", value: "$2.46M", strong: true },
  ]
  const expenses = [
    { label: "Property taxes", value: "($0.31M)" },
    { label: "Insurance", value: "($0.09M)" },
    { label: "Utilities", value: "($0.14M)" },
    { label: "Repairs & maintenance", value: "($0.12M)" },
    { label: "Management fee (3%)", value: "($0.10M)" },
    { label: "Payroll & admin", value: "($0.22M)" },
    { label: "Operating expenses", value: "($0.98M)", strong: true },
  ]
  const unitMix = [
    { type: "1BR / 1BA", units: 56, sf: "720", rent: "$1,285" },
    { type: "2BR / 2BA", units: 72, sf: "1,040", rent: "$1,640" },
    { type: "3BR / 2BA", units: 20, sf: "1,310", rent: "$2,010" },
  ]
  const stats = [
    { label: "Occupancy", value: "94.6%" },
    { label: "Avg in-place rent", value: "$1,548" },
    { label: "Loss-to-lease", value: "6.2%" },
    { label: "Avg unit size", value: "962 sf" },
  ]
  return (
    <div className="h-full grid md:grid-cols-2 gap-4">
      <PanelCard icon={BarChart3} title="Extracted T-12 Operating Statement">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Income</p>
        <div className="space-y-2">
          {income.map((l) => (
            <StatLine key={l.label} {...l} />
          ))}
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-1.5">Expenses</p>
        <div className="space-y-2">
          {expenses.map((l) => (
            <StatLine key={l.label} {...l} />
          ))}
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between border-t-2 border-slate-200">
          <span className="text-sm font-semibold text-slate-900 pt-2">Net operating income</span>
          <span className="text-sm font-bold text-teal-700 tabular-nums pt-2">$1.48M</span>
        </div>
      </PanelCard>

      <PanelCard
        icon={Layers}
        title="Rent Roll & Unit Mix"
        footer={
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] text-slate-500">Every figure traces back to a source line</span>
          </div>
        }
      >
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 pb-2">
                Type
              </th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 pb-2">
                Units
              </th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 pb-2">
                Avg SF
              </th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 pb-2">
                Avg Rent
              </th>
            </tr>
          </thead>
          <tbody>
            {unitMix.map((u) => (
              <tr key={u.type} className="border-t border-slate-100">
                <td className="py-2.5 text-[13px] font-medium text-slate-700">{u.type}</td>
                <td className="py-2.5 text-[13px] text-right text-slate-700 tabular-nums">{u.units}</td>
                <td className="py-2.5 text-[13px] text-right text-slate-500 tabular-nums">{u.sf}</td>
                <td className="py-2.5 text-[13px] text-right font-bold text-slate-900 tabular-nums">{u.rent}</td>
              </tr>
            ))}
            <tr className="border-t border-slate-200">
              <td className="py-2.5 text-[13px] font-semibold text-slate-800">Total</td>
              <td className="py-2.5 text-[13px] text-right font-semibold text-slate-800 tabular-nums">148</td>
              <td className="py-2.5 text-[13px] text-right text-slate-500 tabular-nums">962</td>
              <td className="py-2.5 text-[13px] text-right font-bold text-teal-700 tabular-nums">$1,548</td>
            </tr>
          </tbody>
        </table>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-slate-50/80 border border-slate-100 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">{s.label}</p>
              <p className="text-sm font-bold text-slate-900 tabular-nums">{s.value}</p>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}

function UnderwritePanel() {
  const metrics = [
    { label: "Cap Rate", value: "6.4%", sub: "In-place" },
    { label: "NOI", value: "$1.48M", sub: "Year 1" },
    { label: "Price / Unit", value: "$156K", sub: "148 units" },
    { label: "Est. Value", value: "$23.1M", sub: "Income approach" },
  ]
  const noi = [
    { label: "In-place NOI", value: "$1.48M" },
    { label: "Loss-to-lease recapture", value: "+$0.11M", positive: true },
    { label: "Expense normalization", value: "+$0.03M", positive: true },
    { label: "Stabilized (pro forma) NOI", value: "$1.62M", strong: true },
  ]
  const returns = [
    { label: "Going-in cap", value: "6.4%" },
    { label: "Stabilized cap", value: "7.0%" },
    { label: "Yield on cost", value: "7.0%" },
    { label: "DSCR (1.05x stress)", value: "1.42x" },
  ]
  const scenarios = [
    { cap: "5.75%", value: "$28.2M" },
    { cap: "6.00%", value: "$27.0M" },
    { cap: "6.25%", value: "$25.9M", base: true },
    { cap: "6.50%", value: "$24.9M" },
    { cap: "6.75%", value: "$24.0M" },
  ]
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-white/80 border border-slate-100 px-3 py-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">{m.label}</p>
            <p className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{m.value}</p>
            <p className="text-[10px] text-slate-500">{m.sub}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-0">
        <PanelCard icon={Calculator} title="NOI Analysis & Returns">
          <div className="space-y-2.5">
            {noi.map((l) => (
              <StatLine key={l.label} {...l} />
            ))}
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-1.5">
            Return profile
          </p>
          <div className="grid grid-cols-2 gap-2 mt-auto">
            {returns.map((r) => (
              <div key={r.label} className="rounded-lg bg-slate-50/80 border border-slate-100 px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 truncate">{r.label}</p>
                <p className="text-sm font-bold text-slate-900 tabular-nums">{r.value}</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          icon={TrendingUp}
          title="Valuation Scenarios"
          footer={
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Stress-tested on stabilized NOI</span>
              <span className="tabular-nums">Price/SF $162 · GRM 8.5x</span>
            </div>
          }
        >
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 pb-2">
                  Exit Cap
                </th>
                <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 pb-2">
                  Value
                </th>
                <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 pb-2">
                  Δ vs. Base
                </th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr key={s.cap} className={`border-t border-slate-100 ${s.base ? "bg-teal-50/50" : ""}`}>
                  <td className="py-2.5 text-[13px] font-medium text-slate-700">
                    {s.cap}
                    {s.base && <span className="ml-1.5 text-[9px] font-semibold text-teal-600 uppercase">Base</span>}
                  </td>
                  <td className="py-2.5 text-[13px] text-right font-bold text-slate-900 tabular-nums">{s.value}</td>
                  <td
                    className={`py-2.5 text-[13px] text-right tabular-nums ${
                      s.base ? "text-slate-500" : "text-slate-500"
                    }`}
                  >
                    {s.base
                      ? "—"
                      : `${(
                          ((Number.parseFloat(s.value.replace(/[$M]/g, "")) - 25.9) / 25.9) *
                          100
                        ).toFixed(1)}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PanelCard>
      </div>
    </div>
  )
}

function ComparePanel() {
  const rows = [
    { metric: "Cap Rate", vals: ["6.4%", "5.9%", "6.8%"], best: 2 },
    { metric: "Price / Unit", vals: ["$156K", "$172K", "$148K"], best: 2 },
    { metric: "Price / SF", vals: ["$162", "$189", "$151"], best: 2 },
    { metric: "NOI", vals: ["$1.48M", "$1.31M", "$1.62M"], best: 2 },
    { metric: "Expense Ratio", vals: ["40%", "44%", "37%"], best: 2 },
    { metric: "Occupancy", vals: ["94.6%", "96.1%", "92.0%"], best: 1 },
    { metric: "Year Built", vals: ["2008", "2015", "1998"], best: 1 },
  ]
  return (
    <div className="h-full flex flex-col">
      <div className="rounded-xl overflow-hidden border border-slate-100 bg-white/80">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/80">
              <th className="py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Metric</th>
              <th className="py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 text-right">
                Maple
              </th>
              <th className="py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 text-right">
                Riverside
              </th>
              <th className="py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 text-right">
                Oakline
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.metric} className="border-t border-slate-100">
                <td className="py-2.5 px-3 text-[13px] font-medium text-slate-600">{row.metric}</td>
                {row.vals.map((val, i) => (
                  <td
                    key={i}
                    className={`py-2.5 px-3 text-[13px] text-right font-bold tabular-nums ${
                      row.best === i ? "text-teal-700" : "text-slate-900"
                    }`}
                  >
                    {row.best === i ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {val}
                      </span>
                    ) : (
                      val
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-teal-50/60 border border-teal-100 px-4 py-3">
        <TrendingUp className="w-4 h-4 text-teal-600 shrink-0" />
        <span className="text-[13px] text-slate-600">
          <span className="font-semibold text-slate-800">Oakline Residences</span> leads on cap rate, price per unit,
          NOI, and expense efficiency.
        </span>
      </div>
      <div className="mt-auto pt-4 grid grid-cols-3 gap-3">
        {[
          { name: "Maple Court", loc: "Austin, TX", cap: "6.4%", price: "$23.1M" },
          { name: "Riverside Commons", loc: "Denver, CO", cap: "5.9%", price: "$31.8M" },
          { name: "Oakline Residences", loc: "Raleigh, NC", cap: "6.8%", price: "$18.4M", win: true },
        ].map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border px-3 py-3 ${
              p.win ? "bg-teal-50/60 border-teal-200" : "bg-white/80 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 className={`w-4 h-4 shrink-0 ${p.win ? "text-teal-600" : "text-slate-500"}`} />
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-slate-800 truncate">{p.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{p.loc}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Cap {p.cap}</span>
              <span className="text-[12px] font-bold text-slate-900 tabular-nums">{p.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const STEPS: WalkthroughStep[] = [
  {
    id: "upload",
    label: "Upload",
    caption: "Add the property address and drop in the OM, T-12, and rent roll.",
    icon: Upload,
    panel: <UploadPanel />,
  },
  {
    id: "extract",
    label: "Extract",
    caption: "Pull a structured operating statement, rent roll, and unit mix — auditable to the source.",
    icon: Layers,
    panel: <ExtractPanel />,
  },
  {
    id: "underwrite",
    label: "Underwrite",
    caption: "See in-place and pro forma NOI, cap rate, returns, and valuation stress-tested across exit assumptions.",
    icon: BarChart3,
    panel: <UnderwritePanel />,
  },
  {
    id: "compare",
    label: "Compare",
    caption: "Line up deals side by side across the metrics that drive a buying decision.",
    icon: Columns3,
    panel: <ComparePanel />,
  },
]

const AUTO_ADVANCE_MS = 5000

export function ProductWalkthrough() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = mq.matches
    if (mq.matches) setPaused(true)
  }, [])

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % STEPS.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(advance, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused, advance])

  const current = STEPS[active]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Tabs */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 mb-6"
        role="tablist"
        aria-label="Product walkthrough steps"
      >
        {STEPS.map((step, index) => {
          const isActive = index === active
          return (
            <button
              key={step.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`walkthrough-panel-${step.id}`}
              id={`walkthrough-tab-${step.id}`}
              onClick={() => setActive(index)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isActive
                  ? "text-white shadow-md"
                  : "text-slate-600 bg-white/70 hover:bg-white border border-white/60"
              }`}
              style={isActive ? { background: designSystem.gradients.brand } : undefined}
            >
              <step.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{`${index + 1}. ${step.label}`}</span>
              <span className="sm:hidden">{step.label}</span>
            </button>
          )
        })}
      </div>

      {/* Browser-framed product panel */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={designSystem.cards.neo}
        onMouseEnter={() => !reducedMotionRef.current && setPaused(true)}
        onMouseLeave={() => !reducedMotionRef.current && setPaused(false)}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white/80">
          <span className="w-3 h-3 rounded-full bg-red-300" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-amber-300" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-emerald-300" aria-hidden="true" />
          <div className="ml-3 flex-1 max-w-sm">
            <div className="text-xs text-slate-500 bg-slate-50 rounded-md px-3 py-1 text-center truncate">
              app.investassist.ai/explore
            </div>
          </div>
        </div>

        {/* Panel area — content-driven height (no rigid aspect ratio), filled edge to edge */}
        <div className="relative bg-slate-50/60 min-h-[520px] md:h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              id={`walkthrough-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`walkthrough-tab-${current.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 overflow-auto p-5 md:p-7"
            >
              {current.panel}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-slate-500 mt-4 text-sm md:text-base" aria-live="polite">
        {current.caption}
      </p>
    </div>
  )
}
