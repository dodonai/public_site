<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import QuickBooksPrivacy, { metadata } from '../../content/legal/quickbooks-privacy.md';
</script>

<SEOHead
	title="QuickBooks Online Integration Privacy Policy"
	description="How Dodonai handles data from a QuickBooks Online company connected to a Dodonai service."
	url="/quickbooks-privacy-policy/"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		dateModified: metadata.lastUpdated
	}}
/>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<h1 class="mb-6 text-4xl font-bold text-[#282876]">QuickBooks Online Integration Privacy Policy</h1>
	<article class="prose prose-lg max-w-none prose-headings:text-[#282876] prose-a:text-[#216fed]">
		<p>
			For this website, see our <a href="/privacy-policy/">Website Privacy Policy</a>. For the
			rest of our services, see our <a href="/terms-and-conditions/">Terms &amp; Conditions</a> and
			the applicable agreement.
		</p>
		<p>Last updated: <time datetime={metadata.lastUpdated}>{metadata.lastUpdated}</time></p>
		<QuickBooksPrivacy />
	</article>
</div>
