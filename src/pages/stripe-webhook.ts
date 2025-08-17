import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { supabase } from '../src/utils/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook handler failed' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id);
  
  if (session.metadata?.type === 'sponsorship') {
    // Create sponsor record in database
    const { error } = await supabase
      .from('sponsors')
      .upsert({
        name: session.metadata.sponsorName,
        email: session.metadata.sponsorEmail,
        organization: session.metadata.organization || null,
        tier: session.metadata.tier,
        monthly_commitment: session.amount_total! / 100, // Convert from cents
        motivation: session.metadata.motivation || null,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        status: 'active',
        sponsored_applicants: []
      }, {
        onConflict: 'email'
      });

    if (error) {
      console.error('Failed to create/update sponsor:', error);
    } else {
      console.log('Sponsor created/updated successfully');
    }
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id);
  
  // Update sponsor status to active
  const { error } = await supabase
    .from('sponsors')
    .update({ 
      status: 'active',
      stripe_subscription_id: subscription.id
    })
    .eq('stripe_customer_id', subscription.customer as string);

  if (error) {
    console.error('Failed to update sponsor subscription:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);
  
  const status = subscription.status === 'active' ? 'active' : 'inactive';
  
  const { error } = await supabase
    .from('sponsors')
    .update({ status })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Failed to update sponsor status:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);
  
  // Update sponsor status and mark sponsored applicants as needing new sponsors
  const { data: sponsor, error: fetchError } = await supabase
    .from('sponsors')
    .select('sponsored_applicants')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!fetchError && sponsor) {
    // Update sponsor status
    await supabase
      .from('sponsors')
      .update({ status: 'inactive' })
      .eq('stripe_subscription_id', subscription.id);

    // Update sponsored applicants to available for new sponsors
    if (sponsor.sponsored_applicants.length > 0) {
      await supabase
        .from('applicants')
        .update({ 
          application_status: 'approved',
          sponsor_id: null
        })
        .in('id', sponsor.sponsored_applicants);
      
      // Update sponsorship records to ended
      await supabase
        .from('sponsorships')
        .update({ 
          status: 'ended',
          end_date: new Date().toISOString()
        })
        .in('applicant_id', sponsor.sponsored_applicants);
    }
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded for invoice:', invoice.id);
  
  // Log successful payment
  if (invoice.subscription) {
    const { error } = await supabase
      .from('sponsor_payments')
      .insert({
        sponsor_id: (await getSponsorBySubscription(invoice.subscription as string))?.id,
        stripe_invoice_id: invoice.id,
        amount: invoice.amount_paid / 100,
        status: 'succeeded',
        payment_date: new Date(invoice.created * 1000).toISOString()
      });

    if (error) {
      console.error('Failed to log payment:', error);
    }
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed for invoice:', invoice.id);
  
  // Log failed payment and potentially notify sponsor
  if (invoice.subscription) {
    const { error } = await supabase
      .from('sponsor_payments')
      .insert({
        sponsor_id: (await getSponsorBySubscription(invoice.subscription as string))?.id,
        stripe_invoice_id: invoice.id,
        amount: invoice.amount_due / 100,
        status: 'failed',
        payment_date: new Date(invoice.created * 1000).toISOString(),
        failure_reason: invoice.last_payment_error?.message || 'Payment failed'
      });

    if (error) {
      console.error('Failed to log failed payment:', error);
    }
  }
}

async function getSponsorBySubscription(subscriptionId: string) {
  const { data, error } = await supabase
    .from('sponsors')
    .select('id')
    .eq('stripe_subscription_id', subscriptionId)
    .single();

  if (error) {
    console.error('Failed to get sponsor by subscription:', error);
    return null;
  }
  
  return data;
}