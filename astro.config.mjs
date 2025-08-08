// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  server: {
    // For development
    host: true
  },
  // Add redirects for custom webhook URLs
  redirects: {
    '/github-discord-push-dev-updates': '/api/github-webhook'
  }
});