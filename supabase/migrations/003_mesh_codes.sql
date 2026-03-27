-- Mesh codes: allow soft identities to discover each other's listeners.
-- A mesh_code is a short human-typeable string that groups devices together.
-- Devices sharing a mesh_code can see each other's beacons via the discovery endpoint.

alter table soft_identities
  add column if not exists mesh_code text;

create index if not exists idx_soft_identities_mesh_code
  on soft_identities(mesh_code)
  where mesh_code is not null;
