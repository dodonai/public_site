<script>
	import { onMount } from 'svelte';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import LeadMagnetSection from '$lib/components/cta/LeadMagnetSection.svelte';
	import data from '$lib/data/services/ai-services/our-agents.json';

	let HeroAnimation = $state(null);
	onMount(async () => {
		const mod = await import('$lib/components/hero/OurAgentsHeroAnimation.svelte');
		HeroAnimation = mod.default;
	});

	const breadcrumbs = [
		{ name: 'Home', href: '/' },
		{ name: 'AI Services', href: '/ai-services/' },
		{ name: 'Our Agents' }
	];

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: data.seo.title,
			description: data.seo.description,
			author: {
				'@type': 'Organization',
				name: 'Dodonai, Inc.',
				url: 'https://www.dodon.ai'
			},
			publisher: {
				'@type': 'Organization',
				name: 'Dodonai, Inc.',
				url: 'https://www.dodon.ai'
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `https://www.dodon.ai${data.seo.canonical}`
			}
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
			'@type': 'ItemList',
			name: 'The AI agents Dodonai runs in production',
			itemListElement: data.morning.events.map((e, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: e.agent
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
		guarantee={data.hero.guarantee}
		background="bg-transparent"
	>
		{#if HeroAnimation}
			{@const Comp = HeroAnimation}
			<Comp />
		{:else}
			<div style="height: 560px" aria-hidden="true"></div>
		{/if}
	</ServiceHero>

	<!-- The morning timeline -->
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					{data.morning.heading}
				</h2>
				<p class="mt-6 text-base leading-7 text-[#8181ac] sm:text-lg">
					{data.morning.intro}
				</p>
			</div>

			<ol class="relative mt-16 space-y-6 border-l-2 border-[#216fed33] pl-6 sm:space-y-8 sm:pl-10">
				{#each data.morning.events as event, i}
					<li class="relative">
						<span
							class="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-[#216fed] text-[10px] font-bold text-white shadow-md sm:-left-[47px] sm:h-6 sm:w-6 sm:text-xs"
						>
							{i + 1}
						</span>
						<div
							class="rounded-2xl border border-[#dcddf340] bg-white p-6 shadow-brand-card sm:p-8"
						>
							<div
								class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
							>
								<h3 class="text-lg font-bold text-[#282876]">{event.agent}</h3>
								<span
									class="text-sm font-semibold uppercase tracking-wider text-[#836ae4]"
								>
									{event.time}
								</span>
							</div>
							<p class="mt-3 text-sm leading-6 text-[#8181ac] sm:text-base sm:leading-7">
								{event.description}
							</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<ContentSection
		heading={data.translation.heading}
		paragraphs={data.translation.paragraphs}
		background="bg-transparent"
	/>

	<ContentSection
		heading={data.proof.heading}
		paragraphs={data.proof.paragraphs}
		background="bg-transparent"
	/>
</BlobBackground>

<!-- Human proof strip: professional photo + the "real firm" signal -->
<section class="bg-white py-16 sm:py-20">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:gap-14">
			<div class="flex-shrink-0">
				<img
					src="/images/people/legal-team-meeting-1.webp"
					alt="Legal professionals reviewing work together"
					width="320"
					height="260"
					loading="lazy"
					class="h-[220px] w-[320px] rounded-2xl object-cover object-center shadow-lg sm:h-[260px] sm:w-[380px]"
				/>
			</div>
			<div class="max-w-xl">
				<p class="text-sm font-semibold uppercase tracking-widest text-[#836ae4]">Built on real practice</p>
				<blockquote class="mt-4 text-2xl font-bold leading-snug text-[#282876] sm:text-3xl">
					"We don't sell workflows we drew on a whiteboard. Every agent in this catalog runs inside our own company, every morning."
				</blockquote>
				<p class="mt-5 text-base text-[#8181ac]">
					The playbook we give your firm is the same one we've stress-tested on our own inbox, account health signals, and client ops — with real data, real edge cases, and real consequences when it breaks. That's the proof you can't get from a demo.
				</p>
				<p class="mt-5 text-sm font-semibold text-[#282876]">
					The Dodonai Team
					<span class="ml-2 font-normal text-[#8181ac]">· AI Services for Legal Teams</span>
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Lead magnet: Going (AI) Native guide -->
<LeadMagnetSection background="bg-[#f4f5fd]" />

<CTASection
	headline="Want this architecture inside your firm?"
	description="Email hello@dodon.ai or book an intro call. We'll start by figuring out which 1 workflow makes you groan every week. That's your first agent."
/>
