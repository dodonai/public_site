<script>
	// Visual breadcrumb only. The BreadcrumbList JSON-LD is emitted by each page's
	// SEOHead (and BlogPostLayout), so this component does not emit schema — that
	// avoids duplicate BreadcrumbList structured data on every page.
	let { items = [], url = '' } = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex flex-wrap items-center gap-1 text-sm text-[#8181ac]">
		{#each items as item, i}
			{#if i > 0}
				<li class="flex items-center gap-1">
					<svg
						class="h-3 w-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</li>
			{/if}
			<li>
				{#if item.href && i < items.length - 1}
					<a href={item.href} class="transition-colors hover:text-[#216fed]">{item.name}</a>
				{:else}
					<span class="text-[#282876] font-medium">{item.name}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
