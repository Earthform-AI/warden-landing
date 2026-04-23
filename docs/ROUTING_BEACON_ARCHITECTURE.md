# Earthform Routing Beacon — Architecture

> **Status:** Draft 2026-04-23. Builds on existing Supabase coordination layer.
> **Scope:** Distributed FPGA P&R seed-sweep using the Earthform mesh.

---

## Problem

FPGA place-and-route for any non-trivial design on open-source tools (nextpnr)
takes 8–16 hours per run. The routing algorithm is single-threaded; no GPU or
parallel version exists. But seed sweeping is embarrassingly parallel — each
seed produces an independent P&R result.

Different seeds explore different placement/routing solutions. The quality
variation is significant: on PUC v6 (ECP5-85F, ~51% LUT utilization), the same
design can route at 15 MHz with one seed and 28 MHz with another. **The first
result to finish is not necessarily the best.** Running 16 seeds in parallel
across 16 machines means:

- The **first success** arrives within one run-time (an immediate fallback)
- The **best result** arrives once all seeds complete (or a deadline passes)
- More seeds = better statistical coverage of the solution space
- The beacon stays open until `seeds_completed >= seeds_requested` or the
  emitter cancels it — workers keep contributing even after the first result

## Concept

```
Developer → POST /api/beacons/emit (design netlist + constraints + channel)
         → Earthform mesh → channel-matched routing listeners notified
         → Each listener: nextpnr-ecp5 --seed $ASSIGNED_SEED
         → POST /api/beacons/fulfill (result: Fmax, config, log)
         → Ledger entry: design_hash, seed, Fmax, contributor
         → Developer reviews all results, picks best Fmax
         → Seed→Fmax mapping recorded for future crystallization
```

## Architecture

### What Already Exists (warden-landing)

| Component | Status | Used By Routing Beacon |
|---|---|---|
| `soft_identities` table | ✅ Working | Compute contributors claim identity |
| `registered_listeners` table | ✅ Working | Contributors register as routing workers |
| `POST /api/identity/claim` | ✅ Working | Zero-friction onboarding |
| `POST /api/listeners/register` | ✅ Working | Register with capability |
| `POST /api/listeners/heartbeat` | ✅ Working | Availability tracking |
| `GET /api/listeners` | ✅ Working | Discover available routers |
| Supabase Auth (JWT) | ✅ Working | Full account users |
| Mesh codes | ✅ Working | Device pairing |

### What's New (Phase 1 — MVP)

| Component | Type | Purpose |
|---|---|---|
| `routing_beacons` table | Migration | Job queue: design hash, constraints, status |
| `routing_results` table | Migration | Completed runs: seed, Fmax, contributor |
| `POST /api/beacons/emit` | API route | Submit a routing job |
| `GET /api/beacons/pending` | API route | Workers poll for available jobs |
| `POST /api/beacons/fulfill` | API route | Submit a completed result |
| `GET /api/beacons/:id/results` | API route | Get all results for a beacon |
| `earthform-worker` CLI | Python script | Local worker that polls + runs nextpnr |

---

## Database Schema (Migration 004)

