"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, UserPlus, LogIn, Loader2, AlertCircle } from "lucide-react"
import { UniversalInput } from "@/components/explorer/universal-input"
import { stageIntake } from "@/lib/uploads/stage-intake-files"
import { designSystem } from "@/lib/design-system"

const neu = {
  card: designSystem.cards.neo,
}

interface HeroInputProps {
  authUrl: string
}

type UploadedFile = { file: File; label: "om" | "rr" | "t12" | "other" }

// Map the hero's compact labels to the document file types the pipeline expects.
const LABEL_TO_FILE_TYPE: Record<UploadedFile["label"], string> = {
  om: "om",
  rr: "rent_roll",
  t12: "t12",
  other: "other",
}

/**
 * Client island holding the interactive underwriting input + auth-prompt modal.
 *
 * When a logged-out visitor clicks "Analyze Property" with documents attached,
 * we stage those files to a private bucket immediately (Option B) and thread the
 * resulting intakeId through the auth flow via `redirect=/explore?claim=<id>`.
 * After they authenticate, /explore claims the intake — creating the deal and
 * starting processing with no need to re-attach anything.
 */
export function HeroInput({ authUrl }: HeroInputProps) {
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [intakeId, setIntakeId] = useState<string | null>(null)
  const [isStaging, setIsStaging] = useState(false)
  const [stageError, setStageError] = useState<string | null>(null)

  const landingAuthUrl = "https://app.investassist.ai/auth"

  const handleAnalyze = async (input: {
    type: string
    value: string | File[]
    files?: UploadedFile[]
  }) => {
    setStageError(null)
    const address = typeof input.value === "string" ? input.value.trim() : ""
    const files = Array.isArray(input.files) ? input.files : []

    // No documents yet → just open the auth prompt (blank new-deal flow).
    if (files.length === 0) {
      setIntakeId(null)
      setShowAuthPrompt(true)
      return
    }

    // Stage the documents immediately so they survive the auth handoff.
    setIsStaging(true)
    setShowAuthPrompt(true)
    try {
      const { intakeId: newIntakeId } = await stageIntake({
        address,
        dealName: address || "Untitled deal",
        files: files.map(({ file, label }) => ({
          file,
          fileType: LABEL_TO_FILE_TYPE[label] ?? "other",
        })),
      })
      setIntakeId(newIntakeId)
    } catch (err) {
      console.error("[HeroInput] staging failed:", err)
      setStageError(err instanceof Error ? err.message : "We couldn't prepare your upload. Please try again.")
    } finally {
      setIsStaging(false)
    }
  }

  const handleContinueToAuth = () => {
    if (isStaging) return
    window.location.assign(landingAuthUrl)
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

            <UniversalInput onAnalyze={handleAnalyze} />
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
              <p className="text-slate-500">
                Create a free account to start your analysis. Your documents are already saved and will be
                processed automatically once you sign in.
              </p>
            </div>

            {/* Staging status */}
            {isStaging && (
              <div className="flex items-center justify-center gap-2 mb-4 text-sm text-slate-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Securely uploading your documents…
              </div>
            )}
            {stageError && (
              <div
                className="flex items-start gap-2 mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{stageError}</span>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleContinueToAuth}
                disabled={isStaging}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold transition-all hover:shadow-lg hover:shadow-slate-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: designSystem.gradients.brand }}
              >
                <UserPlus className="w-5 h-5" />
                Create Free Account
              </button>
              <Link
                href={landingAuthUrl}
                aria-disabled={isStaging}
                onClick={(e) => {
                  if (isStaging) e.preventDefault()
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-slate-700 font-medium border border-slate-200 hover:bg-slate-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 aria-disabled:opacity-60 aria-disabled:cursor-not-allowed"
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
