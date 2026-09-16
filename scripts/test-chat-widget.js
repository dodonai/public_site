import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import { load } from 'cheerio';

const template = readFileSync(new URL('../widget/template.html', import.meta.url), 'utf8');
const source = readFileSync(new URL('../widget/client.js', import.meta.url), 'utf8');

// Execute the shipped client with isolated DOM, storage, clock and HTTP boundaries.
// No requests leave this process; Slack and Firestore are never contacted.
function widget({ storageFailure = null, initial = {}, send, poll, hidden = false } = {}) {
  const $ = load(template), nodes = new Map(), requests = [], intervals = new Map();
  const windowEvents = {}, documentEvents = {}, stored = new Map(Object.entries(initial));
  let sequence = 0;
  function element() {
    const classes = new Set(), events = {};
    return {
      value: '', hidden: false, disabled: false, textContent: '', children: [], events,
      style: { setProperty() {} },
      classList: { contains: c => classes.has(c), toggle(c, enabled) { enabled ? classes.add(c) : classes.delete(c); } },
      appendChild(child) { this.children.push(child); child.parent = this; },
      remove() { this.parent.children = this.parent.children.filter(n => n !== this); },
      focus() { this.focused = true; }, setAttribute() {},
      addEventListener(type, fn) { events[type] = fn; },
      setCustomValidity(message) { this.validationMessage = message; },
      reportValidity() { return !this.validationMessage; }
    };
  }
  $('[id]').each((_, node) => {
    const e = element(); e.hidden = $(node).attr('hidden') !== undefined;
    e.disabled = $(node).attr('disabled') !== undefined;
    nodes.set($(node).attr('id'), e);
  });
  const root = { getElementById: id => nodes.get(id) };
  const document = {
    title: 'Home', hidden, referrer: '', body: element(),
    hasFocus: () => !document.hidden,
    createElement() { const e = element(); e.attachShadow = () => root; return e; },
    addEventListener(type, fn) { documentEvents[type] = fn; }
  };
  const ctx = {
    document, __WIDGET_HTML__: template, URLSearchParams, Date, Math, Set, Map,
    location: { hostname: 'localhost', search: '', pathname: '/' },
    window: { innerHeight: 800, addEventListener(type, fn) { windowEvents[type] = fn; } },
    localStorage: {
      getItem(key) { if (storageFailure === 'read') throw Error('denied'); return stored.get(key) ?? null; },
      setItem(key, value) { if (storageFailure) throw Error('denied'); stored.set(key, value); },
      removeItem(key) { if (storageFailure) throw Error('denied'); stored.delete(key); }
    },
    setTimeout() { return ++sequence; }, clearTimeout() {},
    setInterval(fn) { const id = ++sequence; intervals.set(id, fn); return id; },
    clearInterval(id) { intervals.delete(id); },
    async fetch(url, options) {
      const req = { url, ...options, body: options?.body ? JSON.parse(options.body) : null };
      requests.push(req);
      if (url.endsWith('/message')) {
        if (send) return send(req);
        return response({ session_token: 'session', message_id: `m${requests.length}`, relayed: true,
          lead: { name: req.body.name, email: req.body.email, email_source: 'field' } });
      }
      if (url.includes('/poll')) return response({ messages: poll ? poll() : [] });
      return response({ show_optin: false });
    }
  };
  vm.createContext(ctx); vm.runInContext(source, ctx);
  return {
    document, requests, nodes, intervals, windowEvents,
    input(id, value) { const e = nodes.get(id); e.value = value; e.events.input?.(); },
    submit(id) { return nodes.get(id).onsubmit({ preventDefault() {} }); },
    posts: () => requests.filter(r => r.url.endsWith('/message'))
  };
}
const response = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });

test('email can be sent after the initial chat without another typed message', async () => {
  const w = widget();
  w.input('msg', 'A question'); await w.submit('composer');
  w.input('email', 'visitor@example.com'); await w.submit('contact-form');
  assert.equal(w.posts().length, 2);
  assert.equal(w.posts()[1].body.email, 'visitor@example.com');
  assert.equal(w.posts()[1].body.session_token, 'session');
  assert.equal(w.nodes.get('email').hidden, true);
  assert.match(w.nodes.get('leadchip').textContent, /visitor@example.com/);
});

test('contact form can start a conversation and rejects malformed email', async () => {
  const w = widget();
  w.input('email', 'bad-email'); await w.submit('contact-form');
  assert.equal(w.posts().length, 0);
  w.input('email', 'visitor@example.com'); await w.submit('contact-form');
  assert.equal(w.posts().length, 1);
  assert.equal(w.posts()[0].body.session_token, null);
});

for (const storageFailure of ['read', 'write']) {
  test(`storage ${storageFailure} denial keeps launcher and conversation usable`, async () => {
    const w = widget({ storageFailure });
    w.nodes.get('launcher').onclick();
    assert.equal(w.nodes.get('panel').classList.contains('open'), true);
    w.input('email', 'visitor@example.com'); await w.submit('contact-form');
    w.input('msg', 'Another question'); await w.submit('composer');
    assert.equal(w.posts()[1].body.session_token, 'session');
    assert.ok(w.nodes.get('log').children.some(n => n.textContent === '· sent'));
  });
}

test('focus preserves navigated titles without a reply alert', () => {
  const w = widget();
  w.document.title = 'Pricing'; w.windowEvents.focus();
  assert.equal(w.document.title, 'Pricing');
});

test('persistent 404 stops after one expired-session recovery and offers retry', async () => {
  const w = widget({ initial: { chat_token: 'expired', chat_lead_email: '1' }, send: () => response({}, 404) });
  w.input('msg', 'Question'); await w.submit('composer');
  assert.equal(w.posts().length, 2);
  assert.equal(w.posts()[1].body.session_token, null);
  assert.equal(w.nodes.get('email').hidden, false);
  assert.ok(w.nodes.get('log').children.some(n => /not delivered/.test(n.textContent)));
});

test('relay failure offers a retry with the same message id', async () => {
  let attempts = 0;
  const w = widget({ send: () => response({ session_token: 'session', message_id: 'm1', relayed: ++attempts > 1 }) });
  w.input('msg', 'Question'); await w.submit('composer');
  const retry = w.nodes.get('log').children.find(n => /not delivered/.test(n.textContent));
  assert.ok(retry); retry.onclick();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(w.posts()[0].body.client_msg_id, w.posts()[1].body.client_msg_id);
  assert.ok(w.nodes.get('log').children.some(n => n.textContent === '· sent'));
});

test('reply notifications restore the current route title and preserve navigation during alerts', async () => {
  const w = widget({ initial: { chat_token: 'session' }, hidden: true,
    poll: () => [{ id: 'reply', direction: 'out', body: 'Hello', created_at_ms: 10 }] });
  w.document.title = 'Pricing';
  await new Promise(resolve => setImmediate(resolve));
  assert.ok(w.nodes.get('log').children.some(n => n.textContent === 'Hello'));
  const flash = [...w.intervals.values()][0];
  assert.ok(flash); flash();
  assert.match(w.document.title, /New reply/);
  w.windowEvents.focus();
  assert.equal(w.document.title, 'Pricing');
  assert.equal(w.intervals.size, 0);

  const other = widget({ initial: { chat_token: 'session' }, hidden: true,
    poll: () => [{ id: 'reply', direction: 'out', body: 'Hello', created_at_ms: 10 }] });
  await new Promise(resolve => setImmediate(resolve));
  [...other.intervals.values()][0]();
  other.document.title = 'Services';
  other.windowEvents.focus();
  assert.equal(other.document.title, 'Services');
});
