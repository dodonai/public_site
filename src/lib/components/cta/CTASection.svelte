<script>
	let {
		headline = 'Start saving time and money on Day 1 with Dodonai',
		description = 'Learn how Dodonai can help take your law practice to the next level.'
	} = $props();

	let email = $state('');
	let submitted = $state(false);

	function handleSubmit(e) {
		e.preventDefault();
		if (!email) return;
		// Email is captured by HubSpot's Collected Forms feature via the HS tracking script
		// (loaded in analytics.js). No explicit API call needed — HS intercepts form submissions automatically.
		submitted = true;
	}
</script>

<section class="relative overflow-hidden py-20 sm:py-28" style="background-image: radial-gradient(circle at 0 0, #9076f4, #836ae4 72%)">
	<!-- Decorative wave at top -->
	<img src="/images/brand/wave-cta.png" alt="" class="pointer-events-none absolute -top-[10%] left-0 right-0 w-full opacity-40" aria-hidden="true" />
	<!-- Decorative blur blobs -->
	<img src="/images/brand/ellipse-lavender.png" alt="" class="pointer-events-none absolute -bottom-[40%] left-0 w-[70%] opacity-20" aria-hidden="true" />
	<img src="/images/brand/ellipse-pink.png" alt="" class="pointer-events-none absolute -right-[12%] -top-[16%] w-[70%] opacity-20" aria-hidden="true" />

	<div class="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
			{headline}
		</h2>

		<p class="mx-auto mt-4 max-w-xl text-lg text-white/80">
			{description}
		</p>

		{#if submitted}
			<div class="mx-auto mt-10 flex max-w-lg items-center justify-center gap-3 rounded-full bg-white/20 px-8 py-4">
				<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span class="text-lg font-semibold text-white">Email added! We'll be in touch.</span>
			</div>
		{:else}
			<form
				id="cta-email-capture"
				name="CTA Email Capture"
				onsubmit={handleSubmit}
				class="mx-auto mt-10 flex max-w-lg flex-col items-center gap-3 sm:flex-row"
			>
				<div class="relative flex-1 w-full">
					<svg class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
					</svg>
					<input
						type="email"
						name="email"
						bind:value={email}
						required
						placeholder="Enter your mail"
						class="w-full rounded-full border border-white/20 bg-white py-3.5 pl-12 pr-4 text-sm text-[#282876] placeholder-gray-400 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
					/>
				</div>
				<button
					type="submit"
					class="w-full rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#282876] shadow-md transition-all hover:bg-[#282876] hover:text-white hover:shadow-lg sm:w-auto"
				>
					Learn More
				</button>
			</form>
		{/if}
	</div>
</section>
