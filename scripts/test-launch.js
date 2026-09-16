import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { load } from 'cheerio';
import { initialize } from '../src/lib/components/marketing/homepage.js';
// Exercise the actual homepage sequence with a deterministic clock and the real markup.
function animationTest({ reduce = false, missing = false } = {}) {
	const $ = load(readFileSync('src/lib/standalone/homepage.html', 'utf8'));
	if (missing) $('[data-flow="precedent"]').remove();
	const cache = new Map();
	function wrap(el) {
		if (!el) return null;
		if (cache.has(el)) return cache.get(el);
		const q = $(el);
		const w = {
			style: {},
			offsetWidth: 1,
			classList: {
				add: (...a) => q.addClass(a.join(' ')),
				remove: (...a) => q.removeClass(a.join(' ')),
				toggle: (a, b) => q.toggleClass(a, b)
			},
			querySelector: (s) => wrap(q.find(s)[0]),
			querySelectorAll: (s) => q.find(s).toArray().map(wrap),
			get textContent() {
				return q.text();
			},
			set textContent(v) {
				q.text(v);
			}
		};
		cache.set(el, w);
		return w;
	}
	const demo = wrap($('#flowdemo')[0]);
	const root = {
		querySelector: (s) => (s === '#flowdemo' ? demo : null),
		querySelectorAll: () => []
	};
	let time = 0,
		id = 0;
	const jobs = new Map();
	const add = (fn, delay, interval = 0) => {
		const n = ++id;
		jobs.set(n, { fn, at: time + delay, interval });
		return n;
	};
	globalThis.window = {
		setTimeout: (fn, d) => add(fn, d),
		setInterval: (fn, d) => add(fn, d, d),
		clearInterval: (n) => jobs.delete(n),
		requestAnimationFrame: () => 0,
		cancelAnimationFrame: () => {},
		IntersectionObserver: class {
			disconnect() {}
		},
		addEventListener: () => {}
	};
	globalThis.matchMedia = () => ({ matches: reduce });
	const cleanup = initialize(root);
	if (reduce || missing) assert.equal(jobs.size, 0);
	else {
		while (true) {
			const next = [...jobs].sort((a, b) => a[1].at - b[1].at)[0];
			if (!next || next[1].at > 35000) break;
			const [n, j] = next;
			time = j.at;
			if (j.interval) j.at += j.interval;
			else jobs.delete(n);
			j.fn();
		}
		assert.equal($('.flow-outputs .born').length, 4);
		assert.equal($('#flowStatus').text(), 'Cycle complete: 4 items staged for review');
	}
	cleanup();
	assert.equal(jobs.size, 0, 'Navigation cleanup must cancel every timer');
}
animationTest();
animationTest({ reduce: true });
animationTest({ missing: true });
animationTest();
// Test consent gates and revocation without making third-party requests.
const source = readFileSync('src/lib/utils/analytics.js', 'utf8')
	.replace(/import .*?;\n/, '')
	.replaceAll('export ', '');
function consentTest(host, choice, noindex = 'false') {
	const scripts = [],
		cookies = [];
	const storage = new Map([['cookie-consent', choice]]);
	const context = {
		env: { PUBLIC_NOINDEX: noindex },
		localStorage: { getItem: (k) => storage.get(k) },
		sessionStorage: { removeItem: () => {} },
		window: { location: { hostname: host, href: 'https://' + host + '/', pathname: '/' } },
		document: {
			createElement: () => ({ dataset: {} }),
			head: { appendChild: (s) => scripts.push(s) },
			get cookie() {
				return '_ga=sample; essential=yes';
			},
			set cookie(v) {
				cookies.push(v);
			}
		},
		Date,
		Set
	};
	vm.createContext(context);
	vm.runInContext(source, context);
	context.loadAnalytics();
	context.loadAnalytics();
	const allowed = host === 'www.dodon.ai' && choice === 'accepted' && noindex !== 'true';
	assert.equal(scripts.length, allowed ? 3 : 0);
	if (allowed) {
		const pageViews = () =>
			context.window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'page_view')
				.length;
		assert.equal(pageViews(), 1, 'Initial page view must not duplicate');
		context.trackPageView('/accepted-navigation/');
		assert.equal(pageViews(), 2);
		storage.set('cookie-consent', 'declined');
		assert.equal(context.canTrack(), false);
		assert(context.revokeAnalytics());
		assert(cookies.some((c) => c.startsWith('_ga=')));
		assert(!cookies.some((c) => c.startsWith('essential=')));
		context.trackPageView('/next/');
		assert.equal(pageViews(), 2, 'Revocation must suppress subsequent page views');
	}
}
for (const host of ['www.dodon.ai', 'landing.dodonai.com', 'localhost'])
	for (const choice of ['accepted', 'declined', null]) consentTest(host, choice);
consentTest('www.dodon.ai', 'accepted', 'true');
console.log(
	'Passed: two animation cycles, navigation cleanup/re-entry, reduced motion, missing-element fallback; consent gating, staging suppression, revocation.'
);
