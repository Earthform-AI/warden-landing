# Earthform AI — Funding Roadmap

**Date:** 2026-04-14  
**Status:** Draft for review  
**Runway:** ~3 months  
**Goal:** Layer funding sources by timeline to bridge the gap and build sustainable revenue

---

## Timeline Overview

```
    NOW          Month 1         Month 2         Month 3         Month 6         Month 12
     │              │               │               │               │               │
     ├──── LLC + SAM.gov ──────────┤               │               │               │
     ├──── GitHub Sponsors + Open Collective ──────┤               │               │
     ├──── BioRxiv preprint ───────┤               │               │               │
     │              ├── Consulting outreach ────────┼───────────────┤               │
     │              ├── Alpha Foundation app ───────┤               │               │
     │              │               ├── Service pilot (2-3 clients)─┤               │
     │              │               ├── SBIR Phase I submission ────┼───────────────┤
     │              │               │               ├── NSF/NIH submission ─────────┤
     │              │               │               │               │    Awards ────┤
```

---

## Track 1: Immediate Revenue (Weeks 1–4)

### 1A. Consulting / Contract Research

**What:** Offer protein structural analysis expertise to biotech companies, pharma startups, and academic labs.

**Pricing guidance:**
- Academic collaboration: $75–$125/hr
- Biotech consulting: $150–$250/hr
- Retained advisory: $2,000–$5,000/month

**Where to find clients:**
- **BioSpace job boards** — look for "computational structural biology" contract roles
- **Upwork / Toptal** — bioinformatics consulting gigs ($80–$200/hr for niche expertise)
- **LinkedIn** — direct outreach to structural biology groups at startups
- **Freelance platforms:** Kolabtree (science-specific), Scientist.com
- **University contacts** — labs that need ENM analysis but don't have the expertise

**Pitch (for biotech):**
> "We analyze protein structures using a novel spectral decomposition method that identifies domain boundaries, hinge sites, and allosteric mechanisms from a single static structure — no MD simulations needed. Published on PyPI, MIT-licensed, validated on [X] proteins. We can classify your target proteins and identify functional sites in days, not weeks."

**First actions:**
1. Create a 1-page "Earthform AI Consulting" PDF (company overview + IBP-ENM capabilities + pricing)
2. Identify 10 biotech startups working on protein engineering (AngelList, Crunchbase filters: "protein engineering" + "seed/Series A" + "computational")
3. Email cold outreach to their CTO/Head of Computational Biology
4. Post on BioStars, ResearchGate offering analysis services

### 1B. GitHub Sponsors & Open Collective

**Effort:** 30 minutes to set up, ongoing passive income.

**Steps:**
1. Enable GitHub Sponsors on the `Earthform-AI` org
2. Create tiers:
   - $5/mo — "Supporter" (name in README)
   - $25/mo — "Researcher" (priority issue responses)
   - $100/mo — "Lab" (1hr/month consulting call)
   - $500/mo — "Enterprise" (dedicated support + custom analysis)
3. Add a `FUNDING.yml` to `ibp-enm` repo
4. Add a "Support" section to the README
5. Consider Open Collective for transparent expense tracking (helpful for grant narrative)

**Expected revenue:** Be realistic — $50–$500/month initially. Useful for signaling community engagement to grant reviewers more than as a revenue source.

### 1C. BioRxiv Preprint

**Not revenue directly, but unlocks everything else.** A preprint is the single most important artifact for credibility with grant reviewers, collaborators, and potential clients.

**Suggested structure:**
1. **Title:** "Instrument-Based Probing of Elastic Network Models: Zero-Parameter Protein Archetype Classification via Spectral Thermodynamic Decomposition"
2. **Abstract:** 150 words covering method + result
3. **Introduction:** ENM background, limitations of existing methods (DynDom requires two structures, ML methods need training data)
4. **Methods:**
   - ENM construction + Fiedler partitioning (zero-parameter domain detection)
   - 7 thermodynamic instruments (each with equation)
   - AlgebraicFickBalancer derivation (sedenion spectral constants)
   - LensStack architecture
