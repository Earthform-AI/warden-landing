# Website Refresh Plan — earthform.ai

**Date:** 2026-05-04  
**Current state:** Research lab landing + beacon MVP (partially built)  
**Goal:** Refresh navigation and site structure to accommodate /learn and
/machinelearn routes, while cleaning up the overall site identity.

---

## 1. Current Site Map

```
/                  — Hero + research threads + community CTA
/research          — Index of 4 research threads
/research/*        — Individual thread pages (4)
/papers            — Preprint manuscripts
/mission           — About page (methodology, results, direction)
/privacy           — Privacy policy
/terms             — Terms of service
/contact           — Contact form (endpoint)
/api/*             — Beacon + webhook endpoints
```

## 2. Proposed Site Map

```
/                  — Hero + value prop (research + learn + build)
/research          — Research threads (existing, refresh copy)
/research/*        — Individual thread pages (existing)
/papers            — Papers (existing)
/learn             — Learning platform concept/waitlist (NEW)
/transparency      — AI training transparency (NEW)
/mission           — About + methodology (existing, refresh)
/beacon            — Beacon network status/dashboard (Phase 2)
/privacy           — Privacy policy (existing)
/terms             — Terms of service (existing)
```

## 3. Navigation Refresh

### Current nav:
```
Home | Research | Papers | About | Contact
```

### Proposed nav:
```
Home | Research | Learn | Papers | About
```

- "Contact" moves to footer (it's a section on the homepage anyway)
- "Learn" added as primary nav item (even before app is live — the
  concept page drives interest)
- "About" stays (rename from "Mission" label isn't needed — it's already
  "About" in nav, just routes to /mission)
- /transparency linked from /learn and /research (not in top nav — it's
  a depth page, not a primary destination)

## 4. Homepage Refresh

The homepage currently leads with pure research. With /learn, the value prop
broadens. Suggested structure:

### Section 1: Hero (Refresh)
- Keep: "Earthform Research Lab" identity
- Add: Brief mention of the learning mission
- Tagline shift: from pure research to "research that teaches"
- Keep the research CTA, add a /learn CTA

### Section 2: Three Pillars (NEW)
Replace the immediate dive into 4 research threads with a higher-level
framing:

| Pillar | Route | One-liner |
|---|---|---|
| **Research** | /research | Non-associative algebra, proteins, music, error correction |
| **Learn** | /learn | Verifiable education. Games. Real knowledge. $1/day → $1/month. |
| **Build** | /beacon | Distributed compute. Contribute cycles, get routing done. |

### Section 3: Research Highlights (Existing, condensed)
- Keep the 4-thread cards
- Move below the pillars (they're still prominent, just not THE lead)

### Section 4: Community + CTA (Existing)
- Discord + email signup (keep as-is)

## 5. Pricing Strategy

**Launch:** $1/day ($30/month) — honest about inference costs at scale.
**Goal:** $1/month — achievable as crystallization amortizes costs.
**Framing:** "As the system learns to teach better, the price drops. Our goal
is $1/month. We'll get there together."

Tiers:
| Tier | Price | What |
|---|---|---|
| Learner | $1/day (launch) → $1/month (goal) | Full access |
| Patron | Pay-what-you-feel | Support without active study |
| Compute contributor | Earn credits | Provide beacon compute → offset cost |

---

## 6. /learn Page (Initial — Pre-App)

A concept/waitlist page. Not the app itself. Content:

1. **Hook:** "Learn real things. Prove you know them."
2. **The Problem:** Education is expensive, degrees are gatekept, games
   are engaging but teach nothing.
3. **The Approach:** Mini-games + AI tutoring + cryptographic proof of
   learning. Brain Games meets verified credentials.
4. **How It Works:** (simplified)
   - Screencap your book → system generates personalized challenges
   - Play challenge games at every level (chapter → word)
   - Get stuck → system adapts or connects you to help
   - Master a topic → it's cryptographically yours forever
   - Accumulate mastery → achieve curriculum milestones
5. **Modes:** Mini-games • Read With Me • Read Then Discuss • Exploration • Offline
6. **Pricing:** $1/day at launch, goal of $1/month as system learns.
   Pay-what-you-feel for supporters. Compute contributors earn credits.
7. **Waitlist CTA:** Email signup for launch notification

## 7. /transparency Page (Initial)

Long-form explanatory content (like /mission). Sections:

1. How Our AI Learns (strange loop visual)
2. From Expert to Student (crystallization pipeline)
3. What We Can Prove (ledger verification)
4. The Architecture (signal architecture diagram)
5. Open Research (links to experiments, papers)
6. Connection to /learn (how this powers human education)

## 8. Cleanup Tasks

| Task | Priority | Notes |
|---|---|---|
| Remove Stripe deps | Low | No payment processing yet |
| Update nav config | High | Add /learn link |
| Refresh hero copy | High | Broaden beyond pure research |
| Update site.config.ts meta | Medium | SEO for new pages |
| Legacy Warden types cleanup | Low | Still in codebase |
| Update footer copyright year | Low | If still says 2025 |

## 9. Implementation Order

1. **Nav update** — Add "Learn" to navigation (site.config.ts)
2. **Create /learn page** — Astro page with waitlist content
3. **Create /machinelearn page** — Long-form explanatory
4. **Homepage hero refresh** — Broaden tagline, add pillars section
5. **Homepage structure** — Add three-pillar section above research cards
6. **Meta/SEO updates** — Update description, keywords, OG tags
7. **Deploy & test** — Verify all routes, check mobile, validate build

---

## 10. Design Notes

- Keep the existing dark theme (bg-black, text-white, blue/green gradient)
- /learn page should feel slightly warmer/more inviting than /research
  (it's consumer-facing, not just researchers)
- /machinelearn stays technical (same vibe as /mission)
- Consider: a simple animated visualization for the strange loop on
  /machinelearn (React + Framer Motion — already in deps)
- The "three pillars" section on homepage could use the same card style
  as the research threads, just with different content
