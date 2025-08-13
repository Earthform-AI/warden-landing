# Copilot Coding Agent Instructions: Warden Landing Page

## Repository Overview

**Warden Landing** is a modern landing page for Earthform's Warden project - AI-powered drones designed to protect miners in underground environments. The site showcases the mission, technology roadmap, and community engagement around mining safety innovation.

### High-Level Repository Information
- **Type**: Static marketing website with dynamic API functionality
- **Size**: Medium (~50 files, primarily frontend components)
- **Primary Language**: TypeScript (90%), Astro templates (10%)
- **Framework**: Astro 5.12.8 with React integration
- **Styling**: Tailwind CSS with custom animations
- **Runtime**: Node.js 20.x (Vercel deployment)
- **Build Output**: Server-side rendered with API routes

### Key Dependencies
- **Astro**: Static site generator with SSR capability
- **React 19**: Interactive components with Framer Motion
- **Tailwind CSS**: Utility-first styling framework
- **Vercel**: Deployment platform with serverless functions
- **Formspree**: Form handling service integration

## Build & Development Instructions

### Environment Setup
**CRITICAL**: Always run commands in the correct order to avoid failures.

1. **Node.js Version**: Requires Node.js 20.x (package.json specifies `"node": "20.x"`)
   - Current setup may show warnings on Node 18.x but works functionally
   - For production deployment, ensure Node 20.x compliance

2. **Clean Installation** (when needed):
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
   - **Expected behavior**: May show engine warnings on Node 18.x
   - **Security vulnerabilities**: 6 known vulnerabilities exist in dependencies (esbuild, path-to-regexp, undici)
   - **Action**: These are acceptable for development; address before production if needed

### Development Workflow

#### Start Development Server
```bash
npm run dev
```
- **URL**: http://localhost:4321
- **Behavior**: Hot reload enabled, file watching active
- **Performance**: Initial start ~400ms, file changes reload in <100ms
- **Expected issues**: None - this command always works

#### Build for Production
```bash
npm run build
```
- **Output**: `dist/` directory (server build)
- **Build time**: ~4-6 seconds
- **Adapter**: @astrojs/vercel (configured for Vercel deployment)
- **Expected warnings**: Node.js 18 deprecation warning (harmless)
- **Success indicators**: 
  - "Building server entrypoints... ✓ Completed"
  - "prerendering static routes ✓ Completed"
  - Shows bundle sizes for client assets

#### Preview Built Site
```bash
npm run preview
```
- **IMPORTANT**: This command FAILS with Vercel adapter
- **Error**: "@astrojs/vercel adapter does not support the preview command"
- **Workaround**: Use `npm run dev` for local testing or deploy to Vercel staging

### Validation Steps
1. **Development server test**: `npm run dev` should start without errors
2. **Build validation**: `npm run build` should complete successfully
3. **File watching**: Edit any file in `src/` and verify hot reload works
4. **API endpoints**: Test `/api/test-discord` and `/api/github-webhook` if Discord integration needed

## Project Architecture & Layout

### Directory Structure
```
warden-landing/
├── src/                          # Source code
│   ├── components/              # Reusable UI components
│   │   ├── *Section.astro      # Page sections (Astro components)
│   │   ├── Enhanced*.tsx        # Interactive React components
│   │   └── *Navigation.tsx      # Navigation components
│   ├── pages/                   # Route definitions
│   │   ├── index.astro         # Homepage
│   │   ├── mission.astro       # Mission page
│   │   ├── *.astro            # Other static pages
│   │   └── github-discord*.ts  # API routes (Astro endpoints)
│   ├── styles/
│   │   └── global.css          # Global styles and animations
│   ├── site.config.ts          # MAIN CONTENT CONFIGURATION
│   └── mission.config.ts       # Mission page specific config
├── api/                         # Vercel serverless functions
│   ├── github-webhook.ts       # GitHub webhook handler
│   ├── test-discord.ts         # Discord testing endpoint
│   └── webhook-debug.ts        # Debugging utility
├── public/                      # Static assets
└── dist/                        # Build output (generated)
```

