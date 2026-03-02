// Robots.txt is env-driven: set PUBLIC_NOINDEX=true at build time to block crawlers (staging).
// When unset, produces a permissive robots.txt with sitemap (production).
// The stage branch's deploy.yml sets this env var; production does not.
import { env } from '$env/dynamic/public';

export const prerender = true;

export function GET() {
	const noindex = env.PUBLIC_NOINDEX === 'true';

	const body = noindex
		? `User-agent: *\nDisallow: /\n`
		: `User-agent: *
Allow: /
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: https://www.dodon.ai/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}
