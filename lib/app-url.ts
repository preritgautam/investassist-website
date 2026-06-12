const DEFAULT_APP_URL = "http://localhost:3000"

function getConfiguredAppUrl() {
  const rawUrl = (process.env.NEXT_PUBLIC_APP_URL || DEFAULT_APP_URL).trim().replace(/\/$/, "")
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(rawUrl)) return `http://${rawUrl}`
  return `https://${rawUrl}`
}

export function buildMainAppUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `${getConfiguredAppUrl()}${path.startsWith("/") ? path : `/${path}`}`
}

export function buildAuthUrl(redirect?: string | null) {
  const query = redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""
  return buildMainAppUrl(`/auth${query}`)
}

export function buildSignupUrl(redirect?: string | null) {
  const authUrl = buildAuthUrl(redirect)
  return `${authUrl}${authUrl.includes("?") ? "&" : "?"}mode=signup`
}