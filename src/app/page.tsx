"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Sparkles, Upload, FileText, DollarSign, Users, BarChart3, Calculator, Handshake, Briefcase, PieChart, LineChart, Table, Zap, CreditCard, TrendingUp, Target, Building2, Award, CheckCircle2, Shield, AlertTriangle, LogIn, UserPlus, X, Clock, Layers, Cpu } from "lucide-react"

const neu = {
  card: {
    background: 'linear-gradient(145deg, rgba(255,255,255,0.99) 0%, rgba(248,250,252,0.96) 100%)',
    boxShadow: '16px 16px 40px rgba(148,163,184,0.22), -10px -10px 32px rgba(255,255,255,0.98), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(148,163,184,0.06)',
    border: '1px solid rgba(255,255,255,0.92)',
    borderRadius: '20px',
  },
  inset: {
    background: 'linear-gradient(145deg, rgba(237,242,249,0.75) 0%, rgba(246,249,252,0.85) 100%)',
    boxShadow: 'inset 6px 6px 18px rgba(148,163,184,0.18), inset -6px -6px 18px rgba(255,255,255,0.98)',
    border: '1px solid rgba(220,228,240,0.45)',
    borderRadius: '14px',
  },
  btn: {
    background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
    boxShadow: '6px 6px 16px rgba(148,163,184,0.20), -4px -4px 12px rgba(255,255,255,0.95), inset 0 1px 0 rgba(255,255,255,1)',
    border: '1px solid rgba(255,255,255,0.88)',
    borderRadius: '14px',
  },
}

function MiniChart({ data, color, filled = true }: { data: number[]; color: string; filled?: boolean }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 80}`).join(' ')
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      {filled && <><defs><linearGradient id={`ch-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs><polygon points={`0,100 ${pts} 100,100`} fill={`url(#ch-${color.replace('#','')})`} /></>}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SegmentedBar({ segments }: { segments: { pct: number; color: string }[] }) {
  return (
    <div className="flex h-2.5 rounded-full overflow-hidden bg-slate-100">
      {segments.map((s, i) => <motion.div key={i} className="h-full" style={{ backgroundColor: s.color }} initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.6, delay: i * 0.1 }} />)}
    </div>
  )
}

