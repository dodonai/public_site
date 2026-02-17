export async function getBlogPosts() {
	const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });
	const allPosts = Object.entries(posts).map(([path, module]) => {
		const slug = path.split('/').pop().replace('.md', '');
		return {
			slug,
			...module.metadata
		};
	});
	return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getBlogPost(slug) {
	const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });
	const match = Object.entries(posts).find(([path]) => path.endsWith(`/${slug}.md`));
	if (!match) return null;
	const [, module] = match;
	return {
		slug,
		metadata: module.metadata,
		content: module.default
	};
}
