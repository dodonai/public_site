import { readFile, access } from 'node:fs/promises';
import { load } from 'cheerio';
import assert from 'node:assert/strict';
import { plans, pricingSchema, perCredit } from '../src/lib/data/pricing.js';
const stage = process.argv[2] === 'stage';
const host = stage ? 'https://landing.dodonai.com' : 'https://www.dodon.ai';
const xml = load(await readFile('build/sitemap.xml', 'utf8'), { xmlMode: true });
const pages = xml('url').toArray();
const titles = new Set(),
	descriptions = new Set();
let links = 0;
for (const entry of pages) {
	const loc = xml(entry).find('loc').first().text();
	assert(loc.startsWith('https://www.dodon.ai/'));
	const path = new URL(loc).pathname;
	assert(path.endsWith('/'));
	assert(!path.startsWith('/clients/'));
	const html = await readFile(`build${path}index.html`, 'utf8');
	const $ = load(html);
	assert.equal($('link[rel=canonical]').attr('href'), host + path, `canonical ${path}`);
	assert.equal(
		$('meta[name=robots]').attr('content'),
		stage ? 'noindex, nofollow' : 'index, follow',
		`robots ${path}`
	);
	assert.equal($('h1').length, 1, `H1 ${path}`);
	const title = $('title').text(),
		desc = $('meta[name=description]').attr('content');
	assert(title && !titles.has(title), `title ${path}`);
	titles.add(title);
	assert(desc && !descriptions.has(desc), `description ${path}`);
	descriptions.add(desc);
	assert(!$.text().includes('{{link:'), `link tokens ${path}`);
	for (const script of $('script[type="application/ld+json"]').toArray()) {
		const data = JSON.parse($(script).text());
		if (data['@type'] === 'BlogPosting')
			assert.equal(xml(entry).find('lastmod').text(), data.dateModified, `lastmod ${path}`);
	}
	for (const a of $('a[href^="/"]').toArray()) {
		const href = $(a).attr('href');
		if (href.startsWith('//')) continue;
		const u = new URL(href, host);
		if (u.pathname.startsWith('/site-chat')) continue;
		const dest = u.pathname.endsWith('/') ? u.pathname + 'index.html' : u.pathname;
		try {
			await access('build' + dest);
		} catch {
			throw new Error(`Broken link ${path} -> ${href}`);
		}
		links++;
	}
	if (path.startsWith('/blog/') && path != '/blog/')
		for (const img of $('article img').toArray()) {
			assert($(img).attr('alt') !== undefined, `alt ${path}`);
			assert(
				Number($(img).attr('width')) > 0 && Number($(img).attr('height')) > 0,
				`dimensions ${path} ${$(img).attr('src')}`
			);
		}
}
const robots = await readFile('build/robots.txt', 'utf8');
assert(stage ? /Disallow: \/\s/.test(robots) : !/Disallow: \/\s/.test(robots));
if (!stage) {
	try {
		await access('build/clients');
		throw new Error('Production has client deliverables');
	} catch (e) {
		if (e.code !== 'ENOENT') throw e;
	}
}
for (const [i, p] of plans.entries()) {
	assert.equal(pricingSchema.offers[i * 2].price, p.monthlyPrice);
	assert.equal(pricingSchema.offers[i * 2 + 1].price, p.yearlyPrice);
	assert.equal(p.yearlyCredits, p.monthlyCredits * 24);
	assert(perCredit(p, true) < perCredit(p, false));
}
console.log(
	`Validated ${pages.length} ${stage ? 'staging' : 'production'} pages: metadata, canonicals, H1, schema, sitemap dates, ${links} links, blog image dimensions, pricing, robots, client exclusion.`
);
