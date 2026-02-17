<script>
	const BASE_URL = 'https://www.dodon.ai';

	let {
		title,
		description,
		url,
		image = '/images/og-default.png',
		type = 'website',
		jsonLd = null
	} = $props();

	const fullUrl = $derived(url ? `${BASE_URL}${url}` : BASE_URL);
	const fullImage = $derived(image.startsWith('http') ? image : `${BASE_URL}${image}`);
	const fullTitle = $derived(title ? `${title} | Dodonai` : 'Dodonai');
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />

	<!-- Canonical URL -->
	<link rel="canonical" href={fullUrl} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Dodonai" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImage} />

	<!-- JSON-LD Structured Data -->
	{#if Array.isArray(jsonLd)}
		{#each jsonLd as schema}
			{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
		{/each}
	{:else if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{/if}
</svelte:head>
