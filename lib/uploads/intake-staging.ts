import "server-only"

import type { SupabaseClient } from "@supabase/supabase-js"
import { createAdminClient } from "@/lib/supabase/admin"

/**
 * Pre-auth "intake" staging.
 *
 * A logged-out visitor on the marketing site can enter a property address and
 * drop documents, then click "Analyze Property". Their files are uploaded to a
 * private staging bucket BEFORE they authenticate. After sign-up/sign-in we
 * "claim" the intake: create a real deal under their new account, move the
 * files into the permanent "deal-documents" bucket, and kick off processing.
 *
 * Design note: we deliberately avoid a dedicated DB table here. The staging
 * bucket is private (service-role only) and each intake stores its metadata as
 * an `_intake.json` object alongside the uploaded files. This keeps the whole
 * feature schema-free while preserving the same privacy + TTL guarantees.
 */

export const PENDING_BUCKET = "pending-intakes"
export const INTAKE_META_FILE = "_intake.json"

// Keep these aligned with the authenticated upload pipeline.
export const INTAKE_MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB
export const INTAKE_MAX_FILES = 25
export const INTAKE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

/** Allowed document content types for staged uploads. */
const ALLOWED_MIME_PREFIXES = ["application/pdf", "application/vnd", "application/msword", "text/", "image/"]
const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "xlsx",
  "xls",
  "csv",
  "doc",
  "docx",
  "txt",
  "png",
  "jpg",
  "jpeg",
  "webp",
])

export type IntakeFileMeta = {
  /** Original file name as chosen by the user. */
  originalName: string
  /** Sanitized name used in storage. */
  safeName: string
  /** Object key within the pending bucket: `{intakeId}/{safeName}`. */
  storageKey: string
  size: number
  mimeType: string | null
  /** Document type hint, if the UI collected one. */
  requestedFileType: string | null
}

export type IntakeMetadata = {
  intakeId: string
  address: string
  /** Optional property URL (explorer mode). */
  propertyUrl: string | null
  dealName: string
  files: IntakeFileMeta[]
  createdAt: string // ISO
  /** Set once the intake is successfully claimed, to make claim idempotent. */
  claimedAt?: string | null
  claimedDealId?: string | null
}

export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 180) || "file"
}

export function isAllowedFile(originalName: string, mimeType: string | null): boolean {
  const ext = originalName.includes(".") ? originalName.split(".").pop()!.toLowerCase() : ""
  if (ext && ALLOWED_EXTENSIONS.has(ext)) return true
  if (mimeType && ALLOWED_MIME_PREFIXES.some((p) => mimeType.startsWith(p))) return true
  return false
}

/**
 * Lazily ensure the private staging bucket exists. Idempotent: a duplicate
 * "already exists" error is treated as success. Requires the service role.
 */
export async function ensurePendingBucket(admin: SupabaseClient): Promise<void> {
  const { data: existing } = await admin.storage.getBucket(PENDING_BUCKET)
  if (existing) return

  const { error } = await admin.storage.createBucket(PENDING_BUCKET, {
    public: false,
    fileSizeLimit: INTAKE_MAX_FILE_SIZE,
  })

  if (error && !/already exists/i.test(error.message)) {
    throw new Error(`Failed to create staging bucket: ${error.message}`)
  }
}

export function getAdmin(): SupabaseClient {
  return createAdminClient()
}

/** Write the intake metadata JSON object into the staging bucket. */
export async function writeIntakeMetadata(admin: SupabaseClient, meta: IntakeMetadata): Promise<void> {
  const body = new Blob([JSON.stringify(meta, null, 2)], { type: "application/json" })
  const { error } = await admin.storage
    .from(PENDING_BUCKET)
    .upload(`${meta.intakeId}/${INTAKE_META_FILE}`, body, {
      contentType: "application/json",
      upsert: true,
    })

  if (error) {
    throw new Error(`Failed to write intake metadata: ${error.message}`)
  }
}

/** Read + parse an intake's metadata JSON. Returns null if missing/invalid. */
export async function readIntakeMetadata(
  admin: SupabaseClient,
  intakeId: string,
): Promise<IntakeMetadata | null> {
  const { data, error } = await admin.storage.from(PENDING_BUCKET).download(`${intakeId}/${INTAKE_META_FILE}`)

  if (error || !data) return null

  try {
    const text = await data.text()
    const parsed = JSON.parse(text) as IntakeMetadata
    if (!parsed || parsed.intakeId !== intakeId || !Array.isArray(parsed.files)) return null
    return parsed
  } catch {
    return null
  }
}

/** Permanently delete an intake (all staged files + metadata). */
export async function deleteIntake(admin: SupabaseClient, intakeId: string): Promise<void> {
  const { data: list } = await admin.storage.from(PENDING_BUCKET).list(intakeId)
  const keys = (list ?? []).map((entry) => `${intakeId}/${entry.name}`)
  if (keys.length > 0) {
    await admin.storage.from(PENDING_BUCKET).remove(keys)
  }
}

/**
 * Purge intakes older than INTAKE_TTL_MS. Returns the number of intakes removed.
 * Intended to be called from a scheduled cron. Best-effort and idempotent.
 */
export async function purgeExpiredIntakes(admin: SupabaseClient): Promise<{ removed: number; scanned: number }> {
  // Top-level entries in the bucket are the per-intake "folders".
  const { data: folders, error } = await admin.storage.from(PENDING_BUCKET).list("", {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  })

  if (error || !folders) {
    return { removed: 0, scanned: 0 }
  }

  const now = Date.now()
  let removed = 0
  let scanned = 0

  for (const folder of folders) {
    // Folders have no `id`; skip stray top-level files.
    if (!folder.name || folder.id) continue
    scanned += 1

    const meta = await readIntakeMetadata(admin, folder.name)

    // If metadata is missing/unparseable, fall back to deleting clearly-stale dirs.
    const createdAt = meta?.createdAt ? Date.parse(meta.createdAt) : NaN
    const isExpired = Number.isFinite(createdAt) ? now - createdAt > INTAKE_TTL_MS : true

    if (isExpired) {
      await deleteIntake(admin, folder.name)
      removed += 1
    }
  }

  return { removed, scanned }
}
