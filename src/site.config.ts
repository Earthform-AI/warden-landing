// Site Configuration for Earthform Research Lab
// Research-first content — grounded in actual findings from CAExperiments & related work

export const hero = {
  title: "Earthform Research Lab",
  subtitle: "We study non-associative algebra, spectral protein analysis, and Fano-structured protocols. Our goal is universal architectures — systems that learn what hardware they're in and what they should do, starting from a soft identity.",
  quote: "111 experiments. 4 research threads. Real benchmarks, real math, no black boxes.",
  cta: {
    text: "Read Our Research",
    link: "/research"
  }
};

export const ecosystem = {
  heading: "Research Threads",
  subtitle: "Four interconnected lines of inquiry — all emerging from the structure of the Fano plane and its 168 automorphisms.",

  components: [
    {
      name: "Composable Non-Associative Algebra",
      icon: "🔢",
      color: "blue",
      tagline: "Making octonions composable through decision-boundary transforms",
      features: [
        "ComponentTransform group (D04–D20)",
        "8-layer algebraic architecture",
        "Cross-domain problem solving"
      ]
    },
    {
      name: "Spectral Protein Analysis",
      icon: "🧬",
      color: "green",
      tagline: "Unsupervised protein decomposition via graph Laplacian spectroscopy",
      features: [
        "IBP-ENM method (D77–D111)",
        "Spectral surgery & allosteric detection",
        "92% archetype classification accuracy"
      ]
    },
    {
      name: "Fano-Structured Music",
      icon: "🎵",
      color: "purple",
      tagline: "7 points ↔ 7 notes, 168 automorphisms ↔ 168 harmonic transforms",
      features: [
        "ChordSpeak language-music system (D30–D47)",
        "Path history encoded in sound",
        "Acoustic file transfer protocol"
      ]
    },
    {
      name: "Algebraic Video Repair",
      icon: "🎬",
      color: "yellow",
      tagline: "Corruption = misapplied automorphism → repair = inverse group search",
      features: [
        "PSL(2,7) automorphism search",
        "Spatial algebra via gradient-Fano mapping",
        "Belief algebra for error disambiguation"
      ]
    }
  ],

  footer: {
    description: "These threads share a common foundation: the Fano plane PG(2,2), its automorphism group PSL(2,7), and the octonion algebra it encodes. Each thread applies this structure to a different domain.",
    tagline: "One algebraic structure. Four domains. Concrete results."
  }
};

export const nav = {
  links: [
    { label: "Home", href: "/" },
    { label: "Research", href: "/research" },
    { label: "About", href: "/mission" },
    { label: "Contact", href: "/#join" }
  ]
};

export const cta = {
  heading: "Follow Our Work",
  subtitle: "We're preparing to open-source our research. Leave your email to be notified when code and papers are published, or tell us about your interest in these topics.",
  form: {
    emailPlaceholder: "Your email",
    messagePlaceholder: "What interests you? Algebra, protein analysis, music theory, error correction — or something else entirely...",
    submitText: "Stay Updated",
    action: "/contact"
  }
};

export const community = {
  heading: "Join the Discussion",
  subtitle: "Our Discord is where we share findings, discuss experiments, and work through problems together.",
  description: "This is an active research community, not a product announcement channel. Expect conversations about spectral decomposition, Fano plane geometry, octonion algebra, and the occasional debate about whether non-associativity is a feature or a bug (it's a feature).",
  discord: {
    link: "https://discord.gg/tMK9S68bjQ",
    text: "Join Discord",
    subtitle: "Research discussion & collaboration"
  },
  values: [
    {
      icon: "🔬",
      title: "Experiment Log",
      description: "Follow along as we run new experiments. Every discovery is numbered, documented, and discussed."
    },
    {
      icon: "📊",
      title: "Benchmarks & Results",
      description: "Real numbers from real benchmarks. When something works, we share the data. When it doesn't, we share that too."
    },
    {
      icon: "🤝",
      title: "Open Collaboration",
      description: "We're looking for people who think carefully about hard problems — across math, biology, music, and systems design."
    }
  ]
};

export const footer = {
  text: "© 2025 Earthform Research Lab. All rights reserved.",
  links: [
    { label: "Discord", href: "https://discord.gg/tMK9S68bjQ" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ]
};

export const meta = {
  title: "Earthform Research Lab",
  description: "Research lab exploring non-associative algebra, spectral protein analysis, Fano-structured music, and algebraic error correction. 111+ experiments, real benchmarks, open research.",
  keywords: "earthform, octonion algebra, Fano plane, PSL(2,7), spectral protein analysis, IBP-ENM, composable algebra, algebraic error correction, ChordSpeak, research lab",
  author: "Earthform Research Lab",
  url: "https://warden-landing.vercel.app",

  openGraph: {
    title: "Earthform Research Lab",
    description: "Non-associative algebra, spectral protein analysis, Fano-structured music, and algebraic error correction. 111+ experiments with real benchmarks."
  },

  twitter: {
    title: "Earthform Research Lab",
    description: "Non-associative algebra, spectral protein analysis, Fano-structured music, and algebraic error correction. 111+ experiments with real benchmarks."
  },

  images: {
    hero: {
      src: "/hero-image.svg",
      alt: "Earthform Research Lab"
    },
    favicon: {
      src: "/favicon.svg",
      alt: "Earthform logo"
    }
  }
};
