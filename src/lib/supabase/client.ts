import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { building, version } from '$app/environment';

let client: SupabaseClient | null = null;

function getEnv(name: string): string {
  const val = import.meta.env[name] as string | undefined;
  if (!val && !building) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return val ?? '';
}

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = getEnv('VITE_SUPABASE_URL');
  const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

  client = createClient(supabaseUrl, supabaseAnonKey, {
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
