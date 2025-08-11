// Example configurations based on the SPRINT.md updated messaging suggestions
// This file shows how easy it is to update the site content

// ===== HERO SECTION VARIATIONS =====

// Current configuration (from site.config.ts):
export const heroOriginal = {
  title: "Warden: The Shield in the Deep",
  subtitle: "Mining is still dangerous. We're building guardians who never blink.",
  quote: "Mining can't be rewritten overnight—but we can begin with intelligence, empathy, and armor.",
  cta: {
    text: "Join the Mission",
    link: "#join"
  }
};

// Alternative version from SPRINT suggestions:
export const heroAlternative = {
  title: "Warden: The Shield in the Deep",
  subtitle: "Protecting those who still dare to dig. A new era of mining has begun.",
  quote: "Mining can't be rewritten overnight—but we can begin with intelligence, empathy, and armor.",
  cta: {
    text: "Join the Mission",
    link: "#join"
  }
};

// ===== MISSION SECTION VARIATIONS =====

// Updated messaging option from SPRINT:
export const missionAlternative = {
  problem: {
    tagline: "⚠️ The Reality Underground",
    heading: "What if we could mine without loss?",
    stats: [
      { number: "15,000+", label: "mining deaths yearly", color: "red" },
      { number: "60%", label: "preventable incidents", color: "orange" }
    ],
    description: [
      "We believe no one should die just to earn a living.",
      "Earthform is building AI-powered drones that understand danger, protect lives, and keep the earth intact."
    ],
    quote: "We respect the minerals — and the people — who make modern life possible.",
    solution: "Warden is creating a future where mining and human dignity coexist."
  },
  
  philosophy: {
    tagline: "🌱 Our Philosophy", 
    heading: "What We Stand For",
    subtitle: "Earthform: Where mining meets healing.",
    description: "We respect the minerals — and the people — who make modern life possible. This is intelligent stewardship that honors both human lives and the earth beneath our feet.",
    quote: "The earth remembers every scar we make. Let's make sure it also remembers how we chose to heal.",
    attribution: "— The Earthform Mission"
  },

  values: [
    {
      title: "Intelligence",
      icon: "🧠",
      color: "blue",
      description: "AI-powered drones that understand danger, protect lives, and keep the earth intact",
      features: [
        "Real-time threat analysis",
        "Predictive risk modeling", 
        "Environmental monitoring"
      ]
    },
    {
      title: "Empathy",
      icon: "💚",
      color: "green", 
      description: "Technology that works alongside humans, not replacing them",
      features: [
        "Worker-first design",
        "Family-conscious safety",
        "Community partnership"
      ]
    },
    {
      title: "Healing", 
      icon: "🌱",
      color: "yellow",
      description: "Mining that gives back more than it takes from the earth",
      features: [
        "Minimal impact extraction",
        "Environmental restoration", 
        "Sustainable practices"
      ]
    }
  ]
};

// ===== ECOSYSTEM TEASER SECTION =====

// Enhanced version with roadmap tease from SPRINT:
export const ecosystemWithRoadmap = {
  heading: "This is just the beginning.",
  subtitle: "Warden protects. Steward cares. Patriot defends. Our drone ecosystem brings AI into the real world — working alongside humans, not replacing them.",
  
  drones: [
    {
      name: "Warden",
      icon: "🛡️", 
      color: "blue",
      tagline: "Protects: Defender drones for mines, workers, and high-risk environments",
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
      tagline: "Cares: Companion drones for daily assistance and crisis response",
      features: [
        "Daily assistance",
        "Emergency response",
        "Data stewardship"
      ]
    },
    {
      name: "Patriot",
      icon: "🌍",
      color: "yellow",
      tagline: "Defends: Survey drones for domestic data collection and mapping",
      features: [
        "Land surveying",
        "Environmental data",
        "Infrastructure monitoring"
      ]
    }
  ],

  footer: {
    description: "Earthform is building the bridge between humanity and the planet it calls home.",
    tagline: "A sentient infrastructure for a better planet."
  }
};

// ===== CTA SECTION VARIATIONS =====

// Alternative CTA button text options from SPRINT:
export const ctaAlternative = {
  heading: "Help Us Build Warden",
  subtitle: "We're looking for engineers, miners, researchers, storytellers, and believers. Join the movement to bring intelligence underground.",
  form: {
    emailPlaceholder: "Your email",
    messagePlaceholder: "Tell us how you'd like to help...",
    submitText: "Back the Mission", // Alternative: "See Our Tech"
    action: "https://formspree.io/f/mdkdpgvn"
  }
};

// ===== INSTRUCTIONS FOR USING THESE CONFIGS =====

/*
To update the site with any of these variations:

1. Copy the desired config object from this file
2. Replace the corresponding export in src/site.config.ts
3. Save the file - Astro will automatically reload the site
4. The changes will be reflected immediately on the website

For example, to use the alternative hero:
- Copy `heroAlternative` above  
- Paste it into site.config.ts as the `hero` export
- Replace: export const hero = { ... }
- With: export const hero = heroAlternative content

This makes it incredibly easy to test different messaging,
update content for different audiences (investors vs. technical),
or iterate based on feedback!
*/
