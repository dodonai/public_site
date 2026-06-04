<script>
	let { study } = $props();
</script>

<a
	href="/ai-managed-services/results/{study.slug}/"
	class="group flex h-full flex-col rounded-2xl border border-[#dcddf340] bg-white p-6 shadow-brand-card transition-shadow hover:shadow-lg"
>
	<span
		class="self-start rounded-full bg-[#216fed1a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#216fed]"
	>
		{study.practiceArea}
	</span>

	<h3 class="mt-4 text-lg font-bold leading-snug text-[#282876] group-hover:text-[#216fed]">
		{study.headline}
	</h3>

	<p class="mt-3 text-sm leading-6 text-[#8181ac]">{study.descriptor}</p>

	{#if study.statStrip?.length}
		<dl class="mt-5 flex flex-wrap gap-x-5 gap-y-2">
			{#each study.statStrip as stat}
				<div>
					<dt class="text-sm font-bold text-[#282876]">{stat.value}</dt>
					<dd class="text-xs leading-5 text-[#8181ac]">{stat.label}</dd>
				</div>
			{/each}
		</dl>
	{/if}

	<span class="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-[#216fed]">
		Read the engagement
		<svg
			class="h-4 w-4 transition-transform group-hover:translate-x-1"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
		</svg>
	</span>
</a>
