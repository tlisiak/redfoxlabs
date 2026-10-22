#!/usr/bin/env node
// Finds live streams by running searches on YouTube's results page with the "Live" filter on
// (no API quota; the results page isn't bot-checked). Collects videoId, title, channel and viewers.
//
// Usage: node scripts/peek/search-live.mjs queries.json > found.json
//   queries.json: ["bali beach live cam", ...]
// Behind an HTTPS proxy: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=<proxy ca> node ...

import { readFile } from "node:fs/promises";
import { extractJson } from "./validate-streams.mjs";

const HEADERS = {
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36",
  "accept-language": "en-US,en;q=0.9",
  cookie: "CONSENT=YES+cb; SOCS=CAI",
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const text = (x) => x?.simpleText || x?.runs?.map((r) => r.text).join("") || "";

export async function searchLive(query) {
  const res = await fetch(`https://www.youtube.com/results?hl=en&sp=EgJAAQ%253D%253D&search_query=${encodeURIComponent(query)}`, { headers: HEADERS });
  if (res.status !== 200) return { status: res.status, items: [] };
  const data = extractJson(await res.text(), /ytInitialData\s*=\s*\{/);
  if (!data) return { status: "unreadable", items: [] };
  const items = [];
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (n.videoRenderer) {
      const v = n.videoRenderer;
      const owner = v.ownerText?.runs?.[0];
      const watching = text(v.viewCountText).match(/([\d,]+)\s+watching/);
      if (watching || JSON.stringify(v.badges || []).includes("LIVE"))
        items.push({ videoId: v.videoId, title: text(v.title), channel: owner?.text || "", channelId: owner?.navigationEndpoint?.browseEndpoint?.browseId || "",
          handle: (owner?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || "").replace(/^\//, ""), watching: watching ? Number(watching[1].replace(/,/g, "")) : null });
      return;
    }
    for (const x of Object.values(n)) walk(x);
  };
  walk(data);
  return { status: 200, items };
}

async function main() {
  const queries = JSON.parse(await readFile(process.argv[2], "utf8"));
  const found = new Map();
  let n = 0;
  for (const q of queries) {
    let r = await searchLive(q).catch((e) => ({ status: `error: ${e.message}`, items: [] }));
    if (r.status !== 200) { await sleep(4000); r = await searchLive(q).catch(() => ({ status: "error", items: [] })); }
    for (const it of r.items) {
      const f = found.get(it.videoId) || { ...it, queries: [] };
      f.queries.push(q); found.set(it.videoId, f);
    }
    console.error(`${++n}/${queries.length} ${String(r.status).padEnd(5)} ${String(r.items.length).padStart(2)} live  total ${found.size}  ${q}`);
    await sleep(900);
  }
  console.log(JSON.stringify({ at: new Date().toISOString(), live: [...found.values()] }, null, 1));
}

if (process.argv[1] && process.argv[1].endsWith("search-live.mjs")) main();
