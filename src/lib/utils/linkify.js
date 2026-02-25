/**
 * Replaces {{link:href|text}} placeholders with anchor tags.
 * External URLs (starting with http) get target="_blank" rel="noopener noreferrer".
 * Returns the string unchanged if no placeholders exist.
 */
export function linkify(text) {
	return text.replace(/\{\{link:([^|]+)\|([^}]+)\}\}/g, (_, href, label) => {
		if (href.startsWith('http')) {
			return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-[#216fed] hover:underline">${label}</a>`;
		}
		return `<a href="${href}" class="text-[#216fed] hover:underline">${label}</a>`;
	});
}
