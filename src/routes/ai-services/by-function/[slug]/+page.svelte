<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import AgentCard from '$lib/components/ai-services/AgentCard.svelte';

	let HeroAnimation = $state(null);
	onMount(async () => {
		const mod = await import('$lib/components/hero/FunctionHeroAnimation.svelte');
		HeroAnimation = mod.default;
	});

	let { data } = $props();
	const fn = $derived(data.fn);
	const customData = $derived(data.customData);
	const agents = $derived(data.agents);

	const title = $derived(customData?.seo?.title ?? `${fn.name}: AI Agents for Law Firms | Dodonai`);
	const description = $derived(
		customData?.seo?.description ??
			`AI agents that handle ${fn.name.toLowerCase()} work inside a law firm. Designed, built, and run by Dodonai around how your team already operates.`
	);
	const canonical = $derived(`/ai-services/by-function/${fn.slug}/`);

	const heroHeadline = $derived(customData?.hero?.headline ?? `AI Agents for ${fn.name}`);
	const heroSubheadline = $derived(
		customData?.hero?.subheadline ??
			`Custom agents that handle the ${fn.name.toLowerCase()} work your team does every week. Deployed with your data, in your account, with the same safety guardrails we use on ourselves.`
	);

	const breadcrumbs = $derived([
		{ name: 'Home', href: '/' },
		{ name: 'AI Services', href: '/ai-services/' },
		{ name: fn.name }
	]);

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: title,
			description,
			serviceType: `AI ${fn.name} Services for Legal Teams`,
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
			name: `${fn.name} AI agents`,
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
		ctaText="Start a Fit Call"
		ctaUrl={`mailto:hello@dodon.ai?subject=AI%20Services%20Fit%20Call%20-%20${encodeURIComponent(fn.name)}`}
		secondaryCtaText="Browse All Agents"
		secondaryCtaUrl="/ai-services/agents/"
		background="bg-transparent"
	>
		{#if HeroAnimation}
			{@const Comp = HeroAnimation}
			<Comp slug={fn.slug} />
		{:else}
			<div style="height: 500px" aria-hidden="true"></div>
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

	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{customData?.agentRelevance?.heading ?? `${fn.name} agents`}
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					{customData?.agentRelevance?.intro ?? `${agents.length} ${agents.length === 1 ? 'agent' : 'agents'} in this function. Each is tuned to how your firm already operates.`}
				</p>
			</div>

			{#if agents.length > 0}
				<div class="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each agents as agent}
						<AgentCard {agent} />
					{/each}
				</div>
			{:else}
				<p class="mt-16 text-center text-[#8181ac]">
					Agents in this function are being added. Email <a href="mailto:hello@dodon.ai" class="font-medium text-[#216fed] hover:underline">hello@dodon.ai</a> if you want to talk through what would fit your firm.
				</p>
			{/if}
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

<CTASection />
