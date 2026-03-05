<script>
	import { onMount } from 'svelte';

	// Lazy glob: creates code-split chunks that are NOT in the initial module graph.
	// Since the import functions are only called inside onMount (client-side),
	// SvelteKit won't include their CSS in the prerendered <head>.
	const animationModules = import.meta.glob('/src/lib/components/hero/*Animation.svelte');

	let { height = 400, animationName = null, children } = $props();

	let container = $state();
	let visible = $state(false);
	let DynamicComponent = $state(null);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
					if (animationName) {
						const path = `/src/lib/components/hero/${animationName}.svelte`;
						const loader = animationModules[path];
						if (loader) {
							loader().then((mod) => {
								DynamicComponent = mod.default;
							});
						}
					}
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
		{#if animationName}
			{#if DynamicComponent}
				<DynamicComponent />
			{:else}
				<div style="min-height: {height}px"></div>
			{/if}
		{:else}
			{@render children()}
		{/if}
	{:else}
		<div style="min-height: {height}px"></div>
	{/if}
</div>
