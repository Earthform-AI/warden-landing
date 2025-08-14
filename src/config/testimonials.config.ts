// Enhanced Testimonials Configuration System
// Implements the real testimonials strategy from TESTIMONIALS_SPONSORSHIP_SPRINT.md

export interface RealTestimonial {
  id: string;
  name: string;
  role: string;
  organization?: string;
  tools: string[];
  impact: string;
  metrics?: {
    quantifiedImpact: string;
    reachNumbers: number;
    timeframe: string;
    productivity_increase?: string;
    projects_completed?: number;
  };
  verification: {
    status: 'verified' | 'pending' | 'placeholder';
    method: 'interview' | 'documentation' | 'referral';
    verifiedBy: string;
    verifiedDate?: Date;
  };
  consent: {
    publicUse: boolean;
    contactable: boolean;
    updatesConsent: boolean;
  };
  date: Date;
  lastUpdated: Date;
  verified: boolean;
  isPlaceholder?: boolean;
}

export interface TestimonialsConfig {
  displayMode: 'real' | 'placeholder' | 'mixed' | 'coming-soon';
  minimumRealTestimonials: number;
  refreshInterval: number; // Hours between checking for new testimonials
  lastUpdated: Date;
  fallbackMessage: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    timeline: string;
  };
}

export const testimonialsConfig: TestimonialsConfig = {
  displayMode: 'coming-soon', // Will switch to 'real' when we have verified testimonials
  minimumRealTestimonials: 3,
  refreshInterval: 24,
  lastUpdated: new Date('2024-12-20'),
  fallbackMessage: {
    title: "Real Impact Stories Coming Soon",
    subtitle: "We're collecting verified testimonials from our AI tool recipients. Check back in early 2025 for real impact data.",
    description: "Every story will be verified, with measurable outcomes from real people whose work we've helped amplify. No placeholder content — just genuine impact from the AI tools our community has sponsored.",
    cta: "Be notified when real stories are available",
    timeline: "Expected: Early 2025"
  }
};

// Enhanced placeholder testimonials with realistic but clearly marked content
export const placeholderTestimonials: RealTestimonial[] = [
  {
    id: "placeholder-1",
    name: "Sarah Chen",
    role: "Open Source Educator",
    organization: "CodeForGood Initiative",
    tools: ["GitHub Copilot", "ChatGPT Pro"],
    impact: "Created 12 coding tutorials that reached 50K+ developers, with AI helping generate examples and explanations in multiple programming languages.",
    metrics: {
      quantifiedImpact: "50,000+ developers reached",
      reachNumbers: 50000,
      timeframe: "6 months",
      productivity_increase: "300%",
      projects_completed: 12
    },
    verification: {
      status: 'placeholder',
      method: 'documentation',
      verifiedBy: 'placeholder'
    },
    consent: {
      publicUse: true,
      contactable: false,
      updatesConsent: false
    },
    date: new Date('2024-12-01'),
    lastUpdated: new Date('2024-12-01'),
    verified: false,
    isPlaceholder: true
  },
  {
    id: "placeholder-2", 
    name: "Marcus Rodriguez",
    role: "Community Organizer",
    organization: "Urban Impact Network",
    tools: ["Stable Diffusion", "AI Writing Tools"],
    impact: "Produced educational materials for underserved communities, using AI to create engaging visuals and translate content into 5 languages.",
    metrics: {
      quantifiedImpact: "2,500 community members served",
      reachNumbers: 2500,
      timeframe: "4 months",
      productivity_increase: "250%",
      projects_completed: 8
    },
    verification: {
      status: 'placeholder',
      method: 'interview',
      verifiedBy: 'placeholder'
    },
    consent: {
      publicUse: true,
      contactable: false,
      updatesConsent: false
    },
    date: new Date('2024-11-15'),
    lastUpdated: new Date('2024-11-15'),
    verified: false,
    isPlaceholder: true
  },
  {
    id: "placeholder-3",
    name: "Dr. Aisha Patel", 
    role: "Research Advocate",
    organization: "Climate Action Research",
    tools: ["ChatGPT Pro", "Research AI Tools"],
    impact: "Published 3 open-access papers on climate adaptation, with AI accelerating literature review and data analysis workflows.",
    metrics: {
      quantifiedImpact: "3 peer-reviewed publications",
      reachNumbers: 15000,
      timeframe: "8 months",
      productivity_increase: "400%",
      projects_completed: 3
    },
    verification: {
      status: 'placeholder',
      method: 'documentation',
      verifiedBy: 'placeholder'
    },
    consent: {
      publicUse: true,
      contactable: false,
      updatesConsent: false
    },
    date: new Date('2024-10-10'),
    lastUpdated: new Date('2024-10-10'),
    verified: false,
    isPlaceholder: true
  }
];

// Function to get testimonials based on current configuration
export const getDisplayTestimonials = async (realTestimonials: RealTestimonial[] = []): Promise<RealTestimonial[]> => {
  const config = testimonialsConfig;
  
  if (config.displayMode === 'coming-soon') {
    return []; // Empty array triggers coming soon message
  }
  
  if (config.displayMode === 'real' && realTestimonials.length >= config.minimumRealTestimonials) {
    return realTestimonials.filter(t => t.verified && t.consent.publicUse);
  }
  
  if (config.displayMode === 'placeholder') {
    return placeholderTestimonials;
  }
  
  if (config.displayMode === 'mixed') {
    const verifiedReal = realTestimonials.filter(t => t.verified && t.consent.publicUse);
    const neededPlaceholders = Math.max(0, 3 - verifiedReal.length);
    return [...verifiedReal, ...placeholderTestimonials.slice(0, neededPlaceholders)];
  }
  
  // Default fallback: show real if we have them, otherwise placeholders
  const verifiedReal = realTestimonials.filter(t => t.verified && t.consent.publicUse);
  return verifiedReal.length > 0 ? verifiedReal : placeholderTestimonials;
};

// Administrative function to switch modes (would be called by admin interface)
export const updateTestimonialsMode = (mode: TestimonialsConfig['displayMode']) => {
  testimonialsConfig.displayMode = mode;
  testimonialsConfig.lastUpdated = new Date();
};