import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });
	const match = Object.entries(posts).find(([path]) => path.endsWith(`/${params.slug}.md`));

	if (!match) throw error(404, 'Post not found');

	const [, module] = match;
	const currentCategory = module.metadata.category;

	const otherPosts = Object.entries(posts)
		.filter(([path]) => !path.endsWith(`/${params.slug}.md`))
		.map(([path, mod]) => ({
			slug: path.split('/').pop().replace('.md', ''),
			...mod.metadata
		}))
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	// Prefer same-category posts, fill remaining with most recent
	const sameCategory = otherPosts.filter((p) => p.category === currentCategory);
	const different = otherPosts.filter((p) => p.category !== currentCategory);
	const relatedPosts = [...sameCategory, ...different].slice(0, 3);

	return {
		post: module.metadata,
		content: module.default,
		relatedPosts
	};
}

export function entries() {
	const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });
	return Object.keys(posts).map((path) => ({
		slug: path.split('/').pop().replace('.md', '')
	}));
}
