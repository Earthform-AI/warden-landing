# 🔑 Environment Variables Setup for Stripe Integration

This document outlines the required environment variables for the Stripe integration in the Warden Landing sponsorship system.

## Required Environment Variables

### Stripe Configuration

Add these environment variables to your deployment (Vercel, .env file, etc.):

```env
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_51Rx5XR2clwzbiEGjZa6BAhBaUGzCbReNNbebtwPCpk8HMpb7UUaUhaxZbO2w1QYYSrqayJYD8YdgiWrShndZunZO00v1pK50BK_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_51Rx5XR2clwzbiEGjZa6BAhBaUGzCbReNNbebtwPCpk8HMpb7UUaUhaxZbO2w1QYYSrqayJYD8YdgiWrShndZunZO00v1pK50BK
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Public Environment Variables (accessible in frontend)
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Rx5XR2clwzbiEGjZa6BAhBaUGzCbReNNbebtwPCpk8HMpb7UUaUhaxZbO2w1QYYSrqayJYD8YdgiWrShndZunZO00v1pK50BK
```

## Where to Place Your Secret Key

**Important:** The provided test publishable key is already configured. You need to provide the **secret key** that corresponds to this publishable key.

### For Local Development

1. Create a `.env` file in the root directory of your project:
   ```bash
   # /home/runner/work/warden-landing/warden-landing/.env
   STRIPE_SECRET_KEY=sk_test_51Rx5XR2clwzbiEGjZa6BAhBaUGzCbReNNbebtwPCpk8HMpb7UUaUhaxZbO2w1QYYSrqayJYD8YdgiWrShndZunZO00v1pK50BK_YOUR_SECRET_KEY_HERE
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
   ```

2. Make sure `.env` is listed in your `.gitignore` file (it should be by default)

### For Vercel Deployment

1. Go to your Vercel dashboard
2. Select your project: `warden-landing`
3. Go to **Settings** → **Environment Variables**
4. Add each variable with the corresponding value:
   - `STRIPE_SECRET_KEY`: Your secret key starting with `sk_test_` or `sk_live_`
   - `STRIPE_WEBHOOK_SECRET`: Your webhook secret starting with `whsec_`
   - `PUBLIC_STRIPE_PUBLISHABLE_KEY`: `pk_test_51Rx5XR2clwzbiEGjZa6BAhBaUGzCbReNNbebtwPCpk8HMpb7UUaUhaxZbO2w1QYYSrqayJYD8YdgiWrShndZunZO00v1pK50BK`

### For Other Platforms

For other deployment platforms (Netlify, Railway, etc.), add the environment variables through their respective interfaces using the same variable names.

## Setting Up Stripe Webhooks

1. **Create Webhook Endpoint in Stripe Dashboard:**
   - Go to: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - Endpoint URL: `https://your-domain.com/api/stripe-webhook`
   - Select events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

2. **Get Webhook Secret:**
   - After creating the webhook, click on it
   - In the "Signing secret" section, click "Reveal"
   - Copy the secret starting with `whsec_`
   - Add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

## Testing Your Integration

### 1. Test API Endpoints

Test the Stripe checkout creation:
```bash
curl -X POST https://your-domain.com/api/create-sponsorship-checkout \
  -H "Content-Type: application/json" \
  -d '{
    "tier": "AI Starter",
    "sponsorEmail": "test@example.com",
    "sponsorName": "Test Sponsor",
    "returnUrl": "https://your-domain.com"
  }'
```

### 2. Test Stripe Integration

1. Go to your landing page: `https://your-domain.com`
2. Navigate to the sponsorship section
3. Fill out the form and select a tier
4. Click "Start Sponsorship with Stripe"
5. You should be redirected to Stripe Checkout

### 3. Test Webhooks

Use Stripe's webhook testing tools or the Stripe CLI:
```bash
stripe listen --forward-to localhost:4321/api/stripe-webhook
```

## Test Cards

Use these test card numbers for testing:

- **Successful payment**: `4242424242424242`
- **Payment requires authentication**: `4000002500003155`
- **Payment is declined**: `4000000000000002`

Expiry: Any future date  
CVC: Any 3-digit number  
ZIP: Any 5-digit number

## Security Notes

1. **Never commit secret keys to version control**
2. **Use test keys for development and staging**
3. **Rotate keys regularly in production**
4. **Monitor webhook events for security**
5. **Validate webhook signatures in production**

## Production Checklist

Before going live:

- [ ] Replace all test keys with live keys
- [ ] Update webhook endpoints to production URLs
- [ ] Test live payment flows
- [ ] Set up monitoring and alerting
- [ ] Configure billing portal settings in Stripe
- [ ] Review and test tax settings
- [ ] Set up automatic invoice collection
- [ ] Configure subscription lifecycle emails

## Support

For issues with Stripe integration:
- Check the browser console for JavaScript errors
- Check server logs for API errors
- Verify environment variables are set correctly
- Test with Stripe's test cards
- Use Stripe's webhook testing tools

Contact: sponsors@earthform.ai