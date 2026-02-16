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

export const mission = {
  problem: {
    tagline: "🔬 What We Study",
    heading: "Composable architectures from non-associative algebra",
    stats: [
      { number: "111+", label: "Experiments Run", color: "blue", source: "CAExperiments repository" },
      { number: "78%", label: "Domain Detection Accuracy", color: "green", source: "IBP-ENM benchmark, 36 proteins" }
    ],
    description: [
      "Most architectures assume associativity — that the order you compose operations doesn't matter. We started from octonions, where it does matter, and discovered that the non-associativity itself is a recording medium. The associator tells you which Fano plane boundary you crossed.",
      "From that insight, we've built composable transforms that achieve 100% navigation success (vs. 14% with raw multiplication), spectral methods that decompose protein structure without training data, and algebraic error correction that treats corruption as a misapplied group element."
    ],
    quote: "Non-associativity isn't a bug. It's a recording medium.",
    solution: "Our ComponentTransform architecture proves that fully associative groups can be constructed on top of non-associative algebras — making them composable without losing the information encoded in path history.",
    context: "Active research — 111 discovery experiments completed, code not yet public."
  },

  philosophy: {
    tagline: "🧠 Our Approach",
    heading: "Experiment-Driven Research",
    subtitle: "Every claim is backed by a numbered experiment with reproducible results.",
    description: "We work by building and measuring. Each discovery experiment is a self-contained Python script that states a hypothesis, runs it, and reports what happened. When something works, we benchmark it against ground truth. When it doesn't, we say so. The research threads you see here emerged from 111+ of these experiments — not from a business plan.",
    quote: "We don't theorize in a vacuum. We build, measure, and follow the math where it leads.",
    attribution: "— Earthform Research Lab"
  },

  values: [
    {
      title: "Composable Algebra",
      icon: "🔢",
      color: "blue",
      description: "Non-associative octonion algebra made composable through ComponentTransforms — bijective basis mappings that form a fully associative group at decision boundaries.",
      features: [
        "100% navigation success (vs 14% raw)",
        "8-layer algebraic architecture",
        "Fano plane as computation substrate"
      ]
    },
    {
      title: "Spectral Protein Analysis",
      icon: "🧬",
      color: "green",
      description: "IBP-ENM: a single spectral decomposition of the protein contact network yields domain boundaries, hinge locations, and structural roles — no training data required.",
      features: [
        "78% k-selection accuracy (36 proteins)",
        "Allosteric site enrichment: 4.49×",
        "Single-state dynamics prediction: ρ=0.779"
      ]
    },
    {
      title: "Algebraic Error Correction",
      icon: "🛡️",
      color: "purple",
      description: "Corruption modeled as misapplied PSL(2,7) automorphisms. Repair is inverse automorphism search over the 168-element Fano symmetry group.",
      features: [
        "Group-theoretic error correction",
        "DNA-like packet structures",
        "Acoustic Fano transfer protocol"
      ]
    }
  ]
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

// /thanks page configuration
export const thanks_hero = {
  icon: "🔬",
  title: "You're On the List",
  subtitle: "We'll notify you when we publish new findings or open-source our code.",
  description: "In the meantime, join our Discord to follow the research in real time — or just browse the experiment log and see what we've been working on.",
  image: {
    src: "/hero-image.svg",
    alt: "Earthform Research Lab"
  }
};

export const thanks_mission = {
  heading: "What Happens Next",
  steps: [
    {
      title: "We Read It",
      description: "Your message goes directly to the research team. We read everything."
    },
    {
      title: "We Respond",
      description: "If your interests align with our work, we'll reach out to discuss."
    },
    {
      title: "You Get Access",
      description: "When we publish code or papers, you'll be among the first to know."
    }
  ]
};

export const thanks_next = {
  discord: "https://discord.gg/tMK9S68bjQ",
  footer: "Want to follow the research right now? Join our Discord — we discuss experiments as they happen."
};

// Research community section configuration
export const inviteNominate = {
  heading: "Research Community",
  tagline: "Good research happens when good people work together.",
  subtitle: "We're building a community of researchers, mathematicians, and engineers who think carefully about hard problems.",
  description: "Our work spans algebra, structural biology, music theory, and error correction. If any of those interest you — or if you see connections we've missed — we want to hear from you.",

  mission: {
    title: "Open Research, When It's Ready",
    content: "We're preparing to open-source our code and publish our findings. The community we're building now will be the first to access, review, and build on this work."
  },

  sections: {
    nominate: {
      title: "Suggest a Collaborator",
      icon: "🎯",
      description: "Know someone whose expertise could contribute to this research? Point us their way.",
      features: [
        "Mathematicians, biologists, musicians, systems engineers",
        "People who care about rigor and reproducibility",
        "Anyone who sees connections across domains"
      ],
      cta: "Suggest Someone"
    },
    apply: {
      title: "Get Involved",
      icon: "🔬",
      description: "Interested in contributing to active research? Tell us what you're working on.",
      features: [
        "Review and discuss experiment results",
        "Propose new experiments or applications",
        "Collaborate on papers and publications"
      ],
      cta: "Reach Out"
    },
    sponsor: {
      title: "Support the Research",
      icon: "🤝",
      description: "Help fund open research that will be freely published for everyone.",
      features: [
        "Fund compute for large-scale benchmarks",
        "Support open-access publication costs",
        "Enable hardware prototyping (FPGA)",
        "Keep the research independent"
      ],
      cta: "Discuss Support"
    },
    impact: {
      title: "Results So Far",
      icon: "📊",
      description: "Real numbers from real experiments — here's what we've measured.",
      features: [
        "111+ numbered experiments completed",
        "Benchmarks against ground truth data",
        "Concrete accuracy metrics published"
      ],
      cta: "View Results"
    }
  },

  forms: {
    nominate: {
      action: "/contact",
      fields: {
        nominatorName: "Your Name",
        nominatorEmail: "Your Email",
        nomineeName: "Their Name",
        nomineeEmail: "Their Email",
        background: "What's their area of expertise?",
        examples: "Relevant work or publications",
        aiHelp: "How do you see them contributing to this research?",
        relationship: "How do you know them?"
      },
      submitText: "Submit Suggestion"
    },
    sponsor: {
      action: "/contact",
      fields: {
        name: "Your Name",
        email: "Your Email",
        organization: "Organization (optional)",
        tier: "Support Area",
        commitment: "How You'd Like to Help",
        motivation: "What draws you to this research?"
      },
      tiers: [
        {
          name: "Compute Sponsor",
          amount: "Flexible",
          period: "",
          description: "Fund GPU/CPU time for large-scale protein benchmarks and algebraic computation",
          includes: ["Acknowledgment in publications", "Early access to results", "Research updates"],
          impact: "Enables benchmarks at scale — more proteins, more confidence in results",
          stripePriceId: null,
          popular: false
        },
        {
          name: "Publication Sponsor",
          amount: "Flexible",
          period: "",
          description: "Cover open-access publication and conference costs",
          includes: ["Named acknowledgment in papers", "Pre-print access", "Research discussion access"],
          impact: "Keeps findings freely available to everyone",
          stripePriceId: null,
          popular: true
        },
        {
          name: "Hardware Sponsor",
          amount: "Flexible",
          period: "",
          description: "Fund FPGA prototyping for hardware-accelerated Fano computation",
          includes: ["Hardware design access", "Build logs and results", "Collaboration on design"],
          impact: "Proves algebraic methods work in silicon, not just in Python",
          stripePriceId: null,
          popular: false
        },
        {
          name: "Research Partner",
          amount: "Let's Talk",
          period: "",
          description: "Institutional or organizational research partnership",
          includes: ["Joint research direction", "Shared resources", "Co-authorship opportunities"],
          impact: "Accelerate the research with complementary expertise and resources",
          stripePriceId: null,
          popular: false
        }
      ],
      submitText: "Start Conversation"
    }
  },

  testimonialsConfig: {
    displayMode: 'coming-soon' as 'real' | 'placeholder' | 'mixed' | 'coming-soon',
    minimumRealTestimonials: 3,
    lastUpdated: new Date('2026-02-16'),
    fallbackMessage: {
      title: "Publications & Results Coming Soon",
      subtitle: "We're preparing our first publications. Benchmarks and reproducible results will be posted here.",
      description: "Every result will include the experiment number, methodology, and raw data. No hand-waving — just math and measurements.",
      cta: "Get notified when we publish",
      timeline: "Manuscripts in preparation"
    }
  },

  showcase: {
    heading: "Key Findings",
    subtitle: "Selected results from 111+ experiments",
    realStories: [],
    placeholderStories: [
      {
        name: "Composable Algebra (D04)",
        role: "Breakthrough Result",
        tools: "Octonions + ComponentTransforms",
        impact: "Injecting summation tools at decision boundaries yields 100% navigation success for sum→sum paths — vs 14% with raw octonion multiplication. Non-associativity is a recording medium, not a limitation.",
        date: "Discovery 04",
        verified: true,
        isPlaceholder: false
      },
      {
        name: "Spectral Protein Decomposition (D82)",
        role: "Benchmark Result",
        tools: "IBP-ENM + Silhouette k-selection",
        impact: "Silhouette-based k-selection achieves 78% accuracy on 36 multi-domain proteins — 7× better than eigengap (p=2.85×10⁻⁶). Domain ARI=0.601 matches oracle performance.",
        date: "Discovery 82",
        verified: true,
        isPlaceholder: false
      },
      {
        name: "Allosteric Site Detection (D96)",
        role: "Validation Result",
        tools: "Spectral Surgery + Lock Analysis",
        impact: "Spectral surgery lock contacts hit known allosteric sites at 4.49× enrichment, hinge sites at 3.99×, and active sites at 1.50×. The method preferentially finds mechanical control points.",
        date: "Discovery 96",
        verified: true,
        isPlaceholder: false
      }
    ],
    get stories() {
      const config = inviteNominate.testimonialsConfig;

      if (config.displayMode === 'coming-soon') {
        return [];
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

      return this.realStories.length > 0 ? this.realStories : this.placeholderStories;
    }
  }
};
