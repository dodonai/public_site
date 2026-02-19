<script>
	import { slide } from 'svelte/transition';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import PricingTable from '$lib/components/pricing/PricingTable.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';

	let isYearly = $state(true);

	const faqItems = [
		{
			question: 'What is a credit?',
			answer:
				'A credit is the universal unit for all Dodonai processing. 1 credit is approximately equal to 1 page, or roughly 400 words of document content. Your monthly or annual credit allocation can be used across any combination of process types.'
		},
		{
			question: 'How do credits work with different process types?',
			answer:
				'Standard summaries (deposition, medical record, and general document) use 1 credit per page. Custom summaries use 2 credits per page. Advanced and index-based analysis uses 3-4 credits per page. OCR and transcription are always free and included with every plan.'
		},
		{
			question: 'What counts as a "page"?',
			answer:
				'A page is approximately 400 words of document content. For scanned documents processed with OCR, each physical page of the document counts as one page regardless of word count. Credits are deducted based on the number of pages in your uploaded document.'
		},
		{
			question: 'Do unused credits roll over?',
			answer:
				'Monthly plan credits reset each billing cycle and do not roll over. Annual plan credits roll over — any unused credits at the end of your annual billing period carry forward to the following year.'
		},
		{
			question: 'Can I upgrade my plan mid-cycle?',
			answer:
				'Yes, you can upgrade your plan at any time. When you upgrade, you will receive the additional credits from the new plan immediately, prorated for the remainder of your billing period.'
		},
		{
			question: 'What happens if I run out of credits?',
			answer:
				'If you exhaust your credits before the end of your billing period, you can purchase additional credits or upgrade to a higher plan. You will not be charged automatically — processing simply pauses until credits are available.'
		}
	];

	let faqOpen = $state(faqItems.map(() => false));

	const matrixData = $derived(
		isYearly
			? { lite: 300 / 4800, basic: 600 / 24000, pro: 1000 / 120000 }
			: { lite: 0.15, basic: 0.06, pro: 0.02 }
	);

	const decimals = $derived(isYearly ? 3 : 2);

	function fmt(perCredit, multiplier) {
		const cost = perCredit * multiplier;
		const factor = Math.pow(10, decimals);
		return '$' + (Math.round(cost * factor) / factor).toFixed(decimals) + '/pg';
	}

	function fmtRange(perCredit, low, high) {
		const factor = Math.pow(10, decimals);
		const lo = (Math.round(perCredit * low * factor) / factor).toFixed(decimals);
		const hi = (Math.round(perCredit * high * factor) / factor).toFixed(decimals);
		return '$' + lo + '-' + hi + '/pg';
	}

	function fmtCr(value) {
		const factor = Math.pow(10, decimals);
		return '$' + (Math.round(value * factor) / factor).toFixed(decimals) + '/cr';
	}
</script>

