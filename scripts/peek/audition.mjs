#!/usr/bin/env node
// Auditions live streams in a real browser: loads each one in the YouTube player the way Peek
// does, waits for it to play (and for any pre-roll ad to finish), screenshots it, and records
// what the player reports (title, live, quality levels) plus simple picture stats, so a person
// can judge "is this beautiful and actually working" from a screenshot.
//
// Runs in CI (needs Google Chrome and open internet): the sandbox can't reach googlevideo.com.
//
// Usage: node scripts/peek/audition.mjs [--list file.json] [--out dir] [--concurrency 3] [--settle 14]
// List format: { "items": [ { "videoId": "...", "note": "..." } ] } (bare ID strings also work).
// Needs: npm i --no-save playwright-core jpeg-js

import { readFile, writeFile, mkdir } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const arg = (name, fallback) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : fallback; };
const LIST = arg("--list", path.join(root, "scripts/peek/audition-list.json"));
const OUT = arg("--out", path.join(root, "audition-out"));
const CONCURRENCY = Number(arg("--concurrency", 3));
const SETTLE_MS = Number(arg("--settle", 14)) * 1000;   // time after PLAYING before the screenshot
const AD_WAIT_MS = 45000;                                 // longest we'll wait out a pre-roll ad
const API_KEY = process.env.YOUTUBE_API_KEY;
const W = 1280, H = 720;

