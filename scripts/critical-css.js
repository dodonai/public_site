/**
 * Post-build HTML optimizer for performance:
 *
 *   1. Inlines CSS into <style> tags (eliminates render-blocking CSS requests)
 *   2. Converts <link rel="stylesheet"> to async loading (media="print" onload)
 *   3. Moves <link rel="modulepreload"> from <head> to end of <body>
 *      so JS doesn't compete with fonts for bandwidth on slow connections
 *
 * This eliminates render-blocking CSS and reduces font/LCP contention.
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname, resolve } from 'path';

const BUILD_DIR = 'build';

async function findHtmlFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await findHtmlFiles(fullPath)));
		} else if (entry.name.endsWith('.html')) {
			files.push(fullPath);
		}
	}
	return files;
}

// Cache CSS file contents to avoid re-reading shared files
const cssCache = new Map();

async function readCssFile(cssPath) {
	if (cssCache.has(cssPath)) return cssCache.get(cssPath);
	try {
		const content = await readFile(cssPath, 'utf8');
		cssCache.set(cssPath, content);
		return content;
	} catch {
		console.warn(`  Warning: Could not read CSS file: ${cssPath}`);
		return null;
	}
}

async function processHtml(filePath) {
	const html = await readFile(filePath, 'utf8');
	const htmlDir = dirname(filePath);

	let modified = html;

	// --- Inline stylesheets ---
	const linkRegex = /<link\s+([^>]*rel=["']stylesheet["'][^>]*)>/g;
	const hrefRegex = /href=["']([^"']+)["']/;

	let inlinedStyles = '';
	let asyncLinks = '';
	let noscriptLinks = '';

	const matches = [...html.matchAll(linkRegex)];

	for (const match of matches) {
		const fullTag = match[0];
		const attrs = match[1];
		const hrefMatch = attrs.match(hrefRegex);
		if (!hrefMatch) continue;

		const href = hrefMatch[1];

		// Resolve the CSS file path relative to the HTML file
		const cssPath = href.startsWith('/')
			? join(BUILD_DIR, href)
			: resolve(htmlDir, href);

		const css = await readCssFile(cssPath);
		if (!css) continue;

		// Inline the CSS
		inlinedStyles += css;

		// Convert to async loading pattern
		asyncLinks += `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">`;
		noscriptLinks += `<noscript><link rel="stylesheet" href="${href}"></noscript>`;

		// Remove the original blocking <link> tag
		modified = modified.replace(fullTag, '');
	}

	if (inlinedStyles) {
		// Insert inlined styles + async links before </head>
		const insertion = `<style>${inlinedStyles}</style>\n${asyncLinks}\n${noscriptLinks}`;
		modified = modified.replace('</head>', `${insertion}\n</head>`);
	}

	// --- Move modulepreload links from <head> to end of <body> ---
	// so they don't compete with font preloads for bandwidth on slow 4G.
	// Fonts need priority for fast LCP; JS only needed for hydration after paint.
	const modulepreloadRegex = /<link[^>]+rel="modulepreload"[^>]*>/g;
	const modulepreloads = modified.match(modulepreloadRegex) || [];
	if (modulepreloads.length > 0) {
		modified = modified.replace(modulepreloadRegex, '');
		modified = modified.replace('</body>', modulepreloads.join('\n') + '\n</body>');
	}

	if (modified !== html) {
		await writeFile(filePath, modified);
	}
}

async function run() {
	const htmlFiles = await findHtmlFiles(BUILD_DIR);
	console.log(`Inlining critical CSS in ${htmlFiles.length} HTML files...`);

	for (const file of htmlFiles) {
		await processHtml(file);
	}

	console.log('Done — CSS inlined and async-loaded.');
}

run().catch((err) => {
	console.error('Critical CSS inlining failed:', err);
	process.exit(1);
});
