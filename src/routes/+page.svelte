<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ApprovedPage from '$lib/components/marketing/ApprovedPage.svelte';
	import { initialize } from '$lib/components/marketing/homepage.js';
	import content from 'virtual:approved-homepage';
	import { organization } from '$lib/data/organization.js';
</script>

<SEOHead
	title="AI Systems Built and Run for Your Firm"
	description="Dodonai organizes, connects, automates, and runs firm-owned AI systems around your workflows and existing software."
	url="/"
	jsonLd={organization}
/>
<ApprovedPage {content} {initialize} />
