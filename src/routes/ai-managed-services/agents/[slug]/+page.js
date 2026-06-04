import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const m = await import(`$lib/data/services/ai-services/agents/${params.slug}.json`);
		return { agent: m.default };
	} catch {
		throw error(404, 'Agent not found');
	}
}

export function entries() {
	const modules = import.meta.glob('/src/lib/data/services/ai-services/agents/*.json', { eager: true });
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop().replace('.json', '')
	}));
}
