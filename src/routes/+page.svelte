<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import HeroSection from '$lib/components/hero/HeroSection.svelte';
	import TestimonialSection from '$lib/components/testimonials/TestimonialSection.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import SecuritySection from '$lib/components/security/SecuritySection.svelte';
	import FAQAccordion from '$lib/components/faq/FAQAccordion.svelte';
	import faqItems from '$lib/data/faq/general.json';
	import LazyLoad from '$lib/components/layout/LazyLoad.svelte';
	import DepositionHeroAnimation from '$lib/components/hero/DepositionHeroAnimation.svelte';
	import MRSummaryAnimation from '$lib/components/hero/MRSummaryAnimation.svelte';
	import TranscriptAnimation from '$lib/components/hero/TranscriptAnimation.svelte';
	import OCRAnimation from '$lib/components/hero/OCRAnimation.svelte';
	import ExtractDraftAnimation from '$lib/components/hero/ExtractDraftAnimation.svelte';
	import EDiscoveryAnimation from '$lib/components/hero/EDiscoveryAnimation.svelte';
</script>

<SEOHead
	title="AI Deposition Summaries & Medical Record Chronologies"
	description="Transform depositions and medical records into actionable summaries in minutes. AI-powered document processing built for legal teams. Free trial."
	url="/"
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: 'Dodonai',
			applicationCategory: 'BusinessApplication',
			description:
				'AI-powered document processing platform for legal professionals. Summarize depositions, medical records, and legal documents.',
			url: 'https://www.dodon.ai',
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'USD',
				description: 'Free 7-day trial'
			},
			operatingSystem: 'Web',
			creator: {
				'@type': 'Organization',
				name: 'Dodonai, Inc.',
				url: 'https://www.dodon.ai'
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Dodonai, Inc.',
			url: 'https://www.dodon.ai',
			logo: 'https://www.dodon.ai/images/brand/logo-main.png',
			description:
				'AI-powered document processing platform built for legal professionals. Summarize depositions, medical records, and legal documents in minutes.',
			sameAs: [
				'https://www.linkedin.com/company/dodon-ai',
				'https://twitter.com/Dodon_ai',
				'https://www.youtube.com/@dodon-ai'
			],
			areaServed: 'US',
			knowsAbout: [
				'Deposition Summaries',
				'Medical Record Summaries',
				'Medical Chronologies',
				'Legal Document Processing',
				'AI OCR',
				'E-Discovery',
				'Legal AI Tools'
			],
			contactPoint: {
				'@type': 'ContactPoint',
				email: 'hello@dodon.ai',
				contactType: 'customer support'
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqItems.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.answer
				}
			}))
		}
	]}
/>

<HeroSection />
<TestimonialSection />
<SecuritySection />
<!-- Use Cases -->
<section class="bg-white py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl lg:text-5xl">
				Automate record analysis with your new AI assistant
			</h2>
		</div>
	</div>
</section>

