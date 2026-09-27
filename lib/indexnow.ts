import { absoluteUrl, getSiteUrl, shouldIndex } from "./seo-config"
import { articlePath, getPublishedArticles, INSIGHTS_BASE_PATH } from "./insights"

/**
 * IndexNow submission helper. IndexNow lets us proactively ping participating
 * search engines (Bing, Yandex, Seznam, and others that share the protocol)
 * when content is published or updated, instead of waiting for a crawl.
 *
 * Requires the INDEXNOW_KEY env var. The key is exposed at
 * `/api/indexnow` (GET) which acts as the keyLocation. Submission is a no-op
 * outside indexable (production) deployments so previews never notify engines.
 */

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

export function getIndexNowKey(): string | undefined {
  return process.env.INDEXNOW_KEY?.trim() || undefined
}

/** The full set of public URLs we advertise via IndexNow. */
export function indexNowUrls(): string[] {
  const urls = [absoluteUrl("/"), absoluteUrl("/sample-analysis"), absoluteUrl(INSIGHTS_BASE_PATH)]
  for (const article of getPublishedArticles()) {
    urls.push(absoluteUrl(articlePath(article.slug)))
  }
  return urls
}

export type IndexNowResult =
  | { ok: true; submitted: number; status: number }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped: false; status: number; reason: string }

/**
 * Submit URLs to IndexNow. Defaults to every public URL. Safely no-ops when
 * indexing is disabled or the key is missing.
 */
export async function submitToIndexNow(urls: string[] = indexNowUrls()): Promise<IndexNowResult> {
  if (!shouldIndex()) {
    return { ok: false, skipped: true, reason: "Deployment is not indexable; skipping IndexNow." }
  }
  const key = getIndexNowKey()
  if (!key) {
    return { ok: false, skipped: true, reason: "INDEXNOW_KEY is not set; skipping IndexNow." }
  }
  if (urls.length === 0) {
    return { ok: false, skipped: true, reason: "No URLs to submit." }
  }

  const host = new URL(getSiteUrl()).host
  const body = {
    host,
    key,
    keyLocation: absoluteUrl("/api/indexnow"),
    urlList: urls,
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return { ok: false, skipped: false, status: res.status, reason: `IndexNow returned ${res.status}` }
  }
  return { ok: true, submitted: urls.length, status: res.status }
}
