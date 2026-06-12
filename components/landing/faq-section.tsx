"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { faqItems } from "@/lib/faq-data"

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-5xl mx-auto">
      <dl className="grid lg:grid-cols-2 gap-3 items-start">
        {faqItems.map((item, index) => {
          const isOpen = open === index
          return (
            <div key={item.question} className="rounded-2xl neo-card overflow-hidden">
              <dt>
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base font-semibold text-slate-900">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </dt>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.dd
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{item.answer}</p>
                  </motion.dd>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
