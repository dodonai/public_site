// Comparisons index. Cards are derived from the JSON files in
// src/lib/data/hub-pages/compare/ so new comparison pages appear here
// automatically without a second list to maintain.
const files = import.meta.glob('/src/lib/data/hub-pages/compare/*.json', { eager: true });

const ACRONYMS = new Set(['ai', 'ocr', 'ime', 'phi', 'hipaa', 'pdf']);
const LOWERCASE = new Set(['for', 'and', 'or', 'the', 'a', 'an', 'of', 'to', 'in', 'vs']);

function titleFromSlug(slug) {
	return slug
		.split('-')
		.map((word, i) => {
			if (word === 'ediscovery') return 'eDiscovery';
			if (ACRONYMS.has(word)) return word.toUpperCase();
			if (i > 0 && LOWERCASE.has(word)) return word;
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
}

export function load() {
	const comparisons = Object.entries(files)
		.map(([path, mod]) => {
			const slug = path.split('/').pop().replace('.json', '');
			const d = mod.default;
			return {
				href: `/compare/${slug}/`,
				title: titleFromSlug(slug),
				description: d.seo?.description || d.hero?.subheadline || ''
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title));

	return { comparisons };
}
