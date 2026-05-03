<script>
	// Lead magnet: "Going (AI) Native with Your Law Firm" free PDF download.
	// Uses HubSpot Collected Forms (portal 39849981, loaded via analytics.js after consent).
	// Soft gate only — /downloads/going-ai-native.pdf is publicly accessible on GCS.
	// If user declined cookies, HS won't capture the lead but the download still works.

	let { background = 'bg-[#f4f5fd]' } = $props();

	let email = $state('');
	let submitted = $state(false);

	function handleSubmit(e) {
		e.preventDefault();
		if (!email) return;
		submitted = true;
	}
</script>

<section class="{background} py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
			<!-- Book cover mockup -->
			<div class="flex-shrink-0">
				<div
					class="relative mx-auto w-[200px] drop-shadow-2xl sm:w-[220px]"
					style="transform: perspective(800px) rotateY(-8deg) rotateX(2deg);"
				>
					<svg
						viewBox="0 0 220 300"
						xmlns="http://www.w3.org/2000/svg"
						role="img"
						aria-label="Going (AI) Native with Your Law Firm — free guide"
					>
						<!-- Cover background -->
						<rect width="220" height="300" rx="4" fill="#282876" />

						<!-- Spine shadow -->
						<rect width="12" height="300" rx="2" fill="#1e1e5c" />

						<!-- Top accent bar -->
						<rect x="12" y="0" width="208" height="6" fill="#216fed" />

						<!-- Decorative node pattern -->
						<circle cx="160" cy="60" r="40" fill="#836ae4" fill-opacity="0.12" />
						<circle cx="185" cy="85" r="22" fill="#216fed" fill-opacity="0.10" />
						<line x1="140" y1="50" x2="180" y2="80" stroke="#836ae4" stroke-width="1" stroke-opacity="0.3" />
						<line x1="165" y1="45" x2="192" y2="70" stroke="#216fed" stroke-width="1" stroke-opacity="0.2" />
						<circle cx="140" cy="50" r="3" fill="#836ae4" fill-opacity="0.5" />
						<circle cx="180" cy="80" r="3" fill="#836ae4" fill-opacity="0.5" />
						<circle cx="165" cy="45" r="2.5" fill="#216fed" fill-opacity="0.5" />
						<circle cx="192" cy="70" r="2.5" fill="#216fed" fill-opacity="0.5" />

						<!-- "FREE GUIDE" label -->
						<text x="30" y="44" font-family="'Plus Jakarta Display', sans-serif" font-size="9" font-weight="700" letter-spacing="2" fill="#216fed" fill-opacity="0.9">FREE GUIDE</text>

						<!-- Divider -->
						<line x1="30" y1="52" x2="120" y2="52" stroke="#216fed" stroke-width="1.5" stroke-opacity="0.6" />

						<!-- Title line 1: "Going" -->
						<text x="30" y="118" font-family="'Plus Jakarta Display', sans-serif" font-size="26" font-weight="800" fill="white">Going</text>

						<!-- Title line 2: "(AI)" in brand accent -->
						<text x="30" y="148" font-family="'Plus Jakarta Display', sans-serif" font-size="26" font-weight="800" fill="#836ae4">(AI)</text>

						<!-- Title line 3: "Native" -->
						<text x="30" y="178" font-family="'Plus Jakarta Display', sans-serif" font-size="26" font-weight="800" fill="white">Native</text>

						<!-- Subtitle divider -->
						<line x1="30" y1="194" x2="190" y2="194" stroke="white" stroke-width="1" stroke-opacity="0.2" />

						<!-- Subtitle -->
						<text x="30" y="214" font-family="'Plus Jakarta Display', sans-serif" font-size="9.5" fill="white" fill-opacity="0.75">How to Use AI to Run a</text>
						<text x="30" y="228" font-family="'Plus Jakarta Display', sans-serif" font-size="9.5" fill="white" fill-opacity="0.75">Smarter Legal Practice</text>

						<!-- Bottom bar -->
						<rect x="12" y="272" width="208" height="28" fill="#1e1e5c" />
						<text x="30" y="290" font-family="'Plus Jakarta Display', sans-serif" font-size="9" font-weight="600" fill="white" fill-opacity="0.8">Dodonai Team · 2026</text>
					</svg>
				</div>
			</div>

			<!-- Form + copy -->
			<div class="w-full max-w-lg lg:max-w-none lg:flex-1">
				<p class="text-sm font-semibold uppercase tracking-widest text-[#836ae4]">Free Download</p>
				<h2 class="mt-3 text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl">
					Going <span class="text-[#836ae4]">(AI)</span> Native with Your Law Firm
				</h2>
				<p class="mt-4 text-base leading-7 text-[#8181ac]">
					The step-by-step guide to building an AI-native legal practice — from your first workflow to a full agent stack running every morning. Written by the Dodonai team from what we've built and run ourselves.
				</p>

				<ul class="mt-5 space-y-2 text-sm text-[#8181ac]">
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-[#216fed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
						The 1% Problem — why most law firms are one workflow away from 10× leverage
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-[#216fed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
						The 3-layer architecture behind every agent we build (Skills, Connections, Schedules)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-[#216fed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
						How Dodonai's document engine feeds your agent stack end to end
					</li>
				</ul>

				{#if submitted}
					<div class="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
						<a
							href="/downloads/going-ai-native.pdf"
							download="Going-AI-Native-Dodonai.pdf"
							class="btn-brand-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
						>
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
							Download the Guide
						</a>
						<p class="text-sm text-[#8181ac]">PDF · 2.4 MB · Free</p>
					</div>
				{:else}
					<form
						id="lead-magnet-download"
						name="Lead Magnet: Going AI Native"
						onsubmit={handleSubmit}
						class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
					>
						<div class="relative flex-1">
							<svg class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
							<label for="lead-magnet-email" class="sr-only">Email address</label>
							<input
								id="lead-magnet-email"
								type="email"
								name="email"
								bind:value={email}
								required
								placeholder="your@lawfirm.com"
								class="w-full rounded-full border border-[#dcddf3] bg-white py-3 pl-11 pr-4 text-sm text-[#282876] placeholder-gray-400 shadow-sm focus:border-[#216fed] focus:outline-none focus:ring-2 focus:ring-[#216fed33]"
							/>
						</div>
						<button
							type="submit"
							disabled={!email}
							class="btn-brand-primary flex-shrink-0 px-6 py-3 text-sm font-semibold disabled:opacity-50"
						>
							Get Free Guide
						</button>
					</form>
					<p class="mt-3 text-xs text-[#8181ac]">No spam. We'll also send occasional updates on AI in legal.</p>
				{/if}
			</div>
		</div>
	</div>
</section>
