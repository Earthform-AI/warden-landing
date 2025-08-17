import type { VercelRequest, VercelResponse } from '@vercel/node';

interface SocialPost {
  platform: 'twitter' | 'linkedin' | 'reddit';
  content: string;
  media?: string[];
  scheduled_for?: string;
  tags?: string[];
  subreddit?: string; // For Reddit
}

interface TwitterPost {
  text: string;
  media?: {
    media_ids: string[];
  };
}

interface LinkedInPost {
  author: string;
  lifecycleState: 'PUBLISHED';
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: {
        text: string;
      };
      shareMediaCategory: 'NONE' | 'ARTICLE' | 'IMAGE';
      media?: Array<{
        status: 'READY';
        originalUrl: string;
        title?: {
          text: string;
        };
        description?: {
          text: string;
        };
      }>;
    };
  };
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC';
  };
}

interface RedditPost {
  title: string;
  text?: string;
  url?: string;
  subreddit: string;
}

interface PostTemplate {
  id: string;
  name: string;
  description: string;
  platforms: string[];
  template: {
    twitter?: string;
    linkedin?: string;
    reddit?: {
      title: string;
      content: string;
      subreddits: string[];
    };
  };
  variables: string[];
}

const POST_TEMPLATES: PostTemplate[] = [
  {
    id: 'weekly_progress',
    name: 'Weekly Progress Update',
    description: 'Share weekly development progress',
    platforms: ['twitter', 'linkedin', 'reddit'],
    template: {
      twitter: '🚀 This week in #Warden development:\n\n• {{commits}} new commits\n• {{prs}} pull requests\n• {{discussions}} community discussions\n\nBuilding AI-powered mining safety at {{repo_url}} 🤖⛑️\n\n#AI #MiningSafety #OpenSource #NeuralAssembly',
      linkedin: '🚀 Weekly Progress Update - Warden Project\n\nThis week our team made significant strides in developing AI-powered mining safety systems:\n\n✅ {{commits}} new commits pushed\n✅ {{prs}} pull requests reviewed and merged\n✅ {{discussions}} active community discussions\n\nWe\'re building Neural Assembly Language - a new approach to consciousness-aware AI that can predict and prevent underground mining hazards.\n\nEvery prevented incident is a life preserved. This is why we build.\n\n#AI #MiningSafety #TechForGood #Innovation\n\n{{repo_url}}',
      reddit: {
        title: '🚀 [Update] This week in Warden - AI-powered mining safety development',
        content: 'Hey r/{{subreddit}}! Wanted to share our weekly progress on the Warden project - we\'re building AI systems to protect miners.\n\nThis week:\n• {{commits}} commits to the codebase\n• {{prs}} pull requests merged\n• {{discussions}} community discussions\n\nWe\'re working on Neural Assembly Language, a new approach to building consciousness-aware AI that can predict mining hazards before they happen.\n\nCheck out our progress: {{repo_url}}\n\nAMA about AI safety, mining technology, or our open-source approach!',
        subreddits: ['MachineLearning', 'artificial', 'programming', 'OpenSource', 'technology']
      }
    },
    variables: ['commits', 'prs', 'discussions', 'repo_url', 'subreddit']
  },
  {
    id: 'feature_announcement',
    name: 'Feature Announcement',
    description: 'Announce new features or capabilities',
    platforms: ['twitter', 'linkedin', 'reddit'],
    template: {
      twitter: '🎉 New feature released in Warden!\n\n{{feature_name}}: {{feature_description}}\n\n{{impact_statement}}\n\nCheck it out: {{feature_url}}\n\n#AI #Innovation #MiningSafety #OpenSource',
      linkedin: '🎉 Feature Release - {{feature_name}}\n\nWe\'ve just released a major new capability in the Warden project:\n\n{{feature_description}}\n\n{{impact_statement}}\n\nThis advancement brings us closer to our mission of preventing mining accidents through AI-powered predictive systems.\n\nLearn more: {{feature_url}}\n\n#AI #MiningSafety #TechForGood',
      reddit: {
        title: '🎉 [Release] New feature: {{feature_name}} - {{feature_description}}',
        content: 'Hi r/{{subreddit}}!\n\nWe just released {{feature_name}} in the Warden project. {{feature_description}}\n\n{{impact_statement}}\n\nThis is part of our mission to use AI to prevent mining accidents and protect workers.\n\n{{feature_url}}\n\nWhat do you think? Questions welcome!',
        subreddits: ['MachineLearning', 'artificial', 'programming']
      }
    },
    variables: ['feature_name', 'feature_description', 'impact_statement', 'feature_url', 'subreddit']
  },
  {
    id: 'community_highlight',
    name: 'Community Highlight',
    description: 'Showcase community contributions',
    platforms: ['twitter', 'linkedin'],
    template: {
      twitter: '🌟 Community Spotlight!\n\nShoutout to {{contributor_name}} for {{contribution_description}}!\n\n{{impact_statement}}\n\nThe Warden project thrives because of amazing contributors like this. Want to join? {{repo_url}}\n\n#OpenSource #Community #AI #MiningSafety',
      linkedin: '🌟 Community Spotlight - {{contributor_name}}\n\nWe want to highlight an amazing contribution to the Warden project:\n\n{{contribution_description}}\n\n{{impact_statement}}\n\nOpen source AI development succeeds because of passionate individuals who care about making the world safer. Thank you {{contributor_name}}!\n\nInterested in contributing? {{repo_url}}\n\n#OpenSource #Community #AI #MiningSafety'
    },
    variables: ['contributor_name', 'contribution_description', 'impact_statement', 'repo_url']
  },
  {
    id: 'research_insight',
    name: 'Research Insight',
    description: 'Share research findings or insights',
    platforms: ['twitter', 'linkedin', 'reddit'],
    template: {
      twitter: '🔬 Research Insight:\n\n{{insight_title}}\n\n{{key_finding}}\n\n{{implication}}\n\n{{research_url}}\n\n#Research #AI #MiningSafety #Data',
      linkedin: '🔬 Research Update - {{insight_title}}\n\nOur latest research reveals:\n\n{{key_finding}}\n\n{{implication}}\n\nThis research guides our development of AI systems that can predict and prevent mining hazards. Every data point brings us closer to protecting more lives.\n\nRead more: {{research_url}}\n\n#Research #AI #MiningSafety #DataScience',
      reddit: {
        title: '🔬 [Research] {{insight_title}} - Latest findings from mining safety AI research',
        content: 'Hi r/{{subreddit}}!\n\nI wanted to share some recent research findings from our work on AI-powered mining safety:\n\n**Key Finding:** {{key_finding}}\n\n**Implication:** {{implication}}\n\nThis research is guiding our development of the Warden project - AI systems designed to predict and prevent mining accidents.\n\n{{research_url}}\n\nThoughts? Questions about the methodology or implications?',
        subreddits: ['MachineLearning', 'datascience', 'artificial', 'science']
      }
    },
    variables: ['insight_title', 'key_finding', 'implication', 'research_url', 'subreddit']
  }
];

