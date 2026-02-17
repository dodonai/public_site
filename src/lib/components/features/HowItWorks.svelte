<script>
	let { steps = [], background = 'bg-[#f4f5fd]' } = $props();
</script>

<section class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
				How It Works
			</h2>
		</div>

		<div class="relative grid gap-12 md:grid-cols-3 md:gap-8">
			{#each steps as step, i}
				<div class="relative flex flex-col items-center text-center">
					{#if i < steps.length - 1}
						<div
							class="absolute left-[calc(50%+2rem)] top-6 hidden h-0.5 bg-[#216fed33] md:block"
							style="width: calc(100% - 4rem);"
						></div>
					{/if}

					<div
						class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#216fed] text-lg font-bold text-white shadow-md"
					>
						{i + 1}
					</div>

					<h3 class="mt-6 text-lg font-bold text-[#282876]">{step.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-[#8181ac]">{step.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
