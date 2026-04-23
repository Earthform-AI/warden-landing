import type { APIRoute } from 'astro';
import { authenticateRequest, jsonHeaders } from '../../../utils/auth';

/**
 * Golden-ratio seed generation.
 * Produces N maximally-spread seeds across the 32-bit seed space.
 */
function goldenSeeds(n: number, beaconId: string): number[] {
  // Use beacon UUID bytes as offset so each beacon gets a unique sequence
  let offset = 0;
  for (let i = 0; i < Math.min(beaconId.length, 8); i++) {
    offset = (offset * 31 + beaconId.charCodeAt(i)) >>> 0;
  }
  const PHI_INV = 0x9E3779B9; // floor(2^32 / golden ratio)
  const seeds: number[] = [];
  for (let i = 0; i < n; i++) {
    seeds.push(((offset + (i + 1) * PHI_INV) & 0xFFFFFFFF) >>> 0);
  }
  return seeds;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const auth = await authenticateRequest(request);
    if ('error' in auth) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status, headers: jsonHeaders,
      });
    }
    const { supabase } = auth;

    const body = await request.json();
    const {
      device_family = 'ecp5',
      device_size = '85k',
      package: pkg = 'CABGA381',
      freq_target = 25.0,
      seeds_requested = 8,
      extra_flags = '',
      channel = 'public',
      reply_to,
      seed_sequence = 'golden',
      design_storage_path,
      lpf_storage_path,
    } = body;

    // Validate required fields
    if (!design_storage_path) {
      return new Response(JSON.stringify({ error: 'design_storage_path is required' }), {
        status: 400, headers: jsonHeaders,
      });
    }

    const seedCount = Math.min(Math.max(Number(seeds_requested) || 8, 1), 64);

    if (!['golden', 'random'].includes(seed_sequence)) {
      return new Response(JSON.stringify({ error: 'seed_sequence must be "golden" or "random"' }), {
        status: 400, headers: jsonHeaders,
      });
    }

    // Compute design_hash from the storage path (blake3 would be ideal, using path as placeholder)
    const design_hash = body.design_hash || design_storage_path;

    // Build identity columns
    const identityCols: Record<string, string | null> =
      auth.kind === 'user'
        ? { user_id: auth.userId, soft_identity_id: null }
        : { user_id: null, soft_identity_id: auth.softIdentityId };

    // Generate signed URLs for the design files
    let design_url = null;
    let lpf_url = null;

    if (design_storage_path) {
      const { data } = await supabase.storage
        .from('earthform-file-bucket')
        .createSignedUrl(design_storage_path, 86400); // 24h
      design_url = data?.signedUrl || null;
    }

    if (lpf_storage_path) {
      const { data } = await supabase.storage
        .from('earthform-file-bucket')
        .createSignedUrl(lpf_storage_path, 86400);
      lpf_url = data?.signedUrl || null;
    }

    const { data: beacon, error } = await supabase
      .from('routing_beacons')
      .insert({
        ...identityCols,
        design_hash,
        device_family,
        device_size,
        package: pkg,
        freq_target: Number(freq_target),
        extra_flags,
        design_url,
        lpf_url,
        channel,
        reply_to: reply_to || null,
        seed_sequence,
        seeds_requested: seedCount,
      })
      .select('id, design_hash, status, seeds_requested, channel')
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: jsonHeaders,
      });
    }

    // Pre-compute assigned seeds
    const assigned_seeds = seed_sequence === 'golden'
      ? goldenSeeds(seedCount, beacon.id)
      : Array.from({ length: seedCount }, () => (Math.random() * 0xFFFFFFFF) >>> 0);

    return new Response(JSON.stringify({
      beacon_id: beacon.id,
      design_hash: beacon.design_hash,
      status: beacon.status,
      seeds_requested: beacon.seeds_requested,
      channel: beacon.channel,
      assigned_seeds,
    }), { status: 201, headers: jsonHeaders });

  } catch (e) {
    console.error('Beacon emit error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: jsonHeaders,
    });
  }
};
