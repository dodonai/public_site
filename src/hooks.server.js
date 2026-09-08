import homepage from '$lib/standalone/homepage.html?raw';
import howItWorks from '$lib/standalone/how-it-works.html?raw';
import { renderStandalonePage } from '$lib/server/renderStandalonePage.js';

const pages = {
	'/': {
		source: homepage,
		canonical: '/',
		title: 'AI Systems Built and Run for Your Firm | Dodonai',
		description:
			'Dodonai organizes, connects, automates, and runs firm-owned AI systems around your workflows and existing software.'
	},
	'/ai-managed-services/how-it-works': {
		source: howItWorks,
		canonical: '/ai-managed-services/how-it-works/',
		title: 'How It Works | Dodonai',
		description:
			'Start with one task. Dodonai learns the work, connects the systems already in place, builds the automation, and improves it with you.'
	}
};

/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	const pathname = event.url.pathname === '/' ? '/' : event.url.pathname.replace(/\/$/, '');
	const page = pages[pathname];
	if (!page) return resolve(event);

	const standaloneHtml = renderStandalonePage(page.source, page);
	return resolve(event, {
		transformPageChunk: ({ done }) => (done ? standaloneHtml : '')
	});
}
