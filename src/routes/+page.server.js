import source from '$lib/standalone/homepage.html?raw';
import { approvedPage } from '$lib/server/approvedPage.js';
const content = approvedPage(source, 'approved-home');
export function load() {
	return { content };
}
