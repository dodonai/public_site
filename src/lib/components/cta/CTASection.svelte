<script>
	import { offers } from '$lib/data/offers.js';
	let { offer, headline, description, primaryHref, primaryLabel, secondaryHref, secondaryLabel } =
		$props();
	const selected = $derived(offers[offer]);
</script>

<section
	class="relative overflow-hidden py-20 sm:py-28"
	style="background-image: radial-gradient(circle at 0 0, #9076f4, #836ae4 72%)"
>
	<!-- Decorative wave at top -->
	<img
		src="/images/brand/wave-cta.webp"
		alt=""
		class="pointer-events-none absolute -top-[10%] left-0 right-0 w-full opacity-40"
		aria-hidden="true"
		loading="lazy"
		width="1200"
		height="279"
	/>
	<!-- Decorative blur blobs -->
	<img
		src="/images/brand/ellipse-lavender.webp"
		alt=""
		class="pointer-events-none absolute -bottom-[40%] left-0 w-[70%] opacity-20"
		aria-hidden="true"
		loading="lazy"
		width="500"
		height="492"
	/>
	<img
		src="/images/brand/ellipse-pink.webp"
		alt=""
		class="pointer-events-none absolute -right-[12%] -top-[16%] w-[70%] opacity-20"
		aria-hidden="true"
		loading="lazy"
		width="500"
		height="491"
	/>

	<div class="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
			{headline || selected.headline}
		</h2>

		<p class="mx-auto mt-4 max-w-xl text-lg text-white/80">
			{description || selected.description}
		</p>

		<div class="mx-auto mt-10 flex max-w-lg flex-col items-center justify-center gap-5 sm:flex-row">
			<a
				href={primaryHref || selected.primaryHref}
				class="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#282876] shadow-md hover:bg-[#282876] hover:text-white"
				>{primaryLabel || selected.primaryLabel}</a
			>
			<a
				href={secondaryHref || selected.secondaryHref}
				class="text-sm font-semibold text-white underline underline-offset-4"
				>{secondaryLabel || selected.secondaryLabel}</a
			>
		</div>
	</div>
</section>
