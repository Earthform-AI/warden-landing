# /learn — Earthform Learning Platform

**Date:** 2026-05-04  
**Status:** Concept — documenting for prototyping  
**Route:** `earthform.ai/learn`  
**Companion:** `earthform.ai/transparency` (AI training transparency)

---

## 1. Vision

A gamified, verifiable learning platform for adults (18+) who enjoy lifelong
learning. Not a replacement for formal education — a supplement for people who
want to keep exploring the real world and proving to themselves what they know.

**Target user:** Someone curious, exploring the world or a book, who sees a
plant and wants to come back and learn plant biology. Someone who enjoys the
dopamine of Brain Games but wants it directed at real, verifiable knowledge.

**Pricing model:**
- $1/day at launch (~$30/month — honest about inference costs)
- Goal: $1/month as crystallization amortizes costs over time
- Pay-what-you-feel option (support the concept without active study)
- Compute contributors earn credits (beacon network participation)
- Framing: "As the system learns to teach better, the price drops."

---

## 2. Core Principles

### Only Teach Verifiable Knowledge
Every concept taught must be grounded in established science. No opinions
presented as facts. Math, physics, chemistry, biology, programming, trade
skills — domains where "correct" has a definition.

### Prove the Journey, Not Just the Destination
Hash-chained interaction ledger proves sustained engagement over time. A user
who converged on algebra over 14 months has a stronger proof of understanding
than a single exam score. The system can cryptographically verify the learning
path without exposing private interactions.

### Achievement Ladders Mapped to Real Standards
Target the highest-ranking schools/curricula (pick a quality metric) as the
baseline. Completion of a major achievement signifies the user would pass that
level under a rigorous system's standards. Growth beyond that baseline is
where the platform differentiates.

### Games Make It Fun — Structure Makes It Real
Each "class" is a mini-game (Brain Games / DS-era design). Short, dopamine-
friendly sessions that accumulate into genuine verified knowledge. The higher-
level material demands more — the gamification scales down as rigor scales up.

### 18+ Only
No minors. Avoids COPPA/children's privacy complexity during development.
Adult learners choosing to invest in themselves. An investment no one can take
away from you.

---

## 3. Architecture (Maps to Existing Infrastructure)

### Strange Loop as Lesson

```
State vector = current understanding (7 axes)
Target       = comprehension of topic/chapter
Loop         = engage → assess → adapt → re-engage
Converge     = demonstrate understanding (fitness < threshold)
Crystallize  = knowledge is "owned" — frozen, auditable, shareable
```

### Beacon Network for Help

When a learner is stuck (fitness stagnant for N sessions):
- Emit beacon: "I need help with quadratic equations"
- Kernel routes to: different explanation angle, peer who recently
  crystallized this topic, or AI tutor adapting strategy
- Associator gating: mathematical attention — does this learner genuinely
  need this particular kind of help?

### Playground Loop as Game Loop

```
play → discover → freeze → share → thaw → play
```

NAL spec keywords map directly:
- `try_expr` → attempt a problem
- `fall_down` → fail (learning moment)
- `get_up` → retry with new approach
- `celebrate` → succeed → earn progress

### Crystallization as Teaching

When a user masters a topic, their convergence path becomes a crystallized
pattern. This is how the system improves — real users' successful learning
paths inform how the AI teaches the next learner. Experts train the AI; the
AI turns around and teaches new learners.

### Ledger as Transcript

Every interaction hashed into a verifiable chain:
- Proves sustained engagement (not cram-and-forget)
- Proves the specific concepts covered
- Privacy-preserving: proves properties without exposing content
- Portable: the user owns their proof

### Privacy-Preserving Verification (ZK Approach)

The platform needs enough data to verify "this is the same person who has
been learning for 14 months" — but should NOT hoard personal data.

**Mechanism:**
1. Each session → commitment hash: H(user_id || topic || timestamp || summary)
2. User accumulates a Merkle tree of session commitments (they hold it)
3. To prove learning: ZK proof that their Merkle root is valid, sessions
   span claimed time, topics match — WITHOUT revealing content
4. Earthform verifies properties (duration, convergence, topic) without
   seeing what was discussed

**Anti-extraction statement:** "We don't hoard your data. You hold your own
proof. We can verify it without seeing it."