```sql
-- Routing beacons: jobs submitted by developers
create table routing_beacons (
  id          uuid primary key default gen_random_uuid(),
  -- Owner (full account or soft identity)
  user_id           uuid references auth.users(id),
  soft_identity_id  uuid references soft_identities(id),
  constraint beacon_owner_check check (
    (user_id is not null)::int + (soft_identity_id is not null)::int = 1
  ),

  -- Design specification
  design_hash   text not null,               -- blake3 hash of design JSON
  device_family text not null default 'ecp5', -- ecp5, ice40, gowin, etc.
  device_size   text not null default '85k',  -- 85k, 25k, 45k, etc.
  package       text not null default 'CABGA381',
  freq_target   real not null default 25.0,   -- MHz
  extra_flags   text default '',              -- additional nextpnr flags
  
  -- Storage reference (design JSON + LPF uploaded to Supabase Storage)
  design_url    text,                         -- signed URL or storage path
  lpf_url       text,                         -- constraints file

  -- Channels & reply targets
  channel       text default 'public',        -- filter channel (null = public)
  reply_to      text,                         -- webhook URL or soft_identity for push notify
  seed_sequence text default 'golden',        -- 'golden' (deterministic) or 'random'

  -- Job state
  status        text not null default 'pending'
    check (status in ('pending', 'active', 'completed', 'cancelled')),
  seeds_requested int not null default 8,     -- how many seeds to run
  seeds_completed int not null default 0,
  best_fmax     real,                         -- best Fmax achieved so far

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Results from individual seed runs
create table routing_results (
  id          uuid primary key default gen_random_uuid(),
  beacon_id   uuid not null references routing_beacons(id) on delete cascade,

  -- Who ran this seed
  contributor_id    uuid,                     -- soft_identity_id of the worker
  contributor_label text,                     -- human label of the contributor

  -- Run details
  seed        int not null,
  seed_index  int,                            -- position in deterministic sequence
  fmax_mhz    real,                           -- achieved Fmax (null if failed)
  timing_met  boolean default false,          -- fmax >= freq_target
  lut_util    real,                           -- LUT utilization %
  route_time  real,                           -- seconds to complete routing
  status      text not null default 'running'
    check (status in ('running', 'completed', 'failed', 'timeout')),

  -- Result artifacts
  config_url  text,                           -- .config file (Supabase Storage)
  log_url     text,                           -- P&R log file
  timing_url  text,                           -- timing JSON report

  -- Ledger
  result_hash text,                           -- blake3(config + log)
  prev_hash   text,                           -- chain to previous result

  created_at  timestamptz not null default now(),
  completed_at timestamptz
);

-- Index for worker polling
create index idx_routing_beacons_pending
  on routing_beacons(status, created_at)
  where status = 'pending' or status = 'active';

-- Index for results by beacon
create index idx_routing_results_beacon
  on routing_results(beacon_id, fmax_mhz desc nulls last);

-- RLS: beacon owners see their own beacons, workers see pending beacons
alter table routing_beacons enable row level security;
alter table routing_results enable row level security;

-- Anyone authenticated can see pending beacons (needed for workers)
create policy "Workers can view active beacons"
  on routing_beacons for select
  using (status in ('pending', 'active'));

-- Owners can see all their beacons
create policy "Owners see own beacons"
  on routing_beacons for select
  using (
    auth.uid() = user_id
    or soft_identity_id in (
      select id from soft_identities where adopted_by = auth.uid()
    )
  );

-- Insert restricted to authenticated users
create policy "Authenticated users can emit beacons"
  on routing_beacons for insert
  with check (auth.uid() = user_id or soft_identity_id is not null);

-- Results: anyone can view, contributors can insert
create policy "Anyone can view results"
  on routing_results for select
  using (true);

create policy "Contributors can submit results"
  on routing_results for insert
  with check (true);  -- validated at API level
```

---

## API Routes

### POST /api/beacons/emit

Submit a routing beacon (job).

```typescript
// Request
{
  device_family: "ecp5",
  device_size: "85k",
  package: "CABGA381",
  freq_target: 25.0,
  seeds_requested: 8,
  extra_flags: "--freq 15",
  channel: "ecp5",                // optional, default "public"
  reply_to: "https://hooks...",   // optional webhook for push notify
  seed_sequence: "golden",        // optional, default "golden"
  // Design JSON + LPF uploaded separately to Supabase Storage
  design_storage_path: "designs/<hash>/design.json",
  lpf_storage_path: "designs/<hash>/constraints.lpf"
}

// Response
{
  beacon_id: "uuid",
  design_hash: "blake3...",
  status: "pending",
  seeds_requested: 8,
  channel: "ecp5",
  assigned_seeds: [731542809, 1463085618, ...]  // pre-computed sequence
}
```

### GET /api/beacons/pending

Workers poll this to find jobs. Filtered by the worker's subscribed channels.

```typescript
// Query: ?channels=public,ecp5  (from worker's listener metadata)

// Response
{
  beacons: [
    {
      id: "uuid",
      device_family: "ecp5",
      device_size: "85k",
      freq_target: 25.0,
      seeds_completed: 3,
      seeds_requested: 8,
      design_url: "signed-url...",
      lpf_url: "signed-url...",
      extra_flags: "--freq 15",
      channel: "ecp5",
      next_seed: 2194628427,     // next unassigned seed from sequence
      next_seed_index: 3
    }
  ]
}
```

### POST /api/beacons/fulfill

Workers submit completed results.

```typescript
// Request
{
  beacon_id: "uuid",
  seed: 42,
  fmax_mhz: 28.32,
  timing_met: true,
  lut_util: 56.7,
  route_time: 47168.75,
  status: "completed",
  config_storage_path: "results/<beacon_id>/seed_42.config",
  log_storage_path: "results/<beacon_id>/seed_42.log",
  result_hash: "blake3..."
}

// Response
{
  result_id: "uuid",
  is_best: true  // was this the best Fmax so far?
}
```

