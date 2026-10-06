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

import { readFile, writeFile, mkdir } from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const OUT = arg("--out", path.join(root, "public/peek/status.json"));
// Rolling 30-day record of what each source looked like on every run (not deployed).
const HISTORY = arg("--history", path.join(root, "data/peek/history.json"));
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

// Vetting queue: places that might become views. Checked every run, never played.
export async function loadQueue() {
  try { return JSON.parse(await readFile(path.join(root, "scripts/peek/candidates.json"), "utf8")).candidates || []; }
  catch { return []; }
}

export function candidates(stream) {
  const src = stream.source;
  const ids = src.videoIds || (src.videoId ? [src.videoId] : []);
  return [...ids.map((videoId) => ({ videoId })), ...(src.channelId ? [{ channelId: src.channelId }] : [])];
}

// Pulls the JSON object assigned to `ytInitialPlayerResponse` out of a watch page.
export const extractPlayerResponse = (html) => extractJson(html, /ytInitialPlayerResponse\s*=\s*\{/);

// Pulls the first JSON object assigned to a page variable matching `pattern`.
export function extractJson(html, pattern) {
  const marker = html.search(pattern);
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

// Statuses that mean "don't play this source".
export const DEAD = ["removed", "no-embed", "recording", "offline", "mismatch", "low-quality"];

// Same folding as the page's player.js: accents, ʻokina and case don't matter.
const fold = (t) => String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ʻʼ'’`]/g, "").toLowerCase();
export function matchesExpect(expect, title) {
  if (!expect?.title?.length || !title) return true;
  const t = fold(title);
  return expect.title.some((w) => t.includes(fold(w)));
}

// A scout is a channel ID (UC…) or an @handle; both have a /streams tab.
const channelPath = (scout) => (scout.startsWith("@") ? `/${scout}` : `/channel/${scout}`);

async function fetchText(url) {
  const res = await fetch(url, { headers: HEADERS, redirect: "follow" });
  return { status: res.status, text: await res.text(), url: res.url };
}

async function oembed(videoId) {
  const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`;
  try { return (await fetch(url, { headers: HEADERS })).status; } catch { return 0; }
}

// Every video a channel lists as live right now, from its /streams tab. Handles both the
// older videoRenderer layout and the newer lockupViewModel one (contentId + metadata title).
const LIVE_MARK = /BADGE_STYLE_TYPE_LIVE_NOW|THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE|"style":"LIVE"|"text":"LIVE"|watching"/;
export function findLiveVideos(data) {
  const found = new Map();
  let seen = 0;
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    const id = typeof node.videoId === "string" && node.title ? node.videoId
      : node.contentType === "LOCKUP_CONTENT_TYPE_VIDEO" && typeof node.contentId === "string" ? node.contentId : null;
    if (id && !found.has(id)) {
      seen++;
      if (LIVE_MARK.test(JSON.stringify(node))) {
        const t = node.title || node.metadata?.lockupMetadataViewModel?.title;
        const title = t?.simpleText || t?.content || t?.runs?.map((r) => r.text).join("") || "";
        found.set(id, { videoId: id, title });
      }
      return; // don't double-count nested renderers of the same video
    }
    for (const v of Object.values(node)) walk(v);
  };
  walk(data);
  const list = [...found.values()];
  list.seen = seen;
  return list;
}

// Several views share a channel; list each one once per run (a Data API search costs 100 of
// the 10,000 daily quota units).
const scoutCache = new Map();
function liveOnChannel(scout) {
  if (!scoutCache.has(scout)) scoutCache.set(scout, listLive(scout));
  return scoutCache.get(scout);
}

async function listLive(scout) {
  if (API_KEY) { try { return await apiLiveOnChannel(scout); } catch { return null; } }
  try {
    const page = await fetchText(`https://www.youtube.com${channelPath(scout)}/streams?hl=en`);
    const data = page.status === 200 ? extractJson(page.text, /ytInitialData\s*=\s*\{/) : null;
    if (!data) return null;
    const list = findLiveVideos(data);
    // A tab that lists no videos at all is a page we couldn't read, not an idle channel.
    return list.seen ? list : null;
  } catch { return null; }
}

// ---- YouTube Data API v3 (used when YOUTUBE_API_KEY is set; YouTube shows datacenter
// IPs a bot check, so this is the only reliable way to read live status from CI).
const API_KEY = process.env.YOUTUBE_API_KEY;

async function api(endpoint, params) {
  const qs = new URLSearchParams({ ...params, key: API_KEY });
  const res = await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${qs}`);
  if (!res.ok) throw new Error(`Data API ${endpoint} answered ${res.status}`);
  return res.json();
}

// Maps a videos.list item (or its absence) to the same statuses as classify().
export function classifyApiItem(item) {
  if (!item) return { status: "removed", detail: "video removed, private or bad ID" };
  const base = { title: item.snippet?.title, author: item.snippet?.channelTitle };
  if (item.status?.privacyStatus === "private") return { ...base, status: "removed", detail: "private video" };
  if (item.status?.embeddable === false) return { ...base, status: "no-embed", detail: "owner disabled embedding" };
  // YouTube reports "sd" for every broadcast while it's live, so definition only means something
  // for finished videos. Live resolution is checked in the browser at play time instead.
  if (item.contentDetails?.definition === "sd" && item.snippet?.liveBroadcastContent !== "live") {
    return { ...base, status: "low-quality", detail: "standard definition only" };
  }
  const live = item.liveStreamingDetails;
  switch (item.snippet?.liveBroadcastContent) {
    case "live": return { ...base, status: "live", detail: live?.concurrentViewers ? `live now, ${live.concurrentViewers} watching` : "live now" };
    case "upcoming": return { ...base, status: "offline", detail: "scheduled, not started" };
  }
  if (live?.actualEndTime) return { ...base, status: "offline", detail: `ended ${live.actualEndTime}` };
  if (!live) return { ...base, status: "recording", detail: "a regular video, not a livestream" };
  return { ...base, status: "unverified", detail: "live status unclear" };
}

async function apiVideo(videoId) {
  const j = await api("videos", { part: "snippet,status,liveStreamingDetails,contentDetails", id: videoId });
  return classifyApiItem(j.items?.[0]);
}

const handleIds = new Map();
async function apiChannelId(scout) {
  if (!scout.startsWith("@")) return scout;
  if (!handleIds.has(scout)) {
    const j = await api("channels", { part: "id", forHandle: scout });
    handleIds.set(scout, j.items?.[0]?.id || null);
  }
  const id = handleIds.get(scout);
  if (!id) throw new Error(`no channel for ${scout}`);
  return id;
}

async function apiLiveOnChannel(scout) {
  const channelId = await apiChannelId(scout);
  const j = await api("search", { part: "snippet", channelId, eventType: "live", type: "video", maxResults: 25 });
  return (j.items || []).map((i) => ({ videoId: i.id.videoId, title: i.snippet.title }));
}

async function checkCandidate(cand) {
  if (API_KEY) {
    try {
      if (cand.channelId) {
        const live = await apiLiveOnChannel(cand.channelId);
        if (!live.length) return { status: "offline", detail: "channel isn't broadcasting" };
        return { ...(await apiVideo(live[0].videoId)), resolvedVideoId: live[0].videoId };
      }
      return await apiVideo(cand.videoId);
    } catch (err) {
      return { status: "unverified", detail: err.message };
    }
  }
  try {
    if (cand.channelId) {
      // /channel/ID/live resolves to the watch page of whatever the channel is streaming.
      const page = await fetchText(`https://www.youtube.com/channel/${cand.channelId}/live?hl=en`);
      if (page.status !== 200) return { status: "unverified", detail: `YouTube answered ${page.status}` };
      // When the channel is live, /live is that video's watch page and its canonical link says so.
      const canonical = page.text.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || "";
      const pr = extractPlayerResponse(page.text);
      const videoId = pr?.videoDetails?.videoId || canonical.match(/[?&]v=([\w-]{11})/)?.[1];
      if (!videoId) {
        return canonical.includes("/channel/") || canonical.includes("/@")
          ? { status: "offline", detail: "channel isn't broadcasting" }
          : { status: "unverified", detail: "couldn't read the channel's live page" };
      }
      const result = classify(pr, await oembed(videoId));
      return { ...result, resolvedVideoId: videoId };
    }
    const [page, oe] = await Promise.all([fetchText(`https://www.youtube.com/watch?v=${cand.videoId}&hl=en`), oembed(cand.videoId)]);
    if (page.status !== 200 && oe !== 401 && oe !== 404 && oe !== 400) return { status: "unverified", detail: `YouTube answered ${page.status}` };
    return classify(page.status === 200 ? extractPlayerResponse(page.text) : null, oe);
  } catch (err) {
    return { status: "unverified", detail: `request failed: ${err.message}` };
  }
}

