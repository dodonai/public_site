<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ApprovedPage from '$lib/components/marketing/ApprovedPage.svelte';
	import { initialize } from '$lib/components/marketing/homepage.js';
	let { data } = $props();
</script>

<SEOHead
	title="AI Systems Built and Run for Your Firm"
	description="Dodonai organizes, connects, automates, and runs firm-owned AI systems around your workflows and existing software."
	url="/"
/>
<ApprovedPage content={data.content} {initialize} />
