<script>
	import SEOHead from '$lib/components/seo/SEOHead.svelte';
	import BreadcrumbNav from '$lib/components/seo/BreadcrumbNav.svelte';
	import BlobBackground from '$lib/components/layout/BlobBackground.svelte';
	import HubNav from '$lib/components/hub/HubNav.svelte';
	import CTASection from '$lib/components/cta/CTASection.svelte';

	let { data } = $props();

	const canonical = '/compare/';
	const seoTitle = 'Legal Software Comparisons for Law Firms | Dodonai';
	const seoDescription =
		'Compare deposition summary, medical chronology, and eDiscovery software by cost, turnaround, citations, and security. Side-by-side breakdowns for litigation teams.';

	const breadcrumbs = [{ name: 'Home', href: '/' }, { name: 'Compare' }];

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: seoTitle,
			description: seoDescription,
			url: `https://www.dodon.ai${canonical}`,
			publisher: {
				'@type': 'Organization',
				name: 'Dodonai',
				url: 'https://www.dodon.ai'
			}
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
			itemListElement: data.comparisons.map((c, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: c.title,
				url: `https://www.dodon.ai${c.href}`
			}))
		}
	]);
</script>

<SEOHead title={seoTitle} description={seoDescription} url={canonical} {jsonLd} />

<BlobBackground>
	<section class="bg-transparent py-20 sm:py-28">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-8">
				<BreadcrumbNav items={breadcrumbs} url={canonical} />
			</div>

			<div class="mx-auto max-w-3xl text-center">
				<h1 class="text-4xl font-extrabold tracking-tight text-[#282876] sm:text-5xl lg:text-6xl">
					Legal Software Comparisons
				</h1>
				<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#8181ac]">
					Side-by-side breakdowns of the tools litigation teams evaluate most — deposition
					summaries, medical chronologies, eDiscovery, and transcription — compared on cost,
					turnaround, citations, and security.
				</p>
			</div>
		</div>
	</section>

	<HubNav pages={data.comparisons} heading="Browse Comparisons" background="bg-transparent" />
</BlobBackground>

<CTASection offer="app" />