const ICON = { live: "🟢", offline: "🟠", recording: "🟠", "no-embed": "🔴", removed: "🔴", mismatch: "🔴", "low-quality": "🔴", unverified: "⚪️" };
const label = (c) => (c.videoId ? `video \`${c.videoId}\`` : `channel \`${c.channelId}\``);
const md = (t) => String(t).replace(/\|/g, "/");

// Applies the view's expectations to one checked source: a stream that plays the wrong
// place is as bad as a dead one.
export function judge(stream, result) {
  if (["live", "unverified"].includes(result.status) && result.title && !matchesExpect(stream.expect, result.title)) {
    return { ...result, status: "mismatch", detail: `shows "${result.title}", expected ${stream.expect.title.join(" / ")}` };
  }
  return result;
}

// Self-healing: live videos on the view's trusted channels whose titles match its expectations,
// minus anything already known. These become playable even if every catalog source died.
export function autoFind(stream, scouted, sources) {
  const known = new Set(sources.flatMap((x) => [x.videoId, x.resolvedVideoId]).filter(Boolean));
  const found = [];
  for (const list of Object.values(scouted)) {
    for (const v of list || []) {
      if (!known.has(v.videoId) && matchesExpect(stream.expect, v.title)) { known.add(v.videoId); found.push(v); }
    }
  }
  return found;
}

