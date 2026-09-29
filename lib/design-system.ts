/**
 * InvestAssist Design System
 *
 * Centralised inline-style constants for the warm off-white / action-blue institutional palette.
 * Mirrors the CSS tokens defined in globals.css.
 *
 * Color Palette: Warm Off-White + Ink + Action Blue
 * - Page background:  #FAF9F6  (warm off-white)
 * - Primary surface:  #ffffff  (clean white card)
 * - Brand accent:     #155E97  (brand) / #1D4F91 (action)
 * - Body text:        #151612  (warm ink)
 * - Hairline borders: #DFDED8  (warm rule)
 */

// ═══════════════════════════════════════════════════════════════════════════
// CANONICAL PALETTE — the ONE place components read inline-style colors from.
// Every value points at a CSS variable in globals.css, so a token change there
// cascades everywhere. No component should hardcode hex for these roles again.
// ═══════════════════════════════════════════════════════════════════════════

export const palette = {
  ink: "var(--foreground)",
  inkMuted: "var(--muted-foreground)",
  // Faint text tier. Points at the dedicated --text-faint token (readable, AA)
  // rather than neutral-400/#94a3b8 which failed contrast. Changing --text-faint
  // in globals.css cascades to every inkFaint consumer across the app.
  inkFaint: "var(--text-faint, #5f6b7b)",
  // Gold TEXT/icon role (AA on light surfaces). Pale --primary is a fill only.
  brand: "var(--gold-text)",
  // Bronze chip/selected fill — same as the active navbar item.
  brandLight: "var(--chip)",
  // Foreground for text sitting on brandLight.
  brandOn: "var(--chip-foreground)",
  rule: "var(--border)",
  ivory: "var(--surface-muted)",
  parchment: "var(--background)",
  surface: "var(--surface)",
} as const

// ═══════════════════════════════════════════════════════════════════════════
// STYLE CONSTANTS – inline-style values that must match globals.css tokens
// ═══════════════════════════════════════════════════════════════════════════

export const designSystem = {
  // Page backgrounds — token-driven so they invert with the theme toggle
  backgrounds: {
    // Landing / app canvas
    landing: "var(--background)",
    // App/dashboard canvas
    dashboard: "var(--background)",
    // Near-white for card sections
    app: "var(--surface-elevated)",
  },

  // Card surfaces — all reference glass tokens that flip in .dark / .on-ink
  cards: {
    // Primary card — frosted glass
    neo: {
      background: "var(--glass-bg-strong)",
      backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
      WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
      boxShadow: "var(--elev-3)",
      border: "1px solid var(--glass-border)",
      borderRadius: "20px",
    },
    // Inner nested card
    inset: {
      background: "var(--glass-bg)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      boxShadow: "var(--elev-1)",
      border: "1px solid var(--glass-border-hairline)",
      borderRadius: "12px",
    },
    // Small card variant
    small: {
      background: "var(--glass-bg)",
      backdropFilter: "blur(16px) saturate(140%)",
      WebkitBackdropFilter: "blur(16px) saturate(140%)",
      boxShadow: "var(--elev-2)",
      border: "1px solid var(--glass-border)",
      borderRadius: "16px",
    },
  },

  // Button styles — matches neo-btn-primary and neo-btn-elevated
  buttons: {
    // Primary CTA — brand blue (flips brighter in dark via --primary token)
    primary: {
      background: "var(--primary)",
      boxShadow: "var(--elev-2)",
      color: "var(--primary-foreground)",
    },
    // Secondary — frosted glass (matches neo-btn-elevated)
    secondary: {
      background: "var(--glass-bg)",
      backdropFilter: "blur(12px) saturate(140%)",
      WebkitBackdropFilter: "blur(12px) saturate(140%)",
      boxShadow: "var(--elev-2)",
      border: "1px solid var(--glass-border)",
      borderRadius: "12px",
    },
    // Success / confirmation button
    success: {
      background: "var(--success)",
      boxShadow: "var(--elev-2)",
      color: "var(--success-foreground)",
    },
  },

  // Background orb/glow overlays — warm action-blue tones only
  orbs: {
    amber:  "radial-gradient(circle, rgba(21, 94, 151, 0.14) 0%, transparent 70%)",
    gold:   "radial-gradient(circle, rgba(29, 79, 145, 0.12) 0%, transparent 70%)",
    warm:   "radial-gradient(circle, rgba(79, 131, 189, 0.10) 0%, transparent 70%)",
    muted:  "radial-gradient(circle, rgba(21, 22, 18, 0.05) 0%, transparent 70%)",
    // Legacy aliases kept so existing callers don't break; these now render blue
    slate:  "radial-gradient(circle, rgba(21, 94, 151, 0.14) 0%, transparent 70%)",
    blue:   "radial-gradient(circle, rgba(29, 79, 145, 0.12) 0%, transparent 70%)",
    indigo: "radial-gradient(circle, rgba(21, 94, 151, 0.10) 0%, transparent 70%)",
    teal:   "radial-gradient(circle, rgba(79, 131, 189, 0.10) 0%, transparent 70%)",
  },

  // Gradients for text and accents — warm action-blue brand palette only
  gradients: {
    // Primary brand gradient — action → brand blue (matches --brand-gradient)
    brand: "linear-gradient(110deg, #1d4f91 0%, #1d4f91 55%, #155e97 100%)",
    // Text gradient — for highlighted headings (deep → brand → soft blue)
    text:  "linear-gradient(110deg, #173b66 0%, #1d4f91 55%, #155e97 100%)",
    // Accent gradient — same blue range, slightly softer
    teal:  "linear-gradient(135deg, #155e97 0%, #2f66a5 100%)",
    // Subtle card tint — warm white
    cardTint: "linear-gradient(145deg, rgba(255,255,255,0.94) 0%, rgba(250,249,246,0.88) 100%)",
    // Deep blue-black — for dark surfaces (matches neo-card-accent background)
    navy:  "linear-gradient(135deg, #0d1623 0%, #14304f 50%, #173b66 100%)",
  },
} as const