<SEOHead
	title="Pricing"
	description="Simple, transparent pricing for AI-powered legal document processing. Choose the plan that fits your firm's needs, from solo practitioners to enterprise teams."
	url="/pricing/"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: 'Dodonai',
		description:
			'AI-powered document processing platform for legal professionals. Summarize depositions, medical records, and legal documents.',
		brand: {
			'@type': 'Organization',
			name: 'Dodonai, Inc.'
		},
		offers: {
			'@type': 'AggregateOffer',
			priceCurrency: 'USD',
			lowPrice: '25',
			highPrice: '100',
			offerCount: '7',
			offers: [
				{
					'@type': 'Offer',
					name: 'Lite (Monthly)',
					price: '30',
					priceCurrency: 'USD',
					priceSpecification: {
						'@type': 'UnitPriceSpecification',
						price: '30',
						priceCurrency: 'USD',
						billingDuration: 'P1M'
					},
					description: 'For solo practitioners and small teams. 200 credits per month.',
					url: 'https://app.dodon.ai/signup'
				},
				{
					'@type': 'Offer',
					name: 'Lite (Annual)',
					price: '25',
					priceCurrency: 'USD',
					priceSpecification: {
						'@type': 'UnitPriceSpecification',
						price: '25',
						priceCurrency: 'USD',
						billingDuration: 'P1Y'
					},
					description:
						'For solo practitioners and small teams. 200 credits per month, billed annually.',
					url: 'https://app.dodon.ai/signup'
				},
				{
					'@type': 'Offer',
					name: 'Basic (Monthly)',
					price: '60',
					priceCurrency: 'USD',
					priceSpecification: {
						'@type': 'UnitPriceSpecification',
						price: '60',
						priceCurrency: 'USD',
						billingDuration: 'P1M'
					},
					description: 'For growing firms. 1,000 credits per month.',
					url: 'https://app.dodon.ai/signup'
				},
				{
					'@type': 'Offer',
					name: 'Basic (Annual)',
					price: '50',
					priceCurrency: 'USD',
					priceSpecification: {
						'@type': 'UnitPriceSpecification',
						price: '50',
						priceCurrency: 'USD',
						billingDuration: 'P1Y'
					},
					description: 'For growing firms. 1,000 credits per month, billed annually.',
					url: 'https://app.dodon.ai/signup'
				},
				{
					'@type': 'Offer',
					name: 'Pro (Monthly)',
					price: '100',
					priceCurrency: 'USD',
					priceSpecification: {
						'@type': 'UnitPriceSpecification',
						price: '100',
						priceCurrency: 'USD',
						billingDuration: 'P1M'
					},
					description:
						'For litigation teams handling high-volume caseloads. 5,000 credits per month.',
					url: 'https://app.dodon.ai/signup'
				},
				{
					'@type': 'Offer',
					name: 'Pro (Annual)',
					price: '84',
					priceCurrency: 'USD',
					priceSpecification: {
						'@type': 'UnitPriceSpecification',
						price: '84',
						priceCurrency: 'USD',
						billingDuration: 'P1Y'
					},
					description:
						'For litigation teams handling high-volume caseloads. 5,000 credits per month, billed annually.',
					url: 'https://app.dodon.ai/signup'
				},
				{
					'@type': 'Offer',
					name: 'Enterprise',
					description: 'Custom pricing for large firms with unlimited volume.',
					url: 'https://app.dodon.ai/signup'
				}
			]
		}
	}}
/>

<!-- Hero section -->
<section class="bg-[#f4f5fd] pb-8 pt-28 sm:pb-12 sm:pt-36">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<h1 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl lg:text-5xl">
			Packages to Fit Your Needs
		</h1>
		<p class="mx-auto mt-4 max-w-2xl text-lg text-[#8181ac]">
			Dodonai's low-overhead, highly-efficient approach to software enables us to pass big cost
			savings on to our customers, generating the highest quality summaries and document analysis on
			the market for less than a penny per page.
		</p>
	</div>
</section>

<!-- Pricing table -->
<section class="bg-[#f4f5fd] px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<PricingTable bind:isYearly />
	</div>
</section>

