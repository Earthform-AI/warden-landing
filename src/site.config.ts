// Site Configuration for Earthform/Warden Landing Page
// This file centralizes all content for easy updates and maintenance

export const hero = {
  title: "Earthform Research Lab",
  subtitle: "We're building EarthformOS—an operating system for collaborative AI systems.",
  quote: "Starting with the fundamentals. Building the foundation first.",
  cta: {
    text: "Learn More",
    link: "#about"
  }
};

export const mission = {
  problem: {
    tagline: "🔬 Research Focus",
    heading: "Building the operating system for collaborative AI",
    stats: [
      { number: "Early", label: "Stage Research", color: "blue", source: "Development Phase" },
      { number: "Open", label: "Source Development", color: "green", source: "Community-Driven" }
    ],
    description: [
      "We're in the early stages of building EarthformOS.",
      "Our focus is on creating the core infrastructure and operating system that will enable collaborative AI systems to work together effectively."
    ],
    quote: "We're building the foundation first, not the final product.",
    solution: "EarthformOS is the operating system layer that will enable future AI applications.",
    context: "Currently in active research and development phase."
  },

  philosophy: {
    tagline: "🧠 Our Approach",
    heading: "Research-Driven Development",
    subtitle: "Earthform: Building the fundamentals of collaborative AI.",
    description: "We're a research lab focused on the core operating system and infrastructure needed for AI systems to collaborate effectively. We're not building end products yet—we're building the platform that will enable them.",
    quote: "Start with the foundation. Build it right. Then build on it.",
    attribution: "— The Earthform Team"
  },

  values: [
    {
      title: "Research",
      icon: "🔬",
      color: "blue",
      description: "Deep technical research on AI operating systems and infrastructure",
      features: [
        "Core OS development",
        "Collaborative AI protocols",
        "System architecture research"
      ]
    },
    {
      title: "Foundation",
      icon: "🏗️", 
      color: "green",
      description: "Building the fundamental layers before applications",
      features: [
        "OS-level primitives",
        "Infrastructure first",
        "Solid foundations"
      ]
    },
    {
      title: "Transparency",
      icon: "💡",
      color: "purple", 
      description: "Open about our stage and progress",
      features: [
        "Honest communication",
        "Clear development stage",
        "Community involvement"
      ]
    }
  ]
};

export const ecosystem = {
  heading: "EarthformOS: The Foundation",
  subtitle: "We're building the operating system first. Future applications will come later, built on a solid foundation.",

  components: [
    {
      name: "Core OS",
      icon: "🖥️",
      color: "blue",
      tagline: "The foundational operating system layer",
      features: [
        "System primitives",
        "Resource management", 
        "Process coordination"
      ]
    },
    {
      name: "Collaboration Layer",
      icon: "🔗",
      color: "green",
      tagline: "Protocols for AI systems to work together",
      features: [
        "Inter-system communication",
        "Shared state management",
        "Coordination protocols"
      ]
    },
    {
      name: "Research Platform",
      icon: "🔬",
      color: "purple",
      tagline: "Tools and infrastructure for ongoing research", 
      features: [
        "Testing frameworks",
        "Development tools",
        "Research instrumentation"
      ]
    }
  ],

  footer: {
    description: "EarthformOS is the foundation for future collaborative AI applications. We're focused on getting the fundamentals right.",
    tagline: "Building the platform that will enable tomorrow's AI systems."
  }
};

export const nav = {
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Research", href: "/research" },
    { label: "OS Components", href: "/#ecosystem" },
    { label: "Community", href: "/#community" },
    { label: "Join", href: "/#join" }
  ]
};

export const cta = {
  heading: "Join Our Research",
  subtitle: "We're looking for engineers, researchers, and collaborators interested in building the foundational OS for collaborative AI systems.",
  form: {
    emailPlaceholder: "Your email",
    messagePlaceholder: "Tell us about your background and interest in EarthformOS...",
    submitText: "Get Involved",
    action: "https://formspree.io/f/mdkdpgvn"
  }
};

export const community = {
  heading: "Join the Earthform Community",
  subtitle: "Connect with researchers, engineers, and builders working on collaborative AI infrastructure.",
  description: "Our Discord is where we discuss technical challenges, share research updates, and collaborate on building EarthformOS.",
  discord: {
    link: "https://discord.gg/tMK9S68bjQ",
    text: "Join Discord Community",
    subtitle: "Where we build the future of AI infrastructure"
  },
  values: [
    {
      icon: "💬",
      title: "Technical Discussion",
      description: "In-depth conversations about AI operating systems, architecture, and research."
    },
    {
      icon: "🔬",
      title: "Research Updates",
      description: "Stay informed about our progress and contribute to ongoing research."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Work together on the foundational infrastructure for collaborative AI."
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
  title: "Earthform Research Lab | Building EarthformOS",
  description: "Earthform is a research lab developing EarthformOS—the foundational operating system for collaborative AI systems. We're focused on building the infrastructure first.",
  keywords: "earthform, EarthformOS, AI operating system, collaborative AI, AI infrastructure, research lab, operating systems, AI systems",
  author: "Earthform Team",
  url: "https://warden-landing.vercel.app",

  openGraph: {
    title: "Earthform Research Lab | Building EarthformOS", 
    description: "Research lab developing the foundational operating system for collaborative AI systems."
  },

  twitter: {
    title: "Earthform Research Lab | Building EarthformOS",
    description: "Research lab developing the foundational operating system for collaborative AI systems."
  },

  images: {
    hero: {
      src: "/hero-image.svg",
      alt: "Earthform research lab building collaborative AI infrastructure"
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
      description: "Our team will review your submission and assess potential collaboration opportunities."
    },
    {
      title: "Connect",
      description: "If there's a fit, you'll receive an invitation to join our Discord research community."
    },
    {
      title: "Collaborate",
      description: "Get involved in EarthformOS development and research discussions."
    }
  ]
};

export const thanks_next = {
  discord: "https://discord.gg/tMK9S68bjQ",
  footer: "Interested in our research? Join our Discord to stay updated on EarthformOS development."
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