// ═══════════════════════════════════════════════════════════════════════════
// TAILWIND CLASS PRESETS - Copy these directly into className
// ═══════════════════════════════════════════════════════════════════════════

export const tw = {
  // Page wrapper — token background so it inverts with the theme
  pageBackground: "min-h-screen bg-background",
  
  // Landing page specific background
  landingBackground: "min-h-screen overflow-x-hidden",
  
  // Navigation bar - transparent, merges into hero
  nav: "absolute top-0 inset-x-0 z-50 px-4 py-4",
  navInner: "max-w-6xl mx-auto flex items-center justify-between",
  
  // Hero section
  heroSection: "px-4 pt-10 md:pt-14 lg:pt-16 pb-10 md:pb-14 overflow-hidden",
  heroGrid: "max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16 items-center",
  
  // Typography
  heroTitle: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-[1.1] tracking-tight",
  heroSubtitle: "text-base md:text-xl text-neutral-600 leading-relaxed max-w-lg",
  sectionTitle: "text-2xl md:text-3xl font-bold text-neutral-900",
  sectionSubtitle: "text-neutral-600 text-base md:text-lg",
  
  // Cards - use these Tailwind classes, or the neo-card utility class
  card: "neo-card rounded-2xl p-6",
  cardHover: "neo-card neo-card-hover rounded-2xl p-6",
  cardInner: "neo-card-inner rounded-xl p-4",
  
  // Buttons
  btnPrimary: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98]",
  btnSecondary: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-neutral-700 transition-all hover:scale-[1.02] active:scale-[0.98]",
  btnGhost: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors",
  
  // Badge/pill
  badge: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
  badgePrimary: "text-brand-700 bg-card/90 border border-brand-100",
  
  // Input fields
  input: "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-card text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all",
  
  // Feature checkmarks
  checkList: "flex flex-wrap items-center gap-3 text-sm text-neutral-600",
  checkItem: "flex items-center gap-1.5",
} as const

// ════════════════���════════════════════════════════════��════�����═══════════════
// LOGO - Always use the official logo
// ═══════════════════════════════════════════════════════════════════════════

export const LOGO_ALT = "InvestAssist"
/*
 * Official Logo Kit (Graphite + Gold / Warm White + Gold) — the only place these paths may appear.
 * Suffix = the BACKGROUND the asset is drawn for: `light` sits on light surfaces, `dark` on dark.
 * Never recolour with CSS filters; never stretch.
 */
