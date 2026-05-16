<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import LeadMagnetSection from '$lib/components/cta/LeadMagnetSection.svelte';
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
		guarantee={data.hero.guarantee}
		background="bg-transparent"
	>
		{#if HeroAnimation}
			{@const Comp = HeroAnimation}
			<Comp />
		{:else}
			<div style="height: 540px" aria-hidden="true"></div>
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
						See the agents we run on ourselves
					</h3>
					<p class="mt-3 text-base leading-7 text-[#8181ac]">
						Every morning, dozens of custom agents process our inbox, outreach, account health, churn signals, and more. The playbook your firm gets is one we already run in production.
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

	<!-- Human + AI experts strip -->
	<section class="bg-white py-16 sm:py-20">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:gap-14">
				<div class="flex-shrink-0">
					<img
						src="/images/people/attorney-headshot-1.webp"
						alt="Legal professional"
						width="260"
						height="310"
						loading="lazy"
						class="h-[280px] w-[220px] rounded-2xl object-cover object-top shadow-lg sm:h-[310px] sm:w-[260px]"
					/>
				</div>
				<div class="max-w-xl">
					<p class="text-sm font-semibold uppercase tracking-widest text-[#836ae4]">Legal experts + AI</p>
					<h2 class="mt-4 text-2xl font-extrabold leading-snug text-[#282876] sm:text-3xl">
						The attorney stays in every loop. The AI handles the volume.
					</h2>
					<p class="mt-5 text-base leading-7 text-[#8181ac]">
						Every agent we build creates drafts, surfaces signals, and flags deadlines — it never decides, sends, or files on its own. Your team reviews and approves every action. That's not a limitation; it's the architecture. AI handles what scales. Humans handle what matters.
					</p>
					<div class="mt-6 flex flex-wrap gap-4">
						<a href="/ai-services/safety/" class="text-sm font-semibold text-[#216fed] hover:underline">
							How we keep attorneys in control →
						</a>
						<a href="/ai-services/our-agents/" class="text-sm font-semibold text-[#836ae4] hover:underline">
							See our own agent stack →
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} sectionTitle="AI Services: Asked & Answered" background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- Lead magnet: Going (AI) Native guide -->
<LeadMagnetSection />

<!-- CTA -->
<CTASection />
