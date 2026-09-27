export const BRAND_NAME = "InvestAssist"

export const SUPPORT_EMAIL = "support@investassist.ai"
export const SALES_EMAIL = "sales@investassist.ai"

export const BRAND_MARK = {
  light: "/brand/investassist-mark-light.svg",
  dark: "/brand/investassist-mark-dark.svg",
} as const

// The browser chrome colour can't read CSS variables, so it mirrors --background
// from the product :root and :root.dark blocks. This is the only permitted hex outside CSS.
export const THEME_COLOR = {
  light: "#faf8f3",
  dark: "#17120c",
} as const
