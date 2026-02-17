<script>
	let {
		name,
		monthlyPrice,
		yearlyPrice,
		yearlyMonthlyPrice,
		monthlyCredits,
		yearlyCredits,
		features,
		ctaUrl,
		isYearly,
		isPopular = false
	} = $props();

	const isEnterprise = $derived(monthlyPrice === null);
	const displayPrice = $derived(isYearly ? yearlyMonthlyPrice : monthlyPrice);
	const displayCredits = $derived(isYearly ? yearlyCredits : monthlyCredits);
	const creditsLabel = $derived(isYearly ? 'credits per year' : 'credits per month');
	const ctaText = $derived(isEnterprise ? 'Contact Sales' : 'Get Started');
</script>

<div
	class="relative flex flex-col rounded-[9px] border bg-white shadow-brand-pricing transition-all duration-300 hover:-translate-y-1 hover:shadow-lg {isPopular
		? 'border-[#836ae4] border-2 shadow-[#836ae41a]'
		: 'border-[#e5e5e5]'}"
>
	{#if isPopular}
		<div
			class="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#836ae4] px-4 py-1 text-xs font-bold text-white"
		>
			Most Popular
		</div>
	{/if}

	<div class="flex flex-1 flex-col gap-6 p-6 sm:p-8">
		<h3 class="text-center text-xl font-bold text-[#282876]">{name}</h3>

		<div class="text-center">
			{#if isEnterprise}
				<div class="text-3xl font-extrabold text-[#282876] sm:text-4xl">Custom</div>
				<p class="mt-1 text-sm text-[#8181ac]">Tailored to your needs</p>
			{:else}
				<div class="flex items-baseline justify-center gap-1">
					<span class="text-lg text-[#8181ac]">$</span>
					<span class="text-4xl font-extrabold text-[#282876] sm:text-5xl">{displayPrice}</span>
					<span class="text-sm text-[#8181ac]">/month</span>
				</div>
				{#if isYearly}
					<p class="mt-1 text-sm text-[#8181ac]">billed ${yearlyPrice?.toLocaleString()} annually</p>
				{/if}
			{/if}
		</div>

		{#if !isEnterprise}
			<div class="rounded-lg bg-[#f4f5fd] px-4 py-2.5 text-center text-sm font-medium text-[#8181ac]">
				{displayCredits?.toLocaleString()} {creditsLabel}
			</div>
		{:else}
			<div class="rounded-lg bg-[#f4f5fd] px-4 py-2.5 text-center text-sm font-medium text-[#8181ac]">
				Unlimited credits
			</div>
		{/if}

		<ul class="flex flex-col gap-3">
			{#each features as feature}
				<li class="flex items-start gap-3">
					<img src="/images/brand/checkmark.svg" alt="" class="mt-0.5 h-5 w-5 flex-shrink-0" />
					<span class="text-sm text-[#8181ac]">{feature}</span>
				</li>
			{/each}
		</ul>

		<div class="mt-auto pt-4">
			<a
				href={ctaUrl}
				class="block w-full rounded-full py-3 text-center text-sm font-semibold transition-all {isPopular
					? 'bg-[#836ae4] text-white shadow-md hover:bg-[#282876] hover:shadow-lg'
					: 'border border-[#282876] text-[#282876] hover:bg-[#836ae4] hover:text-white hover:border-[#836ae4]'}"
			>
				{ctaText}
			</a>
		</div>
	</div>
</div>
