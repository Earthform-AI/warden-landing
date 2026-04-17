# Earthform AI — LLC Formation Guide

**Date:** 2026-04-14  
**Status:** Draft for review  
**Goal:** Register Earthform AI as a legal entity to unlock SBIR/STTR funding and formalize consulting/service revenue

---

## Why LLC First (Not C-Corp)

| Factor | LLC | C-Corp |
|--------|-----|--------|
| Formation cost | $50–$300 (state filing) | $50–$300 (state filing) |
| Annual compliance | Minimal (annual report, ~$50) | Board minutes, stock ledger, annual report |
| Tax flexibility | Pass-through (no double taxation) | Double taxation unless S-election |
| SBIR eligibility | ✅ Yes (since 2012 for LLCs) | ✅ Yes |
| VC compatible | ❌ Harder (must convert later) | ✅ Preferred |
| Solo founder friendly | ✅ Single-member LLC is simplest | Overkill for 1 person |
| Convert later | LLC → C-Corp is common, ~$500-$1000 with a lawyer | N/A |

**Recommendation:** Start as an LLC. Convert to C-Corp only if/when you pursue venture capital. SBIR/STTR, grants, and consulting all work fine with an LLC.

---

## Step-by-Step Formation

### Step 1: Choose Your State (~15 minutes)

**Recommended: Your state of residence** (avoids foreign qualification fees).

> If you're in a high-fee state (CA: $800/yr minimum franchise tax), consider Wyoming or Delaware formation + foreign qualification in your home state. For most states, forming in your home state is cheapest and simplest.

| State | Filing Fee | Annual Fee | Notes |
|-------|-----------|------------|-------|
| Wyoming | $100 | $60 | No state income tax, privacy-friendly |
| Delaware | $90 | $300 | Gold standard for C-Corps, less relevant for LLC |
| Texas | $300 | $0 | No franchise tax under $2.47M revenue |
| Most states | $50–$300 | $0–$100 | Check your state's Secretary of State website |

### Step 2: Choose a Registered Agent (~15 minutes)

A registered agent receives legal documents on behalf of the LLC. Required in all states.

**Options:**
- **Yourself** (if you have a physical address in the formation state) — Free
- **Commercial agent** (Northwest Registered Agent, Incfile, etc.) — $50–$150/yr
- **Your attorney** — $200+/yr

For a solo founder, using yourself is fine initially.

### Step 3: File Articles of Organization (~30 minutes)

File with your state's Secretary of State (or equivalent). Most states have online filing.

**Information needed:**
- LLC name: **Earthform AI LLC** (or "Earthform AI, LLC")
  - Check name availability on your state's business name search first
  - If "Earthform AI" is taken, try "Earthform AI Research LLC" or "Earthform Instruments LLC"
- Registered agent name and address
- Principal office address (can be home address)
- Organizer name (you)
- Management structure: **Member-managed** (simplest for solo)

**Filing fee:** $50–$300 depending on state. Expect approval in 1–10 business days.

### Step 4: Get an EIN (~10 minutes, free)

**Federal Employer Identification Number** from the IRS. Required for:
- Opening a business bank account
- Filing taxes
- SBIR/STTR applications
- Contract work

**How:** [IRS EIN Online Application](https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online)
- Free, instant approval
- Available Monday–Friday, 7am–10pm Eastern
- You'll get your EIN immediately upon completion

### Step 5: Write an Operating Agreement (~1 hour)

Not legally required in most states for single-member LLCs, but **essential** for:
- Bank account opening (many banks require it)
- SBIR applications (demonstrates organizational structure)
- Liability protection

**Key sections for a single-member LLC:**
1. Company name and purpose
2. Member name (you) with 100% ownership
3. Capital contributions
4. Profit/loss allocation (100% to you)
5. Management authority (you manage everything)
6. Banking resolution (authorize yourself to open accounts)
7. Dissolution provisions

**Free templates:** SCORE.org, Northwest Registered Agent, or use a service like LegalZoom (~$100).

### Step 6: Open a Business Bank Account (~1 hour in person, or online)

**Required documents:**
- Articles of Organization (from Step 3)
- EIN letter (from Step 4)
- Operating Agreement (from Step 5)
- Government-issued ID

**Recommended banks:**
- **Mercury** — online, startup-friendly, free, integrates with everything
- **Relay** — online, free, good for separating revenue streams
- **Local credit union** — if you prefer in-person

