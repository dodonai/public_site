<script>
	import { practiceAreas, useCases, compare, industries } from '$lib/data/navigation.js';

	let scrollY = $state(0);
	let mobileMenuOpen = $state(false);
	let activeDropdown = $state(null);
	let mobileActiveSection = $state(null);

	const scrolled = $derived(scrollY > 20);

	const services = [
		{ name: 'Deposition Summaries', description: 'Get deposition transcripts summarized in minutes.', href: '/deposition-summary-software/', icon: '/images/webflow/Group-572.svg' },
		{ name: 'Deposition Transcript Management', description: 'Manage citations and annotations. AI-powered search and analysis.', href: '/ai-deposition-transcript-software/', icon: '/images/webflow/Group-572.svg' },
		{ name: 'Medical Records Summaries', description: 'Get instant medical records summaries and chronologies.', href: '/ai-medical-record-summaries-chronologies/', icon: '/images/webflow/Group-569.svg' },
		{ name: 'AI-Powered OCR', description: 'Next-generation OCR to extract text, handwriting, tables, images, and more.', href: '/ai-pdf-ocr/', icon: '/images/webflow/Group-565.svg' },
		{ name: 'Dodonai XD Agents', description: 'Create templates for common report formats and our AI agents will extract data from your documents and build your reports.', href: '/dodonai-extract-and-draft-agents/', icon: '/images/webflow/Group-564.svg' },
		{ name: 'E-Discovery', description: 'Use semantic search over documents to find exactly what you are looking for.', href: '/electronic-discovery-software/', icon: '/images/webflow/Group-569.svg' }
	];

	const solutionsColumns = [
		{ label: 'Practice Areas', items: practiceAreas },
		{ label: 'Use Cases', items: useCases },
		{ label: 'Industries', items: industries }
	];

	function closeMobileMenu() {
		mobileMenuOpen = false;
		activeDropdown = null;
		mobileActiveSection = null;
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
			<img src="/images/brand/logo-main.webp" alt="Dodonai" class="h-auto w-[163px]" />
		</a>

		<!-- Desktop Navigation -->
		<nav class="relative hidden items-center gap-16 lg:flex">
			<!-- Services Dropdown -->
			<div class="relative">
				<button
					class="flex items-center gap-1 text-base font-medium transition-colors"
					style="color: var(--midnight-blue);"
					aria-haspopup="true"
					aria-expanded={activeDropdown === 'services'}
					onmouseenter={() => (activeDropdown = 'services')}
					onmouseleave={() => {}}
					onfocus={() => (activeDropdown = 'services')}
					onclick={() => (activeDropdown = activeDropdown === 'services' ? null : 'services')}
					onblur={() => setTimeout(() => { if (activeDropdown === 'services') activeDropdown = null; }, 200)}
				>
					Services
					<svg
						class="h-4 w-4 transition-transform {activeDropdown === 'services' ? 'rotate-180' : ''}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if activeDropdown === 'services'}
					<div
						class="absolute -left-4 top-full mt-2 bg-white p-4"
						style="box-shadow: 0 10px 100px rgba(0, 0, 0, 0.05); border-radius: 10px; width: 720px;"
						onmouseenter={() => (activeDropdown = 'services')}
						onmouseleave={() => (activeDropdown = null)}
						role="menu"
					>
						<div class="grid grid-cols-2 gap-1">
							{#each services as service}
								<a
									href={service.href}
									class="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-[#836ae41a]"
									style="color: var(--midnight-blue);"
									onclick={() => (activeDropdown = null)}
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

			<!-- Solutions Mega Dropdown -->
			<div class="static">
				<button
					class="flex items-center gap-1 text-base font-medium transition-colors"
					style="color: var(--midnight-blue);"
					aria-haspopup="true"
					aria-expanded={activeDropdown === 'solutions'}
					onmouseenter={() => (activeDropdown = 'solutions')}
					onmouseleave={() => {}}
					onfocus={() => (activeDropdown = 'solutions')}
					onclick={() => (activeDropdown = activeDropdown === 'solutions' ? null : 'solutions')}
					onblur={() => setTimeout(() => { if (activeDropdown === 'solutions') activeDropdown = null; }, 200)}
				>
					Solutions
					<svg
						class="h-4 w-4 transition-transform {activeDropdown === 'solutions' ? 'rotate-180' : ''}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if activeDropdown === 'solutions'}
					<div
						class="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white p-5"
						style="box-shadow: 0 10px 100px rgba(0, 0, 0, 0.05); border-radius: 10px; width: 880px; max-width: calc(100vw - 2rem);"
						onmouseenter={() => (activeDropdown = 'solutions')}
						onmouseleave={() => (activeDropdown = null)}
						role="menu"
					>
						<div class="grid grid-cols-3 gap-6">
							{#each solutionsColumns as column}
								<div>
									<div class="mb-2 px-3 text-xs font-semibold uppercase tracking-wider" style="color: var(--medium-slate-blue);">{column.label}</div>
									<div class="grid grid-cols-1 gap-1">
										{#each column.items as item}
											<a
												href={item.href}
												class="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#836ae41a]"
												style="color: var(--midnight-blue);"
												onclick={() => (activeDropdown = null)}
												role="menuitem"
											>
												{item.name}
											</a>
										{/each}
									</div>
								</div>
							{/each}
						</div>
						<div class="mt-3 border-t border-gray-100 pt-3">
							<div class="mb-2 px-3 text-xs font-semibold uppercase tracking-wider" style="color: var(--medium-slate-blue);">Compare</div>
							<div class="flex flex-wrap gap-x-4 gap-y-1 px-3">
								{#each compare as item}
									<a
										href={item.href}
										class="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#836ae41a]"
										style="color: var(--midnight-blue);"
										onclick={() => (activeDropdown = null)}
										role="menuitem"
									>
										{item.name}
									</a>
								{/each}
							</div>
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
				target="_blank"
				rel="noopener noreferrer"
				class="nav-link text-base font-medium transition-colors"
				style="color: var(--midnight-blue);"
			>
				Login
			</a>
			<a
				href="https://app.dodon.ai/signup"
				target="_blank"
				rel="noopener noreferrer"
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
				<!-- Services -->
				<div class="border-b border-gray-100 pb-2">
					<button
						class="flex w-full items-center justify-between py-3 text-base font-medium"
						style="color: var(--midnight-blue);"
						aria-expanded={mobileActiveSection === 'services'}
						onclick={() => (mobileActiveSection = mobileActiveSection === 'services' ? null : 'services')}
					>
						Services
						<svg
							class="h-4 w-4 transition-transform {mobileActiveSection === 'services' ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if mobileActiveSection === 'services'}
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

				<!-- Solutions Section -->
				<div class="border-b border-gray-100 pb-2">
					<button
						class="flex w-full items-center justify-between py-3 text-base font-medium"
						style="color: var(--midnight-blue);"
						aria-expanded={mobileActiveSection === 'solutions'}
						onclick={() => (mobileActiveSection = mobileActiveSection === 'solutions' ? null : 'solutions')}
					>
						Solutions
						<svg
							class="h-4 w-4 transition-transform {mobileActiveSection === 'solutions' ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if mobileActiveSection === 'solutions'}
						<div class="ml-2 space-y-3 pb-2">
							{#each solutionsColumns as column}
								<div>
									<div class="px-2 pb-1 text-xs font-semibold uppercase tracking-wider" style="color: var(--medium-slate-blue);">{column.label}</div>
									{#each column.items as item}
										<a
											href={item.href}
											class="block rounded-lg p-2 text-sm font-medium transition-colors hover:bg-[#836ae41a]"
											style="color: var(--midnight-blue);"
											onclick={closeMobileMenu}
										>
											{item.name}
										</a>
									{/each}
								</div>
							{/each}
							<div class="mt-1 border-t border-gray-100 pt-2">
								<div class="px-2 pb-1 text-xs font-semibold uppercase tracking-wider" style="color: var(--medium-slate-blue);">Compare</div>
								{#each compare as item}
									<a
										href={item.href}
										class="block rounded-lg p-2 text-sm font-medium transition-colors hover:bg-[#836ae41a]"
										style="color: var(--midnight-blue);"
										onclick={closeMobileMenu}
									>
										{item.name}
									</a>
								{/each}
							</div>
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
						target="_blank"
						rel="noopener noreferrer"
						class="block py-2 text-center text-base font-medium"
						style="color: var(--midnight-blue);"
						onclick={closeMobileMenu}
					>
						Login
					</a>
					<a
						href="https://app.dodon.ai/signup"
						target="_blank"
						rel="noopener noreferrer"
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
