<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import LeadMagnetSection from '$lib/components/cta/LeadMagnetSection.svelte';
	import AgentCard from '$lib/components/ai-services/AgentCard.svelte';
	import { aiServicesFunctions } from '$lib/data/navigation.js';

	let HeroAnimation = $state(null);
	onMount(async () => {
		const mod = await import('$lib/components/hero/PracticeAreaHeroAnimation.svelte');
		HeroAnimation = mod.default;
	});

	const AREA_PHOTOS = {
		'personal-injury':      { src: '/images/people/attorney-serious-1.webp',       alt: 'Personal injury attorney reviewing a case file', portrait: true },
		'family-law':           { src: '/images/people/attorney-consultation-1.webp',   alt: 'Family law attorney consulting with a client',   portrait: false },
		'immigration':          { src: '/images/people/attorney-headshot-2.webp',       alt: 'Immigration attorney professional headshot',     portrait: true },
		'real-estate':          { src: '/images/people/attorney-office-1.webp',         alt: 'Real estate attorney at their desk',             portrait: false },
		'estates-probate':      { src: '/images/people/attorney-headshot-1.webp',       alt: 'Estates and probate attorney',                   portrait: true },
		'tax':                  { src: '/images/people/attorney-serious-1.webp',        alt: 'Tax attorney reviewing documents',               portrait: true },
		'cybersecurity-privacy':{ src: '/images/people/legal-team-meeting-1.webp',      alt: 'Legal team reviewing cybersecurity obligations', portrait: false },
	};

	let { data } = $props();
	const area = $derived(data.area);
	const customData = $derived(data.customData);
	const agents = $derived(data.agents);
	const areaPhoto = $derived(AREA_PHOTOS[area.slug] ?? { src: '/images/people/attorney-headshot-1.webp', alt: 'Legal professional', portrait: true });

	const title = $derived(customData?.seo?.title ?? `AI Services for ${area.name} Firms | Dodonai`);
	const description = $derived(
		customData?.seo?.description ??
			`Custom AI agents designed around how ${area.name.toLowerCase()} firms actually operate. Intake, deadlines, client comms, casework, drafting.`
	);
	const canonical = $derived(`/ai-services/for/${area.slug}/`);

	const heroHeadline = $derived(customData?.hero?.headline ?? `AI Services for ${area.name} Firms`);
	const heroSubheadline = $derived(
		customData?.hero?.subheadline ??
			`We design, build, and run custom AI agents tuned to ${area.name.toLowerCase()} practice. You get the workflows your team actually needs, deployed with the same safety guardrails we use on ourselves.`
	);

	const breadcrumbs = $derived([
		{ name: 'Home', href: '/' },
		{ name: 'AI Services', href: '/ai-services/' },
		{ name: area.name }
	]);

	const functionOrder = aiServicesFunctions.map((f) => f.slug);
	const groupedFunctions = $derived.by(() => {
		const agentsByFunction = {};
		for (const a of agents) {
			if (!agentsByFunction[a.function]) agentsByFunction[a.function] = [];
			agentsByFunction[a.function].push(a);
		}
		return functionOrder
			.map((slug) => ({
				info: aiServicesFunctions.find((f) => f.slug === slug),
				agents: agentsByFunction[slug] ?? []
			}))
			.filter((g) => g.agents.length > 0);
	});

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: title,
			description,
			serviceType: `AI Implementation Services for ${area.name} Firms`,
			provider: {
				'@type': 'Organization',
				name: 'Dodonai, Inc.',
				url: 'https://www.dodon.ai'
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
				item: `https://www.dodon.ai${item.href || canonical}`
			}))
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: `AI agents for ${area.name} firms`,
			itemListElement: agents.map((a, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: a.title,
				url: `https://www.dodon.ai/ai-services/agents/${a.slug}/`
			}))
		}
	]);
</script>

<SEOHead {title} {description} url={canonical} {jsonLd} />

