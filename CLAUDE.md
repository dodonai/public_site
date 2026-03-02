# Website CLAUDE.md

Marketing website for Dodonai — migrated from Webflow to SvelteKit.

## Stack

- **SvelteKit 2** with Svelte 5 (`$props()`, `$state()`, `$derived()`, `{@render children()}`)
- **Tailwind CSS 3** + DaisyUI 4 (custom `dodonai` theme)
- **MDSvex** for blog posts (`.md` files rendered as Svelte components)
- **Static adapter** (`adapter-static`) — prerendered, deployed to GCS buckets
- **Docker** option available via Dockerfile (port 3000)

## Project Structure

```
website/
├── src/
│   ├── app.css                  # Brand fonts, CSS variables, button/shadow classes
│   ├── app.html                 # Root HTML (data-theme="dodonai")
│   ├── content/
│   │   ├── blog/*.md            # ~38 blog posts with YAML frontmatter
│   │   └── legal/*.md           # Privacy policy, terms
│   ├── lib/
│   │   ├── components/          # Reusable UI components (see below)
│   │   └── data/                # JSON data files + blog loader
│   │       ├── services/*.json  # One JSON file per service page
│   │       ├── pricing.json
│   │       ├── features.json
│   │       ├── testimonials.json
│   │       ├── faq/general.json
│   │       └── blog.server.js   # getBlogPosts(), getBlogPost(slug)
│   └── routes/                  # SvelteKit file-based routing
├── static/
│   ├── fonts/                   # Plus Jakarta Display (.ttf)
│   └── images/                  # brand/, webflow/, blog/
├── tailwind.config.cjs
├── svelte.config.js
└── Dockerfile
```

## Brand Color System

Use **CSS variable names** in `app.css` or their **hex values** in Tailwind classes. Do NOT use DaisyUI semantic classes (`bg-base-100`, `text-neutral`) — use explicit brand colors instead.

| Variable | Hex | Usage |
|----------|-----|-------|
| `--midnight-blue` | `#282876` | Primary headings, dark text |
| `--light-slate-grey` | `#8181ac` | Body/secondary text |
| `--royal-blue` | `#216fed` | CTA buttons, links |
| `--medium-slate-blue` | `#836ae4` | Accents, icon circles, "Most Popular" |
| `--ghost-white` | `#f4f5fd` | Section backgrounds |
| `--medium-purple` | `#a994fa` | Decorative accents |
| `--thistle` | `#f9e1ff` | Promo banner background |

Common Tailwind patterns:
- Headings: `text-[#282876]`
- Body text: `text-[#8181ac]`
- Section bg: `bg-[#f4f5fd]` or `bg-white`
- Icon circles: `bg-[#836ae41a] text-[#836ae4]`

## Component Library

Components live in `src/lib/components/` organized by category:

| Category | Key Components | Notes |
|----------|---------------|-------|
| `layout/` | Header, Footer, BlobBackground | BlobBackground wraps content sections with decorative blobs |
| `hero/` | ServiceHero, HeroSection, *Animation | Each service page has its own hero animation component |
| `features/` | ValueProposition, HowItWorks, ExampleSummaries, FeatureGrid | ValueProposition uses horizontal icon+text cards in 2-col grid |
| `pricing/` | PricingTable, PricingTier, PricingToggle | Data-driven from `pricing.json` |
| `testimonials/` | TestimonialSection, TestimonialCard | Supports `headline` + `quote` fields |
| `blog/` | BlogCard, BlogPostLayout | BlogPostLayout is the MDSvex layout for blog `.md` files |
| `faq/` | FAQAccordion, FAQItem | Accordion with expand/collapse |
| `cta/` | CTASection | Standard call-to-action block |
| `video/` | VideoEmbed | YouTube embed with privacy-enhanced mode; accepts `background` prop |
| `content/` | ContentSection | Generic heading + paragraphs section; accepts `background` prop |
| `seo/` | SEOHead | Meta tags, OG, Twitter cards, JSON-LD |

### Component Conventions

- Props via Svelte 5: `let { prop = default } = $props();`
- Many section components accept a `background` prop (e.g., `"bg-white"`, `"bg-[#f4f5fd]"`, `"bg-transparent"`)
- Children via `{@render children()}`
- Section wrapper pattern: `<section class="{background} py-20 sm:py-28">`

## Service Page Architecture

All 6 service pages follow the same data-driven pattern:

```
Route file:   src/routes/{slug}/+page.svelte
Data file:    src/lib/data/services/{service}.json
```

### Service Pages

| Route | Data File | Hero Animation |
|-------|-----------|----------------|
| `/deposition-summary-software` | `deposition-summaries.json` | DepositionHeroAnimation |
| `/ai-medical-record-summaries-chronologies` | `medical-records.json` | MRSummaryAnimation |
| `/ai-deposition-transcript-software` | `transcript-management.json` | TranscriptAnimation |
| `/ai-pdf-ocr` | `ai-ocr.json` | OCRAnimation |
| `/dodonai-extract-and-draft-agents` | `extract-draft-agents.json` | ExtractDraftAnimation |
| `/electronic-discovery-software` | `e-discovery.json` | EDiscoveryAnimation |

### Service Page Composition Pattern

Each page wraps its content in `<BlobBackground>` and composes sections:

