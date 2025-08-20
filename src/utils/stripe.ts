import Stripe from 'stripe';

// Validate required secret key early to fail fast in misconfigured deploys
const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  // Throwing here prevents silent fallback to hard-coded test keys
  throw new Error('[stripe] Missing STRIPE_SECRET_KEY env variable');
}

export const stripe = new Stripe(secretKey, {
  // Use a valid, pinned API version (update deliberately after reviewing changelog)
  apiVersion: '2025-07-30.basil',
});

// Publishable key: use only STRIPE_PUBLISHABLE_KEY (no PUBLIC_ variant anymore)
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '';

export const STRIPE_CONFIG = {
  publishableKey,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: 'usd',
} as const;

export function getPublishableKey() {
  if (!publishableKey) {
    console.warn('[stripe] Missing STRIPE_PUBLISHABLE_KEY (publishable)');
  }
  return publishableKey;
}

// Sponsorship tier configurations matching site.config.ts
export const SPONSORSHIP_TIERS = {
  'AI Starter': {
    amount: 2900, // $29.00 in cents
    stripePriceId: 'price_ai_starter_monthly',
    description: 'ChatGPT Plus for 1 recipient',
    features: [
      'Monthly ChatGPT Plus subscription',
      'Quarterly impact updates',
      'Community recognition'
    ],
    maxRecipients: 1
  },
  'AI Amplifier': {
    amount: 8900, // $89.00 in cents
    stripePriceId: 'price_ai_amplifier_monthly',
    description: 'Premium AI toolkit for 1-2 recipients',
    features: [
      'ChatGPT Plus + GitHub Copilot + Claude Pro',
      'Monthly impact reports with metrics',
      'Direct recipient communication',
      'Priority matching with high-impact creators'
    ],
    maxRecipients: 2
  },
  'AI Ecosystem': {
    amount: 19900, // $199.00 in cents
    stripePriceId: 'price_ai_ecosystem_monthly',
    description: 'Full AI suite for 3-5 recipients',
    features: [
      'Complete AI toolkit access',
      'Bi-weekly detailed impact reports',
      'Video updates from recipients',
      'Annual impact assessment meeting',
      'Early access to new AI tools'
    ],
    maxRecipients: 5
  }
} as const;

export type SponsorshipTier = keyof typeof SPONSORSHIP_TIERS;

// Helper function to get tier configuration
export function getTierConfig(tier: string) {
  return SPONSORSHIP_TIERS[tier as SponsorshipTier];
}

// Helper function to format amount from cents to dollars
export function formatAmount(amountInCents: number): string {
  return (amountInCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

// Helper function to validate tier
export function isValidTier(tier: string): tier is SponsorshipTier {
  return tier in SPONSORSHIP_TIERS;
}

// Create Stripe price for a tier (used for initial setup)
export async function createStripePrice(tier: SponsorshipTier) {
  const config = SPONSORSHIP_TIERS[tier];
  
  try {
    // Create product first
    const product = await stripe.products.create({
      name: `${tier} Sponsorship`,
      description: config.description,
      images: ['https://www.earthform.ai/favicon.svg'],
      metadata: {
        tier,
        maxRecipients: config.maxRecipients.toString()
      }
    });

    // Create recurring price
    const price = await stripe.prices.create({
      currency: STRIPE_CONFIG.currency,
      unit_amount: config.amount,
      recurring: {
        interval: 'month',
      },
      product: product.id,
      metadata: {
        tier,
        priceId: config.stripePriceId
      }
    });

    console.log(`Created Stripe price for ${tier}:`, price.id);
    return { product, price };
  } catch (error) {
    console.error(`Failed to create Stripe price for ${tier}:`, error);
    throw error;
  }
}

// Webhook event handlers
export const WEBHOOK_EVENTS = {
  CHECKOUT_COMPLETED: 'checkout.session.completed',
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
  PAYMENT_FAILED: 'invoice.payment_failed',
} as const;