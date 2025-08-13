import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GitHubStats {
  discussions: {
    total: number;
    recent: number;
    topCategories: Array<{
      name: string;
      count: number;
    }>;
  };
  contributors: Array<{
    login: string;
    avatar_url: string;
    contributions: number;
    recent_activity: string;
  }>;
  repository: {
    stars: number;
    forks: number;
    issues: number;
    pull_requests: number;
  };
}

interface CommunityMetrics {
  growth: {
    weekly_new_discussions: number;
    weekly_new_contributors: number;
    engagement_rate: number;
  };
  top_contributors: Array<{
    username: string;
    avatar_url: string;
    score: number;
    achievements: string[];
  }>;
  recent_highlights: Array<{
    type: 'discussion' | 'pr' | 'issue';
    title: string;
    url: string;
    author: string;
    date: string;
  }>;
}

async function fetchGitHubStats(): Promise<GitHubStats> {
  const GITHUB_API = 'https://api.github.com';
  const REPO = 'Earthform-AI/warden-landing';
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'Warden-Landing-Stats'
  };

  // Add GitHub token if available for higher rate limits
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // Fetch repository info
    const repoResponse = await fetch(`${GITHUB_API}/repos/${REPO}`, { headers });
    const repoData = await repoResponse.json();

    // Fetch discussions using GraphQL API (if token available)
    let discussions = { total: 0, recent: 0, topCategories: [] };
    if (process.env.GITHUB_TOKEN) {
      const graphqlQuery = `
        query {
          repository(owner: "Earthform-AI", name: "warden-landing") {
            discussions(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
              totalCount
              nodes {
                title
                createdAt
                category {
                  name
                }
                author {
                  login
                  avatarUrl
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
        body: JSON.stringify({ query: graphqlQuery })
      });

      if (graphqlResponse.ok) {
        const graphqlData = await graphqlResponse.json();
        const discussionNodes = graphqlData.data?.repository?.discussions?.nodes || [];
        
        discussions.total = graphqlData.data?.repository?.discussions?.totalCount || 0;
        
        // Count recent discussions (last week)
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        discussions.recent = discussionNodes.filter((d: any) => 
          new Date(d.createdAt) > oneWeekAgo
        ).length;

        // Count categories
        const categoryCount: Record<string, number> = {};
        discussionNodes.forEach((d: any) => {
          if (d.category?.name) {
            categoryCount[d.category.name] = (categoryCount[d.category.name] || 0) + 1;
          }
        });
        
        discussions.topCategories = Object.entries(categoryCount)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
      }
    }

    // Fetch contributors
    const contributorsResponse = await fetch(`${GITHUB_API}/repos/${REPO}/contributors`, { headers });
    const contributorsData = await contributorsResponse.json();

    const contributors = Array.isArray(contributorsData) 
      ? contributorsData.slice(0, 10).map((c: any) => ({
          login: c.login,
          avatar_url: c.avatar_url,
          contributions: c.contributions,
          recent_activity: new Date().toISOString() // Placeholder
        }))
      : [];

    return {
      discussions,
      contributors,
      repository: {
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        issues: repoData.open_issues_count || 0,
        pull_requests: 0 // Would need separate API call
      }
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Return default/empty stats
    return {
      discussions: { total: 0, recent: 0, topCategories: [] },
      contributors: [],
      repository: { stars: 0, forks: 0, issues: 0, pull_requests: 0 }
    };
  }
}

function calculateCommunityMetrics(githubStats: GitHubStats): CommunityMetrics {
  // Calculate engagement rate (simple heuristic)
  const totalActivity = githubStats.discussions.total + githubStats.repository.stars + githubStats.repository.forks;
  const engagementRate = githubStats.contributors.length > 0 
    ? Math.min(100, (totalActivity / githubStats.contributors.length) * 10)
    : 0;

  // Generate achievement badges based on contribution patterns
  const topContributors = githubStats.contributors.slice(0, 5).map(contributor => {
    const achievements: string[] = [];
    
    if (contributor.contributions >= 50) achievements.push('🏆 Major Contributor');
    if (contributor.contributions >= 20) achievements.push('💪 Active Contributor');
    if (contributor.contributions >= 10) achievements.push('🌟 Regular Contributor');
    if (contributor.contributions >= 1) achievements.push('🚀 First Contributor');

    // Random achievement assignment for demo (would be based on actual activity)
    const randomAchievements = ['🧠 Neural Pioneer', '⛑️ Safety Guardian', '🔧 Code Quality', '📚 Documentation'];
    if (Math.random() > 0.5) {
      achievements.push(randomAchievements[Math.floor(Math.random() * randomAchievements.length)]);
    }

    return {
      username: contributor.login,
      avatar_url: contributor.avatar_url,
      score: contributor.contributions,
      achievements: achievements.slice(0, 3) // Limit to 3 badges
    };
  });

  return {
    growth: {
      weekly_new_discussions: githubStats.discussions.recent,
      weekly_new_contributors: Math.floor(githubStats.contributors.length * 0.1), // Estimate
      engagement_rate: Math.round(engagementRate)
    },
    top_contributors: topContributors,
    recent_highlights: [] // Would be populated with actual recent activity
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const githubStats = await fetchGitHubStats();
    const communityMetrics = calculateCommunityMetrics(githubStats);

    const response = {
      timestamp: new Date().toISOString(),
      github: githubStats,
      community: communityMetrics,
      meta: {
        cache_duration: 300, // 5 minutes
        last_updated: new Date().toISOString()
      }
    };

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json(response);
  } catch (error) {
    console.error('Community stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch community stats',
      timestamp: new Date().toISOString()
    });
  }
}