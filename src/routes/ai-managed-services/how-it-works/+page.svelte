<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ApprovedPage from '$lib/components/marketing/ApprovedPage.svelte';
	import { initialize } from '$lib/components/marketing/how-it-works.js';
	import content from 'virtual:approved-method';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	const breadcrumbs = [
		{ name: 'Home', href: '/' },
		{ name: 'AI Managed Services', href: '/ai-managed-services/' },
		{ name: 'How It Works', href: '/ai-managed-services/how-it-works/' }
	];
</script>

<SEOHead
	title="How Our AI Automation Services Work"
	description="Start with one task. Dodonai learns the work, connects the systems already in place, builds the automation, and improves it with you."
	url="/ai-managed-services/how-it-works/"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: `https://www.dodon.ai${item.href}`
		}))
	}}
/>
<div class="breadcrumbs"><BreadcrumbNav items={breadcrumbs} /></div>
<ApprovedPage {content} {initialize} />

<style>
	.breadcrumbs {
		max-width: 1160px;
		margin: auto;
		padding: 24px 28px 0;
	}
</style>
