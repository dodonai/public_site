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

	// First paint: decorate links before any internal nav happens, so a user who
	// lands with paid UTMs and clicks the promo banner/header CTA on the same page
	// still gets attribution forwarded.
	// --- Calendly: open booking in an on-site popup instead of navigating away.
	// A plain link-out to calendly.com cannot fire a conversion (the booking
	// completes off-domain, so no event reaches our page). The popup keeps the
	// user on-site so we can fire the booked-call conversion. Applies site-wide to
	// every calendly.com CTA (managed-services, pricing, agent pages).
	function loadCalendlyAssets() {
		if (document.getElementById('calendly-widget-css')) return;
		const css = document.createElement('link');
		css.id = 'calendly-widget-css';
		css.rel = 'stylesheet';
		css.href = 'https://assets.calendly.com/assets/external/widget.css';
		document.head.appendChild(css);
		const js = document.createElement('script');
		js.src = 'https://assets.calendly.com/assets/external/widget.js';
		js.async = true;
		document.body.appendChild(js);
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

	function handleCalendlyClick(e) {
		const link = e.target.closest?.('a[href]');
		if (!link) return;
		let url;
		try {
			url = new URL(link.href);
		} catch {
			return;
		}
		if (url.hostname !== 'calendly.com') return;
		if (!window.Calendly) return; // script not ready → fall back to normal navigation
		e.preventDefault();
		window.Calendly.initPopupWidget({ url: link.href, utm: calendlyUtms() });
	}

	function handleCalendlyMessage(e) {
		if (e.origin !== 'https://calendly.com') return;
		if (e.data && e.data.event === 'calendly.event_scheduled' && window.gtag) {
			// GA4 event (reporting)
			window.gtag('event', 'enterprise_call_booked', { event_category: 'lead' });
			// Google Ads conversion — "Booked Enterprise Call" (action id 7683935723)
			window.gtag('event', 'conversion', {
				send_to: 'AW-17511150141/HRCVCOub_s8cEL3k-51B'
			});
		}
	}

	onMount(() => {
		decorateAppLinks();
		loadCalendlyAssets();
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

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-[#282876]"
>
	Skip to main content
</a>

<div class="sticky top-0 z-[100]">
	{#if !$page.url.pathname.startsWith('/ai-managed-services')}
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
