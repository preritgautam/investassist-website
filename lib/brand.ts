export const BRAND_NAME = "InvestAssist"

export const SUPPORT_EMAIL = "support@investassist.ai"
export const SALES_EMAIL = "sales@investassist.ai"

// InvestAssist Logo Kit (Graphite + Gold / Warm White + Gold). This is the only file that may
// name a /brand/ asset path; the suffix is the BACKGROUND the artwork is drawn for.
// Never recolour with CSS filters and never stretch.
export const BRAND_LOGO = {
  light: "/brand/investassist-logo-light.svg",
  dark: "/brand/investassist-logo-dark.svg",
} as const

export const BRAND_BUILDING_MARK = {
  light: "/brand/investassist-mark-light.svg",
  dark: "/brand/investassist-mark-dark.svg",
} as const

// Raster full logo for consumers that can't render SVG (JSON-LD, email).
export const BRAND_LOGO_RASTER = "/brand/investassist-logo-light.png"

export const BRAND_APP_ICON = {
  192: "/brand/investassist-icon-dark-192.png",
  512: "/brand/investassist-icon-dark-512.png",
} as const

// The browser chrome colour can't read CSS variables, so it mirrors --background
// from the product :root and :root.dark blocks. This is the only permitted hex outside CSS.
export const THEME_COLOR = {
  light: "#faf9f6",
  dark: "#111315",
} as const


export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`
