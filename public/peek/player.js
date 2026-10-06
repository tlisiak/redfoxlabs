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

  // False when a fresh check found nothing playable for this view, or the view is paused
  // and the check hasn't auto-found a replacement for it.
  const looksAlive = (stream) => {
    const st = statusFor(stream);
    if (stream.paused) return (st?.playable || []).length > 0;
    return !st || st.ok || (st.playable || []).length > 0 || !(st.dead || []).length;
  };

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

  // Loading happens in two steps so a stream can warm up while the departures board is showing:
  //   prepare(): builds the player with autoplay off and waits until it's cued. YouTube reports
  //              removed, private and embed-blocked videos here. Nothing plays, so the host may
  //              be hidden (a hidden, paused player isn't covered by anything and isn't autoplaying).
  //   start():   called once the player is visible; plays it and resolves when it's actually
  //              playing live, on target and in HD.
  function prepare(host, cand, { timeout = 9000, expect = null } = {}) {
    return new Promise(async (resolve, reject) => {
      if (!(await ready)) return reject(new Error("YouTube didn't load"));
      let player, settled = false;
      const hooks = {};
      const finish = (ok, value) => {
        if (settled) return;
        settled = true; clearTimeout(timer);
        if (!ok) { try { player?.destroy(); } catch {} host.innerHTML = ""; }
        (ok ? resolve : reject)(value);
      };
      const timer = setTimeout(() => finish(false, new Error("didn't load in time")), timeout);
      const events = {
        // give YouTube a beat to report a removed or embed-blocked video before calling it ready
        onReady: () => setTimeout(() => {
          const title = player.getVideoData?.()?.title;
          if (!matchesExpect(expect, title)) return finish(false, new Error(`shows something else: "${title}"`));
          finish(true, { player, hooks });
        }, 600),
        onStateChange: (e) => hooks.onState?.(e.data),
        onError: (e) => {
          const err = new Error(ERRORS[e.data] || `player error ${e.data}`);
          if (!settled) finish(false, err); else hooks.onError?.(err);
        },
      };
      const vars = { ...PLAYER_VARS, autoplay: 0 };
      if (cand.channelId) {
        const iframe = document.createElement("iframe");
        const qs = new URLSearchParams({ ...vars, channel: cand.channelId, enablejsapi: 1 });
        iframe.src = `https://www.youtube.com/embed/live_stream?${qs}`;
        iframe.allow = "autoplay; encrypted-media";
        host.appendChild(iframe);
        player = new YT.Player(iframe, { events });
      } else {
        const slot = document.createElement("div");
        slot.className = "yt-slot";
        host.appendChild(slot);
        player = new YT.Player(slot, { videoId: cand.videoId, playerVars: vars, events });
      }
    });
  }

  function start(prepared, { timeout = 9000, requireLive = true, expect = null, requireHD = true } = {}) {
    const { player, hooks } = prepared;
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (ok, value) => {
        if (settled) return;
        settled = true; clearTimeout(timer);
        hooks.onState = hooks.onError = null;
        if (!ok) { try { player.destroy(); } catch {} }
        (ok ? resolve : reject)(value);
      };
      const timer = setTimeout(() => finish(false, new Error("didn't start in time")), timeout);
      hooks.onError = (err) => finish(false, err);
      hooks.onState = (state) => {
        if (state !== YT.PlayerState.PLAYING) return;
        const data = player.getVideoData?.() || {};
        // isLive isn't formally documented, so only reject when it's explicitly false.
        if (requireLive && data.isLive === false) return finish(false, Object.assign(new Error("plays, but it's a recording, not live"), { data }));
        if (!matchesExpect(expect, data.title)) return finish(false, Object.assign(new Error(`shows something else: "${data.title}"`), { data }));
        if (requireHD && lowResolution(player)) return finish(false, Object.assign(new Error("below HD resolution"), { data }));
        finish(true, { player, data, quality: player.getAvailableQualityLevels?.() || [] });
      };
      player.mute();
      player.playVideo();
    });
  }

  // Both steps at once, for a host that's already visible.
  async function mount(host, cand, opts = {}) {
    return start(await prepare(host, cand, opts), opts);
  }

  window.PeekPlayer = { ready, statusReady, candidates, looksAlive, prepare, start, mount, matchesExpect, label, watchUrl, get status() { return status; } };
})();
