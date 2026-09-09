<script>
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CookieConsent from '$lib/components/layout/CookieConsent.svelte';
	import { trackPageView } from '$lib/utils/analytics.js';

	let { children } = $props();

	// Capture ad params (gclid + UTMs) from landing page URL into sessionStorage
	const AD_PARAMS = [
		'gclid',
		'utm_source',
		'utm_medium',
		'utm_campaign',
		'utm_term',
		'utm_content'
	];
	if (browser) {
		const urlParams = new URLSearchParams(window.location.search);
		for (const p of AD_PARAMS) {
			const v = urlParams.get(p);
			if (v) sessionStorage.setItem(`_ad_${p}`, v);
		}
	}

	function decorateAppLinks() {
		const params = {};
		for (const p of AD_PARAMS) {
			const v = sessionStorage.getItem(`_ad_${p}`);
			if (v) params[p] = v;
		}
		if (Object.keys(params).length === 0) return;

		// Overwrite hardcoded baseline UTMs (utm_source=website&utm_medium=cta) with
		// captured paid params — last-touch wins so paid attribution survives a click
		// on a generic CTA whose href ships with the baseline.
		document.querySelectorAll('a[href*="app.dodon.ai"]').forEach((link) => {
			const url = new URL(link.href);
			for (const [k, v] of Object.entries(params)) {
				url.searchParams.set(k, v);
			}
			link.href = url.toString();
		});
	}

	// Calendly: open booking in an on-site popup instead of navigating away.
	// A plain link-out to calendly.com cannot fire a conversion (the booking
	// completes off-domain, so no event reaches our page). The popup keeps the
	// user on-site so we can fire the booked-call conversion.
	let calendlyLoadPromise;
	let pendingCalendlyBooking;
	let calendlyBookingTracked = false;

	function loadCalendlyAssets() {
		if (window.Calendly) return Promise.resolve();
		if (calendlyLoadPromise) return calendlyLoadPromise;

		calendlyLoadPromise = new Promise((resolve, reject) => {
			if (!document.getElementById('calendly-widget-css')) {
				const css = document.createElement('link');
				css.id = 'calendly-widget-css';
				css.rel = 'stylesheet';
				css.href = 'https://assets.calendly.com/assets/external/widget.css';
				document.head.appendChild(css);
			}

			const timeout = window.setTimeout(() => {
				js.remove();
				calendlyLoadPromise = undefined;
				reject(new Error('Calendly took too long to load'));
			}, 10000);

			const js = document.createElement('script');
			js.id = 'calendly-widget-js';
			js.src = 'https://assets.calendly.com/assets/external/widget.js';
			js.async = true;
			js.addEventListener(
				'load',
				() => {
					window.clearTimeout(timeout);
					if (window.Calendly) {
						resolve();
					} else {
						js.remove();
						calendlyLoadPromise = undefined;
						reject(new Error('Calendly loaded without its widget API'));
					}
				},
				{ once: true }
			);
			js.addEventListener(
				'error',
				() => {
					window.clearTimeout(timeout);
					js.remove();
					calendlyLoadPromise = undefined;
					reject(new Error('Calendly failed to load'));
				},
				{ once: true }
			);
			document.body.appendChild(js);
		});

		return calendlyLoadPromise;
	}

	// Forward captured paid params to Calendly so the booking carries attribution.
	function calendlyUtms() {
		const map = {
			utm_source: 'utmSource',
			utm_medium: 'utmMedium',
			utm_campaign: 'utmCampaign',
			utm_term: 'utmTerm',
			utm_content: 'utmContent'
		};
		const utm = {};
		for (const [k, calKey] of Object.entries(map)) {
			const v = sessionStorage.getItem(`_ad_${k}`);
			if (v) utm[calKey] = v;
		}
		return utm;
	}

	async function handleCalendlyClick(e) {
		const link = e.target.closest?.('a[href]');
		if (!link) return;
		let url;
		try {
			url = new URL(link.href);
		} catch {
			return;
		}
		if (url.hostname !== 'calendly.com') return;

		e.preventDefault();
		const sourcePath = window.location.pathname;
		pendingCalendlyBooking = {
			sourcePath,
			isEnterprise: sourcePath === '/' || sourcePath.startsWith('/ai-managed-services')
		};
		calendlyBookingTracked = false;

		const utm = calendlyUtms();
		if (!utm.utmContent) utm.utmContent = `site:${sourcePath}`;

		try {
			await loadCalendlyAssets();
			window.Calendly.initPopupWidget({ url: link.href, utm });
		} catch {
			// Preserve a working booking path if Calendly's embed assets fail.
			window.location.assign(link.href);
		}
	}

	function handleCalendlyMessage(e) {
		if (e.origin !== 'https://calendly.com') return;
		if (
			e.data?.event !== 'calendly.event_scheduled' ||
			!window.gtag ||
			!pendingCalendlyBooking ||
			calendlyBookingTracked
		) {
			return;
		}

		calendlyBookingTracked = true;
		const { sourcePath, isEnterprise } = pendingCalendlyBooking;
		window.gtag('event', isEnterprise ? 'enterprise_call_booked' : 'intro_call_booked', {
			event_category: 'lead',
			booking_source: sourcePath
		});

		if (isEnterprise) {
			// Google Ads conversion — "Booked Enterprise Call" (action id 7683935723)
			window.gtag('event', 'conversion', {
				send_to: 'AW-17511150141/HRCVCOub_s8cEL3k-51B'
			});
		}
	}

	onMount(() => {
		// First paint: decorate app links before any internal navigation so paid
		// attribution survives a same-page CTA click.
		decorateAppLinks();
		document.addEventListener('click', handleCalendlyClick);
		window.addEventListener('message', handleCalendlyMessage);
		return () => {
			document.removeEventListener('click', handleCalendlyClick);
			window.removeEventListener('message', handleCalendlyMessage);
		};
	});

	afterNavigate(({ from, to }) => {
		// Skip initial page load — GA4 config in app.html handles that
		if (from && to?.url) {
			trackPageView(to.url.pathname);
		}

		// Decorate app links with ad params (gclid, UTMs) on every navigation
		if (browser) decorateAppLinks();
	});

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Dodonai',
		url: 'https://www.dodon.ai',
		publisher: {
			'@type': 'Organization',
			name: 'Dodonai, Inc.',
			url: 'https://www.dodon.ai'
		}
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
</svelte:head>

<div id="top"></div>
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-[#282876]"
>
	Skip to main content
</a>

<div data-site-header class="sticky top-0 z-[100]">
	{#if $page.url.pathname !== '/' && !$page.url.pathname.startsWith('/ai-managed-services')}
		<a
			href="https://app.dodon.ai/signup?utm_source=website&utm_medium=cta&utm_campaign=promo_banner"
			target="_blank"
			rel="noopener noreferrer"
			class="promo-banner block py-1.5 text-center text-sm font-medium text-[#282876] transition-colors hover:text-[#282876bf]"
		>
			Start your free trial - 7 days and 100 pages - today!
		</a>
	{/if}
	<Header />
</div>

<main id="main-content">
	{@render children()}
</main>
<Footer />
<CookieConsent />
