<script>
	import { slide } from 'svelte/transition';
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';

	let isYearly = $state(true);

	const plans = [
		{
			credits: 200,
			monthly: 30,
			yearly: 300,
			yCredits: 4800,
			desc: 'For solo practitioners and small teams getting started.',
			support: 'Chat & email support'
		},
		{
			credits: 1000,
			monthly: 60,
			yearly: 600,
			yCredits: 24000,
			desc: 'For growing teams that need more capacity.',
			support: 'Chat & email support'
		},
		{
			credits: 5000,
			monthly: 100,
			yearly: 1000,
			yCredits: 120000,
			desc: 'For teams handling high-volume workloads with demanding deadlines.',
			support: 'Chat, email & phone support',
			recommended: true
		}
	];

	function perPage(plan) {
		return isYearly ? plan.yearly / plan.yCredits : plan.monthly / plan.credits;
	}

	function fmtPerPage(val) {
		return '$' + val.toFixed(val < 0.01 ? 3 : 2);
	}

	const decimals = $derived(isYearly ? 3 : 2);
	const pps = $derived(plans.map((p) => perPage(p)));

	function fmt(perCredit, multiplier) {
		const cost = perCredit * multiplier;
		const factor = Math.pow(10, decimals);
		return '$' + (Math.round(cost * factor) / factor).toFixed(decimals);
	}

	function fmtRange(perCredit, low, high) {
		const factor = Math.pow(10, decimals);
		const lo = (Math.round(perCredit * low * factor) / factor).toFixed(decimals);
		const hi = (Math.round(perCredit * high * factor) / factor).toFixed(decimals);
		return '$' + lo + '–' + hi;
	}

	const faqItems = [
		{
			question: 'What is a credit?',
			answer:
				'A credit is the universal unit for all Dodonai processing. 1 credit equals approximately 1 page, or roughly 400 tokens of text. Your monthly or annual credit allocation can be used across any combination of process types.'
		},
		{
			question: 'How do credits work with different process types?',
			answer:
				'Standard summaries (deposition, medical record, and general document) use 1 credit per page. Custom summaries use 2 credits per page. Advanced and index-based analysis uses 3-4 credits per page. OCR and transcription are always free and included with every plan.'
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

	const features = [
		{
			title: 'AI Deposition Summaries',
			desc: 'Page-line summaries with citations',
			icon: 'document'
		},
		{
			title: 'Medical Chronologies',
			desc: 'Structured timelines from records',
			icon: 'timeline'
		},
		{ title: 'AI-Powered OCR', desc: 'Always free with every plan', icon: 'scan' },
		{
			title: 'Extract & Draft Agents',
			desc: 'Custom AI agents for your workflows',
			icon: 'agent'
		},
		{ title: 'E-Discovery Tools', desc: 'Search, tag, and organize collections', icon: 'search' },
		{
			title: 'Transcript Management',
			desc: 'Upload, search, and analyze',
			icon: 'waveform'
		},
		{ title: 'Custom Rule Engine', desc: 'Define rules for your summaries', icon: 'rules' },
		{
			title: 'Batch Processing',
			desc: 'Process multiple documents at once',
			icon: 'grid'
		},
		{ title: 'Chat & Email Support', desc: 'Help when you need it', icon: 'chat' }
	];
</script>

<SEOHead
	title="Pricing"
	description="Simple, usage-based pricing for AI-powered document processing. Every feature included in every plan. Starting at 2 cents per page."
	url="/pricing/"
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dodon.ai/' },
				{ '@type': 'ListItem', position: 2, name: 'Pricing' }
			]
		},
		{
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
					description: 'For high-volume teams. 5,000 credits per month.',
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
					description: 'For high-volume teams. 5,000 credits per month, billed annually.',
					url: 'https://app.dodon.ai/signup'
				},
				{
					'@type': 'Offer',
					name: 'Enterprise',
					description: 'Custom pricing for large organizations.',
					url: 'https://app.dodon.ai/signup'
				}
			]
		}
	}]}
/>

