<script>
	import BlogCategoryTag from './BlogCategoryTag.svelte';

	let {
		slug,
		title,
		description = '',
		date,
		author,
		category,
		image = null,
		cardText = '',
		imageAlt = '',
		readingTime = ''
	} = $props();

	const displayExcerpt = $derived(cardText || description || '');

	const formattedDate = $derived(
		date
			? new Date(date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})
			: ''
	);
</script>

<a
	href="/blog/{slug}"
	class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-brand-card transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-card-hover"
>
	<!-- Hero Image or Brand Placeholder -->
	<div class="relative h-48 overflow-hidden">
		{#if image}
			<img
				src={image}
				alt={imageAlt || title}
				width="640"
				height="360"
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-[#f4f5fd]">
				<svg
					class="h-12 w-12 text-[#836ae4]/40"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
					/>
				</svg>
			</div>
		{/if}
		<div class="absolute left-3 top-3">
			<BlogCategoryTag {category} />
		</div>
	</div>

	<div class="flex flex-1 flex-col gap-3 p-5">
		<!-- Title -->
		<h3 class="line-clamp-2 text-lg font-bold text-[#282876]">
			{title}
		</h3>

		<!-- Excerpt -->
		{#if displayExcerpt}
			<p class="line-clamp-3 text-sm leading-relaxed text-[#8181ac]">
				{displayExcerpt}
			</p>
		{/if}

		<!-- Footer -->
		<div class="mt-auto flex items-center justify-between pt-3">
			<div class="flex items-center gap-3 text-xs text-[#8181ac]">
				<span class="font-medium">{author}</span>
				{#if formattedDate}
					<span>&middot;</span>
					<time datetime={date}>{formattedDate}</time>
				{/if}
			</div>
		</div>

		<!-- Read more link -->
		<span
			class="inline-flex items-center gap-1 text-sm font-semibold text-[#216fed] transition-colors group-hover:text-[#282876]"
		>
			Read more
			<svg
				class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</span>
	</div>
</a>