5. **Results:**
   - 12-protein benchmark: 100% HingeLens accuracy
   - 52-protein benchmark: 57.7% zero-parameter vs 53.8% 5-parameter baseline
   - 865-protein GNCA: 64.1% (shows the data pipeline scales)
6. **Discussion:** Why zero parameters matters, connection to Fano geometry, limitations, future work
7. **Code & Data:** Link to PyPI package, GitHub repo, benchmark corpora

**Target length:** 8–12 pages + supplementary materials.

---

## Track 2: Fast-Turnaround Grants (Months 1–3)

### 2A. Alpha Foundation for the Improvement of Mine Safety and Health

**URL:** https://www.alpha-foundation.org/  
**Amount:** Up to $500K  
**Cycle:** Annual (typically opens Q1–Q2, check website for current deadlines)  
**Turnaround:** ~6 months from submission to award  
**Match:** HIGH — directly funds mining safety technology

**Narrative for application:**
- Underground mining remains globally dangerous (cite MSHA injury/fatality stats from `earthform_mining_safety_baselines.json`)
- Current monitoring is passive (fixed sensors, manual checks)
- Earthform AI is developing autonomous monitoring using evolutionary convergence on FPGA hardware (PUC + NAL)
- The system models environmental threats as 7-axis state vectors matching hardware architecture
- Phones/drones serve as mobile sensor platforms coordinated through the Earthform mesh

**Deliverables you could offer:**
- Working prototype of NAL consciousness block for gas/temperature monitoring
- Simulated underground environment test
- PUC hardware demonstration (ULX3S running convergence loops for threat classification)

### 2B. Small Foundation Grants

| Foundation | Amount | Focus | Fit |
|-----------|--------|-------|-----|
| **Sloan Foundation** | $50K–$250K | Technology, data science, basic research | IBP-ENM as novel computational biology tool |
| **Moore Foundation** | $50K–$500K | Scientific research, environmental | Protein analysis for environmental biology |
| **Kavli Foundation** | Varies | Nanoscience, neuroscience, astrophysics | Stretch — would need to emphasize fundamental physics |
| **Research Corporation** | $35K–$100K | Physical sciences, early-career | Good if you affiliate with a university |

### 2C. Cloud Credits (not cash, but saves cash)

| Provider | Program | Amount | How |
|----------|---------|--------|-----|
| **AWS** | AWS Activate for Startups | $5K–$100K credits | Apply with LLC + pitch |
| **Google Cloud** | Startup Program | $2K–$100K credits | Apply with LLC |
| **Microsoft** | Founders Hub | $1K–$150K credits | Apply with LLC |
| **Paperspace** | Startup Program | $5K GPU credits | Apply — good for GNCA training |

These are almost always approved for early-stage companies. Apply to all four.

---

## Track 3: SBIR Phase I (Months 2–6)

**What:** $50K–$275K over 6–12 months, non-dilutive (you keep 100% equity).  
**Prerequisite:** LLC + EIN + SAM.gov registration.

### Best-Fit Agencies

#### NSF SBIR (America's Seed Fund)
- **Topic:** Biological Technologies (BT) or Information/Intelligent Systems (IIS)
- **Amount:** $275K for Phase I
- **Cycle:** Open solicitations year-round
- **Pitch:** "IBP-ENM: Zero-parameter protein structural classification as a cloud service for drug discovery"
- **Match:** HIGH — novel computational biology tool with immediate applications

#### NIH SBIR
- **Topic:** Bioinformatics and Computational Biology
- **IC:** NIGMS (General Medical Sciences) or NLM (National Library of Medicine)
- **Amount:** $275K Phase I
- **Cycle:** Standard receipt dates (Jan 5, Apr 5, Sep 5 annually)
- **Pitch:** Same as NSF but emphasize drug target identification and allosteric mechanism detection

#### DOE SBIR
- **Topic:** Advanced Scientific Computing
- **Amount:** $200K Phase I
- **Pitch:** "Parallel Universe Computer: evolutionary computation on FPGA for scientific optimization"

