<script>
	let { url, title = 'See Dodonai in Action', background = 'bg-white' } = $props();

	/**
	 * Extract YouTube video ID from various URL formats.
	 */
	function getYouTubeEmbedUrl(rawUrl) {
		if (!rawUrl) return '';

		let videoId = '';

		try {
			const parsed = new URL(rawUrl);

			if (parsed.hostname === 'youtu.be') {
				videoId = parsed.pathname.slice(1);
			} else if (
				parsed.hostname === 'www.youtube.com' ||
				parsed.hostname === 'youtube.com'
			) {
				if (parsed.pathname.startsWith('/embed/')) {
					videoId = parsed.pathname.split('/embed/')[1];
				} else {
					videoId = parsed.searchParams.get('v') || '';
				}
			}
		} catch {
			videoId = rawUrl;
		}

		if (!videoId) return '';
		return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
	}

	const embedUrl = $derived(getYouTubeEmbedUrl(url));
</script>

<section id="demo" class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		{#if title}
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{title}
				</h2>
			</div>
		{/if}

		{#if embedUrl}
			<div class="overflow-hidden rounded-2xl shadow-2xl">
				<div class="relative w-full" style="padding-bottom: 56.25%;">
					<iframe
						src={embedUrl}
						title="Dodonai product demo"
						class="absolute inset-0 h-full w-full"
						frameborder="0"
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>
		{:else}
			<div
				class="flex aspect-video items-center justify-center rounded-2xl bg-[#f4f5fd] shadow-inner"
			>
				<p class="text-[#8181ac]">Video coming soon</p>
			</div>
		{/if}
	</div>
</section>
