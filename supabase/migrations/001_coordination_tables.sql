-- Earthform Coordination Service: Listener Registry + Basic Identity
-- Run this migration via Supabase Dashboard SQL editor or supabase CLI.

-- 1. earthform_users: Earthform.ai account identity
create table if not exists earthform_users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  strangeloop_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table earthform_users enable row level security;

create policy "Users can read own profile"
  on earthform_users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on earthform_users for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on earthform_users for insert
  with check (auth.uid() = id);

-- 2. registered_listeners: machines advertising NAL services
create table if not exists registered_listeners (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references earthform_users(id) on delete cascade,
  label text not null,
  service_type text not null check (service_type in ('beacon-sensor', 'kernel', 'bridge-endpoint')),
  host text not null,
  port integer not null check (port > 0 and port < 65536),
  protocol_version text not null default 'beacon-sensor/0.1',
  status text not null default 'online' check (status in ('online', 'offline')),
  last_heartbeat timestamptz not null default now(),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table registered_listeners enable row level security;

-- Owner can do everything with their own listeners
create policy "Users can manage own listeners"
  on registered_listeners for all
  using (auth.uid() = user_id);

-- Authenticated users can see online listeners belonging to them
-- (future: add team-based visibility here)
create policy "Users can see own online listeners"
  on registered_listeners for select
  using (auth.uid() = user_id and status = 'online');

-- Index for fast discovery queries
create index if not exists idx_listeners_user_status
  on registered_listeners(user_id, status);

-- 3. registered_devices: phones/tablets that connect to listeners
create table if not exists registered_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references earthform_users(id) on delete cascade,
  device_name text not null,
  device_type text not null check (device_type in ('ios', 'android', 'desktop')),
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table registered_devices enable row level security;

create policy "Users can manage own devices"
  on registered_devices for all
  using (auth.uid() = user_id);