**Important:** Keep business and personal finances completely separate from day one. This protects your LLC's liability shield.

### Step 7: Set Up Basic Tax Infrastructure (~1 hour)

- **Accounting:** Wave (free) or QuickBooks Self-Employed (~$15/mo)
- **Tax filing:** Single-member LLC files on Schedule C of your personal return (Form 1040)
- **Quarterly estimated taxes:** If you expect to owe >$1,000/yr, file Form 1040-ES quarterly
- **State taxes:** Varies — check your state's requirements

### Step 8: SBIR/STTR Registration (~2 hours, free)

Once you have the LLC + EIN, register with these systems immediately:

1. **SAM.gov** (System for Award Management)
   - Required for ALL federal grants and contracts
   - Free registration, takes 7–10 business days to process
   - You'll need a UEI (Unique Entity Identifier) — SAM generates this
   - **Do this ASAP** — the processing time is the bottleneck

2. **Grants.gov**
   - Required for submitting federal grant applications
   - Uses SAM.gov credentials
   - Free

3. **SBA Company Registry** (for SBIR/STTR specifically)
   - https://www.sbir.gov/registration
   - Links to SAM.gov
   - Certify as small business (<500 employees)

4. **NSF Research.gov**
   - Required for NSF proposals specifically
   - Free, relatively quick

5. **eRA Commons** (NIH)
   - Required for NIH proposals
   - Needs institutional PI registration
   - Processing: 2–8 weeks

---

## Estimated Timeline

| Day | Action | Cost |
|-----|--------|------|
| Day 1 | File Articles of Organization + get EIN | $50–$300 |
| Day 1 | Write Operating Agreement | $0–$100 |
| Day 2 | Open bank account | $0 |
| Day 2 | Register on SAM.gov | $0 |
| Day 3 | Set up accounting (Wave/QuickBooks) | $0–$15/mo |
| Day 7–14 | SAM.gov registration completes | — |
| Day 7–14 | Register on Grants.gov, SBA, Research.gov | $0 |
| Day 14–30 | eRA Commons registration completes | $0 |

**Total cost: $50–$400 one-time + $0–$180/yr maintenance**

---

## Domain & Branding Checklist

- [ ] Verify **earthform.ai** domain ownership (already have it based on pyproject.toml URLs)
- [ ] Ensure LLC name matches or is clearly connected to the domain
- [ ] Update `pyproject.toml` author to "Earthform AI LLC" (after formation)
- [ ] Add LLC designation to any public-facing materials used in grant applications

---

## SBIR Eligibility Quick Reference

To qualify for SBIR/STTR, **Earthform AI LLC** must:

- [x] Be a US-based small business (< 500 employees)
- [x] Be for-profit (LLCs qualify)
- [x] Be majority US-owned and independently operated
- [ ] Have a PI who is primarily employed by the company (>51% of time during award)
  - **This is the tricky one for a solo founder** — you must commit majority effort to the SBIR work during the award period. If you have another full-time job, this may disqualify you unless you transition.
- [ ] Registered in SAM.gov (Step 8 above)

### STTR Difference
STTR (Small Business Technology Transfer) **requires** a research institution partner (university, FFRDC, or nonprofit). If you affiliate with a university PI (see funding roadmap), STTR opens up with more flexible PI employment requirements.

---

## Tax Notes for Grant Revenue

- **Federal grants are taxable income** to the LLC
- **SBIR Phase I** ($50K–$275K over 6–12 months) is reported as business income
- R&D expenses (hardware, cloud, software) are deductible
- **Keep receipts for everything:** ULX3S boards, hosting, compute credits, travel to conferences
- Consider a **fiscal sponsor** (e.g., Open Collective Foundation, NumFOCUS) if you want 501(c)(3) benefits for certain grants — but this adds complexity

---

## IP Protection Notes

Before bringing external attention to IBP-ENM:

- [x] Open-source (MIT licensed) — this is fine for grants and actually preferred by NSF/NIH
- [ ] Consider **provisional patent** (~$200 solo inventor, USPTO) on the 7-instrument thermodynamic band method IF you want to commercialize beyond open-source
  - A provisional gives 12 months of "patent pending" protection
  - Publishing a preprint before filing creates prior art (your own) — file the provisional first if you care about patents
  - Many grant reviewers actually prefer open-source and see patents as unnecessary for academic work
- **Recommendation:** Don't patent unless you have a specific commercial licensing strategy. Open-source + consulting/services is a better fit for your current position.
