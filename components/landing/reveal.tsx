"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Animation delay in seconds */
  delay?: number
  /** Initial X offset */
  x?: number
  /** Initial Y offset */
  y?: number
}

/**
 * Lightweight client island that wraps server-rendered children with a
 * scroll-triggered entrance animation. Keeps the bulk of the landing page
 * as static RSC markup while preserving the motion feel.
 */
export function Reveal({ children, className, delay = 0, x = 0, y = 16 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
