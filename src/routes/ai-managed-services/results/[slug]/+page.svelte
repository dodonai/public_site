<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import StatStrip from '$lib/components/ai-managed-services/StatStrip.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { aiServicesPracticeAreas } from '$lib/data/navigation.js';

	let { data } = $props();
	const study = $derived(data.study);

	const canonical = $derived(`/ai-managed-services/results/${study.slug}/`);
	const practiceAreaLink = $derived(
		aiServicesPracticeAreas.find((a) => a.slug === study.practiceAreaSlug) ?? null
	);

	const breadcrumbs = $derived([
		{ name: 'Home', href: '/' },
		{ name: 'AI Managed Services', href: '/ai-managed-services/' },
		{ name: 'Results', href: '/ai-managed-services/results/' },
		{ name: study.practiceArea }
	]);

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: study.headline,
			description: study.summary,
			about: `AI Managed Services engagement for a ${study.practiceArea.toLowerCase()} firm`,
			author: { '@type': 'Organization', name: 'Dodonai, Inc.', url: 'https://www.dodon.ai' },
			publisher: { '@type': 'Organization', name: 'Dodonai, Inc.', url: 'https://www.dodon.ai' }
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
		}
	]);
</script>

<SEOHead title={study.seo.title} description={study.seo.description} url={canonical} {jsonLd} />

<BlobBackground>
	<section class="bg-transparent pt-10 sm:pt-12">
		<div class="mx-auto w-[85%] max-w-[1250px]">
			<BreadcrumbNav items={breadcrumbs} url={canonical} />
		</div>
	</section>

	<ServiceHero
		headline={study.headline}
		subheadline={study.descriptor}
		ctaText="Book a working call"
		ctaUrl="https://calendly.com/nick-dodonai"
		secondaryCtaText="See how engagements run"
		secondaryCtaUrl="/ai-managed-services/how-it-works/"
		background="bg-transparent"
	/>

	<!-- Stat strip -->
	<section class="bg-transparent pb-4">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<StatStrip stats={study.statStrip} />
		</div>
	</section>

	<!-- The starting state -->
	<ContentSection
		heading={study.problem.heading}
		paragraphs={study.problem.paragraphs}
		background="bg-transparent"
	/>

	<!-- What we built -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
				{study.built.heading}
			</h2>
			<p class="mt-8 text-base leading-7 text-[#8181ac] sm:text-lg">{study.built.intro}</p>
			<div class="mt-8 flex flex-wrap gap-3">
				{#each study.built.agents as agent}
					{#if agent.slug}
						<a
							href="/ai-managed-services/agents/{agent.slug}/"
							class="inline-flex items-center gap-2 rounded-full border border-[#216fed33] bg-white px-4 py-2 text-sm font-semibold text-[#216fed] shadow-brand-card transition-colors hover:bg-[#216fed1a]"
						>
							{agent.name}
							<svg
								class="h-3.5 w-3.5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
					{:else}
						<span
							class="inline-flex items-center rounded-full border border-[#dcddf340] bg-white px-4 py-2 text-sm font-medium text-[#282876] shadow-brand-card"
						>
							{agent.name}
						</span>
					{/if}
				{/each}
			</div>
		</div>
	</section>

	<!-- What changed -->
	<section class="bg-transparent pb-20 sm:pb-28">
		<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
				{study.results.heading}
			</h2>
			<ul class="mt-8 space-y-4">
				{#each study.results.items as item}
					<li class="flex items-start gap-3 text-[#282876]">
						<img
							src="/images/brand/checkmark.svg"
							alt=""
							class="mt-1 h-5 w-5 flex-shrink-0"
							aria-hidden="true"
						/>
						<span class="text-base leading-7 sm:text-lg">{item}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Engagement arc -->
	<section class="bg-transparent pb-20 sm:pb-28">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<h2 class="text-center text-2xl font-extrabold tracking-tight text-[#282876] sm:text-3xl">
				How the engagement ran
			</h2>
			<div class="mt-10 grid gap-6 sm:grid-cols-3">
				<div class="rounded-2xl border border-[#dcddf340] bg-white p-6 shadow-brand-card">
					<div class="text-xs font-semibold uppercase tracking-wider text-[#216fed]">Discovery</div>
					<div class="mt-2 text-lg font-bold text-[#282876]">{study.engagementArc.discovery}</div>
				</div>
				<div class="rounded-2xl border border-[#dcddf340] bg-white p-6 shadow-brand-card">
					<div class="text-xs font-semibold uppercase tracking-wider text-[#216fed]">Build</div>
					<div class="mt-2 text-lg font-bold text-[#282876]">{study.engagementArc.build}</div>
				</div>
				<div class="rounded-2xl border border-[#dcddf340] bg-white p-6 shadow-brand-card">
					<div class="text-xs font-semibold uppercase tracking-wider text-[#216fed]">Managed</div>
					<div class="mt-2 text-lg font-bold text-[#282876]">{study.engagementArc.retainer}</div>
				</div>
			</div>

			{#if practiceAreaLink}
				<div class="mt-10 text-center">
					<a
						href={practiceAreaLink.href}
						class="text-sm font-medium text-[#216fed] hover:underline"
					>
						See all agents we build for {practiceAreaLink.name.toLowerCase()} firms →
					</a>
				</div>
			{/if}
		</div>
	</section>
</BlobBackground>

<CTASection
	headline="Could this be your firm?"
	description="Start with a 45-minute working call. We walk through your stack and your top workflows, then scope a Discovery Audit if it's a fit."
/>
