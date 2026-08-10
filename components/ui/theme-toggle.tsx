"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Sun/moon theme toggle wired to next-themes.
 * Renders a stable placeholder until mounted to avoid hydration mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      title={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
        "border-border bg-card text-foreground/80 hover:text-foreground hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        className,
      )}
    >
      {/* Both icons rendered; CSS crossfade keeps it stable pre-hydration */}
      <Sun className={cn("h-[18px] w-[18px] transition-all", mounted && isDark ? "hidden" : "block")} aria-hidden="true" />
      <Moon className={cn("h-[18px] w-[18px] transition-all", mounted && isDark ? "block" : "hidden")} aria-hidden="true" />
    </button>
  )
}
