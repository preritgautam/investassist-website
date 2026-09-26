import { getIndexNowKey, indexNowUrls, submitToIndexNow } from "@/lib/indexnow"

/**
 * GET /api/indexnow
 * Serves the IndexNow key as plain text. This URL is the `keyLocation`
 * referenced in submissions, which is how engines verify ownership.
 */
export function GET(): Response {
  const key = getIndexNowKey()
  if (!key) {
    return new Response("IndexNow key not configured", { status: 404 })
  }
  return new Response(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  })
}

/**
 * POST /api/indexnow
 * Triggers a submission of all public URLs to IndexNow. Protected by a shared
 * secret so it cannot be abused: send `x-indexnow-token: <INDEXNOW_TOKEN>`.
 * Intended to be called from a post-deploy hook when articles change.
 */
export async function POST(request: Request): Promise<Response> {
  const expected = process.env.INDEXNOW_TOKEN?.trim()
  if (!expected) {
    return Response.json({ ok: false, reason: "INDEXNOW_TOKEN is not configured." }, { status: 501 })
  }
  const provided = request.headers.get("x-indexnow-token")?.trim()
  if (!provided || provided !== expected) {
    return Response.json({ ok: false, reason: "Unauthorized." }, { status: 401 })
  }

  const result = await submitToIndexNow(indexNowUrls())
  const status = result.ok ? 200 : "skipped" in result && result.skipped ? 202 : 502
  return Response.json(result, { status })
}
