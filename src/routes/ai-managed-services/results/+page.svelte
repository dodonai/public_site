<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import StatStrip from '$lib/components/ai-managed-services/StatStrip.svelte';
	import CaseStudyCard from '$lib/components/ai-managed-services/CaseStudyCard.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { aiServicesCaseStudies } from '$lib/data/navigation.js';

	const modules = import.meta.glob('/src/lib/data/services/ai-services/case-studies/*.json', {
		eager: true
	});
	const bySlug = {};
	for (const m of Object.values(modules)) bySlug[m.default.slug] = m.default;
	const studies = aiServicesCaseStudies.map((c) => bySlug[c.slug]).filter(Boolean);

	const canonical = '/ai-managed-services/results/';
	const breadcrumbs = [
		{ name: 'Home', href: '/' },
		{ name: 'AI Managed Services', href: '/ai-managed-services/' },
		{ name: 'Results' }
	];

	const portfolioStats = [
		{ value: '250+', label: 'firms on the Dodonai platform' },
		{ value: '50+', label: 'AI agents shipped into production' },
		{ value: '8+ hrs/wk', label: 'reclaimed per attorney' },
		{ value: '$100k+/yr', label: 'in recovered capacity per attorney' },
		{ value: '10+ tools', label: 'consolidated into one system' },
		{ value: '~30%', label: 'lower software spend' }
	];
	const portfolioStatsCaption =
		'Average results across Dodonai engagements. Your numbers depend on firm size, practice area, and which agents you turn on.';

	const testimonials = [
		{
			headline: 'We get the upside of AI without having to figure it out ourselves.',
			quote:
				"They diagnose what's actually slowing the firm down, automate it, build us custom tools that fit how we already work, and then keep the whole thing running as the technology moves. That's exactly what a firm like ours needs.",
			author: '',
			role: 'Managing partner',
			company: 'mid-sized VA/NC firm (3 offices, 13 attorneys)'
		}
	];

	const jsonLd = [
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
			name: 'Representative AI Managed Services engagements',
			itemListElement: studies.map((s, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: s.headline,
				url: `https://www.dodon.ai/ai-managed-services/results/${s.slug}/`
			}))
		}
	];
</script>

<SEOHead
	title="AI Managed Services Results: Representative Law-Firm Engagements | Dodonai"
	description="Representative AI engagements across family law, personal injury, estates, litigation, and Social Security disability — anonymized and composited from the automations Dodonai has shipped."
	url={canonical}
	{jsonLd}
/>

<BlobBackground>
	<section class="bg-transparent pt-10 sm:pt-12">
		<div class="mx-auto w-[85%] max-w-[1250px]">
			<BreadcrumbNav items={breadcrumbs} url={canonical} />
		</div>
	</section>

	<ServiceHero
		headline="What we've built for firms like yours"
		subheadline="Engagements across practice areas, firm sizes, and tech stacks — each one a bundle of agents tuned to how that firm actually works."
		ctaText="Book a working call"
		ctaUrl="https://calendly.com/nick-dodonai"
		secondaryCtaText="See how engagements run"
		secondaryCtaUrl="/ai-managed-services/how-it-works/"
		background="bg-transparent"
	/>

	<!-- Portfolio proof -->
	<section class="bg-transparent pb-4">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<StatStrip stats={portfolioStats} columns={3} />
			<p class="mt-4 text-center text-xs text-[#8181ac]">{portfolioStatsCaption}</p>
		</div>
	</section>

	<!-- Case studies -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Representative engagements
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					Anonymized and composited from the automations we've shipped across firm builds. The agent
					bundles and outcomes are drawn from production work, with firm-identifying details
					removed. Full, named references are available on request once we're under NDA.
				</p>
			</div>

			<div class="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each studies as study}
					<CaseStudyCard {study} />
				{/each}
			</div>
		</div>
	</section>

	<TestimonialSection {testimonials} />
</BlobBackground>

<CTASection
	headline="Want to see what this looks like for your firm?"
	description="Start with a 45-minute working call. We walk through your stack and your top workflows — no pitch deck."
/>
