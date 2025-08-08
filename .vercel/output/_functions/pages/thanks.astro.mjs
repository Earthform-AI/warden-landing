/* empty css                                 */
import { e as createComponent, h as addAttribute, k as renderHead, r as renderTemplate } from '../chunks/astro/server_DsjncM3D.mjs';
import 'kleur/colors';
import 'clsx';
import { m as meta, t as thanks_hero, a as thanks_mission, b as thanks_next, f as footer } from '../chunks/site.config_DDz159c7.mjs';
export { renderers } from '../renderers.mjs';

const $$Thanks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><title>${meta.title}</title><meta name="description"${addAttribute(meta.description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/src/styles/global.css"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(meta.openGraph.title, "content")}><meta property="og:description"${addAttribute(meta.openGraph.description, "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:title"${addAttribute(meta.twitter.title, "content")}><meta property="twitter:description"${addAttribute(meta.twitter.description, "content")}><!-- Additional SEO --><meta name="keywords"${addAttribute(meta.keywords, "content")}><meta name="author"${addAttribute(meta.author, "content")}><link rel="canonical"${addAttribute(meta.url, "href")}>${renderHead()}</head> <body class="font-sans bg-black text-white"> <main> <section class="min-h-screen flex flex-col items-center justify-center bg-black text-white py-24 px-4 text-center animate-fade-in"> <div class="animate-slide-up"> <h1 class="text-5xl md:text-6xl font-extrabold mb-8 flex items-center justify-center gap-3 tracking-tight animate-glow"> <span class="animate-pulse">${thanks_hero.icon}</span> ${thanks_hero.title} </h1> <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 animate-slide-up"> ${thanks_hero.subtitle} </p> <p class="text-lg mb-10 max-w-2xl mx-auto opacity-80 animate-slide-up"> ${thanks_hero.description} </p> </div> <div class="relative mb-10 animate-slide-up"> <img${addAttribute(thanks_hero.image.src, "src")}${addAttribute(thanks_hero.image.alt, "alt")} class="mx-auto w-72 md:w-96 drop-shadow-2xl animate-pulse" style="filter: brightness(1.2) contrast(1.1);"> <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"> <div class="w-32 h-32 rounded-full bg-green-400 opacity-30 blur-2xl animate-pulse"></div> </div> </div> <div class="bg-gray-900 bg-opacity-80 rounded-xl p-8 max-w-xl mx-auto mb-10 shadow-2xl animate-slide-up"> <h2 class="text-2xl font-bold mb-4 text-green-400">${thanks_mission.heading}</h2> <ol class="list-decimal list-inside text-left space-y-2 text-lg"> ${thanks_mission.steps.map((step) => renderTemplate`<li><span class="font-semibold text-white">${step.title}:</span> ${step.description}</li>`)} </ol> </div> <div class="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 animate-slide-up"> <a${addAttribute(thanks_next.discord, "href")} target="_blank" rel="noopener" class="inline-block bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-xl animate-glow">
Join our Discord
</a> <a href="/" class="inline-block bg-gray-800 text-white px-8 py-3 rounded-xl shadow hover:bg-gray-900 transition-all animate-glow">Back to Home</a> </div> <div class="mt-8 text-sm text-gray-400 animate-fade-in"> <span>${thanks_next.footer}</span> </div> </section> </main> <footer class="bg-gray-950 text-gray-400 py-8 text-center text-sm mt-12"> <div>${footer.text}</div> <nav class="mt-2 flex justify-center gap-4"> ${footer.links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="hover:text-white underline transition-all duration-150">${link.label}</a>`)} </nav> </footer> </body></html>`;
}, "/home/josh/projects/warden-landing/src/pages/thanks.astro", void 0);

const $$file = "/home/josh/projects/warden-landing/src/pages/thanks.astro";
const $$url = "/thanks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thanks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
