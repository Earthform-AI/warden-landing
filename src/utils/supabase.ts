import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Earthform Coordination Service ──

export interface EarthformUser {
  id: string;
  display_name: string;
  strangeloop_name?: string;
  created_at: string;
  updated_at: string;
}

export type ListenerServiceType = 'beacon-sensor' | 'kernel' | 'bridge-endpoint' | 'routing-worker';
export type ListenerStatus = 'online' | 'offline';

export interface RegisteredListener {
  id: string;
  user_id: string;
  label: string;
  service_type: ListenerServiceType;
  host: string;
  port: number;
  protocol_version: string;
  status: ListenerStatus;
  last_heartbeat: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface RegisteredDevice {
  id: string;
  user_id: string;
  device_name: string;
  device_type: 'ios' | 'android' | 'desktop';
  last_seen: string;
  created_at: string;
}

// ── Soft Identity ──

export type SoftIdentityKind = 'device' | 'strangeloop' | 'experiment';

export interface SoftIdentity {
  id: string;
  label: string;
  kind: SoftIdentityKind;
  api_key: string;
  mesh_code?: string;
  adopted_by?: string;
  adopted_at?: string;
  created_at: string;
}