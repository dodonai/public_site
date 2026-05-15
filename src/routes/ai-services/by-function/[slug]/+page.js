import { error } from '@sveltejs/kit';
import { aiServicesFunctions } from '$lib/data/navigation.js';

export async function load({ params }) {
	const fn = aiServicesFunctions.find((f) => f.slug === params.slug);
	if (!fn) throw error(404, 'Function not found');

	let customData = null;
	try {
		const m = await import(`$lib/data/services/ai-services/functions/${params.slug}.json`);
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
		.filter((a) => a.function === params.slug)
		.sort((a, b) => {
			if (a.tier === b.tier) return a.title.localeCompare(b.title);
			return a.tier === 'flagship' ? -1 : 1;
		});

	return { fn, customData, agents };
}

export function entries() {
	return aiServicesFunctions.map((f) => ({ slug: f.slug }));
}
