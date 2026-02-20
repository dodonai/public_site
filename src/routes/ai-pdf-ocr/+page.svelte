<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import OCRAnimation from '$lib/components/hero/OCRAnimation.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import VideoEmbed from '$lib/components/video/VideoEmbed.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import RelatedServices from '$lib/components/features/RelatedServices.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import data from '$lib/data/services/ai-ocr.json';
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
			serviceType: 'AI PDF OCR & Text Extraction'
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
				{ '@type': 'ListItem', position: 2, name: 'AI PDF OCR' }
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
		<OCRAnimation />
	</ServiceHero>

	<!-- 2. Testimonials -->
	{#if data.testimonials.length > 0}
		<TestimonialSection testimonials={data.testimonials} showBgImage={false} />
	{/if}

	<!-- 3. Video -->
	{#if data.videoUrl}
		<VideoEmbed url={data.videoUrl} title="See Dodonai in Action" background="bg-transparent" />
	{/if}

	<!-- 4. Educational Content (4 cards) -->
	{#if data.educationalContent}
		<ValueProposition
			heading="Understanding AI OCR"
			cards={data.educationalContent}
			columns={2}
			background="bg-transparent"
		/>
	{/if}

	<!-- 5. How It Works -->
	{#if data.howItWorks.length > 0}
		<HowItWorks steps={data.howItWorks} background="bg-transparent" />
	{/if}

	<!-- 6. Value Proposition -->
	{#if data.valueProposition}
		<ValueProposition
			heading={data.valueProposition.heading}
			cards={data.valueProposition.cards}
			columns={3}
			background="bg-transparent"
		/>
	{/if}

	<!-- 7. FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} background="bg-transparent" />
	{/if}

	<!-- Related Services -->
	{#if data.relatedServices}
		<RelatedServices services={data.relatedServices} background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- 8. CTA -->
<CTASection />
