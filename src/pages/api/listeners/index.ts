import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function authenticateRequest(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing or invalid Authorization header', status: 401 };
  }
  const token = authHeader.slice(7);
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return { error: 'Invalid or expired token', status: 401 };
  }
  return { user, supabase };
}

export const GET: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const auth = await authenticateRequest(request);
    if ('error' in auth) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status, headers,
      });
    }
    const { user, supabase } = auth;

    const url = new URL(request.url);
    const serviceType = url.searchParams.get('service_type');

    // Only return listeners that have sent a heartbeat in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    let query = supabase
      .from('registered_listeners')
      .select('id, label, service_type, host, port, protocol_version, status, last_heartbeat, metadata, created_at')
      .eq('user_id', user.id)
      .eq('status', 'online')
      .gte('last_heartbeat', fiveMinutesAgo)
      .order('last_heartbeat', { ascending: false });

    if (serviceType) {
      query = query.eq('service_type', serviceType);
    }

    const { data, error } = await query;

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ listeners: data || [] }), { status: 200, headers });

  } catch (e) {
    console.error('List listeners error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
};
