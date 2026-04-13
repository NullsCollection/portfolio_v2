import { createClient as createSupabaseClient } from '@supabase/supabase-js';

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

/** Anon client — safe for browser usage */
export function createClient() {
  return createSupabaseClient(
    getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  );
}

/** Service-role client — server only, never expose to client */
export function createServiceClient() {
  return createSupabaseClient(
    getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getEnv('SUPABASE_SERVICE_ROLE_KEY'),
  );
}
