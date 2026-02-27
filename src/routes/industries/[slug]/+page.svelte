<script>
	import HubPageTemplate from '$lib/components/hub/HubPageTemplate.svelte';
	let { data } = $props();
</script>

<HubPageTemplate data={data.data} />