---

## Worker CLI (`earthform-worker`)

A simple Python script that PUC/NAL developers (and eventually anyone) can run
to contribute routing compute:

```bash
# Install
pip install earthform-worker  # (or just clone and run)

# Claim identity (first time)
earthform-worker claim --label "josh-comfyui"

# Start listening for routing jobs
earthform-worker listen --device ecp5 --max-seeds 4
```

The worker:
1. Claims a soft identity (if not already done)
2. Registers as a listener with `service_type: 'routing-worker'`
3. Polls `GET /api/beacons/pending` every 30 seconds
4. When a beacon arrives:
   - Downloads design JSON + LPF from Supabase Storage
   - Picks a random seed (not already claimed by another worker)
   - Runs `nextpnr-ecp5 --seed $SEED --json design.json --lpf constraints.lpf ...`
   - Uploads result config + log to Supabase Storage
   - Calls `POST /api/beacons/fulfill` with Fmax and result hash
5. Heartbeats while idle

### Security Considerations

- **Design files are public** within the mesh. If you don't want your design
  shared, don't emit a beacon. (Later: encrypted beacons for trusted mesh only.)
- **Workers are untrusted**. Results must be verifiable:
  - `result_hash = blake3(config_file)` — developer can verify locally
  - Fmax claims are checked by downloading the .config and running `ecppack` + timing analysis
  - Malicious results just waste a seed slot (no harm to developer)
- **No code execution beyond nextpnr** — the worker runs a known binary on a JSON netlist.
  No arbitrary code paths. The design JSON is a Yosys-generated netlist, not executable.

---

## Seed Strategy

### Why seed selection matters

Random seeds are unstructured — two workers might accidentally pick adjacent
seeds that explore similar placement regions. A deliberate seed strategy
extracts more information per compute-hour.

### Deterministic spread (default)

When a beacon requests `N` seeds, the emit endpoint assigns seed values using
golden-ratio spacing across the 32-bit seed space:

```
seed[i] = floor((i + 0.5) × 2^32 / N) mod 2^32
```

This guarantees maximum separation between seeds regardless of how many workers
participate. Workers claim the *next unassigned seed* from the sequence rather
than picking randomly. The sequence is deterministic from the beacon's UUID, so
any party can verify which seeds were assigned.

### Warm starting (crystallization)

When the mesh accumulates enough `(design_characteristics, seed, fmax)` tuples,
patterns emerge. A design at 50% LUT utilization on ECP5-85F might consistently
benefit from seeds in a certain range. The `seed_history` view (Phase 2)
enables this:

- **Prior runs** for the same `design_hash` → exact replay of best seed
- **Similar designs** (same device, similar utilization) → biased seed selection
- This is the Baldwin Effect applied to EDA: lifetime routing success becomes
  inherited knowledge for future beacons

### What the mesh learns that a single machine can't

A single developer runs 1 seed and waits. The mesh runs 16+ seeds and records
every result. Over time:

- **Seed × device family correlations** emerge (some seeds are generally better
  for high-utilization ECP5 designs)
- **Per-design fingerprints** develop (designs with many carry chains route
  differently than designs with many LUT-only paths)
- **Contributor specialization** is possible but unlikely to matter — nextpnr is
  deterministic given (design + seed + flags), so the same seed produces the
  same result regardless of which machine runs it. Speed varies, quality doesn't.

---

## Beacon Channels & Reply Targets

### The problem

Not every worker wants every beacon. An ice40 developer doesn't have
`nextpnr-ecp5` installed. A private team wants beacons visible only to their
workers. A high-priority job should reach fast machines first.

### Channel model

Each beacon carries a `channel` field (text, nullable). Each worker subscribes
to one or more channels when registering. The `GET /api/beacons/pending`
endpoint filters by the worker's subscribed channels.

