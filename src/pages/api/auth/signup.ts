import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const body = await request.json();
    const { email, password, display_name } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400, headers,
      });
    }

    if (typeof password !== 'string' || password.length < 8) {
      return new Response(JSON.stringify({ error: 'Password must be at least 8 characters' }), {
        status: 400, headers,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Sign up via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400, headers,
      });
    }

    const userId = authData.user?.id;
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Signup succeeded but no user ID returned' }), {
        status: 500, headers,
      });
    }

    // Create earthform_users profile row
    const { error: profileError } = await supabase
      .from('earthform_users')
      .insert({
        id: userId,
        display_name: display_name || email.split('@')[0],
      });

    if (profileError) {
      console.error('Failed to create earthform_users row:', profileError);
      // Auth user was created — don't fail the whole request.
      // The profile can be created on next login.
    }

    return new Response(JSON.stringify({
      user_id: userId,
      access_token: authData.session?.access_token,
      refresh_token: authData.session?.refresh_token,
    }), { status: 201, headers });

  } catch (e) {
    console.error('Signup error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers,
    });
  }
};
