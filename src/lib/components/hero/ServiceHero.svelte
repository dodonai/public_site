<script>
	let {
		headline,
		subheadline,
		bullets = [],
		ctaText = 'Start Free Trial',
		ctaUrl = 'https://app.dodon.ai/signup',
		secondaryCtaText = '',
		secondaryCtaUrl = '',
		badges = [],
		background = 'bg-[#f4f5fd]',
		children
	} = $props();

	/** Map badge text to a certification-specific icon, falling back to checkmark. */
	function badgeIcon(badge) {
		const lower = badge.toLowerCase();
		if (lower.includes('soc')) return '/images/brand/icon-soc2.svg';
		if (lower.includes('hipaa')) return '/images/brand/icon-hipaa.svg';
		return '/images/brand/checkmark.svg';
	}

	/** Certification badges get the prominent pill style; others keep the compact style. */
	function isCertBadge(badge) {
		const lower = badge.toLowerCase();
		return lower.includes('soc') || lower.includes('hipaa');
	}
</script>

<section class="{background} relative overflow-hidden">
	<div class="relative mx-auto w-[85%] max-w-[1250px] pb-[100px] pt-[100px]">
		{#if children}
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<div class="flex flex-col max-lg:items-center max-lg:text-center">
					<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl lg:text-6xl">
						{headline}
					</h1>

					{#if subheadline}
						<p class="mt-6 text-lg leading-8 text-[#8181ac] sm:text-xl">
							{subheadline}
						</p>
					{/if}

					{#if bullets.length > 0}
						<ul class="mt-8 space-y-3">
							{#each bullets as bullet}
								<li class="flex items-start gap-3 text-[#282876]">
									<img src="/images/brand/checkmark.svg" alt="" class="mt-0.5 h-5 w-5 flex-shrink-0" />
									<span class="text-sm font-medium sm:text-base">{bullet}</span>
								</li>
							{/each}
						</ul>
					{/if}

					<div class="mt-10 flex flex-wrap items-center gap-4 max-lg:justify-center sm:gap-6">
						<a
							href={ctaUrl}
							{...ctaUrl.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
							class="btn-brand-primary inline-block"
						>
							{ctaText}
						</a>
						{#if secondaryCtaText}
							<a href={secondaryCtaUrl} class="btn-brand-outline inline-block">
								{secondaryCtaText}
							</a>
						{/if}
					</div>

					{#if badges.length > 0}
						<div class="mt-10 flex flex-wrap items-center gap-4 max-lg:justify-center sm:gap-5">
							{#each badges as badge}
								{#if isCertBadge(badge)}
									<div class="flex items-center gap-3 rounded-full border border-[#282876]/10 bg-[#f4f5fd] px-5 py-2.5">
										<img src={badgeIcon(badge)} alt="" class="h-7 w-7" />
										<span class="text-sm font-semibold tracking-wide text-[#282876]">{badge}</span>
									</div>
								{:else}
									<div class="flex items-center gap-2 rounded-full border border-[#282876]/10 bg-[#f4f5fd] px-4 py-2">
										<span class="flex h-5 w-5 items-center justify-center rounded-full" style="background-color: #49a84729;">
											<img src="/images/brand/checkmark.svg" alt="" class="h-3 w-3" />
										</span>
										<span class="text-sm font-medium text-[#282876]">{badge}</span>
									</div>
								{/if}
							{/each}
						</div>
					{/if}
				</div>

				<div class="w-full">
					{@render children()}
				</div>
			</div>
		{:else}
			<div class="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
				<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl lg:text-6xl">
					{headline}
				</h1>

				{#if subheadline}
					<p class="mt-6 text-lg leading-8 text-[#8181ac] sm:text-xl">
						{subheadline}
					</p>
				{/if}

				{#if bullets.length > 0}
					<ul class="mt-8 space-y-3">
						{#each bullets as bullet}
							<li class="flex items-start gap-3 text-[#282876]">
								<img src="/images/brand/checkmark.svg" alt="" class="mt-0.5 h-5 w-5 flex-shrink-0" />
								<span class="text-sm font-medium sm:text-base">{bullet}</span>
							</li>
						{/each}
					</ul>
				{/if}

				<div class="mt-10 flex flex-wrap items-center gap-4 max-lg:justify-center sm:gap-6">
					<a
						href={ctaUrl}
						{...ctaUrl.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
						class="btn-brand-primary inline-block"
					>
						{ctaText}
					</a>
					{#if secondaryCtaText}
						<a href={secondaryCtaUrl} class="btn-brand-outline inline-block">
							{secondaryCtaText}
						</a>
					{/if}
				</div>

				{#if badges.length > 0}
					<div class="mt-10 flex flex-wrap items-center gap-4 max-lg:justify-center sm:gap-5">
						{#each badges as badge}
							{#if isCertBadge(badge)}
								<div class="flex items-center gap-3 rounded-full border border-[#282876]/10 bg-[#f4f5fd] px-5 py-2.5">
									<img src={badgeIcon(badge)} alt="" class="h-7 w-7" />
									<span class="text-sm font-semibold tracking-wide text-[#282876]">{badge}</span>
								</div>
							{:else}
								<div class="flex items-center gap-2 rounded-full border border-[#282876]/10 bg-[#f4f5fd] px-4 py-2">
									<span class="flex h-5 w-5 items-center justify-center rounded-full" style="background-color: #49a84729;">
										<img src="/images/brand/checkmark.svg" alt="" class="h-3 w-3" />
									</span>
									<span class="text-sm font-medium text-[#282876]">{badge}</span>
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>
