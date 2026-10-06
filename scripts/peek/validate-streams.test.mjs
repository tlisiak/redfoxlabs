import { test } from "node:test";
import assert from "node:assert/strict";
import { extractPlayerResponse, classify, loadStreams, candidates, findLiveVideos, classifyApiItem, matchesExpect, judge, autoFind, confirmFromScouts, DEAD, recordRun, uptime, readyToPromote, isFlaky, loadQueue, queueVerdict } from "./validate-streams.mjs";

const page = (pr) => `<html><script>var ytInitialPlayerResponse = ${JSON.stringify(pr)};var meta = {"a":1};</script></html>`;
const pr = ({ status = "OK", reason, embed = true, isLive, isLiveContent = true, isLiveNow } = {}) => ({
  playabilityStatus: { status, reason, playableInEmbed: embed },
  videoDetails: { videoId: "abc123def45", title: 'Venice "Rialto" {4K} live', author: "I Love You Venice", isLive, isLiveContent },
  microformat: { playerMicroformatRenderer: isLiveNow === undefined ? {} : { liveBroadcastDetails: { isLiveNow } } },
});

test("extracts player response, including braces and quotes inside strings", () => {
  const got = extractPlayerResponse(page(pr({ isLive: true })));
  assert.equal(got.videoDetails.title, 'Venice "Rialto" {4K} live');
});

test("returns null when the page has no player data", () => {
  assert.equal(extractPlayerResponse("<html>consent wall</html>"), null);
});

test("classifies each outcome", () => {
  assert.equal(classify(pr({ isLive: true, isLiveNow: true }), 200).status, "live");
  assert.equal(classify(pr({ isLive: true }), 401).status, "no-embed");
  assert.equal(classify(pr({ embed: false, isLive: true }), 200).status, "no-embed");
  assert.equal(classify(null, 404).status, "removed");
  assert.equal(classify(pr({ status: "ERROR", reason: "Video unavailable" }), 200).status, "removed");
  assert.equal(classify(pr({ isLiveContent: false }), 200).status, "recording");
  assert.equal(classify(pr({ isLiveNow: false }), 200).status, "offline");
  assert.equal(classify(pr({ status: "LIVE_STREAM_OFFLINE" }), 200).status, "offline");
  assert.equal(classify(pr({ status: "LOGIN_REQUIRED", reason: "Sign in to confirm you're not a bot" }), 200).status, "unverified");
  assert.equal(classify(null, 200).status, "unverified");
  // a blocked or rate-limited oEmbed call must not condemn a healthy stream
  assert.equal(classify(pr({ isLive: true, isLiveNow: true }), 403).status, "live");
  assert.equal(classify(null, 0).status, "unverified");
});

test("catalog loads and every view has at least one source", async () => {
  const streams = await loadStreams();
  assert.ok(streams.length >= 10);
  for (const s of streams) {
    // A paused view either has a trusted channel to auto-recover from, or says what it needs.
    if (s.paused) assert.ok(typeof s.paused === "string" && s.paused.length > 10, `paused ${s.id} needs a reason`);
    else assert.ok(candidates(s).length > 0, `${s.id} has no sources`);
  }
});

test("finds only the live videos on a channel's streams tab", () => {
  const data = { contents: [
    { videoRenderer: { videoId: "LIVEaaaaaaa", title: { runs: [{ text: "Rialto 4K live" }] }, badges: [{ metadataBadgeRenderer: { style: "BADGE_STYLE_TYPE_LIVE_NOW" } }] } },
    { videoRenderer: { videoId: "PASTbbbbbbb", title: { simpleText: "Yesterday's stream" }, publishedTimeText: { simpleText: "Streamed 1 day ago" } } },
    { gridVideoRenderer: { videoId: "LIVEccccccc", title: { simpleText: "Grand Canal" }, viewCountText: { runs: [{ text: "312" }, { text: " watching" }] } } },
  ] };
  assert.deepEqual(findLiveVideos(data).map((v) => v.videoId), ["LIVEaaaaaaa", "LIVEccccccc"]);
  assert.equal(findLiveVideos(data)[0].title, "Rialto 4K live");
});

