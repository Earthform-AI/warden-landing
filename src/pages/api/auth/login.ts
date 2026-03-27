import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400, headers,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401, headers,
      });
    }

    // Fetch user profile for display_name
    const { data: profile } = await supabase
      .from('earthform_users')
      .select('display_name, strangeloop_name')
      .eq('id', data.user.id)
      .maybeSingle();

    return new Response(JSON.stringify({
      user_id: data.user.id,
      email: data.user.email,
      display_name: profile?.display_name || null,
      strangeloop_name: profile?.strangeloop_name || null,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    }), { status: 200, headers });

  } catch (e) {
    console.error('Login error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers,
    });
  }
};