<!-- Full Service section -->
<section class="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<div
			class="rounded-2xl border border-[#836ae41a] bg-gradient-to-br from-[#f4f5fd] to-[#f9e1ff33] p-8 text-center shadow-sm sm:p-12"
		>
			<h2 class="text-2xl font-extrabold tracking-tight text-[#282876] sm:text-3xl">
				Need Full-Service Document Processing?
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-base text-[#8181ac] sm:text-lg">
				Dodonai offers human-assisted summaries combining AI efficiency with expert review. Get
				professionally reviewed document summaries with custom formatting, quality assurance, and
				dedicated support — all at competitive pricing.
			</p>
			<div class="mt-8">
				<a
					href="https://calendly.com/nick-dodonai"
					class="inline-block rounded-full bg-[#836ae4] px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#282876] hover:shadow-lg"
				>
					Contact Us
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Credit Cost Breakdown -->
<section class="bg-[#f4f5fd] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
	<div class="mx-auto max-w-5xl">
		<h2
			class="text-center text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl"
		>
			Credit Cost Breakdown
		</h2>
		<p class="mx-auto mt-4 max-w-2xl text-center text-lg text-[#8181ac]">
			See exactly what you pay per page across each plan and process type.
		</p>

		<div class="mt-12 overflow-x-auto rounded-xl border border-[#e5e5e5] bg-white shadow-sm">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-[#e5e5e5] bg-[#f4f5fd]">
						<th class="px-6 py-4 font-bold text-[#282876]">Process</th>
						<th class="px-6 py-4 text-center font-bold text-[#282876]">Credits/Page</th>
						<th class="px-6 py-4 text-center font-bold text-[#282876]">
							Lite
							<span class="block text-xs font-normal text-[#8181ac]">{fmtCr(matrixData.lite)}</span>
						</th>
						<th class="px-6 py-4 text-center font-bold text-[#282876]">
							Basic
							<span class="block text-xs font-normal text-[#8181ac]">{fmtCr(matrixData.basic)}</span>
						</th>
						<th class="px-6 py-4 text-center font-bold text-[#282876]">
							Pro
							<span class="block text-xs font-normal text-[#8181ac]">{fmtCr(matrixData.pro)}</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-[#e5e5e5]">
						<td class="px-6 py-4 font-medium text-[#282876]">Standard Summaries</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">1</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmt(matrixData.lite, 1)}</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmt(matrixData.basic, 1)}</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmt(matrixData.pro, 1)}</td>
					</tr>
					<tr class="border-b border-[#e5e5e5]">
						<td class="px-6 py-4 font-medium text-[#282876]">Custom Summaries</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">2</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmt(matrixData.lite, 2)}</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmt(matrixData.basic, 2)}</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmt(matrixData.pro, 2)}</td>
					</tr>
					<tr class="border-b border-[#e5e5e5]">
						<td class="px-6 py-4 font-medium text-[#282876]">Advanced Analysis</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">3-4</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmtRange(matrixData.lite, 3, 4)}</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmtRange(matrixData.basic, 3, 4)}</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">{fmtRange(matrixData.pro, 3, 4)}</td>
					</tr>
					<tr>
						<td class="px-6 py-4 font-medium text-[#282876]">OCR & Transcription</td>
						<td class="px-6 py-4 text-center text-[#8181ac]">—</td>
						<td class="px-6 py-4 text-center font-medium text-[#22c55e]">Free</td>
						<td class="px-6 py-4 text-center font-medium text-[#22c55e]">Free</td>
						<td class="px-6 py-4 text-center font-medium text-[#22c55e]">Free</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<h2
			class="mb-8 text-center text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl"
		>
			Frequently Asked Questions
		</h2>

		{#each faqItems as item, i}
			{@const isOpen = faqOpen[i]}
			<div class="border-b border-[#e5e5e5] px-[5%] pt-6">
				<button
					type="button"
					class="flex w-full items-start justify-between pb-5 text-left"
					onclick={() => (faqOpen[i] = !faqOpen[i])}
					aria-expanded={isOpen}
				>
					<span
						class="pr-4 text-xl font-semibold leading-8 text-[#152c5b] sm:max-md:text-[17px] sm:max-md:leading-7"
					>
						{item.question}
					</span>
					<div
						class="flex h-6 w-6 flex-shrink-0 items-center justify-center sm:max-md:h-[18px] sm:max-md:w-[18px]"
					>
						<svg
							class="h-4 w-4 text-[#152c5b] transition-transform duration-200 {isOpen
								? 'rotate-180'
								: ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
				</button>
				{#if isOpen}
					<div transition:slide={{ duration: 250 }} class="mb-5 overflow-hidden sm:max-md:mt-4">
						<p class="text-sm font-medium leading-relaxed text-[#8181ac]">{item.answer}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<!-- CTA section -->
<CTASection
	headline="Ready to Get Started?"
	description="Try Dodonai free and see how AI-powered document processing can save your team hours on every case."
/>
