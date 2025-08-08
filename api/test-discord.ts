// Simple test function for Discord webhook
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!discordWebhookUrl) {
      return res.status(500).json({ error: 'Discord webhook URL not configured' });
    }

    const testPayload = {
      embeds: [{
        title: "🧪 Vercel Function Test",
        description: "Testing direct Vercel serverless function",
        color: 0x00ff00, // Green
        fields: [{
          name: "Status",
          value: "✅ Vercel serverless function working!",
          inline: false
        }],
        footer: {
          text: "Earthform DevUpdate • Vercel Function"
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
      return res.status(response.status).json({ error: `Discord webhook failed: ${errorText}` });
    }

    return res.status(200).json({ message: 'Test message sent successfully!' });
    
  } catch (error) {
    console.error('Test webhook error:', error);
    return res.status(500).json({ error: `Error: ${error}` });
  }
}
