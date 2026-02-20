/**
 * Replaces {{link:href|text}} placeholders with anchor tags.
 * Returns the string unchanged if no placeholders exist.
 */
export function linkify(text) {
	return text.replace(
		/\{\{link:([^|]+)\|([^}]+)\}\}/g,
		'<a href="$1" class="text-[#216fed] hover:underline">$2</a>'
	);
}
