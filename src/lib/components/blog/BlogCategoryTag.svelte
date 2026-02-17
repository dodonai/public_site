<script>
	let { category, onclick = null } = $props();

	const categoryColors = {
		Deposition: 'bg-[#836ae41a] text-[#836ae4] border-[#836ae433]',
		'Medical Records': 'bg-[#ff6a3914] text-[#ff6a39] border-[#ff6a3933]',
		Technology: 'bg-[#216fed14] text-[#216fed] border-[#216fed33]',
		Product: 'bg-[#f9e1ff] text-[#836ae4] border-[#836ae433]',
		Argument: 'bg-[#28287614] text-[#282876] border-[#28287633]',
		Report: 'bg-[#8181ac14] text-[#8181ac] border-[#8181ac33]',
		Podcast: 'bg-[#49a84714] text-[#49a847] border-[#49a84733]',
		'Law Review': 'bg-[#8181ac14] text-[#8181ac] border-[#8181ac33]'
	};

	const colorClass = $derived(categoryColors[category] || 'bg-[#f4f5fd] text-[#282876] border-[#e5e5e5]');
</script>

{#if onclick}
	<button
		class="inline-block rounded-full border px-3 py-0.5 text-xs font-semibold transition-opacity hover:opacity-80 {colorClass}"
		{onclick}
	>
		{category}
	</button>
{:else}
	<span
		class="inline-block rounded-full border px-3 py-0.5 text-xs font-semibold {colorClass}"
	>
		{category}
	</span>
{/if}
