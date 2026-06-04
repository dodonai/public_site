import { getBlogPosts } from '$lib/data/blog.server.js';
import { aiServicesPracticeAreas, aiServicesFunctions } from '$lib/data/navigation.js';

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
	{ path: '/ai-managed-services', lastmod: '2026-06-04', priority: '0.9' },
	{ path: '/ai-managed-services/how-it-works', lastmod: '2026-04-16', priority: '0.8' },
	{ path: '/ai-managed-services/results', lastmod: '2026-06-04', priority: '0.8' },
	{ path: '/ai-managed-services/safety', lastmod: '2026-04-16', priority: '0.8' },
	{ path: '/ai-managed-services/our-agents', lastmod: '2026-04-16', priority: '0.8' },
	{ path: '/ai-managed-services/agents', lastmod: '2026-04-16', priority: '0.8' },
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

	// Auto-discover ai-services agent pages
	let agentModules;
	try {
		agentModules = import.meta.glob('/src/lib/data/services/ai-services/agents/*.json', {
			eager: true
		});
	} catch {
		agentModules = {};
	}
	// Agents re-titled in the 2026-06-04 SEO keyword repositioning pass
	const updatedAgents = new Set([
		'trust-account-reconciler',
		'billing-reconciler',
		'intake-triage',
		'docketing-deadlines',
		'conflict-check',
		'time-capture'
	]);
	const agentPages = Object.keys(agentModules)
		.map((filePath) => {
			const match = filePath.match(/\/agents\/(.+)\.json$/);
			if (!match) return null;
			const lastmod = updatedAgents.has(match[1]) ? '2026-06-04' : '2026-04-16';
			return { path: `/ai-managed-services/agents/${match[1]}`, lastmod, priority: '0.7' };
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
			return match ? { path: `/ai-managed-services/results/${match[1]}`, lastmod: '2026-06-04', priority: '0.7' } : null;
		})
		.filter(Boolean);

	// Practice areas + functions re-titled in the 2026-06-04 SEO repositioning pass
	const updatedTaxonomy = new Set([
		'family-law',
		'personal-injury',
		'real-estate',
		'estates-probate',
		'immigration',
		'cybersecurity-privacy',
		'casework-and-drafting'
	]);
	const aiServicesTaxonomy = [
		...aiServicesPracticeAreas.map((a) => a.href),
		...aiServicesFunctions.map((f) => f.href)
	].map((href) => {
		const path = href.replace(/\/$/, '');
		const slug = path.split('/').pop();
		return {
			path,
			lastmod: updatedTaxonomy.has(slug) ? '2026-06-04' : '2026-04-16',
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
