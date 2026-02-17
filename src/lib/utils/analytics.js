let loaded = false;

export function loadAnalytics() {
	if (loaded) return;
	if (typeof window === 'undefined') return;
	loaded = true;

	// Google Analytics (GA4)
	const gaScript = document.createElement('script');
	gaScript.async = true;
	gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-S2VLXV89DL';
	document.body.appendChild(gaScript);

	window.dataLayer = window.dataLayer || [];
	function gtag() {
		window.dataLayer.push(arguments);
	}
	gtag('js', new Date());
	gtag('config', 'G-S2VLXV89DL');

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
