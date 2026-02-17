<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import TranscriptAnimation from '$lib/components/hero/TranscriptAnimation.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import VideoEmbed from '$lib/components/video/VideoEmbed.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import data from '$lib/data/services/transcript-management.json';
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
			serviceType: 'AI Deposition Transcript Management'
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
		<TranscriptAnimation />
	</ServiceHero>

	<!-- 2. Testimonials -->
	{#if data.testimonials.length > 0}
		<TestimonialSection testimonials={data.testimonials} showBgImage={false} />
	{/if}

	<!-- 3. Video -->
	{#if data.videoUrl}
		<VideoEmbed url={data.videoUrl} title="See Dodonai in Action" background="bg-transparent" />
	{/if}

	<!-- 4. Educational Content -->
	{#if data.educationalContent}
		{#each data.educationalContent as section}
			<ContentSection
				heading={section.heading}
				paragraphs={section.paragraphs}
				background="bg-transparent"
			/>
		{/each}
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
			background="bg-transparent"
		/>
	{/if}

	<!-- 7. FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- 8. CTA -->
<CTASection />
