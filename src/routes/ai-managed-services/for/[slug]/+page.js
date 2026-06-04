import { error } from '@sveltejs/kit';
import { aiServicesPracticeAreas } from '$lib/data/navigation.js';

export async function load({ params }) {
	const area = aiServicesPracticeAreas.find((a) => a.slug === params.slug);
	if (!area) throw error(404, 'Practice area not found');

	let customData = null;
	try {
		const m = await import(`$lib/data/services/ai-services/practice-areas/${params.slug}.json`);
		customData = m.default;
	} catch {
		// No custom JSON yet; page renders from generic template + agent tags.
	}

	const agentModules = import.meta.glob(
		'/src/lib/data/services/ai-services/agents/*.json',
		{ eager: true }
	);
	const agents = Object.values(agentModules)
		.map((m) => m.default)
		.filter(
			(a) =>
				a.practiceAreas.includes(params.slug) || a.practiceAreas.includes('all')
		)
		.sort((a, b) => {
			if (a.tier === b.tier) return a.title.localeCompare(b.title);
			return a.tier === 'flagship' ? -1 : 1;
		});

	return { area, customData, agents };
}

export function entries() {
	return aiServicesPracticeAreas.map((a) => ({ slug: a.slug }));
}
