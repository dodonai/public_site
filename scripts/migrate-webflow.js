#!/usr/bin/env node

/**
 * Webflow Content Migration Script
 * =================================
 * Scrapes the existing Dodonai Webflow site (www.dodon.ai) and generates
 * structured content files for the new SvelteKit marketing site.
 *
 * Outputs:
 *   - src/content/blog/{slug}.md         (blog posts with YAML frontmatter)
 *   - src/lib/data/services/{slug}.json  (service page content)
 *   - src/lib/data/features.json         (homepage features grid)
 *   - src/lib/data/testimonials.json     (homepage testimonials)
 *   - src/lib/data/pricing.json          (pricing tiers)
 *   - src/content/legal/terms.md         (terms & conditions)
 *   - src/content/legal/privacy.md       (privacy policy)
 *   - static/images/blog/               (downloaded hero images)
 *   - static/images/services/           (downloaded service images)
 *   - static/images/homepage/           (downloaded homepage images)
 *
 * Usage:
 *   npm run migrate
 *   node scripts/migrate-webflow.js
 *
 * Dependencies (devDependencies):
 *   cheerio, turndown
 *
 * Notes:
 *   - Uses native fetch (Node 20+)
 *   - Idempotent: safe to re-run, overwrites existing files
 *   - Webflow HTML structure varies; selectors may need manual tweaking
 *     after the initial run. Search for "WEBFLOW SELECTOR" comments to
 *     find all CSS selectors that target Webflow-specific markup.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

const BASE_URL = 'https://www.dodon.ai';

// Delay between fetches to avoid hammering the server (ms)
const FETCH_DELAY = 500;

// All pages to scrape
const PAGES = {
	homepage: BASE_URL,
	services: [
		{ url: `${BASE_URL}/deposition-summary-software`, slug: 'deposition-summaries' },
		{ url: `${BASE_URL}/ai-deposition-transcript-software`, slug: 'transcript-management' },
		{
			url: `${BASE_URL}/ai-medical-record-summaries-chronologies`,
			slug: 'medical-records'
		},
		{ url: `${BASE_URL}/ai-pdf-ocr`, slug: 'ai-ocr' },
		{ url: `${BASE_URL}/dodonai-extract-and-draft-agents`, slug: 'extract-draft-agents' },
		{ url: `${BASE_URL}/electronic-discovery-software`, slug: 'e-discovery' }
	],
	pricing: `${BASE_URL}/pricing`,
	blog: `${BASE_URL}/blog`,
	legal: [
		{ url: `${BASE_URL}/terms-and-conditions`, filename: 'terms' },
		{ url: `${BASE_URL}/privacy-policy`, filename: 'privacy' }
	]
};

// Output directories (relative to PROJECT_ROOT)
const DIRS = {
	blogContent: 'src/content/blog',
	legalContent: 'src/content/legal',
	servicesData: 'src/lib/data/services',
	libData: 'src/lib/data',
	blogImages: 'static/images/blog',
	serviceImages: 'static/images/services',
	homepageImages: 'static/images/homepage'
};

// ---------------------------------------------------------------------------
// Turndown (HTML -> Markdown) configuration
// ---------------------------------------------------------------------------

const turndown = new TurndownService({
	headingStyle: 'atx',
	codeBlockStyle: 'fenced',
	bulletListMarker: '-'
});

// Remove Webflow-specific elements that should not appear in markdown
turndown.remove(['script', 'style', 'noscript', 'iframe']);

// ---------------------------------------------------------------------------
// Helper: logging
// ---------------------------------------------------------------------------

function log(message) {
	const timestamp = new Date().toISOString().slice(11, 19);
	console.log(`[${timestamp}] ${message}`);
}

function logError(message, error) {
	const timestamp = new Date().toISOString().slice(11, 19);
	console.error(`[${timestamp}] ERROR: ${message}`);
	if (error) console.error(`  ${error.message || error}`);
}

// ---------------------------------------------------------------------------
// Helper: delay
// ---------------------------------------------------------------------------

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Helper: ensure directory exists
// ---------------------------------------------------------------------------

async function ensureDir(dirPath) {
	await mkdir(dirPath, { recursive: true });
}

// ---------------------------------------------------------------------------
// Helper: write JSON file
// ---------------------------------------------------------------------------

async function writeJSON(filePath, data) {
	const fullPath = join(PROJECT_ROOT, filePath);
	await ensureDir(dirname(fullPath));
	await writeFile(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
	log(`  Wrote ${filePath}`);
}

// ---------------------------------------------------------------------------
// Helper: write text file
// ---------------------------------------------------------------------------

async function writeText(filePath, content) {
	const fullPath = join(PROJECT_ROOT, filePath);
	await ensureDir(dirname(fullPath));
	await writeFile(fullPath, content, 'utf-8');
	log(`  Wrote ${filePath}`);
}

// ---------------------------------------------------------------------------
// fetchPage(url) — fetch HTML and return a cheerio instance
// ---------------------------------------------------------------------------

async function fetchPage(url) {
	log(`  Fetching ${url}`);
	const response = await fetch(url, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) DodonaiMigrationBot/1.0',
			Accept: 'text/html,application/xhtml+xml'
		}
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status} for ${url}`);
	}

	const html = await response.text();
	return cheerio.load(html);
}

// ---------------------------------------------------------------------------
// downloadImage(url, destPath) — download an image to a local path
//
// Returns the relative path from static/ (for use in content references),
// or null if the download failed.
// ---------------------------------------------------------------------------

async function downloadImage(imageUrl, destPath) {
	try {
		// Resolve relative URLs
		const absoluteUrl = imageUrl.startsWith('http')
			? imageUrl
			: new URL(imageUrl, BASE_URL).href;

		log(`  Downloading image: ${absoluteUrl}`);
		const response = await fetch(absoluteUrl);

		if (!response.ok) {
			logError(`Image download failed (HTTP ${response.status}): ${absoluteUrl}`);
			return null;
		}

		const buffer = Buffer.from(await response.arrayBuffer());
		const fullPath = join(PROJECT_ROOT, destPath);
		await ensureDir(dirname(fullPath));
		await writeFile(fullPath, buffer);

		// Return the path relative to the static/ directory for use in <img> tags
		// e.g. "static/images/blog/foo.jpg" -> "/images/blog/foo.jpg"
		const staticRelative = destPath.replace(/^static\//, '/');
		log(`  Saved image: ${destPath}`);
		return staticRelative;
	} catch (err) {
		logError(`Failed to download image: ${imageUrl}`, err);
		return null;
	}
}

// ---------------------------------------------------------------------------
// Slug helper — derive a URL-safe slug from a string
// ---------------------------------------------------------------------------

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

// ---------------------------------------------------------------------------
// extractBlogPosts(baseUrl) — scrape blog listing and all individual posts
// ---------------------------------------------------------------------------

async function extractBlogPosts(baseUrl) {
	log('Extracting blog posts...');
	const posts = [];

	try {
		const $ = await fetchPage(baseUrl);

		// WEBFLOW SELECTOR: blog listing page — links to individual posts
		// Webflow typically wraps blog items in a collection list with links.
		// Common patterns: .w-dyn-item a, .blog-card a, .blog-post-link
		const postLinks = [];

		$('a[href*="/blog/"]').each((_, el) => {
			const href = $(el).attr('href');
			if (href && href !== '/blog' && href !== '/blog/' && !postLinks.includes(href)) {
				postLinks.push(href);
			}
		});

		// Also look for Webflow dynamic list items
		// WEBFLOW SELECTOR: dynamic collection list items
		$('.w-dyn-item a, .w-dyn-list a').each((_, el) => {
			const href = $(el).attr('href');
			if (href && href.startsWith('/blog/') && !postLinks.includes(href)) {
				postLinks.push(href);
			}
		});

		// Deduplicate
		const uniqueLinks = [...new Set(postLinks)];
		log(`  Found ${uniqueLinks.length} blog post links`);

		for (const link of uniqueLinks) {
			try {
				await delay(FETCH_DELAY);
				const postUrl = link.startsWith('http') ? link : `${BASE_URL}${link}`;
				const post = await extractSingleBlogPost(postUrl);
				if (post) {
					posts.push(post);
				}
			} catch (err) {
				logError(`Failed to extract blog post: ${link}`, err);
			}
		}
	} catch (err) {
		logError('Failed to extract blog listing', err);
	}

	return posts;
}

// ---------------------------------------------------------------------------
// extractSingleBlogPost(url) — scrape a single blog post page
// ---------------------------------------------------------------------------

async function extractSingleBlogPost(url) {
	const $post = await fetchPage(url);

	// Derive slug from URL
	const urlParts = new URL(url).pathname.split('/').filter(Boolean);
	const slug = urlParts[urlParts.length - 1] || slugify(url);

	// WEBFLOW SELECTOR: blog post title
	// Common: h1, .blog-post-title, .post-title, [class*="heading"]
	const title =
		$post('h1').first().text().trim() ||
		$post('.blog-post-title, .post-title').first().text().trim() ||
		slug;

	// WEBFLOW SELECTOR: blog post author
	const author =
		$post('.blog-author, .author-name, [class*="author"]').first().text().trim() ||
		$post('meta[name="author"]').attr('content') ||
		'Dodonai Team';

	// WEBFLOW SELECTOR: blog post date
	// Webflow often uses a time element or a div with a specific class
	let dateStr =
		$post('time').first().attr('datetime') ||
		$post('time').first().text().trim() ||
		$post('.blog-date, .post-date, [class*="date"]').first().text().trim() ||
		$post('meta[property="article:published_time"]').attr('content') ||
		'';

	// Attempt to parse the date into YYYY-MM-DD format
	let date = '';
	if (dateStr) {
		try {
			const parsed = new Date(dateStr);
			if (!isNaN(parsed.getTime())) {
				date = parsed.toISOString().slice(0, 10);
			} else {
				date = dateStr;
			}
		} catch {
			date = dateStr;
		}
	}

	// WEBFLOW SELECTOR: blog post category/tag
	const category =
		$post('.blog-category, .post-category, [class*="category"], [class*="tag"]')
			.first()
			.text()
			.trim() || '';

	// WEBFLOW SELECTOR: hero/featured image
	let heroImageUrl =
		$post('.blog-hero-image img, .post-hero img, .blog-featured-image img')
			.first()
			.attr('src') ||
		$post('meta[property="og:image"]').attr('content') ||
		$post('.blog-post-image img, article img').first().attr('src') ||
		'';

	// Download hero image if found
	let heroImagePath = '';
	if (heroImageUrl) {
		const ext = extname(new URL(heroImageUrl, BASE_URL).pathname) || '.jpg';
		const imageDest = `${DIRS.blogImages}/${slug}${ext}`;
		const downloaded = await downloadImage(heroImageUrl, imageDest);
		if (downloaded) {
			heroImagePath = downloaded;
		}
	}

	// WEBFLOW SELECTOR: blog post body content
	// Webflow wraps the rich text body in a .w-richtext div or similar
	const bodySelectors = [
		'.w-richtext',
		'.blog-post-body',
		'.post-body',
		'.blog-content',
		'.post-content',
		'article .rich-text',
		'article'
	];

	let bodyHtml = '';
	for (const sel of bodySelectors) {
		const el = $post(sel).first();
		if (el.length && el.html().trim().length > 50) {
			bodyHtml = el.html();
			break;
		}
	}

	// Convert body HTML to Markdown
	const bodyMarkdown = bodyHtml ? turndown.turndown(bodyHtml).trim() : '';

	if (!bodyMarkdown && !title) {
		log(`  Skipping empty blog post: ${url}`);
		return null;
	}

	// Build YAML frontmatter
	const frontmatter = [
		'---',
		`title: "${title.replace(/"/g, '\\"')}"`,
		`date: "${date}"`,
		`author: "${author.replace(/"/g, '\\"')}"`,
		category ? `category: "${category.replace(/"/g, '\\"')}"` : null,
		heroImagePath ? `image: "${heroImagePath}"` : null,
		`description: "${$post('meta[name="description"]').attr('content')?.replace(/"/g, '\\"') || ''}"`,
		'---'
	]
		.filter(Boolean)
		.join('\n');

	const markdown = `${frontmatter}\n\n${bodyMarkdown}\n`;

	// Write the blog post file
	await writeText(`${DIRS.blogContent}/${slug}.md`, markdown);
	log(`  Extracted blog post: ${title} -> ${slug}.md`);

	return { slug, title, date, author, category };
}

// ---------------------------------------------------------------------------
// extractServicePage(url, slug) — scrape a service/product page
// ---------------------------------------------------------------------------

async function extractServicePage(url, slug) {
	log(`Extracting service page: ${slug} (${url})`);

	try {
		const $ = await fetchPage(url);
		const data = {};

		// --- SEO metadata ---
		data.seo = {
			title:
				$('meta[property="og:title"]').attr('content') ||
				$('title').text().trim() ||
				'',
			description:
				$('meta[name="description"]').attr('content') ||
				$('meta[property="og:description"]').attr('content') ||
				'',
			canonical: url.replace('www.dodon.ai', 'dodon.ai')
		};

		// --- Hero section ---
		// WEBFLOW SELECTOR: hero section — typically the first section on the page
		const heroSection = $(
			'section:first-of-type, .hero-section, .hero, [class*="hero"], header + section'
		).first();

		const heroH1 = heroSection.find('h1').first().text().trim() || $('h1').first().text().trim();
		const heroSubtext =
			heroSection
				.find('p, .hero-subtitle, .hero-description, [class*="subtitle"]')
				.first()
				.text()
				.trim() || '';

		// Extract bullet points from hero
		const heroBullets = [];
		heroSection.find('ul li, .hero-list li, [class*="bullet"] li').each((_, el) => {
			const text = $(el).text().trim();
			if (text) heroBullets.push(text);
		});

		// If no bullets in hero, look for a list immediately following the hero h1/p
		if (heroBullets.length === 0) {
			$('h1')
				.first()
				.parent()
				.find('ul li')
				.each((_, el) => {
					const text = $(el).text().trim();
					if (text) heroBullets.push(text);
				});
		}

		// WEBFLOW SELECTOR: CTA button in hero
		const ctaEl = heroSection.find('a.button, a.btn, a[class*="cta"], a[class*="button"]').first();
		const ctaText = ctaEl.text().trim() || 'Try It Free';
		const ctaUrl = ctaEl.attr('href') || 'https://app.dodon.ai/signup';

		data.hero = {
			headline: heroH1,
			subheadline: heroSubtext,
			bullets: heroBullets,
			ctaText,
			ctaUrl
		};

		// --- Features section ---
		// WEBFLOW SELECTOR: features — look for repeated heading+description pairs
		data.features = [];
		const featureSelectors = [
			'.features-section .feature-item',
			'.feature-card',
			'[class*="feature"] [class*="item"]',
			'.w-layout-grid > div',
			'section:nth-of-type(2) .w-layout-grid > div'
		];

		for (const sel of featureSelectors) {
			if (data.features.length > 0) break;
			$(sel).each((_, el) => {
				const featureTitle = $(el).find('h2, h3, h4, [class*="heading"]').first().text().trim();
				const featureDesc = $(el).find('p, [class*="text"], [class*="description"]').first().text().trim();
				if (featureTitle && featureDesc) {
					data.features.push({ title: featureTitle, description: featureDesc });
				}
			});
		}

		// Fallback: gather all h3 + following p pairs if no features found
		if (data.features.length === 0) {
			$('h3').each((_, el) => {
				const featureTitle = $(el).text().trim();
				const featureDesc = $(el).next('p').text().trim();
				if (featureTitle && featureDesc) {
					data.features.push({ title: featureTitle, description: featureDesc });
				}
			});
		}

		// --- How It Works section ---
		data.howItWorks = [];
		const howSelectors = [
			'[class*="how-it-works"] [class*="step"]',
			'[class*="steps"] [class*="step"]',
			'[class*="process"] [class*="item"]'
		];

		for (const sel of howSelectors) {
			if (data.howItWorks.length > 0) break;
			$(sel).each((_, el) => {
				const stepTitle = $(el).find('h2, h3, h4, [class*="heading"]').first().text().trim();
				const stepDesc = $(el).find('p, [class*="text"]').first().text().trim();
				if (stepTitle && stepDesc) {
					data.howItWorks.push({ title: stepTitle, description: stepDesc });
				}
			});
		}

		// --- FAQ section ---
		// WEBFLOW SELECTOR: FAQ accordion — Webflow uses various patterns
		data.faq = [];
		const faqSelectors = [
			'.faq-item, .faq-question',
			'[class*="accordion"] [class*="item"]',
			'[class*="faq"] [class*="item"]',
			'.w-dropdown'
		];

		for (const sel of faqSelectors) {
			if (data.faq.length > 0) break;
			$(sel).each((_, el) => {
				// WEBFLOW SELECTOR: question text within an FAQ item
				const question = $(el)
					.find(
						'h3, h4, [class*="question"], [class*="heading"], .w-dropdown-toggle, [class*="toggle"]'
					)
					.first()
					.text()
					.trim();
				// WEBFLOW SELECTOR: answer text within an FAQ item
				const answer = $(el)
					.find(
						'p, [class*="answer"], [class*="body"], .w-dropdown-list, [class*="content"]'
					)
					.first()
					.text()
					.trim();
				if (question && answer) {
					data.faq.push({ question, answer });
				}
			});
		}

		// --- Testimonials ---
		data.testimonials = [];
		const testimonialSelectors = [
			'.testimonial, [class*="testimonial"]',
			'[class*="review"]',
			'[class*="quote"]'
		];

		for (const sel of testimonialSelectors) {
			if (data.testimonials.length > 0) break;
			$(sel).each((_, el) => {
				const quote = $(el)
					.find('p, blockquote, [class*="quote"], [class*="text"]')
					.first()
					.text()
					.trim();
				const authorName = $(el)
					.find('[class*="author"], [class*="name"]')
					.first()
					.text()
					.trim();
				const role = $(el)
					.find('[class*="role"], [class*="title"], [class*="position"]')
					.first()
					.text()
					.trim();
				const company = $(el)
					.find('[class*="company"], [class*="org"]')
					.first()
					.text()
					.trim();
				if (quote) {
					data.testimonials.push({
						quote,
						author: authorName || 'Anonymous',
						role: role || '',
						company: company || ''
					});
				}
			});
		}

		// --- Video embed ---
		const videoIframe = $('iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="wistia"]').first();
		data.videoUrl = videoIframe.attr('src') || '';

		// --- Download images referenced on the page ---
		// Collect notable images (hero, feature illustrations, etc.)
		const pageImages = [];
		$('img').each((_, el) => {
			const src = $(el).attr('src');
			const alt = $(el).attr('alt') || '';
			if (src && !src.includes('data:image') && !src.includes('favicon')) {
				pageImages.push({ src, alt });
			}
		});

		// Download up to 20 images per service page to avoid excessive requests
		for (const img of pageImages.slice(0, 20)) {
			const imgSlug = slugify(img.alt || 'image') || 'img';
			const ext = extname(new URL(img.src, BASE_URL).pathname) || '.jpg';
			const destPath = `${DIRS.serviceImages}/${slug}/${imgSlug}${ext}`;
			await downloadImage(img.src, destPath);
		}

		// Write service data JSON
		await writeJSON(`${DIRS.servicesData}/${slug}.json`, data);
		log(`  Done extracting service: ${slug}`);

		return data;
	} catch (err) {
		logError(`Failed to extract service page: ${slug}`, err);
		return null;
	}
}

// ---------------------------------------------------------------------------
// extractHomepage(url) — scrape homepage content
// ---------------------------------------------------------------------------

async function extractHomepage(url) {
	log('Extracting homepage...');

	try {
		const $ = await fetchPage(url);

		// --- Features grid ---
		const features = [];

		// WEBFLOW SELECTOR: homepage feature grid items
		// Look for repeated cards/items in a grid layout
		const featureGridSelectors = [
			'.features-grid .feature-item',
			'[class*="feature"] [class*="card"]',
			'[class*="feature"] [class*="item"]',
			'.w-layout-grid [class*="feature"]',
			'[class*="grid"] [class*="card"]'
		];

		for (const sel of featureGridSelectors) {
			if (features.length > 0) break;
			$(sel).each((_, el) => {
				const title = $(el).find('h2, h3, h4, [class*="heading"]').first().text().trim();
				const description = $(el)
					.find('p, [class*="text"], [class*="description"]')
					.first()
					.text()
					.trim();
				if (title && description) {
					// Try to identify an icon from the element
					const iconEl = $(el).find('img, svg, [class*="icon"]').first();
					const iconSrc = iconEl.attr('src') || '';
					const iconClass = iconEl.attr('class') || '';

					features.push({
						icon: deriveIconName(iconSrc, iconClass, title),
						title,
						description
					});
				}
			});
		}

		// Fallback: look for all h3 elements within sections that might be features
		if (features.length === 0) {
			$('section')
				.find('h3')
				.each((_, el) => {
					const title = $(el).text().trim();
					const description = $(el).next('p').text().trim();
					if (title && description) {
						features.push({
							icon: deriveIconName('', '', title),
							title,
							description
						});
					}
				});
		}

		if (features.length > 0) {
			await writeJSON(`${DIRS.libData}/features.json`, features);
		} else {
			log('  WARNING: No features found on homepage. Keeping existing file.');
		}

		// --- Testimonials ---
		const testimonials = [];

		// WEBFLOW SELECTOR: testimonials on homepage
		const testimonialSelectors = [
			'.testimonial, [class*="testimonial"]',
			'[class*="review"]',
			'.slider-slide [class*="quote"]'
		];

		for (const sel of testimonialSelectors) {
			if (testimonials.length > 0) break;
			$(sel).each((_, el) => {
				const quote = $(el)
					.find('p, blockquote, [class*="quote"], [class*="text"]')
					.first()
					.text()
					.trim();
				const authorName = $(el)
					.find('[class*="author"], [class*="name"]')
					.first()
					.text()
					.trim();
				const role = $(el)
					.find('[class*="role"], [class*="title"], [class*="position"]')
					.first()
					.text()
					.trim();
				const company = $(el)
					.find('[class*="company"], [class*="org"]')
					.first()
					.text()
					.trim();
				if (quote) {
					testimonials.push({
						quote,
						author: authorName || 'Anonymous',
						role: role || '',
						company: company || ''
					});
				}
			});
		}

		if (testimonials.length > 0) {
			await writeJSON(`${DIRS.libData}/testimonials.json`, testimonials);
		} else {
			log('  WARNING: No testimonials found on homepage. Keeping existing file.');
		}

		// --- Download homepage images ---
		const heroImages = [];
		$('section:first-of-type img, .hero img, [class*="hero"] img').each((_, el) => {
			const src = $(el).attr('src');
			if (src && !src.includes('data:image')) {
				heroImages.push(src);
			}
		});

		for (const imgSrc of heroImages.slice(0, 10)) {
			const ext = extname(new URL(imgSrc, BASE_URL).pathname) || '.jpg';
			const imgFilename = `hero-${slugify(imgSrc.split('/').pop().split('.')[0] || 'image')}${ext}`;
			await downloadImage(imgSrc, `${DIRS.homepageImages}/${imgFilename}`);
		}

		log('  Done extracting homepage.');
	} catch (err) {
		logError('Failed to extract homepage', err);
	}
}

// ---------------------------------------------------------------------------
// deriveIconName — try to map an image/class to a known icon name
// ---------------------------------------------------------------------------

function deriveIconName(iconSrc, iconClass, title) {
	const text = `${iconSrc} ${iconClass} ${title}`.toLowerCase();

	const iconMap = [
		{ keywords: ['document', 'deposition', 'summary', 'file'], icon: 'document' },
		{ keywords: ['medical', 'health', 'record', 'chronolog'], icon: 'medical' },
		{ keywords: ['scan', 'ocr', 'extract'], icon: 'scan' },
		{ keywords: ['robot', 'agent', 'draft', 'ai'], icon: 'robot' },
		{ keywords: ['search', 'discovery', 'e-discovery'], icon: 'search' },
		{ keywords: ['transcript', 'text', 'manage'], icon: 'transcript' },
		{ keywords: ['gear', 'rule', 'custom', 'config'], icon: 'gear' },
		{ keywords: ['batch', 'layer', 'stack', 'process'], icon: 'layers' },
		{ keywords: ['shield', 'soc', 'security', 'secure', 'complian'], icon: 'shield' },
		{ keywords: ['lock', 'hipaa', 'encrypt', 'privacy'], icon: 'lock' },
		{ keywords: ['user', 'team', 'collaborat', 'workspace'], icon: 'users' },
		{ keywords: ['clock', 'fast', 'speed', 'time', 'turnaround'], icon: 'clock' }
	];

	for (const { keywords, icon } of iconMap) {
		if (keywords.some((kw) => text.includes(kw))) {
			return icon;
		}
	}

	return 'document'; // default fallback
}

// ---------------------------------------------------------------------------
// extractPricing(url) — scrape pricing page
// ---------------------------------------------------------------------------

async function extractPricing(url) {
	log('Extracting pricing page...');

	try {
		const $ = await fetchPage(url);
		const tiers = [];

		// WEBFLOW SELECTOR: pricing tier cards
		const tierSelectors = [
			'.pricing-tier, [class*="pricing"] [class*="card"]',
			'[class*="pricing"] [class*="tier"]',
			'[class*="pricing"] [class*="plan"]',
			'[class*="price-card"]',
			'.w-layout-grid > div'
		];

		for (const sel of tierSelectors) {
			if (tiers.length > 0) break;
			$(sel).each((_, el) => {
				const name = $(el)
					.find('h2, h3, [class*="name"], [class*="title"], [class*="heading"]')
					.first()
					.text()
					.trim();

				if (!name) return;

				// WEBFLOW SELECTOR: price amount
				const priceText = $(el)
					.find('[class*="price"], [class*="amount"], [class*="cost"]')
					.first()
					.text()
					.trim();

				// Try to parse a numeric price from the text
				const priceMatch = priceText.match(/\$(\d+)/);
				const monthlyPrice = priceMatch ? parseInt(priceMatch[1], 10) : null;

				// WEBFLOW SELECTOR: tier description
				const description = $(el)
					.find('[class*="description"], p:not([class*="price"])')
					.first()
					.text()
					.trim();

				// WEBFLOW SELECTOR: feature list within a tier
				const features = [];
				$(el)
					.find('ul li, [class*="feature"] li, [class*="benefit"]')
					.each((_, li) => {
						const featureText = $(li).text().trim();
						if (featureText) features.push(featureText);
					});

				// WEBFLOW SELECTOR: CTA button
				const ctaEl = $(el).find('a[class*="button"], a[class*="cta"], a.btn').first();
				const ctaText = ctaEl.text().trim() || 'Get Started';
				const ctaUrl = ctaEl.attr('href') || '';

				// Check if this is the popular/recommended tier
				const isPopular =
					$(el).find('[class*="popular"], [class*="recommended"], [class*="badge"]').length > 0 ||
					$(el).hasClass('popular') ||
					$(el).attr('class')?.includes('popular');

				const id = slugify(name);

				tiers.push({
					id,
					name,
					monthlyPrice,
					// Estimate yearly as 10x monthly (common discount pattern)
					yearlyPrice: monthlyPrice ? monthlyPrice * 10 : null,
					monthlyPages: null, // Will need manual adjustment
					yearlyPages: null,
					...(isPopular ? { popular: true } : {}),
					description: description || '',
					features,
					ctaText,
					ctaUrl
				});
			});
		}

		if (tiers.length > 0) {
			await writeJSON(`${DIRS.libData}/pricing.json`, tiers);
		} else {
			log('  WARNING: No pricing tiers found. Keeping existing file.');
		}

		log('  Done extracting pricing.');
	} catch (err) {
		logError('Failed to extract pricing page', err);
	}
}

// ---------------------------------------------------------------------------
// extractLegalPage(url, filename) — scrape a legal page to markdown
// ---------------------------------------------------------------------------

async function extractLegalPage(url, filename) {
	log(`Extracting legal page: ${filename} (${url})`);

	try {
		const $ = await fetchPage(url);

		// WEBFLOW SELECTOR: legal page content container
		const contentSelectors = [
			'.w-richtext',
			'.legal-content',
			'[class*="legal"]',
			'[class*="terms"]',
			'[class*="privacy"]',
			'[class*="policy"]',
			'article',
			'main .w-container',
			'main'
		];

		let contentHtml = '';
		for (const sel of contentSelectors) {
			const el = $(sel).first();
			if (el.length && el.html().trim().length > 100) {
				contentHtml = el.html();
				break;
			}
		}

		if (!contentHtml) {
			// Last resort: grab everything in <main> or the body minus nav/footer
			$('nav, footer, header, script, style').remove();
			contentHtml = $('main').html() || $('body').html() || '';
		}

		// Get the page title
		const title =
			$('h1').first().text().trim() ||
			$('title').text().trim() ||
			filename;

		// Convert to markdown
		const markdown = turndown.turndown(contentHtml).trim();

		// Write with a simple frontmatter header
		const frontmatter = [
			'---',
			`title: "${title.replace(/"/g, '\\"')}"`,
			`lastUpdated: "${new Date().toISOString().slice(0, 10)}"`,
			'---'
		].join('\n');

		await writeText(`${DIRS.legalContent}/${filename}.md`, `${frontmatter}\n\n${markdown}\n`);
		log(`  Done extracting legal page: ${filename}`);
	} catch (err) {
		logError(`Failed to extract legal page: ${filename}`, err);
	}
}

// ---------------------------------------------------------------------------
// main() — orchestrate everything
// ---------------------------------------------------------------------------

async function main() {
	const startTime = Date.now();

	console.log('');
	console.log('='.repeat(60));
	console.log('  Dodonai Webflow Content Migration');
	console.log('='.repeat(60));
	console.log('');

	// Ensure all output directories exist
	for (const dir of Object.values(DIRS)) {
		await ensureDir(join(PROJECT_ROOT, dir));
	}

	// --- 1. Homepage ---
	log('--- Homepage ---');
	await extractHomepage(PAGES.homepage);
	await delay(FETCH_DELAY);

	// --- 2. Service pages ---
	log('--- Service Pages ---');
	for (const service of PAGES.services) {
		await extractServicePage(service.url, service.slug);
		await delay(FETCH_DELAY);
	}

	// --- 3. Pricing ---
	log('--- Pricing ---');
	await extractPricing(PAGES.pricing);
	await delay(FETCH_DELAY);

	// --- 4. Blog ---
	log('--- Blog Posts ---');
	const blogPosts = await extractBlogPosts(PAGES.blog);
	log(`  Total blog posts extracted: ${blogPosts.length}`);
	await delay(FETCH_DELAY);

	// --- 5. Legal pages ---
	log('--- Legal Pages ---');
	for (const legal of PAGES.legal) {
		await extractLegalPage(legal.url, legal.filename);
		await delay(FETCH_DELAY);
	}

	// --- Summary ---
	const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

	console.log('');
	console.log('='.repeat(60));
	console.log('  Migration Complete');
	console.log('='.repeat(60));
	console.log('');
	console.log(`  Time elapsed:    ${elapsed}s`);
	console.log(`  Blog posts:      ${blogPosts.length}`);
	console.log(`  Service pages:   ${PAGES.services.length}`);
	console.log(`  Legal pages:     ${PAGES.legal.length}`);
	console.log('');
	console.log('  Output locations:');
	console.log(`    Blog:          ${DIRS.blogContent}/`);
	console.log(`    Services:      ${DIRS.servicesData}/`);
	console.log(`    Features:      ${DIRS.libData}/features.json`);
	console.log(`    Testimonials:  ${DIRS.libData}/testimonials.json`);
	console.log(`    Pricing:       ${DIRS.libData}/pricing.json`);
	console.log(`    Legal:         ${DIRS.legalContent}/`);
	console.log(`    Images:        static/images/`);
	console.log('');
	console.log('  NOTE: Webflow HTML structure varies. Review generated files');
	console.log('  and adjust CSS selectors (search for "WEBFLOW SELECTOR")');
	console.log('  if content was not captured correctly.');
	console.log('');
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

main().catch((err) => {
	logError('Migration failed with an unhandled error', err);
	process.exit(1);
});
