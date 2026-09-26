import { FileText } from "lucide-react"
import { getAppUrl } from "@/lib/utils"
import { BrandLogo } from "@/components/ui/brand-logo"
import { LandingThemeToggle } from "@/components/landing/landing-theme-toggle"
import { BuiltForScrutiny } from "@/components/landing/built-for-scrutiny"
import { SampleValuation } from "@/components/landing/sample-valuation"
import { PricingSection } from "@/components/landing/pricing-section"
import { SAMPLE_DEAL, computeSampleSummary } from "@/lib/sample-valuation-calc"
import { PageStructuredData, homeSoftwareApplicationNode } from "@/components/seo/structured-data"
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo-config"

import "./landing.css"

/**
 * InvestAssist marketing landing page.
 *
 * Presentation follows the approved reference. All destinations resolve to real
 * production handlers — never the prototype's dev/self-loop URLs:
 *  - Log in / Start free  → the external app auth entry (`getAppUrl("/auth")`),
 *    carrying any inbound `?redirect` through so post-auth deep-links survive.
 *  - Pricing              → <PricingSection>, which builds the exact
 *    `/pricing?plan=<id>` auto-checkout redirects from the live plan catalog.
 *  - Sample analysis      → in-page `#sample`, with a link out to the existing
 *    `/sample-analysis` route preserved.
 * Login and "Start free" remain distinct actions. Analytics `data-analytics`
 * hooks from the previous landing are preserved.
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>
}) {
  const params = await searchParams
  const redirect = typeof params?.redirect === "string" ? params.redirect : undefined

  // Sample findings, all derived from the isolated fixture (no duplicated math).
  const summary = computeSampleSummary(SAMPLE_DEAL)

  // Base auth entry on the external product app. Pass an inbound redirect through.
  const authUrl = (() => {
    const base = getAppUrl("/auth")
    if (!redirect) return base
    try {
      const url = new URL(base)
      url.searchParams.set("redirect", redirect)
      return url.toString()
    } catch {
      return base
    }
  })()

  // Distinct semantic actions. This repo exposes a single combined auth screen,
  // so both resolve to the same entry today; kept separate so a dedicated
  // sign-up destination can diverge without touching call sites.
  const loginUrl = authUrl
  const signupUrl = authUrl

  return (
    <div className="ia-landing">
      <PageStructuredData
        path="/"
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        extra={[homeSoftwareApplicationNode()]}
      />
      <header className="wrap">
        <nav className="nav" aria-label="Main navigation">
          <BrandLogo href="/" width={132} />
          <div className="navlinks">
            <LandingThemeToggle />
            <a href="#how">How it works</a>
            <a href="#sample">Sample analysis</a>
            <a href="#pricing">Pricing</a>
            <a href="/insights">Insights</a>
            <a href={loginUrl}>Log in</a>
            <a className="btn" href={signupUrl} data-analytics="homepage-nav-cta">
              Start free <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-composition">
              <div className="hero-top">
                <div className="eyebrow">BUY-SIDE CRE UNDERWRITING</div>
                <h1>
                  Read the deal beneath <br />
                  <span>the deal.</span>
                </h1>
                <p className="sub">
                  Upload the T-12, rent roll and OM. Rebuild the operating picture, see what doesn&apos;t reconcile,
                  and test what the deal supports before you make an offer.
                </p>
                <div className="ctas">
                  <a className="btn" href={signupUrl} data-analytics="homepage-hero-primary-cta">
                    Analyze your first deal free <span aria-hidden="true">→</span>
                  </a>
                  <a className="btn light" href="#sample" data-analytics="homepage-hero-secondary-cta">
                    Explore sample analysis <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p className="micro">
                  <b>20 free credits</b> · Enough for ~1 full deal · No credit card required
                </p>
              </div>
            </div>

            <div className="hero-proof" aria-label="Product capabilities">
              <span>Source-linked financials</span>
              <span>Reviewable NOI</span>
              <span>Explicit assumptions</span>
              <span>Unresolved items stay visible</span>
            </div>

            <div className="document-flow">
              <div className="flow-heading">
                <span>A DEAL, MADE LEGIBLE</span>
                <span>DOCUMENT TO DECISION</span>
              </div>
              <div className="flow-body">
                <div className="flow-documents">
                  <span className="label">SOURCE DOCUMENTS</span>
                  <div>
                    <span className="doc-name">
                      <FileText size={16} aria-hidden="true" /> Operating statements
                    </span>
                    <small>01</small>
                  </div>
                  <div>
                    <span className="doc-name">
                      <FileText size={16} aria-hidden="true" /> Rent rolls
                    </span>
                    <small>02</small>
                  </div>
                  <div>
                    <span className="doc-name">
                      <FileText size={16} aria-hidden="true" /> Offering memoranda
                    </span>
                    <small>03</small>
                  </div>
                </div>
                <div className="flow-arrow" aria-hidden="true">
                  →
                </div>
                <div className="flow-result">
                  <span className="label">ORGANIZED FINANCIALS</span>
                  <strong>NOI</strong>
                  <p>Review the operating picture</p>
                </div>
                <div className="flow-arrow" aria-hidden="true">
                  →
                </div>
                <div className="flow-next">
                  <span className="label">REVIEW &amp; MODEL</span>
                  <div>
                    <b>Assumptions</b>
                    <p>Understand the basis</p>
                  </div>
                  <div>
                    <b>Valuation</b>
                    <p>Explore the range</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Built for scrutiny (second section) ──────────────────────── */}
        <BuiltForScrutiny />

        {/* ── Sample workspace ─────────────────────────────────────────── */}
        <section className="section wrap sample-section" aria-labelledby="sample-heading">
          <div className="section-head">
            <div>
              <div className="eyebrow">The analysis, in view</div>
              <h2 id="sample-heading">
                Understand the numbers. <br />
                Then test the investment case.
              </h2>
            </div>
            <p className="section-lead">
              Move the cap-rate slider to see how the value compares with the asking price.
            </p>
          </div>

          <div className="workspace" id="sample">
            <div className="appbar">
              <span className="appbrand">
                <BrandLogo href={null} width={104} />
              </span>
              <span className="apptabs">
                <span>Property overview</span>
                <span className="active">Underwriting</span>
                <span>Cash flow</span>
                <span>Returns</span>
              </span>
              <small>Sample deal</small>
            </div>

            <div className="appbody">
              <div className="dealhead">
                <div>
                  <h3>Oakline Residences</h3>
                  <p>Austin, TX · 128 units · Multifamily</p>
                </div>
              </div>

              <div className="metric-grid">
                <div className="metric">
                  <label>In-place NOI</label>
                  <strong>{summary.inPlaceNoiLabel}</strong>
                  <p>Annualized, as operating</p>
                </div>
                <div className="metric">
                  <label>Seller-reported NOI</label>
                  <strong>{summary.sellerReportedNoiLabel}</strong>
                  <p>As presented in the offering</p>
                </div>
                <div className="metric">
                  <label>Cap at ask</label>
                  <strong>
                    <em>{summary.capAtAskLabel}</em>
                  </strong>
                  <p>In-place NOI ÷ {summary.askingPriceLabel} ask</p>
                </div>
              </div>

              <div className="appbottom">
                <div className="analysis">
                  <div className="paneltop">
                    <strong>First-pass verdict</strong>
                    <span className="pill">First pass</span>
                  </div>

                  <p className="verdict-lead">
                    Seller-reported NOI of <b>{summary.sellerReportedNoiLabel}</b> sits above the{" "}
                    <b>{summary.inPlaceNoiLabel}</b> in-place figure — a <b>{summary.noiDifferenceLabel}</b> gap this
                    sample surfaces but does not resolve.
                  </p>

                  <div className="finding">
                    <i>Cap at the ask</i> — in-place NOI implies a {summary.capAtAskLabel} cap at the{" "}
                    {summary.askingPriceLabel} ask.
                    <p>
                      The seller-reported figure would imply a tighter cap. Both framings are shown side by side, not
                      merged into one number.
                    </p>
                  </div>
                  <div className="finding">
                    <i>Next diligence step</i> — trace the {summary.noiDifferenceLabel} difference to specific rent-roll
                    and operating-expense lines before relying on either NOI.
                    <p>Until those lines are checked, the gap stays open rather than smoothed over.</p>
                  </div>

                  <details className="calc-basis">
                    <summary>Calculation basis</summary>
                    <div>
                      <p>
                        <i>Cap at ask</i> = in-place NOI ÷ asking price ={" "}
                        {"$" + SAMPLE_DEAL.inPlaceNoi.toLocaleString("en-US")} ÷{" "}
                        {"$" + SAMPLE_DEAL.askingPrice.toLocaleString("en-US")} = {summary.capAtAskLabel}.
                      </p>
                      <p>
                        <i>NOI difference</i> = seller-reported − in-place ={" "}
                        {"$" + SAMPLE_DEAL.sellerReportedNoi.toLocaleString("en-US")} −{" "}
                        {"$" + SAMPLE_DEAL.inPlaceNoi.toLocaleString("en-US")} ={" "}
                        {"$" + summary.noiDifference.toLocaleString("en-US")}.
                      </p>
                      <p>
                        <i>In-place NOI</i> reflects contract rent, other income and vacancy as currently operating.{" "}
                        <i>Seller-reported NOI</i> is the figure presented in the offering. This sample shows the
                        difference between them; it does not reconcile individual line items or complete a review.
                      </p>
                    </div>
                  </details>
                </div>

                <SampleValuation />
              </div>

              <a className="sample-open" href="/sample-analysis">
                Open the full sample analysis <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Product walkthrough video ────────────────────────────────── */}
        <section className="section wrap walkthrough" id="walkthrough" aria-labelledby="walkthrough-title">
          <div>
            <div className="eyebrow">Inside InvestAssist</div>
            <h2 id="walkthrough-title">
              See the product <br />
              at work.
            </h2>
            <p className="section-lead">
              From uploading documents to reviewing financials, adjusting assumptions, and exporting the analysis.
            </p>
          </div>
          <figure>
            <video
              controls
              playsInline
              preload="none"
              poster="/media/investassist-poster.jpg"
              aria-label="InvestAssist product overview"
            >
              <source src="/media/investassist-walkthrough.mp4" type="video/mp4" />
              Your browser does not support embedded video.{" "}
              <a href="/media/investassist-walkthrough.mp4">Open the product overview.</a>
            </video>
          </figure>
        </section>

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section className="section wrap editorial" id="how">
          <div className="editorial-heading">
            <div className="eyebrow">How it works</div>
            <h2>
              From source files <br />
              to a considered decision.
            </h2>
            <p className="section-lead">
              Let AI handle the first pass. Keep your team focused on the assumptions that matter.
            </p>
          </div>
          <div className="review-rows">
            <article>
              <span>01</span>
              <h3>Bring the deal file together.</h3>
              <p>Start with the T-12, rent roll, and offering memorandum already in your diligence process.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Establish the operating picture.</h3>
              <p>
                Review extracted income, expenses, and leasing data. Investigate missing information and differences
                before relying on the result.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Test the investment case.</h3>
              <p>
                Compare NOI bases and valuation scenarios. Take specific questions into your next broker or investment
                committee discussion.
              </p>
            </article>
            <div className="workflow-invitation">
              <p>
                <strong>Try a deal you already know.</strong> Compare the results with your existing underwriting.
              </p>
              <a className="btn" href={signupUrl} data-analytics="homepage-how-cta">
                Start free <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Built to compound ────────────────���───────────────────────── */}
        <section className="compound-section" id="compound" aria-labelledby="compound-title">
          <div className="wrap">
            <div className="compound-heading">
              <div className="eyebrow">Built to compound</div>
              <h2 id="compound-title">
                Your underwriting gets <br />
                smarter with every deal.
              </h2>
              <p className="section-lead">
                InvestAssist is designed to turn each analysis into reusable context for the next one, so your team
                starts with what it already knows instead of rebuilding from scratch.
              </p>
            </div>
            <p className="compound-direction">
              Platform direction · This progression shows our intended development, including planned capabilities. Deal
              numbers are illustrative, not feature unlocks.
            </p>
            <ol className="compound-progression" aria-label="How underwriting context is intended to accumulate">
              <li>
                <div className="progress-stage">
                  <span>Deal 01</span>
                  <span aria-hidden="true">→</span>
                </div>
                <h3>Establish the basis</h3>
                <div className="context-stack">
                  <span>Source-linked financials</span>
                  <span>NOI</span>
                </div>
              </li>
              <li>
                <div className="progress-stage">
                  <span>Deal 08</span>
                  <span aria-hidden="true">→</span>
                </div>
                <h3>Carry context forward</h3>
                <div className="context-stack">
                  <span>Sources + NOI</span>
                  <span>Saved assumptions</span>
                  <span>Review history</span>
                </div>
              </li>
              <li>
                <div className="progress-stage">
                  <span>Deal 24</span>
                  <span aria-hidden="true">→</span>
                </div>
                <h3>See across deals</h3>
                <div className="context-stack">
                  <span>Sources + assumptions + history</span>
                  <span>Benchmarks</span>
                  <span>Deal comparisons</span>
                </div>
              </li>
              <li className="progress-destination">
                <div className="progress-stage">
                  <span>Your underwriting intelligence</span>
                </div>
                <h3>Build a lasting record</h3>
                <div className="context-stack">
                  <span>Accumulated deal context</span>
                  <span>Reusable patterns</span>
                  <span>Persistent underwriting record</span>
                </div>
              </li>
            </ol>
            <div className="compound-close">
              <p>
                Start with one deal.
                <br />
                <strong>Build an underwriting advantage over time.</strong>
              </p>
              <a className="btn" href={signupUrl} data-analytics="homepage-compound-cta">
                Analyze your first deal free <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Pricing (live catalog + real checkout redirects) ─────────── */}
        <PricingSection authUrl={authUrl} />

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="wrap faq">
          <div>
            <div className="eyebrow">Before your first deal</div>
            <h2>Before you begin.</h2>
          </div>
          <div>
            <details>
              <summary>What do I get back?</summary>
              <p>
                A first-pass view of the financials, NOI and valuation scenarios, plus findings to review. The sample
                above illustrates the distinction between seller-reported, in-place and economic NOI.
              </p>
            </details>
            <details>
              <summary>Does this replace my underwriting judgment?</summary>
              <p>
                No. It helps organize and analyze the deal so you can investigate assumptions and make your own
                decision. Review the documents, confirm material gaps and complete your diligence before relying on an
                investment case.
              </p>
            </details>
            <details>
              <summary>How far do the free credits go?</summary>
              <p>
                The free trial includes 20 credits. The current pricing model estimates about 16–18 credits for a
                typical full deal, so you can explore the workflow before choosing a paid plan.
              </p>
            </details>
            <details>
              <summary>Is my data secure, and who controls it?</summary>
              <p>
                Yes. InvestAssist is SOC 2 compliant and follows strict security and data-handling standards. Your
                documents and deals stay yours — you decide what to upload, how it&apos;s used and when to remove it. We
                don&apos;t repurpose your data, and you stay in control of your deal information at every step.
              </p>
            </details>
          </div>
        </section>

        {/* ── Closing ──────────────────────────────────────────────────── */}
        <section className="closing">
          <div className="wrap">
            <div className="eyebrow">Bring the documents. Build the investment case.</div>
            <h2>
              Bring your next deal <br />
              into clearer focus.
            </h2>
            <p>Review the financials. Test the assumptions. Decide what comes next.</p>
            <a className="btn" href={signupUrl} data-analytics="homepage-primary-cta">
              Analyze your first deal free <span aria-hidden="true">→</span>
            </a>
            <div className="micro">20 free credits &nbsp; · &nbsp; No credit card required</div>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <BrandLogo href="/" width={120} />
        <div>
          <a href="/legal/privacy">Privacy</a>
          <a href="/legal/terms">Terms</a>
          <a href="mailto:sales@investassist.ai">Contact</a>
          <span>© 2026 InvestAssist</span>
        </div>
      </footer>
    </div>
  )
}
