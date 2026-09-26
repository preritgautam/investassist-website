"use client"

import * as React from "react"
import { useTheme } from "next-themes"

/**
 * Unboxed Light/Dark control matching the approved landing reference.
 *
 * Reuses the existing next-themes provider (class-based, default light) — no
 * second provider, storage key, or `data-theme` mechanism is introduced. The
 * label names the destination theme, as in the reference. A stable placeholder
 * renders until mounted to avoid a hydration mismatch.
 */
export function LandingThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"
  const destination = isDark ? "Light" : "Dark"

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={mounted ? `Switch to ${destination.toLowerCase()} theme` : "Toggle theme"}
      aria-pressed={mounted ? !isDark : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span aria-hidden="true">◐</span>
      <span>{mounted ? destination : "Theme"}</span>
    </button>
  )
}
