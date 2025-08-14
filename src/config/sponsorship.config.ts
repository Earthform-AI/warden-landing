// Enhanced Sponsorship System Configuration
// Implements the realistic sponsorship tiers from TESTIMONIALS_SPONSORSHIP_SPRINT.md

export interface SponsorshipTier {
  name: string;
  amount: number;
  currency: string;
  period: 'monthly' | 'yearly';
  description: string;
  includes: string[];
  stripeProductId: string;
  stripePriceId: string;
  expectedImpact: string;
  maxRecipients: number;
  popular?: boolean;
  recommended?: boolean;
}

export interface PaymentIntegrationConfig {
  stripeEnabled: boolean;
  testMode: boolean;
  publishableKey?: string;
  webhookEndpoint: string;
  successUrl: string;
  cancelUrl: string;
}

// Enhanced sponsorship tiers based on real AI tool costs and realistic impact
export const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: "AI Starter",
    amount: 29,
    currency: "USD",
    period: "monthly",
    description: "ChatGPT Plus for 1 recipient",
    includes: [
      "Monthly ChatGPT Plus subscription",
      "Quarterly impact updates",
      "Community recognition",
      "Recipient introduction email"
    ],
    stripeProductId: "prod_starter_ai",
    stripePriceId: "price_starter_monthly",
    expectedImpact: "Accelerates 1 creator's workflow by ~20%",
    maxRecipients: 1,
    popular: false
  },
  {
    name: "AI Amplifier",
    amount: 89,
    currency: "USD",
    period: "monthly",
    description: "Premium AI toolkit for 1-2 recipients",
    includes: [
      "ChatGPT Plus + GitHub Copilot + Claude Pro",
      "Monthly impact reports with metrics",
      "Direct recipient communication",
      "Priority matching with high-impact creators",
      "Video updates from recipients"
    ],
    stripeProductId: "prod_amplifier_ai",
    stripePriceId: "price_amplifier_monthly",
    expectedImpact: "Enables 2 creators to expand their reach by ~3x",
    maxRecipients: 2,
    popular: true,
    recommended: true
  },
  {
    name: "AI Ecosystem",
    amount: 199,
    currency: "USD",
    period: "monthly",
    description: "Full AI suite for 3-5 recipients",
    includes: [
      "Complete AI toolkit access",
      "Bi-weekly detailed impact reports",
      "Video updates from recipients",
      "Annual impact assessment meeting",
      "Early access to new AI tools",
      "Custom recipient matching"
    ],
    stripeProductId: "prod_ecosystem_ai",
    stripePriceId: "price_ecosystem_monthly",
    expectedImpact: "Powers 5 creators to achieve 10x amplified impact",
    maxRecipients: 5,
    popular: false
  }
];

// Configuration for payment processing integration
export const paymentConfig: PaymentIntegrationConfig = {
  stripeEnabled: false, // Will be enabled when Stripe is configured
  testMode: true,
  webhookEndpoint: '/api/stripe-webhook',
  successUrl: '/sponsor-success',
  cancelUrl: '/sponsor-dashboard'
};

// AI tools catalog with current pricing (for cost calculation)
export const aiToolsCatalog = {
  "ChatGPT Plus": { 
    cost: 20, 
    provider: "OpenAI",
    description: "Advanced ChatGPT with GPT-4 access"
  },
  "GitHub Copilot": { 
    cost: 10, 
    provider: "GitHub",
    description: "AI-powered code completion and generation"
  },
  "Claude Pro": { 
    cost: 20, 
    provider: "Anthropic",
    description: "Advanced AI assistant with large context"
  },
  "Cursor Pro": { 
    cost: 20, 
    provider: "Cursor",
    description: "AI-powered code editor"
  },
  "Perplexity Pro": { 
    cost: 20, 
    provider: "Perplexity",
    description: "AI research and search assistant"
  },
  "Midjourney": { 
    cost: 30, 
    provider: "Midjourney",
    description: "AI image generation platform"
  }
};

// Impact tracking configuration
export interface ImpactMetric {
  key: string;
  label: string;
  type: 'number' | 'percentage' | 'text' | 'currency';
  description: string;
  required: boolean;
}

export const impactMetrics: ImpactMetric[] = [
  {
    key: 'projects_completed',
    label: 'Projects Completed',
    type: 'number',
    description: 'Number of projects completed with AI assistance',
    required: true
  },
  {
    key: 'productivity_increase',
    label: 'Productivity Increase',
    type: 'percentage',
    description: 'Estimated productivity improvement',
    required: true
  },
  {
    key: 'community_reach',
    label: 'Community Reach',
    type: 'number',
    description: 'Number of people positively impacted',
    required: true
  },
  {
    key: 'time_saved_hours',
    label: 'Time Saved (Hours)',
    type: 'number',
    description: 'Hours saved per month through AI assistance',
    required: false
  },
  {
    key: 'cost_savings',
    label: 'Cost Savings',
    type: 'currency',
    description: 'Estimated cost savings from AI tools',
    required: false
  },
  {
    key: 'impact_narrative',
    label: 'Impact Story',
    type: 'text',
    description: 'Narrative description of impact achieved',
    required: true
  }
];

// Sponsor onboarding steps
export const sponsorOnboardingSteps = [
  {
    step: 1,
    title: "Choose Your Tier",
    description: "Select the sponsorship level that matches your impact goals"
  },
  {
    step: 2,
    title: "Set Up Payment",
    description: "Configure your monthly contribution with secure payment processing"
  },
  {
    step: 3,
    title: "Review Recipients",
    description: "Browse and select approved applicants to sponsor"
  },
  {
    step: 4,
    title: "Track Impact",
    description: "Receive regular updates on the impact of your sponsorship"
  }
];

// Helper functions for sponsorship calculations
export const calculateToolCostPerRecipient = (tierName: string): number => {
  const tier = sponsorshipTiers.find(t => t.name === tierName);
  return tier ? tier.amount / tier.maxRecipients : 0;
};

export const getRecommendedTools = (budget: number): string[] => {
  const tools = Object.entries(aiToolsCatalog)
    .filter(([_, tool]) => tool.cost <= budget)
    .sort(([_, a], [__, b]) => b.cost - a.cost)
    .map(([name, _]) => name);
  
  return tools;
};

export const calculateImpactProjections = (tier: SponsorshipTier) => {
  return {
    monthlyReach: tier.maxRecipients * 1000, // Estimated reach per recipient
    annualProjects: tier.maxRecipients * 12, // Estimated projects per year
    productivityMultiplier: tier.amount / 29, // Relative to starter tier
    expectedROI: `${tier.maxRecipients}x impact amplification`
  };
};