#!/usr/bin/env node
// Auditions live streams so a person can judge "is this beautiful and actually working".
//
// Default mode (CI): for each stream, asks the Data API whether it is live and embeddable, then
// saves YouTube's live thumbnail (maxresdefault_live.jpg, a frame of the stream refreshed every
// few minutes; it only exists when the source is 720p or better, so it doubles as an HD check),
// and tiles them into 9-up contact sheets for fast triage. GitHub's runners can't PLAY YouTube
// (it shows "Sign in to confirm you're not a bot" to datacenter IPs), but thumbnails aren't gated.
//
// --play mode: loads each stream in real Chrome through the IFrame API, waits out pre-roll ads
// and screenshots the playing video. Only works from a normal home or office connection.
//
// Usage: node scripts/peek/audition.mjs [--list file.json] [--out dir] [--concurrency 8] [--play]
// List format: { "items": [ { "videoId": "...", "note": "..." } ] } (bare ID strings also work).
// Needs: npm i --no-save jpeg-js   (plus playwright-core for --play)

import { readFile, writeFile, mkdir } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const arg = (name, fallback) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : fallback; };
const LIST = arg("--list", path.join(root, "scripts/peek/audition-list.json"));
const OUT = arg("--out", path.join(root, "audition-out"));
const PLAY = process.argv.includes("--play");
const SMALL = process.argv.includes("--small");   // save 640x360 frames (for big lists); default keeps YouTube's original
const CONCURRENCY = Number(arg("--concurrency", PLAY ? 3 : 8));
const SETTLE_MS = Number(arg("--settle", 14)) * 1000;   // time after PLAYING before the screenshot
const AD_WAIT_MS = 45000;                                 // longest we'll wait out a pre-roll ad
const HEADED = process.argv.includes("--headed");           // real window (run under xvfb-run); looks less like automation
const NOCOOKIE = process.argv.includes("--nocookie");        // play through youtube-nocookie.com
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
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
    host: ${JSON.stringify(NOCOOKIE ? "https://www.youtube-nocookie.com" : "https://www.youtube.com")},
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

  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: UA, locale: "en-US" });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, "webdriver", { get: () => undefined }); });
  const page = await ctx.newPage();
  try {
    await page.goto(`${base}/player.html?v=${encodeURIComponent(id)}`, { waitUntil: "domcontentloaded" });
    const t0 = Date.now();
    // wait for the first PLAYING (1)
    let playing = false;
    while (Date.now() - t0 < 30000) {
      const s = await page.evaluate(() => window.S).catch(() => null);
      if (s?.err != null) {
        await sleep(1500);   // let the player draw its message, then keep a picture of it
        r.shot = `${id}.jpg`; await writeFile(path.join(OUT, r.shot), await page.screenshot({ type: "jpeg", quality: 70 })).catch(() => { r.shot = ""; });
        return { ...r, verdict: "player-error", detail: `error ${s.err}` };
      }
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


// ---- default mode: live thumbnails -----------------------------------------------------------
const THUMBS = ["maxresdefault_live.jpg", "hq720_live.jpg", "sddefault_live.jpg", "hqdefault_live.jpg"];
const TILE_W = 426, TILE_H = 240, COLS = 3, ROWS = 3;

// Mean brightness and contrast of a decoded image (sampled grid).
function stats(img) {
  let sum = 0, sq = 0, n = 0;
  for (let y = 0; y < img.height; y += 6) for (let x = 0; x < img.width; x += 6) {
    const i = (y * img.width + x) * 4;
    const l = 0.2126 * img.data[i] + 0.7152 * img.data[i + 1] + 0.0722 * img.data[i + 2];
    sum += l; sq += l * l; n++;
  }
  const mean = sum / n;
  return { brightness: Math.round(mean), contrast: Math.round(Math.sqrt(Math.max(0, sq / n - mean * mean))) };
}

async function thumbAudition(jpeg, item, api) {
  const id = item.videoId;
  const r = { videoId: id, note: item.note || "", channel: item.channel || "", title: api?.snippet?.title || item.title || "", channelTitle: api?.snippet?.channelTitle || "",
    channelId: api?.snippet?.channelId || "", watching: api?.liveStreamingDetails?.concurrentViewers ? Number(api.liveStreamingDetails.concurrentViewers) : null, verdict: "", shot: "" };
  if (API_KEY) {
    if (!api) return { ...r, verdict: "gone" };
    if (api.snippet.liveBroadcastContent !== "live") return { ...r, verdict: "not-live", detail: api.snippet.liveBroadcastContent };
    if (api.status?.embeddable === false) return { ...r, verdict: "no-embed" };
  }
  for (const name of THUMBS) {
    let res;
    try { res = await fetch(`https://i.ytimg.com/vi/${id}/${name}`); } catch { continue; }
    if (res.status !== 200) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    let img;
    try { img = jpeg.decode(buf, { useTArray: true, maxMemoryUsageInMB: 512 }); } catch { continue; }
    if (img.width < 320) continue;
    const hd = name === "maxresdefault_live.jpg" || name === "hq720_live.jpg";
    const st = stats(img);
    // "dark" is not a verdict on the stream: it may just be night there. Retry it in daylight.
    const verdict = !hd ? "sd" : st.contrast < 15 ? "flat" : st.brightness < 35 ? "dark" : "frame";
    const base = { ...r, thumb: name.replace("_live.jpg", ""), width: img.width, height: img.height, hd, ...st, verdict };
    if (verdict !== "frame") return base;
    const file = `${id}.jpg`;
    if (SMALL) await writeFile(path.join(OUT, file), jpeg.encode(resize(img, 640, 360), 72).data);
    else await writeFile(path.join(OUT, file), buf);
    return { ...base, shot: file, _img: img };
  }
  return { ...r, verdict: "no-thumb" };
}

// Nearest-neighbour cover-crop resize to w x h, as a jpeg-js raw image.
function resize(img, w, h) {
  const data = Buffer.alloc(w * h * 4);
  paste(data, w, img, 0, 0, w, h);
  return { data, width: w, height: h };
}

// Box-average resize of a decoded image into a TILE_W x TILE_H cover crop, pasted into the sheet.
function paste(sheet, sw, img, col, row, tw = TILE_W, th = TILE_H) {
  const scale = Math.max(tw / img.width, th / img.height);
  const cw = tw / scale, ch = th / scale, x0 = (img.width - cw) / 2, y0 = (img.height - ch) / 2;
  for (let y = 0; y < th; y++) for (let x = 0; x < tw; x++) {
    const sx = Math.min(img.width - 1, Math.floor(x0 + (x + 0.5) / scale)), sy = Math.min(img.height - 1, Math.floor(y0 + (y + 0.5) / scale));
    const si = (sy * img.width + sx) * 4, di = ((row * th + y) * sw + col * tw + x) * 4;
    sheet[di] = img.data[si]; sheet[di + 1] = img.data[si + 1]; sheet[di + 2] = img.data[si + 2]; sheet[di + 3] = 255;
  }
}

async function thumbMain() {
  const jpeg = (await import("jpeg-js")).default;
  const items = loadItems(await readFile(LIST, "utf8"));
  await mkdir(OUT, { recursive: true });
  const details = await apiDetails(items.map((x) => x.videoId));
  const results = new Array(items.length);
  let next = 0, done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await thumbAudition(jpeg, items[i], details.get(items[i].videoId));
      if (++done % 25 === 0) console.log(`${done}/${items.length}`);
    }
  }));
  // contact sheets: nine frames each, in list order, row by row. sheets.json says which ID is which tile.
  const framed = results.filter((r) => r.verdict === "frame");
  const sheets = [];
  for (let s = 0; s * COLS * ROWS < framed.length; s++) {
    const chunk = framed.slice(s * COLS * ROWS, (s + 1) * COLS * ROWS);
    const sw = TILE_W * COLS, sh = TILE_H * ROWS, data = Buffer.alloc(sw * sh * 4, 20);
    chunk.forEach((r, k) => paste(data, sw, r._img, k % COLS, Math.floor(k / COLS)));
    const file = `sheet-${String(s + 1).padStart(2, "0")}.jpg`;
    await writeFile(path.join(OUT, file), jpeg.encode({ data, width: sw, height: sh }, 82).data);
    sheets.push({ file, tiles: chunk.map((r) => r.videoId) });
  }
  for (const r of results) delete r._img;
  await writeFile(path.join(OUT, "results.json"), JSON.stringify({ at: new Date().toISOString(), mode: "thumbs", sheets, results }, null, 2) + "\n");
  const by = {};
  for (const r of results) by[r.verdict] = (by[r.verdict] || 0) + 1;
  console.log(`\n${framed.length} frames of ${results.length} candidates`, JSON.stringify(by), `${framed.filter((r) => r.hd).length} HD`);
}

function loadItems(text) {
  const raw = JSON.parse(text);
  const seen = new Set();
  return (raw.items || raw).map((x) => (typeof x === "string" ? { videoId: x } : x)).filter((x) => x.videoId && !seen.has(x.videoId) && seen.add(x.videoId));
}

async function main() {
  const { chromium } = await import("playwright-core");
  const jpeg = (await import("jpeg-js")).default;
  const items = loadItems(await readFile(LIST, "utf8"));
  await mkdir(OUT, { recursive: true });
  const details = await apiDetails(items.map((x) => x.videoId));
  const server = http.createServer((req, res) => { res.setHeader("content-type", "text/html"); res.end(PLAYER_PAGE); }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const browser = await chromium.launch({ channel: "chrome", headless: !HEADED, ignoreDefaultArgs: ["--enable-automation"],
    args: ["--autoplay-policy=no-user-gesture-required", "--mute-audio", "--disable-blink-features=AutomationControlled"] });
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

(PLAY ? main() : thumbMain()).catch((e) => { console.error(e); process.exit(1); });
