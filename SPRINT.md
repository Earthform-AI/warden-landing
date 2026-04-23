# Earthform Research Lab — Sprint

> **Updated:** 2026-04-23 | **Site:** https://earthform.ai
> **Repo:** Earthform-AI/warden-landing

---

## Current Status

The site has transitioned from a Warden (mining drone) landing page to the
**Earthform Research Lab** — a research platform for non-associative algebra,
spectral protein analysis, and Fano-structured coordination protocols.

### What's Working

| Component | Status | Notes |
|---|---|---|
| **Static site** (Astro + Tailwind) | ✅ Deployed | Research pages, mission, papers |
| **Supabase Auth** (signup/login) | ✅ Working | JWT-based, `earthform_users` table |
| **Soft Identity** (zero-friction) | ✅ Working | 256-bit API key, mesh codes |
| **Listener Registration** | ✅ Working | Register, heartbeat, discovery |
| **Contact Form** | ⚠️ Partial | Needs `contact_submissions` table migration |
| **Vercel Deployment** | ✅ Working | SSR mode with Vercel adapter |
| **Supabase Storage** | ✅ Working | `earthform-file-bucket` created |

### What Needs Work

| Item | Priority | Notes |
|---|---|---|
| **Earthform.ai email** | High | See [docs/EARTHFORM_EMAIL_SETUP.md](docs/EARTHFORM_EMAIL_SETUP.md) |
| **Routing Beacon MVP** | High | See [docs/ROUTING_BEACON_ARCHITECTURE.md](docs/ROUTING_BEACON_ARCHITECTURE.md) |
| **Migration 004** | High | `routing_beacons` + `routing_results` tables |
| **contact_submissions migration** | Medium | Table used by `/contact` but never created |
| **Legacy cleanup** | Low | Remove unused Stripe deps, orphaned Warden types |
| **Dashboard page** | Medium | Show beacon status, listener mesh, experiments |

---

## Sprint: Routing Beacon MVP

### Context

FPGA place-and-route takes 8–16 hours on open-source tools. No GPU or parallel
routing exists. But seed sweeping is embarrassingly parallel — each seed
produces an independent result. The Earthform mesh can coordinate distributed
seed sweeps using the existing soft identity + listener infrastructure.

### Sprint Items

#### Phase 0: Foundation ✅ (2026-04-23)
- [x] Add `routing-worker` to listener service types
- [x] Create `.env.example`
- [x] Fix meta URL → `https://earthform.ai`
- [x] Create email setup guide
- [x] Create routing beacon architecture doc

#### Phase 1: MVP
- [ ] **Email setup** — Get `josh@earthform.ai` working (Google Workspace)
- [ ] **Supabase SMTP** — Auth emails sent from `noreply@earthform.ai`
- [x] **Migration 004** — `routing_beacons` + `routing_results` tables ✅
- [x] ~~**Supabase Storage bucket**~~ ✅ `earthform-file-bucket` created
- [x] **POST /api/beacons/emit** — Submit routing job ✅
- [x] **GET /api/beacons/pending** — Workers poll for jobs ✅
- [x] **POST /api/beacons/fulfill** — Workers submit results ✅
- [ ] **GET /api/beacons/[id]/results** — Get results for a beacon
- [ ] **earthform-worker** — Python CLI for local routing compute
- [ ] **Dogfood: PUC v6 seed sweep** — Emit real PUC beacon, fulfill locally

#### Phase 2: Dashboard & Dogfooding
- [ ] Beacon status page on earthform.ai
- [ ] Worker metrics (jobs completed, compute time)
- [ ] Result comparison view (seed × Fmax table)
- [ ] Multi-seed PUC builds orchestrated through beacon system
- [ ] Ledger viewer (hash-chained build provenance)

#### Phase 3: Public Beta
- [ ] `pip install earthform-worker` (PyPI)
- [ ] Contributor documentation
- [ ] Multiple device families (ice40, gowin, nexus)
- [ ] Beacon priority tiers
- [ ] Encrypted beacons (design privacy)

---

## Identity & Auth Checklist

- [x] Supabase project created + migrations 001-003 applied
- [x] Soft identities working (visible in Supabase dashboard)
- [x] Listener registration working
- [ ] Earthform.ai email forwarding configured
- [ ] Supabase custom SMTP configured
- [ ] Full signup → email confirmation → login flow tested end-to-end
- [ ] NAL CLI `earthform login/claim` commands implemented

---

## Revenue Model (Long-Term)

| Tier | What You Get | Price |
|---|---|---|
| **Free** | Donate compute ↔ use compute. Community seed sweeps. | $0 |
| **Pro** | Priority routing. More seeds. Design privacy. | $29/mo |
| **Team** | Dedicated workers. SLA on routing time. API access. | $99/mo |
| **Enterprise** | On-prem workers. Custom device support. | Contact |

See [docs/FUNDING_ROADMAP.md](docs/FUNDING_ROADMAP.md) for broader funding strategy.

---

## Reference

- [Routing Beacon Architecture](docs/ROUTING_BEACON_ARCHITECTURE.md)
- [Email Setup Guide](docs/EARTHFORM_EMAIL_SETUP.md)
- [LLC Formation Guide](docs/LLC_FORMATION_GUIDE.md)
- [Funding Roadmap](docs/FUNDING_ROADMAP.md)
- Legacy sprint: [_archive/SPRINT_legacy_warden.md](_archive/SPRINT_legacy_warden.md)
