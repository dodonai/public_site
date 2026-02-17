<script>
	import { onMount } from 'svelte';

	let { height = 400, children } = $props();

	let container = $state();
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ rootMargin: '200px' }
		);
		observer.observe(container);
		return () => observer.disconnect();
	});
</script>

<div bind:this={container}>
	{#if visible}
		{@render children()}
	{:else}
		<div style="min-height: {height}px"></div>
	{/if}
</div>