function DonutChart({ segments, centerLabel }: { segments: { pct: number; color: string }[]; centerLabel: string }) {
  let offset = 0
  return (
    <div className="relative">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        {segments.map((s, i) => {
          const dash = s.pct * 0.785
          const currentOffset = offset
          offset += dash
          return <circle key={i} cx="18" cy="18" r="12.5" fill="none" stroke={s.color} strokeWidth="5" strokeDasharray={`${dash} 100`} strokeDashoffset={-currentOffset} transform="rotate(-90 18 18)" />
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-[7px] font-bold text-slate-700 text-center leading-tight px-1">{centerLabel}</span></div>
    </div>
  )
}

function FitScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 28
  const strokeDashoffset = circumference - (score / 100) * circumference
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"
  return (
    <div className="relative w-14 h-14">
      <svg className="w-full h-full -rotate-90">
        <circle cx="28" cy="28" r="28" fill="none" stroke="#e2e8f0" strokeWidth="4" className="opacity-30" />
        <circle cx="28" cy="28" r="28" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold" style={{ color }}>{score}</span></div>
    </div>
  )
}

function LandingPageContent() {
  const searchParams = useSearchParams()
  const [heroRole, setHeroRole] = useState<"acquirer" | "seller" | "syndicator" | "investor">("acquirer")
  const [featureTab, setFeatureTab] = useState(0)
  
  // Preserve redirect param from middleware when navigating to auth
  const redirectParam = searchParams.get("redirect")
  const authUrl = redirectParam ? `http://localhost:3000/auth?redirect=${encodeURIComponent(redirectParam)}` : "http://localhost:3000/auth"

  // Auto-rotate hero role tabs
  useEffect(() => {
    const t = setInterval(() => setHeroRole((p) => {
      const roles: typeof heroRole[] = ["acquirer", "seller", "syndicator", "investor"]
      const idx = roles.indexOf(p)
      return roles[(idx + 1) % 4]
    }), 12000)
    return () => clearInterval(t)
  }, [])

  // Auto-rotate feature tabs
  useEffect(() => {
    const t = setInterval(() => setFeatureTab((p) => (p + 1) % 4), 12000)
    return () => clearInterval(t)
  }, [])

  const roleLabels = [
    { id: "acquirer", label: "Acquirers" },
    { id: "seller", label: "Sellers" },
    { id: "syndicator", label: "Syndicators" },
    { id: "investor", label: "Investors" },
  ]

  const featureTabs = ["Deal Analysis", "Capital Raise", "Debt Match", "Buyer Pipeline"]

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 15%, #dbeafe 35%, #e0e7ff 55%, #f0f9ff 75%, #faf5ff 100%)' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)' }} />
      </div>

      {/* Nav - Bigger logo, Sign in + Sign up */}
      <nav className="sticky top-0 z-50 px-4 py-3 bg-white/60 backdrop-blur-xl border-b border-white/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="relative h-10 w-36 md:h-12 md:w-52"><Image src="/investassist-logo-bgrmd.png" alt="InvestAssist" fill className="object-contain object-left" priority /></div>
          <div className="hidden md:flex items-center gap-6 text-base font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#comparison" className="hover:text-slate-900 transition-colors">Compare</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop: text labels */}
            <Link href={authUrl} className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-base font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
            <Link href={`${authUrl}${authUrl.includes('?') ? '&' : '?'}mode=signup`} className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-base font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
              <UserPlus className="w-4 h-4" /> Sign up
            </Link>
            {/* Mobile: icon-only */}
            <Link href={authUrl} aria-label="Sign in" className="md:hidden p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all">
              <LogIn className="w-5 h-5" />
            </Link>
            <Link href={`${authUrl}${authUrl.includes('?') ? '&' : '?'}mode=signup`} aria-label="Sign up" className="md:hidden p-2.5 rounded-xl text-white hover:shadow-md transition-all" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
              <UserPlus className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Role-based dashboards */}
      <section className="px-2.5 pt-5 md:pt-16 lg:pt-20 pb-5 md:pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-5 lg:gap-12 items-center">
          <div className="space-y-3 md:space-y-7 min-w-0">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1 px-2 py-0.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm font-semibold text-indigo-700 bg-white/90 border border-indigo-100/80" style={{ boxShadow: '0 2px 12px rgba(99,102,241,0.10)' }}>
              <Sparkles className="w-2.5 h-2.5 md:w-4 md:h-4 flex-shrink-0" /> The Platform CRE Pros Can't Ignore
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="text-[1.55rem] sm:text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem] font-extrabold text-slate-900 leading-[1.1] tracking-[-0.03em] text-balance">
              From raw documents to{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">funded deals.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="text-[14px] md:text-xl text-slate-500 leading-[1.55] max-w-lg font-normal">
              Underwrite deals, raise capital, collaborate with buyers and sellers — all without spreadsheets or endless emails.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="flex flex-col sm:flex-row gap-2 pt-0.5">
              <Link href={authUrl} className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[14px] font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 8px 24px rgba(99,102,241,0.35), 0 2px 6px rgba(99,102,241,0.20), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
                See Sample Deal <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`${authUrl}${authUrl.includes('?') ? '&' : '?'}mode=signup`} className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[14px] font-bold text-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]" style={neu.btn}>
                <Upload className="w-4 h-4 text-indigo-600" /> Start with Free Credits
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="flex flex-wrap items-center gap-2.5 text-[12px] text-slate-400 pt-0">
              <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> No credit card</span>
              <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Free credits to start</span>
              <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Results in minutes</span>
            </motion.div>
          </div>

          {/* Hero Dashboard - Role-based collage */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
            <div className="rounded-xl p-2.5 md:p-5" style={neu.card}>
              {/* Role tabs */}
              <div className="flex gap-0.5 mb-2 p-0.5 rounded-lg overflow-x-auto" style={neu.inset}>
                {roleLabels.map((r) => (
                  <button key={r.id} onClick={() => setHeroRole(r.id as typeof heroRole)} className={`flex-1 px-1.5 py-1 rounded-md text-[10px] font-bold transition-all whitespace-nowrap ${heroRole === r.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{r.label}</button>
                ))}
              </div>

              {/* Dynamic Dashboard Content */}
              <AnimatePresence mode="wait">
                <motion.div key={heroRole} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  
                  {/* Acquirer Dashboard */}
                  {heroRole === "acquirer" && (
                    <div className="space-y-0.5">
                      <div className="grid grid-cols-4 gap-0.5">
                        {[{ l: "Ask Price", v: "$18.5M", h: true }, { l: "Implied Cap", v: "6.6%" }, { l: "Adj. NOI", v: "$1.22M", a: true }, { l: "Fit Score", v: "87/100" }].map((m, i) => (
                          <div key={i} className="p-1 rounded-md text-center" style={neu.inset}><p className="text-[6px] font-bold text-slate-400 uppercase tracking-wide">{m.l}</p><p className={`text-[10px] font-extrabold ${m.h ? "text-emerald-600" : m.a ? "text-amber-600" : "text-slate-900"}`}>{m.v}</p></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-5 gap-0.5">
                        <div className="col-span-2 rounded-md p-1" style={neu.card}>
                          <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-0.5"><Target className="w-1.5 h-1.5 text-indigo-500" />Investment Fit</p>
                          <div className="flex items-center gap-1">
                            <FitScoreRing score={87} />
                            <div className="space-y-0">
                              {[{ l: "Return Target", m: true }, { l: "Hold Period", m: true }, { l: "Property Type", m: true }, { l: "Geography", m: true }].map((c, i) => (
                                <div key={i} className="flex items-center gap-0.5 text-[7px]"><CheckCircle2 className={`w-1.5 h-1.5 flex-shrink-0 ${c.m ? "text-emerald-500" : "text-red-500"}`} /><span className="text-slate-600">{c.l}</span></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 rounded-md p-1" style={neu.card}>
                          <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5">Underwriting Comparison</p>
                          <div className="grid grid-cols-3 gap-0.5 text-[7px] mb-0.5"><span className="text-slate-400 font-semibold">Metric</span><span className="text-slate-400 font-semibold">Seller</span><span className="text-slate-400 font-semibold">Your Adj.</span></div>
                          {[{ m: "Revenue", s: "$1.58M", b: "$1.52M" }, { m: "Expenses", s: "$380K", b: "$420K" }, { m: "NOI", s: "$1.20M", b: "$1.10M" }, { m: "Cap Rate", s: "6.5%", b: "5.95%" }].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 gap-0.5 text-[7px] py-0.5 border-t border-slate-100"><span className="text-slate-600">{r.m}</span><span className="text-slate-700">{r.s}</span><span className="text-amber-600 font-bold">{r.b}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="rounded-md p-1" style={neu.inset}>
                          <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5">10-Yr NOI Growth</p>
                          <div className="h-7"><MiniChart data={[1100, 1140, 1180, 1225, 1270, 1320, 1370, 1420, 1480, 1540]} color="#6366f1" /></div>
                        </div>
                        <div className="rounded-md p-1" style={neu.inset}>
                          <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-0.5"><AlertTriangle className="w-1.5 h-1.5 text-amber-500" />Risk Assessment</p>
                          <div className="space-y-0.5">
                            {[{ l: "Tax Reassessment", s: "high" }, { l: "Near-term Expirations", s: "med" }, { l: "Deferred Maintenance", s: "low" }].map((r, i) => (
                              <div key={i} className="flex items-center justify-between text-[7px]"><span className="text-slate-600">{r.l}</span><span className={`px-0.5 rounded text-[6px] font-bold ${r.s === "high" ? "bg-red-50 text-red-600" : r.s === "med" ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-500"}`}>{r.s}</span></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-0.5">
                        {[{ l: "Levered IRR", v: "14.2%", c: "text-indigo-600" }, { l: "CoC Yr 1", v: "6.8%", c: "text-emerald-600" }, { l: "Equity Multiple", v: "1.78x", c: "text-slate-800" }].map((m, i) => (
                          <div key={i} className="rounded-md p-1 text-center" style={neu.inset}>
                            <p className="text-[6px] font-bold text-slate-400 uppercase">{m.l}</p>
                            <p className={`text-[10px] font-extrabold ${m.c}`}>{m.v}</p>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-md p-1" style={neu.card}>
                        <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-0.5"><LineChart className="w-1.5 h-1.5 text-indigo-500" />Comparable Sales</p>
                        <div className="space-y-0">
                          {[{ a: "123 Main St", sf: "42,000 sf", cap: "6.1%", ps: "$425/sf" }, { a: "456 Oak Ave", sf: "38,500 sf", cap: "6.4%", ps: "$398/sf" }, { a: "789 Elm Blvd", sf: "51,200 sf", cap: "6.8%", ps: "$362/sf" }].map((c, i) => (
                            <div key={i} className="grid grid-cols-4 gap-0.5 text-[7px] py-0.5 border-b border-slate-100 last:border-0">
                              <span className="text-slate-700 font-semibold truncate">{c.a}</span>
                              <span className="text-slate-500">{c.sf}</span>
                              <span className="text-indigo-600 font-bold">{c.cap}</span>
                              <span className="text-slate-600">{c.ps}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Seller Dashboard */}
                  {heroRole === "seller" && (
                    <div className="space-y-0.5">
                      <div className="grid grid-cols-4 gap-0.5">
                        {[{ l: "Asking", v: "$18.5M", h: true }, { l: "Best Offer", v: "$17.8M" }, { l: "Active Buyers", v: "24" }, { l: "Days Listed", v: "18" }].map((m, i) => (
                          <div key={i} className="p-1 rounded-md text-center" style={neu.inset}><p className="text-[6px] font-bold text-slate-400 uppercase tracking-wide">{m.l}</p><p className={`text-[10px] font-extrabold ${m.h ? "text-emerald-600" : "text-slate-900"}`}>{m.v}</p></div>
                        ))}
                      </div>
                      <div className="rounded-md p-1" style={neu.card}>
                        <p className="text-[6px] font-bold text-slate-500 uppercase mb-0.5">Buyer Funnel</p>
                        <div className="flex items-end gap-0.5 mb-0.5">
                          {[{ stage: "Contacted", count: 42, pct: 100 }, { stage: "NDAs", count: 18, pct: 43 }, { stage: "IOIs", count: 6, pct: 14 }, { stage: "LOIs", count: 2, pct: 5 }, { stage: "DD", count: 1, pct: 2 }].map((s) => (
                            <div key={s.stage} className="flex-1 flex flex-col items-center gap-0">
                              <span className="text-[10px] font-extrabold text-slate-800">{s.count}</span>
                              <div className="w-full rounded-t bg-gradient-to-t from-blue-600 to-blue-400" style={{ height: `${Math.max(s.pct * 0.28, 2)}px` }} />
                              <span className="text-[6px] text-slate-500">{s.stage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="rounded-md p-1" style={neu.inset}>
                          <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5">Top Bidders</p>
                          {[{ rank: 1, name: "Buyer A", offer: "$17.8M", trend: "+2%" }, { rank: 2, name: "Buyer B", offer: "$17.2M", trend: "+1%" }, { rank: 3, name: "Buyer C", offer: "$16.9M", trend: "" }].map((b) => (
                            <div key={b.rank} className="flex items-center justify-between py-0.5 border-b border-slate-100 last:border-0">
                              <div className="flex items-center gap-0.5"><span className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[6px] font-bold flex items-center justify-center flex-shrink-0">{b.rank}</span><span className="text-[7px] text-slate-700">{b.name}</span></div>
                              <div className="text-right"><span className="text-[7px] font-bold text-slate-800">{b.offer}</span>{b.trend && <span className="text-[6px] text-emerald-600 ml-0.5">{b.trend}</span>}</div>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-md p-1" style={neu.inset}>
                          <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5">Financial Snapshot</p>
                          {[{ l: "In-Place NOI", v: "$1.22M" }, { l: "Proforma NOI", v: "$1.38M" }, { l: "Expense Ratio", v: "32%" }, { l: "WALT", v: "4.2 yrs" }].map((r, i) => (
                            <div key={i} className="flex justify-between text-[7px] py-0.5 border-b border-slate-100 last:border-0"><span className="text-slate-500">{r.l}</span><span className="font-bold text-slate-800">{r.v}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-md p-1" style={neu.card}>
                        <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-0.5"><TrendingUp className="w-1.5 h-1.5 text-emerald-500" />Offer Activity (Last 30 Days)</p>
                        <div className="h-7"><MiniChart data={[0, 1, 1, 2, 3, 3, 5, 6, 8, 10, 12, 15, 18, 20, 24]} color="#10b981" /></div>
                      </div>
                      <div className="grid grid-cols-3 gap-0.5">
                        {[{ l: "NDAs Sent", v: "18", c: "text-indigo-600" }, { l: "IOIs Received", v: "6", c: "text-emerald-600" }, { l: "Avg Offer Gap", v: "-3.8%", c: "text-amber-600" }].map((m, i) => (
                          <div key={i} className="rounded-md p-1 text-center" style={neu.inset}>
                            <p className="text-[6px] font-bold text-slate-400 uppercase">{m.l}</p>
                            <p className={`text-[10px] font-extrabold ${m.c}`}>{m.v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Syndicator Dashboard */}
                  {heroRole === "syndicator" && (
                    <div className="space-y-0.5">
                      <div className="grid grid-cols-4 gap-0.5">
                        {[{ l: "Target IRR", v: "18.4%", h: true }, { l: "Eq. Multiple", v: "1.92x" }, { l: "Pref Return", v: "8%" }, { l: "LP Equity", v: "$6.5M" }].map((m, i) => (
                          <div key={i} className="p-1 rounded-md text-center" style={neu.inset}><p className="text-[6px] font-bold text-slate-400 uppercase tracking-wide">{m.l}</p><p className={`text-[10px] font-extrabold ${m.h ? "text-emerald-600" : "text-slate-900"}`}>{m.v}</p></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-5 gap-0.5">
                        <div className="col-span-2 rounded-md p-1" style={neu.card}>
                          <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5">Capital Stack</p>
                          <div className="w-12 h-12 mx-auto mb-0.5"><DonutChart segments={[{ pct: 65, color: "#3b82f6" }, { pct: 25, color: "#10b981" }, { pct: 10, color: "#f59e0b" }]} centerLabel="$20.2M" /></div>
                          <div className="flex justify-center gap-1 text-[6px]"><span className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-blue-500" />Debt 65%</span><span className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-emerald-500" />LP 25%</span></div>
                        </div>
                        <div className="col-span-3 rounded-md p-1" style={neu.card}>
                          <div className="flex items-center justify-between mb-0.5"><p className="text-[6px] font-bold text-slate-400 uppercase">Investor Pipeline</p><span className="text-[8px] font-extrabold text-emerald-600">78% Raised</span></div>
                          <SegmentedBar segments={[{ pct: 40, color: "#10b981" }, { pct: 22, color: "#3b82f6" }, { pct: 16, color: "#f59e0b" }]} />
                          <div className="flex gap-1 mt-0.5 mb-0.5 text-[6px]"><span className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-emerald-500" />Funded</span><span className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-blue-500" />Hard</span><span className="flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-amber-500" />Soft</span></div>
                          {[{ n: "LP Fund I", a: "$2.0M", s: "Funded" }, { n: "LP Fund II", a: "$1.5M", s: "Hard" }, { n: "LP Fund III", a: "$800K", s: "Soft" }].map((lp, i) => (
                            <div key={i} className="flex items-center justify-between text-[7px] py-0.5 border-t border-slate-100"><span className="text-slate-600">{lp.n}</span><span className="font-bold">{lp.a}</span><span className={`px-0.5 rounded text-[6px] font-bold ${lp.s === "Funded" ? "bg-emerald-50 text-emerald-700" : lp.s === "Hard" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{lp.s}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-md p-1" style={neu.inset}>
                        <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5">Scenario Analysis</p>
                        <div className="grid grid-cols-3 gap-0.5">
                          {[{ s: "Downside", irr: "12.8%", em: "1.52x", c: "text-amber-600" }, { s: "Base", irr: "18.4%", em: "1.92x", c: "text-indigo-600" }, { s: "Upside", irr: "24.2%", em: "2.35x", c: "text-emerald-600" }].map((sc, i) => (
                            <div key={i} className="text-center p-0.5 rounded-md bg-white/70"><p className="text-[6px] text-slate-500">{sc.s}</p><p className={`text-[11px] font-extrabold ${sc.c}`}>{sc.irr}</p><p className="text-[7px] text-slate-600">{sc.em}</p></div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-md p-1" style={neu.card}>
                        <p className="text-[6px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-0.5"><DollarSign className="w-1.5 h-1.5 text-emerald-500" />Capital Call Schedule</p>
                        <div className="space-y-0">
                          {[{ call: "Call #1 — Close", date: "Apr 1", pct: "40%", amt: "$2.6M" }, { call: "Call #2 — Renovation", date: "Jul 15", pct: "35%", amt: "$2.3M" }, { call: "Call #3 — Stabilize", date: "Oct 1", pct: "25%", amt: "$1.6M" }].map((c, i) => (
                            <div key={i} className="flex items-center justify-between text-[7px] py-0.5 border-b border-slate-100 last:border-0">
                              <span className="text-slate-600">{c.call}</span>
                              <span className="text-slate-400">{c.date}</span>
                              <span className="text-indigo-600 font-bold">{c.pct}</span>
                              <span className="font-bold text-slate-800">{c.amt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Investor Dashboard */}
                  {heroRole === "investor" && (
                    <div className="space-y-1">
                      <div className="grid grid-cols-4 gap-1">
                        {[{ l: "Target IRR", v: "18.4%", h: true }, { l: "Eq. Multiple", v: "1.92x" }, { l: "Avg CoC", v: "9.2%" }, { l: "Hold Period", v: "5 yrs" }].map((m, i) => (
                          <div key={i} className="p-1.5 rounded-lg text-center" style={neu.inset}><p className="text-[7px] font-bold text-slate-400 uppercase tracking-wide">{m.l}</p><p className={`text-[11px] font-extrabold ${m.h ? "text-emerald-600" : "text-slate-900"}`}>{m.v}</p></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="col-span-2 rounded-lg p-1.5" style={neu.card}>
                          <p className="text-[7px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-0.5"><Award className="w-2 h-2 text-indigo-500" />Sponsor Track Record</p>
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">JD</div>
                            <div><p className="text-[9px] font-bold text-slate-800">John Doe</p><p className="text-[7px] text-slate-500">12 deals, 8 realized</p></div>
                          </div>
                          <div className="grid grid-cols-3 gap-0.5">
                            {[{ l: "Avg IRR", v: "21.3%" }, { l: "Avg EM", v: "2.1x" }, { l: "Loss", v: "0%" }].map((m, i) => (
                              <div key={i} className="text-center p-0.5 rounded bg-white/70"><p className="text-[6px] text-slate-400 uppercase font-bold">{m.l}</p><p className="text-[9px] font-extrabold text-slate-800">{m.v}</p></div>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-3 rounded-lg p-1.5" style={neu.card}>
                          <p className="text-[7px] font-bold text-slate-400 uppercase mb-0.5">Projected Cashflows ($100K)</p>
                          <div className="h-10"><MiniChart data={[8200, 8600, 9100, 9800, 142000]} color="#10b981" /></div>
                          <div className="flex justify-between text-[7px] text-slate-500 mt-0.5"><span>Yr 1</span><span>Yr 2</span><span>Yr 3</span><span>Yr 4</span><span>Sale</span></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="rounded-lg p-1.5" style={neu.inset}>
                          <p className="text-[7px] font-bold text-slate-400 uppercase mb-0.5">Fee Structure</p>
                          {[{ l: "Acquisition Fee", v: "1.0%" }, { l: "Asset Mgmt Fee", v: "1.5%" }, { l: "Disposition Fee", v: "1.0%" }].map((f, i) => (
                            <div key={i} className="flex justify-between text-[8px] py-0.5 border-b border-slate-100 last:border-0"><span className="text-slate-500">{f.l}</span><span className="font-bold text-slate-700">{f.v}</span></div>
                          ))}
                        </div>
                        <div className="rounded-lg p-1.5" style={neu.inset}>
                          <p className="text-[7px] font-bold text-slate-400 uppercase mb-0.5">Waterfall</p>
                          <div className="space-y-0.5">
                            {[{ t: "T1", lp: 100, hurdle: "8% Pref" }, { t: "T2", lp: 70, hurdle: "12% IRR" }, { t: "T3", lp: 60, hurdle: "18% IRR" }].map((tier, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <span className="text-[7px] text-slate-500 w-3 font-bold">{tier.t}</span>
                                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden flex">
                                  <div className="bg-emerald-500 h-full" style={{ width: `${tier.lp}%` }} />
                                  <div className="bg-amber-400 h-full" style={{ width: `${100 - tier.lp}%` }} />
                                </div>
                                <span className="text-[7px] text-slate-500 w-10 font-semibold">{tier.hurdle}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg p-1.5" style={neu.card}>
                        <p className="text-[7px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-0.5"><PieChart className="w-2 h-2 text-indigo-500" />Distribution History</p>
                        <div className="h-8"><MiniChart data={[8200, 8450, 8700, 9100, 9400, 9800, 10200]} color="#6366f1" /></div>
                        <div className="flex justify-between text-[6px] text-slate-400 mt-0.5"><span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span><span>Q1</span><span>Q2</span><span>Q3</span></div>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {[{ l: "Total Invested", v: "$100K", c: "text-slate-800" }, { l: "Distributions", v: "$18.4K", c: "text-emerald-600" }, { l: "Curr Value", v: "$112K", c: "text-indigo-600" }, { l: "Total Return", v: "+30.4%", c: "text-emerald-600" }].map((m, i) => (
                          <div key={i} className="rounded-lg p-1 text-center" style={neu.inset}>
                            <p className="text-[6px] font-bold text-slate-400 uppercase leading-tight">{m.l}</p>
                            <p className={`text-[9px] font-extrabold ${m.c}`}>{m.v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Strip */}
      <section className="px-4 py-5 md:py-6 border-y border-slate-200/40 bg-white/40 backdrop-blur-sm overflow-x-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-5 md:gap-x-10 gap-y-3 text-sm font-semibold text-slate-500">
            {[{ icon: FileText, t: "AI Document Extraction" }, { icon: Calculator, t: "Instant Underwriting" }, { icon: DollarSign, t: "Debt Marketplace" }, { icon: Users, t: "Capital Raising" }, { icon: Handshake, t: "Deal Collaboration" }, { icon: BarChart3, t: "Pro Forma Modeling" }, { icon: Briefcase, t: "Investor Portal" }].map((c, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap"><c.icon className="w-4 h-4 text-indigo-500 flex-shrink-0" />{c.t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Deal Analysis, Capital Raise, Debt Match, Buyer Pipeline */}
      <section id="features" className="px-4 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Platform</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight text-balance">Your complete deal command center</h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">Replace spreadsheets, email chains, and disconnected tools — once and for all.</p>
          </div>
          <div className="flex justify-center mb-4 overflow-x-auto pb-0.5">
            <div className="inline-flex p-0.5 md:p-1 rounded-lg" style={neu.inset}>
              {featureTabs.map((t, i) => (
                <button key={i} onClick={() => setFeatureTab(i)} className={`px-2.5 md:px-4 py-1 md:py-1.5 rounded-md text-[12px] md:text-sm font-semibold transition-all whitespace-nowrap ${featureTab === i ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{t}</button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={featureTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="rounded-xl p-3.5 md:p-5" style={neu.card}>
              <div className="grid md:grid-cols-2 gap-5 md:h-[300px]">
                {/* Left: Details */}
                <div className="flex flex-col justify-between md:h-full">
                  {featureTab === 0 && (
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2">AI-Powered Deal Analysis</h3>
                        <p className="text-[14px] text-slate-600 leading-relaxed mb-4">Upload any document — T-12s, rent rolls, OMs — and get instant, accurate extraction and underwriting.</p>
                      </div>
                      <ul className="space-y-3 flex-1">
                        {["AI extracts data from scanned PDFs, Excel, images", "10-year pro formas generated in seconds", "Side-by-side seller vs. buyer underwriting", "Sensitivity analysis and scenario modeling", "One-click export to investment committee"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[14px] text-slate-700"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {featureTab === 1 && (
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2">Streamlined Capital Raising</h3>
                        <p className="text-[14px] text-slate-600 leading-relaxed mb-4">Track LP commitments, manage capital calls, and keep investors informed — all in one place.</p>
                      </div>
                      <ul className="space-y-3 flex-1">
                        {["Visual capital stack builder", "LP commitment tracking (soft, hard, funded)", "Automated capital call generation", "Waterfall distribution modeling", "Investor portal with real-time updates"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[14px] text-slate-700"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {featureTab === 2 && (
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2">Intelligent Debt Matching</h3>
                        <p className="text-[14px] text-slate-600 leading-relaxed mb-4">Structure your debt, compare term sheets side-by-side, and submit applications with one click.</p>
                      </div>
                      <ul className="space-y-3 flex-1">
                        {["Instant matching with qualified lenders", "Live rate quotes updated daily", "Side-by-side term comparison", "DSCR and debt yield analysis", "One-click lender application"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[14px] text-slate-700"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {featureTab === 3 && (
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2">Smart Buyer Pipeline</h3>
                        <p className="text-[14px] text-slate-600 leading-relaxed mb-4">Track every buyer from first touch to closing. Manage NDAs, LOIs, and create competitive bidding dynamics.</p>
                      </div>
                      <ul className="space-y-3 flex-1">
                        {["Visual buyer funnel with engagement tracking", "Automated NDA and LOI workflows", "Buyer leaderboard with offer comparison", "Secure data room with access analytics", "Real-time activity notifications"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[14px] text-slate-700"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Right: Visual elements - Hidden on mobile, fixed height on desktop */}
                <div className="hidden md:block rounded-lg p-3 h-full overflow-hidden" style={neu.inset}>
                  {featureTab === 0 && (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-4 gap-1.5">
                        {[{ l: "Purchase", v: "$18.5M" }, { l: "IRR", v: "18.4%", h: true }, { l: "CoC", v: "9.2%", h: true }, { l: "DSCR", v: "1.42x" }].map((m, i) => (
                          <div key={i} className="p-1.5 rounded-md text-center bg-white/60"><p className="text-[7px] font-semibold text-slate-400 uppercase">{m.l}</p><p className={`text-xs font-bold ${m.h ? "text-emerald-600" : "text-slate-900"}`}>{m.v}</p></div>
                        ))}
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="col-span-2 rounded-md p-1.5 bg-white/60"><p className="text-[7px] font-semibold text-slate-400 uppercase mb-0.5">NOI Growth</p><div className="h-12"><MiniChart data={[420, 445, 472, 505, 538, 575, 612, 655, 698, 745]} color="#6366f1" /></div></div>
                        <div className="col-span-3 rounded-md p-1.5 bg-white/60">
                          <p className="text-[7px] font-semibold text-slate-400 uppercase mb-0.5">Pro Forma</p>
                          <div className="grid grid-cols-4 gap-0.5 text-[7px] mb-0.5"><span className="text-slate-400">Year</span><span className="text-slate-400">NOI</span><span className="text-slate-400">CF</span><span className="text-slate-400">IRR</span></div>
                          {[{ y: "1", n: "$1.02M", c: "$312K", i: "8.2%" }, { y: "5", n: "$1.28M", c: "$485K", i: "14.8%" }, { y: "10", n: "$1.65M", c: "$720K", i: "18.4%" }].map((r, i) => (
                            <div key={i} className="grid grid-cols-4 gap-0.5 text-[7px] py-0.5 border-t border-slate-200"><span className="font-medium text-slate-600">Y{r.y}</span><span className="text-slate-700">{r.n}</span><span className="text-emerald-600">{r.c}</span><span className="text-indigo-600 font-semibold">{r.i}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="rounded-md p-1.5 bg-white/60"><p className="text-[7px] font-semibold text-slate-400 uppercase mb-0.5">Cash Flow</p><div className="h-10"><MiniChart data={[312, 345, 378, 412, 448, 485, 524, 568, 612, 658]} color="#10b981" /></div></div>
                        <div className="rounded-md p-1.5 bg-white/60"><p className="text-[7px] font-semibold text-slate-400 uppercase mb-0.5">Occupancy</p><div className="h-10"><MiniChart data={[92, 93, 94, 95, 96, 96, 97, 97, 98, 98]} color="#8b5cf6" /></div></div>
                      </div>
                    </div>
                  )}
                  {featureTab === 1 && (
                    <div className="space-y-2.5">
                      <div className="rounded-md p-2 bg-white/60">
                        <div className="flex justify-between items-center mb-1.5"><span className="text-[8px] font-semibold text-slate-500">Capital Stack</span><span className="text-xs font-bold text-slate-900">$6.3M<span className="text-slate-400 text-[9px] font-normal"> / $8M</span></span></div>
                        <SegmentedBar segments={[{ pct: 40, color: "#10b981" }, { pct: 22, color: "#3b82f6" }, { pct: 17, color: "#f59e0b" }]} />
                        <div className="flex gap-2 mt-1.5 text-[7px]"><span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Funded $3.2M</span><span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Hard $1.8M</span><span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Soft $1.3M</span></div>
                      </div>
                      <div className="space-y-0.5">
                        {[{ n: "LP 1", a: "$2.5M", s: "Funded", c: "bg-emerald-50 text-emerald-700 border-emerald-200" }, { n: "LP 2", a: "$1.8M", s: "Hard Commit", c: "bg-blue-50 text-blue-700 border-blue-200" }, { n: "LP 3", a: "$1.2M", s: "Soft Commit", c: "bg-amber-50 text-amber-700 border-amber-200" }, { n: "LP 4", a: "$800K", s: "Reviewing", c: "bg-slate-50 text-slate-600 border-slate-200" }].map((lp, i) => (
                          <div key={i} className="flex items-center justify-between rounded-md p-1.5 bg-white/60">
                            <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[7px] font-bold text-indigo-600">{lp.n.slice(-1)}</div><div><p className="text-[8px] font-medium text-slate-800">{lp.n}</p><p className="text-[7px] text-slate-500">{lp.a}</p></div></div>
                            <span className={`px-1 py-0.5 rounded border text-[7px] font-semibold ${lp.c}`}>{lp.s}</span>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {[{ l: "Target Close", v: "14 days" }, { l: "Min Investment", v: "$100K" }, { l: "Pref Return", v: "8%" }].map((m, i) => (
                          <div key={i} className="rounded-md p-1.5 text-center bg-white/60"><p className="text-[7px] text-slate-400 uppercase">{m.l}</p><p className="text-xs font-bold text-slate-900">{m.v}</p></div>
                        ))}
                      </div>
                    </div>
                  )}
                  {featureTab === 2 && (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-3 gap-1">
                        {[{ l: "Loan Req", v: "$12.9M" }, { l: "Best Rate", v: "6.25%", h: true }, { l: "Max LTV", v: "80%" }].map((m, i) => (
                          <div key={i} className="p-1.5 rounded-md text-center bg-white/60"><p className="text-[7px] font-semibold text-slate-400 uppercase">{m.l}</p><p className={`text-xs font-bold ${m.h ? "text-emerald-600" : "text-slate-900"}`}>{m.v}</p></div>
                        ))}
                      </div>
                      <div className="rounded-md p-2 bg-white/60">
                        <p className="text-[7px] font-semibold text-slate-500 mb-1">Live Term Sheet Quotes (4 matched)</p>
                        <div className="space-y-0.5">
                          {[{ l: "Bank A", r: "6.25%", ltv: "70%", term: "5yr", io: "2yr", best: true }, { l: "Bank B", r: "6.50%", ltv: "75%", term: "7yr", io: "3yr" }, { l: "Credit Union", r: "6.65%", ltv: "75%", term: "10yr", io: "2yr" }, { l: "CMBS", r: "6.75%", ltv: "80%", term: "10yr", io: "5yr" }].map((q, i) => (
                            <div key={i} className={`flex items-center justify-between text-[8px] p-1 rounded-md ${q.best ? "bg-emerald-50 border border-emerald-200" : "bg-slate-50"}`}>
                              <span className="font-medium text-slate-700 w-20">{q.l}</span>
                              <span className={`font-bold ${q.best ? "text-emerald-600" : "text-indigo-600"}`}>{q.r}</span>
                              <span className="text-slate-500">{q.ltv}</span>
                              <span className="text-slate-400">{q.term}</span>
                              <span className="text-slate-400">{q.io} IO</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="rounded-md p-1.5 bg-white/60"><p className="text-[7px] text-slate-400 uppercase mb-0.5">Debt Service</p><div className="h-10"><MiniChart data={[850, 850, 850, 850, 850, 820, 820, 820, 820, 820]} color="#6366f1" filled={false} /></div></div>
                        <div className="rounded-md p-1.5 bg-white/60"><p className="text-[7px] text-slate-400 uppercase mb-0.5">DSCR Trend</p><div className="h-10"><MiniChart data={[1.35, 1.38, 1.42, 1.45, 1.48, 1.52, 1.55, 1.58, 1.62, 1.65]} color="#10b981" /></div></div>
                      </div>
                    </div>
                  )}
                  {featureTab === 3 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between rounded-md p-1.5 bg-white/60">
                        <span className="text-[8px] font-semibold text-slate-600">Active Buyers</span><span className="text-base font-bold text-indigo-600">24</span>
                      </div>
                      <div className="space-y-0.5">
                        {[{ stage: "Viewing Materials", count: 12, pct: 50, color: "#94a3b8" }, { stage: "Engaged / Touring", count: 7, pct: 29, color: "#3b82f6" }, { stage: "LOI Submitted", count: 4, pct: 17, color: "#8b5cf6" }, { stage: "Under Contract", count: 1, pct: 4, color: "#10b981" }].map((s, i) => (
                          <div key={i} className="rounded-md p-1.5 bg-white/60">
                            <div className="flex justify-between text-[8px] mb-0.5"><span className="text-slate-600">{s.stage}</span><span className="font-bold" style={{ color: s.color }}>{s.count}</span></div>
                            <div className="h-1 rounded-full bg-slate-100"><motion.div className="h-full rounded-full" style={{ backgroundColor: s.color }} initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.5, delay: i * 0.1 }} /></div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {[{ l: "Avg Time to LOI", v: "8 days" }, { l: "Highest Bid", v: "+4.2%" }, { l: "Data Room Views", v: "156" }].map((m, i) => (
                          <div key={i} className="rounded-md p-1.5 text-center bg-white/60"><p className="text-[7px] text-slate-400 uppercase">{m.l}</p><p className="text-xs font-bold text-slate-900">{m.v}</p></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="px-4 py-14">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">The Difference</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 text-balance">Stop duct-taping your deal workflow.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">Every hour spent in spreadsheets is an hour not spent finding the next deal. InvestAssist gives that time back.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {/* Before */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl p-6 md:p-8 border-2 border-red-100" style={{ background: 'linear-gradient(145deg, rgba(255,245,245,0.9) 0%, rgba(255,250,250,0.95) 100%)', boxShadow: '8px 8px 24px rgba(239,68,68,0.06), -4px -4px 16px rgba(255,255,255,0.9)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-red-400 uppercase tracking-wider">Before InvestAssist</p>
                  <p className="text-base font-bold text-slate-800">The fragmented grind</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Clock, t: "Hours re-keying data from PDFs into Excel", sub: "Error-prone. Every. Single. Deal." },
                  { icon: Layers, t: "6+ disconnected tools per transaction", sub: "Email, Excel, Dropbox, DocuSign, text threads..." },
                  { icon: Users, t: "Buyers, lenders, and LPs in separate silos", sub: "No visibility. Constant follow-up." },
                  { icon: AlertTriangle, t: "Deals fall through the cracks", sub: "No single source of truth for your pipeline." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/60">
                    <item.icon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{item.t}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl p-6 md:p-8 border-2 border-indigo-100" style={{ background: 'linear-gradient(145deg, rgba(238,242,255,0.9) 0%, rgba(245,248,255,0.95) 100%)', boxShadow: '8px 8px 24px rgba(99,102,241,0.08), -4px -4px 16px rgba(255,255,255,0.9)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider">With InvestAssist</p>
                  <p className="text-base font-bold text-slate-800">One platform, total clarity</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Cpu, t: "AI extracts and models data in seconds", sub: "Upload a PDF. Get a full pro forma instantly." },
                  { icon: Layers, t: "Every tool you need, unified in one place", sub: "Underwriting, debt, capital raises, buyer pipeline." },
                  { icon: Users, t: "All stakeholders in one shared deal room", sub: "Real-time visibility for you and your team." },
                  { icon: TrendingUp, t: "Never lose a deal to disorganization again", sub: "Pipeline, offers, and status — always current." },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-start gap-3 p-3 rounded-xl bg-indigo-50/60">
                    <item.icon className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{item.t}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { stat: "10x", label: "Faster underwriting", color: "text-indigo-600" },
              { stat: "15 min", label: "To first pro forma", color: "text-emerald-600" },
              { stat: "100%", label: "Document types supported", color: "text-violet-600" },
              { stat: "0", label: "Spreadsheets needed", color: "text-rose-500" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center rounded-2xl p-4 md:p-5" style={neu.card}>
                <p className={`text-3xl md:text-4xl font-bold mb-1 ${s.color}`}>{s.stat}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Vercel/OpenAI style credit-based */}
      <section id="pricing" className="px-4 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Pay for what you use</h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">Credits-based pricing. Buy once, analyze deals. Add team members anytime.</p>
          </div>
          
          {/* Credit packs */}
          <div className="rounded-[22px] p-6 md:p-8 mb-6" style={neu.card}>
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Credit Packs</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { credits: "100", price: "$79", perCredit: "$0.79", overage: "$1.00", popular: false },
                { credits: "300", price: "$199", perCredit: "$0.66", overage: "$0.90", popular: true, save: "Save 17%" },
                { credits: "900", price: "$499", perCredit: "$0.55", overage: "$0.80", popular: false, save: "Save 30%" },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex flex-col items-center text-center pt-8 pb-6 px-5 rounded-2xl"
                  style={p.popular
                    ? { background: 'linear-gradient(145deg, rgba(238,242,255,0.9) 0%, rgba(245,248,255,0.95) 100%)', boxShadow: 'inset 6px 6px 18px rgba(148,163,184,0.16), inset -6px -6px 18px rgba(255,255,255,0.95)', border: '2px solid rgba(99,102,241,0.35)', borderRadius: '16px' }
                    : neu.inset
                  }
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}>
                      Best Value
                    </div>
                  )}
                  {p.save && !p.popular && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-bold text-emerald-700 bg-emerald-50">
                      {p.save}
                    </div>
                  )}
                  <p className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-1">{p.credits}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Credits</p>
                  <p className="text-3xl font-extrabold text-indigo-600 mb-1">{p.price}</p>
                  <p className="text-sm text-slate-400 mb-5">{p.perCredit} / credit</p>
                  <div className="w-full border-t border-slate-200/60 pt-4">
                    <p className="text-xs text-slate-400 mb-1">Overage rate</p>
                    <p className="text-base font-bold text-slate-700">{p.overage} / credit</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div className="rounded-2xl p-5 md:p-6" style={neu.card}>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4">All plans include</h3>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: "Full Platform Access", items: ["AI document extraction", "Underwriting tools", "Debt marketplace", "Capital raise tracking"] },
                { title: "Collaboration", items: ["Invite team members", "Control usage per user", "Deal rooms", "Audit trails"] },
                { title: "Support & Security", items: ["Email support", "Bank-grade encryption", "SOC 2 compliance", "Data export anytime"] },
              ].map((g, i) => (
                <div key={i}>
                  <p className="text-sm md:text-base font-semibold text-slate-700 mb-2">{g.title}</p>
                  <ul className="space-y-2">{g.items.map((item, j) => (<li key={j} className="flex items-center gap-2 text-sm text-slate-600"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />{item}</li>))}</ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Link href={authUrl} className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 8px 28px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
              Start with Free Credits <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-slate-400">No credit card required. 10 free credits to start.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pt-8 md:pt-10 pb-14 md:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[28px] p-10 md:p-14" style={neu.card}>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}>
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Ready to see it in action?</h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">Explore a sample deal or upload your own documents — free.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={authUrl} className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 8px 24px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
                See Sample Deal <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={`${authUrl}${authUrl.includes('?') ? '&' : '?'}mode=signup`} className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-slate-700 transition-all hover:scale-[1.02]" style={neu.btn}>
                <Upload className="w-5 h-5 text-indigo-600" /> Upload Documents
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-slate-200/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative h-10 w-40"><Image src="/investassist-logo-bgrmd.png" alt="InvestAssist" fill className="object-contain object-left" /></div>
          <p className="text-sm text-slate-400">© 2026 Clik Technologies Inc.</p>
          <div className="flex items-center gap-6 text-sm text-slate-500"><a href="/legal/terms" className="hover:text-slate-700 transition-colors">Terms</a><a href="/legal/privacy" className="hover:text-slate-700 transition-colors">Privacy</a></div>
        </div>
      </footer>
    </div>
  )
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 15%, #dbeafe 35%, #e0e7ff 55%, #f0f9ff 75%, #faf5ff 100%)' }}><div className="animate-pulse text-slate-400">Loading...</div></div>}>
      <LandingPageContent />
    </Suspense>
  )
}
