import crypto from 'crypto';
export { renderers } from '../renderers.mjs';

const prerender = false;
const DISCORD_COLORS = {
  PUSH: 65280,
  // Green
  PR_OPENED: 39423,
  // Blue  
  PR_MERGED: 9133302,
  // Purple
  RELEASE: 16766720,
  // Gold
  PING: 3553599,
  // Discord gray for ping events
  DEFAULT: 3553599
  // Discord gray
};
function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(`sha256=${expectedSignature}`, "utf8"),
    Buffer.from(signature, "utf8")
  );
}
function formatCommitMessage(message) {
  const lines = message.split("\n");
  const title = lines[0];
  return title.length > 72 ? `${title.substring(0, 69)}...` : title;
}
function createDiscordPayload(event, payload) {
  const embeds = [];
  const repoName = payload.repository?.name || "warden-landing";
  const repoUrl = payload.repository?.html_url || "";
  switch (event) {
    case "ping":
      embeds.push({
        title: "🔔 GitHub Webhook Connected",
        description: `Successfully connected to **${repoName}**

*"${payload.zen}"* - GitHub Zen`,
        color: DISCORD_COLORS.PING,
        url: repoUrl,
        footer: {
          text: "Earthform DevUpdate • Webhook Setup Complete"
        },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      break;
    case "push":
      if (payload.commits && payload.commits.length > 0) {
        const branch = payload.ref?.replace("refs/heads/", "") || "main";
        const commitCount = payload.commits.length;
        const pusher = payload.pusher?.name || payload.head_commit?.author?.name || "Unknown";
        embeds.push({
          title: `🚀 ${commitCount} new commit${commitCount > 1 ? "s" : ""} to ${branch}`,
          description: `**${pusher}** pushed to **${repoName}**`,
          color: DISCORD_COLORS.PUSH,
          url: repoUrl,
          fields: payload.commits.slice(0, 5).map((commit) => ({
            name: `[\`${commit.id.substring(0, 7)}\`](${commit.url})`,
            value: formatCommitMessage(commit.message),
            inline: false
          })),
          footer: {
            text: commitCount > 5 ? `...and ${commitCount - 5} more commits • Earthform DevUpdate` : "Earthform DevUpdate"
          },
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      break;
    case "pull_request":
      if (payload.pull_request && payload.action) {
        const { pull_request: pr, action } = payload;
        let title = "";
        let color = DISCORD_COLORS.DEFAULT;
        if (action === "opened") {
          title = `📋 New Pull Request #${pr.number}`;
          color = DISCORD_COLORS.PR_OPENED;
        } else if (action === "closed" && pr.merged) {
          title = `🎉 Pull Request #${pr.number} Merged`;
          color = DISCORD_COLORS.PR_MERGED;
        } else if (action === "closed") {
          title = `❌ Pull Request #${pr.number} Closed`;
          color = DISCORD_COLORS.DEFAULT;
        } else {
          return null;
        }
        embeds.push({
          title,
          description: `**[${pr.title}](${pr.html_url})**
by ${pr.user.login}`,
          color,
          url: pr.html_url,
          footer: {
            text: `${repoName} • Earthform DevUpdate`
          },
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      break;
    case "release":
      if (payload.release && payload.action === "published") {
        const { release } = payload;
        embeds.push({
          title: `🏷️ New Release: ${release.tag_name}`,
          description: `**[${release.name}](${release.html_url})**
released by ${release.author.login}`,
          color: DISCORD_COLORS.RELEASE,
          url: release.html_url,
          fields: release.body ? [{
            name: "Release Notes",
            value: release.body.length > 500 ? `${release.body.substring(0, 497)}...` : release.body,
            inline: false
          }] : [],
          footer: {
            text: `${repoName} • Earthform DevUpdate`
          },
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      break;
    default:
      console.log(`Unsupported event type: ${event}`);
      return null;
  }
  return {
    embeds,
    username: "Earthform DevBot",
    avatar_url: "https://www.earthform.ai/favicon.svg"
  };
}
async function POST({ request }) {
  try {
    const signature = request.headers.get("x-hub-signature-256");
    const event = request.headers.get("x-github-event");
    const body = await request.text();
    console.log(`Received GitHub webhook: ${event}`);
    const secret = "YTGVI&Y^*TFF";
    if (secret && signature && !verifySignature(body, signature, secret)) {
      console.error("Webhook signature verification failed");
      return new Response("Unauthorized", { status: 401 });
    }
    if (!event) {
      return new Response("Missing event header", { status: 400 });
    }
    const payload = JSON.parse(body);
    const discordPayload = createDiscordPayload(event, payload);
    if (!discordPayload) {
      console.log(`Event ${event} ignored`);
      return new Response("Event ignored", { status: 200 });
    }
    const discordWebhookUrl = "https://discord.com/api/webhooks/1403444603440594944/0Z-yULrPBcvKETofq6AZQx5DK6HUluKPE6hpvqZjBGzMabCfeayPrZD-QfN0Slyao2xS";
    if (!discordWebhookUrl) ;
    console.log("Sending notification to Discord...");
    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(discordPayload)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord webhook failed:", response.status, errorText);
      return new Response("Discord notification failed", { status: 500 });
    }
    console.log(`Successfully sent ${event} notification to Discord`);
    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
async function GET() {
  return new Response("GitHub to Discord webhook endpoint is active. Use POST to send webhooks.", {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
