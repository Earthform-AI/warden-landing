# /transparency — AI Training Transparency

**Date:** 2026-05-04  
**Status:** Concept — promotional/explanatory page  
**Route:** `earthform.ai/transparency`

---

## 1. Purpose

A public-facing page explaining what Earthform has been building for the last
several months on the AI/machine-learning side. Transparency about how our
systems learn, how they're trained, and how that training feeds back into
teaching humans (the /learn platform).

This is distinct from /learn:
- **/learn** = humans learning, AI teaching
- **/transparency** = AI learning, humans observing/steering

---

## 2. What We Explain

### The Strange Loop Model
How our AI systems learn through iterative convergence:
- Declare intent (what am I trying to do?)
- Evolve toward target (try, fail, adapt)
- Emit beacons when stuck (ask for help)
- Crystallize when converged (lock in what works)
- Share frozen patterns (teach others)

### Expert-Trained → Student-Facing Pipeline
1. Domain experts interact with the system (research, experiments)
2. Successful patterns crystallize (proven strategies)
3. Crystallized paths become teaching material for /learn
4. The AI doesn't hallucinate curriculum — it replays verified convergence

### The Needs Model
How we model AI processes as entities with drives:
- 7-axis state vectors (not arbitrary — Fano plane geometry)
- Needs grow passively, satisfaction requires action
- System self-prioritizes based on genuine need
- Same model applies to learner progress tracking

### Beacon Networks (Distributed AI Coordination)
- How AI processes signal for help
- How the kernel routes requests to capable responders
- How this same architecture powers /learn's help system
- Real example: PUC FPGA routing distributed via beacons

### Crystallization (Knowledge Compilation)
- How expensive learning becomes cheap prediction
- The Baldwin Effect: lifetime learning → inherited structure
- Why this makes $1/month feasible (amortized inference cost)
- How crystallized paths are verified (trust but verify)

### Hash-Chained Ledger (Auditability)
- Every decision is recorded
- Chain is cryptographically verifiable
- AI decisions are auditable after the fact
- Same infrastructure proves human learning in /learn

---

## 3. Tone & Framing

**Not a sales pitch.** An honest explanation of what we've been building and
why. Show the actual architecture. Reference real experiments by number. Let
the work speak.

**Audience:** Technical people curious about our approach. Potential
collaborators. People who want to understand what powers /learn. Researchers
who might find the architecture interesting.

**Structure:** Could be a single long-form page (like the /mission page) or
a series of short explanatory sections with diagrams.

---

## 4. Content Sections (Draft)

### "How Our AI Learns"
- The strange loop model (visual diagram)
- Convergence as learning (not memorization)
- Real example: how the sprint system teaches itself

### "From Expert to Student"
- Expert interactions → crystallized patterns → teaching paths
- The pipeline that connects /machinelearn to /learn
- Why this is different from "fine-tuning on user data"

### "What We Can Prove"
- Ledger verification
- Crystallization provenance
- Every teaching strategy traceable to its origin experiment

### "The Architecture"
- Signal Architecture diagram (Intent/Ego/Beacon/Kernel)
- Needs Model visualization
- Beacon routing example

### "Open Research"
- Links to CAExperiments
- Links to specific discovery experiments
- "Here's where these ideas were validated"

---

## 5. Implementation Notes

- Mostly static content (Astro page, like /mission)
- Could include interactive visualizations later (React components)
- Links to /learn for the human-facing application
- Links to /research for the underlying math
- Consider: a live "system status" showing active crystallizations or
  beacon activity (if beacon MVP is running)
