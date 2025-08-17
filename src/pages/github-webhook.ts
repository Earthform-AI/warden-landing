import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

interface GitHubWebhookPayload {
  action?: string;
  repository?: {
    name: string;
    full_name: string;
    html_url: string;
    stargazers_count?: number;
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
    body: string;
    user: {
      login: string;
      avatar_url: string;
    };
    merged: boolean;
    mergeable: boolean;
    draft: boolean;
    additions: number;
    deletions: number;
    changed_files: number;
    base: {
      ref: string;
    };
    head: {
      ref: string;
    };
    labels: Array<{
      name: string;
      color: string;
    }>;
    assignees: Array<{
      login: string;
    }>;
    requested_reviewers: Array<{
      login: string;
    }>;
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
  issue?: {
    number: number;
    title: string;
    body: string;
    html_url: string;
    user: {
      login: string;
    };
    labels: Array<{
      name: string;
    }>;
  };
  discussion?: {
    title: string;
    body: string;
    html_url: string;
    user: {
      login: string;
      avatar_url: string;
    };
    category: {
      name: string;
      emoji: string;
      description: string;
    };
    answer_html_url?: string;
    answer_chosen_at?: string;
    answer_chosen_by?: {
      login: string;
    };
    upvote_count?: number;
    comments?: {
      total_count: number;
    };
  };
  comment?: {
    body: string;
    html_url: string;
    user: {
      login: string;
      avatar_url: string;
    };
  };
  sender?: {
    login: string;
    avatar_url: string;
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
  PUSH: 0x00ff00,
  PR_OPENED: 0x0099ff,
  PR_MERGED: 0x8b5cf6,
  RELEASE: 0xffd700,
  ISSUE: 0xff4500,
  STAR: 0xffa500,
  FORK: 0x36393f,
  DISCUSSION: 0x7c3aed,
  DISCUSSION_ANSWERED: 0x10b981,
  DISCUSSION_COMMENT: 0x6366f1,
  DEFAULT: 0x36393f
};

// Multi-channel Discord webhook routing
const DISCUSSION_CHANNEL_WEBHOOKS = {
  'Ideas': process.env.DISCORD_IDEAS_WEBHOOK,
  'Q&A': process.env.DISCORD_QA_WEBHOOK,
  'Show and Tell': process.env.DISCORD_SHOWCASE_WEBHOOK,
  'Mining Safety Research': process.env.DISCORD_RESEARCH_WEBHOOK,
  'Neural Assembly Language': process.env.DISCORD_NAL_WEBHOOK,
  'Warden Development': process.env.DISCORD_WARDEN_DEV_WEBHOOK,
  'Community Missions': process.env.DISCORD_MISSIONS_WEBHOOK
};

function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) {
    return true;
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
  const lines = message.split('\n');
  const title = lines[0];
  return title.length > 72 ? `${title.substring(0, 69)}...` : title;
}

function createDiscordPayload(event: string, payload: GitHubWebhookPayload): { payload: any, webhookUrl?: string } | null {
  const embeds: DiscordEmbed[] = [];
  const repoName = payload.repository?.name || 'warden-landing';
  const repoUrl = payload.repository?.html_url || '';
  let webhookUrl: string | undefined;

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
          fields: payload.commits.slice(0, 5).map(c => ({
            name: formatCommitMessage(c.message),
            value: `[View commit](${c.url})`
          })),
          footer: { text: `${repoName} • Earthform DevUpdate` },
          timestamp: new Date().toISOString()
        });
      }
      break;
    case 'pull_request':
      if (payload.pull_request && payload.action) {
        const { pull_request: pr, action } = payload;
        
        let title = '';
        let color = DISCORD_COLORS.DEFAULT;
        let emoji = '';
        
        if (action === 'opened') {
          title = `📋 New Pull Request #${pr.number}`;
          color = DISCORD_COLORS.PR_OPENED;
          emoji = '🆕';
        } else if (action === 'closed' && pr.merged) {
          title = `🎉 Pull Request #${pr.number} Merged`;
          color = DISCORD_COLORS.PR_MERGED;
          emoji = '🎯';
        } else if (action === 'closed') {
          title = `❌ Pull Request #${pr.number} Closed`;
          color = DISCORD_COLORS.DEFAULT;
          emoji = '🚫';
        } else if (action === 'ready_for_review' && pr.draft) {
          title = `👀 Pull Request #${pr.number} Ready for Review`;
          color = DISCORD_COLORS.PR_OPENED;
          emoji = '📝';
        } else if (action === 'review_requested') {
          title = `🔍 Review Requested for PR #${pr.number}`;
          color = DISCORD_COLORS.PR_OPENED;
          emoji = '👥';
        } else {
          return null;
        }

        const fields: Array<{name: string, value: string, inline?: boolean}> = [];
        
        // Add code change stats if available
        if (pr.additions !== undefined && pr.deletions !== undefined && pr.changed_files !== undefined) {
          fields.push({
            name: '📊 Changes',
            value: `+${pr.additions} -${pr.deletions} across ${pr.changed_files} file${pr.changed_files !== 1 ? 's' : ''}`,
            inline: true
          });
        }
        
        // Add branch info
        if (pr.head?.ref && pr.base?.ref) {
          fields.push({
            name: '🌿 Branch',
            value: `\`${pr.head.ref}\` → \`${pr.base.ref}\``,
            inline: true
          });
        }
        
        // Add labels if any
        if (pr.labels && pr.labels.length > 0) {
          const labelText = pr.labels.slice(0, 3).map(label => `\`${label.name}\``).join(', ');
          const moreText = pr.labels.length > 3 ? ` +${pr.labels.length - 3} more` : '';
          fields.push({
            name: '🏷️ Labels',
            value: labelText + moreText,
            inline: true
          });
        }
        
        // Add assignees/reviewers
        if (pr.assignees && pr.assignees.length > 0) {
          fields.push({
            name: '👤 Assignees',
            value: pr.assignees.map(a => `@${a.login}`).join(', '),
            inline: true
          });
        }
        
        if (pr.requested_reviewers && pr.requested_reviewers.length > 0) {
          fields.push({
            name: '👥 Reviewers',
            value: pr.requested_reviewers.map(r => `@${r.login}`).join(', '),
            inline: true
          });
        }
        
        // Add PR description preview if available
        if (pr.body && pr.body.trim()) {
          const description = pr.body.length > 200 ? `${pr.body.substring(0, 197)}...` : pr.body;
          fields.push({
            name: '📝 Description',
            value: description,
            inline: false
          });
        }

        embeds.push({
          title,
          description: `${emoji} **[${pr.title}](${pr.html_url})**\nby ${pr.user.login}${pr.draft ? ' *(draft)*' : ''}`,
          color,
          url: pr.html_url,
          author: pr.user.avatar_url ? {
            name: pr.user.login,
            icon_url: pr.user.avatar_url
          } : undefined,
          fields,
          footer: { text: `${repoName} • Earthform DevUpdate` },
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
          footer: { text: `${repoName} • Earthform DevUpdate` },
          timestamp: new Date().toISOString()
        });
      }
      break;
    case 'star':
      if (payload.action === 'created' && payload.sender) {
        embeds.push({
          title: `⭐ New Star from ${payload.sender.login}!`,
          description: `**${repoName}** just got some love! ${payload.repository?.stargazers_count ? `Now at ${payload.repository.stargazers_count} stars` : ''}`,
          color: DISCORD_COLORS.STAR,
          url: repoUrl,
          author: {
            name: payload.sender.login,
            icon_url: payload.sender.avatar_url
          },
          footer: { text: `${repoName} • Earthform DevUpdate` },
          timestamp: new Date().toISOString()
        });
      }
      break;
    case 'fork':
      if (payload.sender) {
        embeds.push({
          title: `🍴 Repository Forked by ${payload.sender.login}`,
          description: `Someone's building on the **${repoName}** foundation!`,
          color: DISCORD_COLORS.FORK,
          url: repoUrl,
          author: {
            name: payload.sender.login,
            icon_url: payload.sender.avatar_url
          },
          footer: { text: `${repoName} • Earthform DevUpdate` },
          timestamp: new Date().toISOString()
        });
      }
      break;
    case 'issues':
      if (payload.issue && (payload.action === 'opened' || payload.action === 'closed')) {
        const { issue, action } = payload;
        const isOpened = action === 'opened';
        embeds.push({
          title: `${isOpened ? '🐛 New Issue' : '✅ Issue Closed'} #${issue.number}`,
          description: `**[${issue.title}](${issue.html_url})**\n${isOpened ? 'opened' : 'closed'} by ${issue.user.login}`,
          color: isOpened ? DISCORD_COLORS.ISSUE : DISCORD_COLORS.PUSH,
          url: issue.html_url,
          fields: issue.body && isOpened ? [{
            name: '📝 Description',
            value: issue.body.length > 300 ? `${issue.body.substring(0, 297)}...` : issue.body,
            inline: false
          }] : [],
          footer: { text: `${repoName} • Earthform DevUpdate` },
          timestamp: new Date().toISOString()
        });
      }
      break;
    case 'discussion':
      if (payload.discussion) {
        const { discussion, action } = payload;
        
        // Route to appropriate Discord channel based on category
        if (discussion.category?.name) {
          webhookUrl = DISCUSSION_CHANNEL_WEBHOOKS[discussion.category.name as keyof typeof DISCUSSION_CHANNEL_WEBHOOKS];
        }
        
        if (action === 'created') {
          const categoryEmoji = discussion.category?.emoji || '💭';
          const categoryName = discussion.category?.name || 'General';
          
          embeds.push({
            title: `${categoryEmoji} New Discussion: ${discussion.title}`,
            description: `**[Join the conversation](${discussion.html_url})**\nStarted by ${discussion.user.login} in **${categoryName}**`,
            color: DISCORD_COLORS.DISCUSSION,
            url: discussion.html_url,
            author: discussion.user.avatar_url ? {
              name: discussion.user.login,
              icon_url: discussion.user.avatar_url
            } : undefined,
            fields: [
              {
                name: '📂 Category',
                value: `${categoryEmoji} ${categoryName}`,
                inline: true
              },
              ...(discussion.upvote_count !== undefined ? [{
                name: '👍 Upvotes',
                value: discussion.upvote_count.toString(),
                inline: true
              }] : []),
              ...(discussion.comments?.total_count !== undefined ? [{
                name: '💬 Comments',
                value: discussion.comments.total_count.toString(),
                inline: true
              }] : []),
              ...(discussion.body ? [{
                name: '💭 Preview',
                value: discussion.body.length > 300 ? `${discussion.body.substring(0, 297)}...` : discussion.body,
                inline: false
              }] : [])
            ],
            footer: { text: `${repoName} • Community Discussion` },
            timestamp: new Date().toISOString()
          });
        } else if (action === 'answered' && discussion.answer_html_url) {
          embeds.push({
            title: `✅ Discussion Answered: ${discussion.title}`,
            description: `**[View Answer](${discussion.answer_html_url})**\n${discussion.answer_chosen_by?.login ? `Answer chosen by ${discussion.answer_chosen_by.login}` : 'Answer marked as helpful'}`,
            color: DISCORD_COLORS.DISCUSSION_ANSWERED,
            url: discussion.answer_html_url,
            fields: [
              {
                name: '📂 Category',
                value: `${discussion.category?.emoji || '💭'} ${discussion.category?.name || 'General'}`,
                inline: true
              },
              {
                name: '🎯 Status',
                value: 'Resolved',
                inline: true
              }
            ],
            footer: { text: `${repoName} • Problem Solved!` },
            timestamp: new Date().toISOString()
          });
        }
      }
      break;
    case 'discussion_comment':
      if (payload.discussion && payload.comment && payload.action === 'created') {
        const { discussion, comment } = payload;
        
        // Route to appropriate Discord channel based on category
        if (discussion.category?.name) {
          webhookUrl = DISCUSSION_CHANNEL_WEBHOOKS[discussion.category.name as keyof typeof DISCUSSION_CHANNEL_WEBHOOKS];
        }
        
        embeds.push({
          title: `💬 New Comment on: ${discussion.title}`,
          description: `**[View Comment](${comment.html_url})**\nby ${comment.user.login}`,
          color: DISCORD_COLORS.DISCUSSION_COMMENT,
          url: comment.html_url,
          author: comment.user.avatar_url ? {
            name: comment.user.login,
            icon_url: comment.user.avatar_url
          } : undefined,
          fields: [
            {
              name: '📂 Category',
              value: `${discussion.category?.emoji || '💭'} ${discussion.category?.name || 'General'}`,
              inline: true
            },
            ...(comment.body ? [{
              name: '💬 Comment',
              value: comment.body.length > 400 ? `${comment.body.substring(0, 397)}...` : comment.body,
              inline: false
            }] : [])
          ],
          footer: { text: `${repoName} • Community Discussion` },
          timestamp: new Date().toISOString()
        });
      }
      break;
    default:
      return null;
  }
  return {
    payload: {
      embeds,
      username: 'Warden DevBot',
      avatar_url: 'https://warden-landing.vercel.app/favicon.svg'
    },
    webhookUrl
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const signature = req.headers['x-hub-signature-256'] as string | undefined;
    const event = req.headers['x-github-event'] as string | undefined;
    
    // Handle request body properly for Vercel
    let body: string;
    if (Buffer.isBuffer(req.body)) {
      body = req.body.toString();
    } else if (typeof req.body === 'string') {
      body = req.body;
    } else {
      body = JSON.stringify(req.body || '');
    }

    const secret = process.env.GITHUB_WEBHOOK_SECRET || '';
    if (secret && signature && !verifySignature(body, signature, secret)) {
      res.status(401).send('Unauthorized');
      return;
    }
    if (!event) {
      res.status(400).send('Missing event header');
      return;
    }
    const payload: GitHubWebhookPayload = JSON.parse(body);
    const result = createDiscordPayload(event, payload);
    if (!result) {
      res.status(200).send('Event ignored');
      return;
    }
    
    // Use category-specific webhook if available, otherwise fall back to main webhook
    const targetWebhookUrl = result.webhookUrl || process.env.DISCORD_WEBHOOK_URL;
    if (!targetWebhookUrl) {
      console.error('No Discord webhook configured for this event');
      res.status(500).send('Discord webhook not configured');
      return;
    }
    
    const response = await fetch(targetWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.payload)
    });
    if (!response.ok) {
      console.error('Discord webhook failed:', response.status, await response.text());
      res.status(500).send('Discord notification failed');
      return;
    }
    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal server error');
  }
}