test("classifies Data API items", () => {
  const item = (liveBroadcastContent, extra = {}) => ({ snippet: { title: "t", channelTitle: "c", liveBroadcastContent }, status: { privacyStatus: "public", embeddable: true }, ...extra });
  assert.equal(classifyApiItem(undefined).status, "removed");
  assert.equal(classifyApiItem(item("live", { liveStreamingDetails: { concurrentViewers: "41" } })).status, "live");
  assert.equal(classifyApiItem(item("upcoming", { liveStreamingDetails: {} })).status, "offline");
  assert.equal(classifyApiItem(item("none", { liveStreamingDetails: { actualEndTime: "2026-10-01T00:00:00Z" } })).status, "offline");
  assert.equal(classifyApiItem(item("none")).status, "recording");
  assert.equal(classifyApiItem({ ...item("live"), status: { privacyStatus: "public", embeddable: false } }).status, "no-embed");
  assert.equal(classifyApiItem({ ...item("none"), status: { privacyStatus: "private" } }).status, "removed");
});

test("expectations ignore accents, okina and case", () => {
  assert.ok(matchesExpect({ title: ["Kilauea", "Halemaumau"] }, "[V1cam] Kīlauea volcano, Hawaii (west Halemaʻumaʻu crater)"));
  assert.ok(matchesExpect({ title: ["Jokulsarlon"] }, "🔴 Live Webcam from Jökulsárlón Lagoon"));
  assert.ok(!matchesExpect({ title: ["Rialto"] }, "Venice live: St Mark's Square"));
  assert.ok(matchesExpect({ title: ["Rialto"] }, undefined), "no title means no verdict");
});

test("a live source showing the wrong place is a mismatch, and dead", () => {
  const s = { expect: { title: ["Namib Desert"] } };
  const r = judge(s, { status: "live", title: "Namibia: Live stream in the Kalahari" });
  assert.equal(r.status, "mismatch");
  assert.ok(DEAD.includes(r.status));
  assert.equal(judge(s, { status: "live", title: "Namibia: Live stream in the Namib Desert" }).status, "live");
  assert.equal(judge(s, { status: "removed", title: "anything" }).status, "removed");
});

test("auto-find only promotes on-target, unknown live videos", () => {
  const s = { expect: { title: ["Rialto"] } };
  const scouted = { UCx: [
    { videoId: "aaaaaaaaaaa", title: "Rialto Bridge 4K live" },
    { videoId: "bbbbbbbbbbb", title: "St Mark's Square live" },
    { videoId: "ccccccccccc", title: "Rialto again" },
  ], "@other": null };
  const found = autoFind(s, scouted, [{ videoId: "ccccccccccc", status: "live" }]);
  assert.deepEqual(found.map((v) => v.videoId), ["aaaaaaaaaaa"]);
});

test("definition only counts for finished videos (YouTube says sd for everything live)", () => {
  const item = (liveBroadcastContent) => ({ snippet: { liveBroadcastContent }, status: { privacyStatus: "public", embeddable: true }, contentDetails: { definition: "sd" }, liveStreamingDetails: {} });
  assert.equal(classifyApiItem(item("live")).status, "live");
  assert.equal(classifyApiItem(item("none")).status, "low-quality");
});

test("every view declares what it should show", async () => {
  const streams = await loadStreams();
  for (const s of streams) assert.ok(s.expect?.title?.length, `${s.id} has no expect.title`);
});

test("reads live videos from YouTube's newer lockup layout too", () => {
  const data = { items: [
    { lockupViewModel: { contentId: "LOCKliveaaa", contentType: "LOCKUP_CONTENT_TYPE_VIDEO",
      metadata: { lockupMetadataViewModel: { title: { content: "Sydney Harbour 24/7 live" } } },
      contentImage: { thumbnailViewModel: { overlays: [{ thumbnailBadgeViewModel: { text: "LIVE", badgeStyle: "THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE" } }] } } } },
    { lockupViewModel: { contentId: "LOCKoldbbbb", contentType: "LOCKUP_CONTENT_TYPE_VIDEO",
      metadata: { lockupMetadataViewModel: { title: { content: "Yesterday" } } } } },
  ] };
  const found = findLiveVideos(data);
  assert.deepEqual(found.map((v) => [v.videoId, v.title]), [["LOCKliveaaa", "Sydney Harbour 24/7 live"]]);
  assert.equal(found.seen, 2);
});

