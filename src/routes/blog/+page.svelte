<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import BlogCategoryTag from '$lib/components/blog/BlogCategoryTag.svelte';

	let { data } = $props();

	const categories = ['All', 'Deposition', 'Medical Records', 'Technology', 'Product'];
	let selectedCategory = $state('All');

	const filteredPosts = $derived(
		selectedCategory === 'All'
			? data.posts
			: data.posts.filter((post) => post.category === selectedCategory)
	);

	// Featured post: first post with featureMain: true, or newest post
	const featuredPost = $derived(
		filteredPosts.find((p) => p.featureMain) || filteredPosts[0] || null
	);

	const gridPosts = $derived(
		featuredPost ? filteredPosts.filter((p) => p.slug !== featuredPost.slug) : filteredPosts
	);

	function featuredDate(date) {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<SEOHead
	title="Blog"
	description="Insights on AI-powered legal document processing, deposition summaries, medical records, and more from the Dodonai team."
	url="/blog"
/>

<BreadcrumbNav items={[{ name: 'Home', href: '/' }, { name: 'Blog' }]} />

<div class="pt-20 lg:pt-24">
	<!-- Hero Header -->
	<section class="relative overflow-hidden bg-white">
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

		<div class="relative z-10 mx-auto w-[85%] max-w-[1250px] py-16 text-center sm:py-20">
			<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl">
				Dodonai Briefs:<br />A Summary of Legal AI Insights
			</h1>
			<p class="mx-auto mt-4 max-w-2xl text-lg text-[#8181ac]">
				Condensed and insightful summaries of the latest developments, reports, and articles in
				the world of legal AI.
			</p>
		</div>
	</section>

	<!-- Category Filter Bar -->
	<div class="bg-white">
		<div class="mx-auto w-[85%] max-w-[1250px] py-8">
			<div class="flex flex-wrap items-center justify-center gap-2">
				{#each categories as cat}
					{#if cat === 'All'}
						<button
							class="rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors {selectedCategory ===
							'All'
								? 'border-[#216fed] bg-[#216fed] text-white'
								: 'border-[#e5e5e5] bg-white text-[#8181ac] hover:border-[#216fed] hover:text-[#216fed]'}"
							onclick={() => (selectedCategory = 'All')}
						>
							All
						</button>
					{:else}
						{@const isActive = selectedCategory === cat}
						{#if isActive}
							<button
								class="rounded-full border border-[#216fed] bg-[#216fed] px-4 py-1.5 text-sm font-semibold text-white transition-colors"
								onclick={() => (selectedCategory = cat)}
							>
								{cat}
							</button>
						{:else}
							<BlogCategoryTag category={cat} onclick={() => (selectedCategory = cat)} />
						{/if}
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<!-- Blog Content -->
	<section class="bg-white">
		<div class="mx-auto w-[85%] max-w-[1250px] pb-20 sm:pb-28">
			{#if filteredPosts.length === 0}
				<div class="py-20 text-center">
					<p class="text-lg text-[#8181ac]">No posts found in this category.</p>
				</div>
			{:else}
				<!-- Featured Post -->
				{#if featuredPost}
					<a
						href="/blog/{featuredPost.slug}"
						class="group mb-16 block overflow-hidden rounded-xl bg-white shadow-brand-card transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-card-hover"
					>
						<div class="grid grid-cols-1 lg:grid-cols-2">
							<!-- Image -->
							<div class="relative h-64 overflow-hidden lg:h-full lg:min-h-[320px]">
								{#if featuredPost.image}
									<img
										src={featuredPost.image}
										alt={featuredPost.imageAlt || featuredPost.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								{:else}
									<div class="flex h-full w-full items-center justify-center bg-[#f4f5fd]">
										<svg
											class="h-16 w-16 text-[#836ae4]/30"
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
								<div class="absolute left-4 top-4">
									<BlogCategoryTag category={featuredPost.category} />
								</div>
							</div>

							<!-- Content -->
							<div class="flex flex-col justify-center p-8 lg:p-10">
								<h2 class="text-2xl font-extrabold tracking-tight text-[#282876] sm:text-3xl">
									{featuredPost.title}
								</h2>
								{#if featuredPost.cardText || featuredPost.description}
									<p class="mt-4 line-clamp-3 text-base leading-relaxed text-[#8181ac]">
										{featuredPost.cardText || featuredPost.description}
									</p>
								{/if}
								<div class="mt-6 flex items-center gap-4 text-sm text-[#8181ac]">
									<span class="font-medium">{featuredPost.author}</span>
									{#if featuredPost.date}
										<span>&middot;</span>
										<time datetime={featuredPost.date}>{featuredDate(featuredPost.date)}</time>
									{/if}
									{#if featuredPost.readingTime}
										<span>&middot;</span>
										<span>{featuredPost.readingTime}</span>
									{/if}
								</div>
								<span
									class="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#216fed] transition-colors group-hover:text-[#282876]"
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
						</div>
					</a>
				{/if}

				<!-- Post Grid -->
				{#if gridPosts.length > 0}
					<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{#each gridPosts as post}
							<BlogCard {...post} />
						{/each}
					</div>
				{/if}
			{/if}
		</div>
	</section>
</div>