const PLAYER_PAGE = `<!doctype html><meta name="referrer" content="strict-origin-when-cross-origin">
<body style="margin:0;background:#000;overflow:hidden"><div id="p"></div>
<script src="https://www.youtube.com/iframe_api"></script>
<script>
window.S = { ready: false, state: null, err: null, events: [] };
function onYouTubeIframeAPIReady() {
  const id = new URLSearchParams(location.search).get("v");
  window.pl = new YT.Player("p", { videoId: id, width: ${W}, height: ${H},
    playerVars: { autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0, rel: 0, playsinline: 1, iv_load_policy: 3 },
    events: {
      onReady: (e) => { S.ready = true; e.target.mute(); e.target.playVideo(); },
      onStateChange: (e) => { S.state = e.data; S.events.push([Date.now(), e.data]); },
      onError: (e) => { S.err = e.data; },
    } });
}
</script>`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function apiDetails(ids) {
  const out = new Map();
  if (!API_KEY) return out;
  for (let i = 0; i < ids.length; i += 50) {
    const qs = new URLSearchParams({ part: "snippet,status,liveStreamingDetails", id: ids.slice(i, i + 50).join(","), key: API_KEY });
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?${qs}`);
    if (!res.ok) { console.error(`videos.list answered ${res.status}`); continue; }
    for (const it of (await res.json()).items || []) out.set(it.id, it);
  }
  return out;
}

// Mean brightness, contrast and frame-to-frame motion from two decoded JPEGs (sampled grid).
function picture(jpeg, a, b) {
  const A = jpeg.decode(a, { useTArray: true }), B = jpeg.decode(b, { useTArray: true });
  let sum = 0, sq = 0, n = 0, diff = 0;
  const step = 6;
  for (let y = 0; y < A.height; y += step) for (let x = 0; x < A.width; x += step) {
    const i = (y * A.width + x) * 4;
    const l = 0.2126 * A.data[i] + 0.7152 * A.data[i + 1] + 0.0722 * A.data[i + 2];
    const l2 = 0.2126 * B.data[i] + 0.7152 * B.data[i + 1] + 0.0722 * B.data[i + 2];
    sum += l; sq += l * l; n++; diff += Math.abs(l - l2);
  }
  const mean = sum / n;
  return { brightness: Math.round(mean), contrast: Math.round(Math.sqrt(sq / n - mean * mean)), motion: +(diff / n).toFixed(2) };
}

async function audition(browser, jpeg, base, item, api) {
  const id = item.videoId;
  const r = { videoId: id, note: item.note || "", channel: item.channel || "", title: api?.snippet?.title || "", channelTitle: api?.snippet?.channelTitle || "",
    watching: api?.liveStreamingDetails?.concurrentViewers ? Number(api.liveStreamingDetails.concurrentViewers) : null, verdict: "", shot: "" };
  if (api) {
    if (api.snippet.liveBroadcastContent !== "live") return { ...r, verdict: "not-live", detail: api.snippet.liveBroadcastContent };
    if (api.status?.embeddable === false) return { ...r, verdict: "no-embed" };
  } else if (API_KEY) return { ...r, verdict: "gone" };

  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  try {
    await page.goto(`${base}/player.html?v=${encodeURIComponent(id)}`, { waitUntil: "domcontentloaded" });
    const t0 = Date.now();
    // wait for the first PLAYING (1)
    let playing = false;
    while (Date.now() - t0 < 30000) {
      const s = await page.evaluate(() => window.S).catch(() => null);
      if (s?.err != null) return { ...r, verdict: "player-error", detail: `error ${s.err}` };
      if (s?.state === 1) { playing = true; break; }
      await sleep(500);
    }
    if (!playing) return { ...r, verdict: "no-play", detail: "never reached PLAYING in 30s" };
    // a pre-roll ad shows a different video id; wait it out
    let adMs = 0;
    while (adMs < AD_WAIT_MS) {
      const vid = await page.evaluate(() => window.pl.getVideoData().video_id).catch(() => id);
      if (vid === id) break;
      await sleep(2000); adMs += 2000;
    }
    r.adSeconds = adMs / 1000;
    await sleep(SETTLE_MS);
    const info = await page.evaluate(() => {
      const d = window.pl.getVideoData();
      return { title: d.title, author: d.author, isLive: d.isLive, levels: window.pl.getAvailableQualityLevels(), quality: window.pl.getPlaybackQuality(), state: window.S.state, err: window.S.err };
    });
    const a = await page.screenshot({ type: "jpeg", quality: 74 });
    await sleep(6000);
    const b = await page.screenshot({ type: "jpeg", quality: 74 });
    Object.assign(r, { title: info.title || r.title, author: info.author, isLive: info.isLive, levels: info.levels, quality: info.quality, endState: info.state }, picture(jpeg, a, b));
    r.maxLevel = ["highres", "hd2880", "hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small", "tiny"].find((q) => info.levels.includes(q)) || "";
    r.shot = `${id}.jpg`;
    await writeFile(path.join(OUT, r.shot), b);
    r.verdict = info.state === 1 ? "played" : `ended-in-state-${info.state}`;
  } catch (err) {
    r.verdict = "error"; r.detail = String(err.message || err).slice(0, 160);
  } finally { await ctx.close().catch(() => {}); }
  return r;
}

async function main() {
  const { chromium } = await import("playwright-core");
  const jpeg = (await import("jpeg-js")).default;
  const raw = JSON.parse(await readFile(LIST, "utf8"));
  const seen = new Set();
  const items = (raw.items || raw).map((x) => (typeof x === "string" ? { videoId: x } : x)).filter((x) => x.videoId && !seen.has(x.videoId) && seen.add(x.videoId));
  await mkdir(OUT, { recursive: true });
  const details = await apiDetails(items.map((x) => x.videoId));
  const server = http.createServer((req, res) => { res.setHeader("content-type", "text/html"); res.end(PLAYER_PAGE); }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const browser = await chromium.launch({ channel: "chrome", args: ["--autoplay-policy=no-user-gesture-required", "--mute-audio"] });
  const results = new Array(items.length);
  let next = 0, done = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await audition(browser, jpeg, base, items[i], details.get(items[i].videoId));
      console.log(`${++done}/${items.length} ${results[i].videoId} ${results[i].verdict}${results[i].maxLevel ? ` ${results[i].maxLevel}` : ""} ${results[i].title.slice(0, 70)}`);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close(); server.close();
  await writeFile(path.join(OUT, "results.json"), JSON.stringify({ at: new Date().toISOString(), results }, null, 2) + "\n");
  const played = results.filter((r) => r.verdict === "played").length;
  console.log(`\n${played} of ${results.length} played.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
