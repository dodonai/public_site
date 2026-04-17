<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import ContentSection from '$lib/components/content/ContentSection.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import data from '$lib/data/services/ai-services/our-agents.json';

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
			name: 'The 13 agents Dodonai runs in production',
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

	<section class="bg-transparent pt-10 pb-20 sm:pt-12 sm:pb-28">
		<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
			<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl lg:text-6xl">
				{data.hero.headline}
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#8181ac]">
				{data.hero.subheadline}
			</p>
			<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
				<a href={data.hero.ctaUrl} class="btn-brand-primary">{data.hero.ctaText}</a>
				<a href={data.hero.secondaryCtaUrl} class="btn-brand-outline">{data.hero.secondaryCtaText}</a>
			</div>
		</div>
	</section>

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

<CTASection
	headline="Want this architecture inside your firm?"
	description="Email hello@dodon.ai or book a 30-minute fit call. We'll start by figuring out which 1 workflow makes you groan every week. That's your first agent."
/>
