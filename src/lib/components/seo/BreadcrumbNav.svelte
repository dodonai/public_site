<script>
	let { items = [] } = $props();

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			...(item.href ? { item: `https://www.dodon.ai${item.href}` } : {})
		}))
	});
</script>

{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}

<nav aria-label="Breadcrumb">
	<ol class="flex flex-wrap items-center gap-1 text-sm text-[#8181ac]">
		{#each items as item, i}
			{#if i > 0}
				<li class="flex items-center gap-1">
					<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
