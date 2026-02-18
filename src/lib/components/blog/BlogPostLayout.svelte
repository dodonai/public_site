<script>
	import { page } from '$app/state';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlogCategoryTag from './BlogCategoryTag.svelte';

	let {
		title,
		date,
		dateModified = '',
		author,
		category,
		image = null,
		description = '',
		tags = [],
		readingTime = '',
		imageAlt = '',
		children
	} = $props();

	const formattedDate = $derived(
		date
			? new Date(date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			: ''
	);

	const displayReadingTime = $derived(readingTime || '5 min read');
</script>

<SEOHead
	{title}
	{description}
	type="article"
	url={page.url.pathname}
	image={image || '/images/og-default.jpg'}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description,
		image: image ? `https://www.dodon.ai${image}` : undefined,
		datePublished: date,
		dateModified: dateModified || date,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://www.dodon.ai${page.url.pathname}`
		},
		author: {
			'@type': 'Person',
			name: author
		},
		publisher: {
			'@type': 'Organization',
			name: 'Dodonai, Inc.',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.dodon.ai/images/brand/logo-main.png'
			}
		}
	}}
/>

<div class="pt-20 lg:pt-24">
	<!-- Hero Header Section -->
	<div class="relative overflow-hidden bg-white">
		<!-- Decorative blur blobs -->
		<img
			src="/images/brand/blur-1.png"
			alt=""
			class="pointer-events-none absolute -left-40 -top-20 z-0 w-[700px] opacity-50"
			aria-hidden="true"
		/>
		<img
			src="/images/brand/blur-2.png"
			alt=""
			class="pointer-events-none absolute -right-40 top-10 z-0 w-[600px] opacity-40"
			aria-hidden="true"
		/>

		<header class="relative z-10 mx-auto w-[85%] max-w-[1250px] py-16 text-center sm:py-20">
			<div class="mb-8">
				<BreadcrumbNav items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: title }]} />
			</div>
			<!-- Category + Reading Time -->
			<div class="mb-6 flex items-center justify-center gap-3">
				<BlogCategoryTag {category} />
				<span class="text-sm text-[#8181ac]">{displayReadingTime}</span>
			</div>

			<!-- Title -->
			<h1
				class="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl lg:text-5xl"
			>
				{title}
			</h1>

			<!-- Author + Date -->
			<div class="mt-6 flex items-center justify-center gap-4 text-sm text-[#8181ac]">
				<span class="font-medium text-[#282876]/80">{author}</span>
				{#if formattedDate}
					<span>&middot;</span>
					<time datetime={date}>{formattedDate}</time>
				{/if}
			</div>
		</header>
	</div>

	<!-- Hero Image (below header, wider) -->
	{#if image}
		<div class="mx-auto -mt-2 max-w-4xl px-4 pb-12 pt-8">
			<img src={image} alt={imageAlt || title} class="h-auto w-full rounded-xl shadow-lg" />
		</div>
	{/if}

	<!-- Article Content -->
	<article
		class="prose prose-lg mx-auto max-w-3xl px-4 pb-12
			prose-headings:text-[#282876] prose-headings:tracking-tight
			prose-p:text-[#4a4a6a]
			prose-a:text-[#216fed] prose-a:no-underline hover:prose-a:underline
			prose-blockquote:border-l-[#836ae4]
			prose-strong:text-[#282876]
			prose-code:rounded prose-code:bg-[#f4f5fd] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[#282876]
			prose-pre:bg-[#f4f5fd]
			prose-li:text-[#4a4a6a]"
	>
		{@render children()}
	</article>

	<!-- Tags -->
	{#if tags.length > 0}
		<div class="mx-auto max-w-3xl border-t border-[#e5e5e5] px-4 py-8">
			<div class="flex flex-wrap items-center gap-2">
				<span class="text-sm font-medium text-[#8181ac]">Tags:</span>
				{#each tags as tag}
					<span class="rounded-full bg-[#f4f5fd] px-3 py-1 text-xs font-medium text-[#282876]">
						{tag}
					</span>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Back to Blog -->
	<div class="mx-auto max-w-3xl px-4 pb-16">
		<a
			href="/blog"
			class="inline-flex items-center gap-2 text-sm font-semibold text-[#216fed] transition-colors hover:text-[#282876]"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Blog
		</a>
	</div>
</div>
