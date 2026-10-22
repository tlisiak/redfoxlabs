#!/usr/bin/env node
// Lists what each channel is streaming live right now, by reading its /streams tab (no API quota).
// Channel listings aren't bot-checked, so this works from a laptop or a sandbox, not just CI.
//
// Usage: node scripts/peek/discover.mjs channels.json > live.json
//   channels.json: ["@handle", "UCxxxxxxxxxxxxxxxxxxxxxx", ...] or [{ "channel": "...", ...extra }]
// Behind an HTTPS proxy: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=<proxy ca> node scripts/peek/discover.mjs ...

import { readFile } from "node:fs/promises";
import { extractJson, findLiveVideos } from "./validate-streams.mjs";

const HEADERS = {
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36",
  "accept-language": "en-US,en;q=0.9",
  cookie: "CONSENT=YES+cb; SOCS=CAI",
};
const channelPath = (c) => (c.startsWith("@") ? `/${c}` : `/channel/${c}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decode = (t) => String(t).replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');

export async function liveOnChannel(channel) {
  try {
    const res = await fetch(`https://www.youtube.com${channelPath(channel)}/streams?hl=en`, { headers: HEADERS });
    if (res.status !== 200) return { status: res.status, live: [] };
    const data = extractJson(await res.text(), /ytInitialData\s*=\s*\{/);
    if (!data) return { status: "unreadable", live: [] };
    const list = findLiveVideos(data);
    return { status: 200, seen: list.seen, live: list.map((v) => ({ videoId: v.videoId, title: decode(v.title) })) };
  } catch (err) { return { status: `error: ${err.message}`, live: [] }; }
}

async function main() {
  const raw = JSON.parse(await readFile(process.argv[2], "utf8"));
  const leads = raw.map((x) => (typeof x === "string" ? { channel: x } : x)).filter((x) => x.channel);
  const out = [], bad = [];
  const seen = new Set();
  for (const lead of leads) {
    if (seen.has(lead.channel)) continue; seen.add(lead.channel);
    const r = await liveOnChannel(lead.channel);
    console.error(`${String(r.status).padEnd(10)} ${lead.channel.padEnd(28)} ${r.live.length} live${r.seen ? ` of ${r.seen}` : ""}`);
    if (r.status !== 200) bad.push({ channel: lead.channel, status: r.status });
    for (const v of r.live) out.push({ videoId: v.videoId, channel: lead.channel, title: v.title, operator: lead.operator || "", place: lead.place || "" });
    await sleep(700);
  }
  console.log(JSON.stringify({ at: new Date().toISOString(), channelsFailed: bad, live: out }, null, 2));
}

if (process.argv[1] && process.argv[1].endsWith("discover.mjs")) main();
