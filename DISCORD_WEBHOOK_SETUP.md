# GitHub to Discord Webhook Setup Guide

This guide will help you set up automatic Discord notifications for your GitHub repository updates.

## 📋 Prerequisites

1. **Discord Server**: You need admin access to your Discord server
2. **GitHub Repository**: Admin access to your repository 
3. **Deployment**: Your site must be deployed (Vercel, Netlify, etc.)

## 🎯 Step 1: Create Discord Webhook

1. Go to your Discord server
2. Navigate to **Server Settings** → **Integrations** → **Webhooks**
3. Click **Create Webhook**
4. Configure the webhook:
   - **Name**: `Warden DevBot` (or any name you prefer)
   - **Channel**: Select your dev channel (e.g., `#development`, `#updates`)
   - **Avatar**: Optional - you can upload the Warden logo
5. **Copy the Webhook URL** - you'll need this next

## 🔧 Step 2: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Discord webhook URL:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
GITHUB_WEBHOOK_SECRET=your-secret-key-here
NODE_ENV=production
```

3. **For Vercel deployment**, add these environment variables in your Vercel dashboard:
   - Go to your project settings
   - Navigate to **Environment Variables**
   - Add `DISCORD_WEBHOOK_URL` and `GITHUB_WEBHOOK_SECRET`

## 🧪 Step 3: Test Discord Integration

1. Deploy your changes to your hosting platform
2. Test the Discord webhook by making a POST request to your test endpoint:

```bash
curl -X POST https://your-site.vercel.app/api/test-discord
```

You should see a test message appear in your Discord channel!

## 🔗 Step 4: Setup GitHub Webhook

1. Go to your GitHub repository
2. Navigate to **Settings** → **Webhooks**
3. Click **Add webhook**
4. Configure the webhook:
   - **Payload URL**: `https://your-site.vercel.app/api/github-webhook`
   - **Content type**: `application/json`
   - **Secret**: Use the same secret from your `.env` file
   - **SSL verification**: Enable
   - **Events**: Select these events:
     - ☑️ **Pushes**
     - ☑️ **Pull requests** 
     - ☑️ **Releases**
     - Or select "Send me everything" if you want all events
5. Click **Add webhook**

## 📨 What Gets Posted to Discord

Your Discord channel will now receive notifications for:

### 🚀 **Push Events**
- Shows commits pushed to any branch
- Displays commit messages and authors
- Links to the commits on GitHub

### 📋 **Pull Request Events** 
- New pull requests opened
- Pull requests merged
- Pull requests closed

### 🏷️ **Release Events**
- New releases published
- Release notes included

### 🎨 **Message Format**
Messages are formatted as Discord embeds with:
- Color coding (green for pushes, blue for PRs, gold for releases)
- Clickable links to GitHub
- Author information
- Timestamps
- Repository information

## 🛠️ Customization Options

### Change Bot Name/Avatar
Edit the `createDiscordPayload` function in `/src/pages/api/github-webhook.ts`:

```typescript
return {
  embeds,
  username: 'Your Custom Bot Name',
  avatar_url: 'https://your-avatar-url.com/avatar.png'
};
```

### Modify Colors
Update the `DISCORD_COLORS` object to use your preferred colors:

```typescript
const DISCORD_COLORS = {
  PUSH: 0x00ff00,      // Green
  PR_OPENED: 0x0099ff,  // Blue  
  PR_MERGED: 0x8b5cf6,  // Purple
  RELEASE: 0xffd700,    // Gold
  // Add more colors as needed
};
```

### Filter Events
Modify the switch statement to handle only the events you care about.

## 🔍 Troubleshooting

### Webhook Not Working?
1. Check your environment variables are set correctly
2. Verify the Discord webhook URL is active
3. Look at your deployment logs for errors
4. Test with the `/api/test-discord` endpoint first

### GitHub Webhook Failing?
1. Check the webhook delivery attempts in GitHub settings
2. Verify your payload URL is accessible
3. Check that your secret matches between GitHub and your environment

### Discord Not Receiving Messages?
1. Verify the webhook URL is correct
2. Check Discord channel permissions
3. Test with a simple curl request to your test endpoint

## 🎉 You're All Set!

Your Discord community will now get automatic updates when:
- Code is pushed to the repository
- Pull requests are opened, merged, or closed  
- New releases are published

This keeps everyone informed about the project's progress and creates excitement around development updates!

## 💡 Pro Tips

1. **Create separate channels** for different types of updates (e.g., `#commits`, `#releases`)
2. **Use different webhooks** for different branches if needed
3. **Customize messages** to match your community's tone and style
4. **Consider rate limiting** if you have a very active repository

Need help? Feel free to ask in your Discord community - the bot will be there to help notify everyone about the great work you're doing!
