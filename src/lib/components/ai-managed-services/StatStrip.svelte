<script>
	// A row of headline stats. Each stat: { value, label }.
	let { stats = [], background = 'bg-transparent', columns = 3 } = $props();
	const gridCols = $derived(
		columns === 4
			? 'sm:grid-cols-2 lg:grid-cols-4'
			: columns === 2
				? 'sm:grid-cols-2'
				: 'sm:grid-cols-3'
	);
</script>

{#if stats.length > 0}
	<div class="{background} grid grid-cols-1 gap-4 {gridCols}">
		{#each stats as stat}
			<div class="rounded-2xl border border-[#dcddf340] bg-white p-6 text-center shadow-brand-card">
				<div class="text-3xl font-extrabold tracking-tight text-[#216fed] sm:text-4xl">
					{stat.value}
				</div>
				<div class="mt-2 text-sm leading-6 text-[#8181ac]">{stat.label}</div>
			</div>
		{/each}
	</div>
{/if}
