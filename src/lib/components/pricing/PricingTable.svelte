<script>
	import pricingData from '$lib/data/pricing.json';
	import PricingToggle from './PricingToggle.svelte';
	import PricingTier from './PricingTier.svelte';

	let { isYearly = $bindable(false) } = $props();
</script>

<div>
	<div class="mb-12 flex justify-center">
		<PricingToggle {isYearly} ontoggle={() => (isYearly = !isYearly)} />
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
		{#each pricingData as tier (tier.id)}
			<PricingTier
				name={tier.name}
				monthlyPrice={tier.monthlyPrice}
				yearlyPrice={tier.yearlyPrice}
				yearlyMonthlyPrice={tier.yearlyMonthlyPrice}
				monthlyCredits={tier.monthlyCredits}
				yearlyCredits={tier.yearlyCredits}
				features={tier.features}
				ctaUrl={tier.ctaUrl}
				{isYearly}
				isPopular={tier.popular === true}
			/>
		{/each}
	</div>
</div>
