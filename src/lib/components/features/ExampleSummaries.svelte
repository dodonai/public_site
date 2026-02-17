<script>
	let {
		sectionTitle = 'Example Deposition Summaries',
		sectionDescription = '',
		sectionQuote = null,
		items = [],
		ctaUrl = 'https://app.dodon.ai/signup',
		background = 'bg-white'
	} = $props();
</script>

<section class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
				{sectionTitle}
			</h2>
			{#if sectionDescription}
				<p class="mt-4 text-base leading-7 text-[#8181ac] sm:text-lg">
					{sectionDescription}
				</p>
			{/if}
			{#if sectionQuote}
				<blockquote class="mt-6 border-l-4 border-[#216fed] pl-5 text-left">
					<p class="text-base italic leading-7 text-[#282876] sm:text-lg">
						"{sectionQuote.text}"
					</p>
					{#if sectionQuote.author}
						<cite class="mt-2 block text-sm font-semibold not-italic text-[#8181ac]">
							— {sectionQuote.author}
						</cite>
					{/if}
				</blockquote>
			{/if}
		</div>

		<div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each items as item}
				<div class="rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card">
					<h3 class="text-lg font-bold text-[#282876]">{item.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-[#8181ac]">{item.description}</p>

					<div class="mt-6 space-y-3 border-t border-[#dcddf340] pt-6">
						<div class="flex items-center justify-between text-sm">
							<span class="font-medium text-[#282876]">Pages</span>
							<span class="text-[#8181ac]">{item.pageCount}</span>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="font-medium text-[#282876]">Manual time</span>
							<span class="text-[#8181ac]">{item.manualTime}</span>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="font-medium text-[#282876]">Dodonai time</span>
							<span class="font-semibold text-[#216fed]">{item.aiTime}</span>
						</div>
					</div>

					{#if item.links?.length > 0}
						<div class="mt-6 flex flex-wrap gap-3 border-t border-[#dcddf340] pt-6">
							{#each item.links as link}
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-xs font-semibold text-[#216fed] hover:text-[#282876] transition-colors"
								>
									{link.label} &nearr;
								</a>
							{/each}
						</div>
					{/if}

					<a
						href={ctaUrl}
						class="mt-6 inline-flex items-center text-sm font-semibold text-[#216fed] hover:text-[#282876] transition-colors"
					>
						Try Free &rarr;
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
