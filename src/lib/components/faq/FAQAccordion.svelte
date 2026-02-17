<script>
	import FAQItem from './FAQItem.svelte';

	let { items = [], sectionTitle = 'Frequently Asked Questions', background = 'bg-white' } = $props();

	const groupName = `faq-${Math.random().toString(36).slice(2, 9)}`;
</script>

<section class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		{#if sectionTitle}
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{sectionTitle}
				</h2>
			</div>
		{/if}

		<div>
			{#each items as item, i (item.question)}
				<FAQItem
					question={item.question}
					answer={item.answer}
					{groupName}
					checked={i === 0}
				/>
			{/each}
		</div>
	</div>
</section>
