import type { VercelRequest, VercelResponse } from '@vercel/node';

interface DiscordInteraction {
  type: number;
  data?: {
    name: string;
    options?: Array<{
      name: string;
      value: string;
    }>;
  };
  user?: {
    id: string;
    username: string;
  };
  member?: {
    user: {
      id: string;
      username: string;
    };
  };
}

interface DiscordResponse {
  type: number;
  data?: {
    content?: string;
    embeds?: Array<{
      title: string;
      description: string;
      color: number;
      fields?: Array<{
        name: string;
        value: string;
        inline?: boolean;
      }>;
      footer?: {
        text: string;
      };
      timestamp?: string;
    }>;
    flags?: number;
  };
}

const INTERACTION_TYPES = {
  PING: 1,
  APPLICATION_COMMAND: 2
};

const RESPONSE_TYPES = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5
};

const COMMANDS = {
  'warden-status': {
    name: 'warden-status',
    description: 'Get the latest Warden project updates',
    handler: async () => {
      // Fetch latest stats from GitHub
      try {
        const response = await fetch(`${process.env.VERCEL_URL || 'https://warden-landing.vercel.app'}/api/community-stats`);
        const stats = await response.json();

        return {
          type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [{
              title: '🛡️ Warden Project Status',
              description: 'AI-powered mining safety systems in development',
              color: 0x8b5cf6,
              fields: [
                {
                  name: '💬 Community Activity',
                  value: `${stats.github?.discussions?.total || 0} discussions\n${stats.github?.contributors?.length || 0} contributors`,
                  inline: true
                },
                {
                  name: '⭐ GitHub Stats',
                  value: `${stats.github?.repository?.stars || 0} stars\n${stats.github?.repository?.forks || 0} forks`,
                  inline: true
                },
                {
                  name: '📈 Growth',
                  value: `${stats.community?.growth?.weekly_new_discussions || 0} new discussions this week\n${stats.community?.growth?.engagement_rate || 0}% engagement rate`,
                  inline: true
                }
              ],
              footer: {
                text: 'Protecting miners through AI • earthform.ai'
              },
              timestamp: new Date().toISOString()
            }]
          }
        };
      } catch (error) {
        return {
          type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '⚠️ Unable to fetch current status. Please try again later or check https://github.com/Earthform-AI/warden-landing'
          }
        };
      }
    }
  },

  'contribute': {
    name: 'contribute',
    description: 'Learn how to contribute to the Warden project',
    handler: async () => ({
      type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [{
          title: '🚀 How to Contribute to Warden',
          description: 'Join our mission to protect miners through AI technology',
          color: 0x00ff00,
          fields: [
            {
              name: '💬 Join Discussions',
              value: '[GitHub Discussions](https://github.com/Earthform-AI/warden-landing/discussions)\nShare ideas, ask questions, propose features',
              inline: false
            },
            {
              name: '🧠 Neural Assembly Language',
              value: '[NAL Development](https://github.com/Earthform-AI/warden-landing)\nHelp build consciousness-aware AI systems',
              inline: false
            },
            {
              name: '⛑️ Mining Safety Research',
              value: '[Research Portal](/research)\nContribute data, analysis, and insights',
              inline: false
            },
            {
              name: '🛠️ Code Contributions',
              value: '[Open Issues](https://github.com/Earthform-AI/warden-landing/issues)\nBug fixes, features, documentation',
              inline: false
            }
          ],
          footer: {
            text: 'Every contribution saves lives • Get started today'
          }
        }]
      }
    })
  },

  'neural-asm': {
    name: 'neural-asm',
    description: 'Learn about Neural Assembly Language',
    handler: async () => ({
      type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [{
          title: '🧠 Neural Assembly Language (NAL)',
          description: 'Revolutionary approach to consciousness-aware AI programming',
          color: 0x7c3aed,
          fields: [
            {
              name: '🔬 What is NAL?',
              value: 'A new programming paradigm that allows AI systems to understand their own consciousness and make ethical decisions in real-time.',
              inline: false
            },
            {
              name: '⛏️ Mining Applications',
              value: 'NAL enables Warden drones to:\n• Predict hazards before they occur\n• Make life-saving decisions autonomously\n• Understand the value of human life',
              inline: false
            },
            {
              name: '🚀 Getting Started',
              value: '[Documentation](https://github.com/Earthform-AI/warden-landing)\n[Examples & Tutorials](https://github.com/Earthform-AI/warden-landing/discussions)\n[Architecture Overview](/mission)',
              inline: false
            },
            {
              name: '🤝 Community',
              value: 'Join researchers and developers building the future of conscious AI. Share your ideas in our discussions!',
              inline: false
            }
          ],
          footer: {
            text: 'Neural Assembly Language • The future of conscious AI'
          }
        }]
      }
    })
  },

  'roadmap': {
    name: 'roadmap',
    description: 'View the Warden project timeline and milestones',
    handler: async () => ({
      type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [{
          title: '🗺️ Warden Development Roadmap',
          description: 'Our path to revolutionizing mining safety',
          color: 0xffd700,
          fields: [
            {
              name: '🚀 Phase 1: Foundation (Current)',
              value: '• Neural Assembly Language core development\n• Community building and engagement\n• Research methodology establishment\n• MVP prototype development',
              inline: false
            },
            {
              name: '🧠 Phase 2: Intelligence',
              value: '• Consciousness-aware AI implementation\n• Predictive hazard detection\n• Real-time decision making\n• Environmental monitoring systems',
              inline: false
            },
            {
              name: '🛡️ Phase 3: Deployment',
              value: '• Warden drone prototyping\n• Mining site partnerships\n• Safety system integration\n• Performance validation',
              inline: false
            },
            {
              name: '🌍 Phase 4: Scale',
              value: '• Global deployment strategy\n• Regulatory compliance\n• Industry partnerships\n• Continuous improvement',
              inline: false
            }
          ],
          footer: {
            text: 'View detailed roadmap at /mission • Updated monthly'
          }
        }]
      }
    })
  },

  'achievements': {
    name: 'achievements',
    description: 'View your community achievements and progress',
    handler: async (interaction: DiscordInteraction) => {
      const user = interaction.user || interaction.member?.user;
      if (!user) {
        return {
          type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '❌ Unable to identify user for achievement lookup.',
            flags: 64 // Ephemeral message
          }
        };
      }

      try {
        const response = await fetch(`${process.env.VERCEL_URL || 'https://warden-landing.vercel.app'}/api/achievement-tracker?username=${user.username}`);
        const data = await response.json();

        if (data.success && data.user) {
          const user_data = data.user;
          return {
            type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              embeds: [{
                title: `🏆 ${user.username}'s Achievements`,
                description: `Level ${user_data.level.current} - ${user_data.level.name}`,
                color: 0x8b5cf6,
                fields: [
                  {
                    name: '📊 Stats',
                    value: `**Points:** ${user_data.total_points}\n**Achievements:** ${user_data.achievements.length}\n**Progress:** ${user_data.level.progress}% to next level`,
                    inline: true
                  },
                  {
                    name: '🎯 Activity',
                    value: `**PRs:** ${user_data.stats.prs_submitted}\n**Issues:** ${user_data.stats.issues_opened}\n**Commits:** ${user_data.stats.commits_made}`,
                    inline: true
                  },
                  {
                    name: '🏅 Recent Badges',
                    value: user_data.achievements.length > 0
                      ? user_data.achievements.slice(0, 3).map((a: any) => `${a.badge} ${a.name}`).join('\n')
                      : 'No achievements yet - start contributing!',
                    inline: false
                  }
                ],
                footer: {
                  text: 'Keep contributing to earn more achievements!'
                }
              }]
            }
          };
        } else {
          return {
            type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `🎯 **${user.username}**, you're ready to start your Warden journey!\n\nUse \`/contribute\` to see how you can earn your first achievements. Every contribution to mining safety matters! 🛡️`,
              flags: 64 // Ephemeral message
            }
          };
        }
      } catch (error) {
        return {
          type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '⚠️ Unable to fetch achievements. Please try again later.',
            flags: 64 // Ephemeral message
          }
        };
      }
    }
  },

  'weekly-digest': {
    name: 'weekly-digest',
    description: 'Get this week\'s community activity summary',
    handler: async () => {
      try {
        const response = await fetch(`${process.env.VERCEL_URL || 'https://warden-landing.vercel.app'}/api/weekly-digest`);
        const data = await response.json();

        if (data.success && data.digest) {
          const digest = data.digest;
          return {
            type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              embeds: [{
                title: `📊 ${digest.week} - Community Digest`,
                description: 'Here\'s what happened in the Warden community this week!',
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
                    name: '🌟 Community',
                    value: `${digest.social_impact.github_stars_gained} new stars\n${digest.social_impact.community_growth} active contributors\n${digest.social_impact.engagement_rate}% engagement`,
                    inline: true
                  },
                  ...(digest.highlights.top_contributors.length > 0 ? [{
                    name: '🏆 Top Contributors',
                    value: digest.highlights.top_contributors.slice(0, 5).map((c: string) => `• ${c}`).join('\n'),
                    inline: false
                  }] : [])
                ],
                footer: {
                  text: 'Warden Community • Weekly Digest'
                },
                timestamp: new Date().toISOString()
              }]
            }
          };
        } else {
          return {
            type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: '⚠️ Unable to generate weekly digest. Please try again later.'
            }
          };
        }
      } catch (error) {
        return {
          type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '⚠️ Unable to fetch weekly digest. Please try again later.'
          }
        };
      }
    }
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const interaction: DiscordInteraction = req.body;

    // Handle ping
    if (interaction.type === INTERACTION_TYPES.PING) {
      return res.json({ type: RESPONSE_TYPES.PONG });
    }

    // Handle slash commands
    if (interaction.type === INTERACTION_TYPES.APPLICATION_COMMAND) {
      const commandName = interaction.data?.name;
      
      if (!commandName || !COMMANDS[commandName as keyof typeof COMMANDS]) {
        return res.json({
          type: RESPONSE_TYPES.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: '❌ Unknown command. Available commands: `/warden-status`, `/contribute`, `/neural-asm`, `/roadmap`, `/achievements`, `/weekly-digest`',
            flags: 64 // Ephemeral
          }
        });
      }

      const command = COMMANDS[commandName as keyof typeof COMMANDS];
      const response = await command.handler(interaction);
      return res.json(response);
    }

    // Unknown interaction type
    res.status(400).json({ error: 'Unknown interaction type' });
  } catch (error) {
    console.error('Discord bot error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}