import React, { useState } from 'react';
import { loadStripe, type Stripe as StripeJs } from '@stripe/stripe-js';

// Lazy-initialize Stripe via server-provided publishable key (no PUBLIC_* env exposure)
let stripePromise: Promise<StripeJs | null> | null = null;
let cachedKey: string | null = null;

async function getStripeClient(): Promise<StripeJs | null> {
  if (stripePromise) {
    return stripePromise;
  }
  try {
    const res = await fetch('/stripe-publishable-key');
    if (!res.ok) {
      throw new Error('Failed to retrieve Stripe key');
    }
    const { publishableKey } = await res.json();
    if (!publishableKey) {
      throw new Error('Stripe publishable key missing (server)');
    }
    cachedKey = publishableKey;
    stripePromise = loadStripe(publishableKey);
    return stripePromise;
  } catch (e) {
    console.error('[StripeCheckout] Unable to init Stripe:', e);
    return null;
  }
}

interface SponsorshipTier {
  name: string;
  amount: string;
  period: string;
  description: string;
  includes: string[];
  impact: string;
  stripePriceId: string;
  popular: boolean;
}

interface StripeCheckoutProps {
  tiers: SponsorshipTier[];
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
  tiers, 
  onSuccess,
  onError 
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('AI Amplifier');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    motivation: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!selectedTier) {
      newErrors.tier = 'Please select a sponsorship tier';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
  const stripe = await getStripeClient();
      if (!stripe) {
        throw new Error('Stripe failed to load (missing publishable key).');
      }

      // Create checkout session
  const response = await fetch('/create-sponsorship-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier: selectedTier,
          sponsorEmail: formData.email,
          sponsorName: formData.name,
          organization: formData.organization,
          motivation: formData.motivation,
          returnUrl: window.location.origin
        }),
      });

  const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Detect potential mode mismatch before redirect
      const sessionId: string | undefined = data.sessionId;
      if (!sessionId) {
        throw new Error('Missing sessionId from server response.');
      }

  const rawPublishableKey = cachedKey;
  const keyPrefix = rawPublishableKey?.startsWith('pk_live_') ? 'live' : rawPublishableKey?.startsWith('pk_test_') ? 'test' : 'unknown';
      const sessionPrefix = sessionId.startsWith('cs_live_') ? 'live' : sessionId.startsWith('cs_test_') ? 'test' : 'unknown';
      if (keyPrefix !== 'unknown' && sessionPrefix !== 'unknown' && keyPrefix !== sessionPrefix) {
        throw new Error(`Stripe mode mismatch: session is '${sessionPrefix}' but publishable key is '${keyPrefix}'. Ensure both keys are from the same (test/live) mode.`);
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message || 'Failed to redirect to checkout');
      }

      onSuccess?.(data);

    } catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
  setErrors(prev => ({ ...prev, submit: errorMessage }));
  onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const selectedTierData = tiers.find(tier => tier.name === selectedTier);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tier Selection */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Sponsorship Tier</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedTier === tier.name
                  ? 'border-green-400 bg-green-400/10 scale-105'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              } ${tier.popular ? 'ring-2 ring-blue-400' : ''}`}
              onClick={() => setSelectedTier(tier.name)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                <div className="text-3xl font-bold text-green-400">
                  {tier.amount}
                  <span className="text-lg text-gray-400">{tier.period}</span>
                </div>
                <p className="text-gray-300 text-sm mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-2 mb-4">
                {tier.includes.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-300">
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="text-xs text-blue-400 bg-blue-900/30 p-3 rounded-lg">
                <strong>Impact:</strong> {tier.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsor Information Form */}
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Sponsor Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-green-400 focus:ring-green-400'
              }`}
              placeholder="Your full name"
              required
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-green-400 focus:ring-green-400'
              }`}
              placeholder="your@email.com"
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
            Organization (Optional)
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-green-400 focus:ring-green-400 transition-colors"
            placeholder="Your company or organization"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="motivation" className="block text-sm font-medium text-gray-300 mb-2">
            What motivates you to sponsor good actors? (Optional)
          </label>
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-green-400 focus:ring-green-400 transition-colors resize-none"
            placeholder="Tell us why you want to support creators with AI tools..."
          />
        </div>

        {/* Selected Tier Summary */}
        {selectedTierData && (
          <div className="mt-8 p-6 bg-green-900/20 border border-green-400/30 rounded-xl">
            <h4 className="text-lg font-bold text-green-400 mb-2">Selected: {selectedTierData.name}</h4>
            <p className="text-gray-300 text-sm mb-2">{selectedTierData.description}</p>
            <p className="text-white font-semibold">
              Monthly commitment: {selectedTierData.amount}{selectedTierData.period}
            </p>
          </div>
        )}

        {errors.submit && (
          <div className="mt-6 p-4 bg-red-900/25 border border-red-400/40 rounded-xl text-left space-y-2">
            <p className="text-red-400 text-sm font-medium">{errors.submit}</p>
            {/* Mode mismatch guidance */}
            {errors.submit.includes('mode mismatch') && (
              <ul className="text-xs text-red-300 list-disc ml-4 space-y-1">
                <li>Use matching key pairs: pk_test_* with sk_test_* OR pk_live_* with sk_live_*.</li>
                <li>Ensure STRIPE_PUBLISHABLE_KEY & STRIPE_SECRET_KEY share the same mode.</li>
                <li>Redeploy after updating environment variables.</li>
              </ul>
            )}
            {errors.submit.includes('publishable key missing') && (
              <p className="text-xs text-red-300">Add STRIPE_PUBLISHABLE_KEY to environment & redeploy.</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              loading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-black hover:scale-105 hover:shadow-lg hover:shadow-green-500/25'
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Setting up your sponsorship...
              </span>
            ) : (
              'Start Sponsorship with Stripe'
            )}
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            Secure payment processing by Stripe • Cancel anytime
          </p>
        </div>
      </form>
    </div>
  );
};