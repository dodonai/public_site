/* Generated from widget/client.js and widget/template.html. Run npm run build:chat. */
/* Website chat source, imported from the deployed chat-relay embed. Build with npm run build:chat. */
(function () {
  if (window.__dodonaiChatLoaded) return;
  window.__dodonaiChatLoaded = true;
  var _host = document.createElement("div");
  _host.id = "dodonai-chat-widget";
  document.body.appendChild(_host);
  var _root = _host.attachShadow({ mode: "open" });
  _root.innerHTML = "<style>\n:host { --brand:#3b5bdb; --bg:#fff; --muted:#6b7280; --in:#3b5bdb; --out:#eceef1; }  /* muted darkened for AA contrast */\n  * { box-sizing:border-box; }\n  [hidden] { display:none !important; }\n:host { margin:0; font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif; background:#f5f6f8; color:#1c1f23; }\n  #launcher { position:fixed; z-index:300; right:20px; bottom:20px; width:56px; height:56px; border-radius:50%;\n    background:var(--brand); color:#fff; border:0; font-size:24px; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,.2); }\n  #panel { position:fixed; z-index:301; right:20px; bottom:88px; width:340px; max-height:72vh; background:var(--bg);\n    border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,.18); display:none; flex-direction:column; overflow:hidden; }\n  #panel.open { display:flex; }\n  header { background:var(--brand); color:#fff; padding:12px 14px; font-weight:600; display:flex; align-items:center; justify-content:space-between; gap:8px; }\n  header small { display:block; font-weight:400; opacity:.85; }\n  #close { background:transparent; border:0; color:#fff; font-size:22px; line-height:1; cursor:pointer; padding:0 4px; border-radius:6px; opacity:.9; }\n  #close:hover { opacity:1; background:rgba(255,255,255,.15); }\n  #intro { padding:10px 12px; font-size:12.5px; color:#3a3f45; border-bottom:1px solid #eceef1; background:#fbfcfd; }\n  .sys { align-self:center; font-size:11px; color:var(--muted); font-style:italic; text-align:center; margin:2px 8px; }\n  #log { flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:8px; min-height:160px; }\n  .msg { max-width:78%; padding:8px 10px; border-radius:12px; white-space:pre-wrap; word-wrap:break-word; }\n  .msg.in  { align-self:flex-end;   background:var(--in);  color:#fff; border-bottom-right-radius:3px; }\n  .msg.out { align-self:flex-start; background:var(--out); color:#1c1f23; border-bottom-left-radius:3px; }\n  .who { font-size:11px; color:var(--muted); margin:0 4px; align-self:flex-start; }\n  .status { font-size:11px; opacity:.8; margin:0 4px; align-self:flex-end; }\n  .status.failed { color:#e03131; cursor:pointer; }\n  button.status { background:none; border:0; padding:0; font-family:inherit; font-size:11px; }  /* failed status is a real <button> (a11y) */\n  /* lead strip — persistent until captured */\n  #leadstrip { border-top:1px solid #eceef1; padding:8px 10px; display:flex; gap:6px; flex-wrap:wrap; align-items:center; background:#fbfcfd; }\n  #leadstrip input[type=text], #leadstrip input#name, #leadstrip input#email { flex:1 1 40%; min-width:120px; font:inherit; padding:6px 8px; border:1px solid #d6d9de; border-radius:8px; }\n  #send-contact { background:var(--brand); color:#fff; border:0; border-radius:8px; padding:8px 10px; cursor:pointer; font:inherit; }\n  #send-contact:disabled { opacity:.6; cursor:default; }\n  #optin { display:flex; gap:6px; align-items:flex-start; padding:0 10px 8px; font-size:12px; line-height:1.35; color:#3a3f45; cursor:pointer; background:#fbfcfd; }\n  #optin input { flex:0 0 auto; margin:2px 0 0; }\n  #leadchip { border-top:1px solid #eceef1; padding:6px 10px; font-size:12px; color:#2b8a3e; background:#f4fbf6; }\n  #composer { border-top:1px solid #eceef1; padding:10px; display:flex; gap:6px; }\n  #composer textarea { flex:1; font:inherit; padding:8px; border:1px solid #d6d9de; border-radius:8px; resize:none; }\n  #composer button { background:var(--brand); color:#fff; border:0; border-radius:8px; padding:0 14px; cursor:pointer; font-weight:600; }\n  #privacyline { padding:0 12px 10px; font-size:11px; color:var(--muted); text-align:center; }\n  #privacyline a { color:var(--brand) !important; text-decoration:underline !important; }   /* keep it a link even if the host site resets <a> */\n  .dbg { position:fixed; left:12px; bottom:12px; font-size:11px; color:var(--muted); background:#fff;\n    border:1px solid #e6e8eb; border-radius:8px; padding:6px 8px; }\n  /* FE-1: full-screen the panel on narrow phones (340px + margins would overflow) */\n  @media (max-width:480px) {\n    #panel { right:0; left:0; top:var(--chat-top, 0px); bottom:auto; width:auto; height:var(--chat-height, 100dvh); max-height:none; border-radius:0; }\n    .dbg { display:none; }               /* debug readout clutters a phone screen */\n  }\n  :host { position: relative; z-index: 300; }  /* embed: top-level stacking context */\n  .dbg { display:none !important; }   /* embed: hide the debug readout */\n</style>\n<button id=\"launcher\" type=\"button\" title=\"Chat\" aria-label=\"Ask a question\" aria-expanded=\"false\">💬</button>\n\n<div id=\"panel\" role=\"dialog\" aria-labelledby=\"cr-title\">\n  <header>\n    <span id=\"cr-title\">Chat with us</span>\n    <button id=\"close\" type=\"button\" aria-label=\"Close chat\">&times;</button>\n  </header>\n  <div id=\"intro\">Questions about the App or custom AI services? Leave a message for the Dodonai team. Add your email if you’d like a reply.</div>\n  <div id=\"log\" role=\"log\" aria-live=\"polite\" aria-relevant=\"additions\" aria-label=\"Message history\"></div>\n\n  <!-- chat window = transcript (above) + input -->\n  <form id=\"composer\">\n    <textarea id=\"msg\" rows=\"1\" placeholder=\"Type a message…\" aria-label=\"Type your message\" required></textarea>\n    <button type=\"submit\">Send</button>\n  </form>\n\n  <!-- lead capture, below the chat window: name/email, then the (non-US) opt-in, then the notice -->\n  <form id=\"contact-form\">\n  <div id=\"leadstrip\">\n    <input id=\"name\"  placeholder=\"First name\" aria-label=\"First name\" autocomplete=\"given-name\">\n    <input id=\"email\" type=\"email\" placeholder=\"Email\" aria-label=\"Email address\" autocomplete=\"email\">\n    <button id=\"send-contact\" type=\"submit\" disabled>Send contact details</button>\n  </div>\n  <!-- express marketing consent (CASL) — non-US only; marketing-only label, distinct from the notice -->\n  <label id=\"optin\" hidden><input type=\"checkbox\" id=\"optin-box\"> Keep me posted with occasional Dodonai news and updates.</label>\n  </form>\n  <div id=\"leadchip\" hidden></div>\n  <div id=\"privacyline\">We'll use your email to reply and may send occasional updates — unsubscribe anytime. See our <a href=\"https://www.dodon.ai/privacy-policy/\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.</div>\n</div>\n\n<div class=\"dbg\" id=\"dbg\">poll: idle</div>\n";
  window.__cwRoot = _root;   /* widget logic scopes DOM lookups here (see ROOT in index.html) */
  /* --- widget logic (verbatim from index.html; API default → same-origin; ROOT → shadow) --- */
// Local test harness ONLY (localhost): ?api= endpoint · ?sim_region= fake X-Client-Region · ?ns= storage namespace.
const _local = ["localhost", "127.0.0.1"].includes(location.hostname);
const _p = new URLSearchParams(location.search);
const API = (_local && _p.get("api")) || "";  // deployed bridge
const SIM_REGION = _local ? _p.get("sim_region") : null;   // dev-only: hint region to run.app (the LB overwrites at prod)
const NS = (_local && _p.get("ns")) ? "_" + _p.get("ns") : "";
const K_TOKEN = "chat_token" + NS, K_NAME = "chat_lead_name" + NS, K_EMAIL = "chat_lead_email" + NS;
const OVERLAP_MS = 3000, ACTIVE_MS = 2500, MAX_MS = 10000;   // MAX_MS = idle-backoff cap (visible, idle mid-convo)
function simHeaders() { return SIM_REGION ? { "X-Client-Region": SIM_REGION } : {}; }
// Storage can be denied by browser privacy settings. Keep this tab usable in memory.
const memoryStorage = new Map();
const storage = {
  getItem(key) {
    if (memoryStorage.has(key)) return memoryStorage.get(key);
    try { return localStorage.getItem(key); } catch { return null; }
  },
  setItem(key, value) {
    memoryStorage.set(key, value);
    try { localStorage.setItem(key, value); } catch {}
  },
  removeItem(key) {
    memoryStorage.set(key, null);
    try { localStorage.removeItem(key); } catch {}
  },
};
let token = storage.getItem(K_TOKEN);
let sourceSent = false;
let showOptin = true, contactSending = false;
let lastSeen = 0;
const seen = new Set();
let interval = ACTIVE_MS, timer = null;
const HIDDEN_MS = 10000, ACTIVE_WINDOW_MS = 120000;  // backgrounded poll rate; how long a convo stays "active" (fast)
let lastActivity = Date.now();
let emailAckShown = false, ackShown = false, awaitingReply = false;
let unread = 0, flashTimer = null, audioCtx = null;
let titleBeforeAlert = null, lastAlertTitle = null;
const ACK_TEXT = "Thanks — your message is with the Dodonai team. Keep this tab open for our reply.";
const EMAIL_ACK_TEXT = "If we miss you here, we'll follow up by email.";
const CONSENT_VERSION = "chat-optin-v1";               // stamped with an express marketing opt-in

// DOM lookups scope to ROOT: the shadow root in the embed (set by build-embed.py before this
// runs), or `document` in the standalone harness. Keeps this file working both ways.
const ROOT = window.__cwRoot || document;
const $ = id => (ROOT.getElementById ? ROOT.getElementById(id) : ROOT.querySelector("#" + id));
const log = $("log"), dbg = $("dbg");

function bubble(text, dir, who) {
  if (who) { const w = document.createElement("div"); w.className = "who"; w.textContent = who; log.appendChild(w); }
  const b = document.createElement("div"); b.className = "msg " + dir; b.textContent = text;
  log.appendChild(b); log.scrollTop = log.scrollHeight; return b;
}
function statusLine(text, failed) {
  const s = document.createElement("div"); s.className = "status" + (failed ? " failed" : "");
  s.textContent = text; log.appendChild(s); log.scrollTop = log.scrollHeight; return s;
}
function sysline(text) {
  const s = document.createElement("div"); s.className = "sys"; s.textContent = text;
  log.appendChild(s); log.scrollTop = log.scrollHeight;
}
function genId() { return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + "-" + Math.random().toString(16).slice(2)); }
function failStatus(retryFn) {                          // REV-C3: real <button> — focusable + keyboard + announced on append
  const b = document.createElement("button"); b.type = "button"; b.className = "status failed";
  b.textContent = "· not delivered — retry"; b.onclick = retryFn;
  log.appendChild(b); log.scrollTop = log.scrollHeight; return b;
}
function resetSession() {                                // REV-A3: session gone (TTL/purge) → drop it, re-mint on next send
  token = null; lastSeen = 0; seen.clear(); sourceSent = false;
  storage.removeItem(K_TOKEN);
  storage.removeItem(K_NAME); storage.removeItem(K_EMAIL);
  ["name", "email", "leadstrip", "privacyline"].forEach(id => { $(id).hidden = false; });
  $("leadchip").hidden = true;
  $("optin").hidden = !showOptin;
  emailAckShown = false; ackShown = false; awaitingReply = false;
  updateContactButton();
}

// ---- visitor-side reply alert: only when the tab is NOT active (no noise while focused) ----
function isActive() { return !document.hidden && document.hasFocus(); }
function unlockAudio() {
  try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.resume) audioCtx.resume(); } catch (e) {}
}
function playPing() {
  try {
    unlockAudio();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = "sine"; o.frequency.value = 660; o.connect(g); g.connect(audioCtx.destination);
    const t = audioCtx.currentTime;
    g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    o.start(t); o.stop(t + 0.26);
  } catch (e) {}
}
function notifyAway() {                                 // reply arrived while tab not active
  unread++; playPing();
  if (!flashTimer) { let on = false; flashTimer = setInterval(() => {
    // A route may change the title while an alert is flashing.
    if (lastAlertTitle === null || document.title !== lastAlertTitle) titleBeforeAlert = document.title;
    on = !on;
    lastAlertTitle = on ? ("💬 New reply" + (unread > 1 ? " (" + unread + ")" : "")) : titleBeforeAlert;
    document.title = lastAlertTitle;
  }, 1000); }
}
function clearAway() {                                   // back in view: stop flashing, reset title
  if (flashTimer) { clearInterval(flashTimer); flashTimer = null; }
  if (lastAlertTitle !== null && document.title === lastAlertTitle) document.title = titleBeforeAlert;
  titleBeforeAlert = null; lastAlertTitle = null; unread = 0;
}

