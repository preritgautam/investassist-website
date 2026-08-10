"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { designSystem } from "@/lib/design-system"

const neu = {
  inset: designSystem.cards.inset,
}

const personas = [
  { icon: TrendingUp, label: "Investors & Sponsors" },
  { icon: Users, label: "Brokers & Analysts" },
  { icon: Building2, label: "Acquisition Teams" },
]

const details = [
  {
    title: "Independent Investors & Sponsors",
    description:
      "Solo buyers, boutique GPs, and syndicators who underwrite their own deals. Validate the numbers before you raise, then walk into LP conversations with benchmarked, defensible analysis.",
  },
  {
    title: "Brokers & Deal Analysts",
    description:
      "Screen OMs and T-12s at volume, package listings with credible data-backed numbers, and give every client an underwriting read they can actually trust.",
  },
  {
    title: "Acquisition Teams & Funds",
    description:
      "Run more pipeline with a consistent, defensible first pass. Kill the weak deals faster and reserve your full model for the handful actually worth pursuing.",
  },
]

export function PersonaTabs() {
  const [activePersona, setActivePersona] = useState(0)

  return (
    <>
      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Who InvestAssist is for">
        {personas.map((persona, index) => {
          const isActive = activePersona === index
          return (
            <button
              key={persona.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActivePersona(index)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                isActive ? "text-white shadow-sm" : "text-slate-600 bg-slate-100/80 hover:bg-slate-200/80",
              )}
              style={isActive ? { background: designSystem.gradients.brand } : undefined}
            >
              <persona.icon className="w-4 h-4" />
              {persona.label}
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      <div className="rounded-xl p-5" style={neu.inset}>
        {details.map((persona, index) => (
          <motion.div
            key={persona.title}
            role="tabpanel"
            hidden={activePersona !== index}
            initial={false}
            animate={activePersona === index ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activePersona === index && (
              <>
                <h4 className="text-base font-semibold text-slate-900 mb-2">{persona.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{persona.description}</p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </>
  )
}
