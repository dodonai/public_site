<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import Privacy, { metadata } from '../../content/legal/privacy.md';
</script>

<SEOHead
	title="Website Privacy Policy"
	description="How Dodonai handles information collected through this website, including inquiries, chat, and analytics."
	url="/privacy-policy/"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		dateModified: metadata.lastUpdated
	}}
/>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<h1 class="mb-6 text-4xl font-bold text-[#282876]">Website Privacy Policy</h1>
	<article class="prose prose-lg max-w-none prose-headings:text-[#282876] prose-a:text-[#216fed]">
		<p>
			This policy covers website inquiries, chat, and analytics. For the App and document
			processing, see our <a href="/terms-and-conditions/">Terms &amp; Data Processing</a> and the applicable
			agreement.
		</p>
		<p>Last updated: <time datetime={metadata.lastUpdated}>{metadata.lastUpdated}</time></p>
		<Privacy />
	</article>
</div>
