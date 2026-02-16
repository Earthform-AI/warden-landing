// About Page Configuration for Earthform Research Lab
// Factual overview: what we study, how we work, what we've found.

export const missionCopy = {
  title: "About Earthform",

  // ── Section 1: What We Study ─────────────────────────────────────────
  origin: {
    heading: "What We Study",
    paragraphs: [
      "Earthform is a research lab focused on the algebraic structure of the Fano plane PG(2,2) and its applications across multiple domains.",
      "Our core observation: the non-associativity of octonion multiplication is not a defect — it encodes path history. The associator records which boundary in the Fano plane was crossed, making it a natural recording medium for sequential decisions."
    ],
    afterQuote: [
      "This led to ComponentTransforms — bijective basis mappings that form a fully associative group at decision boundaries. These transforms achieve 100% navigation success where raw octonion multiplication fails 86% of the time.",
      "We've since applied the same Fano structure to protein spectral analysis, music theory, and error correction. Four domains, one algebraic foundation. The structure works in contexts we didn't originally design it for."
    ]
  },

  // ── Section 2: How We Work ───────────────────────────────────────────
  method: {
    heading: "Methodology",
    intro: "Hypothesis-driven, experiment-first research.",
    description: "Each discovery experiment is a self-contained Python script that states a hypothesis, runs it, and reports results. Research threads emerged from the data, not from a predetermined plan.",
    principles: [
      {
        title: "Numbered Experiments",
        icon: "🔬",
        text: "91 discovery scripts, each self-contained. Hypothesis in, measurement out. Research threads emerged from these experiments organically."
      },
      {
        title: "Benchmarks Over Claims",
        icon: "📊",
        text: "78% domain detection accuracy on 36 proteins. 100% navigation success vs 14% baseline. 4.49× allosteric site enrichment. 92% archetype classification."
      },
      {
        title: "One Foundation",
        icon: "🔢",
        text: "The Fano plane PG(2,2), its automorphism group PSL(2,7), and the octonion algebra it encodes. Every research thread applies this same structure to a different domain."
      }
    ]
  },

  // ── Section 3: What We've Found ──────────────────────────────────────
  findings: {
    heading: "Results",
    intro: "Four research threads applying the same algebraic structure to different domains.",
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
        result: "78% k-selection accuracy across 36 proteins. 92% archetype classification. 4.49× allosteric enrichment.",
        link: "/research/protein-analysis"
      },
      {
        name: "Fano-Structured Music",
        experiments: "D25 – D47, D63 – D72",
        icon: "🎵",
        color: "purple",
        summary: "The Fano plane's 7 points map to 7 notes, its 168 automorphisms map to 168 harmonic transforms. ChordSpeak encodes language into music through algebraic structure.",
        result: "Working language-music system. Acoustic file transfer protocol. Path history encoded in sound.",
        link: "/research/fano-music"
      },
      {
        name: "Algebraic Video Repair",
        experiments: "Applied research",
        icon: "🎬",
        color: "yellow",
        summary: "Corruption modeled as a misapplied automorphism — repair becomes inverse group search over PSL(2,7). Spatial algebra maps pixel gradients onto Fano structure.",
        result: "Fano-algebraic error correction with belief algebra for disambiguation. Streaming protocol for real-time repair.",
        link: "/research/algebraic-repair"
      }
    ]
  },

  // ── Section 4: Current Direction ─────────────────────────────────────
  direction: {
    heading: "Current Direction",
    intro: "Where we are and what's next.",
    steps: [
      {
        label: "Now",
        title: "Publication & Documentation",
        description: "Two manuscripts in review. Cleaning experiment code and preparing the research for public release."
      },
      {
        label: "Next",
        title: "Open Source",
        description: "Publishing the CAExperiments repository, benchmarks, and supporting code. Everything numbered, everything reproducible."
      },
      {
        label: "Then",
        title: "Cross-Domain Validation",
        description: "Testing whether the Fano/ComponentTransform framework generalizes as a universal composition layer. The algebra suggests it should. The experiments are how we'll find out."
      }
    ]
  },

  // ── Section 5: CTA / Closing ─────────────────────────────────────────
  closing: {
    heading: "Get in Touch",
    text: "We share findings and discuss experiments in the open. If you work on related problems — algebraic structures, structural biology, music theory, or error correction — we'd welcome the conversation.",
    cta: {
      join: { text: "Get Updates", href: "/#join" },
      discord: { text: "Join the Discord", href: "https://discord.gg/tMK9S68bjQ" }
    }
  }
};
