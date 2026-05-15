<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { stripLinks } from '$lib/utils/linkify.js';
	import { aiServicesPracticeAreas, aiServicesFunctions } from '$lib/data/navigation.js';

	let { data } = $props();
	const agent = $derived(data.agent);

	let HeroAnimation = $state(null);
	onMount(async () => {
		const mod = await import('$lib/components/hero/AgentWorkflowAnimation.svelte');
		HeroAnimation = mod.default;
	});

	const practiceAreaMap = Object.fromEntries(
		aiServicesPracticeAreas.map((a) => [a.slug, a])
	);
	const functionMap = Object.fromEntries(
		aiServicesFunctions.map((f) => [f.slug, f])
	);

	const functionInfo = $derived(functionMap[agent.function]);

	// "All" is a special pseudo-slug meaning the agent applies broadly.
	// It renders as an untagged badge linking to the catalog.
	const practiceAreaBadges = $derived(
		agent.practiceAreas
			.map((slug) => {
				if (slug === 'all') {
					return { name: 'All Practice Areas', href: '/ai-services/agents/' };
				}
				const area = practiceAreaMap[slug];
				return area ? { name: area.name, href: area.href } : null;
			})
			.filter(Boolean)
	);

	const breadcrumbs = $derived([
		{ name: 'Home', href: '/' },
		{ name: 'AI Services', href: '/ai-services/' },
		{ name: 'Browse All Agents', href: '/ai-services/agents/' },
		{ name: agent.title }
	]);

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: agent.title,
			description: agent.seo.description,
			serviceType: 'AI Agent for Legal Teams',
			provider: {
				'@type': 'Organization',
				name: 'Dodonai, Inc.',
				url: 'https://www.dodon.ai'
			},
			url: `https://www.dodon.ai${agent.seo.canonical}`
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
				item: `https://www.dodon.ai${item.href || agent.seo.canonical}`
			}))
		},
		...(agent.faq && agent.faq.length > 0
			? [
					{
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: agent.faq.map((item) => ({
							'@type': 'Question',
							name: item.question,
							acceptedAnswer: {
								'@type': 'Answer',
								text: stripLinks(item.answer)
							}
						}))
					}
				]
			: [])
	]);
</script>

<SEOHead
	title={agent.seo.title}
	description={agent.seo.description}
	url={agent.seo.canonical}
	{jsonLd}
/>

