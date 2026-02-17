<script>
	let { heading, paragraphs = [], background = 'bg-white' } = $props();
</script>

<section class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
			{heading}
		</h2>

		<div class="mt-8 space-y-6">
			{#each paragraphs as paragraph}
				<p class="text-base leading-7 text-[#8181ac] sm:text-lg">
					{paragraph}
				</p>
			{/each}
		</div>
	</div>
</section>
