import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, type Sponsor } from '../src/utils/supabase';
import { sponsorshipTiers, paymentConfig } from '../src/config/sponsorship.config';

// Stripe Integration Scaffolding for Real Payment Processing
// Implements payment infrastructure from TESTIMONIALS_SPONSORSHIP_SPRINT.md

interface CreateSubscriptionRequest {
  sponsor_email: string;
  tier_name: string;
  payment_method_id?: string;
  customer_id?: string;
}

interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  created: number;
}

interface StripeSubscription {
  id: string;
  customer: string;
  status: string;
  current_period_end: number;
  items: {
    data: Array<{
      price: {
        id: string;
        unit_amount: number;
        currency: string;
        recurring: { interval: string };
      };
    }>;
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check if Stripe is configured
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!stripeSecretKey && req.method !== 'GET') {
    res.status(503).json({ 
      error: 'Payment processing not configured',
      message: 'Stripe integration is being set up. Please check back soon.',
      contact: 'sponsors@earthform.ai'
    });
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get subscription status and payment configuration
        const { sponsor_email } = req.query;
        
        if (!sponsor_email) {
          res.status(400).json({ error: 'sponsor_email parameter required' });
          return;
        }

        // Get sponsor data with subscription info
        const { data: sponsor, error: sponsorError } = await supabase
          .from('sponsors')
          .select('*')
          .eq('email', sponsor_email)
          .single();

        if (sponsorError && sponsorError.code !== 'PGRST116') {
          console.error('Sponsor fetch error:', sponsorError);
          res.status(500).json({ error: 'Failed to fetch sponsor data' });
          return;
        }

        res.status(200).json({
          payment_configured: !!stripeSecretKey,
          test_mode: paymentConfig.testMode,
          subscription_status: sponsor?.stripe_subscription_id ? 'active' : 'none',
          subscription_id: sponsor?.stripe_subscription_id,
          tier: sponsor?.tier,
          monthly_commitment: sponsor?.monthly_commitment
        });
        break;

      case 'POST':
        // Create new subscription
        const subscriptionRequest = req.body as CreateSubscriptionRequest;
        
        if (!subscriptionRequest.sponsor_email || !subscriptionRequest.tier_name) {
          res.status(400).json({ 
            error: 'sponsor_email and tier_name are required',
            required: ['sponsor_email', 'tier_name']
          });
          return;
        }

        // Find the requested tier
        const selectedTier = sponsorshipTiers.find(t => t.name === subscriptionRequest.tier_name);
        if (!selectedTier) {
          res.status(400).json({ 
            error: 'Invalid tier specified',
            available_tiers: sponsorshipTiers.map(t => t.name)
          });
          return;
        }

        // Create Stripe subscription (scaffolding)
        const subscriptionResult = await createStripeSubscription(subscriptionRequest, selectedTier);
        
        if (subscriptionResult.error) {
          res.status(400).json(subscriptionResult);
          return;
        }

        res.status(201).json({
          success: true,
          message: 'Subscription created successfully',
          subscription_id: subscriptionResult.subscription_id,
          customer_id: subscriptionResult.customer_id,
          status: subscriptionResult.status,
          next_steps: [
            'Subscription activated',
            'Sponsor account updated',
            'Eligible for recipient matching',
            'Will receive first impact report next month'
          ]
        });
        break;

      case 'PUT':
        // Update existing subscription  
        const { subscription_id, new_tier } = req.body;
        
        if (!subscription_id || !new_tier) {
          res.status(400).json({ error: 'subscription_id and new_tier are required' });
          return;
        }

        const updateResult = await updateStripeSubscription(subscription_id, new_tier);
        
        res.status(200).json({
          success: true,
          message: 'Subscription updated successfully',
          ...updateResult
        });
        break;

      case 'DELETE':
        // Cancel subscription
        const { subscription_id: cancelId } = req.body;
        
        if (!cancelId) {
          res.status(400).json({ error: 'subscription_id required' });
          return;
        }

        const cancelResult = await cancelStripeSubscription(cancelId);
        
        res.status(200).json({
          success: true,
          message: 'Subscription cancelled successfully',
          ...cancelResult
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error('Stripe API error:', error);
    res.status(500).json({
      error: 'Payment processing error',
      timestamp: new Date().toISOString()
    });
  }
}

// Stripe integration helper functions (scaffolding for real Stripe integration)
async function createStripeSubscription(
  request: CreateSubscriptionRequest,
  tier: any
): Promise<{ error?: string; subscription_id?: string; customer_id?: string; status?: string }> {
  
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeSecretKey) {
    // Development mode - create mock subscription
    const mockSubscriptionId = `sub_mock_${Date.now()}`;
    const mockCustomerId = `cus_mock_${Date.now()}`;
    
    // Update sponsor in database with mock subscription
    await supabase
      .from('sponsors')
      .upsert({
        email: request.sponsor_email,
        name: 'Test Sponsor', // This would come from Stripe customer data
        tier: tier.name,
        monthly_commitment: tier.amount,
        stripe_subscription_id: mockSubscriptionId,
        status: 'active'
      });

    return {
      subscription_id: mockSubscriptionId,
      customer_id: mockCustomerId,
      status: 'active'
    };
  }

  // Real Stripe integration would go here
  try {
    // This is where you would use the actual Stripe SDK:
    // const stripe = require('stripe')(stripeSecretKey);
    // 
    // const customer = await stripe.customers.create({
    //   email: request.sponsor_email
    // });
    //
    // const subscription = await stripe.subscriptions.create({
    //   customer: customer.id,
    //   items: [{ price: tier.stripePriceId }],
    //   payment_behavior: 'default_incomplete',
    //   expand: ['latest_invoice.payment_intent']
    // });

    return { 
      error: 'Stripe integration in progress',
      subscription_id: 'pending',
      status: 'incomplete'
    };
  } catch (error) {
    console.error('Stripe subscription creation error:', error);
    return { error: 'Failed to create subscription' };
  }
}

async function updateStripeSubscription(subscriptionId: string, newTier: string) {
  // Stripe subscription update logic would go here
  const tier = sponsorshipTiers.find(t => t.name === newTier);
  
  return {
    subscription_id: subscriptionId,
    new_tier: newTier,
    new_amount: tier?.amount,
    effective_date: new Date().toISOString()
  };
}

async function cancelStripeSubscription(subscriptionId: string) {
  // Stripe subscription cancellation logic would go here
  
  // Update sponsor status in database
  await supabase
    .from('sponsors')
    .update({ 
      status: 'cancelled',
      stripe_subscription_id: null
    })
    .eq('stripe_subscription_id', subscriptionId);

  return {
    subscription_id: subscriptionId,
    status: 'cancelled',
    cancelled_at: new Date().toISOString()
  };
}