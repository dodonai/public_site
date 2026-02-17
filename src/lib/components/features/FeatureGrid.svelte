<script>
	import features from '$lib/data/features.json';
	import FeatureCard from './FeatureCard.svelte';
</script>

<section id="features" class="bg-white py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-extrabold tracking-tight text-[#282876] sm:text-4xl lg:text-5xl">
				Automate record analysis with your new AI assistant
			</h2>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature (feature.title)}
				<FeatureCard
					icon={feature.icon}
					title={feature.title}
					description={feature.description}
					href={feature.href}
				/>
			{/each}
		</div>
	</div>
</section>