<BlobBackground>
	<!-- 1. Deposition Summaries -->
	<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div>
				<h3 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Deposition Summaries
				</h3>
				<p class="mt-6 text-lg leading-relaxed text-[#8181ac]">
					Convert deposition transcripts into structured, page-and-line cited summaries in
					minutes. Focus on key testimony, disputed facts, and damages — Dodonai captures
					what matters so you can focus on strategy.
				</p>
				<a
					href="/deposition-summary-software/"
					class="mt-8 inline-block text-base font-semibold text-[#216fed] hover:text-[#282876]"
				>
					Learn more &rarr;
				</a>
			</div>
			<LazyLoad>
				<DepositionHeroAnimation />
			</LazyLoad>
		</div>
	</div>

	<!-- 2. Medical Record Summaries -->
	<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div class="order-2 lg:order-1">
				<LazyLoad>
					<MRSummaryAnimation />
				</LazyLoad>
			</div>
			<div class="order-1 lg:order-2">
				<h3 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Medical Record Summaries & Chronologies
				</h3>
				<p class="mt-6 text-lg leading-relaxed text-[#8181ac]">
					Generate comprehensive medical chronologies and summaries from records of any
					length. Dodonai extracts diagnoses, treatments, providers, and dates into an
					organized timeline your team can use immediately.
				</p>
				<a
					href="/ai-medical-record-summaries-chronologies/"
					class="mt-8 inline-block text-base font-semibold text-[#216fed] hover:text-[#282876]"
				>
					Learn more &rarr;
				</a>
			</div>
		</div>
	</div>

	<!-- 3. Transcript Management -->
	<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div>
				<h3 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Deposition Transcript Management
				</h3>
				<p class="mt-6 text-lg leading-relaxed text-[#8181ac]">
					Search, annotate, and cite deposition transcripts with AI-powered tools.
					Automated blue book citations, powerful full-text search, and an AI chat
					assistant that knows every word of your transcript.
				</p>
				<a
					href="/ai-deposition-transcript-software/"
					class="mt-8 inline-block text-base font-semibold text-[#216fed] hover:text-[#282876]"
				>
					Learn more &rarr;
				</a>
			</div>
			<LazyLoad>
				<TranscriptAnimation />
			</LazyLoad>
		</div>
	</div>

	<!-- 4. AI-Powered OCR -->
	<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div class="order-2 lg:order-1">
				<LazyLoad>
					<OCRAnimation />
				</LazyLoad>
			</div>
			<div class="order-1 lg:order-2">
				<h3 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Next-Generation AI OCR
				</h3>
				<p class="mt-6 text-lg leading-relaxed text-[#8181ac]">
					Transform scanned PDFs — including tables, handwriting, and images — into
					searchable, editable documents. Dodonai's AI-powered OCR goes beyond traditional
					text extraction to understand document structure and layout.
				</p>
				<a
					href="/ai-pdf-ocr/"
					class="mt-8 inline-block text-base font-semibold text-[#216fed] hover:text-[#282876]"
				>
					Learn more &rarr;
				</a>
			</div>
		</div>
	</div>

	<!-- 5. Extract & Draft Agents -->
	<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div>
				<h3 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Extract & Draft Agents
				</h3>
				<p class="mt-6 text-lg leading-relaxed text-[#8181ac]">
					Define custom templates and let Dodonai's AI agents extract data from any
					document source to build accurate, reusable reports. Automate the repetitive work
					of pulling structured information from unstructured documents.
				</p>
				<a
					href="/dodonai-extract-and-draft-agents/"
					class="mt-8 inline-block text-base font-semibold text-[#216fed] hover:text-[#282876]"
				>
					Learn more &rarr;
				</a>
			</div>
			<LazyLoad>
				<ExtractDraftAnimation />
			</LazyLoad>
		</div>
	</div>

	<!-- 6. E-Discovery -->
	<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div class="order-2 lg:order-1">
				<LazyLoad>
					<EDiscoveryAnimation />
				</LazyLoad>
			</div>
			<div class="order-1 lg:order-2">
				<h3 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					AI-Powered E-Discovery
				</h3>
				<p class="mt-6 text-lg leading-relaxed text-[#8181ac]">
					Search across thousands of documents using natural language instead of keywords.
					Dodonai's semantic search finds relevant evidence by meaning, not just matching
					terms — so no critical document is ever out of reach.
				</p>
				<a
					href="/electronic-discovery-software/"
					class="mt-8 inline-block text-base font-semibold text-[#216fed] hover:text-[#282876]"
				>
					Learn more &rarr;
				</a>
			</div>
		</div>
	</div>
</BlobBackground>

<FAQAccordion items={faqItems} />

<CTASection
	headline="Start saving time and money on Day 1 with Dodonai"
	description="Learn how Dodonai can help take your law practice to the next level."
/>
