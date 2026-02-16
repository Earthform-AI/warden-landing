import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CommunityStats {
  github: {
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
    }>;
    repository: {
      stars: number;
      forks: number;
    };
  };
  community: {
    growth: {
      weekly_new_discussions: number;
      engagement_rate: number;
    };
    top_contributors: Array<{
      username: string;
      avatar_url: string;
      score: number;
      achievements: string[];
    }>;
  };
}

interface Achievement {
  username: string;
  achievements: Array<{
    name: string;
    badge: string;
    points: number;
    rarity: string;
  }>;
  level: {
    name: string;
    current: number;
  };
}

const CommunitySpotlight: React.FC = () => {
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [topContributors, setTopContributors] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'contributors' | 'achievements'>('stats');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch community stats
        const statsResponse = await fetch('/api/community-stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Fetch achievement leaderboard
        const achievementsResponse = await fetch('/api/achievement-tracker');
        if (achievementsResponse.ok) {
          const achievementsData = await achievementsResponse.json();
          // Simulate some achievement data
          setTopContributors([
            {
              username: 'neural_pioneer',
              achievements: [
                { name: 'Neural Pioneer', badge: '🧠', points: 75, rarity: 'epic' },
                { name: 'Safety Guardian', badge: '⛑️', points: 60, rarity: 'rare' },
                { name: 'Code Contributor', badge: '🚀', points: 30, rarity: 'rare' }
              ],
              level: { name: 'Core Contributor', current: 4 }
            },
            {
              username: 'safety_first',
              achievements: [
                { name: 'Safety Guardian', badge: '⛑️', points: 60, rarity: 'rare' },
                { name: 'Problem Solver', badge: '🎯', points: 25, rarity: 'rare' },
                { name: 'Community Builder', badge: '🌍', points: 80, rarity: 'epic' }
              ],
              level: { name: 'Active Member', current: 3 }
            },
            {
              username: 'code_quality',
              achievements: [
                { name: 'Knowledge Keeper', badge: '📚', points: 40, rarity: 'rare' },
                { name: 'Bug Hunter', badge: '🐛', points: 35, rarity: 'rare' },
                { name: 'Serial Contributor', badge: '⚡', points: 100, rarity: 'epic' }
              ],
              level: { name: 'Core Contributor', current: 4 }
            }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch community data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900/60 rounded-2xl p-8 border border-gray-700/50">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section className="bg-gray-900/60 rounded-2xl p-8 border border-gray-700/50 mb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            🌟 Community Spotlight
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Celebrating our contributors and tracking community progress
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1 flex space-x-1">
              {[
                { id: 'stats', label: '📊 Stats', icon: '📊' },
                { id: 'contributors', label: '👥 Contributors', icon: '👥' },
                { id: 'achievements', label: '🏆 Achievements', icon: '🏆' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Tab */}
          {activeTab === 'stats' && stats && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="bg-blue-900/30 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {stats.github.discussions.total}
                </div>
                <div className="text-gray-300 text-sm">Total Discussions</div>
                <div className="text-green-400 text-xs mt-1">
                  +{stats.github.discussions.recent} this week
                </div>
              </div>
              
              <div className="bg-green-900/30 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {stats.github.contributors.length}
                </div>
                <div className="text-gray-300 text-sm">Active Contributors</div>
                <div className="text-blue-400 text-xs mt-1">
                  {stats.community.growth.engagement_rate}% engagement
                </div>
              </div>
              
              <div className="bg-purple-900/30 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {stats.github.repository.stars}
                </div>
                <div className="text-gray-300 text-sm">GitHub Stars</div>
                <div className="text-yellow-400 text-xs mt-1">
                  {stats.github.repository.forks} forks
                </div>
              </div>
            </motion.div>
          )}

          {/* Contributors Tab */}
          {activeTab === 'contributors' && stats && (
            <motion.div
              key="contributors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Top Contributors</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.github.contributors.slice(0, 6).map((contributor, index) => (
                  <div key={contributor.login} className="bg-gray-800/50 rounded-lg p-4 flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={contributor.avatar_url} 
                        alt={contributor.login}
                        className="w-12 h-12 rounded-full"
                      />
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{contributor.login}</div>
                      <div className="text-sm text-gray-400">{contributor.contributions} contributions</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Achievement Leaderboard</h3>
              {topContributors.map((contributor, index) => (
                <div key={contributor.username} className="bg-gray-800/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {contributor.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          #{index + 1}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">{contributor.username}</div>
                        <div className="text-sm text-gray-400">Level {contributor.level.current} - {contributor.level.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        {contributor.achievements.reduce((sum, achievement) => sum + achievement.points, 0)}
                      </div>
                      <div className="text-sm text-gray-400">points</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {contributor.achievements.map((achievement, achIndex) => (
                      <div 
                        key={achIndex}
                        className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-700/50 border ${getRarityColor(achievement.rarity)} border-current/20`}
                      >
                        <span className="text-lg">{achievement.badge}</span>
                        <span className="text-sm font-medium">{achievement.name}</span>
                        <span className="text-xs opacity-75">{achievement.points}pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-8">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                  View Full Leaderboard
                </button>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8 pt-8 border-t border-gray-700/50"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Join Our Community</h3>
            <p className="text-gray-300 mb-6">
              Contribute to the future of AI-powered mining safety. Every contribution matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/Earthform-AI/warden-landing/discussions"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Join Discussions
              </a>
              <a 
                href="https://github.com/Earthform-AI/warden-landing"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 Contribute Code
              </a>
              <a 
                href="/research"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                📊 View Research
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySpotlight;