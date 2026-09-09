import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { load } from 'cheerio';
import { organization } from '../src/lib/data/organization.js';
import * as navigation from '../src/lib/data/navigation.js';

for (const route of ['/', '/app/', '/ai-managed-services/how-it-works/']) {
	const html = readFileSync(`build${route}index.html`, 'utf8');
	const $ = load(html);
	assert.equal($('main').length, 1, route + ' main landmark');
	assert.equal($('h1').length, 1, route + ' primary heading');
	assert.equal($('link[rel="canonical"]').length, 1);
	assert.equal($('link[rel="canonical"]').attr('href'), 'https://www.dodon.ai' + route);
	assert.equal(
		$('meta[name="robots"]').attr('content'),
		process.env.PUBLIC_NOINDEX === 'true' ? 'noindex, nofollow' : 'index, follow'
	);
	const schemas = $('script[type="application/ld+json"]')
		.toArray()
		.map((el) => JSON.parse($(el).text()));
	if (route !== '/ai-managed-services/how-it-works/') {
		assert.deepEqual(
			schemas.find((schema) => schema['@type'] === 'Organization'),
			organization
		);
	} else {
		assert.equal($('title').text(), 'How Our AI Automation Services Work | Dodonai');
		assert.equal(
			schemas.find((schema) => schema['@type'] === 'BreadcrumbList').itemListElement.length,
			3
		);
		assert.equal($('nav[aria-label="Breadcrumb"]').length, 1);
	}
	assert.equal($('footer .popular-guides a').length, 6);
	for (const key of [
		'aiServicesOverview',
		'aiServicesPracticeAreas',
		'aiServicesFunctions',
		'practiceAreas',
		'useCases',
		'industries',
		'compare'
	]) {
		for (const link of navigation[key])
			assert.ok($(`header.site-header a[href="${link.href}"]`).length, route + ' ' + link.href);
	}
	for (const el of $('a[href^="/"]').toArray()) {
		const url = new URL($(el).attr('href'), 'https://www.dodon.ai');
		const target = 'build' + url.pathname;
		assert.ok(
			existsSync(target) || existsSync(target + '/index.html'),
			route + ' broken link: ' + url.pathname
		);
		if (url.pathname === route && url.hash)
			assert.ok($(`[id="${url.hash.slice(1)}"]`).length, route + url.hash);
	}
	// Static designs should not recur inside serialized inline hydration data.
	for (const el of $('script:not([src])').toArray())
		assert.ok($(el).text().length < 20000, route + ' duplicated page data');
	if (route === '/') {
		for (const href of [
			'/ai-medical-record-summaries-chronologies/',
			'/deposition-summary-software/',
			'/ai-deposition-transcript-software/',
			'/ai-pdf-ocr/',
			'/electronic-discovery-software/'
		]) {
			assert.ok($(`#app a[href="${href}"]`).length, 'Missing contextual product link: ' + href);
		}
	}
	console.log(
		`${route}: SEO, navigation and payload checks passed (${Buffer.byteLength(html)} bytes / ${gzipSync(html).length} gzip)`
	);
}
assert.ok(existsSync('build/images/brand/logo-chime.svg'));
assert.ok(
	readFileSync('build/sitemap.xml', 'utf8').includes('<loc>https://www.dodon.ai/app/</loc>')
);