export function confirmFromScouts(stream, scouted, sources) {
  const listed = new Map(Object.values(scouted).flatMap((l) => (l || []).map((v) => [v.videoId, v.title])));
  for (const x of sources) {
    const id = x.videoId || x.resolvedVideoId;
    if (x.status === "unverified" && listed.has(id) && matchesExpect(stream.expect, listed.get(id))) {
      Object.assign(x, { status: "live", detail: "listed live on its channel", title: x.title || listed.get(id) });
    }
  }
}

// Where a queued place stands: "ready" once one of its streams clears the promotion bar,
// "live" when something on target is up right now, otherwise "down".
export function queueVerdict(results, history) {
  const scored = results.map((r) => ({ ...r, uptime: uptime(history, r.videoId) }));
  const ready = scored.find((r) => readyToPromote(r.uptime));
  if (ready) return { state: "ready", best: ready, scored };
  const live = scored.find((r) => r.status === "live");
  return { state: live ? "live" : "down", best: live || null, scored };
}

// ---- uptime history
const HISTORY_DAYS = 30;
export const PROMOTE = { minDays: 14, minUptime: 0.95 };   // bar for a source to join rotation
export const FLAKY = { minSamples: 20, maxUptime: 0.8 };   // bar for flagging a catalog source

// Records this run (live vs dead; unverified says nothing) and drops samples past the window.
export function recordRun(history, at, results) {
  const cutoff = Date.parse(at) - HISTORY_DAYS * 86400e3;
  const out = { sources: {} };
  for (const [id, samples] of Object.entries(history?.sources || {})) {
    const kept = samples.filter(([t]) => Date.parse(t) >= cutoff);
    if (kept.length) out.sources[id] = kept;
  }
  for (const [id, state] of Object.entries(results)) {
    if (state === "live" || DEAD.includes(state)) (out.sources[id] ||= []).push([at, state === "live" ? 1 : 0]);
  }
  return out;
}
export function uptime(history, id) {
  const samples = history?.sources?.[id] || [];
  if (!samples.length) return { samples: 0, days: 0, uptime: null };
  const up = samples.filter(([, v]) => v).length;
  const days = (Date.parse(samples.at(-1)[0]) - Date.parse(samples[0][0])) / 86400e3;
  return { samples: samples.length, days: Math.round(days * 10) / 10, uptime: up / samples.length };
}
const pct = (u) => (u.uptime == null ? "no history" : `${Math.round(u.uptime * 100)}% up over ${u.days}d (${u.samples} checks)`);
export const readyToPromote = (u) => u.uptime != null && u.days >= PROMOTE.minDays && u.uptime >= PROMOTE.minUptime;
export const isFlaky = (u) => u.samples >= FLAKY.minSamples && u.uptime < FLAKY.maxUptime;

