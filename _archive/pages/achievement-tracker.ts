import type { VercelRequest, VercelResponse } from '@vercel/node';

interface Achievement {
  id: string;
  name: string;
  badge: string;
  description: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'contribution' | 'community' | 'technical' | 'leadership';
}

interface UserAchievements {
  username: string;
  avatar_url: string;
  total_points: number;
  achievements: Array<Achievement & { earned_at: string }>;
  level: {
    current: number;
    name: string;
    progress: number;
    next_level_points: number;
  };
  stats: {
    discussions_started: number;
    comments_made: number;
    prs_submitted: number;
    issues_opened: number;
    commits_made: number;
  };
}

const ACHIEVEMENTS: Achievement[] = [
  // Contribution Achievements
  {
    id: 'first_discussion',
    name: 'Conversation Starter',
    badge: '💬',
    description: 'Started your first discussion',
    points: 10,
    rarity: 'common',
    category: 'contribution'
  },
  {
    id: 'helpful_answer',
    name: 'Problem Solver',
    badge: '🎯',
    description: 'Had your answer marked as helpful',
    points: 25,
    rarity: 'rare',
    category: 'contribution'
  },
  {
    id: 'first_pr',
    name: 'Code Contributor',
    badge: '🚀',
    description: 'Submitted your first pull request',
    points: 30,
    rarity: 'rare',
    category: 'contribution'
  },
  {
    id: 'pr_merged',
    name: 'Merged Master',
    badge: '🎉',
    description: 'Had a pull request merged',
    points: 50,
    rarity: 'epic',
    category: 'contribution'
  },
  {
    id: 'multiple_prs',
    name: 'Serial Contributor',
    badge: '⚡',
    description: 'Submitted 5+ pull requests',
    points: 100,
    rarity: 'epic',
    category: 'contribution'
  },

  // Technical Achievements
  {
    id: 'nal_contributor',
    name: 'Neural Pioneer',
    badge: '🧠',
    description: 'Contributed to Neural Assembly Language development',
    points: 75,
    rarity: 'epic',
    category: 'technical'
  },
  {
    id: 'safety_researcher',
    name: 'Safety Guardian',
    badge: '⛑️',
    description: 'Contributed mining safety research or improvements',
    points: 60,
    rarity: 'rare',
    category: 'technical'
  },
  {
    id: 'documentation_hero',
    name: 'Knowledge Keeper',
    badge: '📚',
    description: 'Significantly improved project documentation',
    points: 40,
    rarity: 'rare',
    category: 'technical'
  },
  {
    id: 'bug_hunter',
    name: 'Bug Hunter',
    badge: '🐛',
    description: 'Reported and helped fix critical bugs',
    points: 35,
    rarity: 'rare',
    category: 'technical'
  },

  // Community Achievements
  {
    id: 'community_builder',
    name: 'Community Builder',
    badge: '🌍',
    description: 'Brought 5+ new members to the community',
    points: 80,
    rarity: 'epic',
    category: 'community'
  },
  {
    id: 'mentor',
    name: 'Mentor',
    badge: '🤝',
    description: 'Helped multiple newcomers get started',
    points: 70,
    rarity: 'epic',
    category: 'community'
  },
  {
    id: 'active_discusser',
    name: 'Discussion Champion',
    badge: '🗣️',
    description: 'Participated in 20+ discussions',
    points: 45,
    rarity: 'rare',
    category: 'community'
  },
  {
    id: 'early_adopter',
    name: 'Early Adopter',
    badge: '🌟',
    description: 'Joined the community in its early days',
    points: 20,
    rarity: 'common',
    category: 'community'
  },

  // Leadership Achievements
  {
    id: 'project_lead',
    name: 'Project Leader',
    badge: '👑',
    description: 'Led a significant project initiative',
    points: 200,
    rarity: 'legendary',
    category: 'leadership'
  },
  {
    id: 'vision_contributor',
    name: 'Visionary',
    badge: '🔮',
    description: 'Contributed to strategic project direction',
    points: 150,
    rarity: 'legendary',
    category: 'leadership'
  }
];

const LEVELS = [
  { level: 1, name: 'Newcomer', min_points: 0 },
  { level: 2, name: 'Contributor', min_points: 50 },
  { level: 3, name: 'Active Member', min_points: 150 },
  { level: 4, name: 'Core Contributor', min_points: 300 },
  { level: 5, name: 'Community Leader', min_points: 500 },
  { level: 6, name: 'Project Veteran', min_points: 800 },
  { level: 7, name: 'Warden Guardian', min_points: 1200 },
  { level: 8, name: 'Neural Assembly Master', min_points: 1800 },
  { level: 9, name: 'Safety Pioneer', min_points: 2500 },
  { level: 10, name: 'Earthform Legend', min_points: 3500 }
];

function calculateLevel(points: number) {
  const currentLevel = LEVELS.slice().reverse().find(l => points >= l.min_points) || LEVELS[0];
  const nextLevel = LEVELS.find(l => l.min_points > points);
  
  return {
    current: currentLevel.level,
    name: currentLevel.name,
    progress: nextLevel ? Math.round(((points - currentLevel.min_points) / (nextLevel.min_points - currentLevel.min_points)) * 100) : 100,
    next_level_points: nextLevel ? nextLevel.min_points : currentLevel.min_points
  };
}

