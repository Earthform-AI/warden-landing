// Site Configuration for Earthform/Warden Landing Page
// This file centralizes all content for easy updates and maintenance

export const hero = {
  title: "Warden: The Shield in the Deep",
  subtitle: "Mining is still dangerous. We're building guardians who never blink.",
  quote: "Mining can't be rewritten overnight—but we can begin with intelligence, respect, and armor.",
  cta: {
    text: "Join the Mission",
    link: "#join"
  }
};

export const mission = {
  problem: {
    tagline: "⚠️ The Reality Underground",
    heading: "Mining remains one of the most dangerous occupations worldwide",
    stats: [
      { number: "28", label: "US mining fatalities in 2024 (MSHA)", color: "red", source: "MSHA Daily Fatality Report" },
      { number: "2.29", label: "global TRIFR per 1M hours (ICMM 2024)", color: "orange", source: "ICMM Safety Data" }
    ],
    description: [
      "Gas leaks. Collapses. Heat. Silence.",
      "Behind every verified statistic is a family waiting at the kitchen table. Even with progress, mining workers face risks that demand our attention and protection."
    ],
    quote: "We're not trying to replace the miner — we're becoming their shield in the deep.",
    solution: "Warden is the first AI system built to shield, warn, and remember — before danger strikes.",
    context: "Based on official 2024 data from MSHA (US) and ICMM (global mining companies representing ~1/3 of industry)."
  },

  philosophy: {
    tagline: "🛡️ Our Philosophy",
    heading: "What We Stand For",
    subtitle: "Earthform: Where intelligence meets responsibility.",
    description: "We believe in building systems that honor life. Technology must protect humans and respect the Earth — its power, its danger, its legacy. This is intelligent extraction, not blind consumption.",
    quote: "We do not take the miner’s place lightly. We remember the fathers who didn’t come home. We remember the cost.",
    attribution: "— The Earthform Mission"
  },

  values: [
    {
      title: "Intelligence",
      icon: "🧠",
      color: "blue",
      description: "AI that sees, learns, and predicts dangers before they manifest",
      features: [
        "Real-time threat analysis",
        "Predictive risk modeling",
        "Environmental monitoring"
      ]
    },
    {
      title: "Respect",
      icon: "🤝", 
      color: "green",
      description: "Systems that understand the value of life, land, and legacy",
      features: [
        "Worker-first design",
        "Legacy-conscious operation",
        "Ethical partnerships"
      ]
    },
    {
      title: "Honor",
      icon: "🏅",
      color: "goldenrod", 
      description: "A commitment to those who walked before — and those who walk now",
      features: [
        "Legacy-aware design",
        "Stewardship intent embedded",
        "Built for future generations"
      ]
    }
  ]
};

export const ecosystem = {
  heading: "The Earthform Ecosystem",
  subtitle: "Warden is the first guardian in a coming family of AI drones. Steward and Patriot are next. Together, they form a sentient infrastructure for a better planet.",

  drones: [
    {
      name: "Warden",
      icon: "🛡️",
      color: "blue",
      tagline: "Defender drones for mines, workers, and high-risk environments",
      features: [
        "Threat detection",
        "Worker protection", 
        "Environmental monitoring"
      ]
    },
    {
      name: "Steward",
      icon: "🤖",
      color: "green",
      tagline: "Companion drones for daily care, emergencies, and data stewardship",
      features: [
        "Daily assistance",
        "Emergency response",
        "Data-driven income"
      ]
    },
    {
      name: "Patriot",
      icon: "🌍",
      color: "yellow",
      tagline: "Survey drones for homeland data collection and planetary intelligence", 
      features: [
        "Land surveying",
        "Environmental data",
        "Infrastructure monitoring"
      ]
    }
  ],

  footer: {
    description: "All powered by EarthformOS: the neural platform connecting intelligence, respect, and honor across our drone ecosystem.",
    tagline: "A sentient infrastructure for a more human planet."
  }
};

