// Debug endpoint to see what GitHub is sending
export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const headers = Object.fromEntries(request.headers);
    const body = await request.text();
    
    console.log('=== WEBHOOK DEBUG ===');
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('Body:', body);
    console.log('Method:', request.method);
    console.log('URL:', request.url);
    console.log('===================');

    // Send a test message to Discord to confirm this endpoint was hit
    const discordWebhookUrl = import.meta.env.DISCORD_WEBHOOK_URL;
    
    if (discordWebhookUrl) {
      const testPayload = {
        embeds: [{
          title: "🔍 Webhook Debug Hit!",
          description: `Received ${request.method} request`,
          color: 0xff9900, // Orange
          fields: [
            {
              name: "GitHub Event",
              value: headers['x-github-event'] || 'Unknown',
              inline: true
            },
            {
              name: "Content Length",
              value: body.length.toString(),
              inline: true
            }
          ],
          timestamp: new Date().toISOString()
        }],
        username: 'Warden DevBot',
        avatar_url: 'https://warden-landing.vercel.app/favicon.svg'
      };

      await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
      });
    }

    return new Response('Debug logged', { status: 200 });
  } catch (error) {
    console.error('Debug webhook error:', error);
    return new Response('Error', { status: 500 });
  }
}

export async function GET() {
  return new Response('Debug webhook endpoint - use POST', { status: 200 });
}
