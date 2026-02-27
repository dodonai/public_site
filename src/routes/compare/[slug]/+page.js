import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const data = await import(`$lib/data/hub-pages/compare/${params.slug}.json`);
		return { data: data.default };
	} catch {
		throw error(404, 'Page not found');
	}
}

export function entries() {
	const modules = import.meta.glob('/src/lib/data/hub-pages/compare/*.json', { eager: true });
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop().replace('.json', '')
	}));
}