function sourceContext() {
  if (sourceSent) return {};
  const q = new URLSearchParams(location.search);
  const utm = {}; ["utm_source","utm_medium","utm_campaign"].forEach(k => { if (q.get(k)) utm[k] = q.get(k); });
  return { source_url: location.pathname, referrer: document.referrer || null, utm: Object.keys(utm).length ? utm : null };
}
function currentLead() {
  const out = {};
  const n = $("name").value.trim(), e = $("email").value.trim();
  if (n) out.name = n; if (e) out.email = e;
  const box = $("optin-box");                          // express consent rides the message when ticked
  if (box && box.checked) { out.marketing_opt_in = true; out.consent_version = CONSENT_VERSION; }
  return out;
}
function maybeHideStrip() {
  const n = $("name"), e = $("email");
  if (n.hidden && e.hidden) $("leadstrip").hidden = true;
}
function applyLeadState(lead) {
  // Collapse fields PER FIELD: a captured field disappears; a still-empty one stays.
  if (!lead) return;
  const nameEl = $("name"), emailEl = $("email");
  if (lead.name)  { nameEl.hidden = true;  storage.setItem(K_NAME, "1"); }
  // Only a SELF-ENTERED (field) email is treated as confirmed. A body-extracted ('message') email
  // may be a third party's → keep the field visible so they can correct it, and don't ack it (REV-A7/C4).
  const emailConfirmed = lead.email && lead.email_source === "field";
  if (emailConfirmed) {
    emailEl.hidden = true; storage.setItem(K_EMAIL, "1");
    const pl = $("privacyline"); if (pl) pl.hidden = true;
    const oi = $("optin"); if (oi) oi.hidden = true;   // consent moment passed with the email
  }
  const chipBits = [lead.name, emailConfirmed ? lead.email : null].filter(Boolean);
  if (chipBits.length) { const chip = $("leadchip"); chip.textContent = "✓ " + chipBits.join(" · "); chip.hidden = false; }
  if (emailConfirmed && !emailAckShown) { emailAckShown = true; sysline(EMAIL_ACK_TEXT); }   // "we'll follow up by email" (once)
  maybeHideStrip();
  updateContactButton();
}