**Simpler v1:** Signed attestations from the AI ("user demonstrated
competence in X on date Y"), hash-chained, user-held, portable. Verification
= show your chain.

---

## 4. Learning Modes

### Mini-Game Mode (Brain Games Style)
- Short sessions (5–15 min)
- One concept per game
- Immediate feedback loop
- Achievement points accumulate
- Fun first, rigor implicit

### RWM — Read With Me (Ingest Mode)

The student **teaches the chapter to the AI** by screencapping pages. This
inverts the typical dynamic — the student is the teacher first, the AI is
the student. This forces active engagement with the material before any
evaluation begins.

- User screencaps book/coursebook pages into the system
- AI ingests the content, identifies structure, vocabulary, concepts
- System auto-generates challenge hierarchy from the material
- The book gets "crystallized" chapter by chapter as the user progresses
- Curated book paths (sponsor angle for publishers)

### RTD — Read Then Discuss (Challenge Mode)

Once material is ingested via RWM, the system generates a **hierarchical
challenge tree** that drills from high-level comprehension down to granular
understanding:

```
book_challenge
  └── chapter_challenge
        └── paragraph_challenge
              └── sentence_challenge
                    └── word_challenge (if unfamiliar vocabulary detected)
```

**The flow within a book/coursebook challenge:**

1. **Ingest** — User screencaps pages (RWM). AI identifies structure.
2. **Generate** — System creates challenge games at each granularity level.
   Word-level challenges only appear if the system spots vocabulary the
   user may not know (adaptive depth).
3. **Play** — User works through challenge_game(s) at each level.
   Games are generated from the ACTUAL content just ingested — not generic.
4. **Assess** — Results reveal gaps. Where did comprehension break down?
   At the word level? The sentence level? The paragraph's argument?
5. **Discuss** — RTD loop on identified gaps. Socratic method: AI probes
   understanding of specifically what was missed.
6. **Resolve** — Loop continues until pass OR beacon emitted.
   Pass = demonstrated convergence at all challenge levels.
   Beacon = "I'm stuck, route me to different explanation or peer help."

**Key insight:** The challenge games are generated FROM the first read(s).
The student's act of teaching the AI the material IS the setup phase. The
evaluation is personalized to exactly what they're reading — not a generic
quiz bank.

### Challenge Granularity (Adaptive Depth)

Not every page needs word-level challenges. The system adapts:

| Level | Triggers When | Example |
|---|---|---|
| Book | Always (top-level progress) | "Summarize the thesis so far" |
| Chapter | Always | "What did this chapter argue?" |
| Paragraph | Complex argument detected | "What's the logical step here?" |
| Sentence | Key definition or theorem | "Restate this in your own words" |
| Word | Unfamiliar/technical term spotted | "Define 'eigenvalue' in context" |

The deeper the challenges go, the more granular the gap identification.
A student who fails at word-level gets vocabulary games. A student who
passes words but fails paragraphs gets argument-structure games.

### Exploration Mode
- User encounters something in the real world
- Brings a question/photo/observation back to the platform
- System identifies relevant learning paths
- "I saw this plant" → botany mini-game unlocked
- Serendipity-driven curriculum

### Offline Mode (No Internet Needed)

**Goal:** Learning continues without internet. Someone else's internet — or
no internet at all — should be sufficient.

**Why this matters:**
- Survival situations (remote, disaster, infrastructure failure)
- Developing regions with intermittent connectivity
- Users who simply can't afford constant data
- Independence from centralized services for something as fundamental as
  learning

**How it works architecturally:**

1. **Crystallized paths ARE offline-capable.** A crystallized teaching
   strategy is just coefficients — no inference needed. Once a topic is
   crystallized, it can run locally on-device with zero connectivity.

2. **Search beacons (stale response mode).** After enough interactions on
   a topic, the system builds a local knowledge cache. When internet isn't
   available, it serves cached/synthetic responses from what it already
   knows about the user's learning path. Like a "stale" Google result —
   not real-time, but often good enough.

3. **First-contact beacon.** The first beacon the system sees over internet
   is enough to bootstrap a private communication channel. From that single
   handshake:
   - Download the user's crystallized paths for offline use
   - Sync challenge progress
   - Establish a minimal protocol for future low-bandwidth updates
   - Even SMS/text-based beacon exchange could work (tiny payload)

4. **Internet sharing via beacon network.** Users with internet can offer
   connectivity on the beacon network to users without. The helper's device
   proxies requests — the offline user gets answers routed through someone
   else's connection. The beacon credit system compensates contributors.

5. **Custom transport beacons.** The beacon protocol is transport-agnostic.
   First version: internet. But beacons could travel over:
   - SMS/text messages (minimal payload, high latency)
   - Bluetooth mesh (local, no infrastructure)
   - Radio (LoRa for rural/remote)
   - Sneakernet (USB transfer between devices)
   - Any medium that can carry a small packet

**Progressive degradation:**

| Connectivity | Experience |
|---|---|
| Full internet | Live AI tutoring, real-time RTD, full beacon network |
| Intermittent | Sync when available, offline challenges between connections |
| Someone else's | Beacon-routed through contributor's connection |
| SMS only | Text-based beacon exchange, minimal sync, stale responses |
| None | Fully offline crystallized paths, local challenge games |

**Key insight:** The crystallization architecture was designed for hardware
(FPGA) where you can't phone home mid-computation. The same property makes
it perfect for offline learning — crystallized knowledge runs locally without
needing the cloud.

**Not ready immediately**, but the architecture supports it. Designing beacons
with transport-agnosticism NOW means offline mode is an expansion, not a
rewrite.

---

## 5. Achievement System

### Structure
- Achievement ladders mimic high-school through university levels
- Mapped to highest-quality curricula globally (baseline metric TBD)
- Completion = verifiable proof user would pass at that standard
- Growth beyond baseline = platform's differentiator

### Verification
- Not a single test — proven convergence over time
- The AI and user have interacted over extended periods on foundational
  concepts before advancing
- Moving forward requires demonstrated understanding, not just exposure
- Hash chain makes this auditable without centralized authority

### Trade Skills (Future)
- Not just academic — practical knowledge has value
- Electrical, plumbing, mechanics, agriculture
- "Can this person safely wire a circuit?" is a verifiable question
- An investment in yourself that no one can take away

---

## 6. Compute Token Concept (Experimental)

AI consumes and outputs tokens. The beacon network trades compute. A "beacon
credit" that represents actual compute provided/consumed is an honest
accounting mechanism:

- Help route someone's FPGA build → earn credits (proof of useful work)
- Ask the system to tutor you → spend credits (real inference cost)
- Crystallized paths cost fewer credits (cheaper as system learns)
- The credit IS the accountability layer — ledger tracks contributions

**Grounding:** 1 credit = 1 unit of actual compute (inference or routing).
Not speculative. Not "get rich." A co-op's internal accounting system.

**Naming:** "Beacon credits" or "compute credits" — NOT "tokens" publicly.
The hash-chain IS technically a blockchain, but advertising it that way
attracts speculators and loses researchers.

**Integration with pricing:**
- $1/day buys N credits
- Contributing compute earns credits (offset your cost)
- As crystallization reduces per-query cost, credits go further
- Path to $1/month: credits become cheaper as system efficiency improves

---

## 7. Revenue & Sustainability

### Why $1/day Works at Launch

- GPT-4 class inference: ~$0.03–0.10 per interaction
- Serious learner: 5–20 interactions/day = $0.15–$2.00/day raw cost
- Plus storage, verification, beacon routing overhead
- $1/day covers costs with margin for infrastructure

### Path to $1/month
1. Crystallization amortizes cost (paths walked by 1000 students → free)
2. Smaller models for routine tutoring (crystallized paths don't need frontier)
3. Peer routing (students who've mastered topic help others — human compute free)
4. Batch processing (RTD mode doesn't need real-time inference)
5. Compute contributors offset platform costs via beacon network

### Tiers

| Tier | Price | What |
|---|---|---|
| Learner | $1/day (launch) → $1/month (goal) | Full access, all modes |
| Patron | Pay-what-you-feel | Support the mission, optional learning |
| Contributor | Earn credits | Provide beacon compute → offset cost |
| Sponsor | Variable | Book publishers, trade organizations |

### Asymmetric Storage Angle
From the research concept: store teaching strategies as crystal coefficients,
decode into personalized guidance without per-request reasoning. The storage
medium (crystallized paths) IS the computation (teaching).

---

## 8. Prototyping Steps

### Step 1: Single Mini-Game Class
- Pick one topic: **Fractions** (universal, verifiable, clear progression)
- Implement as a playground loop against simulated backend
- 7-axis state vector tracking understanding
- Prove the strange-loop-as-lesson concept works
- Deliverable: playable prototype, one topic, convergence visible

### Step 2: RWM/RTD Proof of Concept
- Pick one short text (public domain, educational — e.g., a chapter on
  basic chemistry or plant biology)
- Implement: user screencaps pages → AI ingests → challenge tree generated
- Build the hierarchical flow: book → chapter → paragraph → word challenges
- Test adaptive depth: does the system correctly identify which level to
  challenge at?
- Build the RTD loop: gaps identified → discuss → re-assess → pass/beacon
- Deliverable: working ingest → challenge → discuss → crystallize loop

### Step 3: Achievement Schema Design
- Choose one ladder: **Algebra I** (clear, well-defined, globally comparable)
- Map to a high-quality curriculum (baseline school TBD)
- Design 7-axis scoring for the domain
- Test: does the Fano structure naturally accommodate math progression?
- Deliverable: schema document + scoring rubric

### Step 4: Landing Page (/learn route)
- Explain the concept on earthform.ai
- Not the app yet — the vision, the verification model, the pricing
- Gauge interest, collect emails from potential users
- Deliverable: live page at earthform.ai/learn

### Step 5: Ledger & Verification Prototype
- Implement hash-chained interaction logging
- Prove: can we verify "this user learned fractions over 3 months"
  without exposing the actual conversations?
- Test privacy-preserving verification
- Deliverable: working ledger with verification demo

---

## 9. What This Is NOT

- Not a replacement for school, university, or any existing system
- Not for children (18+ only, no exceptions during dev)
- Not a diploma mill (no shortcuts — convergence is required)
- Not surveillance (user owns their data, ledger is privacy-preserving)
- Not another LLM wrapper (the crystallization architecture is the product)

---

## 10. Why Now

- AI tutors are being trained by domain experts RIGHT NOW
- Those expert-trained AIs should turn around and teach
- The Earthform infrastructure (beacons, crystallization, ledgers, needs
  model) was designed for exactly this — we just called it an OS
- Most real-world problems trace back to education gaps
- Games have solved the engagement problem — we just redirect it
- $1/day launch is sustainable; $1/month goal achievable via crystallization
