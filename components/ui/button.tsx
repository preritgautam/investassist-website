import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400/50",
  {
    variants: {
      variant: {
        default: "bg-action text-action-foreground border border-brand-600/25 shadow-xs hover:bg-action-hover active:bg-action-pressed",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive",
        outline: "border border-border bg-card text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-input",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-gold underline-offset-4 hover:underline hover:text-gold-hover",
        // Premium variant for CTAs with royal blue gradient
        premium: "bg-action text-action-foreground border border-brand-600/25 shadow-sm hover:bg-action-hover active:bg-action-hover",
        // Variants for use on dark backgrounds
        "outline-light": "border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground shadow-sm hover:bg-primary-foreground/20 hover:border-primary-foreground/40 active:bg-primary-foreground/25 backdrop-blur-sm",
        "ghost-light": "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground",
        "secondary-light": "bg-primary-foreground/15 text-primary-foreground shadow-sm hover:bg-primary-foreground/25 backdrop-blur-sm",
        // Neomorphic variants — the platform's single button standard. These map
        // 1:1 to the documented .neo-btn-* CSS classes in globals.css so the look
        // lives in exactly one place: edit the CSS and every Button plus every raw
        // neo-btn-* class updates together. Do not re-hardcode gradients/shadows
        // here — that reintroduces the local-vs-global drift this variant removes.
        "neo": "neo-btn text-[var(--foreground)]",
        "neo-ghost": "neo-btn-ghost text-[var(--foreground)]",
        "neo-primary": "neo-btn-primary text-primary-foreground",
        "neo-elevated": "neo-btn-elevated text-[var(--foreground)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        "sm-md": "h-8 rounded-md gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} suppressHydrationWarning {...props} />
}

export { Button, buttonVariants }
