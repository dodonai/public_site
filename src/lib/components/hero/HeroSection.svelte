<script>
	import { onMount } from 'svelte';
	import IndexAnimation from './IndexAnimation.svelte';

	const services = [
		'Medical Record Chronologies',
		'Deposition Summaries',
		'Medical Bill Analysis',
		'Chat with Your Documents',
		'Audio Transcription',
		'E-Discovery',
		'Bank Statement Analysis',
		'Impeachment Analysis',
		'Trial / Hearing / Arbitration Summaries',
		'Independent Medical Exam Reports',
		'Body Cam Summaries',
		'Police Report Summaries',
		'Custom Summaries'
	];

	let currentIndex = $state(0);
	let visible = $state(true);

	onMount(() => {
		const interval = setInterval(() => {
			visible = false;
			setTimeout(() => {
				currentIndex = (currentIndex + 1) % services.length;
				visible = true;
			}, 400);
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<section class="relative overflow-hidden bg-white">
	<!-- Decorative blur gradient blobs (z-0 to stay behind content) -->
	<img
		src="/images/brand/blur-1.png"
		alt=""
		class="pointer-events-none absolute -left-40 -top-20 z-0 w-[700px] opacity-50"
		aria-hidden="true"
	/>
	<img
		src="/images/brand/blur-2.png"
		alt=""
		class="pointer-events-none absolute -right-40 top-10 z-0 w-[600px] opacity-40"
		aria-hidden="true"
	/>
	<img
		src="/images/brand/blur-3.png"
		alt=""
		class="pointer-events-none absolute bottom-20 left-1/4 z-0 w-[500px] opacity-30"
		aria-hidden="true"
	/>

	<!-- Content wrapper -->
	<div class="relative z-10 mx-auto w-[85%] max-w-[1250px] pb-[100px] pt-[100px]">
		<!-- Two column layout -->
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<!-- Left column: text content -->
			<div class="flex flex-col max-lg:items-center max-lg:text-center">
				<!-- H1 -->
				<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl lg:text-6xl">
					AI Legal & Medical Records Processing
				</h1>

				<!-- Cycling text -->
				<div class="mt-5 flex h-10 items-center max-lg:justify-center sm:h-12">
					<span
						class="text-xl font-semibold text-[#282876] transition-opacity duration-300 sm:text-2xl lg:text-3xl"
						style="font-weight: 400;"
						class:opacity-0={!visible}
						class:opacity-100={visible}
					>
						{services[currentIndex]}
					</span>
				</div>

				<!-- Paragraph -->
				<p class="mt-6 max-w-xl text-base leading-7 text-[#8181ac] sm:text-lg">
					Dodonai's HIPAA and SOC-2 compliant secure software automates document analysis so
					legal and medical professionals can focus on servicing clients and patients and
					growing their practices.
				</p>

				<!-- CTA Buttons -->
				<div class="mt-8 flex flex-wrap items-center gap-4 max-lg:justify-center sm:gap-6">
					<a
						href="https://app.dodon.ai/signup"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-brand-primary inline-block"
					>
						Free Summary
					</a>
					<a href="/pricing/" class="btn-brand-outline inline-block">
						See Pricing
					</a>
				</div>

				<!-- Security certifications -->
				<div class="mt-10 flex flex-wrap items-center gap-4 max-lg:justify-center sm:gap-5">
					<div class="flex items-center gap-3 rounded-full border border-[#282876]/10 bg-[#f4f5fd] px-5 py-2.5">
						<img src="/images/brand/icon-soc2.svg" alt="SOC-2 shield" class="h-7 w-7" />
						<span class="text-sm font-semibold tracking-wide text-[#282876]">SOC-2 Certified</span>
					</div>
					<div class="flex items-center gap-3 rounded-full border border-[#282876]/10 bg-[#f4f5fd] px-5 py-2.5">
						<img src="/images/brand/icon-hipaa.svg" alt="HIPAA shield" class="h-7 w-7" />
						<span class="text-sm font-semibold tracking-wide text-[#282876]">HIPAA Compliant</span>
					</div>
				</div>
			</div>

			<!-- Right column: animated workflow -->
			<div class="w-full">
				<IndexAnimation />
			</div>
		</div>
	</div>

	<!-- Wave decoration at bottom (z-0 to stay behind content) -->
	<div class="absolute bottom-0 left-0 right-0 z-0 opacity-40">
		<img src="/images/brand/wave-hero.png" alt="" class="w-full" aria-hidden="true" loading="lazy" />
	</div>
</section>
