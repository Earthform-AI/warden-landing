import type { APIRoute } from 'astro';
import { supabase } from '../src/utils/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      sponsor_email,
      applicant_id,
      ai_tools_provided,
      monthly_amount
    } = body;

    // Validate required fields
    if (!sponsor_email || !applicant_id || !ai_tools_provided?.length || !monthly_amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get sponsor ID from email
    const { data: sponsor, error: sponsorError } = await supabase
      .from('sponsors')
      .select('id, monthly_commitment, sponsored_applicants')
      .eq('email', sponsor_email)
      .single();

    if (sponsorError || !sponsor) {
      return new Response(
        JSON.stringify({ error: 'Sponsor not found' }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if applicant exists and is available
    const { data: applicant, error: applicantError } = await supabase
      .from('applicants')
      .select('id, application_status')
      .eq('id', applicant_id)
      .single();

    if (applicantError || !applicant) {
      return new Response(
        JSON.stringify({ error: 'Applicant not found' }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (applicant.application_status !== 'approved') {
      return new Response(
        JSON.stringify({ error: 'Applicant is not approved for sponsorship' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check sponsor's remaining budget
    const currentCommitments = sponsor.sponsored_applicants.length * monthly_amount;
    if (currentCommitments + monthly_amount > sponsor.monthly_commitment) {
      return new Response(
        JSON.stringify({ error: 'Sponsorship would exceed monthly commitment' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create sponsorship
    const { data: sponsorship, error: sponsorshipError } = await supabase
      .from('sponsorships')
      .insert({
        sponsor_id: sponsor.id,
        applicant_id,
        ai_tools_provided,
        monthly_amount: parseFloat(monthly_amount),
        status: 'active',
        start_date: new Date().toISOString()
      })
      .select()
      .single();

    if (sponsorshipError) {
      console.error('Sponsorship creation error:', sponsorshipError);
      return new Response(
        JSON.stringify({ error: 'Failed to create sponsorship' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Update applicant status
    await supabase
      .from('applicants')
      .update({ 
        application_status: 'sponsored',
        sponsor_id: sponsor.id
      })
      .eq('id', applicant_id);

    // Update sponsor's sponsored_applicants list
    const updatedApplicants = [...sponsor.sponsored_applicants, applicant_id];
    await supabase
      .from('sponsors')
      .update({ sponsored_applicants: updatedApplicants })
      .eq('id', sponsor.id);

    return new Response(
      JSON.stringify({ 
        message: 'Sponsorship created successfully',
        sponsorship_id: sponsorship.id
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
    const sponsor_email = url.searchParams.get('sponsor_email');
    
    if (!sponsor_email) {
      return new Response(
        JSON.stringify({ error: 'sponsor_email parameter required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get sponsor's active sponsorships with applicant details
    const { data, error } = await supabase
      .from('sponsorships')
      .select(`
        *,
        applicant:applicants(*),
        sponsor:sponsors(*)
      `)
      .eq('sponsor.email', sponsor_email)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch sponsorships' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ sponsorships: data }),
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