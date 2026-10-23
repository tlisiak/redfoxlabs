// Peek community views: submissions, approvals and reading approved views.
// Loaded by the Peek page, the submit form and the admin console, and read by the stream check
// (scripts/peek/validate-streams.mjs). Everything that comes out of the database goes through
// toStream(), which re-checks every field, because rows are written by strangers.
(() => {
  const cfg = (typeof window !== "undefined" && window.PEEK_CONFIG) || {};
  const ID_RE = /^[A-Za-z0-9_-]{11}$/;
  const CH_RE = /^UC[A-Za-z0-9_-]{22}$/;
  const enabled = () => Boolean(cfg.supabaseUrl && cfg.supabaseAnonKey);

  // ---------------------------------------------------------------- sanitising
  const str = (v, max) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "");
  const web = (v) => { try { const u = new URL(String(v)); return /^https?:$/.test(u.protocol) ? u.href : ""; } catch { return ""; } };
  const list = (v, n, max) => (Array.isArray(v) ? v.map((x) => str(x, max)).filter((x) => x.length >= 3).slice(0, n) : []);
  const zoneOk = (tz) => { try { new Intl.DateTimeFormat("en", { timeZone: tz }); return /^[A-Za-z]+(\/[A-Za-z0-9_+-]+){0,2}$/.test(tz); } catch { return false; } };

  // A database row becomes an entry shaped like the ones in streams.js. Returns null for a row
  // that isn't complete and safe, so one bad row can never break the page.
  function toStream(row) {
    if (!row || typeof row !== "object" || !ID_RE.test(row.video_id || "")) return null;
    const lat = Number(row.lat), lng = Number(row.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
    const tz = str(row.tz, 64);
    if (!zoneOk(tz)) return null;
    const credit = { name: str(row.credit_name, 120), url: web(row.credit_url) };
    const sources = (Array.isArray(row.sources) ? row.sources : [])
      .map((s) => ({ label: str(s && s.label, 100), url: web(s && s.url) })).filter((s) => s.label && s.url).slice(0, 5);
    const s = {
      id: `c-${row.video_id}`, community: true,
      name: str(row.name, 80), place: str(row.place, 120), country: str(row.country, 60), lat, lng, tz,
      source: { videoIds: [row.video_id] }, scout: [],
      credit, headline: str(row.headline, 160), looking: str(row.looking, 600),
      watchFor: list(row.watch_for, 5, 160), history: str(row.history, 1200), facts: list(row.facts, 4, 240), sources,
    };
    if (row.night === true) s.night = true;
    const words = list(row.expect_title, 6, 60);
    if (words.length) s.expect = { title: words };
    const complete = s.name && s.place && s.country && s.headline && s.looking && s.history && credit.name && credit.url && s.watchFor.length && sources.length;
    return complete ? s : null;
  }

  // "https://www.youtube.com/watch?v=ID", "https://youtu.be/ID", ".../live/ID", ".../embed/ID" or a bare ID.
  function parseYouTube(input) {
    const t = String(input || "").trim();
    const video = t.match(/(?:youtu\.be\/|[?&]v=|\/live\/|\/embed\/)([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])/) || (ID_RE.test(t) ? [t, t] : null);
    const channel = t.match(/\/channel\/(UC[A-Za-z0-9_-]{22})/);
    return { videoId: video ? video[1] : "", channelId: channel ? channel[1] : "" };
  }

  // ---------------------------------------------------------------- REST
  class ApiError extends Error { constructor(message, code, status) { super(message); this.code = code; this.status = status; } }

  async function rest(path, { method = "GET", body, token, prefer } = {}) {
    if (!enabled()) throw new ApiError("Community views aren't switched on yet.", "disabled", 0);
    const res = await fetch(`${cfg.supabaseUrl}${path}`, {
      method,
      headers: { apikey: cfg.supabaseAnonKey, authorization: `Bearer ${token || cfg.supabaseAnonKey}`, "content-type": "application/json", ...(prefer ? { prefer } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (res.ok) return res.status === 204 ? null : res.json().catch(() => null);
    const err = await res.json().catch(() => ({}));
    throw new ApiError(err.message || err.msg || err.error_description || `Request failed (${res.status})`, err.code || err.error_code || "", res.status);
  }

  const PUBLIC_COLUMNS = "id,video_id,name,place,country,lat,lng,tz,night,headline,looking,watch_for,history,facts,sources,credit_name,credit_url,expect_title";

  async function loadApproved() {
    const rows = await rest(`/rest/v1/peek_views?status=eq.approved&select=${PUBLIC_COLUMNS}&order=created_at.asc&limit=500`);
    return (rows || []).map(toStream).filter(Boolean);
  }

  const FRIENDLY = {
    video_id: "That doesn't look like a YouTube video ID.", lat: "Latitude must be between -90 and 90.", lng: "Longitude must be between -180 and 180.",
    tz: "Pick a time zone from the list.", name: "The name needs 3 to 80 characters.", place: "The place needs 3 to 120 characters.",
    headline: "The headline needs 10 to 160 characters.", looking: "\"What you're looking at\" needs 40 to 600 characters.",
    history: "The story needs 40 to 1,200 characters.", sources: "Add 1 to 5 sources, each with a label and a web link (https://…).",
    credit_url: "The credit link must start with https://", credit_name: "Say who runs the stream.", watch_for: "Add 1 to 5 things to watch for.",
    facts: "Each fact needs 3 to 240 characters (up to 4).", submitter_email: "Enter a valid email address.", country: "Enter the country.",
  };

  // Posts a submission. Only the columns a visitor may write are sent.
  async function submit(v) {
    const body = {
      video_id: v.video_id, name: v.name, place: v.place, country: v.country, lat: v.lat, lng: v.lng, tz: v.tz, night: !!v.night,
      headline: v.headline, looking: v.looking, watch_for: v.watch_for, history: v.history, facts: v.facts || [], sources: v.sources,
      credit_name: v.credit_name, credit_url: v.credit_url, submitter_name: v.submitter_name || null, submitter_email: v.submitter_email,
      relationship: v.relationship, consent: !!v.consent,
    };
    if (v.channel_id) body.channel_id = v.channel_id;
    try { await rest("/rest/v1/peek_views", { method: "POST", body, prefer: "return=minimal" }); }
    catch (e) {
      if (e.code === "23505") throw new ApiError("That stream has already been submitted. Thank you, it's in the queue.", e.code, e.status);
      const col = /peek_views_(\w+?)_check/.exec(e.message || "");
      if (e.code === "23514" && col && FRIENDLY[col[1]]) throw new ApiError(FRIENDLY[col[1]], e.code, e.status);
      throw e;
    }
  }

  // ---------------------------------------------------------------- admin
  // Email + password through Supabase Auth (no redirect URLs to configure). The session lives in
  // sessionStorage and goes when the tab closes. What an admin may do is decided by the database
  // (peek_admins), not by this page.
  const KEY = "peek-admin-session";
  const store = {
    get() { try { return JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch { return null; } },
    set(v) { try { v ? sessionStorage.setItem(KEY, JSON.stringify(v)) : sessionStorage.removeItem(KEY); } catch { /* private mode */ } },
  };
  function keep(r) {
    if (!r || !r.access_token) return null;
    const s = { access_token: r.access_token, refresh_token: r.refresh_token, expires_at: Date.now() + (r.expires_in || 3600) * 1000 - 60000, email: r.user && r.user.email };
    store.set(s); return s;
  }
  async function token() {
    let s = store.get();
    if (!s) throw new ApiError("Please sign in.", "signed-out", 401);
    if (Date.now() > s.expires_at) {
      try { s = keep(await rest("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: { refresh_token: s.refresh_token } })); }
      catch { store.set(null); throw new ApiError("Your session ended. Please sign in again.", "signed-out", 401); }
    }
    return s.access_token;
  }
  const admin = {
    session: () => store.get(),
    async signIn(email, password) { return keep(await rest("/auth/v1/token?grant_type=password", { method: "POST", body: { email, password } })); },
    async signUp(email, password) {
      const r = await rest("/auth/v1/signup", { method: "POST", body: { email, password } });
      return keep(r) || { pendingConfirmation: true };
    },
    signOut() { store.set(null); },
    async list(status) { return rest("/rest/v1/rpc/peek_admin_list", { method: "POST", token: await token(), body: { p_status: status || null } }); },
    async review(id, status, notes, patch) { return rest("/rest/v1/rpc/peek_admin_review", { method: "POST", token: await token(), body: { p_id: id, p_status: status, p_notes: notes || null, p_patch: patch || {} } }); },
    async remove(id) { return rest("/rest/v1/rpc/peek_admin_delete", { method: "POST", token: await token(), body: { p_id: id } }); },
  };

  const api = { enabled, toStream, parseYouTube, loadApproved, submit, admin, ApiError };
  if (typeof window !== "undefined") window.PeekCommunity = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
