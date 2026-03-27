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

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const auth = await authenticateRequest(request);
    if ('error' in auth) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status, headers,
      });
    }
    const { user, supabase } = auth;

    const body = await request.json();
    const { listener_id, metadata } = body;

    if (!listener_id) {
      return new Response(JSON.stringify({ error: 'listener_id is required' }), {
        status: 400, headers,
      });
    }

    const { error } = await supabase
      .from('registered_listeners')
      .update({
        last_heartbeat: new Date().toISOString(),
        status: 'online',
        ...(metadata !== undefined ? { metadata } : {}),
      })
      .eq('id', listener_id)
      .eq('user_id', user.id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });

  } catch (e) {
    console.error('Heartbeat error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
};
