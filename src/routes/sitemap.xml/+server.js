import { getBlogPosts } from '$lib/data/blog.server.js';

const staticPages = [
	{ path: '', lastmod: '2026-02-18', priority: '1.0' },
	{ path: '/pricing', lastmod: '2026-02-18', priority: '0.8' },
	{ path: '/blog', lastmod: '2026-02-18', priority: '0.8' },
	{ path: '/deposition-summary-software', lastmod: '2026-02-18', priority: '0.9' },
	{ path: '/ai-deposition-transcript-software', lastmod: '2026-02-18', priority: '0.9' },
	{ path: '/ai-medical-record-summaries-chronologies', lastmod: '2026-02-18', priority: '0.9' },
	{ path: '/ai-pdf-ocr', lastmod: '2026-02-18', priority: '0.9' },
	{ path: '/dodonai-extract-and-draft-agents', lastmod: '2026-02-18', priority: '0.9' },
	{ path: '/electronic-discovery-software', lastmod: '2026-02-18', priority: '0.9' },
	{ path: '/terms-and-conditions', lastmod: '2026-01-01', priority: '0.3' },
	{ path: '/privacy-policy', lastmod: '2026-01-01', priority: '0.3' }
];

export const prerender = true;

/** @param {string[]} paths */
function discoverHubPages(paths) {
	return paths.map((p) => ({
		path: p,
		lastmod: '2026-02-18',
		priority: '0.8'
	}));
}

export async function GET() {
	const posts = await getBlogPosts();
	const baseUrl = 'https://www.dodon.ai';

	// Auto-discover hub pages
	let hubPageModules;
	try {
		hubPageModules = import.meta.glob('/src/lib/data/hub-pages/**/*.json', { eager: true });
	} catch {
		hubPageModules = {};
	}

	const hubPages = discoverHubPages(
		Object.keys(hubPageModules).map((filePath) => {
			const match = filePath.match(/\/hub-pages\/(.+)\/(.+)\.json$/);
			if (match) return `/${match[1]}/${match[2]}`;
			return null;
		}).filter(Boolean)
	);

	const allStaticPages = [...staticPages, ...hubPages];

	// Ensure all URLs have trailing slashes to match SvelteKit's trailingSlash: 'always' config
	const trail = (path) => (path && !path.endsWith('/') ? `${path}/` : path || '/');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allStaticPages
		.map(
			(page) =>
				`<url>
    <loc>${baseUrl}${trail(page.path)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
		)
		.join('\n  ')}
  ${posts
		.map(
			(post) =>
				`<url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
    <lastmod>${post.date}</lastmod>
    <priority>0.6</priority>${
		post.image
			? `
    <image:image>
      <image:loc>${baseUrl}${post.image}</image:loc>
      <image:title>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
    </image:image>`
			: ''
	}
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
