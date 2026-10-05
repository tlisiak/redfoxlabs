// Shared YouTube plumbing for the Peek page and the stream checker.
(() => {
  const ready = new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => resolve(true);
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onerror = () => resolve(false);
    document.head.appendChild(tag);
  });

  const PLAYER_VARS = { autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, playsinline: 1, rel: 0, cc_load_policy: 0 };
  if (location.protocol.startsWith("http")) PLAYER_VARS.origin = location.origin;

  const ERRORS = {
    2: "bad video ID",
    5: "can't play in this browser",
    100: "video removed or private",
    101: "owner disabled embedding",
    150: "owner disabled embedding",
    153: "missing referrer (open over http, not file://)",
  };

  // status.json is written every few hours by the stream-check GitHub Action.
  // Older than 36h, it's ignored and every source is tried in catalog order.
  let status = null;
  const statusReady = fetch("status.json", { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => { if (j && Date.now() - Date.parse(j.checkedAt) < 36 * 3600e3) status = j; })
    .catch(() => {});
  const statusFor = (stream) => status?.streams?.[stream.id] || null;

  // Every source worth trying for a stream, in order. With fresh status: sources the
  // checker saw live go first (channel embeds as the video they're broadcasting), and
  // ones it saw dead are dropped. Then the catalog's videos, then the channel's current
  // broadcast, which survives the stream being restarted under a new ID.
  function candidates(stream, { raw = false } = {}) {
    const src = stream.source;
    const ids = src.videoIds || (src.videoId ? [src.videoId] : []);
    const all = [...ids.map((videoId) => ({ videoId })), ...(src.channelId ? [{ channelId: src.channelId }] : [])];
    const st = statusFor(stream);
    if (!st || raw) return all;
    const dead = new Set(st.dead || []);
    const known = (st.playable || []).map((videoId) => ({ videoId }));
    const rest = all.filter((c) => !(c.videoId && (dead.has(c.videoId) || st.playable?.includes(c.videoId))));
    const list = [...known, ...rest];
    return list.length ? list : all;
  }

  // False only when a fresh check found nothing playable at all for this view.
  const looksAlive = (stream) => { const st = statusFor(stream); return !st || st.ok || (st.playable || []).length > 0 || !(st.dead || []).length; };

  // Accuracy: does what's playing match what the view promises? Titles vary in accents,
  // ʻokina and case ("Kīlauea", "Halemaʻumaʻu"), so compare folded text. No title, no verdict.
  const fold = (t) => String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ʻʼ'’`]/g, "").toLowerCase();
  function matchesExpect(expect, title) {
    if (!expect?.title?.length || !title) return true;
    const t = fold(title);
    return expect.title.some((w) => t.includes(fold(w)));
  }
  // Quality: YouTube still reports the renditions a stream offers. Only reject when it
  // reports some and none is HD; an empty list (common for live) says nothing.
  const HD = ["hd720", "hd1080", "hd1440", "hd2160", "highres"];
  function lowResolution(player) {
    try { const q = player.getAvailableQualityLevels?.() || []; return q.length > 0 && !q.some((l) => HD.includes(l)); }
    catch { return false; }
  }

  const label = (c) => (c.videoId ? `video ${c.videoId}` : `channel ${c.channelId}`);
  const watchUrl = (c) => (c.videoId ? `https://www.youtube.com/watch?v=${c.videoId}` : `https://www.youtube.com/channel/${c.channelId}/live`);

  // Mounts one source into `host` and resolves once video is actually playing.
  // Rejects with a readable reason on player errors, timeouts, or a non-live recording.
  function mount(host, cand, { timeout = 9000, requireLive = true, expect = null, requireHD = true } = {}) {
    return new Promise(async (resolve, reject) => {
      if (!(await ready)) return reject(new Error("YouTube didn't load"));
      let player, settled = false;
      const finish = (ok, value) => {
        if (settled) return;
        settled = true; clearTimeout(timer);
        if (!ok) { try { player?.destroy(); } catch {} host.innerHTML = ""; }
        (ok ? resolve : reject)(value);
      };
      const timer = setTimeout(() => finish(false, new Error("didn't start in time")), timeout);
      const events = {
        onReady: (e) => { e.target.mute(); e.target.playVideo(); },
        onStateChange: (e) => {
          if (e.data !== YT.PlayerState.PLAYING) return;
          const data = player.getVideoData?.() || {};
          // isLive isn't formally documented, so only reject when it's explicitly false.
          if (requireLive && data.isLive === false) return finish(false, Object.assign(new Error("plays, but it's a recording, not live"), { data }));
          if (!matchesExpect(expect, data.title)) return finish(false, Object.assign(new Error(`shows something else: "${data.title}"`), { data }));
          if (requireHD && lowResolution(player)) return finish(false, Object.assign(new Error("below HD resolution"), { data }));
          finish(true, { player, data, quality: player.getAvailableQualityLevels?.() || [] });
        },
        onError: (e) => finish(false, new Error(ERRORS[e.data] || `player error ${e.data}`)),
      };
      if (cand.channelId) {
        const iframe = document.createElement("iframe");
        const qs = new URLSearchParams({ ...PLAYER_VARS, channel: cand.channelId, enablejsapi: 1 });
        iframe.src = `https://www.youtube.com/embed/live_stream?${qs}`;
        iframe.allow = "autoplay; encrypted-media";
        host.appendChild(iframe);
        player = new YT.Player(iframe, { events });
      } else {
        const slot = document.createElement("div");
        slot.className = "yt-slot";
        host.appendChild(slot);
        player = new YT.Player(slot, { videoId: cand.videoId, playerVars: PLAYER_VARS, events });
      }
    });
  }

  window.PeekPlayer = { ready, statusReady, candidates, looksAlive, mount, matchesExpect, label, watchUrl, get status() { return status; } };
})();
