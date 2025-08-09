import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(200).send('Debug webhook endpoint - use POST');
    return;
  }
  try {
    const headers = req.headers as Record<string, string | string[]>;
    const body = req.rawBody ? req.rawBody.toString() : '';
    console.log('=== WEBHOOK DEBUG ===');
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('Body:', body);
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('===================');
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl) {
      const testPayload = {
        embeds: [{
          title: '🔍 Webhook Debug Hit!',
          description: `Received ${req.method} request`,
          color: 0xff9900,
          fields: [
            {
              name: 'GitHub Event',
              value: (headers['x-github-event'] as string) || 'Unknown',
              inline: true
            },
            {
              name: 'Content Length',
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
        body: JSON.stringify(testPayload)
      });
    }
    res.status(200).send('Debug logged');
  } catch (error) {
    console.error('Debug webhook error:', error);
    res.status(500).send('Error');
  }
}
