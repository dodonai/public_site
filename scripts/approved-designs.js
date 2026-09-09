import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { approvedPage } from '../src/lib/server/approvedPage.js';

// Compile reviewed designs into cacheable modules and CSS, rather than sending
// a second copy of their markup/styles in SvelteKit's serialized page data.
export function approvedDesigns() {
	const designs = {
		homepage: { file: 'homepage.html', id: 'approved-home' },
		method: { file: 'how-it-works.html', id: 'approved-method' }
	};
	const prefix = 'virtual:approved-';
	return {
		name: 'approved-designs',
		enforce: 'pre',
		resolveId(id) {
			if (id.startsWith(prefix)) return '\0' + id;
		},
		load(id) {
			if (!id.startsWith('\0' + prefix)) return;
			const name = id.slice(prefix.length + 1).replace(/\.css$/, '');
			const design = designs[name];
			if (!design) throw new Error(`Unknown approved design: ${name}`);
			const file = fileURLToPath(new URL('../src/lib/standalone/' + design.file, import.meta.url));
			this.addWatchFile(file);
			const { css, ...content } = approvedPage(readFileSync(file, 'utf8'), design.id);
			if (id.endsWith('.css')) return css;
			return `import ${JSON.stringify(prefix + name + '.css')};\nexport default ${JSON.stringify(content)};`;
		},
		handleHotUpdate({ file, server }) {
			if (Object.values(designs).some((design) => file.endsWith('/standalone/' + design.file))) {
				for (const [id, module] of server.moduleGraph.idToModuleMap) {
					if (id.startsWith('\0' + prefix)) server.moduleGraph.invalidateModule(module);
				}
				server.ws.send({ type: 'full-reload' });
				return [];
			}
		}
	};
}
