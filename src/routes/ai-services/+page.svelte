<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { stripLinks } from '$lib/utils/linkify.js';
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
	<!-- Hero -->
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
			<div style="height: 500px" aria-hidden="true"></div>
		{/if}
	</ServiceHero>

	<!-- Value Proposition -->
	{#if data.valueProposition}
		<ValueProposition
			heading={data.valueProposition.heading}
			cards={data.valueProposition.cards}
			background="bg-transparent"
		/>
	{/if}

	<!-- How It Works -->
	{#if data.howItWorks.length > 0}
		<HowItWorks steps={data.howItWorks} background="bg-transparent" />
	{/if}

	<!-- Catalog + Proof teasers -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="grid gap-6 md:grid-cols-2">
				<a
					href="/ai-services/agents/"
					class="group rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card transition-shadow hover:shadow-lg"
				>
					<div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#216fed1a] text-[#216fed]">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
						</svg>
					</div>
					<h3 class="mt-5 text-xl font-bold text-[#282876] group-hover:text-[#216fed]">
						Browse the agent catalog
					</h3>
					<p class="mt-3 text-base leading-7 text-[#8181ac]">
						Every agent we build, tagged by practice area and function. Filter to find what fits your firm.
					</p>
					<span class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#216fed]">
						See the catalog
						<svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</span>
				</a>

				<a
					href="/ai-services/our-agents/"
					class="group rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card transition-shadow hover:shadow-lg"
				>
					<div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#836ae41a] text-[#836ae4]">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
						</svg>
					</div>
					<h3 class="mt-5 text-xl font-bold text-[#282876] group-hover:text-[#836ae4]">
						See the 13 agents we run on ourselves
					</h3>
					<p class="mt-3 text-base leading-7 text-[#8181ac]">
						Every morning, 13 custom agents process our inbox, outreach, account health, churn signals, and more. The playbook your firm gets is one we already run in production.
					</p>
					<span class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#836ae4]">
						See our agents
						<svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</span>
				</a>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} sectionTitle="AI Services: Asked & Answered" background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- CTA -->
<CTASection />