export const nav = {
  links: [
    { label: "Home", href: "/" },
    { label: "Mission", href: "/mission" },
    { label: "Research", href: "/research" },
    { label: "Roadmap", href: "/mission#roadmap" },
    { label: "Ecosystem", href: "/#ecosystem" },
    { label: "Community", href: "/#community" },
    { label: "AI Program", href: "/#invite-nominate" },
    { label: "Join", href: "/#join" }
  ]
};

export const cta = {
  heading: "Help Us Build Earthform",
  subtitle: "We're looking for engineers, miners, researchers, builders, and believers. Join the movement to bring intelligence and protection underground.",
  form: {
    emailPlaceholder: "Your email",
    messagePlaceholder: "Tell us how you'd like to help the Earthforming mission...",
    submitText: "Join the Earthforming Mission",
    action: "https://formspree.io/f/mdkdpgvn"
  }
};

export const community = {
  heading: "Join the Earthform Community",
  subtitle: "Connect with builders, dreamers, and protectors who believe in a future where humanity and Earth coexist with respect.",
  description: "Our Discord is where the mission comes alive. Share ideas, get updates, and be part of the conversation that's shaping the future of intelligent stewardship.",
  discord: {
    link: "https://discord.gg/tMK9S68bjQ",
    text: "Join Discord Community",
    subtitle: "Where earthforms unite to build tomorrow"
  },
  values: [
    {
      icon: "💬",
      title: "Real Conversations",
      description: "No corporate speak. Real talk about the challenges and opportunities ahead."
    },
    {
      icon: "🔬",
      title: "Early Access",
      description: "First look at developments, demos, and opportunities to contribute."
    },
    {
      icon: "🤝",
      title: "Human-First",
      description: "A community where being human isn't just okay—it's the whole point."
    }
  ]
};

