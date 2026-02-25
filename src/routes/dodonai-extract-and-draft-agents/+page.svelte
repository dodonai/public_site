<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import ExtractDraftAnimation from '$lib/components/hero/ExtractDraftAnimation.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import VideoEmbed from '$lib/components/video/VideoEmbed.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import RelatedServices from '$lib/components/features/RelatedServices.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { linkify } from '$lib/utils/linkify.js';
	import data from '$lib/data/services/extract-draft-agents.json';
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
			serviceType: 'AI Document Extraction & Report Drafting'
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
				{ '@type': 'ListItem', position: 2, name: 'Extract & Draft Agents' }
			]
		},
		{
			'@context': 'https://schema.org',
			'@type': 'HowTo',
			name: 'How to Extract Data and Generate Reports with Dodonai XD Agents',
			step: data.howItWorks.map((s, i) => ({
				'@type': 'HowToStep',
				position: i + 1,
				name: s.title,
				text: s.description
			}))
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
		<ExtractDraftAnimation />
	</ServiceHero>

	<!-- 2. Testimonials -->
	{#if data.testimonials.length > 0}
		<TestimonialSection testimonials={data.testimonials} showBgImage={false} />
	{/if}

	<!-- 3. Video -->
	{#if data.videoUrl}
		<VideoEmbed url={data.videoUrl} title="See Dodonai in Action" background="bg-transparent" />
	{/if}

	<!-- 4. Unified XD Overview: intro + differentiators + use cases -->
	<section class="py-20 sm:py-28">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Intelligent Document Processing & Report Generation
				</h2>
				{#if data.educationalContent?.[0]?.paragraphs}
					{#each data.educationalContent[0].paragraphs as paragraph}
						<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">{paragraph}</p>
					{/each}
				{/if}
			</div>

			<!-- Differentiators -->
			{#if data.additionalContent}
				<div class="mt-14 grid gap-8 sm:grid-cols-2">
					{#each data.additionalContent as section}
						<div class="rounded-2xl border border-[#836ae430] bg-[#836ae408] p-8">
							<h3 class="text-lg font-bold text-[#282876]">{section.heading}</h3>
							{#each section.paragraphs as paragraph}
								<p class="mt-3 text-sm leading-relaxed text-[#8181ac]">{paragraph}</p>
							{/each}
						</div>
					{/each}
				</div>
			{/if}

			<!-- Use Cases -->
			{#if data.useCases}
				<h3 class="mt-16 text-center text-2xl font-bold tracking-tight text-[#282876]">
					{data.useCases.heading}
				</h3>
				<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.useCases.cards as card}
						<div class="flex gap-5 rounded-2xl border border-[#dcddf340] bg-white p-7 shadow-brand-card">
							<div>
								<h4 class="text-base font-bold text-[#282876]">{card.title}</h4>
								<p class="mt-2 text-sm leading-relaxed text-[#8181ac]">{@html linkify(card.description)}</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- 5. How It Works -->
	{#if data.howItWorks.length > 0}
		<HowItWorks steps={data.howItWorks} background="bg-transparent" />
	{/if}

	<!-- 8. Benefits / Value Proposition -->
	{#if data.valueProposition}
		<ValueProposition
			heading={data.valueProposition.heading}
			cards={data.valueProposition.cards}
			columns={3}
			background="bg-transparent"
		/>
	{/if}

	<!-- 9. FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} background="bg-transparent" />
	{/if}

	<!-- Related Services -->
	{#if data.relatedServices}
		<RelatedServices services={data.relatedServices} background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- 10. CTA -->
<CTASection />
