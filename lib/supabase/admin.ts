import "server-only"

import { createClient as createServerClient } from "@supabase/supabase-js"

/**
 * Service-role Supabase client — bypasses ALL RLS.
 *
 * ⚠️  SERVER-ONLY. Never import this from client components.
 *
 * Use cases:
 *   - Admin portal actions (user management, cross-org queries)
 *   - Stripe webhook handlers
 *   - Background jobs / cron
 *   - Audit log writes that need to bypass INSERT checks
 *
 * Every function that uses this client MUST verify the caller is a
 * platform admin (via the regular auth client) before proceeding.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL")
  }

  return createServerClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
