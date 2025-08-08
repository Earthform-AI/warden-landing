// API route to handle GitHub webhooks and send Discord notifications
// This endpoint matches the GitHub webhook URL: https://www.earthform.ai/github-discord-push-dev-updates
import crypto from 'crypto';

interface GitHubWebhookPayload {
  action?: string;
  repository?: {
    name: string;
    full_name: string;
    html_url: string;
  };
  pusher?: {
    name: string;
  };
  commits?: Array<{
    id: string;
    message: string;
    author: {
      name: string;
      username: string;
    };
    url: string;
  }>;
  pull_request?: {
    number: number;
    title: string;
    html_url: string;
    user: {
      login: string;
    };
    merged: boolean;
  };
  release?: {
    tag_name: string;
    name: string;
    body: string;
    html_url: string;
    author: {
      login: string;
    };
  };
  ref?: string;
  head_commit?: {
    id: string;
    message: string;
    author: {
      name: string;
      username: string;
    };
    url: string;
  };
  zen?: string;
  hook_id?: number;
}

interface DiscordEmbed {
  title: string;
  description: string;
  color: number;
  url?: string;
  author?: {
    name: string;
    icon_url?: string;
  };
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  footer?: {
    text: string;
  };
  timestamp?: string;
}

const DISCORD_COLORS = {
  PUSH: 0x00ff00,      // Green
  PR_OPENED: 0x0099ff,  // Blue  
  PR_MERGED: 0x8b5cf6,  // Purple
  RELEASE: 0xffd700,    // Gold
  PING: 0x36393f,       // Discord gray for ping events
  DEFAULT: 0x36393f     // Discord gray
};

function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) {
    console.log('No secret configured, skipping signature verification');
    return true; // Skip verification if no secret set
  }
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(`sha256=${expectedSignature}`, 'utf8'),
    Buffer.from(signature, 'utf8')
  );
}

function formatCommitMessage(message: string): string {
  // Limit commit message length and format for Discord
  const lines = message.split('\n');
  const title = lines[0];
  return title.length > 72 ? `${title.substring(0, 69)}...` : title;
}

function createDiscordPayload(event: string, payload: GitHubWebhookPayload): any {
  const embeds: DiscordEmbed[] = [];
  const repoName = payload.repository?.name || 'warden-landing';
  const repoUrl = payload.repository?.html_url || '';

  switch (event) {
    case 'ping':
      // Handle GitHub ping event
      embeds.push({
        title: "🔔 GitHub Webhook Connected",
        description: `Successfully connected to **${repoName}**\n\n*"${payload.zen}"* - GitHub Zen`,
        color: DISCORD_COLORS.PING,
        url: repoUrl,
        footer: {
          text: "Earthform DevUpdate • Webhook Setup Complete"
        },
        timestamp: new Date().toISOString()
      });
      break;

    case 'push':
      if (payload.commits && payload.commits.length > 0) {
        const branch = payload.ref?.replace('refs/heads/', '') || 'main';
        const commitCount = payload.commits.length;
        const pusher = payload.pusher?.name || payload.head_commit?.author?.name || 'Unknown';
        
        embeds.push({
          title: `🚀 ${commitCount} new commit${commitCount > 1 ? 's' : ''} to ${branch}`,
          description: `**${pusher}** pushed to **${repoName}**`,
          color: DISCORD_COLORS.PUSH,
          url: repoUrl,
          fields: payload.commits.slice(0, 5).map(commit => ({
            name: `[\`${commit.id.substring(0, 7)}\`](${commit.url})`,
            value: formatCommitMessage(commit.message),
            inline: false
          })),
          footer: {
            text: commitCount > 5 ? `...and ${commitCount - 5} more commits • Earthform DevUpdate` : 'Earthform DevUpdate'
          },
          timestamp: new Date().toISOString()
        });
      }
      break;

    case 'pull_request':
      if (payload.pull_request && payload.action) {
        const { pull_request: pr, action } = payload;
        
        let title = '';
        let color = DISCORD_COLORS.DEFAULT;
        
        if (action === 'opened') {
          title = `📋 New Pull Request #${pr.number}`;
          color = DISCORD_COLORS.PR_OPENED;
        } else if (action === 'closed' && pr.merged) {
          title = `🎉 Pull Request #${pr.number} Merged`;
          color = DISCORD_COLORS.PR_MERGED;
        } else if (action === 'closed') {
          title = `❌ Pull Request #${pr.number} Closed`;
          color = DISCORD_COLORS.DEFAULT;
        } else {
          // Skip other PR actions for now
          return null;
        }

        embeds.push({
          title,
          description: `**[${pr.title}](${pr.html_url})**\nby ${pr.user.login}`,
          color,
          url: pr.html_url,
          footer: {
            text: `${repoName} • Earthform DevUpdate`
          },
          timestamp: new Date().toISOString()
        });
      }
      break;

    case 'release':
      if (payload.release && payload.action === 'published') {
        const { release } = payload;
        
        embeds.push({
          title: `🏷️ New Release: ${release.tag_name}`,
          description: `**[${release.name}](${release.html_url})**\nreleased by ${release.author.login}`,
          color: DISCORD_COLORS.RELEASE,
          url: release.html_url,
          fields: release.body ? [{
            name: 'Release Notes',
            value: release.body.length > 500 ? `${release.body.substring(0, 497)}...` : release.body,
            inline: false
          }] : [],
          footer: {
            text: `${repoName} • Earthform DevUpdate`
          },
          timestamp: new Date().toISOString()
        });
      }
      break;

    default:
      // Skip unsupported events
      console.log(`Unsupported event type: ${event}`);
      return null;
  }

  return {
    embeds,
    username: 'Earthform DevBot',
    avatar_url: 'https://www.earthform.ai/favicon.svg'
  };
}

export async function POST({ request }: { request: Request }) {
  try {
    const signature = request.headers.get('x-hub-signature-256');
    const event = request.headers.get('x-github-event');
    const body = await request.text();
    
    console.log(`Received GitHub webhook: ${event}`);
    
    // Verify webhook signature if secret is configured
    const secret = import.meta.env.GITHUB_WEBHOOK_SECRET;
    if (secret && signature && !verifySignature(body, signature, secret)) {
      console.error('Webhook signature verification failed');
      return new Response('Unauthorized', { status: 401 });
    }

    if (!event) {
      return new Response('Missing event header', { status: 400 });
    }

    const payload: GitHubWebhookPayload = JSON.parse(body);
    const discordPayload = createDiscordPayload(event, payload);
    
    if (!discordPayload) {
      // Event type not supported or action not interesting
      console.log(`Event ${event} ignored`);
      return new Response('Event ignored', { status: 200 });
    }

    // Send to Discord
    const discordWebhookUrl = import.meta.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      console.error('DISCORD_WEBHOOK_URL not configured');
      return new Response('Discord webhook not configured', { status: 500 });
    }

    console.log('Sending notification to Discord...');
    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord webhook failed:', response.status, errorText);
      return new Response('Discord notification failed', { status: 500 });
    }

    console.log(`Successfully sent ${event} notification to Discord`);
    return new Response('Webhook processed successfully', { status: 200 });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return new Response('GitHub to Discord webhook endpoint is active. Use POST to send webhooks.', { 
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}
