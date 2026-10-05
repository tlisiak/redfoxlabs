#!/usr/bin/env node
// Checks every source in public/peek/streams.js against YouTube and writes
// public/peek/status.json, which the Peek page uses to skip dead sources and to
// follow channel embeds to whatever video they're broadcasting right now.
//
// No API key: it reads the same player data a browser gets from the watch page,
// plus oEmbed to confirm the owner allows embedding.
//
// Usage: node scripts/peek/validate-streams.mjs [--out path] [--report path]
// Exit code 1 when any view has no live, embeddable source.

import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const OUT = arg("--out", path.join(root, "public/peek/status.json"));
const REPORT = arg("--report", process.env.GITHUB_STEP_SUMMARY);

const HEADERS = {
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36",
  "accept-language": "en-US,en;q=0.9",
  // Skips the EU cookie-consent interstitial.
  cookie: "CONSENT=YES+cb; SOCS=CAI",
};

export async function loadStreams() {
  const code = await readFile(path.join(root, "public/peek/streams.js"), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window.PEEK_STREAMS;
}

export function candidates(stream) {
  const src = stream.source;
  const ids = src.videoIds || (src.videoId ? [src.videoId] : []);
  return [...ids.map((videoId) => ({ videoId })), ...(src.channelId ? [{ channelId: src.channelId }] : [])];
}

// Pulls the JSON object assigned to `ytInitialPlayerResponse` out of a watch page.
export function extractPlayerResponse(html) {
  const marker = html.search(/ytInitialPlayerResponse\s*=\s*\{/);
  if (marker < 0) return null;
  const start = html.indexOf("{", marker);
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) {
      try { return JSON.parse(html.slice(start, i + 1)); } catch { return null; }
    }
  }
  return null;
}

// Turns player data into one of: live, offline, recording, no-embed, removed, unverified.
// "unverified" means YouTube didn't give us a straight answer (bot wall, layout change),
// and it never counts against a view.
export function classify(pr, oembedStatus) {
  // oEmbed answers 401 for embedding disabled and 404/400 for missing videos. Anything else
  // (403, 429, 5xx, network failure) says nothing about the video, so fall through.
  if (oembedStatus === 401) return { status: "no-embed", detail: "owner disabled embedding" };
  if (oembedStatus === 404 || oembedStatus === 400) return { status: "removed", detail: "video removed, private or bad ID" };
  if (!pr) return { status: "unverified", detail: "couldn't read player data" };
  const play = pr.playabilityStatus || {};
  const vd = pr.videoDetails || {};
  const live = pr.microformat?.playerMicroformatRenderer?.liveBroadcastDetails;
  const base = { title: vd.title, author: vd.author, videoId: vd.videoId };
  if (play.status === "LOGIN_REQUIRED" && /bot/i.test(play.reason || "")) return { ...base, status: "unverified", detail: "YouTube bot check" };
  if (play.status === "ERROR") return { ...base, status: "removed", detail: play.reason || "unavailable" };
  if (play.playableInEmbed === false) return { ...base, status: "no-embed", detail: "owner disabled embedding" };
  if (play.status === "LIVE_STREAM_OFFLINE" || (live && live.isLiveNow === false && vd.isLiveContent)) {
    return { ...base, status: "offline", detail: live?.endTimestamp ? `ended ${live.endTimestamp}` : "stream offline" };
  }
  if (vd.isLiveContent === false) return { ...base, status: "recording", detail: "a regular video, not a livestream" };
  if (play.status === "OK" && (vd.isLive || live?.isLiveNow)) return { ...base, status: "live", detail: "live now" };
  if (play.status && play.status !== "OK") return { ...base, status: "removed", detail: play.reason || play.status };
  return { ...base, status: "unverified", detail: "playable, live status unclear" };
}

async function fetchText(url) {
  const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
  return { status: res.status, text: await res.text(), url: res.url };
}

