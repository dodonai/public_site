<script>
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CookieConsent from '$lib/components/layout/CookieConsent.svelte';

	let { children } = $props();
</script>

<div class="sticky top-0 z-[100]">
	<a
		href="https://app.dodon.ai/signup"
		class="promo-banner block py-1.5 text-center text-sm font-medium text-[#282876] transition-colors hover:text-[#282876bf]"
	>
		Start your free trial - 7 days and 100 pages - today!
	</a>
	<Header />
</div>

<main>
	{@render children()}
</main>
<Footer />
<CookieConsent />
