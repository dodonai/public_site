<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import MRSummaryAnimation from '$lib/components/hero/MRSummaryAnimation.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import VideoEmbed from '$lib/components/video/VideoEmbed.svelte';
	import ValueProposition from '$lib/components/features/ValueProposition.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import WorkflowComparison from '$lib/components/features/WorkflowComparison.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import RelatedServices from '$lib/components/features/RelatedServices.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import { linkify } from '$lib/utils/linkify.js';
	import data from '$lib/data/services/medical-records.json';
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
			serviceType: 'AI Medical Record Summarization'
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: data.faq.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.answer
				}
			}))
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dodon.ai/' },
				{ '@type': 'ListItem', position: 2, name: 'Medical Record Summaries' }
			]
		}
	]}
/>

<!-- Flowing gradient background spanning all content sections -->
<BlobBackground>
	<!-- 1. Hero -->
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
		<MRSummaryAnimation />
	</ServiceHero>

	<!-- 2. Testimonials -->
	{#if data.testimonials.length > 0}
		<TestimonialSection testimonials={data.testimonials} showBgImage={false} />
	{/if}

	<!-- 3. Workflow Comparison (Basic vs Advanced) -->
	{#if data.workflowComparison}
		<WorkflowComparison
			heading={data.workflowComparison.heading}
			description={data.workflowComparison.description}
			basicFeatures={data.workflowComparison.basicFeatures}
			advancedFeatures={data.workflowComparison.advancedFeatures}
			fullService={data.workflowComparison.fullService}
			background="bg-transparent"
		/>
	{/if}

	<!-- 4. Video -->
	{#if data.videoUrl}
		<VideoEmbed url={data.videoUrl} title="See Dodonai in Action" background="bg-transparent" />
	{/if}

	<!-- 5. Educational Content (4 cards + AI solution card) -->
	{#if data.educationalContent}
		<section class="py-20 sm:py-28">
			<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
						Understanding Medical Record Summaries
					</h2>
				</div>

				<div class="mt-16 grid gap-8 sm:grid-cols-2">
					{#each data.educationalContent as card}
						<div class="flex gap-5 rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card">
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#836ae41a]">
								{#if card.icon}
									<svg class="h-6 w-6 text-[#836ae4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
										{#if card.icon === 'document'}
											<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
										{:else if card.icon === 'calendar'}
											<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
										{:else if card.icon === 'briefcase'}
											<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
										{:else if card.icon === 'warning'}
											<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
										{/if}
									</svg>
								{:else}
									<span class="text-lg font-bold text-[#836ae4]">
										{card.title ? card.title.charAt(0).toUpperCase() : '?'}
									</span>
								{/if}
							</div>
							<div>
								<h3 class="text-lg font-bold text-[#282876]">{card.title}</h3>
								<p class="mt-2 text-sm leading-relaxed text-[#8181ac]">{@html linkify(card.description)}</p>
							</div>
						</div>
					{/each}
				</div>

				<!-- AI Solution card spanning full width -->
				{#if data.aiOverview}
					<div class="mt-8 rounded-2xl border border-[#836ae430] bg-[#836ae408] p-10 shadow-brand-card">
						<div class="flex items-start gap-6">
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#836ae41a]">
								<svg class="h-6 w-6 text-[#836ae4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
								</svg>
							</div>
							<div>
								<h3 class="text-xl font-bold text-[#282876]">{data.aiOverview.heading}</h3>
								{#each data.aiOverview.paragraphs as paragraph}
									<p class="mt-3 text-sm leading-relaxed text-[#8181ac]">{paragraph}</p>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- 6. How It Works -->
	{#if data.howItWorks.length > 0}
		<HowItWorks steps={data.howItWorks} background="bg-transparent" />
	{/if}

	<!-- 7. Security Section -->
	{#if data.securitySection}
		<ValueProposition
			heading={data.securitySection.heading}
			cards={data.securitySection.cards}
			columns={2}
			background="bg-transparent"
		/>
	{/if}

	<!-- 8. Customer Wins -->
	{#if data.customerWins}
		<ValueProposition
			heading={data.customerWins.heading}
			cards={data.customerWins.cards}
			columns={2}
			background="bg-transparent"
		/>
	{/if}

	<!-- 9. Practice Areas -->
	{#if data.practiceAreas}
		<ValueProposition
			heading={data.practiceAreas.heading}
			cards={data.practiceAreas.cards}
			columns={2}
			background="bg-transparent"
		/>
	{/if}

	<!-- 10. FAQ -->
	{#if data.faq.length > 0}
		<FAQAccordion items={data.faq} background="bg-transparent" />
	{/if}

	<!-- Related Services -->
	{#if data.relatedServices}
		<RelatedServices services={data.relatedServices} background="bg-transparent" />
	{/if}
</BlobBackground>

<!-- 10. CTA -->
<CTASection />
