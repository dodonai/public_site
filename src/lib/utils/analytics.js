let loaded = false;

/**
 * Grant analytics consent — upgrades GA4 from cookieless to full tracking.
 */
function grantConsent() {
	if (typeof window === 'undefined' || !window.gtag) return;
	window.gtag('consent', 'update', {
		analytics_storage: 'granted',
		ad_storage: 'granted',
		ad_user_data: 'granted',
		ad_personalization: 'granted'
	});
}

/**
 * Track SPA page views on client-side navigation.
 * GA4 is always available (loaded in app.html). Meta Pixel only after consent.
 */
export function trackPageView(path) {
	if (typeof window === 'undefined') return;
	if (window.gtag) {
		window.gtag('event', 'page_view', {
			page_path: path,
			page_location: window.location.href
		});
	}
	if (window.fbq) {
		window.fbq('track', 'PageView');
	}
}

/**
 * Load consent-gated third-party scripts.
 * GA4 is already loaded in app.html — this grants consent and loads other services.
 */
export function loadAnalytics() {
	if (loaded) return;
	if (typeof window === 'undefined') return;
	loaded = true;

	// Upgrade GA4 to full tracking
	grantConsent();

	// Meta Pixel
	(function (f, b, e, v, n, t, s) {
		if (f.fbq) return;
		n = f.fbq = function () {
			n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
		};
		if (!f._fbq) f._fbq = n;
		n.push = n;
		n.loaded = !0;
		n.version = '2.0';
		n.queue = [];
		t = b.createElement(e);
		t.async = !0;
		t.src = v;
		s = b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t, s);
	})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
	window.fbq('init', '977492323910119');
	window.fbq('track', 'PageView');

	// Ahrefs Analytics
	const ahrefsScript = document.createElement('script');
	ahrefsScript.async = true;
	ahrefsScript.src = 'https://analytics.ahrefs.com/analytics.js';
	ahrefsScript.dataset.key = 'iBa8GWwcAjnGrGexuszH7w';
	document.body.appendChild(ahrefsScript);

	// HubSpot
	const hsScript = document.createElement('script');
	hsScript.type = 'text/javascript';
	hsScript.id = 'hs-script-loader';
	hsScript.async = true;
	hsScript.defer = true;
	hsScript.src = '//js-na1.hs-scripts.com/39849981.js';
	document.body.appendChild(hsScript);
}
