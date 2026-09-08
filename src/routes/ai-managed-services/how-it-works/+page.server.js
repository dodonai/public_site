import source from '$lib/standalone/how-it-works.html?raw';
import { approvedPage } from '$lib/server/approvedPage.js';
const content = approvedPage(source, 'approved-method');
export function load() {
	return { content };
}