<!-- Hero -->
<section class="bg-[#f4f5fd] pb-5 pt-28 sm:pt-36">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<p
			class="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#836ae4] sm:text-sm"
		>
			Usage-Based Pricing
		</p>
		<h1 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl lg:text-5xl">
			Every Feature. Every Plan.<br />Starting at <span class="text-[#836ae4]">2&cent; per page.</span>
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-base text-[#8181ac] sm:text-lg">
			No per-seat fees. No feature gates. Choose the volume that fits your workload — the more you
			process, the less you pay per page.
		</p>
	</div>
</section>

<!-- Billing toggle -->
<div class="flex items-center justify-center gap-3 bg-[#f4f5fd] pb-10 pt-8">
	<button
		type="button"
		class="text-sm font-semibold transition-colors {isYearly
			? 'text-[#9898b8]'
			: 'text-[#282876]'}"
		onclick={() => (isYearly = false)}
	>
		Monthly
	</button>
	<button
		type="button"
		role="switch"
		aria-checked={isYearly}
		aria-label="Toggle annual billing"
		class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-[#836ae4] transition-colors"
		onclick={() => (isYearly = !isYearly)}
	>
		<span
			class="pointer-events-none inline-block h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 {isYearly
				? 'translate-x-[22px]'
				: 'translate-x-[3px]'}"
		></span>
	</button>
	<button
		type="button"
		class="text-sm font-semibold transition-colors {isYearly
			? 'text-[#282876]'
			: 'text-[#9898b8]'}"
		onclick={() => (isYearly = true)}
	>
		Annual
	</button>
	<span
		class="rounded px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-[#836ae4]"
		style="background: rgba(131, 106, 228, 0.06)"
	>
		Save up to 58%
	</span>
</div>

