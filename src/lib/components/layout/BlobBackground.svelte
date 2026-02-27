<script>
	let { children } = $props();
</script>

<!-- Flowing content sections — unified background with decorative elements -->
<div class="relative overflow-hidden bg-white">
	<!-- Base gradient layer — hint of color so no section feels plain white -->
	<div
		class="pointer-events-none absolute inset-0 z-0"
		aria-hidden="true"
		style="background:
			radial-gradient(ellipse 80% 50% at 90% 5%, rgba(225, 244, 255, 0.3) 0%, transparent 70%),
			radial-gradient(ellipse 70% 40% at 10% 20%, rgba(249, 225, 255, 0.2) 0%, transparent 70%),
			radial-gradient(ellipse 80% 45% at 15% 55%, rgba(225, 244, 255, 0.25) 0%, transparent 70%),
			radial-gradient(ellipse 70% 40% at 85% 70%, rgba(249, 225, 255, 0.15) 0%, transparent 70%);"
	></div>

	<!-- Decorative blur blobs — staggered across full page height -->
	<!-- Top zone -->
	<img src="/images/brand/ellipse-blue.webp" alt="" class="pointer-events-none absolute -right-[10%] -top-[8%] w-[70%] opacity-35" aria-hidden="true" loading="lazy" />
	<img src="/images/brand/ellipse-pink.webp" alt="" class="pointer-events-none absolute -left-[20%] top-[3%] w-[60%] opacity-20" aria-hidden="true" loading="lazy" />
	<img src="/images/brand/wave-curve-left.webp" alt="" class="pointer-events-none absolute left-[-7%] top-[5%] w-[55%] opacity-30" aria-hidden="true" loading="lazy" />

	<!-- Upper-mid zone -->
	<img src="/images/brand/ellipse-purple.webp" alt="" class="pointer-events-none absolute -right-[25%] top-[22%] w-[80%] opacity-20" aria-hidden="true" loading="lazy" />

	<!-- Mid zone -->
	<img src="/images/brand/ellipse-blue.webp" alt="" class="pointer-events-none absolute -left-[30%] top-[42%] w-[90%] opacity-30" aria-hidden="true" loading="lazy" />
	<img src="/images/brand/wave-curve-right.webp" alt="" class="pointer-events-none absolute right-[-9%] top-[50%] w-[50%] opacity-30" aria-hidden="true" loading="lazy" />
	<img src="/images/brand/ellipse-pink.webp" alt="" class="pointer-events-none absolute -right-[20%] top-[55%] w-[70%] opacity-15" aria-hidden="true" loading="lazy" />

	<!-- Lower zone -->
	<img src="/images/brand/ellipse-purple.webp" alt="" class="pointer-events-none absolute -left-[25%] top-[65%] w-[80%] opacity-20" aria-hidden="true" loading="lazy" />
	<img src="/images/brand/ellipse-blue.webp" alt="" class="pointer-events-none absolute -right-[15%] top-[72%] w-[75%] opacity-25" aria-hidden="true" loading="lazy" />

	<!-- Bottom zone -->
	<img src="/images/brand/ellipse-pink.webp" alt="" class="pointer-events-none absolute -left-[20%] top-[88%] w-[70%] opacity-20" aria-hidden="true" loading="lazy" />

	<!-- Content sits above decorative layers -->
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
