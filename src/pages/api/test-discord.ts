// Test endpoint to verify Discord webhook functionality  
// Testing GitHub webhook integration - should trigger Discord notification
// Updated: Testing with Vercel URL instead of custom domain
// Testing webhook delivery with GitHub ping event
// SUCCESS: Discord integration confirmed working! ✅

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const discordWebhookUrl = import.meta.env.DISCORD_WEBHOOK_URL;
    
    if (!discordWebhookUrl) {
      return new Response('Discord webhook URL not configured', { status: 500 });
    }

    const testPayload = {
      embeds: [{
        title: "🧪 Webhook Test",
        description: "This is a test message from the Warden DevBot",
        color: 0x00ff00, // Green
        fields: [{
          name: "Status",
          value: "✅ Discord integration working!",
          inline: false
        }],
        footer: {
          text: "Earthform DevUpdate • Test"
        },
        timestamp: new Date().toISOString()
      }],
      username: 'Warden DevBot',
      avatar_url: 'https://warden-landing.vercel.app/favicon.svg'
    };

    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`Discord webhook failed: ${errorText}`, { status: response.status });
    }

    return new Response('Test message sent successfully!', { status: 200 });
    
  } catch (error) {
    console.error('Test webhook error:', error);
    return new Response(`Error: ${error}`, { status: 500 });
  }
};

export const GET: APIRoute = async () => {
  return new Response('Use POST to send a test Discord message', { status: 405 });
};
