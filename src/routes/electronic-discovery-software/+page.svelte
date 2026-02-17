<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import EDiscoveryAnimation from '$lib/components/hero/EDiscoveryAnimation.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import VideoEmbed from '$lib/components/video/VideoEmbed.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import data from '$lib/data/services/e-discovery.json';
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
			serviceType: 'AI E-Discovery Software'
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
		<EDiscoveryAnimation />
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

	<!-- 7. Legal AI Tools Content -->
	{#if data.legalAiContent}
		<section class="py-20 sm:py-28">
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{data.legalAiContent.heading}
				</h2>
				<div class="mt-8 space-y-6">
					{#each data.legalAiContent.paragraphs as paragraph}
						<p class="text-base leading-7 text-[#8181ac] sm:text-lg">{paragraph}</p>
					{/each}
				</div>
				{#if data.legalAiContent.subsections}
					<div class="mt-12 space-y-10">
						{#each data.legalAiContent.subsections as sub}
							<div>
								<h3 class="text-xl font-bold text-[#282876]">{sub.title}</h3>
								<p class="mt-3 text-base leading-7 text-[#8181ac] sm:text-lg">{sub.description}</p>
							</div>
						{/each}
					</div>
				{/if}
				{#if data.legalAiContent.closing}
					<p class="mt-10 text-base leading-7 text-[#8181ac] sm:text-lg">{data.legalAiContent.closing}</p>
				{/if}
			</div>
		</section>
	{/if}

	<!-- 8. FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- 9. CTA -->
<CTASection />