<BlobBackground>
	<!-- Hero with breadcrumbs -->
	<section class="bg-transparent pt-10 sm:pt-12">
		<div class="mx-auto w-[85%] max-w-[1250px]">
			<BreadcrumbNav items={breadcrumbs} url={agent.seo.canonical} />
		</div>
	</section>

	<ServiceHero
		headline={agent.hero.headline}
		subheadline={agent.hero.subheadline}
		bullets={agent.hero.bullets}
		ctaText={agent.hero.ctaText}
		ctaUrl={agent.hero.ctaUrl}
		secondaryCtaText={agent.hero.secondaryCtaText}
		secondaryCtaUrl={agent.hero.secondaryCtaUrl}
		badges={agent.hero.badges}
		guarantee={agent.hero.guarantee}
		background="bg-transparent"
	>
		{#if HeroAnimation && agent.workflow}
			{@const Comp = HeroAnimation}
			<Comp workflow={agent.workflow} title={agent.title} />
		{:else}
			<div style="height: 540px" aria-hidden="true"></div>
		{/if}
	</ServiceHero>

	<!-- Scenario -->
	{#if agent.scenario}
		<ContentSection
			heading={agent.scenario.heading}
			paragraphs={agent.scenario.paragraphs}
			background="bg-transparent"
		/>
	{/if}

	<!-- What it does -->
	{#if agent.whatItDoes}
		<section class="bg-transparent py-20 sm:py-28">
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{agent.whatItDoes.heading}
				</h2>
				{#if agent.whatItDoes.paragraphs}
					<div class="mt-8 space-y-6">
						{#each agent.whatItDoes.paragraphs as paragraph}
							<p class="text-base leading-7 text-[#8181ac] sm:text-lg">{paragraph}</p>
						{/each}
					</div>
				{/if}
				{#if agent.whatItDoes.bullets}
					<ul class="mt-8 space-y-3">
						{#each agent.whatItDoes.bullets as bullet}
							<li class="flex items-start gap-3">
								<img src="/images/brand/checkmark.svg" alt="" class="mt-1 h-5 w-5 flex-shrink-0" aria-hidden="true" />
								<span class="text-base leading-7 text-[#8181ac] sm:text-lg">{bullet}</span>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</section>
	{/if}

	<!-- Inputs and outputs -->
	{#if agent.inputsOutputs}
		<section class="bg-transparent py-20 sm:py-28">
			<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<h2 class="text-center text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{agent.inputsOutputs.heading}
				</h2>
				<div class="mt-12 grid gap-8 md:grid-cols-2">
					<div class="rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card">
						<h3 class="text-sm font-semibold uppercase tracking-wider text-[#836ae4]">Inputs</h3>
						<ul class="mt-4 space-y-3">
							{#each agent.inputsOutputs.inputs as item}
								<li class="flex items-start gap-3 text-[#282876]">
									<span class="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#836ae4]"></span>
									<span class="text-base">{item}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div class="rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card">
						<h3 class="text-sm font-semibold uppercase tracking-wider text-[#216fed]">Outputs</h3>
						<ul class="mt-4 space-y-3">
							{#each agent.inputsOutputs.outputs as item}
								<li class="flex items-start gap-3 text-[#282876]">
									<span class="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#216fed]"></span>
									<span class="text-base">{item}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</section>
	{/if}

	<!-- Integrations -->
	{#if agent.integrations && agent.integrations.length > 0}
		<section class="bg-transparent py-20 sm:py-28">
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Integrations
				</h2>
				<ul class="mt-8 flex flex-wrap gap-3">
					{#each agent.integrations as integration}
						<li class="rounded-full border border-[#282876]/10 bg-white px-4 py-2 text-sm font-medium text-[#282876]">
							{integration}
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}

	<!-- Built from these legal skills (supporting agents) -->
	{#if agent.tier === 'supporting' && agent.caseSkills && agent.caseSkills.length > 0}
		<section class="bg-transparent py-20 sm:py-28">
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Built from these legal skills
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					Each skill is a battle-tested template that codifies how your team already handles this kind of work. The agent orchestrates them into an end-to-end output.
				</p>
				<ul class="mt-8 space-y-2">
					{#each agent.caseSkills as skill}
						<li class="flex items-start gap-3 text-[#282876]">
							<svg class="mt-1 h-5 w-5 flex-shrink-0 text-[#836ae4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
							</svg>
							<code class="rounded bg-[#f4f5fd] px-2 py-0.5 font-mono text-sm text-[#282876]">{skill}</code>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}

	<!-- Practice-area fit -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
				Practice-area fit
			</h2>
			<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
				Every engagement tunes the agent to your firm's specific matter mix. The areas below are where we've seen this agent fit most naturally.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				{#each practiceAreaBadges as badge}
					<a
						href={badge.href}
						class="rounded-full border border-[#836ae4]/30 bg-[#836ae41a] px-4 py-2 text-sm font-medium text-[#836ae4] transition-colors hover:bg-[#836ae433]"
					>
						{badge.name}
					</a>
				{/each}
			</div>
			{#if functionInfo}
				<div class="mt-10">
					<h3 class="text-sm font-semibold uppercase tracking-wider text-[#8181ac]">Function</h3>
					<div class="mt-3">
						<a
							href={functionInfo.href}
							class="inline-flex items-center gap-2 rounded-full border border-[#216fed]/30 bg-[#216fed1a] px-4 py-2 text-sm font-medium text-[#216fed] transition-colors hover:bg-[#216fed26]"
						>
							{functionInfo.name}
						</a>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Safety posture -->
	{#if agent.safety}
		<ContentSection
			heading={agent.safety.heading}
			paragraphs={agent.safety.paragraphs}
			background="bg-transparent"
		/>
	{/if}

	<!-- FAQ -->
	{#if agent.faq && agent.faq.length > 0}
		<FAQAccordion items={agent.faq} background="bg-transparent" />
	{/if}
</BlobBackground>

<CTASection />
