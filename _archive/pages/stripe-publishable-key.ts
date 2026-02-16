import type { APIRoute } from 'astro';
import { getPublishableKey } from '../utils/stripe';

export const GET: APIRoute = async () => {
  const publishableKey = getPublishableKey();
  return new Response(JSON.stringify({ publishableKey }), {
    status: publishableKey ? 200 : 500,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' }
  });
};
