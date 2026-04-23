-- Migration 004: Routing beacons + results tables, fix service_type constraint
-- Enables distributed FPGA seed-sweep via Earthform mesh

-- 1. Fix registered_listeners service_type to include routing-worker
alter table registered_listeners
  drop constraint if exists registered_listeners_service_type_check;

alter table registered_listeners
  add constraint registered_listeners_service_type_check
  check (service_type = any (array[
    'beacon-sensor'::text,
    'kernel'::text,
    'bridge-endpoint'::text,
    'routing-worker'::text
  ]));

-- 2. Routing beacons: jobs submitted by developers
create table routing_beacons (
  id uuid primary key default gen_random_uuid(),

  -- Owner (full account or soft identity, exactly one)
  user_id          uuid references auth.users(id),
  soft_identity_id uuid references soft_identities(id),
  constraint beacon_owner_check check (
    (user_id is not null)::int + (soft_identity_id is not null)::int = 1
  ),

  -- Design specification
  design_hash   text not null,
  device_family text not null default 'ecp5',
  device_size   text not null default '85k',
  package       text not null default 'CABGA381',
  freq_target   real not null default 25.0,
  extra_flags   text default '',

  -- Storage references (earthform-file-bucket)
  design_url text,
  lpf_url    text,

  -- Channels & reply targets
  channel       text default 'public',
  reply_to      text,
  seed_sequence text not null default 'golden'
    check (seed_sequence in ('golden', 'random')),

  -- Job state
  status text not null default 'pending'
    check (status in ('pending', 'active', 'completed', 'cancelled')),
  seeds_requested int not null default 8,
  seeds_completed int not null default 0,
  best_fmax       real,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Routing results: individual seed runs
create table routing_results (
  id uuid primary key default gen_random_uuid(),
  beacon_id uuid not null references routing_beacons(id) on delete cascade,

  -- Who ran this seed
  contributor_id    uuid,
  contributor_label text,

  -- Run details
  seed       int not null,
  seed_index int,
  fmax_mhz   real,
  timing_met  boolean default false,
  lut_util    real,
  route_time  real,
  status text not null default 'running'
    check (status in ('running', 'completed', 'failed', 'timeout')),

  -- Result artifacts (earthform-file-bucket)
  config_url text,
  log_url    text,
  timing_url text,

  -- Ledger
  result_hash text,
  prev_hash   text,

  created_at   timestamptz not null default now(),
  completed_at timestamptz
);

-- 4. Indexes
create index idx_routing_beacons_pending
  on routing_beacons(status, created_at)
  where status = 'pending' or status = 'active';

create index idx_routing_beacons_channel
  on routing_beacons(channel, status)
  where status = 'pending' or status = 'active';

create index idx_routing_results_beacon
  on routing_results(beacon_id, fmax_mhz desc nulls last);

-- 5. Row Level Security
alter table routing_beacons enable row level security;
alter table routing_results enable row level security;

-- Workers can see pending/active beacons (needed for polling)
create policy "Workers can view active beacons"
  on routing_beacons for select
  using (status in ('pending', 'active'));

-- Owners see all their beacons (any status)
create policy "Owners see own beacons"
  on routing_beacons for select
  using (
    auth.uid() = user_id
    or soft_identity_id in (
      select id from soft_identities where adopted_by = auth.uid()
    )
  );

-- Authenticated users (JWT or soft identity via API) can emit beacons
create policy "Authenticated users can emit beacons"
  on routing_beacons for insert
  with check (auth.uid() = user_id or soft_identity_id is not null);

-- Owners can update their beacons (cancel, etc.)
create policy "Owners can update own beacons"
  on routing_beacons for update
  using (
    auth.uid() = user_id
    or soft_identity_id in (
      select id from soft_identities where adopted_by = auth.uid()
    )
  );

-- Anyone can view results (transparency)
create policy "Anyone can view results"
  on routing_results for select
  using (true);

-- Contributors can submit results (validated at API level)
create policy "Contributors can submit results"
  on routing_results for insert
  with check (true);

-- Updated_at trigger for routing_beacons
create or replace function update_routing_beacon_timestamp()
returns trigger
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_routing_beacons_updated
  before update on routing_beacons
  for each row execute function update_routing_beacon_timestamp();
