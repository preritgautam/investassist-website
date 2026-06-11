"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { UniversalInput } from "@/components/explorer/universal-input"
import { designSystem } from "@/lib/design-system"

const neu = {
  card: designSystem.cards.neo,
}

interface HeroInputProps {
  authUrl: string
}
export function HeroInput({ authUrl }: HeroInputProps) {
  const router = useRouter()
  const handleAnalyze = () => {
    router.push(authUrl)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-xl mx-auto lg:mx-0"
    >
      <div className="relative">
        <div
          className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(13,148,136,0.20) 0%, rgba(15,23,42,0.08) 60%, transparent 100%)",
          }}
        />

        <div className="relative rounded-2xl p-6 md:p-8" style={neu.card}>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">Start your underwriting</h2>
          </div>

          <UniversalInput onAnalyze={handleAnalyze} />
        </div>
      </div>
    </motion.div>
  )
}
