/**
 * Replaces {{link:href|text}} placeholders with anchor tags.
 * External URLs (starting with http) get target="_blank" rel="noopener noreferrer".
 * Returns the string unchanged if no placeholders exist.
 */

function escapeHtml(str) {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function linkify(text) {
	return text.replace(/\{\{link:([^|]+)\|([^}]+)\}\}/g, (_, href, label) => {
		if (!href.startsWith('/') && !href.startsWith('https://') && !href.startsWith('http://')) {
			return escapeHtml(label);
		}
		const safeHref = escapeHtml(href);
		const safeLabel = escapeHtml(label);
		if (href.startsWith('http')) {
			return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="text-[#216fed] hover:underline">${safeLabel}</a>`;
		}
		return `<a href="${safeHref}" class="text-[#216fed] hover:underline">${safeLabel}</a>`;
	});
}