test("a bot-checked source its channel lists as live counts as live", () => {
  const s = { expect: { title: ["Tembe"] } };
  const sources = [
    { videoId: "0P_LBKqVbfs", status: "unverified", detail: "YouTube bot check" },
    { videoId: "notlisted00", status: "unverified", detail: "YouTube bot check" },
    { videoId: "deadvideo00", status: "offline", detail: "ended" },
  ];
  confirmFromScouts(s, { UCx: [{ videoId: "0P_LBKqVbfs", title: "LIVE Elephant Cam: Tembe Elephant Park" }, { videoId: "deadvideo00", title: "Tembe" }] }, sources);
  assert.deepEqual(sources.map((x) => x.status), ["live", "unverified", "offline"]);
});

test("history keeps 30 days, ignores unverified, and scores uptime", () => {
  let h = null;
  const day = (n) => new Date(Date.UTC(2026, 9, 1) + n * 86400e3).toISOString();
  for (let d = 0; d < 40; d++) h = recordRun(h, day(d), { aaaaaaaaaaa: d % 10 === 0 ? "offline" : "live", bbbbbbbbbbb: "unverified" });
  const u = uptime(h, "aaaaaaaaaaa");
  assert.equal(u.samples, 31, "only the last 30 days are kept");
  assert.ok(u.uptime > 0.85 && u.uptime < 0.95);
  assert.equal(uptime(h, "bbbbbbbbbbb").samples, 0, "unverified isn't evidence either way");
  assert.ok(!readyToPromote(u), "under 95% doesn't make the cut");
});

test("promotion needs two weeks above 95%; flaky needs evidence", () => {
  let h = null;
  for (let i = 0; i < 60; i++) h = recordRun(h, new Date(Date.UTC(2026, 9, 1) + i * 6 * 3600e3).toISOString(), { goodgoodgoo: "live", flakyflaky0: i % 3 ? "live" : "offline" });
  assert.ok(readyToPromote(uptime(h, "goodgoodgoo")));
  assert.ok(isFlaky(uptime(h, "flakyflaky0")));
  assert.ok(!isFlaky(uptime(recordRun(null, "2026-10-01T00:00:00Z", { x: "offline" }), "x")), "one bad check isn't flaky");
});

test("vetting queue entries are well-formed and don't duplicate a live view", async () => {
  const queue = await loadQueue();
  const views = new Map((await loadStreams()).map((s) => [s.id, s]));
  const ids = new Set();
  for (const c of queue) {
    assert.ok(!ids.has(c.id), `${c.id} is queued twice`); ids.add(c.id);
    assert.ok(c.place && c.operator, `${c.id} needs a place and operator`);
    assert.ok(c.expect?.title?.length, `${c.id} needs expect.title`);
    assert.ok((c.videoIds || []).length || (c.scout || []).length, `${c.id} has nothing to check`);
    for (const v of c.videoIds || []) assert.match(v, /^[\w-]{11}$/, `${c.id}: bad video id ${v}`);
    // Queued places either are new or are paused views waiting on a working stream.
    if (views.has(c.id)) assert.ok(views.get(c.id).paused, `${c.id} is already an active view`);
  }
});

test("queue verdict: ready needs the promotion bar, live needs something up now", () => {
  let h = null;
  for (let i = 0; i < 60; i++) h = recordRun(h, new Date(Date.UTC(2026, 9, 1) + i * 6 * 3600e3).toISOString(), { steadyaaaaa: "live", newbbbbbbbb: i === 59 ? "live" : "offline" });
  assert.equal(queueVerdict([{ videoId: "steadyaaaaa", status: "live" }], h).state, "ready");
  assert.equal(queueVerdict([{ videoId: "newbbbbbbbb", status: "live" }], h).state, "live");
  assert.equal(queueVerdict([{ videoId: "newbbbbbbbb", status: "offline" }], h).state, "down");
  assert.equal(queueVerdict([], h).state, "down");
});

test("the Tetons view won't auto-find SeeJH's other Teton-named cams", async () => {
  const tetons = (await loadStreams()).find((s) => s.id === "tetons");
  for (const t of ["EGVB - Grand Teton Webcam", "Teton View - Buffalo Valley in Moran Wyoming - SeeJH.com", "Dornan's in Grand Teton National Park - SeeJH.com"]) assert.ok(matchesExpect(tetons.expect, t), t);
  assert.ok(!matchesExpect(tetons.expect, "Thistle Dew Cabin Teton Valley, Idaho - SeeJH.ai"));
});
