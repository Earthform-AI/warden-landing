// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  output: 'server', // Server-side rendering for API routes
  server: {
    // For development
    host: true
  }
});