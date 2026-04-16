<script>
	import { aiServicesFunctions } from '$lib/data/navigation.js';

	let { agent } = $props();

	const functionName = $derived(
		aiServicesFunctions.find((f) => f.slug === agent.function)?.name ?? ''
	);
	const isFlagship = $derived(agent.tier === 'flagship');
</script>

<a
	href="/ai-services/agents/{agent.slug}/"
	class="group flex h-full flex-col rounded-2xl border border-[#dcddf340] bg-white p-6 shadow-brand-card transition-shadow hover:shadow-lg"
>
	<div class="flex items-start justify-between gap-3">
		<span
			class="rounded-full bg-[#216fed1a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#216fed]"
		>
			{functionName}
		</span>
		{#if isFlagship}
			<span
				class="rounded-full bg-[#836ae41a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#836ae4]"
			>
				Flagship
			</span>
		{/if}
	</div>
	<h3 class="mt-4 text-lg font-bold leading-tight text-[#282876] group-hover:text-[#216fed]">
		{agent.title}
	</h3>
	<p class="mt-3 text-sm leading-6 text-[#8181ac]">
		{agent.shortDescription ?? agent.hero.subheadline}
	</p>
	<span class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#216fed]">
		Learn more
		<svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
		</svg>
	</span>
</a>