<BlobBackground>
	<section class="bg-transparent pt-10 sm:pt-12">
		<div class="mx-auto w-[85%] max-w-[1250px]">
			<BreadcrumbNav items={breadcrumbs} url={canonical} />
		</div>
	</section>

	<ServiceHero
		headline={heroHeadline}
		subheadline={heroSubheadline}
		ctaText="Book an intro call"
		ctaUrl="https://calendly.com/nick-dodonai"
		secondaryCtaText="Browse All Agents"
		secondaryCtaUrl="/ai-services/agents/"
		guarantee="Blueprint refunded if we don't leave you with a clear path forward."
		background="bg-transparent"
	>
		{#if HeroAnimation}
			{@const Comp = HeroAnimation}
			<Comp slug={area.slug} />
		{:else}
			<div style="height: 540px" aria-hidden="true"></div>
		{/if}
	</ServiceHero>

	{#if customData?.scenario}
		<ContentSection
			heading={customData.scenario.heading}
			paragraphs={customData.scenario.paragraphs}
			background="bg-transparent"
		/>
	{/if}

	{#if customData?.whyAi}
		<ContentSection
			heading={customData.whyAi.heading}
			paragraphs={customData.whyAi.paragraphs}
			background="bg-transparent"
		/>
	{/if}

	<!-- Legal expertise strip -->
	<section class="bg-white py-16 sm:py-20">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:gap-14">
				<div class="flex-shrink-0">
					{#if areaPhoto.portrait}
						<img
							src={areaPhoto.src}
							alt={areaPhoto.alt}
							width="260"
							height="310"
							loading="lazy"
							class="h-[280px] w-[220px] rounded-2xl object-cover object-top shadow-lg sm:h-[310px] sm:w-[260px]"
						/>
					{:else}
						<img
							src={areaPhoto.src}
							alt={areaPhoto.alt}
							width="380"
							height="260"
							loading="lazy"
							class="h-[220px] w-[320px] rounded-2xl object-cover object-center shadow-lg sm:h-[260px] sm:w-[380px]"
						/>
					{/if}
				</div>
				<div class="max-w-xl">
					<p class="text-sm font-semibold uppercase tracking-widest text-[#836ae4]">Legal expertise first. AI second.</p>
					<h2 class="mt-4 text-2xl font-extrabold leading-snug text-[#282876] sm:text-3xl">
						Built around how {area.name.toLowerCase()} firms actually work.
					</h2>
					<p class="mt-5 text-base leading-7 text-[#8181ac]">
						The agents below aren't generic. They're scoped to your intake patterns, your matter mix, and your team's review habits. We spend the first two weeks inside your workflows before we write a single prompt — because agents that don't fit how you work don't get used.
					</p>
					<a href="/ai-services/how-it-works/" class="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#216fed] hover:underline">
						See how an engagement works →
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Relevant agents, grouped by function -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{customData?.agentRelevance?.heading ?? `Agents we've built for ${area.name.toLowerCase()} practices`}
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					{customData?.agentRelevance?.intro ?? `${agents.length} agents apply to ${area.name.toLowerCase()} firms. Most teams start with 2 or 3 and expand from there.`}
				</p>
			</div>

			<div class="mt-16 space-y-16">
				{#each groupedFunctions as group}
					<div>
						<div class="mb-6 flex items-baseline justify-between">
							<h3 class="text-xl font-bold text-[#282876]">{group.info.name}</h3>
							<a
								href={group.info.href}
								class="text-sm font-medium text-[#216fed] hover:underline"
							>
								See function overview →
							</a>
						</div>
						<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{#each group.agents as agent}
								<AgentCard {agent} />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	{#if customData?.engagementPath}
		<ContentSection
			heading={customData.engagementPath.heading}
			paragraphs={customData.engagementPath.paragraphs}
			background="bg-transparent"
		/>
	{/if}

	{#if customData?.faq && customData.faq.length > 0}
		<FAQAccordion items={customData.faq} background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- Lead magnet: Going (AI) Native guide -->
<LeadMagnetSection />

<CTASection />
