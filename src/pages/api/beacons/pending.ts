import type { APIRoute } from 'astro';
import { authenticateRequest, jsonHeaders } from '../../../utils/auth';

export const GET: APIRoute = async ({ request }) => {
  try {
    const auth = await authenticateRequest(request);
    if ('error' in auth) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status, headers: jsonHeaders,
      });
    }
    const { supabase } = auth;

    // Parse channel filter from query string
    const url = new URL(request.url);
    const channelsParam = url.searchParams.get('channels') || 'public';
    const channels = channelsParam.split(',').map(c => c.trim()).filter(Boolean);

    // Fetch pending/active beacons matching the worker's channels
    const { data: beacons, error } = await supabase
      .from('routing_beacons')
      .select('id, device_family, device_size, package, freq_target, extra_flags, seeds_requested, seeds_completed, design_url, lpf_url, channel, seed_sequence')
      .in('status', ['pending', 'active'])
      .in('channel', channels)
      .order('created_at', { ascending: true })
      .limit(10);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: jsonHeaders,
      });
    }

    // For each beacon, compute the next seed to assign
    const enriched = (beacons || []).map(b => {
      const nextIndex = b.seeds_completed;
      let next_seed: number | null = null;

      if (nextIndex < b.seeds_requested) {
        if (b.seed_sequence === 'golden') {
          const PHI_INV = 0x9E3779B9;
          let offset = 0;
          for (let i = 0; i < Math.min(b.id.length, 8); i++) {
            offset = (offset * 31 + b.id.charCodeAt(i)) >>> 0;
          }
          next_seed = ((offset + (nextIndex + 1) * PHI_INV) & 0xFFFFFFFF) >>> 0;
        } else {
          next_seed = (Math.random() * 0xFFFFFFFF) >>> 0;
        }
      }

      return {
        id: b.id,
        device_family: b.device_family,
        device_size: b.device_size,
        freq_target: b.freq_target,
        seeds_completed: b.seeds_completed,
        seeds_requested: b.seeds_requested,
        design_url: b.design_url,
        lpf_url: b.lpf_url,
        extra_flags: b.extra_flags,
        channel: b.channel,
        next_seed,
        next_seed_index: nextIndex,
      };
    });

    return new Response(JSON.stringify({ beacons: enriched }), {
      status: 200, headers: jsonHeaders,
    });

  } catch (e) {
    console.error('Beacon pending error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: jsonHeaders,
    });
  }
};
