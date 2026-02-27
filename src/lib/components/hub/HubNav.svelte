<script>
	let { pages = [], heading = 'Related Pages', background = 'bg-white' } = $props();
</script>

<section class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-12 text-center text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
			{heading}
		</h2>

		<div class="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each pages as page}
				<a
					href={page.href}
					class="group flex flex-col justify-between rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card transition-shadow hover:shadow-lg"
				>
					<div>
						<h3 class="text-lg font-bold text-[#282876] group-hover:text-[#216fed]">
							{page.title}
						</h3>
						<p class="mt-3 text-sm leading-relaxed text-[#8181ac]">
							{page.description}
						</p>
					</div>
					<div class="mt-6 flex items-center gap-2 text-sm font-semibold text-[#216fed]">
						Learn more
						<svg
							class="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