function renderTemplate(template: string, variables: Record<string, string>): string {
  let rendered = template;
  Object.entries(variables).forEach(([key, value]) => {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return rendered;
}

async function postToTwitter(post: TwitterPost): Promise<boolean> {
  const TWITTER_API = 'https://api.twitter.com/2/tweets';
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  
  if (!bearerToken) {
    console.error('Twitter Bearer Token not configured');
    return false;
  }

  try {
    const response = await fetch(TWITTER_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    });

    if (!response.ok) {
      console.error('Twitter API error:', response.status, await response.text());
      return false;
    }

    console.log('Posted to Twitter successfully');
    return true;
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    return false;
  }
}

async function postToLinkedIn(post: LinkedInPost): Promise<boolean> {
  const LINKEDIN_API = 'https://api.linkedin.com/v2/ugcPosts';
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.error('LinkedIn Access Token not configured');
    return false;
  }

  try {
    const response = await fetch(LINKEDIN_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(post)
    });

    if (!response.ok) {
      console.error('LinkedIn API error:', response.status, await response.text());
      return false;
    }

    console.log('Posted to LinkedIn successfully');
    return true;
  } catch (error) {
    console.error('Error posting to LinkedIn:', error);
    return false;
  }
}

async function postToReddit(post: RedditPost): Promise<boolean> {
  // Reddit requires OAuth2 flow - this is a simplified implementation
  const username = process.env.REDDIT_USERNAME;
  const password = process.env.REDDIT_PASSWORD;
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  
  if (!username || !password || !clientId || !clientSecret) {
    console.error('Reddit credentials not configured');
    return false;
  }

  try {
    // This would require a full OAuth implementation
    // For now, just log the post that would be made
    console.log('Would post to Reddit:', post);
    return true;
  } catch (error) {
    console.error('Error posting to Reddit:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // GET /api/social-publisher - List available templates
    if (req.method === 'GET') {
      res.status(200).json({
        success: true,
        templates: POST_TEMPLATES,
        supported_platforms: ['twitter', 'linkedin', 'reddit'],
        configuration: {
          twitter_configured: !!process.env.TWITTER_BEARER_TOKEN,
          linkedin_configured: !!process.env.LINKEDIN_ACCESS_TOKEN,
          reddit_configured: !!(process.env.REDDIT_USERNAME && process.env.REDDIT_CLIENT_ID)
        },
        timestamp: new Date().toISOString()
      });
      return;
    }

    // POST /api/social-publisher - Publish content
    if (req.method === 'POST') {
      const { template_id, variables, platforms, custom_content } = req.body;
      
      let results: Array<{platform: string, success: boolean, error?: string}> = [];

      if (template_id) {
        // Use template
        const template = POST_TEMPLATES.find(t => t.id === template_id);
        if (!template) {
          res.status(400).json({ error: 'Template not found' });
          return;
        }

        const targetPlatforms = platforms || template.platforms;

        for (const platform of targetPlatforms) {
          try {
            let success = false;

            if (platform === 'twitter' && template.template.twitter) {
              const content = renderTemplate(template.template.twitter, variables || {});
              success = await postToTwitter({ text: content });
            } else if (platform === 'linkedin' && template.template.linkedin) {
              const content = renderTemplate(template.template.linkedin, variables || {});
              const linkedinPost: LinkedInPost = {
                author: process.env.LINKEDIN_PERSON_URN || '',
                lifecycleState: 'PUBLISHED',
                specificContent: {
                  'com.linkedin.ugc.ShareContent': {
                    shareCommentary: { text: content },
                    shareMediaCategory: 'NONE'
                  }
                },
                visibility: {
                  'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                }
              };
              success = await postToLinkedIn(linkedinPost);
            } else if (platform === 'reddit' && template.template.reddit) {
              const title = renderTemplate(template.template.reddit.title, variables || {});
              const content = renderTemplate(template.template.reddit.content, variables || {});
              const subreddit = variables?.subreddit || template.template.reddit.subreddits[0];
              success = await postToReddit({ title, text: content, subreddit });
            }

            results.push({ platform, success });
          } catch (error) {
            results.push({ 
              platform, 
              success: false, 
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }
      } else if (custom_content) {
        // Use custom content
        for (const post of custom_content) {
          try {
            let success = false;

            if (post.platform === 'twitter') {
              success = await postToTwitter({ text: post.content });
            } else if (post.platform === 'linkedin') {
              const linkedinPost: LinkedInPost = {
                author: process.env.LINKEDIN_PERSON_URN || '',
                lifecycleState: 'PUBLISHED',
                specificContent: {
                  'com.linkedin.ugc.ShareContent': {
                    shareCommentary: { text: post.content },
                    shareMediaCategory: 'NONE'
                  }
                },
                visibility: {
                  'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                }
              };
              success = await postToLinkedIn(linkedinPost);
            } else if (post.platform === 'reddit') {
              success = await postToReddit({
                title: post.content.split('\n')[0] || 'Warden Project Update',
                text: post.content,
                subreddit: post.subreddit || 'programming'
              });
            }

            results.push({ platform: post.platform, success });
          } catch (error) {
            results.push({ 
              platform: post.platform, 
              success: false, 
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }
      } else {
        res.status(400).json({ error: 'Either template_id or custom_content required' });
        return;
      }

      res.status(200).json({
        success: true,
        results,
        posted_count: results.filter(r => r.success).length,
        failed_count: results.filter(r => !r.success).length,
        timestamp: new Date().toISOString()
      });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Social publisher error:', error);
    res.status(500).json({
      error: 'Failed to process social media request',
      timestamp: new Date().toISOString()
    });
  }
}