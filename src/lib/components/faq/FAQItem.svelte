<script>
	import { slide } from 'svelte/transition';

	let { question, answer, groupName = 'faq-group', checked = false } = $props();
	let isOpen = $state(checked);
</script>

<div class="border-b border-[#e5e5e5] mt-6 pt-6 px-[5%]">
	<button
		type="button"
		class="flex w-full items-start justify-between pb-5 text-left"
		onclick={() => (isOpen = !isOpen)}
		aria-expanded={isOpen}
	>
		<span class="pr-4 text-xl font-semibold leading-8 text-[#152c5b] sm:max-md:text-[17px] sm:max-md:leading-7"
			>{question}</span
		>
		<div class="flex h-6 w-6 flex-shrink-0 items-center justify-center sm:max-md:h-[18px] sm:max-md:w-[18px]">
			<svg
				class="h-4 w-4 text-[#152c5b] transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</button>
	{#if isOpen}
		<div transition:slide={{ duration: 250 }} class="mb-5 overflow-hidden sm:max-md:mt-4">
			<p class="text-sm font-medium leading-relaxed text-[#8181ac]">{answer}</p>
		</div>
	{/if}
</div>
