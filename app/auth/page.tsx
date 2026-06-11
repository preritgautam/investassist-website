import Link from "next/link"

export const metadata = {
  title: "Auth",
}

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Auth Placeholder</h1>
        <p className="mt-4 text-slate-600">
          This standalone landing-page copy preserves the sign-in and sign-up entry points from the main app,
          but it does not include the full authentication product surface.
        </p>
        <p className="mt-4 text-slate-600">
          Wire this route to your real auth flow if you want the upload handoff to continue beyond the marketing site.
        </p>
        <div className="mt-8">
          <Link href="/" className="inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-800">
            Back to landing page
          </Link>
        </div>
      </div>
    </main>
  )
}
