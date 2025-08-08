import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BbWaEj8p.mjs';
import { manifest } from './manifest_odfkCYvK.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/github-webhook.astro.mjs');
const _page2 = () => import('./pages/api/test-discord.astro.mjs');
const _page3 = () => import('./pages/api/webhook-debug.astro.mjs');
const _page4 = () => import('./pages/github-discord-push-dev-updates.astro.mjs');
const _page5 = () => import('./pages/privacy.astro.mjs');
const _page6 = () => import('./pages/terms.astro.mjs');
const _page7 = () => import('./pages/thanks.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/github-webhook.ts", _page1],
    ["src/pages/api/test-discord.ts", _page2],
    ["src/pages/api/webhook-debug.ts", _page3],
    ["src/pages/github-discord-push-dev-updates.ts", _page4],
    ["src/pages/privacy.astro", _page5],
    ["src/pages/terms.astro", _page6],
    ["src/pages/thanks.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5be83f60-f129-4ae9-ac20-1cdec4a24baf",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