### Configuration Files
- **astro.config.mjs**: Astro configuration with Vercel adapter
- **tailwind.config.js**: Tailwind customizations and animations
- **tsconfig.json**: TypeScript configuration (extends Astro strict)
- **vercel.json**: Vercel deployment configuration for API functions
- **package.json**: Dependencies and scripts (Node 20.x requirement)

### Key Architecture Elements

#### Content Management System
- **Primary config**: `src/site.config.ts` - ALL page content stored here
- **Mission config**: `src/mission.config.ts` - Mission page specifics
- **Philosophy**: Config-driven content for easy updates by AI/humans
- **Structure**: Exported objects (hero, mission, ecosystem, community, etc.)

#### Component Architecture
- **Static components**: `.astro` files for server-rendered content
- **Interactive components**: `.tsx` files with React for animations/interactions
- **Hybrid approach**: Astro components import React components with `client:load`
- **Animation system**: Framer Motion + custom CSS keyframes

#### API Integration
- **GitHub webhooks**: Automatic Discord notifications for repository events
- **Form handling**: Formspree integration (endpoint: `https://formspree.io/f/mdkdpgvn`)
- **Environment variables**: 
  - `DISCORD_WEBHOOK_URL` (Discord integration)
  - `GITHUB_WEBHOOK_SECRET` (Webhook security)

### Deployment Pipeline
- **Platform**: Vercel with automatic deployment
- **Build command**: `npm run build`
- **Framework preset**: Astro
- **API routes**: Deployed as Vercel serverless functions
- **Environment**: Requires Node.js 20.x for production

## Critical Dependencies & Gotchas

### Known Issues & Workarounds
1. **Preview command fails**: Use `npm run dev` instead of `npm run preview`
2. **Node version mismatch**: Package.json requires Node 20.x but works on 18.x
3. **Security vulnerabilities**: 6 known issues in dependencies (non-blocking for development)
4. **Build warnings**: Vercel adapter shows Node.js 18 deprecation warnings (harmless)

### Environment Variables (Required for Full Functionality)
```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_TOKEN
GITHUB_WEBHOOK_SECRET=your-secret-key
NODE_ENV=production
```

### Content Update Workflow
1. **For content changes**: Edit `src/site.config.ts` or `src/mission.config.ts`
2. **For new pages**: Add `.astro` file in `src/pages/`
3. **For components**: Add to `src/components/` and import in pages
4. **For API changes**: Modify files in `api/` directory

### Testing Checklist
- [ ] `npm install` completes without blocking errors
- [ ] `npm run dev` starts development server
- [ ] `npm run build` completes successfully
- [ ] Homepage loads at http://localhost:4321
- [ ] Content config changes reflect in UI
- [ ] Form submissions work (if Formspree configured)
- [ ] Discord webhooks work (if environment variables set)

## Key Files Content Summary

### Root Files
- **README.md**: Comprehensive setup and deployment guide
- **DISCORD_WEBHOOK_SETUP.md**: Discord integration instructions  
- **COMMUNITY_SPRINT.md**: Community engagement strategy
- **earthform_mining_safety_baselines.json**: Mining safety statistics data

### Important Component Files
- **src/pages/index.astro**: Homepage with all main sections
- **src/site.config.ts**: Centralized content configuration (359 lines)
- **src/components/EnhancedHeroSection*.tsx**: Homepage hero sections
- **api/github-webhook.ts**: GitHub to Discord webhook handler (432 lines)

## Agent Instructions

**Trust these instructions first** - they are validated and current. Only search for additional information if:
1. These instructions are incomplete for your specific task
2. You encounter errors not documented here
3. You need to understand code not covered in this overview

**Always follow the build order**: `npm install` → `npm run dev` (or `npm run build`) → test functionality.

**Content changes**: Start with `src/site.config.ts` - this is the single source of truth for most site content.

**For debugging**: Use the development server (`npm run dev`) as the primary testing method, not the preview command.
