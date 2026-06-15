import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { building, version } from '$app/environment';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  if (!building && (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY)) {
    throw new Error('Missing Supabase environment variables (PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)');
  }

  client = createClient(PUBLIC_SUPABASE_URL ?? '', PUBLIC_SUPABASE_ANON_KEY ?? '', {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'X-Client-Info': `detrix@${version}`
      }
    }
  });

  return client;
}