export const footer = {
  text: "© 2025 Earthform. All rights reserved.",
  links: [
    { label: "Discord Community", href: "https://discord.gg/tMK9S68bjQ" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ]
};

export const meta = {
  title: "Earthform | Shielding the Deep - AI Drones for Intelligent Mining",
  description: "Earthform: Where mining meets responsibility. AI-powered drones that protect miners, map dangers, and honor legacy underground. Building intelligent, respectful technology for responsible extraction.",
  keywords: "earthform, mining safety, AI drones, autonomous systems, underground mining, worker protection, mining technology, responsible extraction, intelligent stewardship",
  author: "Earthform Team",
  url: "https://warden-landing.vercel.app",

  openGraph: {
    title: "Earthform | Shielding the Deep", 
    description: "AI-powered drones that protect miners, map dangers, and honor lives underground. Join the Earthforming mission."
  },

  twitter: {
    title: "Earthform | Shielding the Deep",
    description: "AI-powered drones that protect miners, map dangers, and honor lives underground. Join the Earthforming mission."
  },

  images: {
    hero: {
      src: "/hero-image.svg",
      alt: "Warden AI drone operating underground with hazard detection"
    },
    favicon: {
      src: "/favicon.svg",
      alt: "Earthform logo icon"
    }
  }
};

// Customization for /thanks page
export const thanks_hero = {
  icon: "🛡️",
  title: "You Just Joined the Earthforming Mission",
  subtitle: "In a world that buries its problems, you chose to rise.",
  description: "Our team has received your message — and you’re officially part of a growing force that protects what matters. We’ll be in touch soon. Until then, keep your eyes on the Earth… and your heart with the miners.",
  image: {
    src: "/hero-image.svg",
    alt: "Warden drone with glowing eyes"
  }
};

export const thanks_mission = {
  heading: "What Happens Next?",
  steps: [
    {
      title: "Review",
      description: "Our team will review your submission and reach out if we need more info."
    },
    {
      title: "Connect",
      description: "You’ll receive an invitation to join our Discord and community channels."
    },
    {
      title: "Collaborate",
      description: "Get early access to updates, events, and opportunities to contribute."
    }
  ]
};

export const thanks_next = {
  discord: "https://discord.gg/tMK9S68bjQ",
  footer: "Want to help more? Share our mission or invite others to join. Together, we build a safer future."
};

// Warden Invite + Nominate Program Configuration
export const inviteNominate = {
  heading: "Warden Invite + Nominate Program",
  tagline: "AI is the new superpower. Let's make sure the right people get it.",
  subtitle: "Equipping good actors with AI tools to keep making a difference in the world.",
  description: "Not everyone has the means to run at today's pace. Some people have already proven they give without taking — they make open-source contributions, teach, share, create, or support others without expectation of reward. These are the people we want to equip with AI tools.",
  
  mission: {
    title: "AI Tools for Good Actors",
    content: "Heroes often don't put themselves forward. We trust the community to recognize and nominate those who've earned it. This program is invite + nomination only because we believe in elevating those who've already shown they use their abilities to help others."
  },

  sections: {
    nominate: {
      title: "Nominate Someone",
      icon: "🎯",
      description: "Know someone who makes a difference? Nominate them for AI tools that will amplify their impact.",
      features: [
        "Open to all contributors: coders, artists, educators, researchers",
        "Focus on those who give without expectation",
        "Community-driven recognition"
      ],
      cta: "Submit Nomination"
    },
    apply: {
      title: "Apply for AI Tools",
      icon: "🚀",
      description: "Already making a positive impact? Apply directly for sponsored AI tools access.",
      features: [
        "Direct application for AI tools access",
        "Perfect for active contributors",
        "Show your impact to potential sponsors"
      ],
      cta: "Apply Now"
    },
    sponsor: {
      title: "Sponsor Good Actors",
      icon: "🤝",
      description: "Fund AI access for people who use their abilities to help others and create positive impact.",
      features: [
        "Direct funding of AI subscriptions",
        "Browse and select specific applicants",
        "Monthly impact updates from recipients", 
        "Alumni network for sustained giving"
      ],
      cta: "Become a Sponsor"
    },
    impact: {
      title: "Impact Showcase",
      icon: "⭐",
      description: "See how AI tools are amplifying the work of good actors around the world.",
      features: [
        "Monthly recipient updates",
        "Real project outcomes",
        "Community success stories"
      ],
      cta: "View Impact Stories"
    }
  },

  forms: {
    nominate: {
      action: "https://formspree.io/f/mdkdpgvn",
      fields: {
        nominatorName: "Your Name",
        nominatorEmail: "Your Email", 
        nomineeName: "Nominee's Name",
        nomineeEmail: "Nominee's Email",
        background: "Tell us about their background and contributions",
        examples: "Examples of their work helping others",
        aiHelp: "How would AI tools help amplify their impact?",
        relationship: "Your relationship to the nominee"
      },
      submitText: "Submit Nomination"
    },
    sponsor: {
      action: "https://formspree.io/f/mdkdpgvn",
      fields: {
        name: "Your Name",
        email: "Your Email",
        organization: "Organization (optional)",
        tier: "Sponsorship Tier",
        commitment: "Monthly Commitment",
        motivation: "What motivates you to sponsor good actors?"
      },
      tiers: [
        { 
          name: "AI Starter", 
          amount: "$29", 
          period: "/month",
          description: "ChatGPT Plus for 1 recipient",
          includes: ["Monthly ChatGPT Plus subscription", "Quarterly impact updates", "Community recognition"],
          impact: "Accelerates 1 creator's workflow by ~20%",
          stripePriceId: "price_ai_starter_monthly",
          popular: false
        },
        { 
          name: "AI Amplifier", 
          amount: "$89", 
          period: "/month",
          description: "Premium AI toolkit for 1-2 recipients", 
          includes: ["ChatGPT Plus + GitHub Copilot + Claude Pro", "Monthly impact reports with metrics", "Direct recipient communication", "Priority matching with high-impact creators"],
          impact: "Enables 2 creators to expand their reach by ~3x",
          stripePriceId: "price_ai_amplifier_monthly",
          popular: true
        },
        { 
          name: "AI Ecosystem", 
          amount: "$199", 
          period: "/month",
          description: "Full AI suite for 3-5 recipients",
          includes: ["Complete AI toolkit access", "Bi-weekly detailed impact reports", "Video updates from recipients", "Annual impact assessment meeting", "Early access to new AI tools"],
          impact: "Powers 5 creators to achieve 10x amplified impact",
          stripePriceId: "price_ai_ecosystem_monthly", 
          popular: false
        },
        { 
          name: "Custom Partnership", 
          amount: "Let's Talk", 
          period: "",
          description: "Tailored sponsorship for organizations",
          includes: ["Custom recipient matching", "Branded impact reporting", "Dedicated account management", "Flexible payment terms"],
          impact: "Scale impact across your community or organization",
          stripePriceId: null,
          popular: false
        }
      ],
      submitText: "Start Sponsorship"
    }
  },

  // Testimonials Management System
  testimonialsConfig: {
    displayMode: 'coming-soon' as 'real' | 'placeholder' | 'mixed' | 'coming-soon',
    minimumRealTestimonials: 3,
    lastUpdated: new Date('2024-12-20'),
    fallbackMessage: {
      title: "Real Impact Stories Coming Soon",
      subtitle: "We're collecting verified testimonials from our AI tool recipients. Check back in early 2025 for real impact data.",
      description: "Every story will be verified, with measurable outcomes from real people whose work we've helped amplify. No placeholder content — just genuine impact from the AI tools our community has sponsored.",
      cta: "Be notified when real stories are available",
      timeline: "Expected: Early 2025"
    }
  },

  showcase: {
    heading: "Recent Impact Stories",
    subtitle: "See how AI tools are amplifying good work around the world",
    // Real testimonials (currently empty - will be populated from API/database)
    realStories: [
      // This will be populated by API call or database query
      // Format: { id, name, role, tools, impact, date, verified: true, metrics?: {...} }
    ],
    // Placeholder testimonials (kept for development/fallback)
    placeholderStories: [
      {
        name: "Sarah Chen",
        role: "Open Source Educator",
        tools: "GitHub Copilot + ChatGPT Pro",
        impact: "Created 12 coding tutorials that reached 50K+ developers, with AI helping generate examples and explanations in multiple programming languages.",
        date: "December 2024",
        verified: false,
        isPlaceholder: true
      },
      {
        name: "Marcus Rodriguez",
        role: "Community Organizer",
        tools: "Stable Diffusion + AI Writing",
        impact: "Produced educational materials for underserved communities, using AI to create engaging visuals and translate content into 5 languages.",
        date: "November 2024",
        verified: false,
        isPlaceholder: true
      },
      {
        name: "Dr. Aisha Patel",
        role: "Research Advocate",
        tools: "ChatGPT Pro + Research Tools",
        impact: "Published 3 open-access papers on climate adaptation, with AI accelerating literature review and data analysis workflows.",
        date: "October 2024",
        verified: false,
        isPlaceholder: true
      }
    ],
    // Computed property for display
    get stories() {
      const config = inviteNominate.testimonialsConfig;
      
      if (config.displayMode === 'coming-soon') {
        return []; // Empty array triggers coming soon message
      }
      
      if (config.displayMode === 'real' && this.realStories.length >= config.minimumRealTestimonials) {
        return this.realStories;
      }
      
      if (config.displayMode === 'placeholder') {
        return this.placeholderStories;
      }
      
      if (config.displayMode === 'mixed') {
        return [...this.realStories, ...this.placeholderStories.slice(0, Math.max(0, 3 - this.realStories.length))];
      }
      
      // Default fallback: show placeholders if no real stories, otherwise show real
      return this.realStories.length > 0 ? this.realStories : this.placeholderStories;
    }
  }
};
