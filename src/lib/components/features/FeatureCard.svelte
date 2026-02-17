<script>
	let { icon = '', title, description, href = '' } = $props();

	const iconMap = {
		document: '/images/brand/icon-deposition.svg',
		transcript: '/images/brand/icon-transcript.svg',
		medical: '/images/brand/icon-medical.svg',
		scan: '/images/brand/icon-ocr.svg',
		robot: '/images/brand/icon-xd.svg',
		search: '/images/brand/icon-search.svg'
	};

	const iconSrc = $derived(iconMap[icon] || '');
</script>

{#if href}
	<a
		{href}
		class="group block rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-card-hover"
	>
		{#if iconSrc}
			<img src={iconSrc} alt="" class="h-12 w-12" />
		{:else}
			<div
				class="flex h-12 w-12 items-center justify-center rounded-full bg-[#836ae41a] text-lg font-bold text-[#836ae4]"
			>
				{title ? title.charAt(0).toUpperCase() : '?'}
			</div>
		{/if}

		<h3 class="mt-5 text-lg font-bold text-[#282876] group-hover:text-[#216fed]">{title}</h3>
		<p class="mt-2 text-sm leading-relaxed text-[#8181ac]">{description}</p>
	</a>
{:else}
	<div class="rounded-2xl border border-[#dcddf340] bg-white p-8 shadow-brand-card">
		{#if iconSrc}
			<img src={iconSrc} alt="" class="h-12 w-12" />
		{:else}
			<div
				class="flex h-12 w-12 items-center justify-center rounded-full bg-[#836ae41a] text-lg font-bold text-[#836ae4]"
			>
				{title ? title.charAt(0).toUpperCase() : '?'}
			</div>
		{/if}

		<h3 class="mt-5 text-lg font-bold text-[#282876]">{title}</h3>
		<p class="mt-2 text-sm leading-relaxed text-[#8181ac]">{description}</p>
	</div>
{/if}
