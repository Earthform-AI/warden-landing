// Site Configuration for Earthform/Warden Landing Page
// This file centralizes all content for easy updates and maintenance

export const hero = {
  title: "Earthform Research Lab",
  subtitle: "Developing EarthformOS—a universal architecture for AI systems built on breakthrough research in parsing, identity-based programming, and adaptive protocols.",
  quote: "From universal parsers to distributed intelligence. Building the foundation for tomorrow's AI.",
  cta: {
    text: "Learn More",
    link: "#about"
  }
};

export const mission = {
  problem: {
    tagline: "🔬 Research Focus",
    heading: "Universal architecture for adaptive AI systems",
    stats: [
      { number: "Early", label: "Stage Research", color: "blue", source: "Development Phase" },
      { number: "Open", label: "Source Development", color: "green", source: "Community-Driven" }
    ],
    description: [
      "We're researching universal architectures that achieve quality results across many contexts.",
      "Our work spans universal parsing, identity-based programming, protein solver integration, and error-tolerant networking with DNA-like packet structures."
    ],
    quote: "Building architectures that work everywhere—from desktop to distributed systems.",
    solution: "EarthformOS embodies our most promising architecture designs with intent-based solvers at the core.",
    context: "Currently in active research and development phase."
  },

  philosophy: {
    tagline: "🧠 Our Approach",
    heading: "Research-Driven Development",
    subtitle: "Earthform: Universal architectures through rigorous research.",
    description: "Our research explores universal parsing, NLP integration with protein solvers, and identity-based programming. We're building architectures that accommodate diverse hardware—from desktop equipment to distributed systems—unified by error-tolerant protocols and intent-based solvers.",
    quote: "Quality results across many contexts. That's the measure of universal architecture.",
    attribution: "— The Earthform Team"
  },

  values: [
    {
      title: "Universal Parsing",
      icon: "🔍",
      color: "blue",
      description: "Research into universal parsers that bridge language and computation",
      features: [
        "NLP language integration",
        "Protein solver synthesis",
        "Cross-context parsing"
      ]
    },
    {
      title: "Identity-Based Programming",
      icon: "🧬", 
      color: "green",
      description: "Novel programming concepts built on identity and intent",
      features: [
        "Intent-based solvers",
        "Identity primitives",
        "Adaptive architectures"
      ]
    },
    {
      title: "Error-Tolerant Networks",
      icon: "🌐",
      color: "purple", 
      description: "DNA-like packet structures for resilient communication",
      features: [
        "Biological-inspired protocols",
        "Self-healing networks",
        "Distributed resilience"
      ]
    }
  ]
};

export const ecosystem = {
  heading: "EarthformOS: Universal Architecture",
  subtitle: "A unified architecture that works across contexts—desktop equipment, distributed systems, and beyond.",

  components: [
    {
      name: "Universal Parser",
      icon: "🔍",
      color: "blue",
      tagline: "NLP language integrated with protein solver concepts",
      features: [
        "Cross-domain parsing",
        "Language-computation bridge", 
        "Adaptive interpretation"
      ]
    },
    {
      name: "Intent-Based Solver",
      icon: "🧠",
      color: "green",
      tagline: "Identity-based programming with intent at the core",
      features: [
        "Identity primitives",
        "Intent resolution",
        "Context-aware execution"
      ]
    },
    {
      name: "DNA-Like Protocol",
      icon: "🧬",
      color: "purple",
      tagline: "Error-tolerant network protocol inspired by biological systems", 
      features: [
        "Self-healing packets",
        "Resilient transmission",
        "Adaptive routing"
      ]
    }
  ],

  footer: {
    description: "EarthformOS synthesizes our research into a universal architecture. From parsing to protocols, built for quality results across many contexts.",
    tagline: "One architecture. Many applications. Endless possibilities."
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
  subtitle: "We're looking for researchers, engineers, and collaborators interested in universal architectures, novel parsing methods, and adaptive AI systems.",
  form: {
    emailPlaceholder: "Your email",
    messagePlaceholder: "Tell us about your background and interest in our research areas...",
    submitText: "Get Involved",
    action: "https://formspree.io/f/mdkdpgvn"
  }
};

export const community = {
  heading: "Join the Earthform Community",
  subtitle: "Connect with researchers exploring universal architectures, identity-based programming, and adaptive AI systems.",
  description: "Our Discord is where we discuss breakthrough research, share findings, and collaborate on pushing the boundaries of what's possible with universal AI architectures.",
  discord: {
    link: "https://discord.gg/tMK9S68bjQ",
    text: "Join Discord Community",
    subtitle: "Where researchers build universal AI systems"
  },
  values: [
    {
      icon: "🔬",
      title: "Research Discussion",
      description: "Deep dives into parsing, protein solvers, identity-based programming, and network protocols."
    },
    {
      icon: "📚",
      title: "Research Updates",
      description: "First access to findings, papers, and breakthroughs in universal architecture research."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Work together on advancing the state of the art in adaptive AI systems."
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
  title: "Earthform Research Lab | Universal AI Architecture",
  description: "Earthform is a research lab developing EarthformOS—a universal architecture for AI systems. Exploring universal parsing, identity-based programming, protein solver integration, and DNA-like protocols.",
  keywords: "earthform, EarthformOS, universal parser, AI architecture, identity-based programming, protein solver, adaptive systems, error-tolerant protocols, research lab",
  author: "Earthform Team",
  url: "https://warden-landing.vercel.app",

  openGraph: {
    title: "Earthform Research Lab | Universal AI Architecture", 
    description: "Research lab developing universal architectures for adaptive AI systems through breakthrough parsing, programming, and protocol research."
  },

  twitter: {
    title: "Earthform Research Lab | Universal AI Architecture",
    description: "Research lab developing universal architectures for adaptive AI systems through breakthrough parsing, programming, and protocol research."
  },

  images: {
    hero: {
      src: "/hero-image.svg",
      alt: "Earthform research lab universal AI architecture"
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
