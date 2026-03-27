import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/** Extract and verify the Supabase JWT from the Authorization header. */
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

    // Upsert: if this user already has a listener with the same label + service_type,
    // update it instead of creating a duplicate.
    const { data: existing } = await supabase
      .from('registered_listeners')
      .select('id')
      .eq('user_id', user.id)
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
        user_id: user.id,
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