**Built-in channels:**
- `public` — default, visible to all workers
- `ecp5`, `ice40`, `gowin`, `nexus` — device-family channels (auto-joined based
  on worker's declared capabilities)
- `<org-slug>` — private channel for a team/org (e.g., `earthform-internal`)

**Channel rules:**
- A beacon with `channel: null` goes to `public`
- A beacon with `channel: 'earthform-internal'` is only visible to workers
  subscribed to that channel
- Workers can subscribe to multiple channels: `['public', 'ecp5', 'earthform-internal']`
- Channel membership is stored in the `registered_listeners.metadata` JSONB field
  as `{ "channels": ["public", "ecp5"] }`

### Reply targets

The beacon emitter can specify a `reply_to` field — this is an optional webhook
URL or soft identity ID that receives a push notification when results arrive,
rather than requiring the emitter to poll. This enables:

- **Google Calendar integration**: emit a beacon, get a calendar event created
  when the best result arrives (see below)
- **Discord/Slack webhooks**: post to a channel when routing completes
- **CLI callbacks**: the earthform-worker CLI can accept a `--notify` flag

### Google Workspace Integration

When the emitter has a Google Workspace account linked, beacons can create
calendar events:

1. **On beacon emit**: Create a tentative calendar event at `now + estimated_route_time`
   with title "PUC v6 routing — 8 seeds dispatched"
2. **On first result**: Update event with "First result: seed 42 → 24.3 MHz"
3. **On beacon complete**: Finalize event with "Best: seed 7 → 28.1 MHz"
   and attach links to result artifacts

This requires OAuth2 with Google Calendar API scopes — Phase 2 work, after the
core beacon flow is proven. The `reply_to` field is the foundation that makes
this possible without coupling the beacon core to Google.

---

## Integration with Existing Concepts

### Extends registered_listeners

Add `'routing-worker'` to the valid `service_type` enum:

```sql
-- In the registration API, extend the validTypes list:
-- Current: ['beacon-sensor', 'kernel', 'bridge-endpoint']
-- New:     ['beacon-sensor', 'kernel', 'bridge-endpoint', 'routing-worker']
```

### NAL Licensed AI Org Connection

In the NAL framework, a routing beacon IS a struggle beacon:
- **declare_intent**: "I need a bitstream at 25 MHz for ECP5-85F"
- **Fitness**: distance(current_fmax, target_fmax) — lower is converging
- **Bridge**: mesh routes job to available compute (topology-aware)
- **Ledger**: hash-chained results prove work was done
- **Crystallization**: Successful seed→Fmax mappings accumulate — eventually
  the mesh learns which seeds work well for certain design characteristics

### Supabase Storage

Beacon payloads (design JSON, LPF, result configs) go to Supabase Storage:
- Bucket: `earthform-file-bucket` (created 2026-04-23)
- Path: `designs/<design_hash>/` for inputs, `results/<beacon_id>/` for outputs
- Signed URLs for downloads (workers get time-limited access)

---

## Implementation Phases

### Phase 0: Foundation (this session, if time)
- [ ] Add `routing-worker` to listener service_type in register.ts
- [ ] Create `.env.example` with all required env vars
- [ ] Fix meta URL in site.config.ts → `https://earthform.ai`

### Phase 1: MVP (next session)
- [ ] Migration 004: routing_beacons + routing_results tables
- [ ] `POST /api/beacons/emit`
- [ ] `GET /api/beacons/pending`
- [ ] `POST /api/beacons/fulfill`
- [ ] Supabase Storage bucket setup
- [ ] Basic `earthform-worker` Python script (polls + runs nextpnr)
- [ ] Test: emit PUC v6 beacon from laptop, fulfill from same machine

### Phase 2: Live Dogfooding
- [ ] Run actual PUC seed sweeps through the beacon system
- [ ] Dashboard page on earthform.ai showing beacon status
- [ ] Worker metrics (jobs completed, compute donated)
- [ ] Result comparison view (seed × Fmax table)

### Phase 3: Public Beta
- [ ] `pip install earthform-worker` (PyPI package)
- [ ] Documentation for external contributors
- [ ] Multiple device families (ice40, gowin, nexus)
- [ ] Beacon priority (paid tier for faster routing)
- [ ] Encrypted beacons (design privacy for trusted mesh)

---

## Why This Matters

1. **We're the first users.** Every PUC P&R run proves the system works.
2. **Open-source FPGA devs share this pain.** 8-16 hour builds are universal.
3. **The identity model is novel.** Anonymous compute contribution with
   zero-friction onboarding + hash-chained provenance.
4. **It's a natural extension** of everything already built:
   soft identities, listeners, mesh codes, the beacon concept from NAL.
5. **Revenue path**: free tier (donate compute, use compute in return),
   paid tier (priority routing, more seeds, design privacy).
