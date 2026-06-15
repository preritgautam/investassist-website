import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, TrendingUp, CheckCircle, BarChart3, Clock, Brain, Shield, ArrowRight } from 'lucide-react'
import { FaqSection } from '@/components/landing/faq-section'
import { buildSignupUrl } from '@/lib/app-url'
import { designSystem } from '@/lib/design-system'
import { creUnderwritingFaqs } from '@/lib/faq-cre-underwriting'

export const metadata: Metadata = {
  title: 'AI CRE Underwriting Software | InvestAssist',
  description:
    'Automated commercial real estate deal analysis powered by AI. Analyze properties in minutes, not days. Instant NOI, cap rates, market benchmarking, and investor-ready insights.',
  openGraph: {
    title: 'AI CRE Underwriting Software | InvestAssist',
    description:
      'Automated commercial real estate deal analysis powered by AI. Analyze properties in minutes, not days.',
    type: 'website',
    url: 'https://investassist.ai/ai-cre-underwriting-software',
    images: [
      {
        url: '/og-cre-underwriting.png',
        width: 1200,
        height: 630,
        alt: 'InvestAssist AI CRE Underwriting Software',
      },
    ],
  },
}

const signupUrl = buildSignupUrl()

export default function AICREUnderwritingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f43f5e 100%)',
            }}
          />
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <Zap className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-medium text-white">AI-Powered Deal Analysis</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight text-balance">
            CRE Underwriting Reimagined by AI
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-12 leading-relaxed">
            Turn deal documents into investor-ready analysis in minutes. Automated NOI calculations, cap rate
            analysis, market benchmarking, and comprehensive property valuation—all powered by artificial intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-20">
            <Link
              href={signupUrl}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all hover:shadow-xl hover:shadow-slate-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
              style={{ background: designSystem.gradients.brand }}
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold border border-white/30 hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Watch Demo
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-start gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>3 free analyses included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>Results in {"<"}5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Problem statement */}
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                The CRE Underwriting Bottleneck
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Commercial real estate analysis is stuck in the past. Underwriters spend days manually extracting
                data from PDFs, spreadsheets, and offering memorandums—tedious work prone to errors.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-slate-900 font-bold mt-1">—</span>
                  <span className="text-slate-700">
                    <strong>Days of manual labor</strong> per deal to extract financial line items
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-slate-900 font-bold mt-1">—</span>
                  <span className="text-slate-700">
                    <strong>Error-prone calculations</strong> missing critical deal drivers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl text-slate-900 font-bold mt-1">—</span>
                  <span className="text-slate-700">
                    <strong>No market context</strong> to benchmark against comparable properties
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: Visual */}
            <div className="rounded-xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-br from-slate-200 to-slate-300 p-12 text-center h-80 flex items-center justify-center">
                <div className="text-slate-500">
                  <BarChart3 className="w-24 h-24 mx-auto mb-4 opacity-40" />
                  <p className="text-lg font-semibold">Manual workflow visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Meet InvestAssist AI Underwriting
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Upload your deal documents and get comprehensive, analyst-quality analysis in minutes—powered by
              advanced machine learning and real estate domain expertise.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <Brain className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Intelligent Document Analysis</h3>
              <p className="text-slate-600">
                AI extracts T-12s, rent rolls, and offering memorandums instantly. No manual data entry. No
                copy-paste errors.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <TrendingUp className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Instant Financial Modeling</h3>
              <p className="text-slate-600">
                Calculate in-place NOI, cap rates, debt service coverage, and cash-on-cash returns in seconds.
                Real-time scenario modeling.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <BarChart3 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Market Benchmarking</h3>
              <p className="text-slate-600">
                Compare properties against market comps instantly. See how the deal stacks up in its submarket and
                asset class.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <Clock className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lightning-Fast Processing</h3>
              <p className="text-slate-600">
                From document upload to investor-ready report in under 5 minutes. No waiting for manual review.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Enterprise Security</h3>
              <p className="text-slate-600">
                Bank-grade encryption, SOC 2 compliance, and role-based access controls for deal confidentiality.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <Zap className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">API & Integration Ready</h3>
              <p className="text-slate-600">
                Embed analysis workflows into your existing software. Full API for white-label or custom
                integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">How It Works in 3 Steps</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get from documents to insights faster than ever before
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-900 text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload Documents</h3>
                  <p className="text-slate-600">
                    Share T-12s, rent rolls, offering memorandums, and operating statements—PDF, Excel, or CSV.
                  </p>
                </div>
              </div>
              {/* Connector line (hidden on mobile) */}
              <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-slate-300" />
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-900 text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Processes Your Deal</h3>
                  <p className="text-slate-600">
                    Our AI extracts financials, calculates metrics, and benchmarks against market comparables in
                    seconds.
                  </p>
                </div>
              </div>
              {/* Connector line (hidden on mobile) */}
              <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-slate-300" />
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-900 text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Get Investor-Ready Report</h3>
                  <p className="text-slate-600">
                    Download a professional analysis with visuals, metrics, and market context—ready to share
                    instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases / Personas Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Built for Real Estate Professionals</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Whether you&apos;re analyzing deals for investment or due diligence, InvestAssist adapts to your workflow.
            </p>
          </div>

          {/* Persona Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Persona 1 */}
            <div className="rounded-xl border border-slate-200 p-8 hover:shadow-lg hover:border-slate-300 transition-all">
              <div className="w-12 h-12 rounded-lg bg-slate-900/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Investment Teams</h3>
              <p className="text-slate-600 mb-4">
                Evaluate more deals faster. Screen portfolios and build thesis in hours instead of weeks.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Deal screening at scale
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Market thesis validation
                </li>
              </ul>
            </div>

            {/* Persona 2 */}
            <div className="rounded-xl border border-slate-200 p-8 hover:shadow-lg hover:border-slate-300 transition-all">
              <div className="w-12 h-12 rounded-lg bg-slate-900/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Due Diligence Teams</h3>
              <p className="text-slate-600 mb-4">
                Verify deal assumptions with AI-powered analysis. Reduce manual effort and improve accuracy.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Assumption validation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Risk identification
                </li>
              </ul>
            </div>

            {/* Persona 3 */}
            <div className="rounded-xl border border-slate-200 p-8 hover:shadow-lg hover:border-slate-300 transition-all">
              <div className="w-12 h-12 rounded-lg bg-slate-900/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Commercial Brokers</h3>
              <p className="text-slate-600 mb-4">
                Provide buyers and sellers with professional analysis. Differentiate your service offering.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Professional reporting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> White-label available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about InvestAssist AI Underwriting
            </p>
          </div>
          <FaqSection faqs={creUnderwritingFaqs} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f43f5e 100%)',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Deal Analysis?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Get 3 free analyses and see how InvestAssist can accelerate your investment workflow. No credit card
            required.
          </p>
          <Link
            href={signupUrl}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            Start Your First Analysis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'InvestAssist AI Underwriting',
            description:
              'Automated commercial real estate deal analysis powered by AI. Analyze properties in minutes, not days.',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: '3 free analyses included',
            },
            url: 'https://investassist.ai/ai-cre-underwriting-software',
          }),
        }}
      />
    </div>
  )
}
