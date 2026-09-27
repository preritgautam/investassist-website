import Link from "next/link"
import { cn } from "@/lib/utils"
import { BRAND_MARK, BRAND_NAME } from "@/lib/brand"

interface BrandMarkProps {
  /** Link destination. Pass `null` to render without a surrounding link. */
  href?: string | null
  className?: string
  /** Rendered pixel width of the artwork. Height scales with aspect ratio. */
  width?: number
}

/**
 * Theme-aware InvestAssist wordmark. Both SVGs render and CSS swaps them, so the
 * correct artwork is present before first paint with no theme flash.
 */
export function BrandMark({ href = "/", className, width = 148 }: BrandMarkProps) {
  const art = (
    <span className="brand-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-on-light" src={BRAND_MARK.light} alt={BRAND_NAME} width={width} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-on-dark" src={BRAND_MARK.dark} alt="" aria-hidden="true" width={width} />
    </span>
  )

  if (href === null) {
    return <span className={cn("brand-logo-wrap", className)}>{art}</span>
  }

  return (
    <Link href={href} className={cn("brand-logo-wrap", className)} aria-label={`${BRAND_NAME} home`}>
      {art}
    </Link>
  )
}

export { BrandMark as BrandLogo }