async function main() {
  const streams = await loadStreams();
  const status = { checkedAt: new Date().toISOString(), mode: API_KEY ? "api" : "scrape", streams: {} };
  let history = null;
  try { history = JSON.parse(await readFile(HISTORY, "utf8")); } catch { /* first run */ }
  const thisRun = {};      // source id -> status, for the history
  const allScouted = {};   // channel -> live list, for discovery
  const lines = ["## Peek stream check", "", `Checked ${status.checkedAt} (${API_KEY ? "YouTube Data API" : "page scraping, no API key"})`, ""];
  const broken = [];

  const paused = [];
  for (const s of streams) {
    const sources = [];
    for (const cand of candidates(s)) {
      const r = judge(s, await checkCandidate(cand));
      // r.videoId is whatever YouTube reported (often nothing); the catalog's own IDs win.
      sources.push({ ...r, ...cand });
      await new Promise((ok) => setTimeout(ok, 400)); // be polite
    }

    const scouted = {};
    for (const scout of [...new Set([...(s.scout || []), ...(s.source.channelId ? [s.source.channelId] : [])])]) {
      scouted[scout] = await liveOnChannel(scout);
    }
    Object.assign(allScouted, scouted);
    // Auto-found candidates get the same check as catalog sources (live, embeddable, on target)
    // before they can stand in for anything.
    const found = [];
    for (const v of autoFind(s, scouted, sources)) {
      const r = judge(s, await checkCandidate({ videoId: v.videoId }));
      if (!DEAD.includes(r.status)) found.push({ ...v, status: r.status });
      else thisRun[v.videoId] = r.status;
    }
    // A source its own channel lists as live (and on-target) is confirmed, even when the
    // watch page itself was hidden behind a bot check.
    confirmFromScouts(s, scouted, sources);

    for (const x of sources) { const id = x.resolvedVideoId || x.videoId; if (id) thisRun[id] = x.status; }
    for (const v of found) if (v.status === "live") thisRun[v.videoId] = "live";
    const live = sources.filter((x) => x.status === "live");
    // Order the page should try: confirmed live, then (only when none of the view's own sources
    // is live) auto-found replacements, then unverified. Auto-finds are a recovery path, not extras.
    const playable = [
      ...live.map((x) => x.resolvedVideoId || x.videoId),
      ...(live.length ? [] : found.map((v) => v.videoId)),
      ...sources.filter((x) => x.status === "unverified").map((x) => x.videoId || x.resolvedVideoId).filter(Boolean),
    ];
    // Broken only when every source is confirmed dead and nothing replaced them.
    const confirmedDead = !s.paused && !found.length && sources.every((x) => DEAD.includes(x.status));
    if (s.paused) paused.push(found.length ? `${s.name} (auto-found a replacement, now back in rotation)` : s.name);
    status.streams[s.id] = {
      ok: live.length > 0 || found.length > 0,
      playable: [...new Set(playable)],
      dead: sources.filter((x) => DEAD.includes(x.status) && x.videoId).map((x) => x.videoId),
      autoFound: found,
      sources,
      scouted,
    };
    if (confirmedDead) broken.push(s.name);

    lines.push(`**${live.length || found.length ? "✅" : s.paused ? "⏸" : confirmedDead ? "❌" : "❔"} ${s.name}**${s.paused ? ` (paused: ${md(s.paused)})` : ""}`);
    for (const x of sources) {
      const title = x.title && x.status !== "mismatch" ? ` · ${md(x.title)}${x.author ? ` (${md(x.author)})` : ""}` : "";
      const resolved = x.resolvedVideoId ? ` → \`${x.resolvedVideoId}\`` : "";
      const u = uptime(history, x.resolvedVideoId || x.videoId);
      lines.push(`- ${ICON[x.status]} ${label(x)}${resolved}: ${x.status}, ${md(x.detail)}${title} · ${isFlaky(u) ? "⚠️ flaky, " : ""}${pct(u)}`);
    }
    for (const v of found) {
      const u = uptime(history, v.videoId);
      lines.push(`- 🩹 auto-found \`${v.videoId}\` ${md(v.title)} · ${pct(u)}${readyToPromote(u) ? " · ⭐ ready to add to streams.js" : ""}`);
    }
    for (const [scout, list] of Object.entries(scouted)) {
      lines.push(list === null ? `- 🔭 \`${scout}\`: couldn't list streams`
        : `- 🔭 live on \`${scout}\` now: ${list.length ? list.map((v) => `\`${v.videoId}\` ${md(v.title)}`).join("; ") : "nothing"}`);
    }
    lines.push("");
    console.log(`${live.length || found.length ? "OK " : s.paused ? "|| " : confirmedDead ? "BAD" : "?? "} ${s.id}: ${sources.map((x) => x.status).join(", ")}${found.length ? ` + ${found.length} auto-found` : ""}`);
  }

  // Discovery: live videos on trusted channels that no view uses yet, for curation.
  const used = new Set(Object.values(status.streams).flatMap((x) => [...x.sources.flatMap((y) => [y.videoId, y.resolvedVideoId]), ...x.autoFound.map((v) => v.videoId)]).filter(Boolean));
  const discovered = [];
  for (const [scout, list] of Object.entries(allScouted)) for (const v of list || []) if (!used.has(v.videoId)) { used.add(v.videoId); discovered.push({ ...v, channel: scout }); }
  status.discovered = discovered;
  if (discovered.length) {
    lines.push("### Live on trusted channels, not in Peek yet", "");
    for (const v of discovered) lines.push(`- \`${v.videoId}\` ${md(v.title)} (${v.channel})`);
    lines.push("");
  }

  // Vetting queue. Video IDs are cheap to check every run; channel searches for queued places
  // run once a day on the schedule (always on manual and PR runs) to stay inside the API quota.
  const queue = await loadQueue();
  const queueResults = {};
  if (queue.length) {
    const scoutQueue = process.env.GITHUB_EVENT_NAME !== "schedule" || new Date().getUTCHours() < 6;
    for (const c of queue) {
      const results = [];
      for (const videoId of c.videoIds || []) {
        const r = judge(c, await checkCandidate({ videoId }));
        results.push({ videoId, status: r.status, title: r.title || "", detail: r.detail || "" });
        await new Promise((ok) => setTimeout(ok, 200));
      }
      if (scoutQueue) {
        const scouted = {};
        for (const scout of c.scout || []) scouted[scout] = await liveOnChannel(scout);
        for (const v of autoFind(c, scouted, results)) {
          const r = judge(c, await checkCandidate({ videoId: v.videoId }));
          results.push({ videoId: v.videoId, status: r.status, title: r.title || v.title, detail: "found live on its channel", found: true });
        }
        for (const [scout, list] of Object.entries(scouted)) if (list === null) results.push({ channel: scout, status: "unverified", detail: "couldn't list the channel" });
      }
      for (const r of results) if (r.videoId) thisRun[r.videoId] = r.status;
      queueResults[c.id] = results;
    }
  }

  history = recordRun(history, status.checkedAt, thisRun);

  if (queue.length) {
    lines.push("### Vetting queue (not on the site)", "", `A place is ready when one stream has been up ${PROMOTE.minUptime * 100}%+ for ${PROMOTE.minDays}+ days and shows the right place.`, "");
    const summary = {};
    for (const c of queue) {
      const v = queueVerdict(queueResults[c.id].filter((r) => r.videoId), history);
      summary[c.id] = { state: v.state, sources: v.scored.map((r) => ({ videoId: r.videoId, status: r.status, title: r.title, uptime: r.uptime })) };
      lines.push(`**${{ ready: "⭐", live: "🟢", down: "⚪️" }[v.state]} ${md(c.place)}** (${md(c.operator)})${c.note ? `, ${md(c.note)}` : ""}`);
      for (const r of queueResults[c.id]) {
        if (!r.videoId) { lines.push(`- 🔭 \`${r.channel}\`: ${r.detail}`); continue; }
        const title = r.title && r.status !== "mismatch" ? ` · ${md(r.title)}` : "";
        lines.push(`- ${ICON[r.status]} \`${r.videoId}\`${r.found ? " (found on channel)" : ""}: ${r.status}, ${md(r.detail)}${title} · ${pct(uptime(history, r.videoId))}`);
      }
      lines.push("");
      console.log(`Q   ${c.id}: ${v.state} (${queueResults[c.id].map((r) => `${r.videoId || r.channel}=${r.status}`).join(", ")})`);
    }
    await mkdir(path.dirname(HISTORY), { recursive: true });
    await writeFile(path.join(path.dirname(HISTORY), "queue.json"), JSON.stringify({ checkedAt: status.checkedAt, queue: summary }, null, 2) + "\n");
  }
  for (const [id, x] of Object.entries(status.streams)) {
    x.uptime = Object.fromEntries(x.sources.map((y) => y.resolvedVideoId || y.videoId).filter(Boolean).map((vid) => [vid, uptime(history, vid)]));
  }

  const okCount = Object.values(status.streams).filter((x) => x.ok).length;
  lines.splice(3, 0, `**${okCount} of ${streams.length} views have a live, embeddable, on-target source.**`, "");
  if (broken.length) lines.push(`Needs a replacement source: ${broken.join(", ")}`);
  if (paused.length) lines.push(`Paused: ${paused.join(", ")}`);
  if (!API_KEY && Object.values(status.streams).some((x) => x.sources.some((y) => /bot check/.test(y.detail || "")))) {
    lines.push("", "> YouTube answered with a bot check, so live status couldn't be confirmed. Add a YouTube Data API key as the `YOUTUBE_API_KEY` repo secret to fix this.");
  }

  await writeFile(OUT, JSON.stringify(status, null, 2) + "\n");
  await mkdir(path.dirname(HISTORY), { recursive: true });
  await writeFile(HISTORY, JSON.stringify(history) + "\n");
  if (REPORT) await writeFile(REPORT, lines.join("\n") + "\n", { flag: "a" });
  console.log("\n" + lines.join("\n"));
  if (broken.length) process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