async function checkUserAchievements(username: string): Promise<UserAchievements> {
  const GITHUB_API = 'https://api.github.com';
  const REPO = 'Earthform-AI/warden-landing';
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'Warden-Achievement-Tracker'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // Fetch user info
    const userResponse = await fetch(`${GITHUB_API}/users/${username}`, { headers });
    const userData = await userResponse.json();

    // Initialize stats
    const stats = {
      discussions_started: 0,
      comments_made: 0,
      prs_submitted: 0,
      issues_opened: 0,
      commits_made: 0
    };

    const earnedAchievements: Array<Achievement & { earned_at: string }> = [];

    // Check basic participation achievements
    if (true) { // Everyone gets early adopter for now
      const achievement = ACHIEVEMENTS.find(a => a.id === 'early_adopter');
      if (achievement) {
        earnedAchievements.push({
          ...achievement,
          earned_at: new Date().toISOString()
        });
      }
    }

    // Fetch user's GitHub activity
    try {
      // Check commits (simplified - would need search API for comprehensive data)
      const commitsResponse = await fetch(`${GITHUB_API}/repos/${REPO}/commits?author=${username}`, { headers });
      if (commitsResponse.ok) {
        const commits = await commitsResponse.json();
        stats.commits_made = Array.isArray(commits) ? commits.length : 0;
      }

      // Check PRs
      const prsResponse = await fetch(`${GITHUB_API}/search/issues?q=type:pr+author:${username}+repo:${REPO}`, { headers });
      if (prsResponse.ok) {
        const prsData = await prsResponse.json();
        stats.prs_submitted = prsData.total_count || 0;
        
        if (stats.prs_submitted > 0) {
          const firstPr = ACHIEVEMENTS.find(a => a.id === 'first_pr');
          if (firstPr) {
            earnedAchievements.push({
              ...firstPr,
              earned_at: new Date().toISOString()
            });
          }
        }
        
        if (stats.prs_submitted >= 5) {
          const multiplePrs = ACHIEVEMENTS.find(a => a.id === 'multiple_prs');
          if (multiplePrs) {
            earnedAchievements.push({
              ...multiplePrs,
              earned_at: new Date().toISOString()
            });
          }
        }
      }

      // Check issues
      const issuesResponse = await fetch(`${GITHUB_API}/search/issues?q=type:issue+author:${username}+repo:${REPO}`, { headers });
      if (issuesResponse.ok) {
        const issuesData = await issuesResponse.json();
        stats.issues_opened = issuesData.total_count || 0;
      }

      // Award specialty achievements based on patterns
      if (Math.random() > 0.7) { // Simplified logic for demo
        const specialAchievements = ['nal_contributor', 'safety_researcher', 'documentation_hero'];
        const randomAchievement = ACHIEVEMENTS.find(a => a.id === specialAchievements[Math.floor(Math.random() * specialAchievements.length)]);
        if (randomAchievement) {
          earnedAchievements.push({
            ...randomAchievement,
            earned_at: new Date().toISOString()
          });
        }
      }

    } catch (error) {
      console.error('Error fetching user activity:', error);
    }

    // Calculate total points
    const totalPoints = earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
    const level = calculateLevel(totalPoints);

    return {
      username,
      avatar_url: userData.avatar_url || '',
      total_points: totalPoints,
      achievements: earnedAchievements,
      level,
      stats
    };

  } catch (error) {
    console.error('Error checking achievements:', error);
    
    // Return basic profile on error
    return {
      username,
      avatar_url: '',
      total_points: 0,
      achievements: [],
      level: calculateLevel(0),
      stats: {
        discussions_started: 0,
        comments_made: 0,
        prs_submitted: 0,
        issues_opened: 0,
        commits_made: 0
      }
    };
  }
}

async function getLeaderboard(): Promise<Array<{username: string, avatar_url: string, total_points: number, level: string}>> {
  // This would typically fetch from a database
  // For now, return a sample leaderboard
  const sampleUsers = ['octocat', 'defunkt', 'mojombo', 'pjhyett', 'wycats'];
  
  const leaderboard = await Promise.all(
    sampleUsers.map(async username => {
      const achievements = await checkUserAchievements(username);
      return {
        username: achievements.username,
        avatar_url: achievements.avatar_url,
        total_points: achievements.total_points,
        level: achievements.level.name
      };
    })
  );

  return leaderboard.sort((a, b) => b.total_points - a.total_points);
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
    // GET /api/achievement-tracker - Get leaderboard
    if (req.method === 'GET' && !req.query.username) {
      const leaderboard = await getLeaderboard();
      res.status(200).json({
        success: true,
        leaderboard,
        total_achievements: ACHIEVEMENTS.length,
        levels: LEVELS,
        timestamp: new Date().toISOString()
      });
      return;
    }

    // GET /api/achievement-tracker?username=xyz - Get specific user achievements
    if (req.method === 'GET' && req.query.username) {
      const username = req.query.username as string;
      const achievements = await checkUserAchievements(username);
      res.status(200).json({
        success: true,
        user: achievements,
        available_achievements: ACHIEVEMENTS,
        timestamp: new Date().toISOString()
      });
      return;
    }

    // POST /api/achievement-tracker - Award manual achievement
    if (req.method === 'POST') {
      const { username, achievement_id, reason } = req.body;
      
      if (!username || !achievement_id) {
        res.status(400).json({ error: 'Username and achievement_id required' });
        return;
      }

      // In a real implementation, this would update the database
      res.status(200).json({
        success: true,
        message: `Achievement ${achievement_id} awarded to ${username}`,
        reason: reason || 'Manual award',
        timestamp: new Date().toISOString()
      });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Achievement tracker error:', error);
    res.status(500).json({
      error: 'Failed to process achievement request',
      timestamp: new Date().toISOString()
    });
  }
}