/**
 * InvestAssist Design System
 * 
 * This file documents and exports the unified design system used across the platform.
 * All components should reference these constants for visual consistency.
 * 
 * Color Palette: Colorful Gradient Theme (light)
 * - Hero gradient: indigo → violet → magenta → soft pink
 * - Accent: Indigo (#4f46e5) for CTAs and highlights
 * - Surfaces: light/white with soft colorful glows
 */

// ═══════════════════════════════════════════════════════════════════════════
// STYLE CONSTANTS - Use these in inline styles when Tailwind classes aren't sufficient
// ═══════════════════════════════════════════════════════════════════════════

export const designSystem = {
  // Page backgrounds
  backgrounds: {
    // Vivid colorful hero gradient - indigo → violet → magenta → soft pink
    landing: "radial-gradient(120% 90% at 85% 110%, #fbd5e8 0%, rgba(251,213,232,0) 55%), linear-gradient(135deg, #3b1d9e 0%, #5b34d6 22%, #8b3bd6 45%, #c23bb8 68%, #f06ba8 86%, #ffd0e4 100%)",
    // Dashboard background - soft light with subtle colorful glows
    dashboard: "radial-gradient(ellipse 70% 50% at 12% 8%, rgba(99,102,241,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 90%, rgba(240,107,168,0.08) 0%, transparent 60%), linear-gradient(160deg, #fbfaff 0%, #f6f4ff 45%, #fdf5fb 100%)",
    // App background - near-white
    app: "#fbfaff",
  },
  
  // Light card styles
  cards: {
    // Primary card - clean white with soft depth
    neo: {
      background: "linear-gradient(145deg, #ffffff 0%, #fbfaff 100%)",
      boxShadow: "0 16px 48px rgba(91,52,214,0.10), 0 2px 6px rgba(15,23,42,0.04)",
      border: "1px solid rgba(139,59,214,0.10)",
      borderRadius: "20px",
    },
    // Inner nested element - subtle tinted inset
    inset: {
      background: "linear-gradient(145deg, #f8f7ff 0%, #fdf6fb 100%)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 24px rgba(139,59,214,0.04)",
      border: "1px solid rgba(139,59,214,0.08)",
      borderRadius: "14px",
    },
    // Small card variant
    small: {
      background: "linear-gradient(145deg, #ffffff 0%, #fbfaff 100%)",
      boxShadow: "0 8px 24px rgba(91,52,214,0.08), 0 1px 3px rgba(15,23,42,0.04)",
      border: "1px solid rgba(139,59,214,0.10)",
      borderRadius: "16px",
    },
  },
  
  // Button styles
  buttons: {
    // Primary CTA - purple → magenta → rose pink
    primary: {
      background: "linear-gradient(110deg, #6d28d9 0%, #9333ea 45%, #c026d3 75%, #f8709f 100%)",
      boxShadow: "0 10px 30px -8px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.18)",
    },
    // Secondary button - light glass
    secondary: {
      background: "linear-gradient(145deg, #ffffff 0%, #f7f3fc 100%)",
      boxShadow: "0 6px 16px rgba(124,58,237,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
      border: "1px solid rgba(147,51,234,0.16)",
      borderRadius: "14px",
    },
    // Success button
    success: {
      background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      boxShadow: "0 8px 24px rgba(16,185,129,0.30), 0 2px 6px rgba(16,185,129,0.15)",
    },
  },
  
  // Background orb overlays - use for visual depth
  orbs: {
    slate: "radial-gradient(circle, rgba(124, 58, 237, 0.16) 0%, transparent 70%)",
    blue: "radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, transparent 70%)",
    indigo: "radial-gradient(circle, rgba(192, 38, 211, 0.16) 0%, transparent 70%)",
    teal: "radial-gradient(circle, rgba(248, 112, 159, 0.16) 0%, transparent 70%)",
  },
  
  // Gradients for text and accents
  gradients: {
    // Primary brand gradient - purple → magenta → rose pink
    brand: "linear-gradient(110deg, #6d28d9 0%, #9333ea 45%, #c026d3 75%, #f8709f 100%)",
    // Text gradient - for highlighted headings (purple → violet → magenta → rose)
    text: "linear-gradient(110deg, #6d28d9, #9333ea 40%, #c026d3 70%, #f8709f)",
    // Accent gradient - for secondary highlights
    teal: "linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)",
    // Subtle light card tint
    cardTint: "linear-gradient(145deg, #ffffff 0%, #fdf9ff 100%)",
  },
} as const