async function sendMessage(text, cid, recovered = false) {
  cid = cid || genId();                            // REV-A1: stable across retries → server dedupes
  lastActivity = Date.now();
  const body = { session_token: token, client_msg_id: cid, message: text, ...currentLead(), ...sourceContext() };
  const el = bubble(text, "in");
  const st = statusLine("· sending");
  try {
    const r = await fetch(API + "/site-chat/api/message", {
      method: "POST", headers: { "Content-Type": "application/json", ...simHeaders() }, body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error(r.status);
    const j = await r.json();
    if (!token) { token = j.session_token; storage.setItem(K_TOKEN, token); }
    if (j.message_id) seen.add(j.message_id);      // dedupe our own message vs the poll echo
    sourceSent = true;
    if (j.relayed === false) {                     // BE-1: reached us but NOT delivered to the team
      st.remove();
      const fb = failStatus(() => { fb.remove(); el.remove(); sendMessage(text, cid); });
    } else {
      st.textContent = "· sent";
      awaitingReply = true;                        // REV-A4: a reply is now expected → keep polling hot
      if (!ackShown) { ackShown = true; const it = $("intro"); if (it) it.hidden = true; sysline(ACK_TEXT); }  // initial greeting → after-send ack (once)
    }
    if (j.lead) applyLeadState(j.lead);            // Option C: collapse captured fields (+ email follow-up line)
  } catch (e) {
    if (String(e.message) === "404" && token && !recovered) {
      st.remove(); el.remove(); resetSession(); return sendMessage(text, cid, true);
    }
    st.remove();
    const fb = failStatus(() => { fb.remove(); el.remove(); sendMessage(text, cid); });
  }
}

async function ack(ids) {
  if (!ids.length) return;
  try { await fetch(API + "/site-chat/api/ack", { method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ session_token: token, message_ids: ids }) }); } catch (e) {}
}

