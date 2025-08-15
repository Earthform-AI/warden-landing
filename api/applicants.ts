import type { APIRoute } from 'astro';
import { supabase, type Applicant } from '../src/utils/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      background, 
      contributions, 
      ai_tools_needed,
      github_url,
      portfolio_url,
      linkedin_url
    } = body;

    // Validate required fields
    if (!name || !email || !background || !contributions || !ai_tools_needed?.length) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if applicant already exists
    const { data: existing } = await supabase
      .from('applicants')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Application already exists for this email' }),
        { 
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create new applicant
    const { data, error } = await supabase
      .from('applicants')
      .insert({
        name,
        email,
        profile: {
          background,
          contributions,
          github_url,
          portfolio_url,
          linkedin_url
        },
        ai_tools_needed,
        application_status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create application' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: 'Application submitted successfully',
        applicant_id: data.id
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
    const status = url.searchParams.get('status') || 'pending';
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    const { data, error } = await supabase
      .from('applicants')
      .select('*')
      .eq('application_status', status)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch applicants' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ applicants: data }),
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