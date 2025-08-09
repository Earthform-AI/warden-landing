import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Use POST to send a test Discord message');
    return;
  }
  try {
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      res.status(500).send('Discord webhook URL not configured');
      return;
    }
    const testPayload = {
      embeds: [{
        title: '🧪 Webhook Test',
        description: 'This is a test message from the Warden DevBot',
        color: 0x00ff00,
        fields: [{
          name: 'Status',
          value: '✅ Discord integration working!',
          inline: false
        }],
        footer: {
          text: 'Earthform DevUpdate • Test'
        },
        timestamp: new Date().toISOString()
      }],
      username: 'Warden DevBot',
      avatar_url: 'https://warden-landing.vercel.app/favicon.svg'
    };
    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    });
    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).send(`Discord webhook failed: ${errorText}`);
      return;
    }
    res.status(200).send('Test message sent successfully!');
  } catch (error) {
    console.error('Test webhook error:', error);
    res.status(500).send(`Error: ${error}`);
  }
}
