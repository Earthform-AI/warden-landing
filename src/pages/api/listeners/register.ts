import type { APIRoute } from 'astro';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

type AuthResult =
  | { kind: 'user'; userId: string; supabase: SupabaseClient }
  | { kind: 'soft'; softIdentityId: string; supabase: SupabaseClient }
  | { error: string; status: number };

/**
 * Authenticate via Supabase JWT or soft-identity API key.
 * Tries JWT first; if that fails, checks if the token is a soft identity api_key.
 */
async function authenticateRequest(request: Request): Promise<AuthResult> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing or invalid Authorization header', status: 401 };
  }
  const token = authHeader.slice(7);
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Try Supabase JWT first
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (!error && user) {
    return { kind: 'user', userId: user.id, supabase };
  }

  // Fall back to soft identity API key (64-char hex)
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
    const { label, service_type, host, port, protocol_version, metadata } = body;

    if (!label || !service_type || !host || !port) {
      return new Response(JSON.stringify({ error: 'label, service_type, host, and port are required' }), {
        status: 400, headers,
      });
    }

    const validTypes = ['beacon-sensor', 'kernel', 'bridge-endpoint'];
    if (!validTypes.includes(service_type)) {
      return new Response(JSON.stringify({ error: `service_type must be one of: ${validTypes.join(', ')}` }), {
        status: 400, headers,
      });
    }

    const portNum = Number(port);
    if (!Number.isInteger(portNum) || portNum < 1 || portNum > 65535) {
      return new Response(JSON.stringify({ error: 'port must be an integer between 1 and 65535' }), {
        status: 400, headers,
      });
    }

    // Build identity columns based on auth kind
    const identityCols: Record<string, string | null> =
      auth.kind === 'user'
        ? { user_id: auth.userId, soft_identity_id: null }
        : { user_id: null, soft_identity_id: auth.softIdentityId };

    // Determine the owner column + value for upsert matching
    const ownerCol = auth.kind === 'user' ? 'user_id' : 'soft_identity_id';
    const ownerId = auth.kind === 'user' ? auth.userId : auth.softIdentityId;

    // Upsert: if this identity already has a listener with the same label + service_type,
    // update it instead of creating a duplicate.
    const { data: existing } = await supabase
      .from('registered_listeners')
      .select('id')
      .eq(ownerCol, ownerId)
      .eq('label', label)
      .eq('service_type', service_type)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('registered_listeners')
        .update({
          host,
          port: portNum,
          protocol_version: protocol_version || 'beacon-sensor/0.1',
          status: 'online',
          last_heartbeat: new Date().toISOString(),
          metadata: metadata || {},
        })
        .eq('id', existing.id)
        .select('id')
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
      }
      return new Response(JSON.stringify({ listener_id: data.id, updated: true }), { status: 200, headers });
    }

    const { data, error } = await supabase
      .from('registered_listeners')
      .insert({
        ...identityCols,
        label,
        service_type,
        host,
        port: portNum,
        protocol_version: protocol_version || 'beacon-sensor/0.1',
        status: 'online',
        metadata: metadata || {},
      })
      .select('id')
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ listener_id: data.id }), { status: 201, headers });

  } catch (e) {
    console.error('Register listener error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
};
