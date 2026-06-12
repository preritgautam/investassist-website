"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, UserPlus, LogIn } from "lucide-react"
import { UniversalInput } from "@/components/explorer/universal-input"
import { buildAuthUrl, buildMainAppUrl } from "@/lib/app-url"
import { designSystem } from "@/lib/design-system"

const neu = {
  card: designSystem.cards.neo,
}

interface HeroInputProps {
  authUrl: string
}

/**
 * Client island holding the interactive underwriting input + auth-prompt modal.
 *
 * Implements cross-domain Option A: capture lightweight intent (address only),
 * redirect to auth with address in URL params, then land on /explore?address=<encoded>.
 * User re-attaches documents after signup — one-step friction, honest UX.
 */
export function HeroInput({ authUrl }: HeroInputProps) {
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  const landingAuthUrl = buildAuthUrl()

  const handleAnalyze = (input: {
    type: string
    value: string
  }) => {
    const address = typeof input.value === "string" ? input.value.trim() : ""
    
    if (!address) {
      return
    }

    // Capture the address and show auth prompt
    setSelectedAddress(address)
    setShowAuthPrompt(true)
  }

  const handleContinueToAuth = () => {
    if (!selectedAddress) return

    const exploreUrl = buildMainAppUrl(`/explore?address=${encodeURIComponent(selectedAddress)}`)
    window.location.assign(buildAuthUrl(exploreUrl))
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-xl mx-auto lg:mx-0"
      >
        <div className="relative">
          {/* Subtle glow behind the card */}
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

            <UniversalInput onAnalyze={handleAnalyze} addressOnly />
          </div>
        </div>
      </motion.div>

      {/* Auth Prompt Modal */}
      {showAuthPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAuthPrompt(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-md rounded-2xl p-6 md:p-8"
            style={neu.card}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Underwrite</h3>
              <p className="text-slate-500 text-sm">
                Create a free account and we&apos;ll have your property address ready. Upload your documents to begin the analysis.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleContinueToAuth}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold transition-all hover:shadow-lg hover:shadow-slate-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                style={{ background: designSystem.gradients.brand }}
              >
                <UserPlus className="w-5 h-5" />
                Create Free Account
              </button>
              <Link
                href={landingAuthUrl}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-slate-700 font-medium border border-slate-200 hover:bg-slate-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                <LogIn className="w-5 h-5" />
                I Already Have an Account
              </Link>
            </div>

            <p className="text-center text-xs text-slate-500 mt-4">
              No credit card required. Get 3 free analyses to start.
            </p>
          </motion.div>
        </div>
      )}
    </>
  )
}
