import type { APIRoute } from 'astro';

const REQUIRED_SERVER_VARS = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'STRIPE_SECRET_KEY',
];

const OPTIONAL_SERVER_VARS = [
  'STRIPE_WEBHOOK_SECRET',
  'GITHUB_WEBHOOK_SECRET',
  'DISCORD_WEBHOOK_URL',
];

const PUBLIC_VARS = [
  'PUBLIC_STRIPE_PUBLISHABLE_KEY'
];

export const GET: APIRoute = async () => {
  const summarize = (names: string[]) => names.map(name => ({ name, present: !!process.env[name] }));
  return new Response(JSON.stringify({
    server: summarize(REQUIRED_SERVER_VARS),
    optional: summarize(OPTIONAL_SERVER_VARS),
    public: summarize(PUBLIC_VARS),
    allPresent: REQUIRED_SERVER_VARS.every(n => !!process.env[n])
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
