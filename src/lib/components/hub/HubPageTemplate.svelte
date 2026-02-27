<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import ComparisonTable from './ComparisonTable.svelte';
	import HubNav from './HubNav.svelte';
	import { linkify } from '$lib/utils/linkify.js';

	let { data } = $props();

	function blogTitle(href) {
		return href.replace(/^\/blog\//, '').replace(/\/$/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
	}

	const comparisonSection = $derived(
		data.sections?.find((s) => s.type === 'comparison')
	);

	const jsonLd = $derived(() => {
		const schemas = [
			{
				'@context': 'https://schema.org',
				'@type': 'WebPage',
				name: data.seo.title,
				description: data.seo.description,
				url: `https://www.dodon.ai${data.seo.canonical}`,
				publisher: {
					'@type': 'Organization',
					name: 'Dodonai',
					url: 'https://www.dodon.ai'
				}
			}
		];

		if (data.breadcrumbs) {
			schemas.push({
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: data.breadcrumbs.map((item, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					name: item.name,
					...(item.href ? { item: `https://www.dodon.ai${item.href}` } : {})
				}))
			});
		}

		if (data.faq && data.faq.length > 0) {
			schemas.push({
				'@context': 'https://schema.org',
				'@type': 'FAQPage',
				mainEntity: data.faq.map((item) => ({
					'@type': 'Question',
					name: item.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: item.answer.replace(/\{\{link:[^}]+\|([^}]+)\}\}/g, '$1')
					}
				}))
			});
		}

		if (comparisonSection) {
			schemas.push({
				'@context': 'https://schema.org',
				'@type': 'ItemList',
				name: comparisonSection.heading,
				itemListElement: comparisonSection.columns.slice(1).map((col, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					name: col
				}))
			});
		}

		return schemas;
	});
</script>

<SEOHead
	title={data.seo.title}
	description={data.seo.description}
	url={data.seo.canonical}
	jsonLd={jsonLd()}
/>

<BlobBackground>
	<!-- Breadcrumb + Hero -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			{#if data.breadcrumbs}
				<div class="mb-8">
					<BreadcrumbNav items={data.breadcrumbs} />
				</div>
			{/if}

			<div class="mx-auto max-w-3xl text-center">
				<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl lg:text-6xl">
					{data.hero.headline}
				</h1>

				{#if data.hero.subheadline}
					<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#8181ac]">
						{@html linkify(data.hero.subheadline)}
					</p>
				{/if}

				<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
					{#if data.hero.ctaText}
						<a
							href={data.hero.ctaUrl}
							target={data.hero.ctaUrl?.startsWith('http') ? '_blank' : undefined}
							rel={data.hero.ctaUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
							class="btn-brand-primary"
						>
							{data.hero.ctaText}
						</a>
					{/if}
					{#if data.hero.secondaryCtaText}
						<a
							href={data.hero.secondaryCtaUrl}
							class="btn-brand-outline"
						>
							{data.hero.secondaryCtaText}
						</a>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Dynamic Sections -->
	{#if data.sections}
		{#each data.sections as section}
			{#if section.type === 'content'}
				<ContentSection
					heading={section.heading}
					paragraphs={section.paragraphs}
					background="bg-transparent"
				/>
			{:else if section.type === 'features'}
				<ValueProposition
					heading={section.heading}
					cards={section.cards}
					columns={section.columns}
					background="bg-transparent"
				/>
			{:else if section.type === 'comparison'}
				<ComparisonTable
					heading={section.heading}
					columns={section.columns}
					rows={section.rows}
					background="bg-transparent"
				/>
			{:else if section.type === 'howItWorks'}
				<HowItWorks
					steps={section.items}
					background="bg-transparent"
				/>
			{/if}
		{/each}
	{/if}

	<!-- FAQ -->
	{#if data.faq && data.faq.length > 0}
		<FAQAccordion items={data.faq} background="bg-transparent" />
	{/if}

	<!-- Related Hub Pages -->
	{#if data.relatedPages && data.relatedPages.length > 0}
		<HubNav pages={data.relatedPages} background="bg-transparent" />
	{/if}

	<!-- Related Blog Posts -->
	{#if data.relatedBlogPosts && data.relatedBlogPosts.length > 0}
		<section class="bg-transparent py-20 sm:py-28">
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 class="mb-8 text-center text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Related Articles
				</h2>
				<ul class="space-y-4">
					{#each data.relatedBlogPosts as postHref}
						<li>
							<a
								href={postHref}
								class="flex items-center gap-3 rounded-xl border border-[#dcddf340] bg-white p-5 shadow-brand-card transition-shadow hover:shadow-lg"
							>
								<svg class="h-5 w-5 shrink-0 text-[#216fed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
								</svg>
								<span class="text-sm font-medium text-[#282876] group-hover:text-[#216fed]">{blogTitle(postHref)}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
</BlobBackground>

<!-- CTA outside blob background -->
{#if data.ctaOverride}
	<CTASection headline={data.ctaOverride.headline} description={data.ctaOverride.description} />
{:else}
	<CTASection />
{/if}
