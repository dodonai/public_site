<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import DepositionHeroAnimation from '$lib/components/hero/DepositionHeroAnimation.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import VideoEmbed from '$lib/components/video/VideoEmbed.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import ExampleSummaries from '$lib/components/features/ExampleSummaries.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import RelatedServices from '$lib/components/features/RelatedServices.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { linkify } from '$lib/utils/linkify.js';
	import data from '$lib/data/services/deposition-summaries.json';
</script>

<SEOHead
	title={data.seo.title}
	description={data.seo.description}
	url={data.seo.canonical}
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: data.seo.title,
			description: data.seo.description,
			provider: {
				'@type': 'Organization',
				name: 'Dodonai, Inc.',
				url: 'https://www.dodon.ai'
			},
			serviceType: 'AI Deposition Summary Software'
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: data.faq.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.answer
				}
			}))
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dodon.ai/' },
				{ '@type': 'ListItem', position: 2, name: 'Deposition Summary Software' }
			]
		}
	]}
/>

<!-- Flowing gradient background spanning all content sections -->
<BlobBackground>
	<!-- 1. Hero -->
	<ServiceHero
		headline={data.hero.headline}
		subheadline={data.hero.subheadline}
		bullets={data.hero.bullets}
		ctaText={data.hero.ctaText}
		ctaUrl={data.hero.ctaUrl}
		secondaryCtaText={data.hero.secondaryCtaText}
		secondaryCtaUrl={data.hero.secondaryCtaUrl}
		badges={data.hero.badges}
		background="bg-transparent"
	>
		<DepositionHeroAnimation />
	</ServiceHero>

	<!-- 2. Testimonials -->
	{#if data.testimonials.length > 0}
		<TestimonialSection testimonials={data.testimonials} showBgImage={false} />
	{/if}

	<!-- 3. Video -->
	{#if data.videoUrl}
		<VideoEmbed url={data.videoUrl} title="See Dodonai in Action" background="bg-transparent" />
	{/if}

	<!-- 4 & 5. Educational Content (side-by-side on desktop) -->
	{#if data.educationalContent}
		<section class="py-20 sm:py-28">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
					{#each data.educationalContent as section}
						<div>
							<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
								{section.heading}
							</h2>
							<div class="mt-8 space-y-6">
								{#each section.paragraphs as paragraph}
									<p class="text-base leading-7 text-[#8181ac] sm:text-lg">
										{@html linkify(paragraph)}
									</p>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- 6. How It Works -->
	{#if data.howItWorks.length > 0}
		<HowItWorks steps={data.howItWorks} background="bg-transparent" />
	{/if}

	<!-- 7. Example Deposition Summaries -->
	{#if data.examples}
		<ExampleSummaries
			sectionTitle={data.examples.sectionTitle}
			sectionDescription={data.examples.sectionDescription}
			sectionQuote={data.examples.sectionQuote}
			items={data.examples.items}
			background="bg-transparent"
		/>
	{/if}

	<!-- 8. Deposition Summary Service -->
	{#if data.service}
		<section class="py-20 sm:py-28">
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl text-center">
					{data.service.heading}
				</h2>
				<div class="mt-8 space-y-6">
					{#each data.service.paragraphs as paragraph}
						<p class="text-base leading-7 text-[#8181ac] sm:text-lg">
							{paragraph}
						</p>
					{/each}
				</div>
				{#if data.service.ctaText}
					<div class="mt-10 text-center">
						<a
							href={data.service.ctaUrl}
							class="btn-brand-primary inline-block"
						>
							{data.service.ctaText}
						</a>
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- 9. Value Proposition -->
	{#if data.valueProposition}
		<ValueProposition
			heading={data.valueProposition.heading}
			cards={data.valueProposition.cards}
			background="bg-transparent"
		/>
	{/if}

	<!-- 10. FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} sectionTitle="Deposition Summarizer: Asked & Answered" background="bg-transparent" />
	{/if}

	<!-- 11. Related Services -->
	{#if data.relatedServices}
		<RelatedServices services={data.relatedServices} background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- 11. CTA -->
<CTASection />
