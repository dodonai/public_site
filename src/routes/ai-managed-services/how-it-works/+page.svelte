<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ApprovedPage from '$lib/components/marketing/ApprovedPage.svelte';
	import { initialize } from '$lib/components/marketing/how-it-works.js';
	let { data } = $props();
</script>

<SEOHead
	title="How It Works"
	description="Start with one task. Dodonai learns the work, connects the systems already in place, builds the automation, and improves it with you."
	url="/ai-managed-services/how-it-works/"
/>
<ApprovedPage content={data.content} {initialize} />
