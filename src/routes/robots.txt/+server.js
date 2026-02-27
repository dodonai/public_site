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