async function oembed(videoId) {
  const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`;
  try { return (await fetch(url, { headers: HEADERS })).status; } catch { return 0; }
}

async function checkCandidate(cand) {
  try {
    if (cand.channelId) {
      // /channel/ID/live resolves to the watch page of whatever the channel is streaming.
      const page = await fetchText(`https://www.youtube.com/channel/${cand.channelId}/live?hl=en`);
      if (page.status !== 200) return { status: "unverified", detail: `YouTube answered ${page.status}` };
      const pr = extractPlayerResponse(page.text);
      if (!pr?.videoDetails?.videoId) return { status: "offline", detail: "channel isn't broadcasting" };
      const result = classify(pr, await oembed(pr.videoDetails.videoId));
      return { ...result, resolvedVideoId: pr.videoDetails.videoId };
    }
    const [page, oe] = await Promise.all([fetchText(`https://www.youtube.com/watch?v=${cand.videoId}&hl=en`), oembed(cand.videoId)]);
    if (page.status !== 200 && oe !== 401 && oe !== 404 && oe !== 400) return { status: "unverified", detail: `YouTube answered ${page.status}` };
    return classify(page.status === 200 ? extractPlayerResponse(page.text) : null, oe);
  } catch (err) {
    return { status: "unverified", detail: `request failed: ${err.message}` };
  }
}

const ICON = { live: "🟢", offline: "🟠", recording: "🟠", "no-embed": "🔴", removed: "🔴", unverified: "⚪️" };
const label = (c) => (c.videoId ? `video \`${c.videoId}\`` : `channel \`${c.channelId}\``);

async function main() {
  const streams = await loadStreams();
  const status = { checkedAt: new Date().toISOString(), streams: {} };
  const lines = ["## Peek stream check", "", `Checked ${status.checkedAt}`, ""];
  const broken = [];

  for (const s of streams) {
    const sources = [];
    for (const cand of candidates(s)) {
      const r = await checkCandidate(cand);
      sources.push({ ...cand, ...r });
      await new Promise((ok) => setTimeout(ok, 400)); // be polite
    }
    const live = sources.filter((x) => x.status === "live");
    const allUnverified = sources.every((x) => x.status === "unverified");
    // Order the page should try: live first (channel embeds as their resolved video), then unverified.
    const playable = [
      ...live.map((x) => x.resolvedVideoId || x.videoId),
      ...sources.filter((x) => x.status === "unverified").map((x) => x.videoId || x.resolvedVideoId).filter(Boolean),
    ];
    status.streams[s.id] = {
      ok: live.length > 0,
      playable: [...new Set(playable)],
      dead: sources.filter((x) => ["removed", "no-embed", "recording", "offline"].includes(x.status) && x.videoId).map((x) => x.videoId),
      sources,
    };
    if (!live.length && !allUnverified) broken.push(s.name);

    lines.push(`**${live.length ? "✅" : allUnverified ? "❔" : "❌"} ${s.name}**`);
    for (const x of sources) {
      const title = x.title ? ` · ${x.title.replace(/\|/g, "/")}${x.author ? ` (${x.author})` : ""}` : "";
      const resolved = x.resolvedVideoId ? ` → \`${x.resolvedVideoId}\`` : "";
      lines.push(`- ${ICON[x.status]} ${label(x)}${resolved}: ${x.status}, ${x.detail}${title}`);
    }
    lines.push("");
    console.log(`${live.length ? "OK " : allUnverified ? "?? " : "BAD"} ${s.id}: ${sources.map((x) => x.status).join(", ")}`);
  }

  const okCount = Object.values(status.streams).filter((x) => x.ok).length;
  lines.splice(3, 0, `**${okCount} of ${streams.length} views have a live, embeddable source.**`, "");
  if (broken.length) lines.push(`Needs a replacement source: ${broken.join(", ")}`);

  await writeFile(OUT, JSON.stringify(status, null, 2) + "\n");
  if (REPORT) await writeFile(REPORT, lines.join("\n") + "\n", { flag: "a" });
  else console.log("\n" + lines.join("\n"));
  if (broken.length) process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
