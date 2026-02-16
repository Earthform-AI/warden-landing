import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      tier,
      sponsorEmail,
      sponsorName,
      organization,
      motivation,
      returnUrl
    } = body;

    // Validate required fields
    if (!tier || !sponsorEmail || !sponsorName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Define tier configurations matching site.config.ts
    const tierConfigs: Record<string, { amount: number; stripePriceId: string; description: string }> = {
      'AI Starter': {
        amount: 2900, // $29.00 in cents
        stripePriceId: 'price_ai_starter_monthly',
        description: 'ChatGPT Plus for 1 recipient'
      },
      'AI Amplifier': {
        amount: 8900, // $89.00 in cents
        stripePriceId: 'price_ai_amplifier_monthly',
        description: 'Premium AI toolkit for 1-2 recipients'
      },
      'AI Ecosystem': {
        amount: 19900, // $199.00 in cents
        stripePriceId: 'price_ai_ecosystem_monthly',
        description: 'Full AI suite for 3-5 recipients'
      }
    };

    const tierConfig = tierConfigs[tier];
    if (!tierConfig) {
      return new Response(
        JSON.stringify({ error: 'Invalid tier selected' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${tier} Sponsorship`,
              description: tierConfig.description,
              images: ['https://www.earthform.ai/favicon.svg'],
            },
            unit_amount: tierConfig.amount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      customer_email: sponsorEmail,
      metadata: {
        tier,
        sponsorEmail,
        sponsorName,
        organization: organization || '',
        motivation: motivation || '',
        type: 'sponsorship'
      },
      success_url: `${returnUrl || 'https://www.earthform.ai'}/sponsor-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl || 'https://www.earthform.ai'}/#sponsor`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      tax_id_collection: {
        enabled: true,
      }
    });

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Stripe checkout creation error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};