import type { APIRoute } from 'astro';
import { supabase } from '../utils/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let email: string;
    let message: string;

    // Support both JSON and form-encoded submissions
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = body.email?.trim();
      message = body.message?.trim() || '';
    } else {
      const formData = await request.formData();
      email = (formData.get('email') as string)?.trim();
      message = (formData.get('message') as string)?.trim() || '';
    }

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        email,
        message: message || null,
        source: 'website',
      })
      .select('id')
      .single();

    if (error) {
      // Handle duplicate email gracefully — update the message instead
      if (error.code === '23505') {
        const { error: updateError } = await supabase
          .from('contact_submissions')
          .update({
            message: message || null,
            updated_at: new Date().toISOString(),
          })
          .eq('email', email);

        if (updateError) {
          console.error('Supabase update error:', updateError);
          return new Response(JSON.stringify({ error: 'Failed to update submission' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // Redirect for form submissions, JSON response for fetch
        if (!contentType.includes('application/json')) {
          return new Response(null, {
            status: 302,
            headers: { Location: '/thanks' },
          });
        }
        return new Response(JSON.stringify({ success: true, updated: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ error: 'Failed to save submission' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Redirect for form submissions, JSON response for fetch
    if (!contentType.includes('application/json')) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/thanks' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
