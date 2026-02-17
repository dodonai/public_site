import { getBlogPosts } from '$lib/data/blog.server.js';

export async function load() {
	const posts = await getBlogPosts();
	return { posts };
}