async function pollOnce() {
  if (!token) return false;
  const since = Math.max(0, lastSeen - OVERLAP_MS);
  let got = false;
  try {
    const r = await fetch(API + "/site-chat/api/poll?since=" + since, { headers: { "X-Session-Token": token } });  // REV-A9: token in header, not URL
    if (!r.ok) throw new Error(r.status);
    const { messages } = await r.json();
    const ackIds = [];
    for (const m of messages) {
      if (m.created_at_ms > lastSeen) lastSeen = m.created_at_ms;
      if (seen.has(m.id)) continue;
      seen.add(m.id);
      if (m.direction === "out") { bubble(m.body, "out", m.slack_display_name || "Support"); ackIds.push(m.id); got = true; }
      else { bubble(m.body, "in"); }               // renders inbound on reload; live sends already in `seen`
    }
    if (got) { awaitingReply = false; lastActivity = Date.now(); if (!isActive()) notifyAway(); }   // reply landed; alert if tab inactive
    await ack(ackIds);
  } catch (e) {
    if (String(e.message) === "404") { resetSession(); dbg.textContent = "poll: session reset"; return false; }  // REV-A3
    dbg.textContent = "poll: error " + e.message;
  }
  return got;
}

function schedule() { clearTimeout(timer); timer = setTimeout(loop, interval);
  dbg.textContent = "poll: every " + (interval/1000) + "s" + (document.hidden ? " (bg)" : ""); }
