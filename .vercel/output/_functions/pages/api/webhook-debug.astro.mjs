export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const headers = Object.fromEntries(request.headers);
    const body = await request.text();
    console.log("=== WEBHOOK DEBUG ===");
    console.log("Headers:", JSON.stringify(headers, null, 2));
    console.log("Body:", body);
    console.log("Method:", request.method);
    console.log("URL:", request.url);
    console.log("===================");
    const discordWebhookUrl = "https://discord.com/api/webhooks/1403444603440594944/0Z-yULrPBcvKETofq6AZQx5DK6HUluKPE6hpvqZjBGzMabCfeayPrZD-QfN0Slyao2xS";
    if (discordWebhookUrl) {
      const testPayload = {
        embeds: [{
          title: "🔍 Webhook Debug Hit!",
          description: `Received ${request.method} request`,
          color: 16750848,
          // Orange
          fields: [
            {
              name: "GitHub Event",
              value: headers["x-github-event"] || "Unknown",
              inline: true
            },
            {
              name: "Content Length",
              value: body.length.toString(),
              inline: true
            }
          ],
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }],
        username: "Warden DevBot",
        avatar_url: "https://warden-landing.vercel.app/favicon.svg"
      };
      await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testPayload)
      });
    }
    return new Response("Debug logged", { status: 200 });
  } catch (error) {
    console.error("Debug webhook error:", error);
    return new Response("Error", { status: 500 });
  }
}
async function GET() {
  return new Response("Debug webhook endpoint - use POST", { status: 200 });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
