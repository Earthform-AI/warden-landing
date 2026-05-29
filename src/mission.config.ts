// About Page Configuration for Earthform
// Identity, beliefs, what we're building, and why.

export const missionCopy = {
  title: "About Earthform",

  // ── Section 1: Who We Are ────────────────────────────────────────────
  origin: {
    heading: "Who We Are",
    paragraphs: [
      "Earthform is a research lab that builds AI systems grounded in algebraic structure rather than scale alone. We started with a single observation: the Fano plane — the smallest finite projective geometry — encodes a surprising amount of computational structure in its 7 points, 7 lines, and 168 symmetries.",
      "That observation has grown into 90+ experiments, a working neural architecture (Fano-7), a learning platform, and a distributed compute protocol. All built on the same algebraic foundation."
    ],
    afterQuote: [
      "We're a small team. We ship experiments, measure results, and share everything we find — including the failures. The Discord is where the work happens in the open."
    ]
  },

  // ── Section 2: What We Believe ───────────────────────────────────────
  method: {
    heading: "What We Believe",
    intro: "Three principles that guide everything we build.",
    description: "",
    principles: [
      {
        title: "Structure Over Scale",
        icon: "🔷",
        text: "The right inductive bias beats more parameters. Our 205K-param Fano-7 model outperforms matched-size standard transformers by 17% — not because it's bigger, but because its attention is algebraically structured."
      },
      {
        title: "Learning Should Get Cheaper",
        icon: "📉",
        text: "When our system converges on how to teach something, that convergence is crystallized into a direct prediction. The first time costs real compute. The thousandth time is nearly free. Costs go down, not up."
      },
      {
        title: "Prove It Or It Didn't Happen",
        icon: "🔐",
        text: "Every AI decision is recorded in a hash-chained ledger. Every student mastery claim is cryptographically verifiable. We don't ask you to trust the system — we give you the tools to verify it."
      }
    ]
  },

  // ── Section 3: What We're Building ───────────────────────────────────
  findings: {
    heading: "What We're Building",
    intro: "Three interconnected systems, all sharing the same algebraic core.",
    threads: [
      {
        name: "Research",
        experiments: "90+ experiments",
        icon: "🔬",
        color: "blue",
        summary: "Non-associative algebra, spectral protein analysis, Fano-structured music, and algebraic error correction. Four domains, one mathematical foundation — the Fano plane PG(2,2) and its automorphism group.",
        result: "Real benchmarks: 98.6% convergence, 78% domain detection on 36 proteins, 100% navigation (vs 14% baseline).",
        link: "/research"
      },
      {
        name: "Learn",
        experiments: "In development",
        icon: "🎯",
        color: "green",
        summary: "Verifiable education powered by the Fano-7 architecture. Mini-games, adaptive AI tutoring, and cryptographic proof of mastery. Your knowledge is yours forever — portable and independent of institutions.",
        result: "$1/day at launch. Goal: $1/month as crystallization amortizes inference costs.",
        link: "/learn"
      },
      {
        name: "Beacon Network",
        experiments: "Phase 2",
        icon: "🌐",
        color: "purple",
        summary: "A distributed compute protocol where spare cycles become shared resources. Contributors earn credits that offset learning costs. The network itself uses Fano-structured routing.",
        result: "Protocol live. Dashboard and contributor onboarding in development.",
        link: "/research"
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
        title: "Fano-7 Architecture & Learning Platform",
        description: "Training our Fano-7 model — a 205K-param transformer with algebraic attention that achieves 98.6% convergence. Building the Learn platform: verifiable education powered by crystallized intelligence."
      },
      {
        label: "Next",
        title: "Open Source & Public Access",
        description: "Publishing the CAExperiments repository, model weights, and launching Learn at $1/day — with a goal of $1/month as crystallization amortizes costs."
      },
      {
        label: "Then",
        title: "Cross-Domain Scaling",
        description: "Scaling Fano-7 beyond synthetic traces to real-world data: protein dynamics, educational trajectories, and distributed compute via the beacon network."
      }
    ]
  },

  // ── Section 5: CTA / Closing ─────────────────────────────────────────
  closing: {
    heading: "Join Us",
    text: "We're building in the open. Whether you want to learn with us, contribute to the research, or just follow along — there's a place for you.",
    cta: {
      join: { text: "Join the Waitlist", href: "/learn" },
      discord: { text: "Join the Discord", href: "https://discord.gg/tMK9S68bjQ" }
    }
  }
};
