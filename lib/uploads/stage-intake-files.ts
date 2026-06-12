"use client"

import { createClient } from "@/lib/supabase/client"

const PENDING_BUCKET = "pending-intakes"
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

export type StageIntakeFileInput = {
  file: File
  fileType?: string | null
}

export type StageIntakeOptions = {
  address: string
  propertyUrl?: string | null
  dealName?: string
  files: StageIntakeFileInput[]
  onProgress?: (progress: { fileName: string; phase: "uploading" | "done" }) => void
}

export type StageIntakeResult = {
  intakeId: string
}

/**
 * Stage a pre-auth deal intake from the browser:
 *   1. POST file manifest to /api/intake/create  → get signed upload URLs
 *   2. Upload each File directly to the private staging bucket
 *
 * Returns the intakeId, which the caller threads through the auth flow so the
 * deal can be claimed (created + processed) once the user is authenticated.
 */
export async function stageIntake(options: StageIntakeOptions): Promise<StageIntakeResult> {
  const { address, propertyUrl = null, dealName, files, onProgress } = options

  if (!files || files.length === 0) {
    throw new Error("At least one document is required.")
  }
  const tooLarge = files.find((f) => f.file.size > MAX_FILE_SIZE)
  if (tooLarge) {
    throw new Error(`"${tooLarge.file.name}" exceeds the 50 MB upload limit.`)
  }

  // ── 1. Create the intake + get signed upload URLs ───────────────────────
  const createRes = await fetch("/api/intake/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address,
      propertyUrl,
      dealName,
      files: files.map(({ file, fileType }) => ({
        name: file.name,
        size: file.size,
        mimeType: file.type || null,
        requestedFileType: fileType ?? null,
      })),
    }),
  })

  let createData: any
  try {
    createData = await createRes.json()
  } catch {
    throw new Error(`Unexpected server response: ${createRes.statusText}`)
  }

  if (!createRes.ok) {
    throw new Error(createData?.error || "Could not prepare your upload. Please try again.")
  }

  const { intakeId, uploads } = createData as {
    intakeId: string
    uploads: Array<{ originalName: string; storageKey: string; token: string; path: string }>
  }

  // ── 2. Upload each file to its signed URL ───────────────────────────────
  const supabase = createClient()
  const byName = new Map(uploads.map((u) => [u.originalName, u]))

  await Promise.all(
    files.map(async ({ file }) => {
      const target = byName.get(file.name)
      if (!target) {
        throw new Error(`No upload slot was returned for "${file.name}".`)
      }
      onProgress?.({ fileName: file.name, phase: "uploading" })

      const { error } = await supabase.storage
        .from(PENDING_BUCKET)
        .uploadToSignedUrl(target.storageKey, target.token, file, {
          contentType: file.type || "application/octet-stream",
        })

      if (error) {
        throw new Error(`Failed to upload "${file.name}": ${error.message}`)
      }
      onProgress?.({ fileName: file.name, phase: "done" })
    }),
  )

  return { intakeId }
}