async function loop() {
  if (!token) return;
  const got = await pollOnce();
  if (got) interval = ACTIVE_MS;                                   // just got a reply -> stay hot
  else if (document.hidden) interval = HIDDEN_MS;                  // backgrounded: slow poll so we can still alert
  else if (awaitingReply) interval = ACTIVE_MS;                    // REV-A4: a sent msg is unanswered -> stay fast until it lands
  else if (Date.now() - lastActivity < ACTIVE_WINDOW_MS) interval = ACTIVE_MS;  // BE-3: fast during an active convo
  else interval = Math.min(interval * 2, MAX_MS);                 // truly idle -> back off toward MAX
  schedule();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) { clearTimeout(timer); interval = HIDDEN_MS; if (token) schedule(); }   // slow background polling
  else { clearAway(); interval = ACTIVE_MS; if (token) loop(); }                                // back in view: clear alert + poll now
});
window.addEventListener("focus", clearAway);           // window refocused (still visible) -> clear the alert

function resizeChat() {
 const viewport = window.visualViewport;
 _host.style.setProperty('--chat-height', (viewport?.height || window.innerHeight) + 'px');
 _host.style.setProperty('--chat-top', (viewport?.offsetTop || 0) + 'px');
}
window.visualViewport?.addEventListener('resize', resizeChat);
window.visualViewport?.addEventListener('scroll', resizeChat);
resizeChat();
function setOpen(open) {
  $("panel").classList.toggle("open", open);
  $("launcher").setAttribute("aria-expanded", open ? "true" : "false");
  if (open) $("msg").focus(); else $("launcher").focus();
}
$("launcher").onclick = () => setOpen(!$("panel").classList.contains("open"));
$("close").onclick = () => setOpen(false);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && $("panel").classList.contains("open")) setOpen(false); });
function validContactEmail() {
  const email = $("email");
  const value = email.value.trim();
  email.setCustomValidity(value && !/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(value)
    ? "Enter a valid email address." : "");
  return email.reportValidity();
}
function updateContactButton() {
  $("send-contact").disabled = contactSending || !["name", "email"].some(id => !$(id).hidden && $(id).value.trim());
}
["name", "email"].forEach(id => $(id).addEventListener("input", () => {
  $("email").setCustomValidity("");
  updateContactButton();
}));
$("contact-form").onsubmit = async (e) => {
  e.preventDefault();
  if ($("send-contact").disabled || !validContactEmail()) return;
  const button = $("send-contact");
  contactSending = true;
  unlockAudio();
  button.disabled = true;
  button.textContent = "Sending…";
  try {
    await sendMessage("Please use these contact details to reply to me.");
    interval = ACTIVE_MS; loop();
  } finally {
    contactSending = false;
    button.textContent = "Send contact details";
    updateContactButton();
  }
};
$("composer").onsubmit = async (e) => {
  e.preventDefault();
  const text = $("msg").value.trim(); if (!text || !validContactEmail()) return;
  unlockAudio();                                       // user gesture -> unlock the reply ping for later
  $("msg").value = "";
  await sendMessage(text);
  interval = ACTIVE_MS; loop();
};

// returning visitor: restore per-field captured state (booleans only — no PII in localStorage)
if (storage.getItem(K_NAME)  === "1") $("name").hidden = true;
if (storage.getItem(K_EMAIL) === "1") { $("email").hidden = true; $("privacyline").hidden = true; }
if ($("name").hidden || $("email").hidden) { $("leadchip").textContent = "✓ details saved"; $("leadchip").hidden = false; }
maybeHideStrip();
updateContactButton();
$("optin").hidden = $("email").hidden;
// non-US visitors get the optional CASL express-consent checkbox; fail-open shows it on unknown region
fetch(API + "/site-chat/api/hello", { headers: simHeaders() }).then(r => r.json()).then(j => {
  showOptin = j?.show_optin !== false;
  $("optin").hidden = !showOptin || $("email").hidden;
}).catch(() => {});
if (token) { $("intro").hidden = true; loop(); }     // returning visitor: skip the initial greeting, resume history + polling
})();
