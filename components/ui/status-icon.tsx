import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// The only place a status tone becomes a status fill colour (text-{status}).
// Fills fail contrast as text, so `npm run lint:theme` bans text-{status} everywhere else.
const TONE_CLASS = {
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  destructive: "text-destructive",
  attention: "text-attention",
} as const

const SIZE_CLASS = {
  sm: "size-4",
  md: "size-5",
} as const

export type StatusTone = keyof typeof TONE_CLASS

type StatusIconProps = {
  icon: LucideIcon
  tone: StatusTone
  size?: keyof typeof SIZE_CLASS
  className?: string
  label?: string
}

export function StatusIcon({ icon: Icon, tone, size = "sm", className, label }: StatusIconProps) {
  return (
    <Icon
      className={cn("shrink-0", SIZE_CLASS[size], TONE_CLASS[tone], className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  )
}
