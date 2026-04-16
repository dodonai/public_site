<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { linkify, stripLinks } from '$lib/utils/linkify.js';
	import data from '$lib/data/services/ai-services.json';

	let HeroAnimation = $state(null);
	onMount(async () => {
		const mod = await import('$lib/components/hero/AiServicesHeroAnimation.svelte');
		HeroAnimation = mod.default;
	});
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
			serviceType: 'AI Implementation Services for Legal Teams'
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
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dodon.ai/' },
				{ '@type': 'ListItem', position: 2, name: 'AI Services', item: `https://www.dodon.ai${data.seo.canonical}` }
			]
		},
		{
			'@context': 'https://schema.org',
			'@type': 'HowTo',
			name: 'How Dodonai AI Services Engagements Work',
			step: data.howItWorks.map((s, i) => ({
				'@type': 'HowToStep',
				position: i + 1,
				name: s.title,
				text: s.description
			}))
		}
	]}
/>

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
		{#if HeroAnimation}
			{@const Comp = HeroAnimation}
			<Comp />
		{:else}
			<div style="height: 460px" aria-hidden="true"></div>
		{/if}
	</ServiceHero>

	<!-- 2. Value Proposition -->
	{#if data.valueProposition}
		<ValueProposition
			heading={data.valueProposition.heading}
			cards={data.valueProposition.cards}
			background="bg-transparent"
		/>
	{/if}

	<!-- 3. How It Works -->
	{#if data.howItWorks.length > 0}
		<HowItWorks steps={data.howItWorks} background="bg-transparent" />
	{/if}

	<!-- 4. Educational Content -->
	{#if data.educationalContent}
		<section id="what-we-build" class="py-20 sm:py-28">
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

	<!-- 5. FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} sectionTitle="AI Services: Asked & Answered" background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- 6. CTA -->
<CTASection />
