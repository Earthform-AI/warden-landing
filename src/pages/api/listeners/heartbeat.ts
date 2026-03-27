import type { APIRoute } from 'astro';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

type AuthResult =
  | { kind: 'user'; userId: string; supabase: SupabaseClient }
  | { kind: 'soft'; softIdentityId: string; supabase: SupabaseClient }
  | { error: string; status: number };

async function authenticateRequest(request: Request): Promise<AuthResult> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing or invalid Authorization header', status: 401 };
  }
  const token = authHeader.slice(7);
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (!error && user) {
    return { kind: 'user', userId: user.id, supabase };
  }

  if (/^[0-9a-f]{64}$/.test(token)) {
    const { data: identity } = await supabase
      .from('soft_identities')
      .select('id')
      .eq('api_key', token)
      .maybeSingle();
    if (identity) {
      return { kind: 'soft', softIdentityId: identity.id, supabase };
    }
  }

  return { error: 'Invalid or expired token', status: 401 };
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
    const { supabase } = auth;

    const body = await request.json();
    const { listener_id, metadata } = body;

    if (!listener_id) {
      return new Response(JSON.stringify({ error: 'listener_id is required' }), {
        status: 400, headers,
      });
    }

    // Verify ownership: match by the appropriate identity column
    const ownerCol = auth.kind === 'user' ? 'user_id' : 'soft_identity_id';
    const ownerId = auth.kind === 'user' ? auth.userId : auth.softIdentityId;

    const { error } = await supabase
      .from('registered_listeners')
      .update({
        last_heartbeat: new Date().toISOString(),
        status: 'online',
        ...(metadata !== undefined ? { metadata } : {}),
      })
      .eq('id', listener_id)
      .eq(ownerCol, ownerId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });

  } catch (e) {
    console.error('Heartbeat error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
};
