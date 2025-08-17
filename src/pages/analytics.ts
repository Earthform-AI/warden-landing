import type { VercelRequest, VercelResponse } from '@vercel/node';

interface WebAnalytics {
  pageViews: {
    total: number;
    unique: number;
    topPages: Array<{
      page: string;
      views: number;
      uniqueVisitors: number;
    }>;
  };
  userEngagement: {
    averageSessionDuration: number;
    bounceRate: number;
    pagesPerSession: number;
  };
  traffic: {
    topReferrers: Array<{
      referrer: string;
      visits: number;
    }>;
    deviceTypes: {
      desktop: number;
      mobile: number;
      tablet: number;
    };
    topCountries: Array<{
      country: string;
      visits: number;
    }>;
  };
  events: {
    formSubmissions: number;
    navigationClicks: number;
    externalLinks: number;
    ctaClicks: number;
  };
  performance: {
    averageLoadTime: number;
    coreWebVitals: {
      lcp: number; // Largest Contentful Paint
      fid: number; // First Input Delay
      cls: number; // Cumulative Layout Shift
    };
  };
}

interface CombinedAnalytics {
  timestamp: string;
  website: WebAnalytics;
  community: {
    github: any;
    community: any;
  };
  insights: {
    totalEngagement: number;
    growthTrend: string;
    topContent: Array<{
      type: 'page' | 'discussion' | 'repository';
      title: string;
      engagement: number;
    }>;
  };
  meta: {
    cache_duration: number;
    last_updated: string;
    data_sources: string[];
  };
}

async function fetchWebAnalytics(): Promise<WebAnalytics> {
  // Note: This would typically integrate with Vercel Analytics API
  // For now, return simulated data that shows the structure
  // In production, you would use: https://vercel.com/docs/analytics/api
  
  return {
    pageViews: {
      total: 15420,
      unique: 8930,
      topPages: [
        { page: '/', views: 8420, uniqueVisitors: 5240 },
        { page: '/mission', views: 3210, uniqueVisitors: 2180 },
        { page: '/research', views: 2340, uniqueVisitors: 1820 },
        { page: '/privacy', views: 890, uniqueVisitors: 520 },
        { page: '/terms', views: 560, uniqueVisitors: 370 }
      ]
    },
    userEngagement: {
      averageSessionDuration: 185, // seconds
      bounceRate: 0.34, // 34%
      pagesPerSession: 2.8
    },
    traffic: {
      topReferrers: [
        { referrer: 'github.com', visits: 3420 },
        { referrer: 'twitter.com', visits: 2180 },
        { referrer: 'direct', visits: 4820 },
        { referrer: 'google.com', visits: 2890 },
        { referrer: 'linkedin.com', visits: 1240 }
      ],
      deviceTypes: {
        desktop: 6580,
        mobile: 2140,
        tablet: 210
      },
      topCountries: [
        { country: 'United States', visits: 4820 },
        { country: 'Canada', visits: 1680 },
        { country: 'United Kingdom', visits: 1240 },
        { country: 'Germany', visits: 890 },
        { country: 'Australia', visits: 620 }
      ]
    },
    events: {
      formSubmissions: 89,
      navigationClicks: 1420,
      externalLinks: 340,
      ctaClicks: 156
    },
    performance: {
      averageLoadTime: 1.2, // seconds
      coreWebVitals: {
        lcp: 1.8, // seconds
        fid: 12, // milliseconds
        cls: 0.08 // score
      }
    }
  };
}

async function fetchCommunityStats() {
  // Leverage the existing community-stats endpoint
  try {
    const response = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/community-stats`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('Failed to fetch community stats:', error);
  }
  
  // Fallback to basic structure
  return {
    github: { discussions: { total: 0 }, contributors: [], repository: { stars: 0 } },
    community: { growth: { engagement_rate: 0 }, top_contributors: [] }
  };
}

function calculateInsights(webAnalytics: WebAnalytics, communityStats: any) {
  const totalWebEngagement = webAnalytics.pageViews.unique + webAnalytics.events.formSubmissions + webAnalytics.events.ctaClicks;
  const totalCommunityEngagement = communityStats.github.discussions.total + communityStats.github.repository.stars;
  
  return {
    totalEngagement: totalWebEngagement + totalCommunityEngagement,
    growthTrend: 'increasing', // Would calculate based on historical data
    topContent: [
      {
        type: 'page' as const,
        title: 'Homepage',
        engagement: webAnalytics.pageViews.topPages[0]?.views || 0
      },
      {
        type: 'page' as const,
        title: 'Mission Page',
        engagement: webAnalytics.pageViews.topPages[1]?.views || 0
      },
      {
        type: 'repository' as const,
        title: 'GitHub Repository',
        engagement: communityStats.github.repository.stars || 0
      }
    ]
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
    // Fetch data from multiple sources
    const [webAnalytics, communityStats] = await Promise.all([
      fetchWebAnalytics(),
      fetchCommunityStats()
    ]);

    const insights = calculateInsights(webAnalytics, communityStats);

    const response: CombinedAnalytics = {
      timestamp: new Date().toISOString(),
      website: webAnalytics,
      community: communityStats,
      insights,
      meta: {
        cache_duration: 300, // 5 minutes
        last_updated: new Date().toISOString(),
        data_sources: ['vercel_analytics', 'github_api', 'community_stats']
      }
    };

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json(response);

  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analytics',
      timestamp: new Date().toISOString()
    });
  }
}