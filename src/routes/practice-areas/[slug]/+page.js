export async function load({ params }) {
	const data = await import(`$lib/data/hub-pages/practice-areas/${params.slug}.json`);
	return { data: data.default };
}

export function entries() {
	const modules = import.meta.glob('/src/lib/data/hub-pages/practice-areas/*.json', { eager: true });
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop().replace('.json', '')
	}));
}