```svelte
<BlobBackground>
  <ServiceHero ... background="bg-transparent">
    <AnimationComponent />
  </ServiceHero>
  <TestimonialSection ... showBgImage={false} />
  {#if data.videoUrl}
    <VideoEmbed ... background="bg-transparent" />
  {/if}
  <ContentSection ... background="bg-transparent" />
  <HowItWorks ... background="bg-transparent" />
  <ValueProposition ... background="bg-transparent" />
  <FAQAccordion ... background="bg-transparent" />
</BlobBackground>
<CTASection />
```

When inside `BlobBackground`, pass `background="bg-transparent"` to all section components so the blob gradient shows through. `CTASection` sits outside the blob wrapper.

### Service JSON Schema

```json
{
  "seo": { "title", "description", "canonical" },
  "hero": { "headline", "subheadline", "bullets", "ctaText", "ctaUrl", "secondaryCtaText", "secondaryCtaUrl", "badges" },
  "educationalContent": [{ "heading", "paragraphs": [] }],
  "howItWorks": [{ "title", "description" }],
  "valueProposition": { "heading", "cards": [{ "title", "description" }] },
  "faq": [{ "question", "answer" }],
  "testimonials": [{ "headline?", "quote", "author", "role", "company" }],
  "videoUrl": ""
}
```

Some pages have additional sections (e.g., `examples`, `service`, `useCases`, `additionalContent`, `customerWins`, `practiceAreas`, `legalAiContent`).

## Blog System

Blog posts are markdown files in `src/content/blog/` with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
category: "Deposition|Medical Records|Technology|Product"
image: "/images/blog/image.png"
description: "Short description"
cardText: "Card excerpt (optional)"
imageAlt: "Alt text"
readingTime: "X minutes"
featured: boolean
featureMain: boolean
---
```

- Posts are auto-discovered via `import.meta.glob` in `blog.server.js`
- Blog listing at `/blog` with category filtering
- Individual posts at `/blog/[slug]` with related post recommendations

## Button Classes

Defined in `app.css` `@layer components`:
- `.btn-brand-primary` — Royal blue, pill-shaped (32px radius), white text
- `.btn-brand-outline` — Text-only, midnight blue, hover fades
- `.btn-brand-nav` — Smaller pill (27px radius), for navbar CTA

## Development Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Prettier + ESLint check
npm run format       # Auto-format
```

## Adding a New Service Page

1. Create `src/lib/data/services/{service}.json` following the schema above
2. Create `src/routes/{slug}/+page.svelte` following the composition pattern
3. Optionally create a hero animation component in `src/lib/components/hero/`
4. Add navigation link in `Header.svelte` services dropdown and `Footer.svelte`

## Adding a Blog Post

1. Create `src/content/blog/{slug}.md` with frontmatter
2. Add blog image to `static/images/blog/`
3. Post auto-appears in `/blog` listing (sorted by date desc)
4. Route `/blog/{slug}` generated automatically

## Key Patterns to Follow

- **Data-driven**: Content lives in JSON, not hardcoded in templates
- **Consistent section spacing**: `py-20 sm:py-28` for all sections
- **Brand colors only**: Use hex values, not DaisyUI semantic classes
- **BlobBackground**: Service pages wrap content sections in `<BlobBackground>` with `bg-transparent` passed to children
- **Conditional rendering**: Wrap optional sections in `{#if data.field}` blocks
- **VideoEmbed**: Only render when `videoUrl` is truthy (no "coming soon" placeholders)
- **Container widths**: `max-w-7xl` for grids, `max-w-3xl` for prose content, `max-w-4xl` for video

## Deployment & SEO Indexing

### Environments

| Environment | Branch | Bucket | URL |
|-------------|--------|--------|-----|
| **Production** | `main` | `dodonai-landing` | `www.dodon.ai` |
| **Staging** | `stage` | `stage-landing` | `landing.dodonai.com` |

### Indexing Control (`PUBLIC_NOINDEX`)

SEO indexing is controlled by the `PUBLIC_NOINDEX` env var at **build time**:
- **Stage**: `PUBLIC_NOINDEX=true` is set in `deploy-stage.yml` → outputs `noindex, nofollow` meta tag + `Disallow: /` in robots.txt
- **Production**: env var is not set → outputs `index, follow` meta tag + full robots.txt with sitemap

This is implemented in two places:
- `src/lib/components/seo/SEOHead.svelte` — `<meta name="robots">` tag
- `src/routes/robots.txt/+server.js` — prerendered robots.txt

### Deploy Workflows

Two separate workflow files to avoid merge conflicts between branches:
- `.github/workflows/deploy-prod.yml` — triggers on `main` push, deploys to `gs://dodonai-landing`
- `.github/workflows/deploy-stage.yml` — triggers on `stage` push, deploys to `gs://stage-landing`, sets `PUBLIC_NOINDEX=true`

Both files live on both branches. Since GitHub Actions reads the workflow from the branch being pushed, each branch triggers only its own workflow.

### Analytics (GA4 Consent Mode v2)

GA4 loads on every page via `app.html` with consent defaults **denied** (cookieless pings). When the user accepts the cookie banner, consent upgrades to **granted** (full tracking). SPA page views are tracked via `afterNavigate` in `+layout.svelte`.

Key files:
- `src/app.html` — GA4 script + Consent Mode v2 defaults
- `src/lib/utils/analytics.js` — consent upgrade, SPA tracking, Meta Pixel, Ahrefs, HubSpot
- `src/lib/components/layout/CookieConsent.svelte` — cookie banner triggers `loadAnalytics()`

## Migration Context

This site was migrated from Webflow to SvelteKit. The migration is complete and the site is live at [dodon.ai](https://dodon.ai).
