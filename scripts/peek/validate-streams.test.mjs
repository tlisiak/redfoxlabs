import { test } from "node:test";
import assert from "node:assert/strict";
import { extractPlayerResponse, classify, loadStreams, candidates, findLiveVideos, classifyApiItem } from "./validate-streams.mjs";

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
  for (const s of streams) assert.ok(candidates(s).length > 0, `${s.id} has no sources`);
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
