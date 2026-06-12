import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

// ═══════════════════════════════════════════════════════════════════════════════
// SUPABASE BROWSER CLIENT - Singleton Pattern for Enterprise SaaS
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Why singleton? In React 18+ with strict mode and concurrent features:
// - Components may render multiple times
// - Each createBrowserClient() creates new auth listeners
// - Multiple listeners = multiple state updates = render loops
// 
// This singleton ensures ONE client instance across the entire app.
// 
// Lock Management:
// - Supabase uses Navigator LockManager to prevent concurrent token operations
// - Default timeout is 10 seconds - lock contention can cause timeout errors
// - Solution: Use single auth source (auth-provider) and singleton client
// ═══════════════════════════════════════════════════════════════════════════════

let browserClient: SupabaseClient | null = null

/**
 * Get the singleton Supabase browser client.
 * Safe to call multiple times - returns same instance.
 */
export function createClient(): SupabaseClient {
  if (browserClient) {
    return browserClient
  }

  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Persist session in localStorage
        persistSession: true,
        // Detect session from URL (for OAuth callbacks)
        detectSessionInUrl: true,
        // Flow type for PKCE
        flowType: 'pkce',
      },
    }
  )

  return browserClient
}

/**
 * Get client without creating (for checking if initialized)
 */
export function getClient(): SupabaseClient | null {
  return browserClient
}
