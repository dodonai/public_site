<script>
	let { children } = $props();
</script>

<!-- Flowing content sections — unified background with cool brand accents -->
<div class="relative overflow-hidden bg-white">
	<!-- Keep the base visually aligned with the new pure-white marketing pages. -->
	<div
		class="pointer-events-none absolute inset-0 z-0"
		aria-hidden="true"
		style="background:
			radial-gradient(ellipse 80% 50% at 90% 5%, rgba(225, 244, 255, 0.22) 0%, transparent 70%),
			radial-gradient(ellipse 70% 40% at 10% 20%, rgba(169, 184, 255, 0.1) 0%, transparent 70%),
			radial-gradient(ellipse 80% 45% at 15% 55%, rgba(225, 244, 255, 0.18) 0%, transparent 70%),
			radial-gradient(ellipse 70% 40% at 85% 70%, rgba(169, 184, 255, 0.08) 0%, transparent 70%);"
	></div>

	<!-- Decorative blur blobs — staggered across full page height -->
	<!-- Top zone -->
	<img src="/images/brand/ellipse-blue.webp" alt="" class="pointer-events-none absolute -right-[10%] -top-[8%] w-[70%] opacity-35" aria-hidden="true" loading="lazy" width="250" height="242" />

	<!-- Upper-mid zone -->
	<img src="/images/brand/ellipse-purple.webp" alt="" class="pointer-events-none absolute -right-[25%] top-[22%] w-[80%] opacity-20" aria-hidden="true" loading="lazy" width="250" height="250" />

	<!-- Mid zone -->
	<img src="/images/brand/ellipse-blue.webp" alt="" class="pointer-events-none absolute -left-[30%] top-[42%] w-[90%] opacity-30" aria-hidden="true" loading="lazy" width="250" height="242" />

	<!-- Lower zone -->
	<img src="/images/brand/ellipse-purple.webp" alt="" class="pointer-events-none absolute -left-[25%] top-[65%] w-[80%] opacity-20" aria-hidden="true" loading="lazy" width="250" height="250" />
	<img src="/images/brand/ellipse-blue.webp" alt="" class="pointer-events-none absolute -right-[15%] top-[72%] w-[75%] opacity-25" aria-hidden="true" loading="lazy" width="250" height="242" />

	<!-- Content sits above decorative layers -->
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
