import { NextRequest, NextResponse } from "next/server"
import {
  ensurePendingBucket,
  getAdmin,
  INTAKE_MAX_FILE_SIZE,
  INTAKE_MAX_FILES,
  isAllowedFile,
  PENDING_BUCKET,
  sanitizeFileName,
  writeIntakeMetadata,
  type IntakeFileMeta,
  type IntakeMetadata,
} from "@/lib/uploads/intake-staging"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type IncomingFile = {
  name?: string
  size?: number
  mimeType?: string | null
  requestedFileType?: string | null
}

/**
 * POST /api/intake/create  (PUBLIC — no auth required)
 *
 * Stages a pre-auth deal intake. Called when a logged-out visitor clicks
 * "Analyze Property" with an address + documents. Returns a set of signed
 * upload URLs the browser uses to upload each file directly to the private
 * staging bucket. After auth, /api/intake/claim turns this into a real deal.
 */
export async function POST(request: NextRequest) {
  try {
    let body: {
      address?: string
      propertyUrl?: string | null
      dealName?: string
      files?: IncomingFile[]
    }

    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const address = typeof body.address === "string" ? body.address.trim() : ""
    const propertyUrl = typeof body.propertyUrl === "string" && body.propertyUrl.trim() ? body.propertyUrl.trim() : null
    const incoming = Array.isArray(body.files) ? body.files : []

    if (!address && !propertyUrl) {
      return NextResponse.json({ error: "A property address is required" }, { status: 400 })
    }
    if (incoming.length === 0) {
      return NextResponse.json({ error: "At least one document is required" }, { status: 400 })
    }
    if (incoming.length > INTAKE_MAX_FILES) {
      return NextResponse.json({ error: `Maximum ${INTAKE_MAX_FILES} files per upload` }, { status: 400 })
    }

    // ── Validate files server-side (size + type) ────────────────────────────
    for (const f of incoming) {
      if (!f || typeof f.name !== "string" || !f.name) {
        return NextResponse.json({ error: "Each file must have a name" }, { status: 400 })
      }
      if (typeof f.size !== "number" || f.size <= 0 || f.size > INTAKE_MAX_FILE_SIZE) {
        return NextResponse.json({ error: `"${f.name}" exceeds the 50 MB limit` }, { status: 400 })
      }
      if (!isAllowedFile(f.name, f.mimeType ?? null)) {
        return NextResponse.json({ error: `"${f.name}" is not a supported document type` }, { status: 400 })
      }
    }

    const intakeId = crypto.randomUUID()
    const admin = getAdmin()
    await ensurePendingBucket(admin)

    const dealName =
      typeof body.dealName === "string" && body.dealName.trim()
        ? body.dealName.trim()
        : address || propertyUrl || "Untitled deal"

    // ── Build per-file metadata + signed upload URLs ────────────────────────
    const usedNames = new Set<string>()
    const fileMetas: IntakeFileMeta[] = []
    const uploads: Array<{ originalName: string; storageKey: string; token: string; path: string }> = []

    for (const f of incoming) {
      let safeName = sanitizeFileName(f.name!)
      // Avoid collisions within the same intake
      if (usedNames.has(safeName)) {
        const dot = safeName.lastIndexOf(".")
        const suffix = crypto.randomUUID().slice(0, 6)
        safeName =
          dot >= 0 ? `${safeName.slice(0, dot)}_${suffix}${safeName.slice(dot)}` : `${safeName}_${suffix}`
      }
      usedNames.add(safeName)

      const storageKey = `${intakeId}/${safeName}`
      const { data: signed, error: signErr } = await admin.storage
        .from(PENDING_BUCKET)
        .createSignedUploadUrl(storageKey)

      if (signErr || !signed) {
        return NextResponse.json(
          { error: `Could not prepare upload for "${f.name}": ${signErr?.message ?? "unknown error"}` },
          { status: 500 },
        )
      }

      fileMetas.push({
        originalName: f.name!,
        safeName,
        storageKey,
        size: f.size!,
        mimeType: f.mimeType ?? null,
        requestedFileType: typeof f.requestedFileType === "string" ? f.requestedFileType : null,
      })

      uploads.push({
        originalName: f.name!,
        storageKey,
        token: signed.token,
        path: signed.path,
      })
    }

    const meta: IntakeMetadata = {
      intakeId,
      address,
      propertyUrl,
      dealName,
      files: fileMetas,
      createdAt: new Date().toISOString(),
      claimedAt: null,
      claimedDealId: null,
    }

    await writeIntakeMetadata(admin, meta)

    return NextResponse.json({
      intakeId,
      bucket: PENDING_BUCKET,
      uploads,
    })
  } catch (err) {
    console.error("[POST /api/intake/create] error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
