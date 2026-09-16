import { env } from '$env/dynamic/public';
let loaded = false;
const productionHosts = new Set(['www.dodon.ai', 'dodon.ai']);
export function hasOptionalConsent() {
	if (typeof window === 'undefined') return false;
	try {
		return localStorage.getItem('cookie-consent') === 'accepted';
	} catch {
		return false;
	}
}
export function canTrack() {
	return (
		typeof window !== 'undefined' &&
		env.PUBLIC_NOINDEX !== 'true' &&
		productionHosts.has(window.location.hostname) &&
		hasOptionalConsent()
	);
}
export function trackPageView(path) {
	if (!canTrack() || !loaded) return;
	window.gtag?.('event', 'page_view', { page_path: path, page_location: window.location.href });
	window.fbq?.('track', 'PageView');
}
export function trackConsentAccepted() {
	if (canTrack()) window.gtag?.('event', 'consent_accepted', { event_category: 'consent' });
}
export function revokeAnalytics() {
	window.gtag?.('consent', 'update', {
		analytics_storage: 'denied',
		ad_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
	window.fbq?.('consent', 'revoke');
	try {
		for (const key of [
			'gclid',
			'utm_source',
			'utm_medium',
			'utm_campaign',
			'utm_term',
			'utm_content'
		])
			sessionStorage.removeItem('_ad_' + key);
	} catch {
		/* Storage may be blocked by the browser. */
	}
	// Remove first-party optional cookies we control, including domain-scoped variants.
	const domains = ['', window.location.hostname, '.dodon.ai', 'dodon.ai'];
	for (const entry of document.cookie.split(';')) {
		const name = entry.trim().split('=')[0];
		if (
			!/^(?:_ga(?:_|$)|_gid$|_gat|_gcl_|_fbp$|_fbc$|ahrefs|__hstc$|__hssc$|__hssrc$|hubspotutk$)/i.test(
				name
			)
		)
			continue;
		for (const domain of domains)
			document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ' domain=' + domain + ';' : ''} SameSite=Lax`;
	}
	const wasLoaded = loaded;
	loaded = false;
	return wasLoaded;
}
export function loadAnalytics() {
	if (loaded || !canTrack()) return;
	loaded = true;
	window.dataLayer = window.dataLayer || [];
	window.gtag = function () {
		window.dataLayer.push(arguments);
	};
	window.gtag('consent', 'default', {
		analytics_storage: 'denied',
		ad_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
	window.gtag('consent', 'update', {
		analytics_storage: 'granted',
		ad_storage: 'granted',
		ad_user_data: 'granted',
		ad_personalization: 'granted'
	});
	window.gtag('js', new Date());
	window.gtag('config', 'G-S2VLXV89DL', {
		send_page_view: false,
		linker: { domains: ['dodon.ai', 'www.dodon.ai', 'app.dodon.ai'] }
	});
	window.gtag('config', 'AW-17511150141', {
		linker: { domains: ['dodon.ai', 'www.dodon.ai', 'app.dodon.ai'] }
	});
	const ga = document.createElement('script');
	ga.async = true;
	ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-S2VLXV89DL';
	document.head.appendChild(ga);
	if (!window.fbq) {
		const fbq = (window.fbq = function () {
			fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
		});
		fbq.queue = [];
		fbq.loaded = true;
		fbq.version = '2.0';
		window._fbq = fbq;
		const meta = document.createElement('script');
		meta.async = true;
		meta.src = 'https://connect.facebook.net/en_US/fbevents.js';
		document.head.appendChild(meta);
	}
	window.fbq('consent', 'grant');
	window.fbq('init', '977492323910119');
	const ahrefs = document.createElement('script');
	ahrefs.async = true;
	ahrefs.src = 'https://analytics.ahrefs.com/analytics.js';
	ahrefs.dataset.key = 'iBa8GWwcAjnGrGexuszH7w';
	document.head.appendChild(ahrefs);
	trackPageView(window.location.pathname);
}
