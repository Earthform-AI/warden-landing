import type { VercelRequest, VercelResponse } from '@vercel/node';

interface WeeklyDigest {
  week: string;
  period: {
    start: string;
    end: string;
  };
  highlights: {
    most_discussed: {
      title: string;
      url: string;
      comments: number;
      upvotes: number;
    } | null;
    total_discussions: number;
    top_contributors: string[];
    new_contributors: string[];
  };
  categories: {
    [key: string]: {
      discussions: number;
      highlights: Array<{
        title: string;
        url: string;
        author: string;
      }>;
    };
  };
  development: {
    commits: number;
    pull_requests: number;
    issues_closed: number;
    releases: Array<{
      name: string;
      tag: string;
      url: string;
    }>;
  };
  social_impact: {
    github_stars_gained: number;
    community_growth: number;
    engagement_rate: number;
  };
}

async function generateWeeklyDigest(): Promise<WeeklyDigest> {
  const now = new Date();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const GITHUB_API = 'https://api.github.com';
  const REPO = 'Earthform-AI/warden-landing';
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'Warden-Weekly-Digest'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // Fetch recent commits
    const commitsResponse = await fetch(
      `${GITHUB_API}/repos/${REPO}/commits?since=${weekStart.toISOString()}`, 
      { headers }
    );
    const commits = await commitsResponse.json();
    const commitCount = Array.isArray(commits) ? commits.length : 0;

    // Fetch recent pull requests
    const prsResponse = await fetch(
      `${GITHUB_API}/repos/${REPO}/pulls?state=all&sort=updated&direction=desc`, 
      { headers }
    );
    const prs = await prsResponse.json();
    const recentPRs = Array.isArray(prs) ? prs.filter((pr: any) => 
      new Date(pr.updated_at) > weekStart
    ) : [];

    // Fetch recent issues
    const issuesResponse = await fetch(
      `${GITHUB_API}/repos/${REPO}/issues?state=closed&sort=updated&direction=desc`, 
      { headers }
    );
    const issues = await issuesResponse.json();
    const recentIssues = Array.isArray(issues) ? issues.filter((issue: any) => 
      new Date(issue.closed_at || issue.updated_at) > weekStart
    ) : [];

    // Fetch discussions if token available
    let discussionData = {
      total: 0,
      mostDiscussed: null,
      categories: {} as any,
      contributors: [] as string[]
    };

    if (process.env.GITHUB_TOKEN) {
      const graphqlQuery = `
        query($since: DateTime!) {
          repository(owner: "Earthform-AI", name: "warden-landing") {
            discussions(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}) {
              nodes {
                title
                url
                createdAt
                updatedAt
                upvoteCount
                comments {
                  totalCount
                }
                category {
                  name
                }
                author {
                  login
                }
              }
            }
          }
        }
      `;

      const graphqlResponse = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          query: graphqlQuery,
          variables: { since: weekStart.toISOString() }
        })
      });

      if (graphqlResponse.ok) {
        const data = await graphqlResponse.json();
        const discussions = data.data?.repository?.discussions?.nodes || [];
        
        const recentDiscussions = discussions.filter((d: any) => 
          new Date(d.updatedAt) > weekStart
        );

        discussionData.total = recentDiscussions.length;
        discussionData.contributors = [...new Set(recentDiscussions.map((d: any) => d.author?.login).filter(Boolean))];

        // Find most discussed
        if (recentDiscussions.length > 0) {
          const sorted = recentDiscussions.sort((a: any, b: any) => 
            (b.comments?.totalCount || 0) + (b.upvoteCount || 0) - 
            ((a.comments?.totalCount || 0) + (a.upvoteCount || 0))
          );
          
          const top = sorted[0];
          discussionData.mostDiscussed = {
            title: top.title,
            url: top.url,
            comments: top.comments?.totalCount || 0,
            upvotes: top.upvoteCount || 0
          };
        }

        // Group by categories
        recentDiscussions.forEach((d: any) => {
          const category = d.category?.name || 'General';
          if (!discussionData.categories[category]) {
            discussionData.categories[category] = {
              discussions: 0,
              highlights: []
            };
          }
          discussionData.categories[category].discussions++;
          if (discussionData.categories[category].highlights.length < 3) {
            discussionData.categories[category].highlights.push({
              title: d.title,
              url: d.url,
              author: d.author?.login || 'Unknown'
            });
          }
        });
      }
    }

    // Calculate social impact (simplified)
    const repoResponse = await fetch(`${GITHUB_API}/repos/${REPO}`, { headers });
    const repoData = await repoResponse.json();
    const currentStars = repoData.stargazers_count || 0;

    return {
      week: `Week of ${weekStart.toLocaleDateString()}`,
      period: {
        start: weekStart.toISOString(),
        end: now.toISOString()
      },
      highlights: {
        most_discussed: discussionData.mostDiscussed,
        total_discussions: discussionData.total,
        top_contributors: discussionData.contributors.slice(0, 5),
        new_contributors: discussionData.contributors.slice(-3) // Last 3 as "new" (simplified)
      },
      categories: discussionData.categories,
      development: {
        commits: commitCount,
        pull_requests: recentPRs.length,
        issues_closed: recentIssues.length,
        releases: [] // Would fetch from releases API
      },
      social_impact: {
        github_stars_gained: Math.max(0, currentStars - Math.floor(currentStars * 0.95)), // Estimate
        community_growth: discussionData.contributors.length,
        engagement_rate: Math.min(100, (discussionData.total + commitCount + recentPRs.length) * 10)
      }
    };
  } catch (error) {
    console.error('Error generating weekly digest:', error);
    
    // Return minimal digest on error
    return {
      week: `Week of ${weekStart.toLocaleDateString()}`,
      period: {
        start: weekStart.toISOString(),
        end: now.toISOString()
      },
      highlights: {
        most_discussed: null,
        total_discussions: 0,
        top_contributors: [],
        new_contributors: []
      },
      categories: {},
      development: {
        commits: 0,
        pull_requests: 0,
        issues_closed: 0,
        releases: []
      },
      social_impact: {
        github_stars_gained: 0,
        community_growth: 0,
        engagement_rate: 0
      }
    };
  }
}

