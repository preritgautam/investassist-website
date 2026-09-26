import Link from "next/link"
import { cn } from "@/lib/utils"
import { LOGO_ALT } from "@/lib/design-system"

interface LogoProps {
  /**
   * Link destination. Defaults to "/". Pass `null` to render the logo
   * without a surrounding link (e.g. inside a page that shouldn't navigate).
   */
  href?: string | null
  /** Optional extra classes on the outer wrapper. */
  className?: string
  /** Marks the image as high priority for above-the-fold headers. */
  priority?: boolean
}

/**
 * Shared brand logo. Size and position are driven entirely by the global
 * `.site-logo` / `.site-logo__img` classes in globals.css so the logo is
 * identical on every page. Do not override size here — change globals.css.
 *
 * Theme-aware: both marks are rendered and swapped with CSS (`.logo-on-light` /
 * `.logo-on-dark`) so the correct artwork is present before first paint. The
 * black+brown mark shows on light surfaces; the white+brown mark shows under
 * `.dark` or an `.on-ink` band. No CSS filters, no JS/hydration dependency.
 */
export function Logo({ href = "/", className, priority = false }: LogoProps) {
  const loading = priority ? "eager" : undefined
  const img = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="site-logo__img logo-on-light"
        src="/brand/investassist-mark-light.svg"
        alt={LOGO_ALT}
        width={148}
        height={32}
        loading={loading}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="site-logo__img logo-on-dark"
        src="/brand/investassist-mark-dark.svg"
        alt=""
        aria-hidden="true"
        width={148}
        height={32}
        loading={loading}
      />
    </>
  )

  if (href === null) {
    return <span className={cn("site-logo", className)}>{img}</span>
  }

  return (
    <Link href={href} className={cn("site-logo", className)} aria-label={LOGO_ALT}>
      {img}
    </Link>
  )
}
