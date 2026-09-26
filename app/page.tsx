import { getAppUrl } from "@/lib/utils"
import { BrandLogo } from "@/components/ui/brand-logo"
import { LandingThemeToggle } from "@/components/landing/landing-theme-toggle"
import { SampleValuation } from "@/components/landing/sample-valuation"
import { PricingSection } from "@/components/landing/pricing-section"

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
      <header className="wrap">
        <nav className="nav" aria-label="Main navigation">
          <BrandLogo href="/" width={132} />
          <div className="navlinks">
            <LandingThemeToggle />
            <a href="#how">How it works</a>
            <a href="#sample">Sample analysis</a>
            <a href="#pricing">Pricing</a>
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
                    Operating statements <small>01</small>
                  </div>
                  <div>
                    Rent rolls <small>02</small>
                  </div>
                  <div>
                    Offering memoranda <small>03</small>
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

            <div className="hero-principles">
              <div>
                <h3>Separate fact from assumption</h3>
                <p>
                  Historical performance, annualized estimates, and market-rent scenarios serve different purposes.
                  Keep each basis explicit.
                </p>
              </div>
              <div>
                <h3>Keep open questions visible</h3>
                <p>
                  Missing data and unexplained differences need investigation. An incomplete analysis should not imply
                  certainty.
                </p>
              </div>
              <div>
                <h3>Keep the decision with your team</h3>
                <p>Use an organized first pass to support diligence, broker questions, and investment discussions.</p>
              </div>
            </div>
          </div>
        </section>

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
                <span className="sample">Illustrative sample</span>
              </div>

              <div className="metric-grid">
                <div className="metric">
                  <label>In-place NOI</label>
                  <strong>$1.48M</strong>
                  <p>Annualized, reviewed basis</p>
                </div>
                <div className="metric">
                  <label>Asking price</label>
                  <strong>$25.00M</strong>
                  <p>Broker guidance</p>
                </div>
                <div className="metric">
                  <label>Cap at ask</label>
                  <strong>
                    <em>5.92%</em>
                  </strong>
                  <p>In-place NOI ÷ asking price</p>
                </div>
              </div>

              <div className="appbottom">
                <div className="analysis">
                  <div className="paneltop">
                    <strong>Net operating income</strong>
                    <span className="pill">In-place basis</span>
                  </div>
                  <div className="finding">
                    <i>Effective gross income</i> — reconstructed from the rent roll and T-12, source-linked line by
                    line.
                    <p>Contract rent, other income and vacancy are kept separate from market-rent estimates.</p>
                  </div>
                  <div className="finding">
                    <i>Operating expenses</i> — reconciled against the trailing statement.
                    <p>Non-operating and one-time items are held out of the operating picture.</p>
                  </div>
                  <div className="finding">
                    <i>Unresolved items stay visible</i> — anything that doesn&apos;t reconcile is flagged for review
                    rather than smoothed over.
                    <p>An incomplete analysis should not imply certainty.</p>
                  </div>
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

        {/* ── Built to compound ────────────────────────────────────────── */}
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
