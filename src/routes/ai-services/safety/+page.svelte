<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { stripLinks } from '$lib/utils/linkify.js';
	import data from '$lib/data/services/ai-services/safety.json';

	const breadcrumbs = [
		{ name: 'Home', href: '/' },
		{ name: 'AI Services', href: '/ai-services/' },
		{ name: 'Safety & Trust' }
	];

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: data.seo.title,
			description: data.seo.description,
			author: {
				'@type': 'Organization',
				name: 'Dodonai, Inc.',
				url: 'https://www.dodon.ai'
			},
			publisher: {
				'@type': 'Organization',
				name: 'Dodonai, Inc.',
				url: 'https://www.dodon.ai'
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `https://www.dodon.ai${data.seo.canonical}`
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
				item: `https://www.dodon.ai${item.href || data.seo.canonical}`
			}))
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: data.faq.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: stripLinks(item.answer)
				}
			}))
		}
	];
</script>

<SEOHead
	title={data.seo.title}
	description={data.seo.description}
	url={data.seo.canonical}
	{jsonLd}
/>

<BlobBackground>
	<section class="bg-transparent pt-10 sm:pt-12">
		<div class="mx-auto w-[85%] max-w-[1250px]">
			<BreadcrumbNav items={breadcrumbs} url={data.seo.canonical} />
		</div>
	</section>

	<section class="bg-transparent pt-10 pb-20 sm:pt-12 sm:pb-28">
		<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
			<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl lg:text-6xl">
				{data.hero.headline}
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#8181ac]">
				{data.hero.subheadline}
			</p>
			<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
				<a href={data.hero.ctaUrl} class="btn-brand-primary">{data.hero.ctaText}</a>
				<a href={data.hero.secondaryCtaUrl} class="btn-brand-outline">{data.hero.secondaryCtaText}</a>
			</div>
		</div>
	</section>

	<ContentSection
		heading={data.stakes.heading}
		paragraphs={data.stakes.paragraphs}
		background="bg-transparent"
	/>

	<!-- Hallucination patterns -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{data.hallucinationPatterns.heading}
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					{data.hallucinationPatterns.intro}
				</p>
			</div>

			<div class="mt-16 grid gap-6 md:grid-cols-3">
				{#each data.hallucinationPatterns.cards as card}
					<div class="flex h-full flex-col rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card">
						<h3 class="text-lg font-bold text-[#282876]">{card.title}</h3>
						<p class="mt-3 text-sm leading-relaxed text-[#8181ac]">{card.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<ContentSection
		heading={data.abaMapping.heading}
		paragraphs={data.abaMapping.paragraphs}
		background="bg-transparent"
	/>

	<!-- 4-principle framework -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{data.framework.heading}
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					{data.framework.intro}
				</p>
			</div>

			<div class="mt-16 grid gap-6 md:grid-cols-2">
				{#each data.framework.cards as card}
					<div class="flex h-full gap-5 rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card">
						<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#216fed1a]">
							<svg class="h-6 w-6 text-[#216fed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
							</svg>
						</div>
						<div>
							<h3 class="text-lg font-bold text-[#282876]">{card.title}</h3>
							<p class="mt-2 text-sm leading-relaxed text-[#8181ac]">{card.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<ContentSection
		heading={data.wontProtect.heading}
		paragraphs={data.wontProtect.paragraphs}
		background="bg-transparent"
	/>

	<ContentSection
		heading={data.verificationHabit.heading}
		paragraphs={data.verificationHabit.paragraphs}
		background="bg-transparent"
	/>

	<FAQAccordion items={data.faq} background="bg-transparent" />
</BlobBackground>

<CTASection />