/* Full wordmark (building + "InvestAssist"). Navbar, auth, legal, headers — via <BrandMark>. */
export const LOGO_WORDMARK_LIGHT = "/brand/investassist-logo-light.svg"
export const LOGO_WORDMARK_DARK = "/brand/investassist-logo-dark.svg"
export const LOGO_PATH = LOGO_WORDMARK_LIGHT
/* Building mark only, transparent. Loaders, compact/collapsed spots — via <LogoMark>/<LogoLoader>. */
export const LOGO_MARK_LIGHT = "/brand/investassist-mark-light.svg"
export const LOGO_MARK_DARK = "/brand/investassist-mark-dark.svg"
/* Wordmark PNG for surfaces that can't render SVG: emails (white body), schema.org JSON-LD. */
export const LOGO_RASTER = "/brand/investassist-logo-light.png"
export const LOGO_RASTER_DARK = "/brand/investassist-logo-dark.png"
/* Browser + platform icons. Default favicon = gold on graphite (kit default: visible on any tab bar). */
export const FAVICON_ICO = "/favicon.ico"
export const FAVICON_SVG = "/brand/investassist-favicon.svg"
export const FAVICON_PNG_32 = "/brand/investassist-icon-dark-32.png"
export const APPLE_TOUCH_ICON = "/brand/investassist-icon-dark-180.png"
export const PWA_ICON_192 = "/brand/investassist-icon-dark-192.png"
export const PWA_ICON_512 = "/brand/investassist-icon-dark-512.png"

// ═══════════════════════════════════════════════════════════════════════════
// BREAKPOINTS - Reference for responsive design
// ═══════════════════════════════════════════════════════════════════════════

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

// ═══════════════════════════════════════════════════════════════════════════
// PROPERTY PAGE DESIGN SYSTEM - Consolidated typography and component styles
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Property Page Typography Tokens
 * 
 * Use these for consistent font sizes across all property page components:
 * - Summary cards, metrics cards, analysis panels, etc.
 */
export const propertyTypography = {
  // Card headers
  cardTitle: "font-bold text-lg text-neutral-900",  // Card main titles
  cardSubtitle: "text-sm text-neutral-500",          // Card subtitles/descriptions
  
  // Section headers
  sectionTitle: "text-xs font-semibold uppercase tracking-wide text-neutral-500", // Column/section headers
  
  // Metric values - STANDARDIZED
  metricValueLg: "text-lg font-bold",              // Primary metric values (NOI, totals)
  metricValueBase: "text-base font-bold",          // Secondary metric values
  metricValueSm: "text-sm font-semibold",          // Tertiary metric values
  
  // Metric labels
  metricLabel: "text-2xs font-semibold uppercase tracking-wide",  // Metric labels
  metricBasis: "text-2xs text-neutral-400",       // Metric basis/explanation
  
  // Table cells
  tableHeader: "text-xs font-semibold uppercase tracking-wide text-neutral-500",
  tableCell: "text-sm text-neutral-700",
  tableCellBold: "text-sm font-semibold text-neutral-900",
} as const

/**
 * Property Page Color Tokens
 * 
 * Semantic color classes for metrics and status indicators
 */
export const propertyColors = {
  // Metric card borders and backgrounds
  primary: {
    border: "border-success-200",
    bg: "bg-success-50/50",
    text: "text-success-600",
    textBold: "text-success-700",
  },
  secondary: {
    border: "border-brand-200",
    bg: "bg-brand-50/50",
    text: "text-brand-600",
    textBold: "text-brand-700",
  },
  tertiary: {
    border: "border-brand-200",
    bg: "bg-brand-50/50",
    text: "text-brand-700",
    textBold: "text-brand-800",
  },
  neutral: {
    border: "border-neutral-200/70",
    bg: "bg-card/60",
    text: "text-neutral-500",
    textBold: "text-neutral-900",
  },
  
  // Status indicators
  success: "text-success-600",
  warning: "text-warning-600",
  danger: "text-destructive-600",
  muted: "text-neutral-400",
} as const

/**
 * Property Page Component Classes
 * 
 * Pre-composed Tailwind class strings for common component patterns
 */
export const propertyComponents = {
  // Metric card wrapper
  metricCard: "rounded-xl border p-3",
  metricCardLg: "rounded-xl border p-4",
  
  // Metric card icon wrapper
  metricIcon: "h-3.5 w-3.5",
  metricIconLg: "h-4 w-4",
  
  // Full-width summary card
  summaryCard: "neo-card rounded-2xl p-6 w-full",
  
  // Summary card header with icon
  summaryHeader: "flex items-center gap-3 mb-6",
  summaryIconWrapper: "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
  
  // Grid layouts
  gridFull: "grid grid-cols-1 gap-4",
  grid2Cols: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  grid3Cols: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
  grid4Cols: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  grid7Cols: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3",
} as const
