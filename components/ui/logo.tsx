import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LOGO_PATH, LOGO_ALT } from "@/lib/design-system"

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
 */
export function Logo({ href = "/", className, priority = false }: LogoProps) {
  const img = (
    <Image
      src={LOGO_PATH || "/placeholder.svg"}
      alt={LOGO_ALT}
      width={148}
      height={32}
      priority={priority}
      className="site-logo__img"
    />
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