async function postDigestToDiscord(digest: WeeklyDigest) {
  const webhookUrl = process.env.DISCORD_DIGEST_WEBHOOK || process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const embed = {
    title: `📊 ${digest.week} - Community Digest`,
    description: `Here's what happened in the Warden community this week!`,
    color: 0x8b5cf6,
    fields: [
      {
        name: '💬 Discussions',
        value: `${digest.highlights.total_discussions} new discussions${digest.highlights.most_discussed ? `\n🔥 Most active: [${digest.highlights.most_discussed.title}](${digest.highlights.most_discussed.url})` : ''}`,
        inline: true
      },
      {
        name: '⚡ Development',
        value: `${digest.development.commits} commits\n${digest.development.pull_requests} pull requests\n${digest.development.issues_closed} issues closed`,
        inline: true
      },
      {
        name: '🌟 Community Growth',
        value: `${digest.social_impact.github_stars_gained} new stars\n${digest.social_impact.community_growth} active contributors\n${digest.social_impact.engagement_rate}% engagement rate`,
        inline: true
      }
    ],
    footer: {
      text: 'Warden Community • Weekly Digest',
      icon_url: 'https://warden-landing.vercel.app/favicon.svg'
    },
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [embed],
        username: 'Warden Community Bot'
      })
    });
  } catch (error) {
    console.error('Failed to post digest to Discord:', error);
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
    const digest = await generateWeeklyDigest();

    // If POST request, also send to Discord
    if (req.method === 'POST') {
      await postDigestToDiscord(digest);
    }

    res.status(200).json({
      success: true,
      digest,
      posted_to_discord: req.method === 'POST',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weekly digest error:', error);
    res.status(500).json({
      error: 'Failed to generate weekly digest',
      timestamp: new Date().toISOString()
    });
  }
}