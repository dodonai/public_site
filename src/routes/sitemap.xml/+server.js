import { getBlogPosts } from '$lib/data/blog.server.js';

const staticPages = [
	'',
	'/pricing',
	'/blog',
	'/deposition-summary-software',
	'/ai-deposition-transcript-software',
	'/ai-medical-record-summaries-chronologies',
	'/ai-pdf-ocr',
	'/dodonai-extract-and-draft-agents',
	'/electronic-discovery-software',
	'/terms-and-conditions',
	'/privacy-policy'
];

export const prerender = true;

export async function GET() {
	const posts = await getBlogPosts();
	const baseUrl = 'https://www.dodon.ai';

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
		.map(
			(page) =>
				`<url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
		)
		.join('\n  ')}
  ${posts
		.map(
			(post) =>
				`<url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
		)
		.join('\n  ')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
