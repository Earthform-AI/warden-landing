// API route to handle GitHub webhooks and send Discord notifications
import crypto from 'crypto';

export const prerender = false;

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
  ISSUE: 0xff4500,      // Orange
  DEFAULT: 0x36393f     // Discord gray
};

function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) {
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
            text: commitCount > 5 ? `...and ${commitCount - 5} more commits` : 'Earthform DevUpdate'
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
      return null;
  }

  return {
    embeds,
    username: 'Warden DevBot',
    avatar_url: 'https://warden-landing.vercel.app/favicon.svg'
  };
}

export async function ALL({ request }: { request: Request }) {
  // Handle both POST and OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-GitHub-Event, X-Hub-Signature-256, X-Hub-Signature',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const signature = request.headers.get('x-hub-signature-256');
    const event = request.headers.get('x-github-event');
    const body = await request.text();
    
    // Verify webhook signature if secret is configured
    const secret = import.meta.env.GITHUB_WEBHOOK_SECRET;
    if (secret && signature && !verifySignature(body, signature, secret)) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (!event) {
      return new Response('Missing event header', { status: 400 });
    }

    const payload: GitHubWebhookPayload = JSON.parse(body);
    const discordPayload = createDiscordPayload(event, payload);
    
    if (!discordPayload) {
      // Event type not supported or action not interesting
      return new Response('Event ignored', { status: 200 });
    }

    // Send to Discord
    const discordWebhookUrl = import.meta.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      console.error('DISCORD_WEBHOOK_URL not configured');
      return new Response('Discord webhook not configured', { status: 500 });
    }

    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      console.error('Discord webhook failed:', response.status, await response.text());
      return new Response('Discord notification failed', { status: 500 });
    }

    return new Response('Webhook processed successfully', { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal server error', { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
