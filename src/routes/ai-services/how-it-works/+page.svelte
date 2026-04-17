<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { stripLinks } from '$lib/utils/linkify.js';
	import data from '$lib/data/services/ai-services/how-it-works.json';

	let HeroAnimation = $state(null);
	onMount(async () => {
		const mod = await import('$lib/components/hero/HowItWorksHeroAnimation.svelte');
		HeroAnimation = mod.default;
	});

	const breadcrumbs = [
		{ name: 'Home', href: '/' },
		{ name: 'AI Services', href: '/ai-services/' },
		{ name: 'How It Works' }
	];

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'HowTo',
			name: data.engagement.heading,
			description: data.engagement.intro,
			step: data.engagement.phases.map((p, i) => ({
				'@type': 'HowToStep',
				position: i + 1,
				name: p.title,
				text: `${p.summary} (${p.duration})`
			}))
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
				item: `https://www.dodon.ai${item.href || data.seo.canonical}`
			}))
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
		}
	];
</script>

<SEOHead
	title={data.seo.title}
	description={data.seo.description}
	url={data.seo.canonical}
	{jsonLd}
/>

<BlobBackground>
	<section class="bg-transparent pt-10 sm:pt-12">
		<div class="mx-auto w-[85%] max-w-[1250px]">
			<BreadcrumbNav items={breadcrumbs} url={data.seo.canonical} />
		</div>
	</section>

	<ServiceHero
		headline={data.hero.headline}
		subheadline={data.hero.subheadline}
		ctaText={data.hero.ctaText}
		ctaUrl={data.hero.ctaUrl}
		secondaryCtaText={data.hero.secondaryCtaText}
		secondaryCtaUrl={data.hero.secondaryCtaUrl}
		background="bg-transparent"
	>
		{#if HeroAnimation}
			{@const Comp = HeroAnimation}
			<Comp />
		{:else}
			<div style="height: 500px" aria-hidden="true"></div>
		{/if}
	</ServiceHero>

	<ContentSection
		heading={data.paralegalTest.heading}
		paragraphs={data.paralegalTest.paragraphs}
		background="bg-transparent"
	/>

	<ValueProposition
		heading={data.architecture.heading}
		cards={data.architecture.cards}
		columns={2}
		background="bg-transparent"
	/>

	<!-- Engagement: Blueprint, Build, Managed -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{data.engagement.heading}
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					{data.engagement.intro}
				</p>
			</div>

			<div class="mt-16 space-y-8">
				{#each data.engagement.phases as phase, i}
					<div class="rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card sm:p-10">
						<div class="flex flex-wrap items-baseline justify-between gap-4">
							<div class="flex items-baseline gap-4">
								<span
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#216fed] text-base font-bold text-white shadow-md"
								>
									{i + 1}
								</span>
								<h3 class="text-2xl font-bold text-[#282876]">{phase.title}</h3>
							</div>
							<span class="text-sm font-semibold uppercase tracking-wider text-[#836ae4]">
								{phase.duration}
							</span>
						</div>
						<p class="mt-4 text-base leading-7 text-[#8181ac] sm:text-lg">{phase.summary}</p>
						<ul class="mt-6 space-y-3">
							{#each phase.details as detail}
								<li class="flex items-start gap-3">
									<img
										src="/images/brand/checkmark.svg"
										alt=""
										class="mt-1 h-5 w-5 flex-shrink-0"
										aria-hidden="true"
									/>
									<span class="text-base leading-7 text-[#8181ac]">{detail}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Engagement tiers: Crawl, Walk, Run -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{data.tiers.heading}
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					{data.tiers.intro}
				</p>
			</div>

			<div class="mt-16 grid gap-6 md:grid-cols-3">
				{#each data.tiers.cards as card}
					<div class="flex h-full flex-col rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card">
						<h3 class="text-lg font-bold text-[#282876]">{card.title}</h3>
						<p class="mt-3 text-sm leading-relaxed text-[#8181ac]">{card.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<FAQAccordion items={data.faq} background="bg-transparent" />
</BlobBackground>

<CTASection />
