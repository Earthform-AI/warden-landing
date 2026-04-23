import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export type AuthResult =
  | { kind: 'user'; userId: string; supabase: SupabaseClient }
  | { kind: 'soft'; softIdentityId: string; supabase: SupabaseClient }
  | { error: string; status: number };

/**
 * Authenticate via Supabase JWT or soft-identity API key.
 * Tries JWT first; if that fails, checks if the token is a soft identity api_key.
 */
export async function authenticateRequest(request: Request): Promise<AuthResult> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing or invalid Authorization header', status: 401 };
  }
  const token = authHeader.slice(7);
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Try Supabase JWT first
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (!error && user) {
    return { kind: 'user', userId: user.id, supabase };
  }

  // Fall back to soft identity API key (64-char hex)
  if (/^[0-9a-f]{64}$/.test(token)) {
    const { data: identity } = await supabase
      .from('soft_identities')
      .select('id')
      .eq('api_key', token)
      .maybeSingle();

    if (identity) {
      return { kind: 'soft', softIdentityId: identity.id, supabase };
    }
  }

  return { error: 'Invalid or expired token', status: 401 };
}

/** Create a service-role Supabase client (bypasses RLS). */
export function createServiceClient(): SupabaseClient {
  return createClient(supabaseUrl, supabaseServiceKey);
}

export const jsonHeaders = { 'Content-Type': 'application/json' } as const;
