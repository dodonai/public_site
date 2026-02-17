<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import ServiceHero from '$lib/components/hero/ServiceHero.svelte';
	import VideoEmbed from '$lib/components/video/VideoEmbed.svelte';
	import HowItWorks from '$lib/components/features/HowItWorks.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';

	let { seo, hero, features = [], howItWorks = [], faq = [], videoUrl, testimonials = [] } = $props();
</script>

<SEOHead
	title={seo.title}
	description={seo.description}
	url={seo.url || seo.canonical}
/>

<ServiceHero
	headline={hero.headline}
	subheadline={hero.subheadline}
	bullets={hero.bullets}
	ctaText={hero.ctaText}
	ctaUrl={hero.ctaUrl}
/>

{#if videoUrl}
	<VideoEmbed url={videoUrl} />
{/if}

<!-- Features Grid -->
{#if features.length > 0}
	<section class="bg-white py-20 sm:py-28">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Features
				</h2>
			</div>

			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each features as feature}
					<div class="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
						<h3 class="text-lg font-bold text-[#282876]">{feature.title}</h3>
						<p class="mt-3 text-sm leading-relaxed text-[#8181ac]">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if howItWorks.length > 0}
	<HowItWorks steps={howItWorks} />
{/if}

{#if testimonials.length > 0}
	<TestimonialSection {testimonials} />
{/if}

{#if faq.length > 0}
	<FAQAccordion items={faq} />
{/if}

<CTASection />
