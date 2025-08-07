# AI + Team Prompt: Config-Driven Content System for Earthform.ai

🛠️ Purpose:
We want Earthform.ai to evolve quickly, collaboratively, and with creative input from both humans and AI. To make this possible, all content (especially wording and structure) should be extracted into a configurable file or modular format that can be easily updated — without rewriting the whole site.

✅ What This Means

    ✍️ All textual content (hero section, mission, vision, button labels, etc.) should be defined in a config file, such as:

        site.config.ts

        content.json

        markdown/*.md

    🧠 This allows an AI agent (like ChatGPT via Copilot) to suggest new configs or content edits as structured files.

    ⚡ When accepted and pushed to GitHub, the site can be auto-deployed via Vercel with the new content live instantly.

🧩 Bonus (Future Goals)

    Support multi-voice content switching (e.g., public, technical, investor versions).

    AI + team members can submit pull requests with proposed edits to content via config diffs.

    Enable live preview or staging mode for proposed content swaps.

🧬 TL;DR

    💡 Make content editable via config
    📦 Keep components reusable
    🤖 Let AI and humans suggest updates without breaking layout
    🚀 Push = Publish

# Warden: Shield in the Deep

**Autonomous AI-powered drones protecting miners underground.**

We're building the first comprehensive system designed to shield, warn, and protect miners working in the world's most dangerous environments.

## 🎯 Mission

Mining remains one of the deadliest jobs on Earth. Gas leaks, collapses, heat, and silence claim too many lives. We're not trying to replace the miner — we're protecting them.

Warden represents the next generation of underground safety technology, combining autonomous drones, AI-powered threat detection, and real-time communication systems to ensure every miner returns home safely.

## 🚀 Project Structure

This is the official landing page for the Warden project, built with:

- **Astro** - Modern static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **Formspree** - Form handling service

```text
warden-landing/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── HeroSection.astro
│   │   ├── MissionSection.astro
│   │   └── CTASection.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── package.json
├── astro.config.mjs
└── tailwind.config.js
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/warden-landing.git
cd warden-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to view the site.

### Available Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |

## 🚀 Deployment

This site is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every commit

## 🤝 Get Involved

We're looking for:
- **Engineers** - Drone hardware, AI/ML, embedded systems
- **Miners** - Real-world experience and safety insights  
- **Researchers** - Mining safety, autonomous systems
- **Storytellers** - Help us share the mission
- **Believers** - Support the movement to protect underground workers

Join us at [warden-landing.vercel.app](https://warden-landing.vercel.app) or reach out through our contact form.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**You're officially walking into the mine with a light.**

For questions, suggestions, or to contribute, please open an issue or submit a pull request.
