import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { supabase } from '../src/utils/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { action, subscriptionId, customerId } = body;

    if (!subscriptionId && !customerId) {
      return new Response(
        JSON.stringify({ error: 'Subscription ID or Customer ID required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    switch (action) {
      case 'pause':
        return await pauseSubscription(subscriptionId);
      
      case 'resume':
        return await resumeSubscription(subscriptionId);
      
      case 'cancel':
        return await cancelSubscription(subscriptionId);
      
      case 'update_payment_method':
        return await createPortalSession(customerId);
      
      case 'get_subscription':
        return await getSubscriptionDetails(subscriptionId);
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
    }

  } catch (error) {
    console.error('Subscription management error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to manage subscription',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

async function pauseSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      pause_collection: {
        behavior: 'keep_as_draft',
      },
    });

    // Update sponsor status in database
    await supabase
      .from('sponsors')
      .update({ status: 'paused' })
      .eq('stripe_subscription_id', subscriptionId);

    return new Response(
      JSON.stringify({ 
        message: 'Subscription paused successfully',
        subscription: {
          id: subscription.id,
          status: subscription.status,
          paused: subscription.pause_collection
        }
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    throw new Error(`Failed to pause subscription: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function resumeSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      pause_collection: null,
    });

    // Update sponsor status in database
    await supabase
      .from('sponsors')
      .update({ status: 'active' })
      .eq('stripe_subscription_id', subscriptionId);

    return new Response(
      JSON.stringify({ 
        message: 'Subscription resumed successfully',
        subscription: {
          id: subscription.id,
          status: subscription.status,
          paused: subscription.pause_collection
        }
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    throw new Error(`Failed to resume subscription: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update sponsor status in database
    await supabase
      .from('sponsors')
      .update({ status: 'canceling' })
      .eq('stripe_subscription_id', subscriptionId);

    return new Response(
      JSON.stringify({ 
        message: 'Subscription will be canceled at period end',
        subscription: {
          id: subscription.id,
          status: subscription.status,
          cancel_at_period_end: subscription.cancel_at_period_end,
          current_period_end: subscription.current_period_end
        }
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    throw new Error(`Failed to cancel subscription: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function createPortalSession(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'https://www.earthform.ai/sponsor-dashboard',
    });

    return new Response(
      JSON.stringify({ 
        message: 'Portal session created successfully',
        url: portalSession.url
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    throw new Error(`Failed to create portal session: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getSubscriptionDetails(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['latest_invoice', 'customer']
    });

    return new Response(
      JSON.stringify({ 
        subscription: {
          id: subscription.id,
          status: subscription.status,
          current_period_start: subscription.current_period_start,
          current_period_end: subscription.current_period_end,
          cancel_at_period_end: subscription.cancel_at_period_end,
          canceled_at: subscription.canceled_at,
          pause_collection: subscription.pause_collection,
          latest_invoice: subscription.latest_invoice,
          customer: subscription.customer
        }
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    throw new Error(`Failed to get subscription details: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}