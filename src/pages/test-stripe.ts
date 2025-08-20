import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Test environment variables
  const hasStripeSecret = !!process.env.STRIPE_SECRET_KEY;
  const hasPublicPublishable = !!process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const hasLegacyPublishable = !!process.env.STRIPE_PUBLISHABLE_KEY;
  const hasStripePublishable = hasPublicPublishable || hasLegacyPublishable;
    const hasWebhookSecret = !!process.env.STRIPE_WEBHOOK_SECRET;
    
    // Test Stripe SDK import
    let stripeImportSuccess = false;
    try {
      const Stripe = (await import('stripe')).default;
      stripeImportSuccess = true;
    } catch (error) {
      console.error('Stripe import failed:', error);
    }

    return new Response(
      JSON.stringify({
        status: 'Stripe integration test',
        environment: {
          hasStripeSecret,
          hasStripePublishable,
          hasPublicPublishable,
          hasLegacyPublishable,
          hasWebhookSecret,
          stripeImportSuccess
        },
        endpoints: {
          createCheckout: '/create-sponsorship-checkout',
          stripeWebhook: '/stripe-webhook',
          manageSubscription: '/manage-subscription'
        },
        testPublishableKey: 'pk_test_51Rx5XR2clwzbiEGjZa6BAhBaUGzCbReNNbebtwPCpk8HMpb7UUaUhaxZbO2w1QYYSrqayJYD8YdgiWrShndZunZO00v1pK50BK',
        message: hasStripeSecret && hasStripePublishable
          ? 'Stripe integration ready!'
          : !hasStripeSecret
            ? 'Add STRIPE_SECRET_KEY environment variable to complete setup'
            : 'Add PUBLIC_STRIPE_PUBLISHABLE_KEY (or STRIPE_PUBLISHABLE_KEY) to expose publishable key',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Stripe integration test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};