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

export const GET: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const auth = await authenticateRequest(request);
    if ('error' in auth) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status, headers,
      });
    }
    const { supabase } = auth;

    const url = new URL(request.url);
    const serviceType = url.searchParams.get('service_type');

    // Only return listeners that have sent a heartbeat in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    if (auth.kind === 'user') {
      // Authenticated user: see own listeners + listeners from adopted soft identities
      let query = supabase
        .from('registered_listeners')
        .select('id, label, service_type, host, port, protocol_version, status, last_heartbeat, metadata, created_at')
        .eq('status', 'online')
        .gte('last_heartbeat', fiveMinutesAgo)
        .order('last_heartbeat', { ascending: false });

      // Include both user-owned and soft-identity-owned listeners for this user
      // For now, just show user_id-owned ones (same as before)
      query = query.eq('user_id', auth.userId);

      if (serviceType) {
        query = query.eq('service_type', serviceType);
      }

      const { data, error } = await query;
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
      }
      return new Response(JSON.stringify({ listeners: data || [] }), { status: 200, headers });
    }

    // Soft identity: discover all listeners in the same mesh
    // 1. Find this identity's mesh_code
    const { data: self } = await supabase
      .from('soft_identities')
      .select('id, mesh_code')
      .eq('id', auth.softIdentityId)
      .single();

    if (!self?.mesh_code) {
      // No mesh — only return own listeners
      let query = supabase
        .from('registered_listeners')
        .select('id, label, service_type, host, port, protocol_version, status, last_heartbeat, metadata, created_at')
        .eq('soft_identity_id', auth.softIdentityId)
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
      return new Response(JSON.stringify({ listeners: data || [], mesh_code: null }), { status: 200, headers });
    }

    // 2. Find all soft identities in the same mesh
    const { data: meshMembers } = await supabase
      .from('soft_identities')
      .select('id')
      .eq('mesh_code', self.mesh_code);

    const meshIds = (meshMembers || []).map(m => m.id);

    // 3. Find all online listeners owned by mesh members
    let query = supabase
      .from('registered_listeners')
      .select('id, label, service_type, host, port, protocol_version, status, last_heartbeat, metadata, created_at, soft_identity_id')
      .in('soft_identity_id', meshIds)
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

    // Mark which listeners are "self" vs "peer"
    const listeners = (data || []).map(l => ({
      ...l,
      is_self: l.soft_identity_id === auth.softIdentityId,
    }));

    return new Response(JSON.stringify({
      listeners,
      mesh_code: self.mesh_code,
      mesh_members: meshIds.length,
    }), { status: 200, headers });

  } catch (e) {
    console.error('List listeners error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
};
