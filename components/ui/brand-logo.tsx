import Link from "next/link"
import { cn } from "@/lib/utils"
import { LOGO_ALT } from "@/lib/design-system"

interface BrandLogoProps {
  /** Link destination. Pass `null` to render without a surrounding link. */
  href?: string | null
  /** Optional extra classes on the outer wrapper. */
  className?: string
  /** Rendered pixel width of the artwork. Height scales with aspect ratio. */
  width?: number
}

/**
 * Theme-aware InvestAssist wordmark.
 *
 * Both SVGs are rendered and swapped with CSS so the correct artwork is present
 * before first paint — no theme-flash and no JS/hydration dependency. The
 * black+brown mark shows on light surfaces; the white+brown mark shows under the
 * `.dark` class or an `.on-ink` band. Never approximated with CSS filters.
 */
export function BrandLogo({ href = "/", className, width = 148 }: BrandLogoProps) {
  const art = (
    <span className="brand-logo" style={{ width }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-on-light" src="/brand/investassist-mark-light.svg" alt="InvestAssist" width={width} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-on-dark" src="/brand/investassist-mark-dark.svg" alt="" aria-hidden="true" width={width} />
    </span>
  )

  if (href === null) {
    return <span className={cn("brand-logo-wrap", className)}>{art}</span>
  }

  return (
    <Link href={href} className={cn("brand-logo-wrap", className)} aria-label="InvestAssist home">
      {art}
    </Link>
  )
}
