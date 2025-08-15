import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sponsorshipTiers, calculateImpactProjections, type SponsorshipTier } from '../config/sponsorship.config';

interface EnhancedSponsorshipSelectorProps {
  onTierSelect?: (tier: SponsorshipTier) => void;
  selectedTier?: string;
  showPaymentIntegration?: boolean;
}

export const EnhancedSponsorshipSelector: React.FC<EnhancedSponsorshipSelectorProps> = ({
  onTierSelect,
  selectedTier,
  showPaymentIntegration = false
}) => {
  const [selectedTierName, setSelectedTierName] = useState<string>(selectedTier || '');
  const [paymentConfigured, setPaymentConfigured] = useState(false);

  useEffect(() => {
    // Check if payment processing is configured
    checkPaymentConfiguration();
  }, []);

  const checkPaymentConfiguration = async () => {
    try {
      const response = await fetch('/api/stripe-integration');
      if (response.ok) {
        const data = await response.json();
        setPaymentConfigured(data.payment_configured);
      }
    } catch (error) {
      console.log('Payment configuration check failed');
    }
  };

  const handleTierSelect = (tier: SponsorshipTier) => {
    setSelectedTierName(tier.name);
    if (onTierSelect) {
      onTierSelect(tier);
    }
  };

  const handleStartSponsorship = async (tier: SponsorshipTier) => {
    if (!paymentConfigured) {
      alert('Payment processing is being set up. Please check back soon or contact sponsors@earthform.ai');
      return;
    }

    // This would integrate with Stripe checkout
    console.log('Starting sponsorship for tier:', tier.name);
    
    // Placeholder for Stripe integration
    // In production, this would:
    // 1. Create Stripe checkout session
    // 2. Redirect to Stripe payment flow
    // 3. Handle success/cancellation callbacks
    
    window.open('/apply', '_blank'); // Temporary: redirect to application flow
  };

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-full text-purple-300 text-sm font-medium mb-6">
          💎 Choose Your Impact Level
        </div>
        
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
          Sponsorship Tiers
        </h2>
        
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Select the level of AI access you'd like to sponsor. Each tier provides different tools and impact tracking.
        </p>
      </div>

      {/* Tiers grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {sponsorshipTiers.map((tier, index) => {
          const impactProjections = calculateImpactProjections(tier);
          const isSelected = selectedTierName === tier.name;
          
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                tier.recommended
                  ? 'border-blue-500 bg-gradient-to-br from-blue-900/30 to-purple-900/30 shadow-blue-500/20 shadow-lg'
                  : isSelected
                  ? 'border-purple-500 bg-gradient-to-br from-purple-900/30 to-blue-900/30'
                  : 'border-gray-700 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:border-gray-600'
              }`}
              onClick={() => handleTierSelect(tier)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Recommended badge */}
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Tier header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">${tier.amount}</span>
                  <span className="text-gray-400">/{tier.period}</span>
                </div>
                <p className="text-gray-300 mt-2">{tier.description}</p>
              </div>

              {/* Features list */}
              <div className="space-y-3 mb-6">
                {tier.includes.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Impact projections */}
              <div className="bg-black/20 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">Expected Impact</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-blue-300 font-semibold">{tier.maxRecipients}</div>
                    <div className="text-gray-400">Recipients</div>
                  </div>
                  <div>
                    <div className="text-green-300 font-semibold">{impactProjections.monthlyReach}</div>
                    <div className="text-gray-400">Monthly Reach</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-purple-300 text-sm">{tier.expectedImpact}</div>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartSponsorship(tier);
                }}
                disabled={!paymentConfigured}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  tier.recommended
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                    : isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                    : paymentConfigured
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                    : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                }`}
              >
                {!paymentConfigured ? 'Setup in Progress' : `Start ${tier.name}`}
              </button>

              {/* Stripe integration status */}
              {showPaymentIntegration && (
                <div className="mt-3 text-center">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    paymentConfigured 
                      ? 'bg-green-900/30 text-green-300'
                      : 'bg-yellow-900/30 text-yellow-300'
                  }`}>
                    {paymentConfigured ? '✓ Payment Ready' : '⏳ Payment Setup'}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Additional information */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">1</div>
              <div className="text-gray-300">Choose your tier</div>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">2</div>
              <div className="text-gray-300">Set up payment</div>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">3</div>
              <div className="text-gray-300">Select recipients</div>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">4</div>
              <div className="text-gray-300">Track impact</div>
            </div>
          </div>
        </div>

        {/* Payment status notice */}
        {!paymentConfigured && (
          <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
            <p className="text-yellow-300 text-sm">
              <strong>Notice:</strong> Payment processing is being configured with Stripe. 
              You can browse tiers and recipients now, with payment activation coming soon.
            </p>
            <p className="text-yellow-300/80 text-xs mt-2">
              Questions? Email us at <a href="mailto:sponsors@earthform.ai" className="underline">sponsors@earthform.ai</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};