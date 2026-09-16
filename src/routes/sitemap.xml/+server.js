import { getBlogPosts } from '$lib/data/blog.server.js';
import { aiServicesPracticeAreas, aiServicesFunctions } from '$lib/data/navigation.js';

const staticPages = [
	{ path: '', lastmod: '2026-09-15', priority: '1.0' },
	{ path: '/app', priority: '0.9' },
	{ path: '/pricing', lastmod: '2026-09-15', priority: '0.8' },
	{ path: '/blog', priority: '0.8' },
	{ path: '/deposition-summary-software', priority: '0.9' },
	{ path: '/ai-deposition-transcript-software', priority: '0.9' },
	{ path: '/ai-medical-record-summaries-chronologies', lastmod: '2026-09-15', priority: '0.9' },
	{ path: '/ai-pdf-ocr', priority: '0.9' },
	{ path: '/dodonai-extract-and-draft-agents', priority: '0.9' },
	{ path: '/electronic-discovery-software', priority: '0.9' },
	{ path: '/compare', priority: '0.8' },
	{ path: '/ai-managed-services', lastmod: '2026-09-15', priority: '0.9' },
	{ path: '/ai-managed-services/how-it-works', lastmod: '2026-09-15', priority: '0.8' },
	{ path: '/ai-managed-services/results', priority: '0.8' },
	{ path: '/ai-managed-services/safety', lastmod: '2026-09-15', priority: '0.8' },
	{ path: '/ai-managed-services/our-agents', priority: '0.8' },
	{ path: '/ai-managed-services/agents', priority: '0.8' },
	{ path: '/terms-and-conditions', priority: '0.3' },
	{ path: '/privacy-policy', priority: '0.3' }
];

export const prerender = true;

/** @param {string[]} paths */
function discoverHubPages(paths) {
	return paths.map((p) => ({
		path: p,

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
		Object.keys(hubPageModules)
			.map((filePath) => {
				const match = filePath.match(/\/hub-pages\/(.+)\/(.+)\.json$/);
				if (match) return `/${match[1]}/${match[2]}`;
				return null;
			})
			.filter(Boolean)
	);

	// Auto-discover ai-services agent pages
	let agentModules;
	try {
		agentModules = import.meta.glob('/src/lib/data/services/ai-services/agents/*.json', {
			eager: true
		});
	} catch {
		agentModules = {};
	}
	const agentPages = Object.keys(agentModules)
		.map((filePath) => {
			const match = filePath.match(/\/agents\/(.+)\.json$/);
			if (!match) return null;

			return { path: `/ai-managed-services/agents/${match[1]}`, priority: '0.7' };
		})
		.filter(Boolean);

	// Auto-discover ai-services case-study (results) pages
	let caseStudyModules;
	try {
		caseStudyModules = import.meta.glob('/src/lib/data/services/ai-services/case-studies/*.json', {
			eager: true
		});
	} catch {
		caseStudyModules = {};
	}
	const caseStudyPages = Object.keys(caseStudyModules)
		.map((filePath) => {
			const match = filePath.match(/\/case-studies\/(.+)\.json$/);
			return match ? { path: `/ai-managed-services/results/${match[1]}`, priority: '0.7' } : null;
		})
		.filter(Boolean);

	const aiServicesTaxonomy = [
		...aiServicesPracticeAreas.map((a) => a.href),
		...aiServicesFunctions.map((f) => f.href)
	].map((href) => {
		const path = href.replace(/\/$/, '');
		const slug = path.split('/').pop();
		return {
			path,

			priority: '0.7'
		};
	});

	const allStaticPages = [
		...staticPages,
		...hubPages,
		...agentPages,
		...caseStudyPages,
		...aiServicesTaxonomy
	];

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
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <priority>${page.priority}</priority>
  </url>`
		)
		.join('\n  ')}
  ${posts
		.map(
			(post) =>
				`<url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
    <lastmod>${post.dateModified || post.date}</lastmod>
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
