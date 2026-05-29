// Site Configuration for Earthform Research Lab
// Research-first content — grounded in actual findings from CAExperiments & related work

export const hero = {
  title: "Earthform Research Lab",
  subtitle: "We build algebraic AI that learns, teaches, and proves what it knows. Research in non-associative algebra, spectral proteins, and Fano-structured protocols — becoming systems that educate.",
  quote: "90+ experiments. A trained model. Research that teaches.",
  cta: {
    text: "Read Our Research",
    link: "/research"
  },
  secondaryCta: {
    text: "Learn With Us",
    link: "/learn"
  }
};

export const pillars = [
  {
    name: "Research",
    icon: "🔬",
    color: "blue",
    href: "/research",
    tagline: "Non-associative algebra, spectral proteins, music, error correction",
    description: "90+ experiments across four interconnected threads. The Fano plane PG(2,2) and its 168 automorphisms, applied to real domains."
  },
  {
    name: "Learn",
    icon: "🎯",
    color: "green",
    href: "/learn",
    tagline: "Verifiable education. Games. Real knowledge. $1/day → $1/month.",
    description: "AI tutoring powered by our Fano-7 architecture. Crystallized intelligence means costs go down as the system gets better."
  },
  {
    name: "Build",
    icon: "🌐",
    color: "purple",
    href: "/research",
    tagline: "Distributed compute. Contribute cycles, get routing done.",
    description: "The beacon network connects spare compute into a shared resource. Contribute → earn credits → learn for less."
  }
];

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
    { label: "Learn", href: "/learn" },
    { label: "About", href: "/mission" }
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
  text: "© 2025–2026 Earthform Research Lab. All rights reserved.",
  links: [
    { label: "Learn", href: "/learn" },
    { label: "Papers", href: "/papers" },
    { label: "Discord", href: "https://discord.gg/tMK9S68bjQ" },
    { label: "Transparency", href: "/transparency" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ]
};

export const meta = {
  title: "Earthform — Algebraic AI Research & Education",
  description: "Research lab building algebraic AI that learns, teaches, and proves what it knows. Fano-structured architectures, spectral protein analysis, verifiable education. 90+ experiments, real benchmarks.",
  keywords: "earthform, octonion algebra, Fano plane, Fano-7, PSL(2,7), spectral protein analysis, IBP-ENM, composable algebra, algebraic error correction, ChordSpeak, AI education, verifiable learning, crystallization",
  author: "Earthform Research Lab",
  url: "https://earthform.ai",

  openGraph: {
    title: "Earthform — Algebraic AI Research & Education",
    description: "Algebraic AI that learns, teaches, and proves what it knows. Research becoming systems that educate."
  },

  twitter: {
    title: "Earthform — Algebraic AI Research & Education",
    description: "Algebraic AI that learns, teaches, and proves what it knows. Research becoming systems that educate."
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
