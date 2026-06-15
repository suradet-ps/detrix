import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { building, version } from '$app/environment';
import { env as publicEnv } from '$env/dynamic/public';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const env = publicEnv as Record<string, string>;
  const url = env.PUBLIC_SUPABASE_URL;
  const key = env.PUBLIC_SUPABASE_ANON_KEY;

  if (!building && (!url || !key)) {
    throw new Error('Missing Supabase environment variables (PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)');
  }

  client = createClient(url ?? '', key ?? '', {
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
