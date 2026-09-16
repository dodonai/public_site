<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import Terms, { metadata } from '../../content/legal/terms.md';
</script>

<SEOHead
	title="Terms & Data Processing"
	description="Terms for the Dodonai App and services, including document processing, service providers, and customer data."
	url="/terms-and-conditions/"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		dateModified: metadata.lastUpdated
	}}
/>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<h1 class="mb-6 text-4xl font-bold text-[#282876]">Terms & Data Processing</h1>
	<article class="prose prose-lg max-w-none prose-headings:text-[#282876] prose-a:text-[#216fed]">
		<p>
			These terms cover the App and services. Website inquiries and analytics are described in our <a
				href="/privacy-policy/">Website Privacy Policy</a
			>. Your service agreement and any applicable BAA specify additional data-processing terms.
		</p>
		<p>Last updated: <time datetime={metadata.lastUpdated}>{metadata.lastUpdated}</time></p>
		<Terms />
	</article>
</div>
