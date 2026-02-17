<script>
	let { isYearly, ontoggle } = $props();
</script>

<div class="flex items-center justify-center gap-4">
	<span
		class="text-sm font-semibold transition-colors {isYearly ? 'text-[#8181ac]' : 'text-[#282876]'}"
	>
		Monthly
	</span>

	<button
		type="button"
		role="switch"
		aria-checked={isYearly}
		aria-label="Toggle yearly billing"
		class="relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#216fed] {isYearly
			? 'bg-[#216fed]'
			: 'bg-[#e5e5e5]'}"
		onclick={ontoggle}
	>
		<span
			class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 {isYearly
				? 'translate-x-8'
				: 'translate-x-1'}"
		></span>
	</button>

	<span
		class="flex items-center gap-2 text-sm font-semibold transition-colors {isYearly
			? 'text-[#282876]'
			: 'text-[#8181ac]'}"
	>
		Yearly
		<span class="rounded-full bg-[#216fed1a] px-2.5 py-0.5 text-xs font-bold text-[#216fed]">
			Save 17%
		</span>
	</span>
</div>
