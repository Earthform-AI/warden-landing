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
    heading: "Every 30 seconds, a miner's life hangs in the balance",
    stats: [
      { number: "15,000+", label: "mining deaths yearly", color: "red" },
      { number: "60%", label: "preventable incidents", color: "orange" }
    ],
    description: [
      "Gas leaks. Collapses. Heat. Silence.",
      "Too many fathers, mothers, sons, and daughters never come home. Behind every statistic is a family waiting at the kitchen table."
    ],
    quote: "We're not trying to replace the miner — we're becoming their shield in the deep.",
    solution: "Warden is the first AI system built to shield, warn, and remember — before danger strikes."
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
    { label: "Roadmap", href: "/mission#roadmap" },
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Community", href: "#community" },
    { label: "Join", href: "#join" }
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
