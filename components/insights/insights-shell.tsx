import type React from "react"

import { getAppUrl } from "@/lib/utils"
import { BrandLogo } from "@/components/ui/brand-logo"
import { LandingThemeToggle } from "@/components/landing/landing-theme-toggle"

/**
 * Shared page chrome for Insights routes. Reuses the approved landing design
 * system: everything is scoped under `.ia-landing`, and the header/footer mirror
 * the homepage nav and footer so the section feels native to the marketing site.
 */
export function InsightsShell({ children }: { children: React.ReactNode }) {
  const authUrl = getAppUrl("/auth")
  return (
    <div className="ia-landing">
      <header className="wrap">
        <nav className="nav" aria-label="Main navigation">
          <BrandLogo href="/" width={132} />
          <div className="navlinks">
            <LandingThemeToggle />
            <a href="/#how">How it works</a>
            <a href="/insights">Insights</a>
            <a href="/#pricing">Pricing</a>
            <a href={authUrl}>Log in</a>
            <a className="btn" href={authUrl} data-analytics="insights-nav-cta">
              Start free <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="wrap footer">
        <BrandLogo href="/" width={120} />
        <div>
          <a href="/insights">Insights</a>
          <a href="/legal/privacy">Privacy</a>
          <a href="/legal/terms">Terms</a>
          <a href="mailto:sales@investassist.ai">Contact</a>
          <span>© 2026 InvestAssist</span>
        </div>
      </footer>
    </div>
  )
}
