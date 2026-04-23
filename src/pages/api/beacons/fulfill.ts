import type { APIRoute } from 'astro';
import { authenticateRequest, jsonHeaders } from '../../../utils/auth';

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
      beacon_id,
      seed,
      fmax_mhz,
      timing_met,
      lut_util,
      route_time,
      status = 'completed',
      config_storage_path,
      log_storage_path,
      result_hash,
      seed_index,
    } = body;

    if (!beacon_id || seed == null) {
      return new Response(JSON.stringify({ error: 'beacon_id and seed are required' }), {
        status: 400, headers: jsonHeaders,
      });
    }

    const validStatuses = ['running', 'completed', 'failed', 'timeout'];
    if (!validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: `status must be one of: ${validStatuses.join(', ')}` }), {
        status: 400, headers: jsonHeaders,
      });
    }

    // Verify beacon exists and is active
    const { data: beacon } = await supabase
      .from('routing_beacons')
      .select('id, seeds_completed, seeds_requested, best_fmax, status')
      .eq('id', beacon_id)
      .in('status', ['pending', 'active'])
      .maybeSingle();

    if (!beacon) {
      return new Response(JSON.stringify({ error: 'Beacon not found or already completed' }), {
        status: 404, headers: jsonHeaders,
      });
    }

    // Build contributor identity
    const contributor_id = auth.kind === 'soft' ? auth.softIdentityId : auth.userId;
    const contributor_label = body.contributor_label || null;

    // Get signed URLs for result artifacts
    let config_url = null;
    let log_url = null;

    if (config_storage_path) {
      const { data } = await supabase.storage
        .from('earthform-file-bucket')
        .createSignedUrl(config_storage_path, 86400 * 7); // 7 days
      config_url = data?.signedUrl || null;
    }

    if (log_storage_path) {
      const { data } = await supabase.storage
        .from('earthform-file-bucket')
        .createSignedUrl(log_storage_path, 86400 * 7);
      log_url = data?.signedUrl || null;
    }

    // Get the last result hash for chaining
    const { data: lastResult } = await supabase
      .from('routing_results')
      .select('result_hash')
      .eq('beacon_id', beacon_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const prev_hash = lastResult?.result_hash || null;

    // Insert the result
    const { data: result, error } = await supabase
      .from('routing_results')
      .insert({
        beacon_id,
        contributor_id,
        contributor_label,
        seed: Number(seed),
        seed_index: seed_index != null ? Number(seed_index) : null,
        fmax_mhz: fmax_mhz != null ? Number(fmax_mhz) : null,
        timing_met: Boolean(timing_met),
        lut_util: lut_util != null ? Number(lut_util) : null,
        route_time: route_time != null ? Number(route_time) : null,
        status,
        config_url,
        log_url,
        result_hash: result_hash || null,
        prev_hash,
        completed_at: status === 'completed' ? new Date().toISOString() : null,
      })
      .select('id')
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: jsonHeaders,
      });
    }

    // Update beacon: increment seeds_completed, update best_fmax if better
    const newCompleted = beacon.seeds_completed + 1;
    const is_best = fmax_mhz != null && (beacon.best_fmax == null || fmax_mhz > beacon.best_fmax);

    const updateFields: Record<string, unknown> = {
      seeds_completed: newCompleted,
      status: newCompleted >= beacon.seeds_requested ? 'completed' : 'active',
    };
    if (is_best) {
      updateFields.best_fmax = Number(fmax_mhz);
    }

    await supabase
      .from('routing_beacons')
      .update(updateFields)
      .eq('id', beacon_id);

    return new Response(JSON.stringify({
      result_id: result.id,
      is_best,
      seeds_completed: newCompleted,
      seeds_remaining: beacon.seeds_requested - newCompleted,
    }), { status: 201, headers: jsonHeaders });

  } catch (e) {
    console.error('Beacon fulfill error:', e);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: jsonHeaders,
    });
  }
};
