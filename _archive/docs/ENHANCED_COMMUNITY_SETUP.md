# 🚀 Enhanced Community Engagement Setup Guide

This guide covers setting up the enhanced GitHub Discussions integration, achievement system, and social media automation features for the Warden project.

## 🔧 Environment Variables

Add these environment variables to your Vercel deployment or `.env` file:

### Core Discord Integration
```env
# Main Discord webhook (required)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_TOKEN

# Category-specific webhooks (optional - routes discussions to specific channels)
DISCORD_IDEAS_WEBHOOK=https://discord.com/api/webhooks/IDEAS_WEBHOOK_ID/TOKEN
DISCORD_QA_WEBHOOK=https://discord.com/api/webhooks/QA_WEBHOOK_ID/TOKEN
DISCORD_SHOWCASE_WEBHOOK=https://discord.com/api/webhooks/SHOWCASE_WEBHOOK_ID/TOKEN
DISCORD_RESEARCH_WEBHOOK=https://discord.com/api/webhooks/RESEARCH_WEBHOOK_ID/TOKEN
DISCORD_NAL_WEBHOOK=https://discord.com/api/webhooks/NAL_WEBHOOK_ID/TOKEN
DISCORD_WARDEN_DEV_WEBHOOK=https://discord.com/api/webhooks/WARDEN_DEV_WEBHOOK_ID/TOKEN
DISCORD_MISSIONS_WEBHOOK=https://discord.com/api/webhooks/MISSIONS_WEBHOOK_ID/TOKEN
DISCORD_DIGEST_WEBHOOK=https://discord.com/api/webhooks/DIGEST_WEBHOOK_ID/TOKEN

# GitHub integration
GITHUB_WEBHOOK_SECRET=your-webhook-secret
GITHUB_TOKEN=ghp_your_github_personal_access_token
```

### Social Media Integration
```env
# Twitter API v2
TWITTER_BEARER_TOKEN=AAAAAAAAAAAAAAAAAAAAAMLheAAAAAAA...

# LinkedIn API
LINKEDIN_ACCESS_TOKEN=AQV...
LINKEDIN_PERSON_URN=urn:li:person:YOUR_PERSON_ID

# Reddit API (for automated posting)
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USERNAME=your_bot_username
REDDIT_PASSWORD=your_bot_password
```

### Achievement System (Optional - for persistent storage)
```env
# Supabase (recommended) or other database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📋 Setup Steps

### 1. Enhanced GitHub Webhook

Update your GitHub webhook configuration:

1. Go to GitHub Repository → Settings → Webhooks
2. Edit your existing webhook or create a new one
3. **Payload URL**: `https://your-site.vercel.app/api/github-webhook`
4. **Events**: Select these additional events:
   - ☑️ **Discussions** (new!)
   - ☑️ **Discussion comments** (new!)
   - ☑️ **Stars** 
   - ☑️ **Forks**
   - ☑️ Pushes
   - ☑️ Pull requests
   - ☑️ Issues
   - ☑️ Releases

### 2. GitHub Discussions Categories

Create these discussion categories in your GitHub repository:

1. Go to GitHub Repository → Discussions
2. Create categories:
   - 🛡️ **Warden Development** - Alpha testing, features, bugs
   - 🧬 **Neural Assembly Language** - Code examples, proposals, tutorials
   - ⛏️ **Mining Safety Research** - Industry insights, data, scenarios
   - 🌍 **Community Missions** - Challenges, opportunities, achievements
   - 💡 **Ideas & Innovation** - Future concepts, consciousness exploration
   - ❓ **Q&A** - Questions and help
   - 🎉 **Show and Tell** - Project showcases and demos

### 3. Discord Bot Setup

Create a Discord application and bot:

1. Go to https://discord.com/developers/applications
2. Create New Application → Name it "Warden Community Bot"
3. Go to **Bot** section:
   - Create bot
   - Copy the bot token (not needed for webhooks, but useful for future features)
4. Go to **OAuth2** → **URL Generator**:
   - Scopes: `applications.commands`, `bot`
   - Bot Permissions: `Send Messages`, `Use Slash Commands`
5. Install bot to your Discord server using the generated URL

**Note**: The current implementation uses webhooks. Full bot functionality requires additional Discord application setup.

### 4. Social Media API Access

#### Twitter API v2
1. Go to https://developer.twitter.com/
2. Create a new app
3. Generate Bearer Token
4. Add to environment variables

#### LinkedIn API
1. Go to https://www.linkedin.com/developers/
2. Create a new app
3. Request access to "Share on LinkedIn" products
4. Generate access token
5. Get your person URN: `https://api.linkedin.com/v2/people/(id=YOUR_ID)`

#### Reddit API
1. Go to https://www.reddit.com/prefs/apps
2. Create a new script application
3. Use credentials for OAuth2 flow

