"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LOGO_ALT, LOGO_PATH, LOGO_WORDMARK_DARK, LOGO_WORDMARK_LIGHT } from "../../lib/design-system"

/**
 * Theme-aware brand mark: renders the light and dark marks and lets CSS (`dark:`) pick one,
 * so there is no hydration flash and callers never name a logo path.
 */
export function BrandMark({
  href,
  className,
  imgClassName = "h-7 w-auto",
  priority,
}: {
  href?: string | null
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  const images = (
    <>
      <Image src={LOGO_WORDMARK_LIGHT} alt={LOGO_ALT} width={DEFAULT_WIDTH} height={DEFAULT_HEIGHT} priority={priority} className={cn("translate-y-(--logo-optical-offset) dark:hidden", imgClassName)} />
      <Image src={LOGO_WORDMARK_DARK} alt="" aria-hidden="true" width={DEFAULT_WIDTH} height={DEFAULT_HEIGHT} priority={priority} className={cn("hidden translate-y-(--logo-optical-offset) dark:block", imgClassName)} />
    </>
  )
  if (href === null) return <span className={cn("flex items-center", className)}>{images}</span>
  return (
    <Link href={href || "/"} className={cn("flex items-center", className)}>
      {images}
    </Link>
  )
}

interface LogoProps {
  href?: string | null
  className?: string
  priority?: boolean
  width?: number
  height?: number
  /* Optional override for the image source; defaults to the global LOGO_PATH. */
  src?: string
  /* Optional sizing class for the <Image> itself. Defaults to natural size
     ("h-auto w-auto"); pass e.g. "h-9 w-auto" to constrain the rendered mark. */
  imgClassName?: string
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 32

/**
 * Site logo. Defaults to the theme-aware brand mark so every caller follows the one
 * approved artwork; pass `src` only for a deliberate one-off asset.
 */
export function Logo({
  href,
  className,
  priority,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  src,
  imgClassName,
}: LogoProps) {
  if (!src) {
    return (
      <BrandMark
        href={href === null ? undefined : href}
        className={cn("site-logo", className)}
        imgClassName={imgClassName ?? "h-7 w-auto"}
        priority={priority}
      />
    )
  }

  return (
    <Link href={href || "/"} className={cn("flex items-center gap-2", className)}>
      <Image
        src={src ?? LOGO_PATH}
        alt={LOGO_ALT}
        width={width}
        height={height}
        priority={priority}
        className={cn(imgClassName ?? "h-auto w-auto")}
      />
    </Link>
  )
}
