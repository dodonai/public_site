import { error } from '@sveltejs/kit';

export async function load({ params }) {
	let agent;
	try {
		const m = await import(`$lib/data/services/ai-services/agents/${params.slug}.json`);
		agent = m.default;
	} catch {
		throw error(404, 'Agent not found');
	}

	// Auto-derive related agents: others sharing this agent's function (flagship first).
	const modules = import.meta.glob('/src/lib/data/services/ai-services/agents/*.json', {
		eager: true
	});
	const related = Object.values(modules)
		.map((m) => m.default)
		.filter((a) => a.slug !== agent.slug && a.function === agent.function)
		.sort((a, b) => {
			if (a.tier === b.tier) return a.title.localeCompare(b.title);
			return a.tier === 'flagship' ? -1 : 1;
		})
		.slice(0, 3);

	return { agent, related };
}

export function entries() {
	const modules = import.meta.glob('/src/lib/data/services/ai-services/agents/*.json', {
		eager: true
	});
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop().replace('.json', '')
	}));
}
