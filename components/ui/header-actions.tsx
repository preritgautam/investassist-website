import type * as React from "react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

/**
 * The single placement rule for the theme switch across the product:
 * top-right header group, toggle FIRST, then the page's other actions, with the
 * identity element (logo / avatar menu) last. Pages pass their actions as children
 * and never render <ThemeToggle> themselves.
 */
export function HeaderActions({
  children,
  className,
  toggleClassName,
}: {
  children?: React.ReactNode
  className?: string
  toggleClassName?: string
}) {
  return (
    <div className={cn("flex shrink-0 items-center gap-1.5", className)}>
      <ThemeToggle className={toggleClassName} />
      {children}
    </div>
  )
}
