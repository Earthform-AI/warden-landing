// About Page Configuration for Earthform Research Lab
// Tells our actual story — how we got here, what we study, and how we work.

export const missionCopy = {
  title: "About Earthform",

  // ── Section 1: Origin Story ──────────────────────────────────────────
  origin: {
    heading: "How This Started",
    paragraphs: [
      "My father has always loved science fiction. I grew up watching it with him after he came home from work — ships, machines, and AI that weren't just tools, but characters with purpose, agency, and something like care.",
      "One day he told me:"
    ],
    quote: "Everything that happened to you was to get you here — to build this.",
    afterQuote: [
      "He was right. I've spent my career chasing one question: can you build an architecture that learns what hardware it's in and what it should do — starting from a soft identity, not a hard-coded one?",
      "That question led me to octonions. Octonions are non-associative — meaning (a·b)·c ≠ a·(b·c). Most people treat that as a defect. I discovered it's a recording medium. The associator tells you which boundary you crossed in the Fano plane. That one insight — that non-associativity encodes path history — became the foundation for everything we do.",
      "From there, we built composable transforms that achieve 100% navigation success where raw multiplication fails 86% of the time. We applied the same Fano structure to protein spectral analysis, to music theory, and to video error correction. Four domains, one algebraic foundation.",
      "This is not my next project. This is my life's work."
    ]
  },

  // ── Section 2: How We Work ───────────────────────────────────────────
  method: {
    heading: "How We Work",
    intro: "Every claim is backed by a numbered experiment with reproducible results.",
    description: "We work by building and measuring. Each discovery experiment is a self-contained Python script that states a hypothesis, runs it, and reports what happened. When something works, we benchmark it against ground truth. When it doesn't, we say so.",
    principles: [
      {
        title: "Numbered Experiments",
        icon: "🔬",
        text: "111+ discovery scripts, each self-contained. Hypothesis in, measurement out. The research threads emerged from these experiments — not from a business plan."
      },
      {
        title: "Benchmarks Over Claims",
        icon: "📊",
        text: "78% domain detection accuracy on 36 proteins. 100% navigation success vs 14% baseline. 4.49× allosteric site enrichment. We publish the numbers, not adjectives."
      },
      {
        title: "One Foundation",
        icon: "🔢",
        text: "The Fano plane PG(2,2), its automorphism group PSL(2,7), and the octonion algebra it encodes. Every research thread applies this same structure to a different domain."
      }
    ],
    quote: "We don't theorize in a vacuum. We build, measure, and follow the math where it leads.",
    attribution: "— Earthform Research Lab"
  },

  // ── Section 3: What We've Found ──────────────────────────────────────
  findings: {
    heading: "What We've Found So Far",
    intro: "Four research threads, each applying the same algebraic structure to a different domain. These emerged from the experiments — we didn't plan them in advance.",
    threads: [
      {
        name: "Composable Algebra",
        experiments: "D01 – D20",
        icon: "🔢",
        color: "blue",
        summary: "Non-associative octonion algebra made composable through ComponentTransforms — bijective basis mappings that form a fully associative group at decision boundaries.",
        result: "100% navigation success (vs 14% raw multiplication). 8-layer algebraic architecture validated.",
        link: "/research/composable-algebra"
      },
      {
        name: "Spectral Protein Analysis",
        experiments: "D77 – D111",
        icon: "🧬",
        color: "green",
        summary: "IBP-ENM: a single spectral decomposition of the protein contact network yields domain boundaries, hinge locations, and structural roles — no training data required.",
        result: "78% k-selection accuracy across 36 proteins. Single-state dynamics prediction: ρ = 0.779.",
        link: "/research/protein-analysis"
      },
      {
        name: "Fano-Structured Music",
        experiments: "D25 – D68",
        icon: "🎵",
        color: "purple",
        summary: "The Fano plane's 7 points map to 7 notes, its 168 automorphisms map to 168 harmonic transforms. ChordSpeak encodes language into music through algebraic structure.",
        result: "Working language-music system. Acoustic file transfer protocol. Path history encoded in sound.",
        link: "/research/fano-music"
      },
      {
        name: "Algebraic Video Repair",
        experiments: "Movie-Repair Project",
        icon: "🎬",
        color: "yellow",
        summary: "Corruption modeled as a misapplied automorphism — repair becomes inverse group search over PSL(2,7). Spatial algebra maps pixel gradients onto Fano structure.",
        result: "Fano-algebraic error correction with belief algebra for disambiguation. Streaming protocol for real-time repair.",
        link: "/research/algebraic-repair"
      }
    ]
  },

  // ── Section 4: Where This Is Going ───────────────────────────────────
  direction: {
    heading: "Where This Is Going",
    intro: "We're preparing to open-source our research. Here's what's ahead — not a product roadmap, just honest next steps.",
    steps: [
      {
        label: "Now",
        title: "Writing It Up",
        description: "Cleaning experiment code, writing documentation, and preparing the research for public release. The 111 experiments exist — making them readable for others is the current work."
      },
      {
        label: "Next",
        title: "Open Source",
        description: "Publishing the CAExperiments repository, benchmarks, and supporting code. Everything numbered, everything reproducible."
      },
      {
        label: "Then",
        title: "Universal Architecture",
        description: "The long-term question: can ComponentTransforms serve as a universal composition layer — an OS-like substrate where systems learn what they are and what they should do? The algebra suggests yes. The experiments are how we'll find out."
      }
    ]
  },

  // ── Section 5: CTA / Closing ─────────────────────────────────────────
  closing: {
    heading: "Follow the Work",
    text: "We share findings, discuss experiments, and work through problems in the open. If you think carefully about hard problems — across math, biology, music, or systems design — we'd like to hear from you.",
    cta: {
      join: { text: "Get Updates", href: "/#join" },
      discord: { text: "Join the Discord", href: "https://discord.gg/tMK9S68bjQ" }
    }
  }
};
