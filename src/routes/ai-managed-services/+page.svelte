<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import StatStrip from '$lib/components/ai-managed-services/StatStrip.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import LeadMagnetSection from '$lib/components/cta/LeadMagnetSection.svelte';
	import { stripLinks, linkify } from '$lib/utils/linkify.js';
	import data from '$lib/data/services/ai-services.json';
	import packages from '$lib/data/services/ai-services/packages.json';
	import { aiServicesPracticeAreas, aiServicesFunctions } from '$lib/data/navigation.js';

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
				{
					'@type': 'ListItem',
					position: 2,
					name: 'AI Managed Services',
					item: `https://www.dodon.ai${data.seo.canonical}`
				}
			]
		},
		{
			'@context': 'https://schema.org',
			'@type': 'HowTo',
			name: 'How Dodonai AI Managed Services Engagements Work',
			step: data.howItWorks.map((s, i) => ({
				'@type': 'HowToStep',
				position: i + 1,
				name: s.title,
				text: stripLinks(s.description)
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
			<div style="height: 540px" aria-hidden="true"></div>
		{/if}
	</ServiceHero>

	<!-- Headliner metrics (overview-style row, below the hero) -->
	{#if data.proof?.stats}
		<section class="bg-transparent pb-12 pt-2 sm:pb-16">
			<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<StatStrip stats={data.proof.stats} columns={4} />
			</div>
		</section>
	{/if}

	<!-- Positioning: the missing middle -->
	{#if data.positioning}
		<section class="bg-transparent pb-20 sm:pb-28">
			<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
						{data.positioning.heading}
					</h2>
					<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
						{data.positioning.intro}
					</p>
				</div>

				<div class="mt-16 grid gap-6 md:grid-cols-3">
					{#each data.positioning.cards as card}
						<div
							class="flex h-full flex-col rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card"
						>
							<h3 class="text-lg font-bold text-[#282876]">{card.title}</h3>
							<p class="mt-3 text-sm leading-relaxed text-[#8181ac]">{card.description}</p>
						</div>
					{/each}
				</div>

				{#if data.positioning.closer}
					<p class="mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-[#8181ac]">
						{data.positioning.closer}
					</p>
				{/if}
			</div>
		</section>
	{/if}

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

	<!-- Example deliverables (packaged builds) -->
	<section class="bg-transparent pb-20 sm:pb-28">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Example deliverables
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					Packaged builds firms start from. Each one is fixed scope with a defined exit point —
					blend two or three, or assemble agents à la carte.
				</p>
			</div>

			<div class="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each packages.packages as pkg}
					<div
						class="flex h-full flex-col rounded-2xl border border-[#dcddf340] bg-white p-6 shadow-brand-card"
					>
						<div class="flex items-start justify-between gap-3">
							<h3 class="text-lg font-bold leading-snug text-[#282876]">{pkg.name}</h3>
							{#if pkg.tag}
								<span
									class="shrink-0 rounded-full bg-[#836ae41a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#836ae4]"
								>
									{pkg.tag}
								</span>
							{/if}
						</div>
						<p class="mt-3 text-sm leading-6 text-[#8181ac]">{pkg.whatYouGet}</p>
						<div class="mt-auto pt-5">
							<span
								class="inline-flex items-center rounded-full bg-[#216fed1a] px-3 py-1 text-xs font-semibold text-[#216fed]"
							>
								{pkg.duration}
							</span>
						</div>
					</div>
				{/each}
			</div>

			<p class="mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-[#8181ac]">
				{@html linkify(packages.alaCarte.paragraphs[1])}
			</p>
		</div>
	</section>

	<!-- Pricing -->
	{#if packages.pricing}
		<section class="bg-transparent pb-20 sm:pb-28">
			<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{packages.pricing.heading}
				</h2>
				<div class="mt-8 space-y-6">
					{#each packages.pricing.paragraphs as p}
						<p class="text-base leading-7 text-[#8181ac] sm:text-lg">{p}</p>
					{/each}
				</div>
				{#if packages.pricing.note}
					<p
						class="mt-8 rounded-2xl border border-[#dcddf340] bg-white p-6 text-sm leading-7 text-[#282876] shadow-brand-card"
					>
						{packages.pricing.note}
					</p>
				{/if}
			</div>
		</section>
	{/if}

	<!-- How we de-risk this -->
	{#if packages.deRisk}
		<ValueProposition
			heading={packages.deRisk.heading}
			cards={packages.deRisk.cards}
			background="bg-transparent"
		/>
	{/if}

	<!-- Browse by practice area / function -->
	<section class="bg-transparent pb-20 sm:pb-28">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Find what fits your firm
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					Start from your practice area, or from the kind of work you want to take off your team's
					plate.
				</p>
			</div>

			<div class="mt-12">
				<h3 class="text-sm font-semibold uppercase tracking-wider text-[#8181ac]">
					By practice area
				</h3>
				<div class="mt-4 flex flex-wrap gap-3">
					{#each aiServicesPracticeAreas as area}
						<a
							href={area.href}
							class="rounded-full border border-[#836ae4]/30 bg-[#836ae41a] px-4 py-2 text-sm font-medium text-[#836ae4] transition-colors hover:bg-[#836ae433]"
						>
							{area.name}
						</a>
					{/each}
				</div>
			</div>

			<div class="mt-10">
				<h3 class="text-sm font-semibold uppercase tracking-wider text-[#8181ac]">By function</h3>
				<div class="mt-4 flex flex-wrap gap-3">
					{#each aiServicesFunctions as fn}
						<a
							href={fn.href}
							class="rounded-full border border-[#216fed]/30 bg-[#216fed1a] px-4 py-2 text-sm font-medium text-[#216fed] transition-colors hover:bg-[#216fed26]"
						>
							{fn.name}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Destinations: results, catalog, our agents -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="grid gap-6 md:grid-cols-3">
				<a
					href="/ai-managed-services/results/"
					class="group rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card transition-shadow hover:shadow-lg"
				>
					<div
						class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#836ae41a] text-[#836ae4]"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 13.5l4.5 4.5L21 7.5M3 6.75h7.5"
							/>
						</svg>
					</div>
					<h3 class="mt-5 text-xl font-bold text-[#282876] group-hover:text-[#836ae4]">
						Representative engagements
					</h3>
					<p class="mt-3 text-base leading-7 text-[#8181ac]">
						What we've built for firms across family law, personal injury, estates, litigation, and
						Social Security disability — the agent bundles and the outcomes.
					</p>
					<span class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#836ae4]">
						See the results
						<svg
							class="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</span>
				</a>

				<a
					href="/ai-managed-services/agents/"
					class="group rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card transition-shadow hover:shadow-lg"
				>
					<div
						class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#216fed1a] text-[#216fed]"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.8"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
						</svg>
					</div>
					<h3 class="mt-5 text-xl font-bold text-[#282876] group-hover:text-[#216fed]">
						Browse the agent catalog
					</h3>
					<p class="mt-3 text-base leading-7 text-[#8181ac]">
						Every agent we build, tagged by practice area and function. Filter to find what fits
						your firm.
					</p>
					<span class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#216fed]">
						See the catalog
						<svg
							class="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</span>
				</a>

				<a
					href="/ai-managed-services/our-agents/"
					class="group rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card transition-shadow hover:shadow-lg"
				>
					<div
						class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#836ae41a] text-[#836ae4]"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"
							/>
						</svg>
					</div>
					<h3 class="mt-5 text-xl font-bold text-[#282876] group-hover:text-[#836ae4]">
						See the agents we run on ourselves
					</h3>
					<p class="mt-3 text-base leading-7 text-[#8181ac]">
						Every morning, dozens of custom agents process our inbox, outreach, account health,
						churn signals, and more. The playbook your firm gets is one we already run in
						production.
					</p>
					<span class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#836ae4]">
						See our agents
						<svg
							class="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
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
					<p class="text-sm font-semibold uppercase tracking-widest text-[#836ae4]">
						Legal experts + AI
					</p>
					<h2 class="mt-4 text-2xl font-extrabold leading-snug text-[#282876] sm:text-3xl">
						The attorney stays in every loop. The AI handles the volume.
					</h2>
					<p class="mt-5 text-base leading-7 text-[#8181ac]">
						Every agent we build creates drafts, surfaces signals, and flags deadlines — it never
						decides, sends, or files on its own. Your team reviews and approves every action. That's
						not a limitation; it's the architecture. AI handles what scales. Humans handle what
						matters.
					</p>
					<div class="mt-6 flex flex-wrap gap-4">
						<a
							href="/ai-managed-services/safety/"
							class="text-sm font-semibold text-[#216fed] hover:underline"
						>
							How we keep attorneys in control →
						</a>
						<a
							href="/ai-managed-services/our-agents/"
							class="text-sm font-semibold text-[#836ae4] hover:underline"
						>
							See our own agent stack →
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion
			items={data.faq}
			sectionTitle="AI Managed Services: Asked & Answered"
			background="bg-transparent"
		/>
	{/if}
</BlobBackground>

<!-- Lead magnet: Going (AI) Native guide -->
<LeadMagnetSection />

<!-- CTA -->
<CTASection />