// ═══════════════════════════════════════════════════════════════════════════
// TAILWIND CLASS PRESETS - Copy these directly into className
// ═══════════════════════════════════════════════════════════════════════════

export const tw = {
  // Page wrapper with gradient background
  pageBackground: "min-h-screen bg-gradient-to-br from-[#fbfaff] via-[#f6f4ff] to-[#fdf5fb]",
  
  // Landing page specific background
  landingBackground: "min-h-screen overflow-x-hidden",
  
  // Navigation bar - transparent, merges into hero
  nav: "absolute top-0 inset-x-0 z-50 px-4 py-4",
  navInner: "max-w-6xl mx-auto flex items-center justify-between",
  
  // Hero section
  heroSection: "px-4 pt-10 md:pt-14 lg:pt-16 pb-10 md:pb-14 overflow-hidden",
  heroGrid: "max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16 items-center",
  
  // Typography
  heroTitle: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight",
  heroSubtitle: "text-base md:text-xl text-slate-600 leading-relaxed max-w-lg",
  sectionTitle: "text-2xl md:text-3xl font-bold text-slate-900",
  sectionSubtitle: "text-slate-600 text-base md:text-lg",
  
  // Cards - use these Tailwind classes, or the neo-card utility class
  card: "neo-card rounded-2xl p-6",
  cardHover: "neo-card neo-card-hover rounded-2xl p-6",
  cardInner: "neo-card-inner rounded-xl p-4",
  
  // Buttons
  btnPrimary: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]",
  btnSecondary: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]",
  btnGhost: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors",
  
  // Badge/pill
  badge: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
  badgePrimary: "text-indigo-700 bg-white/90 border border-indigo-100",
  
  // Input fields
  input: "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all",
  
  // Feature checkmarks
  checkList: "flex flex-wrap items-center gap-3 text-sm text-slate-600",
  checkItem: "flex items-center gap-1.5",
} as const

// ════════════════���════════════════════════════════════��════�����════════��═══���══
// LOGO - Always use the official logo
// ═══════════════════════════════════════════════════════════════════════════

export const LOGO_PATH = "/investassist-logo-bgrmd.png"
export const LOGO_ALT = "InvestAssist"

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
  cardTitle: "font-bold text-lg text-slate-900",  // Card main titles
  cardSubtitle: "text-sm text-slate-500",          // Card subtitles/descriptions
  
  // Section headers
  sectionTitle: "text-xs font-semibold uppercase tracking-wide text-slate-500", // Column/section headers
  
  // Metric values - STANDARDIZED
  metricValueLg: "text-lg font-bold",              // Primary metric values (NOI, totals)
  metricValueBase: "text-base font-bold",          // Secondary metric values
  metricValueSm: "text-sm font-semibold",          // Tertiary metric values
  
  // Metric labels
  metricLabel: "text-[10px] font-semibold uppercase tracking-wide",  // Metric labels
  metricBasis: "text-[10px] text-slate-400",       // Metric basis/explanation
  
  // Table cells
  tableHeader: "text-xs font-semibold uppercase tracking-wide text-slate-500",
  tableCell: "text-sm text-slate-700",
  tableCellBold: "text-sm font-semibold text-slate-900",
} as const

/**
 * Property Page Color Tokens
 * 
 * Semantic color classes for metrics and status indicators
 */
export const propertyColors = {
  // Metric card borders and backgrounds
  primary: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/50",
    text: "text-emerald-600",
    textBold: "text-emerald-700",
  },
  secondary: {
    border: "border-amber-200",
    bg: "bg-amber-50/50",
    text: "text-amber-600",
    textBold: "text-amber-700",
  },
  tertiary: {
    border: "border-blue-200",
    bg: "bg-blue-50/50",
    text: "text-blue-600",
    textBold: "text-blue-700",
  },
  neutral: {
    border: "border-slate-200/70",
    bg: "bg-white/60",
    text: "text-slate-500",
    textBold: "text-slate-900",
  },
  
  // Status indicators
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-red-600",
  muted: "text-slate-400",
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
