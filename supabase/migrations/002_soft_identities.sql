-- Soft Identity: zero-friction tokens for devices, AI processes, and experiments.
-- A soft identity can register listeners and participate in the evolutionary mesh
-- without a Supabase Auth account. It can later be "adopted" by a human account.

create table if not exists soft_identities (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  kind text not null check (kind in ('device', 'strangeloop', 'experiment')),
  -- 64-char hex API key (256 bits of entropy)
  api_key text not null unique,
  -- When adopted, points to the human who claimed it
  adopted_by uuid references earthform_users(id) on delete set null,
  adopted_at timestamptz,
  created_at timestamptz not null default now()
);

alter table soft_identities enable row level security;

-- Service role can do everything (API routes use service key)
-- No anon access — all access goes through API endpoints
create policy "Service role full access"
  on soft_identities for all
  using (true)
  with check (true);

-- Authenticated users can see their adopted identities
create policy "Users can see adopted identities"
  on soft_identities for select
  using (auth.uid() = adopted_by);

create index if not exists idx_soft_identities_api_key
  on soft_identities(api_key);

create index if not exists idx_soft_identities_adopted_by
  on soft_identities(adopted_by);

-- Allow registered_listeners to reference either a real user_id OR a soft_identity_id.
-- We add a nullable column; existing rows keep user_id, new soft-identity rows use soft_identity_id.
alter table registered_listeners
  add column if not exists soft_identity_id uuid references soft_identities(id) on delete cascade;

-- Relax the NOT NULL on user_id so soft identities can register listeners
alter table registered_listeners
  alter column user_id drop not null;

-- Add a check: exactly one of user_id or soft_identity_id must be set
alter table registered_listeners
  add constraint listener_identity_check
  check (
    (user_id is not null and soft_identity_id is null) or
    (user_id is null and soft_identity_id is not null)
  );

-- Allow soft-identity-owned listeners to be visible via service role
-- (the API endpoint handles authorization)
create policy "Soft identity listeners visible via service role"
  on registered_listeners for select
  using (soft_identity_id is not null);
