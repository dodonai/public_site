<script>
	let scrollY = $state(0);
	let mobileMenuOpen = $state(false);
	let servicesDropdownOpen = $state(false);

	const scrolled = $derived(scrollY > 20);

	const services = [
		{ name: 'Deposition Summaries', description: 'Get deposition transcripts summarized in minutes.', href: '/deposition-summary-software/', icon: '/images/webflow/Group-572.svg' },
		{ name: 'Deposition Transcript Management', description: 'Manage citations and annotations. AI-powered search and analysis.', href: '/ai-deposition-transcript-software/', icon: '/images/webflow/Group-572.svg' },
		{ name: 'Medical Records Summaries', description: 'Get instant medical records summaries and chronologies.', href: '/ai-medical-record-summaries-chronologies/', icon: '/images/webflow/Group-569.svg' },
		{ name: 'AI-Powered OCR', description: 'Next-generation OCR to extract text, handwriting, tables, images, and more.', href: '/ai-pdf-ocr/', icon: '/images/webflow/Group-565.svg' },
		{ name: 'Dodonai XD Agents', description: 'Create templates for common report formats and our AI agents will extract data from your documents and build your reports.', href: '/dodonai-extract-and-draft-agents/', icon: '/images/webflow/Group-564.svg' },
		{ name: 'E-Discovery', description: 'Use semantic search over documents to find exactly what you are looking for.', href: '/electronic-discovery-software/', icon: '/images/webflow/Group-569.svg' }
	];

	function closeMobileMenu() {
		mobileMenuOpen = false;
		servicesDropdownOpen = false;
	}
</script>

<svelte:window bind:scrollY />

<header
	class="z-50 transition-all duration-300 {scrolled
		? 'bg-white shadow-sm'
		: 'bg-white'}"
>
	<div class="mx-auto flex h-16 items-center justify-between px-4 lg:h-20" style="width: 90%; max-width: 1250px;">
		<!-- Logo -->
		<a href="/" class="flex-shrink-0" onclick={closeMobileMenu}>
			<img src="/images/brand/logo-main.png" alt="Dodonai" class="h-auto w-[163px]" />
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-8 lg:flex">
			<!-- Services Dropdown -->
			<div class="relative">
				<button
					class="flex items-center gap-1 text-base font-medium transition-colors"
					style="color: var(--midnight-blue);"
					onmouseenter={() => (servicesDropdownOpen = true)}
					onmouseleave={() => {}}
					onfocus={() => (servicesDropdownOpen = true)}
					onclick={() => (servicesDropdownOpen = !servicesDropdownOpen)}
					onblur={() => setTimeout(() => (servicesDropdownOpen = false), 200)}
				>
					Services
					<svg
						class="h-4 w-4 transition-transform {servicesDropdownOpen ? 'rotate-180' : ''}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if servicesDropdownOpen}
					<div
						class="absolute -left-4 top-full mt-2 bg-white p-4"
						style="box-shadow: 0 10px 100px rgba(0, 0, 0, 0.05); border-radius: 10px; width: 720px;"
						onmouseenter={() => (servicesDropdownOpen = true)}
						onmouseleave={() => (servicesDropdownOpen = false)}
						role="menu"
					>
						<div class="grid grid-cols-2 gap-1">
							{#each services as service}
								<a
									href={service.href}
									class="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-[#836ae41a]"
									style="color: var(--midnight-blue);"
									onclick={() => (servicesDropdownOpen = false)}
									role="menuitem"
								>
									<img src={service.icon} alt="" class="mt-0.5 h-8 w-8 flex-shrink-0" />
									<div>
										<div class="text-sm font-medium" style="color: var(--midnight-blue);">{service.name}</div>
										<div class="mt-0.5 text-xs leading-relaxed" style="color: var(--light-slate-grey);">{service.description}</div>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<a
				href="/pricing/"
				class="nav-link text-base font-medium transition-colors"
				style="color: var(--midnight-blue);"
			>
				Pricing
			</a>
			<a
				href="/blog/"
				class="nav-link text-base font-medium transition-colors"
				style="color: var(--midnight-blue);"
			>
				Blog
			</a>
		</nav>

		<!-- Desktop CTA Buttons -->
		<div class="hidden items-center gap-6 lg:flex">
			<a
				href="https://app.dodon.ai/login"
				class="nav-link text-base font-medium transition-colors"
				style="color: var(--midnight-blue);"
			>
				Login
			</a>
			<a
				href="https://app.dodon.ai/signup"
				class="btn-brand-nav"
			>
				Get Started
			</a>
		</div>

		<!-- Mobile Hamburger Button -->
		<button
			class="p-2 lg:hidden"
			style="color: var(--midnight-blue);"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label="Toggle menu"
		>
			{#if mobileMenuOpen}
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			{/if}
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="absolute left-0 right-0 top-full border-t border-gray-200 bg-white shadow-lg lg:hidden">
			<nav class="mx-auto px-4 py-4 sm:px-6" style="width: 90%; max-width: 1250px;">
				<div class="border-b border-gray-100 pb-2">
					<button
						class="flex w-full items-center justify-between py-3 text-base font-medium"
						style="color: var(--midnight-blue);"
						onclick={() => (servicesDropdownOpen = !servicesDropdownOpen)}
					>
						Services
						<svg
							class="h-4 w-4 transition-transform {servicesDropdownOpen ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if servicesDropdownOpen}
						<div class="ml-2 space-y-1 pb-2">
							{#each services as service}
								<a
									href={service.href}
									class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-[#836ae41a]"
									onclick={closeMobileMenu}
								>
									<img src={service.icon} alt="" class="mt-0.5 h-6 w-6 flex-shrink-0" />
									<div>
										<div class="text-sm font-medium" style="color: var(--midnight-blue);">{service.name}</div>
										<div class="text-xs leading-relaxed" style="color: var(--light-slate-grey);">{service.description}</div>
									</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<a
					href="/pricing/"
					class="block border-b border-gray-100 py-3 text-base font-medium"
					style="color: var(--midnight-blue);"
					onclick={closeMobileMenu}
				>
					Pricing
				</a>
				<a
					href="/blog/"
					class="block border-b border-gray-100 py-3 text-base font-medium"
					style="color: var(--midnight-blue);"
					onclick={closeMobileMenu}
				>
					Blog
				</a>

				<div class="mt-4 flex flex-col gap-3">
					<a
						href="https://app.dodon.ai/login"
						class="block py-2 text-center text-base font-medium"
						style="color: var(--midnight-blue);"
						onclick={closeMobileMenu}
					>
						Login
					</a>
					<a
						href="https://app.dodon.ai/signup"
						class="btn-brand-nav block text-center"
						onclick={closeMobileMenu}
					>
						Get Started
					</a>
				</div>
			</nav>
		</div>
	{/if}
</header>

<style>
	.nav-link:hover {
		color: #282876b3 !important;
	}
</style>