<!-- Pricing cards -->
<section class="bg-[#f4f5fd] px-4 pb-16 sm:px-6 lg:px-8">
	<div class="mx-auto grid max-w-[1080px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		{#each plans as plan}
			{@const pp = perPage(plan)}
			{@const price = isYearly ? Math.round(plan.yearly / 12) : plan.monthly}
			{@const savings = isYearly
				? Math.round((1 - plan.yearly / (plan.monthly * 12)) * 100)
				: 0}
			<div
				class="relative flex flex-col rounded-[10px] border bg-white p-7 transition-all sm:p-8 {plan.recommended
					? 'border-[#836ae4] shadow-[0_1px_24px_rgba(131,106,228,0.1)]'
					: 'border-[#e8e8f0] hover:border-[#d0d0e0]'}"
			>
				{#if plan.recommended}
					<span
						class="absolute -top-2.5 left-7 rounded bg-[#836ae4] px-3 py-0.5 text-[0.7rem] font-bold tracking-wide text-white"
					>
						Recommended
					</span>
				{/if}

				<div class="mb-1">
					<span class="text-xl font-extrabold text-[#836ae4] sm:text-2xl"
						>{fmtPerPage(pp)}</span
					>
					<span class="text-sm text-[#9898b8]"> / page*</span>
					<span class="mt-0.5 block text-xs text-[#9898b8]">(standard summaries)</span>
				</div>
				<p class="mb-1 text-xs text-[#9898b8]">
					{isYearly
						? plan.yCredits.toLocaleString() + ' credits per year'
						: plan.credits.toLocaleString() + ' credits per month'}
				</p>

				<div class="my-5 h-px bg-[#f0f0f4]"></div>

				<div class="text-[2.5rem] font-extrabold leading-none tracking-tight text-[#282876]">
					${price}<span class="text-sm font-medium text-[#9898b8]"> /mo</span>
				</div>
				<div class="mt-1 min-h-[36px] text-xs text-[#9898b8]">
					{isYearly ? `Billed annually at $${plan.yearly}` : 'Billed monthly'}
					{#if savings > 0}
						&middot; <span class="font-semibold text-[#836ae4]">Save {savings}%</span>
					{/if}
				</div>

				<p class="mt-3 flex-1 text-sm leading-relaxed text-[#8181ac]">{plan.desc}</p>
				<p class="mt-3 mb-5 text-xs font-semibold text-[#282876]">{plan.support}</p>

				<a
					href="https://app.dodon.ai/signup"
					class="block rounded-md py-2.5 text-center text-sm font-bold transition-colors {plan.recommended
						? 'bg-[#836ae4] text-white hover:bg-[#7059cc]'
						: 'bg-[#216fed] text-white hover:bg-[#1b5ad4]'}"
				>
					Get Started
				</a>
			</div>
		{/each}

		<!-- Enterprise -->
		<div
			class="relative flex flex-col rounded-[10px] border border-[#e8e8f0] bg-[#fafafe] p-7 sm:p-8"
		>
			<div class="mb-1">
				<span class="text-lg font-extrabold text-[#282876]">Custom pricing</span>
			</div>
			<p class="mb-1 text-xs text-[#9898b8]">Tailored to your volume</p>

			<div class="my-5 h-px bg-[#f0f0f4]"></div>

			<div class="text-2xl font-bold text-[#282876]">Let's talk</div>
			<div class="mt-1 min-h-[36px] text-xs text-[#9898b8]">
				Custom integrations &middot; SLA guarantees
			</div>

			<p class="mt-3 flex-1 text-sm leading-relaxed text-[#8181ac]">
				For large organizations with custom requirements and dedicated support needs.
			</p>
			<p class="mt-3 mb-5 text-xs font-semibold text-[#282876]">
				Chat, email & phone support<br />
				<span class="font-medium text-[#8181ac]">Dedicated onboarding included</span>
			</p>

			<a
				href="https://calendly.com/nick-dodonai"
				target="_blank"
				rel="noopener noreferrer"
				class="block rounded-md border-[1.5px] border-[#d0d0e0] py-2.5 text-center text-sm font-bold text-[#282876] transition-colors hover:border-[#282876]"
			>
				Contact Us
			</a>
		</div>
	</div>
</section>

<!-- Every Plan Includes -->
<section class="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-[960px]">
		<h2 class="text-center text-2xl font-extrabold tracking-tight text-[#282876] sm:text-3xl">
			Every Plan Includes
		</h2>
		<p class="mx-auto mt-2 max-w-lg text-center text-sm text-[#9898b8]">
			No feature gates. No upsells. Everything below from day one.
		</p>

		<div class="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<div
					class="flex items-start gap-3 rounded-lg border border-[#f0f0f4] bg-[#fafafe] px-4 py-4"
				>
					<div class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
						{#if feature.icon === 'document'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M6 5h4M6 8h4M6 11h2"/></svg>
						{:else if feature.icon === 'timeline'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><path d="M3 4h2v8H3M7 6h2v6H7M11 2h2v10h-2"/></svg>
						{:else if feature.icon === 'scan'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8h6M8 5v6" stroke-width="1.2"/><circle cx="8" cy="8" r="3" stroke-dasharray="1.5 1.5"/></svg>
						{:else if feature.icon === 'agent'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><path d="M4 13V8l4-5 4 5v5"/><path d="M7 13v-3h2v3"/><circle cx="8" cy="5" r="1" fill="#836ae4" stroke="none"/></svg>
						{:else if feature.icon === 'search'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><circle cx="7" cy="7" r="4"/><path d="M10 10l3.5 3.5"/></svg>
						{:else if feature.icon === 'waveform'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><path d="M8 2v2M8 12v2M5 5v6M11 4v8M3 7v2M13 6v4"/></svg>
						{:else if feature.icon === 'rules'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><path d="M2 5h5M9 5h5M2 8h3M7 8h7M2 11h8M12 11h2"/><circle cx="6" cy="5" r="1" fill="#836ae4" stroke="none"/><circle cx="5" cy="8" r="1" fill="#836ae4" stroke="none"/><circle cx="11" cy="11" r="1" fill="#836ae4" stroke="none"/></svg>
						{:else if feature.icon === 'grid'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>
						{:else if feature.icon === 'chat'}
							<svg viewBox="0 0 16 16" fill="none" stroke="#836ae4" stroke-width="1.5" class="h-4 w-4"><path d="M2 3h10a1 1 0 011 1v5a1 1 0 01-1 1H5l-3 3V4a1 1 0 011-1z"/><path d="M5 6h4"/></svg>
						{/if}
					</div>
					<div>
						<h4 class="text-sm font-bold text-[#282876]">{feature.title}</h4>
						<p class="text-xs leading-snug text-[#9898b8]">{feature.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Cost Per Page by Process Type -->
<section class="bg-[#f4f5fd] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-[820px]">
		<h2 class="text-center text-2xl font-extrabold tracking-tight text-[#282876] sm:text-3xl">
			Cost Per Page by Process Type
		</h2>
		<p class="mx-auto mt-2 text-center text-sm text-[#9898b8]">
			Different processes use different page multipliers.
		</p>

		<div class="mt-8 overflow-x-auto rounded-lg border border-[#e8e8f0]">
			<table class="w-full">
				<thead>
					<tr>
						<th
							class="border-b border-[#e8e8f0] bg-[#fafafe] px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-[#282876] sm:px-5"
						>
							Process
						</th>
						<th
							class="border-b border-[#e8e8f0] bg-[#fafafe] px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-[#282876] sm:px-5"
						>
							Multiplier*
						</th>
						<th
							class="border-b border-[#e8e8f0] bg-[#fafafe] px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-[#282876] sm:px-5"
						>
							{isYearly ? '4,800 cr/yr' : '200 cr/mo'}
						</th>
						<th
							class="border-b border-[#e8e8f0] bg-[#fafafe] px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-[#282876] sm:px-5"
						>
							{isYearly ? '24,000 cr/yr' : '1,000 cr/mo'}
						</th>
						<th
							class="border-b border-[#e8e8f0] bg-[#fafafe] px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-[#282876] sm:px-5"
						>
							{isYearly ? '120,000 cr/yr' : '5,000 cr/mo'}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-[#f0f0f4]">
						<td class="px-4 py-3.5 text-sm font-semibold text-[#282876] sm:px-5"
							>Standard Summaries</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5">1x</td>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmt(pps[0], 1)}</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmt(pps[1], 1)}</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmt(pps[2], 1)}</td
						>
					</tr>
					<tr class="border-b border-[#f0f0f4]">
						<td class="px-4 py-3.5 text-sm font-semibold text-[#282876] sm:px-5"
							>Custom Summaries</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5">2x</td>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmt(pps[0], 2)}</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmt(pps[1], 2)}</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmt(pps[2], 2)}</td
						>
					</tr>
					<tr class="border-b border-[#f0f0f4]">
						<td class="px-4 py-3.5 text-sm font-semibold text-[#282876] sm:px-5"
							>Advanced Analysis</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5">3–4x</td>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmtRange(pps[0], 3, 4)}</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmtRange(pps[1], 3, 4)}</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5"
							>{fmtRange(pps[2], 3, 4)}</td
						>
					</tr>
					<tr>
						<td class="px-4 py-3.5 text-sm font-semibold text-[#282876] sm:px-5"
							>OCR & Transcription</td
						>
						<td class="px-4 py-3.5 text-center text-sm text-[#8181ac] sm:px-5">—</td>
						<td class="px-4 py-3.5 text-center text-sm font-semibold text-[#16a34a] sm:px-5"
							>Free</td
						>
						<td class="px-4 py-3.5 text-center text-sm font-semibold text-[#16a34a] sm:px-5"
							>Free</td
						>
						<td class="px-4 py-3.5 text-center text-sm font-semibold text-[#16a34a] sm:px-5"
							>Free</td
						>
					</tr>
				</tbody>
			</table>
		</div>
		<p class="mt-4 text-center text-xs text-[#9898b8]">*1 "page" ≈ 400 tokens of text.</p>
	</div>
</section>

<!-- Full Service -->
<section class="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-[820px]">
		<div class="rounded-[10px] border border-[#e8e8f0] bg-[#fafafe] p-8 text-center sm:p-10">
			<h2 class="text-xl font-extrabold tracking-tight text-[#282876] sm:text-2xl">
				Need Full-Service Document Processing?
			</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#8181ac]">
				AI efficiency combined with expert human review. Custom formatting, quality assurance, and
				dedicated support.
			</p>
			<div class="mt-6">
				<a
					href="https://calendly.com/nick-dodonai"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block rounded-md border-[1.5px] border-[#d0d0e0] px-7 py-2.5 text-sm font-bold text-[#282876] transition-colors hover:border-[#282876]"
				>
					Contact Us
				</a>
			</div>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="bg-[#f4f5fd] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<h2
			class="mb-8 text-center text-2xl font-extrabold tracking-tight text-[#282876] sm:text-3xl"
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
						class="pr-4 text-lg font-semibold leading-7 text-[#282876] sm:text-xl sm:leading-8"
					>
						{item.question}
					</span>
					<div class="flex h-6 w-6 flex-shrink-0 items-center justify-center">
						<svg
							class="h-4 w-4 text-[#282876] transition-transform duration-200 {isOpen
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
					<div transition:slide={{ duration: 250 }} class="mb-5 overflow-hidden">
						<p class="text-sm font-medium leading-relaxed text-[#8181ac]">{item.answer}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<!-- CTA -->
<CTASection
	headline="Ready to Get Started?"
	description="Try Dodonai free and see how AI-powered document processing can save your team hours on every case."
/>
