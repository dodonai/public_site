<script>
	import { fly } from 'svelte/transition';
	import defaultTestimonials from '$lib/data/testimonials.json';

	let { testimonials = defaultTestimonials, showBgImage = true } = $props();

	let currentSlide = $state(0);
	let direction = $state(1); // 1 = forward (slide from right), -1 = backward (slide from left)
	let autoplayInterval = $state(null);
	let slideEl = $state(null);
	let maxHeight = $state(0);

	// Lock the container to the tallest slide observed so shorter slides don't cause layout shift
	$effect(() => {
		if (slideEl) {
			const h = slideEl.offsetHeight;
			if (h > maxHeight) maxHeight = h;
		}
	});

	function next() {
		direction = 1;
		currentSlide = (currentSlide + 1) % testimonials.length;
	}

	function prev() {
		direction = -1;
		currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
	}

	function goToSlide(index) {
		direction = index > currentSlide ? 1 : -1;
		currentSlide = index;
	}

	const current = $derived(testimonials[currentSlide]);

	// Auto-advance every 4 seconds (Webflow: data-delay="4000")
	$effect(() => {
		autoplayInterval = setInterval(next, 4000);
		return () => clearInterval(autoplayInterval);
	});
</script>

<section
	class="relative overflow-hidden"
	style={showBgImage ? "background: url('/images/brand/testimonial-bg.webp') 50% 100% / contain no-repeat;" : ''}
>
	<div class="mx-auto px-4 py-[100px] sm:px-6 lg:px-8" style="width: 85%; max-width: 1250px;">
		<div class="relative text-center">
			<!-- Navigation Arrows (outside the animated area so they don't slide) -->
			<button
				onclick={prev}
				class="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow-md focus:outline-none"
				aria-label="Previous testimonial"
			>
				<svg
					class="h-5 w-5"
					style="color: #282876;"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<button
				onclick={next}
				class="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow-md focus:outline-none"
				aria-label="Next testimonial"
			>
				<svg
					class="h-5 w-5"
					style="color: #282876;"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			<!-- Slide container: grid overlap ensures outgoing/incoming stack in the same cell -->
			<div class="grid overflow-hidden px-14" style="grid-template: 1fr / 1fr; min-height: {maxHeight}px;">
				{#key currentSlide}
					<div
						bind:this={slideEl}
						style="grid-area: 1 / 1; align-self: center;"
						in:fly={{ x: direction * 400, duration: 500, delay: 100 }}
						out:fly={{ x: direction * -400, duration: 500 }}
					>
						<!-- Quote icon -->
						<div class="mb-6 flex justify-center">
							<img src="/images/brand/quote.svg" alt="" class="h-8 w-8" aria-hidden="true" />
						</div>

						<!-- Headline quote -->
						{#if current.headline}
							<blockquote>
								<p
									class="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl"
									style="color: #282876;"
								>
									"{current.headline}"
								</p>
							</blockquote>
						{/if}

						<!-- Body quote -->
						<p
							class="mx-auto mt-6 max-w-2xl leading-relaxed {current.headline
								? 'text-base sm:text-lg'
								: 'text-2xl font-bold sm:text-3xl lg:text-4xl'}"
							style="color: {current.headline ? '#8181ac' : '#282876'};"
						>
							{#if current.headline}
								"{current.quote}"
							{:else}
								{current.quote}
							{/if}
						</p>

						<!-- Author -->
						<div class="mt-8 flex items-center justify-center gap-3">
							{#if current.author === 'Ben'}
								<img
									src="/images/brand/testimonial-ben.webp"
									alt={current.author}
									width="40"
									height="40"
									loading="lazy"
									class="h-10 w-10 rounded-full object-cover"
								/>
							{:else}
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
									style="background-color: #e8e8f4; color: #282876;"
								>
									{current.author.charAt(0)}
								</div>
							{/if}
							<p class="text-sm font-semibold" style="color: #282876;">
								{current.author}{#if current.role}, {current.role}{/if}{#if current.company},
									{current.company}{/if}
							</p>
						</div>
					</div>
				{/key}
			</div>
		</div>

		<!-- Dot indicators -->
		<div class="mt-8 flex items-center justify-center gap-2">
			{#each testimonials as _, i}
				<button
					onclick={() => goToSlide(i)}
					class="h-3 w-3 rounded-full transition-colors {i === currentSlide
						? 'bg-[#282876]'
						: 'bg-[#c4c4d6] hover:bg-[#8181ac]'}"
					aria-label="Go to testimonial {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>
