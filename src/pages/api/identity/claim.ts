import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'node:crypto';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * POST /api/identity/claim
 *
 * Creates a soft identity — a zero-friction API key for devices, AI processes,
 * or experiments that don't have (or don't need) a full Supabase Auth account.
 *
 * Body: { label: string, kind: 'device' | 'strangeloop' | 'experiment' }
 * Returns: { id, label, kind, api_key }
 *
 * No auth required — this is the zero-friction entry point.
 * The returned api_key can be used as a Bearer token for listener registration.
 */
export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const body = await request.json();
    const { label, kind } = body;

    if (!label || typeof label !== 'string' || label.length < 1 || label.length > 200) {
      return new Response(JSON.stringify({ error: 'label is required (1-200 characters)' }), {
        status: 400, headers,
      });
    }

    const validKinds = ['device', 'strangeloop', 'experiment'];
    if (!kind || !validKinds.includes(kind)) {
      return new Response(JSON.stringify({
        error: `kind must be one of: ${validKinds.join(', ')}`,
      }), { status: 400, headers });
    }

    // Generate 256-bit API key
    const apiKey = randomBytes(32).toString('hex');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('soft_identities')
      .insert({
        label,
        kind,
        api_key: apiKey,
      })
      .select('id, label, kind, api_key')
      .single();

    if (error) {
      console.error('Soft identity creation error:', error);
      return new Response(JSON.stringify({ error: 'Failed to create soft identity' }), {
        status: 500, headers,
      });
    }

    return new Response(JSON.stringify(data), { status: 201, headers });
  } catch (e) {
    console.error('Identity claim error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers,
    });
  }
};

/**
 * PATCH /api/identity/claim
 *
 * Adopts a soft identity into an authenticated user's account.
 * Requires: Bearer <supabase-jwt> + body { api_key: string }
 */
export const PATCH: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Authentication required for adoption' }), {
        status: 401, headers,
      });
    }
    const token = authHeader.slice(7);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
        status: 401, headers,
      });
    }

    const body = await request.json();
    const { api_key } = body;

    if (!api_key || typeof api_key !== 'string') {
      return new Response(JSON.stringify({ error: 'api_key is required' }), {
        status: 400, headers,
      });
    }

    // Find the soft identity
    const { data: identity, error: lookupError } = await supabase
      .from('soft_identities')
      .select('id, adopted_by')
      .eq('api_key', api_key)
      .maybeSingle();

    if (lookupError || !identity) {
      return new Response(JSON.stringify({ error: 'Soft identity not found' }), {
        status: 404, headers,
      });
    }

    if (identity.adopted_by) {
      return new Response(JSON.stringify({ error: 'This identity has already been adopted' }), {
        status: 409, headers,
      });
    }

    // Adopt: set adopted_by and migrate any listeners to the user
    const { error: adoptError } = await supabase
      .from('soft_identities')
      .update({
        adopted_by: user.id,
        adopted_at: new Date().toISOString(),
      })
      .eq('id', identity.id);

    if (adoptError) {
      return new Response(JSON.stringify({ error: 'Failed to adopt identity' }), {
        status: 500, headers,
      });
    }

    // Migrate any listeners owned by this soft identity to the user
    await supabase
      .from('registered_listeners')
      .update({ user_id: user.id, soft_identity_id: null })
      .eq('soft_identity_id', identity.id);

    return new Response(JSON.stringify({
      adopted: true,
      identity_id: identity.id,
      adopted_by: user.id,
    }), { status: 200, headers });
  } catch (e) {
    console.error('Identity adopt error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers,
    });
  }
};
