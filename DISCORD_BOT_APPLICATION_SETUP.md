# 🤖 Discord Bot Application Setup

This document provides the required information for setting up the Warden Community Bot on Discord's Developer Portal.

## Required URLs for Discord Application Setup

When configuring your Discord application at https://discord.com/developers/applications, use these URLs:

### 🔗 Interactions Endpoint URL
```
https://warden-landing.vercel.app/api/discord-bot
```
**Purpose**: This endpoint receives interactions via HTTP POSTs rather than over Gateway with a bot user. It handles all slash commands and bot interactions.

**Functionality**: 
- Handles Discord slash commands (`/warden-status`, `/contribute`, `/neural-asm`, `/roadmap`, `/achievements`, `/weekly-digest`)
- Provides project information and community engagement features
- Processes Discord interaction webhooks

### 📜 Terms of Service URL
```
https://warden-landing.vercel.app/terms
```
**Purpose**: Link to the application's Terms of Service, including Discord bot usage terms.

### 🔐 Privacy Policy URL
```
https://warden-landing.vercel.app/privacy
```
**Purpose**: Link to the application's Privacy Policy, including Discord bot data handling information.

### 🔗 Linked Roles Verification URL
**Status**: Not Required
**Reason**: This is optional for role verification features. The current Warden Community Bot doesn't implement linked roles functionality, so this can be left empty.

## Bot Configuration Steps

1. **Create Discord Application**
   - Go to https://discord.com/developers/applications
   - Create New Application → Name it "Warden Community Bot"

2. **Configure Bot Settings**
   - Go to **Bot** section
   - Create bot and save the bot token (for environment variables)
   - Set appropriate permissions

3. **Configure Application URLs**
   - Go to **General Information** section
   - Fill in the URLs listed above in their respective fields

4. **Set up Slash Commands**
   - Go to **OAuth2** → **URL Generator**
   - Scopes: `applications.commands`, `bot`
   - Bot Permissions: `Send Messages`, `Use Slash Commands`

5. **Install Bot to Server**
   - Use the generated OAuth2 URL to install the bot to your Discord server

## Environment Variables

Ensure these environment variables are set in your deployment:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_TOKEN
GITHUB_WEBHOOK_SECRET=your-secret-key
```

## Available Slash Commands

The bot supports these slash commands:

- `/warden-status` - Get the latest Warden project updates
- `/contribute` - Learn how to contribute to the Warden project
- `/neural-asm` - Learn about Neural Assembly Language
- `/roadmap` - View the Warden project timeline and milestones
- `/achievements` - View your community achievements and progress
- `/weekly-digest` - Get this week's community activity summary

## Testing the Setup

1. **Test Interactions Endpoint**:
   ```bash
   curl -X POST https://warden-landing.vercel.app/api/discord-bot \
     -H "Content-Type: application/json" \
     -d '{"type": 1}'
   ```
   Should return: `{"type": 1}` (PONG response)

2. **Verify URLs**:
   - Terms: https://warden-landing.vercel.app/terms
   - Privacy: https://warden-landing.vercel.app/privacy

3. **Test Bot Commands**: Use the slash commands in your Discord server after installation

## Support

For issues with the Discord bot setup or functionality:
- Check the [Enhanced Community Setup Guide](./ENHANCED_COMMUNITY_SETUP.md)
- Visit our [GitHub Discussions](https://github.com/Earthform-AI/warden-landing/discussions)
- Use the contact form at https://warden-landing.vercel.app/#join

---

**Note**: All URLs are production-ready and accessible. The bot endpoint is implemented as a Vercel serverless function and handles Discord's interaction requirements automatically.