### 5. Database Setup (Optional)

For persistent achievement tracking, set up Supabase:

1. Go to https://supabase.com/
2. Create a new project
3. Run these SQL commands in the Supabase SQL editor:

```sql
-- Users table
CREATE TABLE community_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  github_id TEXT,
  discord_id TEXT,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES community_users(id),
  achievement_id TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  badge TEXT NOT NULL,
  points INTEGER NOT NULL,
  rarity TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community stats cache
CREATE TABLE community_stats_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_username ON community_users(username);
CREATE INDEX idx_achievements_user ON achievements(user_id);
CREATE INDEX idx_stats_created ON community_stats_cache(created_at);
```

## 🧪 Testing the Setup

### Test API Endpoints

1. **Community Stats**: `GET https://your-site.vercel.app/api/community-stats`
2. **Weekly Digest**: `GET https://your-site.vercel.app/api/weekly-digest`
3. **Achievements**: `GET https://your-site.vercel.app/api/achievement-tracker`
4. **Social Publisher**: `GET https://your-site.vercel.app/api/social-publisher`

### Test Discord Integration

1. Create a test discussion in your GitHub repository
2. Check that it appears in the appropriate Discord channel
3. Add a comment to the discussion
4. Verify the comment notification appears

### Test Social Media Templates

```bash
# Test social media posting
curl -X POST https://your-site.vercel.app/api/social-publisher \
  -H "Content-Type: application/json" \
  -d '{
    "template_id": "weekly_progress",
    "variables": {
      "commits": "15",
      "prs": "3",
      "discussions": "8",
      "repo_url": "https://github.com/Earthform-AI/warden-landing"
    },
    "platforms": ["twitter"]
  }'
```

## 🎯 Usage Examples

### Automated Weekly Digest

Set up a GitHub Action or cron job to POST to `/api/weekly-digest` weekly:

```yaml
name: Weekly Community Digest
on:
  schedule:
    - cron: '0 10 * * 1' # Every Monday at 10 AM UTC
jobs:
  digest:
    runs-on: ubuntu-latest
    steps:
      - name: Generate and Post Digest
        run: |
          curl -X POST ${{ secrets.VERCEL_URL }}/api/weekly-digest
```

### Manual Achievement Award

```bash
# Award achievement to user
curl -X POST https://your-site.vercel.app/api/achievement-tracker \
  -H "Content-Type: application/json" \
  -d '{
    "username": "contributor_username",
    "achievement_id": "neural_pioneer",
    "reason": "Significant NAL contribution"
  }'
```

### Custom Social Media Post

```bash
# Custom multi-platform post
curl -X POST https://your-site.vercel.app/api/social-publisher \
  -H "Content-Type: application/json" \
  -d '{
    "custom_content": [
      {
        "platform": "twitter",
        "content": "🚀 Major breakthrough in Neural Assembly Language! New consciousness-aware algorithms can now predict mining hazards 3x more accurately. #AI #MiningSafety"
      },
      {
        "platform": "linkedin",
        "content": "Excited to share our latest research breakthrough in AI-powered mining safety..."
      }
    ]
  }'
```

## 🔍 Monitoring and Analytics

### Available Metrics

1. **Community Growth**: Weekly new discussions, contributors
2. **Engagement Rate**: Comments per discussion, upvote rates
3. **Achievement Distribution**: Badge rarity, point distribution
4. **Social Media Impact**: Reach, engagement, click-through rates

### Webhook Delivery Monitoring

Check webhook delivery in:
- GitHub: Repository → Settings → Webhooks → Recent Deliveries
- Discord: Check channel activity
- Vercel: Check function logs

## 🚨 Troubleshooting

### Common Issues

1. **Webhook not firing**: Check GitHub webhook configuration and Vercel function logs
2. **Discord messages not appearing**: Verify webhook URLs and Discord channel permissions
3. **Social media posting failing**: Check API credentials and rate limits
4. **Achievement tracking not working**: Verify database connection and user data

### Debug Endpoints

- `GET /api/webhook-debug` - Check webhook status
- `GET /api/test-discord` - Test Discord connection

### Rate Limits

- **GitHub API**: 5,000 requests/hour with token, 60 without
- **Twitter API**: 300 requests/15 minutes for posting
- **LinkedIn API**: 500 requests/day for posting
- **Discord Webhooks**: 5 requests/second per webhook

## 🔄 Future Enhancements

Planned improvements:
1. **Real-time dashboard** for community metrics
2. **Advanced achievement system** with seasonal challenges  
3. **AI-powered content generation** for social media
4. **Integration with mining industry platforms**
5. **Multi-language community support**

---

Need help? Create a discussion in the repository or check the troubleshooting section above!