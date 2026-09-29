"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export type LegalOrigin = "auth" | "help" | "home"

const ORIGINS: Record<LegalOrigin, { label: string; href: string }> = {
  auth: { label: "Back to sign in", href: "/auth" },
  help: { label: "Back to Help", href: "/account?tab=help" },
  home: { label: "Back to home", href: "/" },
}

export function resolveLegalOrigin(from: string | null | undefined): LegalOrigin {
  return from === "auth" || from === "help" ? from : "home"
}

/** Builds a legal-page link that remembers where the user came from. */
export function legalHref(page: "terms" | "privacy" | "acceptable-use" | "dpa", from: LegalOrigin) {
  return `/legal/${page}?from=${from}`
}

function BackLinkInner() {
  const origin = ORIGINS[resolveLegalOrigin(useSearchParams().get("from"))]
  return <BackLinkButton label={origin.label} href={origin.href} />
}

function BackLinkButton({ label, href }: { label: string; href: string }) {
  return (
    <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
      <Link href={href}>
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {label}
      </Link>
    </Button>
  )
}

export function LegalBackLink() {
  return (
    <Suspense fallback={<BackLinkButton label={ORIGINS.home.label} href={ORIGINS.home.href} />}>
      <BackLinkInner />
    </Suspense>
  )
}
