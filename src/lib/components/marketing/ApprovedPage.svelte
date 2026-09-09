<script>
	import { onMount } from 'svelte';
	let { content, initialize } = $props();
	let root;
	onMount(() => initialize(root));
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Source+Code+Pro:wght@400;500&display=swap"
	/>
</svelte:head>

<div bind:this={root} id={content.id} class:home={content.home} class="approved-page">
	{@html content.html}
</div>

<style>
	/* Neutralize DaisyUI defaults absent from the standalone designs. */
	.approved-page :global(.hero),
	.approved-page :global(.card) {
		display: block;
	}
	.approved-page :global(.hero > *) {
		grid-column-start: auto;
		grid-row-start: auto;
	}
	.approved-page :global(.btn) {
		height: auto;
		min-height: 0;
		text-transform: none;
		box-shadow: none;
	}
	.approved-page :global(.step::before),
	.approved-page :global(.step::after) {
		content: none;
	}
	.approved-page {
		--sans: 'Plus Jakarta Display', system-ui, sans-serif !important;
	}
	.approved-page :global(.wrap) {
		max-width: 1160px !important;
	}
	.approved-page :global([id]) {
		scroll-margin-top: 140px;
	}
</style>