### SBIR Application Components

1. **Specific Aims** (1 page) — what you'll do + why it matters + commercial potential
2. **Research Strategy** (6 pages for NSF, varies by agency)
   - Significance and Background
   - Technical Approach
   - Anticipated Results
   - Team and Capabilities
3. **Budget** — typically salary + materials + cloud compute + travel
4. **Commercialization Plan** (2 pages) — who will buy this, how will you sell it, market size
5. **Biographical Sketch** — your CV in NSF/NIH format

---

## Track 4: Major Grants (Months 3–12)

### NSF Proposals

#### MCB: Molecular & Cellular Biosciences
- **Cluster:** Molecular Biophysics / Structural Biology
- **Amount:** $150K–$500K over 2–3 years
- **Pitch:** IBP-ENM as a new theoretical framework for protein analysis
- **Deadline:** Various (check current solicitations)
- **Note:** Best as co-PI with a university-affiliated structural biologist

#### CCF: Computing & Communication Foundations
- **Cluster:** Foundations of Emerging Technologies
- **Amount:** $200K–$500K over 2–3 years
- **Pitch:** PUC + NAL as a novel evolutionary computing architecture with crystallization (Baldwin Effect in hardware)

### NIH R21 (Exploratory/Developmental)
- **Amount:** $275K over 2 years
- **Pitch:** "Novel Spectral Methods for Zero-Parameter Protein Structural Classification"
- **Advantage:** Explicitly for high-risk, high-reward methodology — perfect for IBP-ENM
- **Disadvantage:** Competitive (~15% funding rate)

### Chan Zuckerberg Initiative (CZI)
- **Program:** Essential Open Source Software for Science (EOSS)
- **Amount:** $50K–$250K
- **Pitch:** IBP-ENM is MIT-licensed, on PyPI, and provides open-source tools for structural biology
- **Cycle:** Annual (typically opens mid-year)
- **Match:** HIGH — they specifically fund maintenance and improvement of open-source scientific software

### Wellcome Trust Discovery Research
- **Amount:** Up to £500K over 2–3 years
- **Pitch:** Unconventional, physics-first approach to protein structural analysis
- **Note:** UK-based but funds international researchers

---

## Revenue Projections (Conservative)

| Source | Month 1 | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|---------|----------|
| Consulting | $0 | $2,000 | $4,000/mo | $5,000/mo |
| GitHub Sponsors | $0 | $100 | $200/mo | $500/mo |
| Service clients | $0 | $0 | $2,000/mo | $5,000/mo |
| Grants | $0 | $0 | $0 | $50K–$275K lump |
| Cloud credits | $5K value | $5K value | $5K value | — |
| **Total cash** | **$0** | **$2,100** | **$6,200/mo** | **$10,500/mo + grants** |

These numbers are conservative. Even one SBIR Phase I transforms the picture.

---

## Action Items (First 30 Days)

| Week | Action | Blocks |
|------|--------|--------|
| Week 1 | File LLC + EIN | Nothing |
| Week 1 | Register SAM.gov | LLC + EIN |
| Week 1 | Set up GitHub Sponsors on Earthform-AI org | Nothing |
| Week 1 | Start IBP-ENM integration tests (REVIEW_PROPOSAL Phase 1) | Nothing |
| Week 2 | Open business bank account | LLC + EIN |
| Week 2 | Apply for cloud credits (AWS, GCP, Azure, Paperspace) | LLC |
| Week 2 | Begin BioRxiv preprint draft | Integration tests done |
| Week 2 | Research Alpha Foundation current cycle dates | Nothing |
| Week 3 | Create consulting pitch document | LLC |
| Week 3 | Cold outreach to 10 biotech startups | Pitch doc |
| Week 3 | Contact 3 structural biology PIs for collaboration | Preprint draft |
| Week 4 | Submit preprint to BioRxiv | Preprint done |
| Week 4 | Begin Alpha Foundation or SBIR application | SAM.gov active |
