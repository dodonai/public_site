import { error } from '@sveltejs/kit';
import { aiServicesCaseStudies } from '$lib/data/navigation.js';

export async function load({ params }) {
	const entry = aiServicesCaseStudies.find((c) => c.slug === params.slug);
	if (!entry) throw error(404, 'Case study not found');

	let study;
	try {
		const m = await import(`$lib/data/services/ai-services/case-studies/${params.slug}.json`);
		study = m.default;
	} catch {
		throw error(404, 'Case study not found');
	}

	return { study };
}

export function entries() {
	return aiServicesCaseStudies.map((c) => ({ slug: c.slug }));
}
