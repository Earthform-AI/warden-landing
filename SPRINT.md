**Let’s go.** Here's a clean, fast plan to start the landing page for your mining project — *Warden*. You’ll get setup instructions, file structure, and copy block suggestions. I’ll write it with the mindset that we’re using **Astro + Tailwind + Vercel**, but you can tweak if needed.

---

## ✅ Step 1: Project Setup (Local Dev + GitHub + Vercel)

In VS Code, run this:

```bash
npm create astro@latest warden-landing
cd warden-landing
npm install
npm run dev
```

Choose:

* Template: **Minimal** or **Blog** (we’ll strip it either way)
* Typescript: Yes
* Tailwind: Yes
* Integrations: None (for now)

---

## ✅ Step 2: File Structure

Your starting files will look like this:

```
warden-landing/
├─ public/
│  └─ hero-image.jpg (or .webp)
├─ src/
│  ├─ components/
│  │  └─ HeroSection.astro
│  │  └─ MissionSection.astro
│  │  └─ CTASection.astro
│  └─ pages/
│     └─ index.astro
├─ package.json
├─ astro.config.mjs
└─ tailwind.config.js
```

---

## ✅ Step 3: Hero Section Copy (`HeroSection.astro`)

```astro
---
// src/components/HeroSection.astro
---

<section class="bg-black text-white py-32 text-center">
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-5xl font-bold mb-6">
      Warden: The Shield in the Deep
    </h1>
    <p class="text-xl mb-8 opacity-80">
      We’re building autonomous, AI-powered drones to protect miners, map danger, and honor the people who risk their lives underground.
    </p>
    <a href="#join" class="inline-block bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
      Join the Mission
    </a>
  </div>
</section>
```

---

## ✅ Step 4: Mission Section (`MissionSection.astro`)

```astro
---
// src/components/MissionSection.astro
---

<section class="bg-gray-900 text-white py-20">
  <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
    <div>
      <h2 class="text-3xl font-bold mb-4">The Problem</h2>
      <p class="opacity-80">
        Mining is still one of the deadliest jobs on Earth. Gas leaks, collapses, heat, and silence. Too many fathers never come home.
      </p>
      <p class="mt-4 opacity-80">
        We’re not trying to replace the miner — we’re protecting him. Warden is the first system built to shield, warn, and remember.
      </p>
    </div>
    <div>
      <img src="/hero-image.jpg" alt="Underground AI drone concept" class="rounded-lg shadow-lg" />
    </div>
  </div>
</section>
```

---

## ✅ Step 5: CTA Section (`CTASection.astro`)

```astro
---
// src/components/CTASection.astro
---

<section id="join" class="bg-white text-black py-24 text-center">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-4xl font-bold mb-6">Help Us Build Warden</h2>
    <p class="text-lg mb-8 opacity-80">
      We’re looking for engineers, miners, researchers, storytellers, and believers. Join the movement to bring intelligence underground.
    </p>
    <form action="https://formspree.io/f/your-form-id" method="POST" class="flex flex-col gap-4 max-w-md mx-auto">
      <input type="email" name="email" placeholder="Your email" required class="p-3 border border-gray-300 rounded" />
      <textarea name="message" placeholder="Tell us how you'd like to help..." rows="4" class="p-3 border border-gray-300 rounded"></textarea>
      <button type="submit" class="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
        Send Message
      </button>
    </form>
  </div>
</section>
```

> Replace `"your-form-id"` with your actual Formspree ID.

---

## ✅ Step 6: Final Assembly (`index.astro`)

```astro
---
// src/pages/index.astro
import HeroSection from '../components/HeroSection.astro'
import MissionSection from '../components/MissionSection.astro'
import CTASection from '../components/CTASection.astro'
---

<html lang="en">
  <head>
    <title>Warden | Shield in the Deep</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body class="font-sans bg-black text-white">
    <HeroSection />
    <MissionSection />
    <CTASection />
  </body>
</html>
```

---

## 🧪 Optional Enhancements:

* Add animation via [Framer Motion Astro integration](https://astro.build/integrations/framer-motion/)
* Add dark-mode toggling (even though you're likely staying dark)
* Add a `TeamSection` or `TimelineSection` if you want to tease upcoming progress

---

## 📦 Next Steps

🌍 What Earthform.ai Should Do Right Now

    Put Warden Front and Center

    Keep the Voice Strong, Focused, and Respectful

    Hint at the Ecosystem Without Losing Focus

    Structure the Content for Scalability (with config!)

    Call to Action: Human + Investor Ready

🔧 1. Site Architecture – Astro Component Config Strategy

To make the site easy to update (especially with me giving you text-based configs), let’s:

    Split content into JSON or .ts config files (call it site.config.ts)

    Populate sections like hero, mission, and CTA using that file

Here’s your dev prompt:

// site.config.ts
export const hero = {
  title: "Warden: The Shield in the Deep",
  subtitle: "Protecting those who still dare to dig. A new era of mining has begun.",
  cta: {
    text: "Join the Mission",
    link: "/#contact"
  }
};

export const mission = {
  heading: "Built for Humans, Powered by AI",
  body: "Earthform is creating Warden, a respectful, intelligent system to safeguard human miners. Our drones map, monitor, and guard underground operations. We’re not replacing the workforce. We’re saving lives and building tools miners can trust.",
};

export const about = {
  heading: "Why Warden?",
  bullets: [
    "🛡️ Real-time hazard monitoring",
    "📍 Autonomous underground mapping",
    "🤝 Operated by experienced miners",
    "🌱 Minimally invasive extraction",
  ],
};

export const teaser = {
  heading: "More Than a Drone",
  body: "Warden is just the beginning. Earthform is building a future where AI, robotics, and humans work together to reshape and respect our planet."
};

Then your components just import these sections:

import { hero, mission, about, teaser } from '../site.config';

Now I can hand you content updates in this format! 🔥
✍️ 2. Updated Messaging Suggestions

Hero Section

title: "Warden: The Shield in the Deep",
subtitle: "Mining is still dangerous. We're building guardians who never blink."

Mission Section

heading: "What if we could mine without loss?",
body: "We believe no one should die just to earn a living. Earthform is building AI-powered drones that understand danger, protect lives, and keep the earth intact. We respect the minerals — and the people — who make modern life possible."

Teaser / Roadmap Tease

heading: "This is just the beginning.",
body: "Warden protects. Hero heals. Patriot defends. Our drone ecosystem brings AI into the real world — working alongside humans, not replacing them. Earthform is building the bridge between humanity and the planet it calls home."

🧠 3. Optional: Rename Section Labels (to match narrative)

You can rename About to “Why We’re Building Warden”
CTA button: “Back the Mission” or “See Our Tech”
🚀 4. Ready to Go Further?

Next steps we can knock out together:

    🔌 Integrate your config into the Astro site structure

    📷 Add visuals (drone renders, concept sketches, anything you like)

    🗺️ Roadmap section (Warden → Hero → Patriot)

    📬 Contact form with Formspree

    🔒 Password-protected early-access/investor page