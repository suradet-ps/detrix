import { json } from '@sveltejs/kit';
import { building } from '$app/environment';
import { getSupabase } from '$lib/supabase/client';

export const GET = async () => {
  const start = Date.now();

  const status = building ? 'building' : 'ok';
  const response: Record<string, unknown> = {
    status,
    timestamp: new Date().toISOString()
  };

  if (!building) {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.from('portfolio_items').select('id').limit(1);
      if (error) {
        response.status = 'degraded';
        response.database = 'error';
        return json(response, { status: 503 });
      }
      response.database = 'connected';
    } catch {
      response.status = 'degraded';
      response.database = 'unreachable';
      return json(response, { status: 503 });
    }
  }

  const duration = Date.now() - start;
  response.durationMs = duration;

  return json(response, { status: 200 });
};
