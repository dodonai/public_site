<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';
	import AgentCard from '$lib/components/ai-services/AgentCard.svelte';
	import {
		aiServicesPracticeAreas,
		aiServicesFunctions
	} from '$lib/data/navigation.js';

	let { data } = $props();
	const agents = $derived(data.agents);

	let practiceFilter = $state('');
	let functionFilter = $state('');

	const filteredAgents = $derived(
		agents.filter((a) => {
			const matchesPractice =
				!practiceFilter ||
				a.practiceAreas.includes(practiceFilter) ||
				a.practiceAreas.includes('all');
			const matchesFunction = !functionFilter || a.function === functionFilter;
			return matchesPractice && matchesFunction;
		})
	);

	const title = 'AI Agents for Law Firms — Browse the Catalog | Dodonai';
	const description =
		'Browse every AI agent we build for law firms. Filter by practice area or function. Intake, deadlines, client comms, operations, casework, and drafting.';
	const canonical = '/ai-services/agents/';

	const breadcrumbs = [
		{ name: 'Home', href: '/' },
		{ name: 'AI Services', href: '/ai-services/' },
		{ name: 'Browse All Agents' }
	];

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: title,
			description,
			url: `https://www.dodon.ai${canonical}`
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
				item: `https://www.dodon.ai${item.href || canonical}`
			}))
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: 'Dodonai AI Agents Catalog',
			itemListElement: agents.map((a, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: a.title,
				url: `https://www.dodon.ai/ai-services/agents/${a.slug}/`
			}))
		}
	]);

	function clearFilters() {
		practiceFilter = '';
		functionFilter = '';
	}
</script>

<SEOHead {title} {description} url={canonical} {jsonLd} />

<BlobBackground>
	<section class="bg-transparent pt-10 sm:pt-12">
		<div class="mx-auto w-[85%] max-w-[1250px]">
			<BreadcrumbNav items={breadcrumbs} url={canonical} />
		</div>
	</section>

	<section class="bg-transparent pt-10 pb-12 sm:pt-12 sm:pb-16">
		<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
			<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl lg:text-6xl">
				Every agent we build for law firms
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#8181ac]">
				Each one is built around your firm's specific matter mix, your case acceptance criteria, and your team's review habits. Filter by practice area or function to find what fits your work.
			</p>
		</div>
	</section>

	<!-- Filter UI -->
	<section class="bg-transparent pb-10">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-2xl border border-[#dcddf340] bg-white p-6 shadow-brand-card sm:p-8">
				<div>
					<div class="text-sm font-semibold uppercase tracking-wider text-[#836ae4]">
						Practice area
					</div>
					<div class="mt-3 flex flex-wrap gap-2">
						<button
							type="button"
							class="filter-chip {practiceFilter === '' ? 'active' : ''}"
							onclick={() => (practiceFilter = '')}
						>
							All
						</button>
						{#each aiServicesPracticeAreas as pa}
							<button
								type="button"
								class="filter-chip {practiceFilter === pa.slug ? 'active' : ''}"
								onclick={() => (practiceFilter = pa.slug)}
							>
								{pa.name}
							</button>
						{/each}
					</div>
				</div>

				<div class="mt-6">
					<div class="text-sm font-semibold uppercase tracking-wider text-[#216fed]">
						Function
					</div>
					<div class="mt-3 flex flex-wrap gap-2">
						<button
							type="button"
							class="filter-chip filter-chip-function {functionFilter === '' ? 'active' : ''}"
							onclick={() => (functionFilter = '')}
						>
							All
						</button>
						{#each aiServicesFunctions as fn}
							<button
								type="button"
								class="filter-chip filter-chip-function {functionFilter === fn.slug ? 'active' : ''}"
								onclick={() => (functionFilter = fn.slug)}
							>
								{fn.name}
							</button>
						{/each}
					</div>
				</div>

				{#if practiceFilter || functionFilter}
					<div class="mt-6 flex items-center justify-between border-t border-[#eef0fa] pt-4">
						<span class="text-sm text-[#8181ac]">
							Showing {filteredAgents.length} of {agents.length} agents
						</span>
						<button
							type="button"
							class="text-sm font-medium text-[#216fed] hover:underline"
							onclick={clearFilters}
						>
							Clear filters
						</button>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Agent grid -->
	<section class="bg-transparent pb-20 sm:pb-28">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			{#if filteredAgents.length > 0}
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredAgents as agent (agent.slug)}
						<AgentCard {agent} />
					{/each}
				</div>
			{:else}
				<div class="mx-auto max-w-md rounded-2xl border border-[#dcddf340] bg-white p-8 text-center shadow-brand-card">
					<p class="text-[#282876]">No agents match that combination yet.</p>
					<button
						type="button"
						class="mt-4 text-sm font-medium text-[#216fed] hover:underline"
						onclick={clearFilters}
					>
						Clear filters
					</button>
				</div>
			{/if}
		</div>
	</section>
</BlobBackground>

<CTASection />

<style>
	.filter-chip {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 0.875rem;
		border-radius: 9999px;
		border: 1px solid rgba(131, 106, 228, 0.3);
		background: transparent;
		color: #836ae4;
		font-size: 0.8125rem;
		font-weight: 500;
		transition: all 150ms ease;
		cursor: pointer;
	}

	.filter-chip:hover {
		background: rgba(131, 106, 228, 0.1);
	}

	.filter-chip.active {
		background: #836ae4;
		color: white;
		border-color: #836ae4;
	}

	.filter-chip-function {
		border-color: rgba(33, 111, 237, 0.3);
		color: #216fed;
	}

	.filter-chip-function:hover {
		background: rgba(33, 111, 237, 0.1);
	}

	.filter-chip-function.active {
		background: #216fed;
		color: white;
		border-color: #216fed;
	}
</style>
