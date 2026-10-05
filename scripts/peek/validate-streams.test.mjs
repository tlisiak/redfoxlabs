import { test } from "node:test";
import assert from "node:assert/strict";
import { extractPlayerResponse, classify, loadStreams, candidates } from "./validate-streams.mjs";

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
