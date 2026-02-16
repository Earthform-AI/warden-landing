import type { APIRoute } from 'astro';
import { supabase, type Sponsor, type Sponsorship } from '../utils/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      organization,
      tier,
      monthly_commitment,
      motivation
    } = body;

    // Validate required fields
    if (!name || !email || !tier || !monthly_commitment) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if sponsor already exists
    const { data: existing } = await supabase
      .from('sponsors')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Sponsor account already exists for this email' }),
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create new sponsor
    const { data, error } = await supabase
      .from('sponsors')
      .insert({
        name,
        email,
        organization,
        tier,
        monthly_commitment: parseFloat(monthly_commitment),
        sponsored_applicants: [],
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create sponsor account' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: 'Sponsor account created successfully',
        sponsor_id: data.id
      }),
      { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const sponsor_email = url.searchParams.get('email');
    
    if (!sponsor_email) {
      return new Response(
        JSON.stringify({ error: 'Email parameter required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { data, error } = await supabase
      .from('sponsors')
      .select(`
        *,
        sponsorships:sponsorships(
          *,
          applicant:applicants(*)
        )
      `)
      .eq('email', sponsor_email)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Sponsor not found' }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ sponsor: data }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};